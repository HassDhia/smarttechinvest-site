"use client";
import { Button } from "../../components/ui/Button";
import { StaggerList } from "../../components/StaggerList";
import Link from "next/link";
import { microPress } from "../../lib/motion";
import { m } from "framer-motion";
import { SectionHeader } from "../../components/SectionHeader";

export default function Offers() {
  const tiers = [
    {
      title: "Flagship Signal Analysis",
      tagline: "Behavioral signal identification → Strategic positioning → Brand outcome",
      bullets: [
        "Market intelligence & behavioral signal analysis",
        "Strategic narrative architecture based on signals",
        "Cinematic, campaign-style pitch deck",
        "Activation storyboard (in-store, event, digital)",
        "Brand partnership positioning from signal insights",
        "Visual & identity direction",
        "Reusable pitch structure + messaging framework",
        "Discovery + strategic consultation session"
      ],
      anchor: "$15K – $30K",
      anchorNote: "(Depending on industry, depth, and creative scope)",
      cta: "Request Demo",
      highlight: false,
    },
    {
      title: "Signal System",
      tagline: "Multiple signal streams → Multi-outcome architecture",
      bullets: [
        "Everything in Flagship Signal Analysis, plus:",
        "Ongoing behavioral signal monitoring & analysis",
        "2–4 tailored pitch variants for specific brands",
        "Expanded activation concepts (multiple environments)",
        "Priority narrative refinement & deck revisions",
        "Partnership pipeline development from signal insights",
        "Founder/BD team coaching on signal-driven pitch delivery",
        "Brand-fit analysis & message testing",
        "Custom asset set (one-pagers, scripts, thematic identity)"
      ],
      anchor: "Starting at $35K+",
      cta: "Request Demo",
      highlight: true,
    },
    {
      title: "Outcome Engine",
      tagline: "Continuous signal monitoring → Ongoing outcome optimization",
      bullets: [
        "Everything in Signal System, plus:",
        "Continuous behavioral signal monitoring & analysis",
        "Ongoing partnership pipeline management",
        "Monthly pitch variants (per partner) based on latest signals",
        "Dedicated account strategist",
        "Custom framework & visual system development",
        "Quarterly strategy & performance reviews",
        "Activation support (from concept to prep)",
        "Unlimited narrative revisions",
        "Team onboarding + training on signal analysis",
        "Priority turnaround"
      ],
      anchor: "Custom",
      anchorNote: "(typically $8K–$20K/month, scope-based)",
      cta: "Contact Sales",
      highlight: false,
    },
  ];
  return (
    <section className="container section">
      <SectionHeader 
        kicker="Signal-to-Outcome Packages" 
        title="Pricing & Packages" 
        subtitle="Behavioral signal analysis → strategic positioning → measurable brand outcomes. We identify the signals that matter and transform them into partnerships, revenue, and brand positioning." 
        useGradientTitle 
      />
      <div className="mt-3 text-sm rounded-xl border px-3 py-2 bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))]">
        Risk reversal: If your partnership deck doesn&apos;t get brands excited, we&apos;ll revise until it does — no hard feelings.
      </div>
      <StaggerList
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        items={tiers}
        render={(tier) => (
          <m.article
            className={`rounded-2xl p-6 bg-card text-[hsl(var(--card-foreground))] border ${tier.highlight ? "border-[hsl(var(--ring))] shadow-[var(--shadow)]" : "border-[hsl(var(--border))] shadow-[var(--shadow-sm)]"} transition-[background,box-shadow,transform] duration-[var(--dur-200)] ease-[var(--ease-standard)] hover:-translate-y-0.5 hover:shadow-[var(--shadow)] hover:bg-[hsl(var(--accent)/0.4)]`}
            {...microPress}
          >
            <h3 className="text-xl font-bold text-foreground">{tier.title}</h3>
            <p className="font-semibold text-[hsl(var(--foreground)/0.9)] mt-2 mb-4">{tier.tagline}</p>
            <div className="mb-4">
              <p className="text-sm font-semibold text-[hsl(var(--muted-foreground))] mb-1">What you get:</p>
              <ul className="list-disc pl-5 text-sm leading-6 space-y-1.5">
                {tier.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4 mb-4">
              <p className="text-sm font-semibold text-[hsl(var(--muted-foreground))] mb-1">Price:</p>
              <p className="font-bold text-foreground/90">{tier.anchor}</p>
              {tier.anchorNote && (
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{tier.anchorNote}</p>
              )}
            </div>
            <div className="mt-4">
              <Button asChild variant={tier.highlight ? "gradient" : "secondary"} className="w-full">
                <Link href="/schedule">{tier.cta}</Link>
              </Button>
            </div>
          </m.article>
        )}
      />
      <div className="mt-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
        <p>All tiers include signal analysis, strategic consultation, deck design, and framework development.</p>
        <p className="mt-2">Questions? <Link href="/schedule" className="text-[hsl(var(--primary))] hover:underline">Schedule a consultation</Link> to discuss how behavioral signals can drive your brand outcomes.</p>
      </div>
    </section>
  );
}


