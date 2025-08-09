import { Hero } from "../components/Hero";
import { Card } from "../components/Card";
import { KPIStat } from "../components/KPIStat";
import { LogoStrip } from "../components/LogoStrip";
import { SectionHeader } from "../components/SectionHeader";
// removed unused Testimonial in favor of carousel
import { WorkCard } from "../components/WorkCard";
import { Rocket, BadgeDollarSign, Bot, Workflow, Settings, Handshake } from "lucide-react";
import { MiniTOC } from "../components/MiniTOC";
import { TestimonialsCarousel } from "../components/TestimonialsCarousel";

export default function Home() {
  return (
    <div className="font-sans">
      <MiniTOC sections={[{ id: "how", label: "How We Help" }, { id: "work", label: "Selected Work" }, { id: "outcomes", label: "Outcomes" }]} />
      <Hero
        title="Smart Technology Investments"
        subtitle="Fractional Chief of Strategy for SMBs: pricing, positioning, GTM, and AI-augmented ops to accelerate growth."
        ctaText="Book a Clarity Call"
        ctaHref="/schedule"
        badge="Capacity: accepting 2 new clients this quarter"
      />
      <section id="how" className="container section">
        <SectionHeader kicker="Capabilities" title="How We Help" subtitle="Leverage executive-level strategy without full-time overhead." useGradientTitle />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            ["Fractional Chief of Strategy","Executive-level strategic planning, OKRs, and operating cadence without full-time overhead.", Rocket],
            ["Pricing, Positioning, and Offers","Clarify value, reshape pricing, and craft irresistible offers to unlock margin and conversion.", BadgeDollarSign],
            ["AI-Augmented Growth Systems","Intelligent workflows for outreach, CRM hygiene, and reporting without losing the human edge.", Bot],
            ["GTM and Pipeline Acceleration","Messaging, ICP, channel strategy, and a simple repeatable pipeline that compounds.", Workflow],
            ["Ops Automation","Automate low-value tasks across scheduling, follow-ups, and SOPs to free up time for deep work.", Settings],
            ["Founder Advisory & Strategic Deals","Hands-on guidance for partnerships, hiring, and key decisions when the stakes are high.", Handshake],
          ].map(([t,d,I], idx) => (
            <Card key={String(t)} title={String(t)} description={String(d)} icon={I as any} highlight={idx === 1} />
          ))}
        </div>
      </section>
      <div className="divide-gradient container mt-10" aria-hidden />
      <LogoStrip />
      <section id="work" className="container section">
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
      <section id="outcomes" className="container section">
        <SectionHeader kicker="Proof" title="Outcomes" subtitle="Clarity, momentum, and measurable results." useGradientTitle />
        <div className="grid sm:grid-cols-3 gap-4">
          <KPIStat label="ARR Impact" value="+$1.2M" />
          <KPIStat label="Margin" value="+8%" />
          <KPIStat label="Cycle Time" value="-34%" />
        </div>
      </section>
      <section className="container section">
        <SectionHeader kicker="Social Proof" title="What Clients Say" />
        <TestimonialsCarousel />
      </section>
    </div>
  );
}
