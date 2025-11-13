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
        subtitle="STI designs and runs your Partnership Pitch Engine™ — the decks, activation concepts, and narratives that win real partnerships."
        body="One flagship pitch. One activation concept. One system you can reuse with every brand you want."
        ctaText="Build My Partnership Deck"
        ctaHref="/schedule"
        secondaryCtaText="How the Engine Works"
        secondaryCtaHref="#partnership-lane"
      />
      <section id="partnership-lane" className="container section vt-section">
        <SectionHeader title="What We Actually Do" subtitle="We turn partnerships from a hope into a lane." useGradientTitle />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            title="Partnership Pitch Development"
            description="Flagship decks designed like campaign treatments — built to win attention and earn replies from specific brands."
            icon={Presentation}
            highlight
          />
          <Card
            title="Activation Concept Design"
            description="On-premise, event, and digital concepts that turn your partnership into something people can see, visit, photograph, and talk about."
            icon={Sparkles}
          />
          <Card
            title="Reusable Partnership System"
            description="A narrative, visual identity, and slide framework you can reuse across partners instead of rewriting your story every time."
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
              hideMetadata
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
            role="Strategy"
            year="2025"
            outcome="$850K ARR pipeline generated"
            description="Rebuilt partner story repositioned us from vendor to strategic collaborator."
            highlight
            image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop"
          />
          <WorkCard
            title="Campaign-Ready Pitch System"
            role="Partnership Design"
            year="2025"
            outcome="47% response rate, 3 deals closed"
            description="New narrative system standardized our approach across multiple brands."
            image="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop"
          />
          <WorkCard
            title="Local Activation Concept"
            role="Activation Design"
            year="2024"
            outcome="$120K revenue in 48 hours"
            description="Zero-new-SKU activation concept drove immediate revenue without inventory changes."
            image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
          />
        </div>
      </section>
      <section id="outcomes" className="container section vt-section">
        <SectionHeader kicker="Proof" title="Outcomes of the Partnership Pitch Engine" useGradientTitle />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <KPIStat 
            value="47% response rate" 
            label="from partnership pitch decks across 3 campaigns"
            comparison="(vs ~12% typical outbound response)"
          />
          <KPIStat 
            value="$2.4M ARR pipeline" 
            label="generated in Q1 2025"
            description="from 3 high-intent partner pitches"
          />
          <KPIStat 
            value="18-day close" 
            label="from pitch to signed deal"
            description="with 92% conversion once a warm intro was in place"
            comparison="(vs 90-day+ sales cycle before)"
          />
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
            We&apos;ll design the pitch, story, and activation concept that wins real partnerships.
          </p>
          <Button asChild variant="gradient" size="lg">
            <Link href="/schedule">Build My Partnership Deck</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
