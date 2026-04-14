import { NextResponse } from "next/server";

export const runtime = "nodejs";

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

const SYSTEM_PROMPT = `Analyze the legal document and return ONLY valid JSON with this exact shape:
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
  const v = value.trim().toLowerCase();
  if (v === "high") return "High";
  if (v === "medium") return "Medium";
  return "Low";
}

function parseAnalysis(content: string): AnalysisResult {
  const start = content.indexOf("{");
  const end = content.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    return fallback(content);
  }

  try {
    const parsed = JSON.parse(
      content.slice(start, end + 1),
    ) as Partial<AnalysisResult>;
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
          ? parsed.details!.parties
          : [],
        dates: Array.isArray(parsed.details?.dates)
          ? parsed.details!.dates
          : [],
        amounts: Array.isArray(parsed.details?.amounts)
          ? parsed.details!.amounts
          : [],
        obligations: Array.isArray(parsed.details?.obligations)
          ? parsed.details!.obligations
          : [],
      },
    };
  } catch {
    return fallback(content);
  }
}

function fallback(raw: string): AnalysisResult {
  return {
    summary: raw.slice(0, 800) || "No analysis returned.",
    keyPoints: [],
    documentType: "Legal Document",
    riskLevel: "Low",
    recommendations: [],
    details: { parties: [], dates: [], amounts: [], obligations: [] },
  };
}

async function extractText(file: File): Promise<string> {
  if (file.type === "application/pdf") {
    const buffer = Buffer.from(await file.arrayBuffer());
    const { default: pdfParse } = await import("@cedrugs/pdf-parse");
    const result = await pdfParse(buffer);
    return result.text;
  }
  return file.text();
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENROUTER_API_KEY" },
        { status: 500 },
      );
    }

    const text = await extractText(file);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-3-super-120b-a12b:free",
          messages: [
            {
              role: "user",
              content: `${SYSTEM_PROMPT}\n\nDocument content:\n${text}`,
            },
          ],
        }),
      },
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        { error: "LLM request failed", details: data },
        { status: response.status },
      );
    }

    const content: string = data?.choices?.[0]?.message?.content ?? "";
    const analysis = parseAnalysis(content);

    return NextResponse.json({ analysis, extractedText: text });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
