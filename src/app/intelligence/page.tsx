import { Hero } from "../../components/Hero";
import { SectionHeader } from "../../components/SectionHeader";
import { Button } from "../../components/ui/Button";
import { IntelligenceCard } from "../../components/IntelligenceCard";
import { BriefCard } from "../../components/BriefCard";
import { getLatestBrief, getLatestDailies } from "../../lib/content";
import Link from "next/link";

export default function IntelligencePage() {
  const latestBrief = getLatestBrief();
  const latestDailies = getLatestDailies(6);

  return (
    <div className="font-sans">
      <Hero
        title="Daily Signals. Weekly Briefs. Operator Intelligence."
        subtitle="Analysis and insights for strategic decision-making in tech investments and operations."
        ctaText="Book a Strategy Call"
        ctaHref="/schedule"
        badge="Latest insights delivered weekly"
      />

      <section className="container section vt-section">
        <SectionHeader 
          kicker="Featured" 
          title="Latest Weekly Brief" 
          subtitle="In-depth analysis of market signals and strategic implications." 
          useGradientTitle 
        />
        
        {latestBrief ? (
          <div className="max-w-4xl mx-auto">
            <BriefCard brief={latestBrief} highlight />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[hsl(var(--muted-foreground))]">No briefs available yet.</p>
          </div>
        )}
      </section>

      <section className="container section vt-section">
        <SectionHeader 
          kicker="Daily Signals" 
          title="Latest Analysis" 
          subtitle="Daily insights on market shifts, technology trends, and operational patterns." 
          useGradientTitle 
        />
        
        {latestDailies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestDailies.map((daily) => (
              <IntelligenceCard
                key={daily.slug}
                title={daily.frontmatter.title}
                date={daily.frontmatter.date}
                summary={daily.frontmatter.summary}
                href={daily.href}
                type="daily"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[hsl(var(--muted-foreground))]">No daily signals available yet.</p>
          </div>
        )}
      </section>

      <section className="container section vt-section">
        <div className="text-center">
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Button asChild variant="gradient" size="lg">
              <Link href="/intelligence/briefs">Read Weekly Briefs</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/intelligence/daily">Browse Daily Signals</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
