import { SectionHeader } from "../../components/SectionHeader";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { ProcessSteps } from "../../components/ProcessSteps";
import { Card } from "../../components/Card";

export default function CollabLabPage() {
  const deliverables = [
    {
      title: "Forwardable deck spine",
      description: "A deck structure you can send to key partners immediately, safe to forward without translation.",
    },
    {
      title: "Outreach scripts",
      description: "Intro and follow-up language that respects your bandwidth and gets responses.",
    },
    {
      title: "Initial target list",
      description: "Short list of initial partners mapped to your concept, with intro logic for each.",
    },
    {
      title: "Clear next steps",
      description: "Within 24 hours: call recap, deck spine, and polished outreach language ready to use.",
    },
  ];

  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="container section">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance mb-6">
            The Brand Collab Lab
          </h1>
          <p className="text-lg md:text-xl text-foreground/90 max-w-xl mb-8 leading-relaxed">
            A 45-minute creative lab that turns your world into a forwardable brand concept and deck spine.
          </p>
          <Button asChild variant="gradient" size="lg">
            <Link href="/apply">Book the Brand Collab Lab</Link>
          </Button>
        </div>
      </section>

      {/* What Happens in the Lab */}
      <section className="container section vt-section">
        <SectionHeader
          title="What Happens in the Lab"
          subtitle="Fast inputs, structured exploration, tangible artifacts. We map signals, draft concepts, and set up outreach logic."
          useGradientTitle
        />
        <ProcessSteps />
      </section>

      {/* What You Leave With */}
      <section className="container section vt-section">
        <SectionHeader
          title="What You Leave With"
          useGradientTitle
        />
        <div className="grid gap-6 md:grid-cols-2">
          {deliverables.map((item) => (
            <Card
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container section vt-section">
        <div className="max-w-3xl">
          <div className="bg-[hsl(var(--muted))] p-12 md:p-16 text-center rounded-xl">
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
              Ready to Build a Brand Collaboration That Actually Lands?
            </h2>
            <p className="text-base text-foreground/80 max-w-xl mx-auto mb-8">
              Book your 45-minute lab session and leave with a forwardable concept, deck spine, and outreach logic.
            </p>
            <Button asChild variant="gradient" size="lg">
              <Link href="/apply">Book the Brand Collab Lab</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
