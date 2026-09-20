"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  CHAT_STARTERS,
  LEARN_TOPICS,
  STORY_THEMES,
  WELCOME,
} from "@/lib/prompts";
import type { ChatMessage, Mode, Tone } from "@/lib/types";
import { isTone } from "@/lib/types";
import {
  BookOpen,
  GraduationCap,
  MessageCircle,
  Send,
  Sparkles,
  RotateCcw,
} from "lucide-react";

type Thread = Record<Mode, ChatMessage[]>;

const emptyThreads = (): Thread => ({
  chat: [],
  stories: [],
  learn: [],
});

const MODE_META: Record<
  Mode,
  { label: string; hint: string; icon: typeof MessageCircle }
> = {
  chat: {
    label: "Chat",
    hint: "Talk about anything family-safe",
    icon: MessageCircle,
  },
  stories: {
    label: "Stories",
    hint: "Short tales you help steer",
    icon: BookOpen,
  },
  learn: {
    label: "Learn",
    hint: "Quizzes and riddles",
    icon: GraduationCap,
  },
};

const TONE_META: Record<Tone, { label: string; hint: string }> = {
  kid: { label: "Kid", hint: "Simpler words" },
  teen: { label: "Teen", hint: "Everyday voice" },
  adult: { label: "Adult", hint: "A bit more depth" },
};

const TONE_EVENT = "nova-tone-change";

