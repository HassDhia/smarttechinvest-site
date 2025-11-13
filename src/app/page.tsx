import { Hero } from "../components/Hero";
import { Card } from "../components/Card";
import { KPIStat } from "../components/KPIStat";
import { LogoStrip } from "../components/LogoStrip";
import { SectionHeader } from "../components/SectionHeader";
// removed unused Testimonial in favor of carousel
import { WorkCard } from "../components/WorkCard";
import { FileText, Presentation, Headphones, Users, Share2, BarChart3 } from "lucide-react";
import { MiniTOC } from "../components/MiniTOC";
import { TestimonialsCarousel } from "../components/TestimonialsCarousel";
import { IntelligenceCard } from "../components/IntelligenceCard";
import { BriefCard } from "../components/BriefCard";
import { getLatestDailies, listBriefs } from "../lib/content";
import Link from "next/link";

export default function Home() {
  const latestBriefs = listBriefs().slice(0, 3); // Get top 3 briefs
  const latestDailies = getLatestDailies(2);

  return (
    <div className="font-sans">
      <MiniTOC sections={[{ id: "partnership-lane", label: "Partnership Lane" }, { id: "intelligence", label: "Intelligence" }, { id: "work", label: "Selected Work" }, { id: "outcomes", label: "Outcomes" }]} />
      <Hero
        title="Turn Your Business Into a Brand Magnet"
        subtitle="Smart Technology Investments (STI) designs and runs your Partnership Pitch Engine™ — cinematic decks, activation concepts, and strategic narratives that make brands say 'yes.'"
        body="Most teams treat 'brand partnerships' like a vague goal. We turn it into a lane: a flagship deck that feels like a film pitch, a concrete activation plan, and a repeatable system for the next collab."
        ctaText="Build My Partnership Deck"
        ctaHref="/schedule"
        secondaryCtaText="See How the Engine Works"
        secondaryCtaHref="#partnership-lane"
      />
      <section id="partnership-lane" className="container section vt-section">
        <SectionHeader kicker="What We Actually Do" title="More Than a Deck. A Partnership Lane." useGradientTitle />
        <div className="max-w-3xl mx-auto text-center mb-8">
          <p className="text-foreground/90 fs-step-0 mb-6">
            Anyone can open Gamma and spit out slides. What you don't get from a template is: the story that makes a brand care, the activation that lives in the real world, and the system that lets you repeat the play.
          </p>
          <p className="text-foreground/90 fs-step-0 mb-6">
            STI works with operators, creators, and brands to:
          </p>
          <ul className="text-left space-y-4 mb-6">
            <li className="flex items-start gap-3">
              <span className="text-[hsl(var(--primary))] font-bold mt-1">•</span>
              <span className="text-foreground/90 fs-step-0">Design flagship partnership decks that feel like premium campaign treatments, not pitch homework.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[hsl(var(--primary))] font-bold mt-1">•</span>
              <span className="text-foreground/90 fs-step-0">Storyboard live activations (in-store, on-premise, digital) that make the collab tangible.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[hsl(var(--primary))] font-bold mt-1">•</span>
              <span className="text-foreground/90 fs-step-0">Encode it all into a reusable framework you can adapt to new partners in minutes instead of weeks.</span>
            </li>
          </ul>
          <p className="text-foreground/90 fs-step-0 font-medium">
            Partnerships stop being a one-off wish and become an explicit growth lane.
          </p>
        </div>
      </section>
      
      <section id="intelligence" className="container section vt-section">
        <SectionHeader kicker="Domain Expertise" title="Latest Insights" subtitle="Market intelligence and strategic insights that demonstrate the analytical depth we bring to every Partnership Pitch Engine engagement. This expertise informs our deck narratives and activation concepts." useGradientTitle />
        
        <div className="space-y-8">
          {/* Briefs Row */}
          {latestBriefs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {latestBriefs.map((brief, idx) => (
                <BriefCard 
                  key={brief.date} 
                  brief={brief} 
                  highlight={idx === 0}
                />
              ))}
            </div>
          )}
          
          {/* Daily Signals Row */}
          {latestDailies.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {latestDailies.map((daily) => (
                <IntelligenceCard
                  key={daily.slug}
                  title={daily.frontmatter.title}
                  date={daily.frontmatter.date}
                  summary={daily.frontmatter.summary}
                  href={daily.href}
                  type="daily"
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="text-center mt-6">
          <Link href="/intelligence" className="text-sm text-[hsl(var(--primary))] hover:underline">
            Explore All Intelligence →
          </Link>
        </div>
      </section>
      
      <div className="divide-gradient container mt-10" aria-hidden />
      <LogoStrip />
      <section id="work" className="container section vt-section">
        <SectionHeader kicker="Case Studies" title="Selected Work" subtitle="Outcome‑focused engagements across strategy and growth." useGradientTitle />
        <div className="grid md:grid-cols-3 gap-6">
          <WorkCard
            title="Pricing overhaul for B2B SaaS"
            role="Strategy"
            year="2025"
            outcome="+$1.2M ARR"
            highlight
            image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop"
          />
          <WorkCard
            title="ICP + outbound pipeline"
            role="GTM"
            year="2025"
            outcome="2x demos"
            image="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop"
          />
          <WorkCard
            title="Ops automation for SMB services"
            role="Ops"
            year="2024"
            outcome="-34% cycle"
            image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
          />
        </div>
      </section>
      <section id="outcomes" className="container section vt-section">
        <SectionHeader kicker="Proof" title="Outcomes" subtitle="Measurable impact from intelligence-driven insights and strategic engagement." useGradientTitle />
        <div className="grid sm:grid-cols-3 gap-4">
          <KPIStat label="Reports Published" value="120+" />
          <KPIStat label="Engagement Rate" value="+45%" />
          <KPIStat label="Traffic Driven" value="10K+" />
        </div>
      </section>
      <section className="container section vt-section">
        <SectionHeader kicker="Social Proof" title="What Clients Say" />
        <TestimonialsCarousel />
      </section>
    </div>
  );
}
