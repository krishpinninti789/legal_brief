import { NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";

export const runtime = "nodejs";

type Provider = "perplexity" | "openai";

interface AnalysisResult {
  summary: string;
  keyPoints: string[];
  documentType: string;
  riskLevel: "Low" | "Medium" | "High";
  recommendations: string[];
  details: {
    parties: string[];
    dates: string[];
    amounts: string[];
    obligations: string[];
  };
}

const JSON_SCHEMA_PROMPT = `Analyze the legal document and return ONLY valid JSON with this exact shape:
{
  "summary": "string",
  "keyPoints": ["string"],
  "documentType": "string",
  "riskLevel": "Low | Medium | High",
  "recommendations": ["string"],
  "details": {
    "parties": ["string"],
    "dates": ["string"],
    "amounts": ["string"],
    "obligations": ["string"]
  }
}
Rules:
- Keep summary concise.
- Keep keyPoints and recommendations practical.
- If missing fields, use empty arrays.
- Output JSON only, no markdown.`;

function sanitizeRiskLevel(value: string): "Low" | "Medium" | "High" {
  const normalized = value.trim().toLowerCase();
  if (normalized === "high") return "High";
  if (normalized === "medium") return "Medium";
  return "Low";
}

function fallbackAnalysis(rawText: string): AnalysisResult {
  return {
    summary:
      rawText.slice(0, 800) || "No structured analysis returned by model.",
    keyPoints: [],
    documentType: "Legal Document",
    riskLevel: "Low",
    recommendations: [],
    details: {
      parties: [],
      dates: [],
      amounts: [],
      obligations: [],
    },
  };
}

function extractFirstJsonObject(value: string): string | null {
  const start = value.indexOf("{");
  const end = value.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    return null;
  }
  return value.slice(start, end + 1);
}

function parseModelAnalysis(content: string): AnalysisResult {
  const jsonText = extractFirstJsonObject(content);
  if (!jsonText) {
    return fallbackAnalysis(content);
  }

  try {
    const parsed = JSON.parse(jsonText) as Partial<AnalysisResult>;
    return {
      summary: parsed.summary ?? "No summary provided.",
      keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints : [],
      documentType: parsed.documentType ?? "Legal Document",
      riskLevel: sanitizeRiskLevel(parsed.riskLevel ?? "Low"),
      recommendations: Array.isArray(parsed.recommendations)
        ? parsed.recommendations
        : [],
      details: {
        parties: Array.isArray(parsed.details?.parties)
          ? parsed.details.parties
          : [],
        dates: Array.isArray(parsed.details?.dates) ? parsed.details.dates : [],
        amounts: Array.isArray(parsed.details?.amounts)
          ? parsed.details.amounts
          : [],
        obligations: Array.isArray(parsed.details?.obligations)
          ? parsed.details.obligations
          : [],
      },
    };
  } catch {
    return fallbackAnalysis(content);
  }
}

async function extractDocumentText(file: File): Promise<string> {
  if (file.type === "application/pdf") {
    const buffer = Buffer.from(await file.arrayBuffer());
    const parser = new PDFParse({ data: buffer });
    try {
      const parsed = await parser.getText();
      return parsed.text;
    } finally {
      await parser.destroy();
    }
  }

  return file.text();
}

function getProviderConfig(provider: Provider, model?: string) {
  if (provider === "openai") {
    return {
      apiKey: process.env.OPENAI_API_KEY,
      endpoint: "https://api.openai.com/v1/chat/completions",
      model: model || process.env.OPENAI_MODEL || "gpt-4.1-mini",
    };
  }

  return {
    apiKey: process.env.PERPLEXITY_API_KEY,
    endpoint: "https://api.perplexity.ai/chat/completions",
    model: model || process.env.PERPLEXITY_MODEL || "sonar",
  };
}

async function directFileForward(file: File) {
  const directApiUrl = process.env.DOCUMENT_ANALYZER_UPLOAD_URL;
  const directApiKey = process.env.DOCUMENT_ANALYZER_API_KEY;

  if (!directApiUrl || !directApiKey) {
    return NextResponse.json(
      {
        error:
          "Direct mode is not configured. Add DOCUMENT_ANALYZER_UPLOAD_URL and DOCUMENT_ANALYZER_API_KEY.",
      },
      { status: 500 },
    );
  }

  const outboundForm = new FormData();
  outboundForm.append("file", file, file.name);

  const response = await fetch(directApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${directApiKey}`,
    },
    body: outboundForm,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return NextResponse.json(
      {
        error: "Direct API request failed",
        status: response.status,
        details: data,
      },
      { status: response.status },
    );
  }

  return NextResponse.json({
    mode: "direct",
    providerResponse: data,
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const mode = (formData.get("mode")?.toString() || "extract").toLowerCase();
    const provider =
      (formData.get("provider")?.toString().toLowerCase() as Provider) ||
      "perplexity";
    const model = formData.get("model")?.toString();

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (mode === "direct") {
      return directFileForward(file);
    }

    const providerConfig = getProviderConfig(provider, model);
    if (!providerConfig.apiKey) {
      return NextResponse.json(
        { error: `Missing API key for provider: ${provider}` },
        { status: 500 },
      );
    }

    const extractedText = await extractDocumentText(file);
    const prompt = formData.get("prompt")?.toString() || JSON_SCHEMA_PROMPT;

    const llmResponse = await fetch(providerConfig.endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${providerConfig.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: providerConfig.model,
        messages: [
          {
            role: "user",
            content: `${prompt}\n\nDocument content:\n${extractedText}`,
          },
        ],
      }),
    });

    const llmData = await llmResponse.json().catch(() => ({}));

    if (!llmResponse.ok) {
      return NextResponse.json(
        {
          error: "LLM analysis request failed",
          status: llmResponse.status,
          details: llmData,
        },
        { status: llmResponse.status },
      );
    }

    const content =
      llmData?.choices?.[0]?.message?.content ||
      llmData?.choices?.[0]?.text ||
      "";

    const analysis = parseModelAnalysis(content);

    return NextResponse.json({
      mode: "extract",
      provider,
      model: providerConfig.model,
      extractedText,
      analysis,
      raw: llmData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong during document analysis",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
