/**
 * Prepare chat text for remark-math / KaTeX.
 * Converts \(...\) and \[...\] to $ / $$, and while a reply is still
 * streaming, masks unclosed delimiters so incomplete TeX is shown as text
 * instead of breaking the renderer.
 */
export function prepareChatMarkdown(content: string, streaming = false): string {
  let text = content.replace(/\r\n/g, "\n");
  text = text.replace(/```(?:latex|tex|math|katex)\s*\n([\s\S]*?)```/gi, (_, inner: string) => {
    return `$$\n${inner.trim()}\n$$`;
  });
  text = mapOutsideCode(text, convertCompleteDelimiters);
  if (streaming) {
    text = mapOutsideCode(text, maskIncompleteMath);
  }
  return text;
}

function mapOutsideCode(text: string, transform: (chunk: string) => string): string {
  const chunks = text.split(/(```[\s\S]*?```|`[^`\n]+`)/);
  return chunks
    .map((chunk) => {
      if (chunk.startsWith("```") || (chunk.startsWith("`") && chunk.endsWith("`"))) {
        return chunk;
      }
      return transform(chunk);
    })
    .join("");
}

function convertCompleteDelimiters(text: string): string {
  let next = text.replace(/\\\[([\s\S]*?)\\\]/g, (_, inner: string) => `$$${inner.trim()}$$`);
  next = next.replace(/\\\(([\s\S]*?)\\\)/g, (_, inner: string) => `$${inner.trim()}$`);
  return next;
}

function maskIncompleteMath(text: string): string {
  let next = text;

  const displayMatches = [...next.matchAll(/\$\$/g)];
  if (displayMatches.length % 2 === 1) {
    const last = next.lastIndexOf("$$");
    next = `${next.slice(0, last)}${next.slice(last + 2)}`;
  }

  let singles = 0;
  let lastSingle = -1;
  for (let i = 0; i < next.length; i += 1) {
    if (next[i] !== "$") continue;
    if (next[i - 1] === "\\") continue;
    if (next[i - 1] === "$" || next[i + 1] === "$") continue;
    singles += 1;
    lastSingle = i;
  }
  if (singles % 2 === 1 && lastSingle >= 0) {
    next = `${next.slice(0, lastSingle)}${next.slice(lastSingle + 1)}`;
  }

  const lastDisplayOpen = next.lastIndexOf("\\[");
  const lastDisplayClose = next.lastIndexOf("\\]");
  if (lastDisplayOpen > lastDisplayClose) {
    next = `${next.slice(0, lastDisplayOpen)}${next.slice(lastDisplayOpen + 2)}`;
  }

  const lastInlineOpen = next.lastIndexOf("\\(");
  const lastInlineClose = next.lastIndexOf("\\)");
  if (lastInlineOpen > lastInlineClose) {
    next = `${next.slice(0, lastInlineOpen)}${next.slice(lastInlineOpen + 2)}`;
  }

  return next;
}
