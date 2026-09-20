export const MODES = ["chat", "stories", "learn"] as const;
export type Mode = (typeof MODES)[number];

export const TONES = ["kid", "teen", "adult"] as const;
export type Tone = (typeof TONES)[number];

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export function isMode(value: unknown): value is Mode {
  return typeof value === "string" && (MODES as readonly string[]).includes(value);
}

export function isTone(value: unknown): value is Tone {
  return typeof value === "string" && (TONES as readonly string[]).includes(value);
}
