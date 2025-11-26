"use client";

import { useEffect, useState } from "react";

export function MarketPathContent({ htmlUrl }: { htmlUrl: string }) {
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(htmlUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load dossier: ${res.status}`);
        }
        return res.text();
      })
      .then((text) => {
        if (alive) {
          setHtml(text);
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
  }, [htmlUrl]);

  if (error) {
    return (
      <div className="rounded-xl border border-dashed border-[hsl(var(--destructive))] bg-[hsl(var(--destructive)/0.05)] p-4 text-sm text-[hsl(var(--destructive))]">
        Unable to load the Market-Path dossier ({error}). Please open the HTML file directly.
      </div>
    );
  }

  if (!html) {
    return (
      <div className="text-sm text-white/70">
        Loading dossier…
      </div>
    );
  }

  return (
    <article
      className="prose prose-invert max-w-none text-white"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
