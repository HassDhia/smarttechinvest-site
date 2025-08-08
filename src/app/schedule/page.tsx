import { SectionHeader } from "../../components/SectionHeader";
import { CalendlyEmbed } from "../../components/CalendlyEmbed";

export default function SchedulePage() {
  return (
    <div className="container section">
      <SectionHeader title="Schedule A Call" subtitle="Advisory and fractional engagements. Use your work email for priority access." />
      <div className="rounded-2xl overflow-hidden bg-white/60 dark:bg-slate-950/40 backdrop-blur-md border border-[var(--border)]">
        <CalendlyEmbed url="https://calendly.com/has-dhia/executive-demo?month=2025-08" />
      </div>
      <p className="mt-3 text-xs text-[var(--muted)]">
        Powered by Calendly. If the embed doesn’t load, open the booking page directly: <a className="link-underline" href="https://calendly.com/has-dhia/executive-demo?month=2025-08" target="_blank" rel="noopener">calendly.com/has-dhia</a>.
      </p>
    </div>
  );
}


