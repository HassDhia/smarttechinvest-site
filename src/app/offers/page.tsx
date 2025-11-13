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
      title: "Core",
      tagline: "Flagship partnership deck and activation framework.",
      bullets: [
        "Flagship partnership deck (cinematic, campaign-style)",
        "Activation storyboard (in-store, on-premise, digital)",
        "Reusable framework template",
        "Strategic narrative development",
        "Brand partnership positioning",
        "Initial consultation & strategy session"
      ],
      anchor: "Starting at $12k–$25k",
      cta: "Request Demo",
      highlight: false,
    },
    {
      title: "Premium",
      tagline: "Everything in Core, plus advanced capabilities.",
      bullets: [
        "Everything in Core",
        "Multiple partnership decks (3-5 brands)",
        "Advanced activation concepts",
        "Strategic consultation & optimization",
        "Partnership pipeline development",
        "Priority support & revisions",
        "Custom framework adaptations"
      ],
      anchor: "Starting at $25k+",
      cta: "Request Demo",
      highlight: true,
    },
    {
      title: "Enterprise",
      tagline: "Ongoing partnership pipeline and dedicated support.",
      bullets: [
        "Everything in Premium",
        "Ongoing partnership pipeline management",
        "Dedicated account management",
        "Custom framework development",
        "Quarterly strategy reviews",
        "Unlimited revisions & consultations",
        "Training & onboarding included"
      ],
      anchor: "Custom pricing",
      cta: "Contact Sales",
      highlight: false,
    },
  ];
  return (
    <section className="container section">
      <SectionHeader 
        kicker="Partnership Pitch Engine" 
        title="Pricing & Packages" 
        subtitle="Partnership deck packages: cinematic decks, activation concepts, and strategic narratives that make brands say 'yes.'" 
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
            <ul className="list-disc pl-5 my-3 text-sm leading-6 space-y-1.5">
              {tier.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="font-bold text-foreground/90 mt-4 mb-4">{tier.anchor}</p>
            <div className="mt-4">
              <Button asChild variant={tier.highlight ? "gradient" : "secondary"} className="w-full">
                <Link href="/schedule">{tier.cta}</Link>
              </Button>
            </div>
          </m.article>
        )}
      />
      <div className="mt-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
        <p>All tiers include strategic consultation, deck design, and framework development.</p>
        <p className="mt-2">Questions? <Link href="/schedule" className="text-[hsl(var(--primary))] hover:underline">Schedule a consultation</Link> to discuss your partnership goals.</p>
      </div>
    </section>
  );
}


