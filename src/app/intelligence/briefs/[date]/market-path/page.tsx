import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { listBriefs, getBriefByDate } from "../../../../../lib/content";
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
    <div className="font-sans text-white bg-[#03060C] min-h-screen">
      <section className="container max-w-4xl py-12 space-y-10">
        <Link
          href="/intelligence/briefs"
          className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          Back to briefs
        </Link>

        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.45em] text-white/55">Market-Path Dossier</p>
          <div className="space-y-3">
            <h1 className="text-[2.5rem] font-semibold leading-tight text-white">
              {brief.title || "Market-Path Report"}
            </h1>
            {brief.summary && (
              <p className="text-base text-white/70 leading-relaxed max-w-3xl">
                {brief.summary}
              </p>
            )}
          </div>

          {metaChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-white/60">
              {metaChips.map((chip) => (
                <span key={chip} className="rounded-full border border-white/15 px-4 py-1">
                  {chip}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-3">
            <Button asChild variant="gradient" size="lg" className="uppercase tracking-[0.3em]">
              <a href={marketPathHtmlUrl} target="_blank" rel="noopener noreferrer">
                Open Market-Path report
              </a>
            </Button>
            {showIntelligenceCta && (
              <Button asChild variant="secondary" size="lg" className="uppercase tracking-[0.3em] text-white/80">
                <a href={intelligenceHref!} target="_blank" rel="noopener noreferrer">
                  View intelligence report
                </a>
              </Button>
            )}
          </div>
        </header>

        <section className="rounded-[32px] border border-white/10 bg-[#050913] p-8 shadow-[0_35px_70px_rgba(0,0,0,0.55)]">
          <MarketPathContent htmlUrl={marketPathHtmlUrl} />
        </section>
      </section>
    </div>
  );
}
