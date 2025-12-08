import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { listBriefs, getBriefByDate } from "../../../../../lib/content";
import { loadIntelligenceReportHtml } from "../../../../../lib/intelligenceReport";
import { IntelligenceReportContent } from "../../../../../components/IntelligenceReportContent";
import { getSignalStrengthLabel, getSignalStrengthHelperText } from "../../../../../lib/signal-strength";
import { ActivationAngleCTA } from "../../../../../components/ActivationAngleCTA";

export const dynamic = "force-static";
export const revalidate = false;
export const dynamicParams = false;

type Props = {
  params: Promise<{ date: string }>;
};

export async function generateStaticParams() {
  const briefs = listBriefs().filter((brief) => Boolean(brief.intelligenceMarkdown) || Boolean(brief.intelligenceHref));
  return briefs.map((brief) => ({ date: brief.date }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const brief = getBriefByDate(date);

  if (!brief) {
    return {
      title: "Intelligence Report | STI",
    };
  }

  return {
    title: `${brief.title ?? "Intelligence Report"} | STI Intelligence`,
    description: brief.summary,
  };
}

export default async function IntelligenceReportPage({ params }: Props) {
  const { date } = await params;
  const brief = getBriefByDate(date);

  if (!brief) {
    notFound();
  }

  let reportHtml = "";
  try {
    reportHtml = await loadIntelligenceReportHtml(brief.date);
  } catch {
    reportHtml = "";
  }

  const signalStrengthLabel = getSignalStrengthLabel(brief.metadata?.confidence_score);
  const metaChips = brief.metadata
    ? [
        `${brief.metadata.sources_count ?? "—"} sources`,
        signalStrengthLabel ? `Signal Strength: ${signalStrengthLabel}` : null,
        `${brief.metadata.word_count?.toLocaleString() ?? "—"} words`,
      ].filter(Boolean)
    : [];

  const standaloneHref = `/intelligence/briefs/${brief.date}/report.html`;

  return (
    <div className="font-sans text-[var(--text-primary)] bg-[var(--bg-page)] min-h-screen">
      <section className="mx-auto max-w-5xl px-6 sm:px-8 py-12 space-y-12">
        <Link
          href="/intelligence/briefs"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:underline transition-colors"
        >
          <ArrowLeft size={14} />
          Back to briefs
        </Link>

        <header className="space-y-5 border-b border-[var(--border-subtle)] pb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">Intelligence report</p>
          <div className="space-y-3">
            <h1 className="text-[2.2rem] font-semibold leading-tight text-[var(--text-primary)]">
              {brief.title || "Intelligence Report"}
            </h1>
            {brief.summary && (
              <p className="text-[1.05rem] text-[var(--text-secondary)] leading-relaxed max-w-3xl">
                {brief.summary}
              </p>
            )}
          </div>

          {metaChips.length > 0 && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
                {metaChips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-1 text-[var(--text-secondary)]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              {signalStrengthLabel && (
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {getSignalStrengthHelperText()}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <a
              href={standaloneHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-[var(--border-strong)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors"
            >
              Open standalone HTML
            </a>
          </div>
        </header>

        <section className="pb-16 space-y-10">
          <div className="bg-[var(--bg-surface)] px-0 sm:px-2 py-6 border border-[var(--border-subtle)]">
            <IntelligenceReportContent html={reportHtml} />
          </div>
          <ActivationAngleCTA categoryHint={brief.tags?.[0] || brief.title} />
        </section>
      </section>
    </div>
  );
}
