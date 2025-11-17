"use client";
import { SectionHeader } from "../../components/SectionHeader";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { useState } from "react";

const workStories = [
  {
    signal: "Market signal",
    context: "A DTC apparel brand needed to prove it could operate as a strategic collaborator with national retailers rather than a one-off vendor.",
    actions: [
      "Mapped the cultural and category signals brands already cared about",
      "Rebuilt the pitch spine with operator-led story beats",
      "Structured month-by-month activations that protected bandwidth",
    ],
    outcome: "$850K ARR pipeline generated",
    unlocked: "Provided the proof package for future retailer co-brands without lifting headcount.",
  },
  {
    signal: "Behavioral signal",
    context: "A multi-use venue had a loyal base but inconsistent responses from studios and agencies looking for authentic locations.",
    actions: [
      "Analyzed 40+ prior outreach threads to find message/format mismatches",
      "Produced anonymized one-sheets that translated venue realities into story-first concepts",
      "Implemented a light-touch follow up cadence the team could run weekly",
    ],
    outcome: "47% response rate, 3 deals closed",
    unlocked: "Became the go-to local partner for a streamer pilot and opened a retainer lane for future shoots.",
  },
  {
    signal: "Operational signal",
    context: "A multi-location retailer wanted to monetize unused square footage without creating new SKUs or hiring additional staff.",
    actions: [
      "Identified the zero-inventory activation trend across comparable operators",
      "Designed three concepts that slotted into existing staff rhythms",
      "Built the outreach kit and pipeline tracker so the founder only had to approve",
    ],
    outcome: "$120K revenue in 48 hours",
    unlocked: "Proof that collaborations could be a recurring revenue layer without straining operations.",
  },
  {
    signal: "Narrative signal",
    context: "A streaming network wanted a textured slate of local partners for an unscripted format without months of scouting.",
    actions: [
      "Created a signal brief highlighting cultural pockets and operators with existing heat",
      "Drafted modular concept beats and visual language for internal approvals",
      "Brokered the first wave of intros and left behind a repeatable sourcing map",
    ],
    outcome: "Greenlit pilot with 3 cultural partners",
    unlocked: "Internal team now uses the STI signal report as the template for future seasons.",
  },
];

export default function WorkPage() {
  const [filter, setFilter] = useState<string>("All");
  const filters = ["All", "Market", "Behavioral", "Operational", "Narrative"];

  const filteredStories = filter === "All" 
    ? workStories 
    : workStories.filter(story => story.signal.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="font-sans">
      <section className="container section">
        <SectionHeader
          title="Selected Work"
          subtitle="Signal identification → outcome achievement."
          useGradientTitle
        />
        
        {/* Filter row */}
        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                  : "bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] hover:bg-[hsl(var(--accent))]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Case study grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {filteredStories.map((story) => (
            <article key={story.outcome} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-4">
                {story.signal}
              </p>
              <p className="text-sm text-[hsl(var(--card-foreground))]/80 mb-6 leading-relaxed">{story.context}</p>
              <p className="text-xl font-bold text-[hsl(var(--primary))]">{story.outcome}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section vt-section">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-3">How this work feeds the Brand Collab Lab</h3>
          <p className="text-sm text-foreground/80 mb-6">
            Book the Brand Collab Lab, bring your constraints and best stories, and walk away with a concept spine, deck, and outreach logic that puts you in this outcomes stack.
          </p>
          <Button asChild variant="gradient">
            <Link href="/schedule">Book the Brand Collab Lab</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
