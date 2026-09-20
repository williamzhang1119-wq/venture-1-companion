import { buildSystemPrompt, DEMO_REPLY } from "@/lib/prompts";
import { getModel, getOpenAIClient, hasApiKey } from "@/lib/openai";
import { isMode, isTone, type ChatMessage, type Mode, type Tone } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_MESSAGES = 24;
const MAX_CONTENT_LENGTH = 4000;

type IncomingMessage = {
  role?: unknown;
  content?: unknown;
};

function streamPlainText(text: string, extraHeaders: HeadersInit = {}): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const chunks = text.match(/\S+\s*/g) ?? [text];
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
        await new Promise((resolve) => setTimeout(resolve, 16));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

function sanitizeMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];

  const cleaned: ChatMessage[] = [];
  for (const item of raw as IncomingMessage[]) {
    if (item?.role !== "user" && item?.role !== "assistant") continue;
    if (typeof item.content !== "string") continue;
    const content = item.content.replace(/\s+/g, " ").trim().slice(0, MAX_CONTENT_LENGTH);
    if (!content) continue;
    cleaned.push({ role: item.role, content });
  }
  return cleaned.slice(-MAX_MESSAGES);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "That message didn't come through. Try again?" }, { status: 400 });
  }

  const payload = body as {
    messages?: unknown;
    mode?: unknown;
    tone?: unknown;
  };

  const mode: Mode = isMode(payload.mode) ? payload.mode : "chat";
  const tone: Tone = isTone(payload.tone) ? payload.tone : "teen";
  const messages = sanitizeMessages(payload.messages);

  if (messages.length === 0) {
    return Response.json(
      { error: "Type a message or pick a prompt so I know where to start." },
      { status: 400 },
    );
  }

  if (!hasApiKey()) {
    return streamPlainText(DEMO_REPLY[mode], { "X-Nova-Demo": "1" });
  }

  const client = getOpenAIClient();
  if (!client) {
    return streamPlainText(DEMO_REPLY[mode], { "X-Nova-Demo": "1" });
  }

  const maxTokens = mode === "stories" ? 700 : mode === "learn" ? 450 : 550;
  const temperature = mode === "stories" ? 0.9 : mode === "learn" ? 0.5 : 0.7;

  try {
    const completion = await client.chat.completions.create({
      model: getModel(),
      stream: true,
      temperature,
      max_tokens: maxTokens,
      messages: [
        { role: "system", content: buildSystemPrompt(mode, tone) },
        ...messages,
      ],
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch (error) {
          const fallback =
            "I hit a snag talking to the language model. Check the API key, model name, and base URL, then try again.";
          controller.enqueue(encoder.encode(fallback));
          console.error("Nova stream error:", error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Nova chat error:", error);
    const message =
      error instanceof Error && error.message.includes("API key")
        ? "The API key was rejected. Double-check OPENAI_API_KEY (and OPENAI_BASE_URL if you use another provider)."
        : "I couldn't reach the language model just now. Please try again in a moment.";
    return Response.json({ error: message }, { status: 502 });
  }
}
