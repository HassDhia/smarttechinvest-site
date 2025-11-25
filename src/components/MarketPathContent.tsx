"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export function MarketPathContent({ markdownUrl }: { markdownUrl: string }) {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(markdownUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load dossier: ${res.status}`);
        }
        return res.text();
      })
      .then((text) => {
        if (alive) {
          setMarkdown(text);
        }
      })
      .catch((err) => {
        if (alive) {
          setError(err.message);
        }
      });

    return () => {
      alive = false;
    };
  }, [markdownUrl]);

  if (error) {
    return (
      <div className="rounded-xl border border-dashed border-[hsl(var(--destructive))] bg-[hsl(var(--destructive)/0.05)] p-4 text-sm text-[hsl(var(--destructive))]">
        Unable to load the Market-Path dossier ({error}). Please download the PDF instead.
      </div>
    );
  }

  if (!markdown) {
    return (
      <div className="text-sm text-[hsl(var(--muted-foreground))]">
        Loading dossier…
      </div>
    );
  }

  return (
    <ReactMarkdown
      className="prose prose-slate dark:prose-invert max-w-none"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
    >
      {markdown}
    </ReactMarkdown>
  );
}
