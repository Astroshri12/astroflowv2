import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateWithAnthropic(
  system: string,
  userPrompt: string,
  apiKey: string,
): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Anthropic ${res.status}: ${errText.slice(0, 500)}`);
  }

  const data = (await res.json()) as {
    content?: Array<{ type?: string; text?: string }>;
  };
  return (
    data.content?.find((c) => c.type === "text")?.text ??
    "No text returned from model."
  );
}

export async function generateWithGemini(
  system: string,
  userPrompt: string,
  apiKey: string,
  modelId: string,
): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: modelId,
    systemInstruction: system,
  });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: userPrompt }] }],
    generationConfig: {
      maxOutputTokens: 1000,
      temperature: 0.65,
    },
  });

  const text = result.response.text();
  if (!text?.trim()) {
    throw new Error("Gemini returned empty text.");
  }
  return text;
}

export type AiProviderChoice = "gemini" | "anthropic";

/** Resolve which LLM to call. Default: prefer Gemini when key exists, else Claude. */
export function resolveAiProvider(
  geminiKey: string | undefined,
  anthropicKey: string | undefined,
  explicit: string | undefined,
): AiProviderChoice | null {
  const pref = (explicit ?? "auto").toLowerCase();

  if (pref === "gemini") {
    return geminiKey ? "gemini" : null;
  }
  if (pref === "anthropic" || pref === "claude") {
    return anthropicKey ? "anthropic" : null;
  }

  if (geminiKey) return "gemini";
  if (anthropicKey) return "anthropic";
  return null;
}
