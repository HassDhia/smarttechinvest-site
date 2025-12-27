import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "../components/ui/Button";
import { listBriefs } from "../lib/content";

export const metadata: Metadata = {
  title: "STI - Build Your Brand-Partnerships Growth Arm",
  description: "We give brick-and-mortar businesses the strategy and templates to run brand partnerships themselves. You own the capability—we only stay involved if the upside warrants it.",
  keywords: ["brand partnerships", "partnership strategy", "templates", "brick-and-mortar", "growth strategy", "self-serve"],
  openGraph: {
    title: "STI - Build Your Brand-Partnerships Growth Arm",
    description: "Strategy, templates, and frameworks to run brand partnerships yourself. Own the capability and the economics.",
    url: "https://smarttechinvest.com",
    siteName: "Smart Technology Investments",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "STI - Build Your Brand-Partnerships Growth Arm",
    description: "Get the strategy and templates to run brand partnerships yourself.",
  },
};

function formatBriefDate(value?: string) {
  if (!value) return { label: "—", dateTime: undefined };
  const datePortion = value.slice(0, 10);
  const [year, month, day] = datePortion.split("-");
  if (!year || !month || !day) return { label: "—", dateTime: undefined };
  const parsed = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(parsed.getTime())) return { label: "—", dateTime: undefined };
  return {
    label: parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    dateTime: datePortion,
  };
}

const whatWeDoBullets = [
  "Show you how to identify partner-fit opportunities using market signals, category logic, and your constraints.",
  "Give you templates to structure collaborations into something a budget owner can approve.",
  "Provide frameworks for outreach, negotiation, and pitch refinement—so you can run the process yourself.",
];

const services = [
  {
    title: "Strategy & Templates",
    description: "Frameworks and playbooks to identify, structure, and land brand partnerships. You run it yourself."
  },
  {
    title: "Market Intelligence",
    description: "Strategic research that spots opportunities. Each brief includes activation angles you can act on."
  },
];

