import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { contentObj } = await req.json();
    const content = contentObj.contentText;

    if (!content) {
      return NextResponse.json(
        { error: "Missing PDF content" },
        { status: 400 },
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-3-super-120b-a12b:free",
          messages: [
            {
              role: "system",
              content: `
You are a legal assistant chatbot.
Reply in clean, simple text.
Do NOT use citations, references, brackets, tables, or markdown.
Do NOT mention sources.
Do NOT use ### or **.
Give short, structured answers.
Focus only on the user's country (India unless stated).
`,
            },
            {
              role: "user",
              content: content,
            },
          ],
        }),
      },
    );

    const data = await response.json();
    console.log("Server----", data);

    return NextResponse.json(data.choices?.[0]?.message?.content || {});
  } catch (error) {
    return NextResponse.json(
      { error: "AI analysis failed", details: String(error) },
      { status: 500 },
    );
  }
}