function subscribeTone(onChange: () => void) {
  window.addEventListener(TONE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(TONE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readTone(): Tone {
  const saved = window.localStorage.getItem("nova-tone");
  return isTone(saved) ? saved : "teen";
}

function writeTone(next: Tone) {
  window.localStorage.setItem("nova-tone", next);
  window.dispatchEvent(new Event(TONE_EVENT));
}

function NovaMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-2xl bg-linear-to-br from-teal-500 to-sky-600 text-white shadow-md shadow-teal-700/20 ${className}`}
      aria-hidden
    >
      <Sparkles className="size-[55%]" strokeWidth={2.25} />
    </span>
  );
}

export function CompanionApp() {
  const [mode, setMode] = useState<Mode>("chat");
  const tone = useSyncExternalStore(subscribeTone, readTone, () => "teen" as Tone);
  const [threads, setThreads] = useState<Thread>(emptyThreads);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [live, setLive] = useState<boolean | null>(null);
  const [demoNotice, setDemoNotice] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const messages = threads[mode];
  const welcome = WELCOME[mode][tone];

  useEffect(() => {
    let cancelled = false;
    fetch("/api/health")
      .then((res) => res.json())
      .then((data: { live?: boolean }) => {
        if (!cancelled) setLive(Boolean(data.live));
      })
      .catch(() => {
        if (!cancelled) setLive(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy, mode]);

  const picks = useMemo(() => {
    if (mode === "stories") return STORY_THEMES;
    if (mode === "learn") return LEARN_TOPICS;
    return CHAT_STARTERS;
  }, [mode]);

  async function send(text: string) {
    const content = text.replace(/\s+/g, " ").trim();
    if (!content || busy) return;

    const history = [...threads[mode], { role: "user" as const, content }];
    setThreads((prev) => ({ ...prev, [mode]: history }));
    setDraft("");
    setBusy(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, mode, tone }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      if (response.headers.get("X-Nova-Demo") === "1") {
        setDemoNotice(true);
        setLive(false);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("This browser couldn't stream the reply.");

      const decoder = new TextDecoder();
      let assistant = "";
      setThreads((prev) => ({
        ...prev,
        [mode]: [...history, { role: "assistant", content: "" }],
      }));

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistant += decoder.decode(value, { stream: true });
        const snapshot = assistant;
        setThreads((prev) => {
          const next = [...prev[mode]];
          next[next.length - 1] = { role: "assistant", content: snapshot };
          return { ...prev, [mode]: next };
        });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
      setThreads((prev) => ({
        ...prev,
        [mode]: prev[mode].filter((item, index, arr) => {
          const lastEmptyAssistant =
            index === arr.length - 1 && item.role === "assistant" && !item.content;
          return !lastEmptyAssistant;
        }),
      }));
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  function resetThread() {
    setThreads((prev) => ({ ...prev, [mode]: [] }));
    setError(null);
  }

  return (
    <div className="nova-bg flex min-h-dvh flex-col">
      <header className="border-b border-white/60 bg-white/70 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <NovaMark className="size-11" />
            <div>
              <p className="font-heading text-xl font-semibold tracking-tight text-slate-800">
                Nova
              </p>
              <p className="text-sm text-slate-600">
                Family-friendly companion for all ages
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-600">Voice</span>
            <div className="flex rounded-full bg-white p-1 shadow-sm ring-1 ring-slate-200">
              {(["kid", "teen", "adult"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => writeTone(option)}
                  className={`min-h-10 rounded-full px-3.5 text-sm font-semibold transition ${
                    tone === option
                      ? "bg-slate-800 text-white shadow"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                  aria-pressed={tone === option}
                  title={TONE_META[option].hint}
                >
                  {TONE_META[option].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-3 py-4 sm:px-6">
        <nav
          className="mb-4 grid grid-cols-3 gap-2"
          aria-label="Modes"
        >
          {(["chat", "stories", "learn"] as const).map((option) => {
            const Icon = MODE_META[option].icon;
            const active = mode === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setMode(option)}
                className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl border px-2 py-3 text-center shadow-sm transition sm:min-h-20 ${
                  active
                    ? "border-teal-500 bg-white text-teal-800 ring-2 ring-teal-400/70"
                    : "border-white/80 bg-white/70 text-slate-600 hover:bg-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="size-6" />
                <span className="font-heading text-base font-semibold">
                  {MODE_META[option].label}
                </span>
                <span className="hidden text-xs text-slate-500 sm:block">
                  {MODE_META[option].hint}
                </span>
              </button>
            );
          })}
        </nav>

        {live === false && (
          <div className="mb-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            Live replies need an <strong>OPENAI_API_KEY</strong>. Until that is
            set, Nova uses a short demo message. Add the key locally or in
            Railway to chat for real.
          </div>
        )}

        {demoNotice && live !== false ? (
          <div className="mb-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            That last reply was a demo because no API key was found.
          </div>
        ) : null}

        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-white/80 bg-white/80 shadow-xl shadow-teal-900/5">
          <div className="h-[min(58dvh,560px)] overflow-y-auto overscroll-contain sm:h-[min(62dvh,640px)]">
            <div className="flex flex-col gap-4 p-4 sm:p-6">
              <MessageBubble role="assistant">{welcome}</MessageBubble>

              {messages.map((message, index) => (
                <MessageBubble key={`${mode}-${index}`} role={message.role}>
                  {message.content || (busy && index === messages.length - 1 ? "…" : "")}
                </MessageBubble>
              ))}

              {busy && messages[messages.length - 1]?.role !== "assistant" ? (
                <MessageBubble role="assistant">
                  <span className="inline-flex gap-1 py-1" aria-label="Nova is typing">
                    <span className="size-2 animate-bounce rounded-full bg-teal-500 [animation-delay:-0.2s]" />
                    <span className="size-2 animate-bounce rounded-full bg-sky-500 [animation-delay:-0.1s]" />
                    <span className="size-2 animate-bounce rounded-full bg-amber-500" />
                  </span>
                </MessageBubble>
              ) : null}

              {messages.length === 0 && (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {picks.map((pick) => (
                    <button
                      key={pick.id}
                      type="button"
                      disabled={busy}
                      onClick={() => send(pick.prompt)}
                      className="min-h-14 rounded-2xl border border-teal-100 bg-teal-50/70 px-4 py-3 text-left text-base font-medium text-teal-950 transition hover:border-teal-300 hover:bg-teal-50 disabled:opacity-60"
                    >
                      {pick.label}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          {messages.length > 0 && (
            <div className="flex gap-2 overflow-x-auto border-t border-slate-100 px-4 py-3">
              {picks.slice(0, 4).map((pick) => (
                <button
                  key={pick.id}
                  type="button"
                  disabled={busy}
                  onClick={() => send(pick.prompt)}
                  className="shrink-0 rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 disabled:opacity-50"
                >
                  {pick.label}
                </button>
              ))}
            </div>
          )}

          <form
            className="border-t border-slate-100 p-3 sm:p-4"
            onSubmit={(event) => {
              event.preventDefault();
              void send(draft);
            }}
          >
            {error ? (
              <p className="mb-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
                {error}
              </p>
            ) : null}
            <div className="flex items-end gap-2">
              <Textarea
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void send(draft);
                  }
                }}
                placeholder={
                  mode === "stories"
                    ? "What happens next?"
                    : mode === "learn"
                      ? "Your answer, or pick a topic…"
                      : "Say hello, ask a question, or share an idea…"
                }
                className="min-h-14 resize-none rounded-2xl border-slate-200 bg-white px-4 py-3 text-base shadow-inner md:text-base"
                rows={2}
                disabled={busy}
                maxLength={4000}
                aria-label="Message for Nova"
              />
              <div className="flex flex-col gap-2">
                <Button
                  type="submit"
                  disabled={busy || !draft.trim()}
                  className="h-12 min-w-12 rounded-2xl bg-teal-600 px-4 text-base text-white hover:bg-teal-700"
                >
                  <Send className="size-5" />
                  <span className="sr-only sm:not-sr-only">Send</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetThread}
                  disabled={busy || messages.length === 0}
                  className="h-11 rounded-2xl"
                  title={`Start a new ${MODE_META[mode].label.toLowerCase()}`}
                >
                  <RotateCcw className="size-4" />
                  <span className="sr-only">New conversation</span>
                </Button>
              </div>
            </div>
          </form>
        </section>

        <p className="mt-4 px-1 pb-2 text-center text-sm leading-relaxed text-slate-600">
          A parent or guardian should stay nearby when kids use Nova. This is a
          family-safe companion, not a substitute for a person — and AI can
          make mistakes. Don&apos;t share your real name, address, school, or
          phone number.
        </p>
      </main>
    </div>
  );
}

function MessageBubble({
  role,
  children,
}: {
  role: ChatMessage["role"];
  children: ReactNode;
}) {
  const isUser = role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      {isUser ? (
        <span className="mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-sm font-bold text-amber-900">
          You
        </span>
      ) : (
        <NovaMark className="mt-1 size-9 shrink-0" />
      )}
      <div
        className={`max-w-[min(100%,38rem)] rounded-3xl px-4 py-3 text-base leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-teal-700 text-white"
            : "bg-slate-50 text-slate-800 ring-1 ring-slate-200/80"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
