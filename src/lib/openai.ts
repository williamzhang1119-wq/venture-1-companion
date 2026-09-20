import OpenAI from "openai";

export function getModel(): string {
  return process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
}

export function hasApiKey(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

export function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) return null;

  const baseURL = process.env.OPENAI_BASE_URL?.trim() || undefined;
  return new OpenAI({ apiKey, baseURL });
}
