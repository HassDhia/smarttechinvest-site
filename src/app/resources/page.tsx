import Image from "next/image";
import { Button } from "../../components/ui/Button";
import { SectionHeader } from "../../components/SectionHeader";
import { Card } from "../../components/Card";
import { FileText, BarChart3, Settings, BookOpen, Users, Share2 } from "lucide-react";
export default function Resources() {
  return (
    <section className="container section">
      <SectionHeader kicker="Pipeline Resources" title="Intelligence Engine Resources" subtitle="Documentation, guides, and templates to maximize your intelligence pipeline." useGradientTitle />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {[
          { title: "Engine Documentation", description: "Complete setup and integration guides", icon: BookOpen },
          { title: "Analytics Dashboard", description: "Track engagement, conversions, and ROI", icon: BarChart3 },
          { title: "Integration Guides", description: "Connect your existing systems", icon: Settings },
          { title: "Distribution Templates", description: "Social media post templates and best practices", icon: Share2 },
          { title: "Community Best Practices", description: "Engagement strategies and moderation guides", icon: Users },
          { title: "Report Templates", description: "Customizable report formats and structures", icon: FileText },
        ].map((item, idx) => (
          <Card key={item.title} title={item.title} description={item.description} icon={item.icon as any} highlight={idx === 0} />
        ))}
      </div>
      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {["before", "after"].map((seed, i) => (
          <div key={seed} className="rounded-xl p-[1px] bg-gradient-to-br from-[hsl(var(--ring))] via-[hsl(var(--border))] to-transparent">
            <figure className="relative rounded-[calc(var(--radius)+1px)] overflow-hidden bg-[hsl(var(--card))] dark:bg-card-gradient text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))] dark:border-transparent shadow-sm">
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={i === 0
                    ? "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?q=80&w=1600&auto=format&fit=crop"
                    : "https://images.unsplash.com/photo-1520881363902-a0ff4e722963?q=80&w=1600&auto=format&fit=crop"
                  }
                  alt={seed === "before" ? "Manual research process" : "Automated intelligence pipeline"}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                  priority={false}
                />
              </div>
              {/* Theme-aware overlays for readability and depth */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[hsl(var(--background)/0.35)] via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 hidden dark:block opacity-25 bg-aurora" aria-hidden />
              <figcaption className="relative px-4 py-3 font-semibold text-[hsl(var(--card-foreground))]">{seed === "before" ? "Manual Research" : "Automated Intelligence"}</figcaption>
            </figure>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button asChild variant="gradient">
          <a href="/schedule">Request Access</a>
        </Button>
      </div>
    </section>
  );
}


