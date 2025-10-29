import { Hero } from "../../components/Hero";
import { SectionHeader } from "../../components/SectionHeader";
import { Button } from "../../components/ui/Button";
import { IntelligenceCard } from "../../components/IntelligenceCard";
import { BriefCard } from "../../components/BriefCard";
import { FeaturedBriefCard } from "../../components/FeaturedBriefCard";
import { DailySignalCard } from "../../components/DailySignalCard";
import { SignalsTicker } from "../../components/SignalsTicker";
import { OperatorQuickWins } from "../../components/OperatorQuickWins";
import { BriefSpecs } from "../../components/BriefSpecs";
import { DownloadCenter } from "../../components/DownloadCenter";
import { getLatestBrief, getLatestDailies, enrichBriefData, listBriefs } from "../../lib/content";
import Link from "next/link";

export default function IntelligencePage() {
  // Get ALL briefs
  const allBriefs = listBriefs();
  const latestDailies = getLatestDailies(6);
  
  // Enrich ALL briefs
  const enrichedBriefs = allBriefs
    .map(b => enrichBriefData(b.date))
    .filter((b): b is NonNullable<typeof b> => b !== null);

  const latestEnrichedBrief = enrichedBriefs[0] || null;

  // Debug: log if brief is missing
  if (!latestEnrichedBrief && process.env.NODE_ENV === 'development') {
    console.log('No enriched brief data found. All briefs:', allBriefs.length);
  }

  return (
    <div className="font-sans">
      <Hero
        title="Daily Signals. Weekly Briefs. Operator Intelligence."
        subtitle="Analysis and insights for strategic decision-making in tech investments and operations."
        ctaText="Book a Strategy Call"
        ctaHref="/schedule"
        badge="Latest insights delivered weekly"
      />

             <section className="container section py-12 md:py-16">
               <SectionHeader
                 kicker="Research Reports"
                 title="Intelligence Briefs"
                 subtitle="Comprehensive analysis of technology trends, market signals, and strategic insights."
                 useGradientTitle
               />

               {enrichedBriefs.length > 0 ? (
                 <>
                   {/* Featured: Top 4 briefs in responsive grid */}
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                     {enrichedBriefs.slice(0, 4).map((brief) => (
                       <FeaturedBriefCard
                         key={brief.date}
                         brief={brief}
                         highlight={brief.date === enrichedBriefs[0]?.date}
                       />
                     ))}
                   </div>
            
            {/* Archive: Remaining briefs */}
            {enrichedBriefs.length > 4 && (
              <>
                <h3 className="text-lg font-semibold text-foreground mb-4 mt-8">
                  Archive
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {enrichedBriefs.slice(4).map((brief) => (
                    <FeaturedBriefCard 
                      key={brief.date} 
                      brief={brief}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-[hsl(var(--muted-foreground))]">No briefs available yet.</p>
          </div>
        )}
      </section>

             <section className="container section py-12 md:py-16">
               <SectionHeader
                 kicker="Daily Signals"
                 title="Latest Analysis"
                 subtitle="Daily insights on market shifts, technology trends, and operational patterns."
                 useGradientTitle
               />

               {latestDailies.length > 0 ? (
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   {/* Left column - Daily Signal Cards */}
                   <div className="lg:col-span-2">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {latestDailies.map((daily) => (
                         <DailySignalCard
                           key={daily.slug}
                           daily={daily}
                           socialHook={latestEnrichedBrief?.socialHook}
                         />
                       ))}
                     </div>
                   </div>

                   {/* Right column - Supporting cards */}
                   <div className="space-y-4">
                     {/* Signals Ticker */}
                     {latestEnrichedBrief && (
                       <SignalsTicker brief={latestEnrichedBrief} />
                     )}

                     {/* Operator Quick Wins */}
                     {latestEnrichedBrief && (
                       <OperatorQuickWins brief={latestEnrichedBrief} />
                     )}

                     {/* Brief Specs */}
                     {latestEnrichedBrief && (
                       <BriefSpecs brief={latestEnrichedBrief} />
                     )}

                     {/* Download Center */}
                     {latestEnrichedBrief && (
                       <DownloadCenter brief={latestEnrichedBrief} />
                     )}
                   </div>
                 </div>
               ) : (
                 // When no dailies, show supporting cards in a responsive grid
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                   {latestEnrichedBrief && <SignalsTicker brief={latestEnrichedBrief} />}
                   {latestEnrichedBrief && <OperatorQuickWins brief={latestEnrichedBrief} />}
                   {latestEnrichedBrief && <BriefSpecs brief={latestEnrichedBrief} />}
                   {latestEnrichedBrief && <DownloadCenter brief={latestEnrichedBrief} />}
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
