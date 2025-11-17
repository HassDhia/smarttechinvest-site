import { CalendlyEmbed } from "../../components/CalendlyEmbed";

export default function SchedulePage() {
  return (
    <div className="font-sans">
      <section className="container section">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance mb-6">
            Book the Brand Collab Lab
          </h1>
          <p className="text-lg text-foreground/90 max-w-xl mx-auto mb-8 leading-relaxed">
            A 45-minute session to turn your world into a forwardable brand concept and outreach spine.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="rounded-xl overflow-hidden border border-[hsl(var(--border))] mb-8">
            <CalendlyEmbed url="https://calendly.com/has-dhia/strategy-sync?back=1&month=2025-08" />
          </div>

          {/* Micro reassurance */}
          <div className="text-center space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
            <p>• No hard pitch</p>
            <p>• You leave with a concrete concept</p>
            <p>• If it&apos;s not a fit, we part as friends</p>
          </div>
        </div>
      </section>
    </div>
  );
}
