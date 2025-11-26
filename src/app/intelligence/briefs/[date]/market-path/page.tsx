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
    <div className="font-sans text-white min-h-screen bg-[#01030a] relative overflow-hidden">
      <div className="fixed inset-0 -z-20 bg-[#01030a]" aria-hidden="true" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#0b1b44] via-[#050c20] to-[#01030a]" aria-hidden="true" />
      <div className="fixed inset-x-0 top-0 -z-5 h-40 bg-gradient-to-b from-white/10 to-transparent blur-[60px]" aria-hidden="true" />

      <section className="container section max-w-5xl relative">
        <div className="mb-6">
          <Link
            href="/intelligence/briefs"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Briefs
          </Link>
        </div>

        <header className="space-y-3 mb-12">
          <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-[#111a36] via-[#070d1d] to-[#03060c] p-8 shadow-[0_40px_120px_rgba(1,3,10,0.8)]">
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

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-14">
          <DownloadCenter brief={brief} className="bg-[#090f1f]" />
          {showIntelligenceCta ? (
            <div className="rounded-[28px] border border-white/15 bg-[#0b1227] p-5 shadow-[0_25px_65px_rgba(0,0,0,0.45)]">
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-white">
                <ExternalLink size={16} className="text-white/70" />
                Need the full intelligence narration?
              </div>
              <p className="text-sm text-white/70 mb-5">
                Dive into the McKinsey-style intelligence report for the deep narrative, appendices, and source pull-through.
              </p>
              <Button asChild size="sm" variant="secondary" className="w-full justify-center uppercase tracking-[0.3em]">
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

        <section className="rounded-[36px] border border-white/10 bg-gradient-to-b from-[#0b142f] to-[#03060c] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
          <MarketPathContent htmlUrl={marketPathHtmlUrl} />
        </section>
      </section>
    </div>
  );
}
