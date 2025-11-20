import { SectionHeader } from "../components/SectionHeader";
import { BriefCard } from "../components/BriefCard";
import { SocialProofStrip } from "../components/SocialProofStrip";
import { CoreOfferCards } from "../components/CoreOfferCards";
import { listBriefs } from "../lib/content";
import Link from "next/link";
import { Button } from "../components/ui/Button";

export default function Home() {
  const latestBriefs = listBriefs();
  const featuredBrief = latestBriefs[0];

  const personas = [
    {
      title: "Operators & Local Brands",
      description: "Independent shops, venues, hospitality, and DTC operators who want growth without adding operational drag.",
      bullets: [
        "Use your story and foot traffic to attract bigger brand spend",
        "Keep operations light",
        "Turn relevance into partnerships",
      ],
    },
    {
      title: "Studios, Agencies, Brand Teams",
      description: "Streamers, film/TV, lifestyle brands, and creative agencies who need partners that feel lived in, not borrowed.",
      bullets: [
        "Source authentic operators and locations",
        "Plug signal intelligence into campaigns fast",
        "Work with someone who can run point",
      ],
    },
  ];

  const workItems = [
    {
      signal: "Market signal",
      description: "Identified shift from vendor relationships to strategic partnerships in DTC space. Repositioned brand narrative drove measurable pipeline growth.",
      outcome: "$850K ARR pipeline generated",
    },
    {
      signal: "Behavioral signal",
      description: "Analyzed partnership response patterns across 12 brands to identify narrative gaps. Signal-driven narrative system delivered higher conversion rates.",
      outcome: "47% response rate, 3 deals closed",
    },
    {
      signal: "Operational signal",
      description: "Identified trend toward zero-new-SKU activations in retail partnerships. Signal-informed activation concept drove immediate revenue without inventory changes.",
      outcome: "$120K revenue in 48 hours",
    },
  ];

  return (
    <div className="font-sans">
      {/* Section 1: Hero Section */}
      <section id="hero" className="container section">
        <div className="max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance mb-6">
            Signal-Driven Brand Collaborations for Operators and Storytellers
          </h1>
          <p className="text-lg md:text-xl text-foreground/90 max-w-xl mb-10 leading-relaxed">
            I turn the way people move, buy, gather, and talk into campaign-ready concepts, decks, and outreach logic that brands can activate immediately.
          </p>
          <Button asChild variant="gradient" size="lg">
            <Link href="/schedule">Book the Brand Collab Lab</Link>
          </Button>
        </div>
      </section>

      {/* Section 2: Social Proof Strip */}
      <SocialProofStrip />

      {/* Section 3: Core Offer (Brand Collab Lab) */}
      <section id="collab-lab" className="container section vt-section">
        <SectionHeader 
          number="01 · Core Offer"
          title="The Brand Collab Lab" 
          subtitle="A 45-minute creative lab that turns your world into a brand-ready concept, a forwardable deck spine, and an outreach sequence you can use immediately — without adding drag to your operation." 
          useGradientTitle 
        />
        <CoreOfferCards />
        <div className="text-center mt-12">
          <Button asChild variant="gradient" size="lg">
            <Link href="/schedule">Book the Brand Collab Lab</Link>
          </Button>
          <div className="mt-4">
            <Link href="/collab-lab" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:underline">
              See what you leave with →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Who It's For + Founder */}
      <section id="who" className="container section vt-section">
        <SectionHeader 
          number="02 · Who It's For"
          title="Who It's For" 
          useGradientTitle 
        />
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          {personas.map((persona) => (
            <div
              key={persona.title}
              className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8"
            >
              <h3 className="text-2xl font-semibold text-foreground mb-3">{persona.title}</h3>
              <p className="text-sm text-foreground/70 mb-6 leading-relaxed">{persona.description}</p>
              <ul className="space-y-3">
                {persona.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm text-foreground/70">
                    <span className="text-[hsl(var(--primary))] mt-1">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Proof of Capability (Case Study Grid) */}
      <section id="work" className="container section vt-section">
        <SectionHeader 
          number="03 · Proof"
          title="Selected Work" 
          subtitle="Signal identification → outcome achievement. How behavioral signals drive measurable brand results." 
          useGradientTitle 
        />
        <div className="grid gap-6 md:grid-cols-3">
          {workItems.map((item) => (
            <article
              key={item.outcome}
              className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-4">
                {item.signal}
              </p>
              <p className="text-sm text-[hsl(var(--card-foreground))]/80 mb-6 leading-relaxed">{item.description}</p>
              <p className="text-xl font-bold text-[hsl(var(--primary))]">{item.outcome}</p>
            </article>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/work" className="text-sm font-medium text-[hsl(var(--primary))] hover:underline">
            View More Proof →
          </Link>
        </div>
      </section>

      {/* Section 6: Intelligence Engine (Secondary) */}
      <section id="intelligence" className="container section vt-section">
        <SectionHeader
          number="04 · Intelligence"
          title="Intelligence That Drives the Collabs"
          subtitle="Weekly briefs on AI, culture, influence, and behavioral signals — distilled to what operators and brand teams actually need."
          useGradientTitle
        />
        {featuredBrief ? (
          <BriefCard brief={featuredBrief} highlight hideMetadata />
        ) : (
          <div className="rounded-xl border border-dashed border-[hsl(var(--border))] p-8 text-sm text-[hsl(var(--muted-foreground))]">
            Intelligence briefs coming online soon.
          </div>
        )}
        <div className="mt-8">
          <Link href="/intelligence" className="text-sm font-medium text-[hsl(var(--primary))] hover:underline">
            Browse all intelligence →
          </Link>
        </div>
      </section>

      {/* Section 7: Final CTA Section */}
      <section id="cta" className="container section vt-section">
        <div className="bg-[hsl(var(--muted))] p-12 md:p-16 text-center rounded-xl">
          <h2 className="text-4xl font-semibold tracking-tight mb-4">
            Ready to Build a Brand Collaboration That Actually Lands?
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
            If 2026 needs more revenue, more story, and more visibility — without more weight — the next step is simple.
          </p>
          <Button asChild variant="gradient" size="lg">
            <Link href="/schedule">Book the Brand Collab Lab</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
