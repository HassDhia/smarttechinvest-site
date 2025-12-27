export function MarketPathContent({ html }: { html: string }) {
  if (!html) {
    return (
      <div className="text-sm text-[hsl(var(--foreground-secondary))]">
        Report content unavailable. Open the standalone HTML file instead.
      </div>
    );
  }

  return (
    <article
      className="market-path-body max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
