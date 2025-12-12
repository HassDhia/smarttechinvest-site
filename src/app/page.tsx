import Image from "next/image";
import Link from "next/link";
import { listBriefs } from "../lib/content";

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
  "Identify partner-fit opportunities using market signal, category logic, and your constraints.",
  "Structure the collaboration into something a budget owner can approve.",
  "Support outreach, negotiation, and ideation as needed.",
];

export default function Home() {
  const briefs = listBriefs().filter((brief) => (brief.metadata?.sources_count ?? 0) > 0);
  const featuredBriefs = briefs.slice(0, 3);

  return (
    <main className="font-sans min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      <section id="apply" className="section relative overflow-hidden bg-[#05070E] pt-16 pb-20 lg:py-24">
        <Image
          src="/assets/hero/cityscape.jpg"
          alt="City skyline at dusk"
          fill
          className="absolute inset-0 object-cover object-center opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.45)] via-[rgba(3,6,12,0.65)] to-[#03060C]" />
        <div className="container relative z-10 max-w-5xl space-y-5 sm:space-y-7">
          <h1 className="headline-xl max-w-4xl text-balance text-white">Brand Collaborations.</h1>
          <p className="body-lede text-white/90 text-lg sm:text-xl">
            We architect collaboration concepts aligned to brand calendars and steward the pitchflow until the right team picks it up.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap sm:gap-4">
            <a
              href="mailto:partnerships@smarttechinvest.com?subject=STI%20Request%20Consideration%20%7C%20Operator"
              className="inline-flex w-full items-center justify-center rounded-md bg-[#1F4FFF] px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_10px_30px_rgba(31,79,255,0.35)] sm:w-auto sm:tracking-[0.3em]"
            >
              Request consideration (Operators)
            </a>
            <a
              href="mailto:partnerships@smarttechinvest.com?subject=STI%20Activation%20Concepts%20%7C%20Brand"
              className="inline-flex w-full items-center justify-center rounded-md border border-white/30 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/95 transition hover:bg-white/10 sm:w-auto sm:tracking-[0.3em]"
            >
              Request activation concepts (Brands)
            </a>
            <Link
              href="/intelligence"
              className="inline-flex items-center justify-center text-sm font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline transition"
            >
              Read Intelligence
            </Link>
          </div>
          <p className="text-sm text-white/85">If it’s a fit, we reply within 48 hours.</p>
        </div>
        <div className="container relative z-10 mt-10">
          <div className="inline-flex items-center rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-white/65 shadow-[0_10px_35px_rgba(0,0,0,0.4)]">
            Discreet by default. Redacted examples and references available on request.
          </div>
        </div>
      </section>

      <section id="examples" className="container section space-y-6">
        <h2 className="headline-lg">What WE Do</h2>
        <ul className="space-y-3 text-base text-white/85 list-disc pl-5 marker:text-white/70">
          {whatWeDoBullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="container section space-y-6">
        <p className="headline-label text-white/65">Who this is for</p>
        <h2 className="headline-lg">Built for</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#05070E]/70 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
            <h3 className="text-2xl font-semibold text-white mb-3">Operators</h3>
            <p className="text-white/80 text-base leading-relaxed">
              and local platforms with foot traffic, membership, or community reach.
            </p>
            <div className="mt-5 space-y-2">
              <a
                href="mailto:partnerships@smarttechinvest.com?subject=STI%20Collaboration%20Review%20%7C%20Operator"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-black shadow-[0_10px_30px_rgba(255,255,255,0.25)] transition hover:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070E]"
              >
                Request a collaboration review
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#05070E]/70 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
            <h3 className="text-2xl font-semibold text-white mb-3">Brands</h3>
            <p className="text-white/80 text-base leading-relaxed">
              and brand teams looking for credible local activations and distribution.
            </p>
            <div className="mt-5 space-y-2">
              <a
                href="mailto:partnerships@smarttechinvest.com?subject=STI%20Local%20Partner%20Pack%20Request"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070E]"
              >
                Request the Local Partner Pack
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="intelligence" className="container section space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <h2 className="headline-lg">Intelligence that turns into deals</h2>
            <p className="text-white/80 text-base leading-relaxed">
              Market research built to spot patterns, not generate noise. Each report includes an activation angle you can act on.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <a
              href="mailto:partnerships@smarttechinvest.com?subject=STI%20Request%20Consideration"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-black shadow-[0_10px_30px_rgba(255,255,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#03060C]"
            >
              Request a collaboration review
            </a>
            <Link
              href="/intelligence"
              className="text-xs uppercase tracking-[0.4em] text-white/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#03060C]"
            >
              Get the briefs
            </Link>
          </div>
        </div>
        {featuredBriefs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBriefs.map((brief) => {
              const preview = brief.heroImage || "/assets/og/default-brief.png";
              const { label, dateTime } = formatBriefDate(brief.date);
              return (
                <Link
                  key={brief.date}
                  href={brief.href}
                  className="rounded-[26px] border border-white/10 bg-[#05070E] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4FFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#03060C]"
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
                        Weekly Brief
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-semibold uppercase leading-tight">{brief.title || "Operator Brief"}</h3>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-white/10 p-5 text-[11px] uppercase tracking-[0.45em] text-white/55">
                      <span>{dateTime ? <time dateTime={dateTime}>{label}</time> : label}</span>
                      <span>{brief.metadata?.sources_count ?? 0} sources</span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-sm text-white/70">Weekly briefs will load after the next ingest.</div>
        )}
      </section>
    </main>
  );
}
