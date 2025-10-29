import { SectionHeader } from "../../../components/SectionHeader";
import { IntelligenceCard } from "../../../components/IntelligenceCard";
import { getAllDailies } from "../../../lib/content";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DailyListPage() {
  const allDailies = getAllDailies();

  return (
    <div className="font-sans">
      <section className="container section vt-section">
        <div className="mb-6">
          <Link 
            href="/intelligence" 
            className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Intelligence
          </Link>
        </div>
        
        <SectionHeader 
          kicker="Daily Signals" 
          title="All Analysis" 
          subtitle="Complete archive of daily insights and market signals." 
          useGradientTitle 
        />
        
        {allDailies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allDailies.map((daily) => (
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
            <Link href="/intelligence" className="text-sm text-[hsl(var(--primary))] hover:underline mt-2 inline-block">
              Return to Intelligence Hub
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
