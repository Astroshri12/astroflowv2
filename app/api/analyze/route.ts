import { NextResponse } from "next/server";
import {
  generateWithAnthropic,
  generateWithGemini,
  resolveAiProvider,
} from "@/lib/ai-providers";
import { SYSTEM_PROMPT } from "@/lib/prompt";

export async function POST(req: Request) {
  let body: { userPrompt?: string; systemPrompt?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const userPrompt = body.userPrompt?.trim();
  if (!userPrompt) {
    return NextResponse.json({ error: "Missing userPrompt." }, { status: 400 });
  }

  const system = body.systemPrompt?.trim() || SYSTEM_PROMPT;

  const geminiKey = process.env.GEMINI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const geminiModel =
    process.env.GEMINI_MODEL?.trim() || "gemini-2.0-flash";

  const provider = resolveAiProvider(
    geminiKey,
    anthropicKey,
    process.env.AI_PROVIDER,
  );

  if (!provider) {
    return NextResponse.json({
      text:
        "AI interpretation unavailable: set GEMINI_API_KEY (recommended) or ANTHROPIC_API_KEY on the server. Optional: AI_PROVIDER=gemini|anthropic, GEMINI_MODEL for model id.",
    });
  }

  try {
    const text =
      provider === "gemini"
        ? await generateWithGemini(
            system,
            userPrompt,
            geminiKey!,
            geminiModel,
          )
        : await generateWithAnthropic(system, userPrompt, anthropicKey!);

    return NextResponse.json({ text, provider });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { text: `AI error (${provider}): ${message}` },
      { status: 200 },
    );
  }
}
