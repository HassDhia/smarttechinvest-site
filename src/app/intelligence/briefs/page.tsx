import { SectionHeader } from "../../../components/SectionHeader";
import { BriefCard } from "../../../components/BriefCard";
import { listBriefs } from "../../../lib/content";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BriefsListPage() {
  const briefs = listBriefs();

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
          kicker="Weekly Briefs" 
          title="All Briefs" 
          subtitle="Complete archive of weekly strategic analysis and market insights." 
          useGradientTitle 
        />
        
        {briefs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {briefs.map((brief) => (
              <BriefCard
                key={brief.date}
                brief={brief}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[hsl(var(--muted-foreground))]">No weekly briefs available yet.</p>
            <Link href="/intelligence" className="text-sm text-[hsl(var(--primary))] hover:underline mt-2 inline-block">
              Return to Intelligence Hub
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
