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
        title="Turn Behavioral Signals Into Brand Outcomes"
        subtitle="STI transforms market intelligence, cultural shifts, and operational patterns into measurable brand wins — partnerships, revenue, and strategic positioning."
        body="We read the signals. You get the outcomes."
        ctaText="Build My Partnership Deck"
        ctaHref="/schedule"
        secondaryCtaText="How Signals Drive Outcomes"
        secondaryCtaHref="#partnership-lane"
      />
      <section id="partnership-lane" className="container section vt-section">
        <SectionHeader title="What We Actually Do" subtitle="We turn behavioral signals into measurable brand outcomes." useGradientTitle />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            title="Signal Intelligence → Strategic Positioning"
            description="We identify market signals, cultural shifts, and behavioral patterns — then translate them into strategic positioning that drives brand outcomes."
            icon={Presentation}
            highlight
          />
          <Card
            title="Behavioral Analysis → Partnership Wins"
            description="We analyze partnership response patterns, brand fit signals, and activation trends to create narratives that convert at higher rates."
            icon={Sparkles}
          />
          <Card
            title="Outcome Architecture → Measurable Results"
            description="We design systems that turn signal-driven insights into repeatable frameworks for partnerships, revenue, and brand positioning."
            icon={Repeat}
          />
        </div>
      </section>
      
      <section id="intelligence" className="container section vt-section">
        <SectionHeader kicker="Behavioral Signals" title="Intelligence That Drives Outcomes" subtitle="We track emerging markets, tech shifts, and cultural signals — then transform those insights into measurable brand outcomes." useGradientTitle />
        
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
        <SectionHeader kicker="Case Studies" title="Selected Work" subtitle="Signal identification → outcome achievement. How behavioral signals drive measurable brand results." useGradientTitle />
        <div className="grid md:grid-cols-3 gap-6">
          <WorkCard
            title="Market Signal: Brand Collaboration Shift"
            role="Signal Analysis"
            year="2025"
            outcome="$850K ARR pipeline generated"
            description="Identified shift from vendor relationships to strategic partnerships in DTC space. Repositioned brand narrative drove measurable pipeline growth."
            highlight
            image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop"
          />
          <WorkCard
            title="Behavioral Signal: Response Pattern Analysis"
            role="Signal Analysis"
            year="2025"
            outcome="47% response rate, 3 deals closed"
            description="Analyzed partnership response patterns across 12 brands to identify narrative gaps. Signal-driven narrative system delivered higher conversion rates."
            image="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop"
          />
          <WorkCard
            title="Operational Signal: Zero-Inventory Activation Trend"
            role="Signal Analysis"
            year="2024"
            outcome="$120K revenue in 48 hours"
            description="Identified trend toward zero-new-SKU activations in retail partnerships. Signal-informed activation concept drove immediate revenue without inventory changes."
            image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
          />
        </div>
      </section>
      <section id="outcomes" className="container section vt-section">
        <SectionHeader kicker="Proof" title="Signal-Driven Brand Outcomes" useGradientTitle />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <KPIStat 
            value="47% response rate" 
            label="from signal-driven partnership narratives across 3 campaigns"
            comparison="(vs ~12% typical outbound response)"
            description="Behavioral signal analysis identified optimal messaging patterns"
          />
          <KPIStat 
            value="$2.4M ARR pipeline" 
            label="generated in Q1 2025"
            description="from 3 signal-informed strategic positioning initiatives"
            hint="Market intelligence signals identified high-intent partnership opportunities"
          />
          <KPIStat 
            value="18-day close" 
            label="from signal identification to signed deal"
            description="with 92% conversion when signals aligned with brand positioning"
            comparison="(vs 90-day+ sales cycle before signal analysis)"
            hint="Behavioral pattern recognition accelerated decision-making"
          />
        </div>
      </section>
      <section className="container section vt-section">
        <SectionHeader kicker="Social Proof" title="What Clients Say" />
        <TestimonialsCarousel />
      </section>
      <section className="container section vt-section">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-extrabold tracking-tight fs-step-3 text-gradient mb-3">Ready to Turn Signals Into Outcomes?</h2>
          <p className="text-foreground/90 fs-step-0 mb-6">
            We&apos;ll identify the behavioral signals that matter and transform them into measurable brand outcomes.
          </p>
          <Button asChild variant="gradient" size="lg">
            <Link href="/schedule">Build My Partnership Deck</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
