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
      <MiniTOC sections={[{ id: "engine", label: "The Engine" }, { id: "intelligence", label: "Intelligence" }, { id: "work", label: "Selected Work" }, { id: "outcomes", label: "Outcomes" }]} />
      <Hero
        title="Smart Technology Investments"
        subtitle="Plug-in Intelligence & Strategy Engine: automated research, insights, community, and distribution for your vertical."
        ctaText="Request Demo"
        ctaHref="/schedule"
        badge="Turnkey business intelligence ecosystem"
      />
      <section id="engine" className="container section vt-section">
        <SectionHeader kicker="What You Get" title="The Intelligence Engine" subtitle="A self-perpetuating business intelligence ecosystem that generates insights, drives engagement, and creates revenue impact." useGradientTitle />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            ["Automated Research Reports","Well-cited market & thesis reports generated daily with key findings and strategic insights.", FileText],
            ["Board-Ready Slide Decks","Auto-generated presentations summarizing key insights for executive briefings and stakeholder updates.", Presentation],
            ["Podcast-Style Briefings","Audio overviews for each report, perfect for on-the-go consumption and team sharing.", Headphones],
            ["Community Engagement","Discourse forum for discussion and debate, with AI-assisted moderation and seeded insights.", Users],
            ["Multi-Channel Distribution","Auto-post to LinkedIn, Medium, Twitter, and other channels with tracked links and analytics.", Share2],
            ["Analytics & Optimization","Track engagement, conversions, and ROI with built-in dashboards and continuous improvement.", BarChart3],
          ].map(([t,d,I], idx) => (
            <Card key={String(t)} title={String(t)} description={String(d)} icon={I as any} highlight={idx === 0} />
          ))}
        </div>
      </section>
      
      <section id="intelligence" className="container section vt-section">
        <SectionHeader kicker="From the Intelligence Desk" title="Latest Insights" subtitle="Daily signals and weekly briefs on technology investments and strategic trends." useGradientTitle />
        
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
