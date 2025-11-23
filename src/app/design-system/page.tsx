import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/Card";
import { SectionHeader } from "../../components/SectionHeader";

export default function DesignSystem() {
  return (
    <div className="container section">
      <h1 className="font-extrabold fs-step-4 text-gradient">Design System</h1>
      <p className="mt-1 text-muted fs-step-0">Tokens, components, and examples</p>

      <div className="divide-line my-6" />

      <SectionHeader title="Tokens" subtitle="Preview brand and surfaces" useGradientTitle />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {["--brand","--brand-600","--surface","--border","--muted"].map((v)=> (
          <div key={v} className="rounded-2xl border p-3 bg-[color-mix(in srgb, hsl(var(--background)) 70%, hsl(var(--card)) 30%)] backdrop-blur-md border-[hsl(var(--border))]">
            {v === "--brand" && <div className="h-10 rounded-md bg-token-brand" />}
            {v === "--brand-600" && <div className="h-10 rounded-md bg-token-brand-600" />}
            {v === "--surface" && <div className="h-10 rounded-md bg-token-surface" />}
            {v === "--border" && <div className="h-10 rounded-md bg-token-border" />}
            {v === "--muted" && <div className="h-10 rounded-md bg-token-muted" />}
            <div className="mt-2 text-xs">{v}</div>
          </div>
        ))}
      </div>

      <div className="divide-line my-6" />

      <SectionHeader title="Buttons" useGradientTitle />
      <div className="flex gap-3 flex-wrap">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="gradient">Gradient</Button>
      </div>

      <div className="divide-line my-6" />

      <SectionHeader title="Inputs & Badges" useGradientTitle />
      <div className="grid sm:grid-cols-2 gap-4">
        <Input placeholder="Your email" />
        <div className="flex items-center gap-2"><Badge>Badge</Badge><Badge className="bg-[color-mix(in srgb, hsl(var(--background)) 85%, hsl(var(--foreground)) 15%)] text-[hsl(var(--foreground))]">Neutral</Badge></div>
      </div>

      <div className="divide-line my-6" />

      <SectionHeader title="Card" useGradientTitle />
      <div className="grid sm:grid-cols-3 gap-4">
        <Card title="Component" description="Composable, token-driven card for content sections." />
        <Card title="Accessibility" description="Focusable states and clear visual affordances." />
        <Card title="Consistency" description="Cohesive spacing, radius, and shadows across UI." />
      </div>
    </div>
  );
}

