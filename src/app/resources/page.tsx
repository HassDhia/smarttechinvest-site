import Image from "next/image";
import { Button } from "../../components/ui/Button";
import { SectionHeader } from "../../components/SectionHeader";
import { Card } from "../../components/Card";
import { FileText, BarChart3, ClipboardList } from "lucide-react";
export default function Resources() {
  return (
    <section className="container section">
      <SectionHeader kicker="Resources" title="Strategy OS Resources" subtitle="Templates and assets to run a high‑leverage operating cadence." useGradientTitle />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {[
          { title: "Weekly Review", description: "Agenda + scorecard", icon: ClipboardList },
          { title: "Pipeline Dashboard", description: "Stage health + forecast", icon: BarChart3 },
          { title: "OKR Planner", description: "Quarterly alignment", icon: FileText },
        ].map((item, idx) => (
          <Card key={item.title} title={item.title} description={item.description} icon={item.icon as any} highlight={idx === 1} />
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
                  alt={seed === "before" ? "Corporate disorder" : "Corporate polish and prestige"}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                  priority={false}
                />
              </div>
              {/* Theme-aware overlays for readability and depth */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[hsl(var(--background)/0.35)] via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 hidden dark:block opacity-25 bg-aurora" aria-hidden />
              <figcaption className="relative px-4 py-3 font-semibold text-[hsl(var(--card-foreground))]">{seed === "before" ? "Before" : "After"}</figcaption>
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


