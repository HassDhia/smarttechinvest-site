import { SectionHeader } from "../../components/SectionHeader";
import { listBriefs } from "../../lib/content";
import Link from "next/link";
import Image from "next/image";

function formatBriefDate(raw: string | undefined) {
  if (!raw) return { label: "—", dateTime: undefined };
  
  const datePart = raw.slice(0, 10);
  const [year, month, day] = datePart.split("-");
  if (!year || !month || !day) {
    return { label: "—", dateTime: undefined };
  }
  
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(date.getTime())) {
    return { label: "—", dateTime: undefined };
  }
  
  return {
    label: date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    dateTime: datePart,
  };
}

export default function IntelligencePage() {
  const allBriefs = listBriefs();

  return (
    <div className="font-sans">
      <section className="container section">
        <SectionHeader
          title="Intelligence That Drives the Collabs"
          subtitle="Weekly briefs on AI, culture, influence, and behavioral signals — distilled to what operators and brand teams actually need."
          useGradientTitle
        />
      </section>

      <section className="container section vt-section">
        {allBriefs.length > 0 ? (
          <div className="space-y-6 max-w-4xl">
            {allBriefs.map((brief) => {
              const { label, dateTime } = formatBriefDate(brief.date);
              const previewImage = brief.heroImage || "/assets/og/default-brief.png";

              return (
                <div
                  key={brief.date}
                  className="border-b border-[hsl(var(--border))] pb-6 last:border-0"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="text-xs text-[hsl(var(--muted-foreground))] font-mono min-w-[120px]">
                      {dateTime ? (
                        <time dateTime={dateTime}>{label}</time>
                      ) : (
                        <span>{label}</span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row gap-4">
                      <div className="relative w-full sm:w-40 h-36 rounded-lg overflow-hidden bg-[hsl(var(--muted)/0.3)] flex-shrink-0">
                        <Image
                          src={previewImage}
                          alt={brief.title ? `${brief.title} preview` : "Brief preview"}
                          fill
                          sizes="(min-width: 1024px) 160px, (min-width: 640px) 40vw, 100vw"
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {brief.title || "Intelligence Brief"}
                        </h3>
                        {brief.summary && (
                          <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
                            {brief.summary}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2 items-center">
                          <Link
                            href={brief.href}
                            className="text-sm font-medium text-[hsl(var(--primary))] hover:underline"
                          >
                            Read brief →
                          </Link>
                          {brief.marketPathHtml && (
                            <>
                              <span className="text-[hsl(var(--muted-foreground))]">·</span>
                              <Link
                                href={brief.marketPathHtml}
                                className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Market-Path HTML
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[hsl(var(--muted-foreground))]">No briefs available yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
