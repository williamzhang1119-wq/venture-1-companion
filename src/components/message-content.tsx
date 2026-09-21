"use client";

import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { prepareChatMarkdown } from "@/lib/math-markdown";
import "katex/dist/katex.min.css";

type MessageContentProps = {
  markdown: string;
  variant: "user" | "assistant";
  streaming?: boolean;
};

export function MessageContent({ markdown, variant, streaming = false }: MessageContentProps) {
  const source = prepareChatMarkdown(markdown, streaming);

  return (
    <div className={`venture-md venture-md-${variant}`}>
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath, remarkBreaks]}
        rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: "ignore" }]]}
        urlTransform={safeUrl}
        components={{
          img: () => null,
          h1: ({ children }) => <p className="font-heading text-lg font-semibold">{children}</p>,
          h2: ({ children }) => <p className="font-heading text-base font-semibold">{children}</p>,
          h3: ({ children }) => <p className="font-heading text-base font-semibold">{children}</p>,
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer nofollow">
              {children}
            </a>
          ),
        }}
      >
        {source}
      </Markdown>
    </div>
  );
}

function safeUrl(url: string): string {
  const trimmed = url.trim();
  if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return trimmed;
  return "";
}
