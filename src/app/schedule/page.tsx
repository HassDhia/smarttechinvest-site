import { SectionHeader } from "../../components/SectionHeader";
import { CalendlyEmbed } from "../../components/CalendlyEmbed";

export default function SchedulePage() {
  return (
    <div className="container section">
      <SectionHeader kicker="Booking" title="Schedule a Call" subtitle="Advisory and fractional engagements. Use your work email for priority access." useGradientTitle />
      <div className="rounded-2xl overflow-hidden bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] shadow-sm">
        <CalendlyEmbed url="https://calendly.com/has-dhia/strategy-sync?back=1&month=2025-08" />
      </div>
      <p className="mt-3 text-xs text-[hsl(var(--muted-foreground))]">
        Powered by Calendly. If the embed doesn’t load, open the booking page directly: <a className="link-underline" href="https://calendly.com/has-dhia/strategy-sync?back=1&month=2025-08" target="_blank" rel="noopener">calendly.com/has-dhia</a>.
      </p>
    </div>
  );
}


