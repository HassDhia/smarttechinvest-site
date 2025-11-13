import { Hero } from "../components/Hero";
import { KPIStat } from "../components/KPIStat";
import { LogoStrip } from "../components/LogoStrip";
import { SectionHeader } from "../components/SectionHeader";
import { WorkCard } from "../components/WorkCard";
import { Card } from "../components/Card";
import { MiniTOC } from "../components/MiniTOC";
import { TestimonialsCarousel } from "../components/TestimonialsCarousel";
import { BriefCard } from "../components/BriefCard";
import { listBriefs } from "../lib/content";
import { Presentation, Sparkles, Repeat } from "lucide-react";
import Link from "next/link";
import { Button } from "../components/ui/Button";

export default function Home() {
  const latestBriefs = listBriefs();

  return (
    <div className="font-sans">
      <MiniTOC sections={[{ id: "partnership-lane", label: "Partnership Lane" }, { id: "intelligence", label: "Intelligence" }, { id: "work", label: "Selected Work" }, { id: "outcomes", label: "Outcomes" }]} />
      <Hero
        title="Turn Your Business Into a Brand Magnet"
        subtitle="STI designs and runs your Partnership Pitch Engine™ — cinematic decks, activation concepts, and strategic narratives that make brands say &apos;yes.&apos;"
        body="A flagship pitch. A story that travels. A system you can reuse for every partner."
        ctaText="Build My Partnership Deck"
        ctaHref="/schedule"
        secondaryCtaText="How the Engine Works"
        secondaryCtaHref="#partnership-lane"
      />
      <section id="partnership-lane" className="container section vt-section">
        <SectionHeader kicker="What We Actually Do" title="What We Actually Do" subtitle="We turn partnerships from a hope into a lane." useGradientTitle />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            title="Partnership Pitch Development"
            description="Flagship decks designed like high-end campaign treatments — built to open doors and earn &apos;yes&apos; responses from target brands."
            icon={Presentation}
            highlight
          />
          <Card
            title="Activation Concept Design"
            description="Environment, event, and digital-ready activations that make your partnership feel lived-in, not hypothetical."
            icon={Sparkles}
          />
          <Card
            title="Reusable Partnership System"
            description="A narrative, visual identity, and structural framework you can repurpose across partners without reinventing your story."
            icon={Repeat}
          />
        </div>
      </section>
      
      <section id="intelligence" className="container section vt-section">
        <SectionHeader kicker="Domain Expertise" title="Domain Expertise That Powers the Work" subtitle="We track emerging markets, tech shifts, and cultural signals — then weaponize that insight inside your pitch and activation concept." useGradientTitle />
        
        {latestBriefs.length > 0 && (
          <div className="max-w-2xl mx-auto">
            <BriefCard 
              key={latestBriefs[0].date} 
              brief={latestBriefs[0]} 
              highlight
            />
          </div>
        )}
        
        <div className="text-center mt-6">
          <Link href="/intelligence" className="text-sm text-[hsl(var(--primary))] hover:underline">
            Explore All Intelligence →
          </Link>
        </div>
      </section>
      
      <div className="divide-gradient container mt-10" aria-hidden />
      <LogoStrip />
      <section id="work" className="container section vt-section">
        <SectionHeader kicker="Case Studies" title="Selected Work" subtitle="Partnership wins, narrative repositioning, and activation concept performance." useGradientTitle />
        <div className="grid md:grid-cols-3 gap-6">
          <WorkCard
            title="Partnership Narrative Overhaul"
            role="Partnership Strategy"
            year="2025"
            outcome="$850K ARR pipeline generated"
            highlight
            image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop"
          />
          <WorkCard
            title="Campaign-Ready Pitch System"
            role="Partnership Design"
            year="2025"
            outcome="47% response rate, 3 deals closed"
            image="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop"
          />
          <WorkCard
            title="Local Activation Concept"
            role="Activation Design"
            year="2024"
            outcome="$120K revenue in 48 hours"
            image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
          />
        </div>
      </section>
      <section id="outcomes" className="container section vt-section">
        <SectionHeader kicker="Proof" title="Outcomes of the Partnership Pitch Engine" useGradientTitle />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPIStat label="47% response rate" value="vs. 12% industry average" hint="from partnership pitch decks" />
          <KPIStat label="$2.4M ARR pipeline" value="from 3 partnership decks" hint="generated in Q1 2025" />
          <KPIStat label="18-day close" value="vs. 90-day average" hint="from pitch to signed deal" />
          <KPIStat label="92% conversion" value="from warm intro to signed deal" hint="with activation-ready decks" />
        </div>
      </section>
      <section className="container section vt-section">
        <SectionHeader kicker="Social Proof" title="What Clients Say" />
        <TestimonialsCarousel />
      </section>
      <section className="container section vt-section">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-extrabold tracking-tight fs-step-3 text-gradient mb-3">Ready to Win Your Dream Partnership?</h2>
          <p className="text-foreground/90 fs-step-0 mb-6">
            We&apos;ll design the pitch, story, and activation concept that gets the right brand to say &apos;yes.&apos;
          </p>
          <Button asChild variant="gradient" size="lg">
            <Link href="/schedule">Build My Partnership Deck</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
