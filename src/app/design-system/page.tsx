import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/Card";
import { SectionHeader } from "../../components/SectionHeader";

export default function DesignSystem() {
  return (
    <div className="container section">
      <h1 className="font-extrabold" style={{ fontFamily: "var(--font-heading)", fontSize: "var(--step-4)" }}>Design System</h1>
      <p className="mt-1" style={{ color: "var(--muted)", fontSize: "var(--step-0)" }}>Tokens, components, and examples</p>

      <div className="divide-line my-6" />

      <SectionHeader title="Tokens" subtitle="Preview brand and surfaces" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {["--brand","--brand-600","--surface","--border","--muted"].map((v)=> (
          <div key={v} className="rounded-2xl border p-3 bg-white/60 dark:bg-slate-950/40 backdrop-blur-md" style={{ borderColor: "var(--border)" }}>
            <div className="h-10 rounded-md" style={{ background: `var(${v})` }} />
            <div className="mt-2 text-xs">{v}</div>
          </div>
        ))}
      </div>

      <div className="divide-line my-6" />

      <SectionHeader title="Buttons" />
      <div className="flex gap-3 flex-wrap">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>

      <div className="divide-line my-6" />

      <SectionHeader title="Inputs & Badges" />
      <div className="grid sm:grid-cols-2 gap-4">
        <Input placeholder="Your email" />
        <div className="flex items-center gap-2"><Badge>Badge</Badge><Badge className="bg-slate-100">Neutral</Badge></div>
      </div>

      <div className="divide-line my-6" />

      <SectionHeader title="Card" />
      <div className="grid sm:grid-cols-3 gap-4">
        <Card title="Component" description="Composable, token-driven card for content sections." />
        <Card title="Accessibility" description="Focusable states and clear visual affordances." />
        <Card title="Consistency" description="Cohesive spacing, radius, and shadows across UI." />
      </div>
    </div>
  );
}