export default function Home() {
  const briefs = listBriefs().filter((brief) => (brief.metadata?.sources_count ?? 0) > 0);
  const featuredBriefs = briefs.slice(0, 2);

  return (
    <main className="font-sans min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <section id="hero" className="section relative overflow-hidden bg-[#05070E] pt-24 pb-24 lg:py-40">
        <Image
          src="/assets/hero/cityscape.jpg"
          alt="City skyline at dusk"
          fill
          className="absolute inset-0 object-cover object-center opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.45)] via-[rgba(3,6,12,0.65)] to-[#03060C]" />
        <div className="container relative z-10 max-w-3xl space-y-6">
          <h1 className="headline-xl text-balance text-white">Build Your Brand-Partnerships Growth Arm.</h1>
          <p className="text-lg text-white/90">We give you the strategy and templates to run brand partnerships yourself. You own the relationships and economics.</p>
          <div className="pt-2">
            <Button asChild variant="primary" size="md" className="rounded-full uppercase tracking-[0.25em] text-sm px-8 py-3">
              <a href="mailto:partnerships@smarttechinvest.com?subject=STI%20Partnership%20Strategy%20Inquiry">
                Get started
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="container section space-y-10">
        <div className="max-w-2xl space-y-6">
          <p className="headline-label text-[hsl(var(--primary))]">About</p>
          <h2 className="headline-lg">Build the capability in-house, own the upside</h2>
          <p className="text-base text-[hsl(var(--foreground-secondary))] leading-relaxed">
            Most brick-and-mortar businesses know they should be doing brand partnerships, but don&apos;t know where to start. We give you the strategy, templates, and frameworks to build your own brand-partnerships growth arm and run it yourself.
          </p>
          <p className="text-base text-[hsl(var(--foreground-secondary))] leading-relaxed">
            You get the playbook. You own the relationships. You keep the economics. We only stay involved long-term if the opportunity is clearly worth our time and yours.
          </p>
        </div>
      </section>

      <section id="services" className="container section space-y-12">
        <div className="space-y-4">
          <p className="headline-label text-[hsl(var(--primary))]">What you get</p>
          <h2 className="headline-lg">Two core offerings</h2>
        </div>
        <div className="max-w-2xl space-y-12">
          {services.map((service) => (
            <div key={service.title} className="space-y-2">
              <h3 className="text-xl font-semibold text-[hsl(var(--foreground))]">
                {service.title}
              </h3>
              <p className="text-base text-[hsl(var(--foreground-secondary))] leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="examples" className="container section space-y-8">
        <h2 className="headline-lg">Our approach</h2>
        <ul className="max-w-2xl space-y-4 text-base text-[hsl(var(--foreground-secondary))] list-disc pl-5 marker:text-[hsl(var(--primary))]">
          {whatWeDoBullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="audience" className="container section space-y-8">
        <p className="headline-label text-[hsl(var(--primary))]">Who this is for</p>
        <div className="max-w-2xl space-y-8">
          <div>
            <h2 className="headline-lg mb-4">Brick-and-mortar businesses with venue or community reach</h2>
            <p className="text-base text-[hsl(var(--foreground-secondary))] leading-relaxed">
              Gyms, studios, retail stores, event spaces, membership clubs. You have what brands want to access. You know partnerships should be a growth lever, but you need the strategy and templates to make it happen.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="container section space-y-10">
        <div className="max-w-2xl space-y-6">
          <p className="headline-label text-[hsl(var(--primary))]">Get started</p>
          <h2 className="headline-lg">Ready to build your partnerships capability?</h2>
          <p className="text-base text-[hsl(var(--foreground-secondary))] leading-relaxed">
            Get the strategy, templates, and frameworks to run brand partnerships yourself. No long-term commitment required.
          </p>
        </div>
        <Button asChild variant="primary" size="md" className="rounded-full uppercase tracking-[0.25em] text-sm px-8 py-3">
          <a href="mailto:partnerships@smarttechinvest.com?subject=STI%20Partnership%20Strategy%20Inquiry">
            Get the strategy & templates
          </a>
        </Button>
      </section>

      <section id="intelligence" className="container section space-y-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <h2 className="headline-lg">Intelligence that turns into deals</h2>
            <p className="text-[hsl(var(--foreground-secondary))] text-base leading-relaxed">
              Market research built to spot patterns, not generate noise. Each report includes an activation angle you can act on.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <Button asChild variant="primary" size="md" className="rounded-full uppercase tracking-[0.25em] text-sm px-7 py-3">
              <Link href="/intelligence">
                Get the briefs
              </Link>
            </Button>
            <a
              href="mailto:partnerships@smarttechinvest.com?subject=STI%20Collaboration%20Review%20%7C%20Operator"
              className="text-xs uppercase tracking-[0.4em] text-[hsl(var(--foreground-tertiary))] hover:text-[hsl(var(--foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]"
            >
              Request a collaboration review
            </a>
          </div>
        </div>
        {featuredBriefs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {featuredBriefs.map((brief) => {
              const preview = brief.heroImage || "/assets/og/default-brief.png";
              const { label, dateTime } = formatBriefDate(brief.date);
              return (
                <Link
                  key={brief.date}
                  href={brief.href}
                  className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]"
                >
                  <article className="h-full">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={preview}
                        alt={brief.title || "Brief preview"}
                        fill
                        className="object-cover transition-opacity duration-300 hover:opacity-80"
                        sizes="(min-width:1280px) 30vw, (min-width:768px) 33vw, 90vw"
                      />
	                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
	                      <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.5em] text-white/65">
	                        Strategic Brief
	                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-semibold uppercase leading-tight text-white">{brief.title || "Operator Brief"}</h3>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-[hsl(var(--border))] p-5 text-[11px] uppercase tracking-[0.45em] text-[hsl(var(--foreground-secondary))]">
                      <span>{dateTime ? <time dateTime={dateTime}>{label}</time> : label}</span>
                      <span>{brief.metadata?.sources_count ?? 0} sources</span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
	        ) : (
	          <div className="text-sm text-[hsl(var(--foreground-secondary))]">Strategic briefs will load after the next ingest.</div>
	        )}
	      </section>
    </main>
  );
}
