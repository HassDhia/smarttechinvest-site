import { SectionHeader } from "../../components/SectionHeader";
import { listBriefs } from "../../lib/content";
import Link from "next/link";

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
            {allBriefs.map((brief) => (
              <div
                key={brief.date}
                className="border-b border-[hsl(var(--border))] pb-6 last:border-0"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="text-xs text-[hsl(var(--muted-foreground))] font-mono min-w-[120px]">
                    {new Date(brief.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
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
                        href={`/intelligence/briefs/${brief.date}`}
                        className="text-sm font-medium text-[hsl(var(--primary))] hover:underline"
                      >
                        Read brief →
                      </Link>
                      {brief.pdf && (
                        <>
                          <span className="text-[hsl(var(--muted-foreground))]">·</span>
                          <Link
                            href={brief.pdf}
                            className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            PDF
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
