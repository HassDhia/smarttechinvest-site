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
      tagline: "Full intelligence pipeline for your vertical.",
      bullets: [
        "8-12 reports/month (market + thesis mix)",
        "Board-ready slide deck per report",
        "Audio overview per report",
        "Community thread per report + AI moderation",
        "Distribution to 2-3 channels (LinkedIn, Medium, Twitter)",
        "Website integration with SEO optimization",
        "Analytics dashboard & ROI tracking"
      ],
      anchor: "Starting at $12k–$25k/mo",
      cta: "Request Demo",
      highlight: false,
    },
    {
      title: "Premium",
      tagline: "Everything in Core, plus advanced capabilities.",
      bullets: [
        "Everything in Core",
        "Custom foresight modules & predictive analytics",
        "On-site advisor widget (RAG-powered Q&A)",
        "Quarterly strategy review & optimization",
        "Additional distribution channels",
        "Priority support & custom integrations",
        "White-label options"
      ],
      anchor: "Starting at $25k+/mo",
      cta: "Request Demo",
      highlight: true,
    },
    {
      title: "Enterprise",
      tagline: "Multiple verticals and custom instances.",
      bullets: [
        "Everything in Premium",
        "Multiple vertical instances",
        "Dedicated account management",
        "Custom report templates & workflows",
        "API access for integrations",
        "SLA guarantees",
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
        kicker="Intelligence Engine" 
        title="Pricing & Packages" 
        subtitle="Turnkey business intelligence ecosystem that generates insights, drives engagement, and creates revenue impact." 
        useGradientTitle 
      />
      <div className="mt-3 text-sm rounded-xl border px-3 py-2 bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))]">
        Risk reversal: If we&apos;re not delivering clear value in 30 days, you can opt out — no hard feelings.
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
        <p>All tiers include full pipeline setup, integration support, and ongoing maintenance.</p>
        <p className="mt-2">Questions? <Link href="/schedule" className="text-[hsl(var(--primary))] hover:underline">Schedule a consultation</Link> to discuss your needs.</p>
      </div>
    </section>
  );
}


