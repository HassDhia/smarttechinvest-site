export function IntelligenceReportContent({ html }: { html: string }) {
  if (!html) {
    return (
      <div className="text-sm text-[var(--text-secondary)]">
        Intelligence report content unavailable. Open the standalone HTML file instead.
      </div>
    );
  }

  return (
    <article
      className="intelligence-report-body max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
