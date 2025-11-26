import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { listBriefs, getBriefByDate } from "../../../../../lib/content";
import { MarketPathContent } from "../../../../../components/MarketPathContent";

export const dynamic = "force-static";
export const revalidate = false;
export const dynamicParams = false;

type Props = {
  params: Promise<{ date: string }>;
};

export async function generateStaticParams() {
  const briefs = listBriefs().filter((brief) => brief.hasMarketPath);
  return briefs.map((brief) => ({ date: brief.date }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const brief = getBriefByDate(date);

  if (!brief) {
    return {
      title: "Market-Path Dossier | STI Intelligence",
    };
  }

  return {
    title: `${brief.title ?? "Market-Path Dossier"} | STI Intelligence`,
    description: brief.summary,
    openGraph: {
      title: brief.title ?? "Market-Path Dossier",
      description: brief.summary,
      images: brief.heroImage ? [brief.heroImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: brief.title ?? "Market-Path Dossier",
      description: brief.summary,
      images: brief.heroImage ? [brief.heroImage] : [],
    },
  };
}

export default async function MarketPathReportPage({ params }: Props) {
  const { date } = await params;
  const brief = getBriefByDate(date);

  if (!brief || !brief.hasMarketPath) {
    notFound();
  }

  const marketPathHtmlUrl = brief.marketPathHtml ?? `/intelligence/briefs/${date}/market_path_report.html`;
  const intelligenceHref = brief.intelligenceHref;
  const showIntelligenceCta = Boolean(intelligenceHref);
  const stats = brief.metadata;
  const metaChips =
    stats
      ? [
          `${stats.sources_count ?? "—"} sources`,
          `${stats.confidence_score ?? "—"}% confidence`,
          `${stats.word_count?.toLocaleString() ?? "—"} words`,
        ]
      : [];

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
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">Market-Path dossier</p>
          <div className="space-y-3">
            <h1 className="text-[2.35rem] font-semibold leading-tight text-[var(--text-primary)]">
              {brief.title || "Market-Path Report"}
            </h1>
            {brief.summary && (
              <p className="text-[1.05rem] text-[var(--text-secondary)] leading-relaxed max-w-3xl">
                {brief.summary}
              </p>
            )}
          </div>
          {metaChips.length > 0 && (
            <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
              {metaChips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-4">
            <a
              href={marketPathHtmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-[var(--accent)] bg-[var(--accent)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-[var(--bg-page)] hover:bg-transparent hover:text-[var(--accent)] transition-colors"
            >
              Open Market-Path Report
            </a>
            {showIntelligenceCta && (
              <a
                href={intelligenceHref!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border border-[var(--border-strong)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                View Intelligence Report
              </a>
            )}
          </div>
        </header>

        <section className="pb-16">
          <div className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-0 sm:px-2 py-6">
            <MarketPathContent htmlUrl={marketPathHtmlUrl} />
          </div>
        </section>
      </section>
    </div>
  );
}
