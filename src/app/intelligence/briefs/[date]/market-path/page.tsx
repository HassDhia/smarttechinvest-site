import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { listBriefs, getBriefByDate } from "../../../../../lib/content";
import { DownloadCenter } from "../../../../../components/DownloadCenter";
import { Button } from "../../../../../components/ui/Button";
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
    <div className="font-sans text-white min-h-screen bg-[#01030a]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#07112d] via-[#040817] to-[#01030a]" />
      <section className="container section vt-section max-w-5xl">
        <div className="mb-6">
          <Link
            href="/intelligence/briefs"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Briefs
          </Link>
        </div>

        <header className="space-y-3 mb-10">
          <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-[#0e1427] via-[#070d1d] to-[#03060c] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <p className="text-xs uppercase tracking-[0.45em] text-white/60 mb-3">
              Market-Path Dossier
            </p>
            <h1 className="text-3xl md:text-[2.6rem] font-semibold text-gradient leading-tight mb-4">
              {brief.title || "Market-Path Report"}
            </h1>
            {brief.summary && (
              <p className="text-base md:text-lg text-white/80 leading-relaxed">
                {brief.summary}
              </p>
            )}

            {metaChips.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {metaChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-1 text-[11px] uppercase tracking-[0.3em] text-white/70"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] mb-12">
          <DownloadCenter brief={brief} className="bg-[#070d1d]" />
          {showIntelligenceCta ? (
            <div className="rounded-2xl border border-white/15 bg-[#090f1f] p-4 shadow-[0_15px_35px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-white">
                <ExternalLink size={16} className="text-white/70" />
                Need the full intelligence narration?
              </div>
              <p className="text-sm text-white/70 mb-4">
                Dive into the McKinsey-style intelligence report for the deep narrative, appendices, and source pull-through.
              </p>
              <Button asChild size="sm" variant="secondary" className="w-full justify-center">
                <a href={intelligenceHref!} target="_blank" rel="noopener noreferrer">
                  View intelligence report
                </a>
              </Button>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/20 bg-[#070d1d] p-4 text-sm text-white/70 shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
              This run shipped only the Market-Path dossier. Use the downloads to share it; a McKinsey-style intelligence report will appear here when available.
            </div>
          )}
        </section>

        <section className="rounded-[32px] border border-white/10 bg-gradient-to-b from-[#070d1d] to-[#03060c] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
          <MarketPathContent htmlUrl={marketPathHtmlUrl} />
        </section>
      </section>
    </div>
  );
}
