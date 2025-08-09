"use client";
import { Button } from "../../components/ui/Button";
import { StaggerList } from "../../components/StaggerList";
import Link from "next/link";
import { microPress } from "../../lib/motion";
import { m } from "framer-motion";

export default function Offers() {
  const offers = [
    {
      title: "Pilot: Clarity Sprint",
      tagline: "2–4 weeks to diagnose constraints and implement core systems.",
      bullets: ["Strategy review + OKR draft", "Pipeline and GTM audit", "1 dashboard + cadence install"],
      anchor: "Typical investment: $5k–$12k",
      cta: "Start Sprint",
    },
    {
      title: "Fractional Chief of Strategy",
      tagline: "Executive leverage without the full-time overhead.",
      bullets: ["Weekly operating cadence", "Pricing, positioning, GTM projects", "Systems and team enablement"],
      anchor: "Typical investment: $6k–$18k/mo",
      cta: "Book Intro",
      highlight: true,
    },
    {
      title: "Advisory Retainer",
      tagline: "Ongoing counsel for founders and leadership teams.",
      bullets: ["Monthly strategy sessions", "On-call support", "Deal, hiring, and roadmap guidance"],
      anchor: "Typical investment: $2k–$6k/mo",
      cta: "Check Fit",
    },
  ];
  return (
    <section className="container section">
      <h1 className="font-extrabold tracking-tight text-foreground">Productized Offers</h1>
      <p className="mt-1 text-foreground/90">Start small, move fast, and scale what works.</p>
      <div className="mt-3 text-sm rounded-xl border px-3 py-2 bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))]">
        Risk reversal: If we’re not adding clear value in 30 days, you can opt out — no hard feelings.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <StaggerList
          items={offers}
          render={(o) => (
            <m.article
              className={`rounded-2xl p-5 bg-card/90 text-[hsl(var(--card-foreground))] border ${o.highlight ? "border-[hsl(var(--ring))] shadow-[var(--shadow)]" : "border-[hsl(var(--border)/0.6)] shadow-[var(--shadow-sm)]"} transition-[background,box-shadow,transform] duration-[var(--dur-200)] ease-[var(--ease-standard)] hover:-translate-y-0.5 hover:shadow-[var(--shadow)] hover:bg-accent/40`}
              {...microPress}
            >
              <h3 className="text-lg font-bold text-foreground">{o.title}</h3>
              <p className="font-semibold text-[hsl(var(--foreground)/0.9)] mt-1">{o.tagline}</p>
              <ul className="list-disc pl-5 my-3 text-sm leading-6">
                {o.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="font-bold text-foreground/90">{o.anchor}</p>
              <div className="mt-3">
                <Button asChild>
                  <Link href="/schedule">{o.cta}</Link>
                </Button>
              </div>
            </m.article>
          )}
        />
      </div>
    </section>
  );
}


