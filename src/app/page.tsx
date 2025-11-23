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

const labDeliverables = [
  "Signals & positioning",
  "Concept & deck spine",
  "Outreach logic & target map",
];

export default function Home() {
  const briefs = listBriefs();
  const featuredBriefs = briefs.slice(0, 3);

  return (
    <div className="font-sans bg-[#03060C] text-white">
      <section className="section relative overflow-hidden border-b border-white/10 bg-[#05070E] pt-10 pb-20 lg:py-24">
        <Image
          src="/assets/hero/cityscape.jpg"
          alt="City skyline at dusk"
          fill
          className="absolute inset-0 object-cover object-center opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.45)] via-[rgba(3,6,12,0.65)] to-[#03060C]" />
        <div className="container relative z-10 max-w-5xl space-y-6 sm:space-y-8">
          <h1 className="headline-xl">Signal-driven brand collaborations</h1>
          <p className="body-lede text-white font-semibold">For operators and storytellers.</p>
          <Link
            href="/schedule"
            className="inline-flex w-full items-center justify-center rounded-md bg-[#1F4FFF] px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_10px_30px_rgba(31,79,255,0.35)] sm:w-auto sm:tracking-[0.3em]"
          >
            Book the brand collab lab
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.5em] text-white/60">
            <span>Studios</span>
            <span>•</span>
            <span>Retailers</span>
            <span>•</span>
            <span>Hospitality</span>
            <span>•</span>
            <span>Streaming partners</span>
          </div>
        </div>
      </section>

      <section className="container section space-y-8">
        <div className="border-b border-white/10 pb-4">
          <p className="headline-label text-white/65">Featured intelligence</p>
          <h2 className="mt-2 headline-lg">Weekly briefs built for cinematic decks.</h2>
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

      <section className="bg-[#05070E] border-t border-white/10">
        <div className="container section grid gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="headline-label text-white/65">The Brand Collab Lab</p>
            <h2 className="headline-lg text-[2.8rem] leading-snug">Your operator-side collab studio.</h2>
            <p className="text-white/85 text-[1.15rem]">
              Idea inception through pitch perfection. One session to capture signal, spin the cinematic concept,
              and leave with the deck spine and outreach logic.
            </p>
            <ul className="space-y-2 pl-4 text-white/85 text-sm marker:text-white/80 list-disc">
              {labDeliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <p className="headline-label text-white/65">A Plug-in Intelligence & Strategy Engine</p>
            <p className="text-white/85 text-[1.15rem]">
              We power brand collaborations with behavioral data, market insights, and operational know-how. Operators and storytellers
              come to us to find the whitespace and land the activation.
            </p>
            <p className="text-white text-xl font-semibold">Ready to build a brand collaboration that actually lands?</p>
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center rounded-md bg-[#1F4FFF] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_10px_30px_rgba(31,79,255,0.35)]"
            >
              Book the brand collab lab
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
