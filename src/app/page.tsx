import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "../components/ui/Button";
import { getAllPosts } from "../lib/blog";

export const metadata: Metadata = {
  title: "STI - Local Partnership Intelligence for Brands",
  description: "We research, grade, and map local partners so brands invest in the right ones. Strategic intelligence, not execution.",
  keywords: ["local partnerships", "brand partnerships", "partnership intelligence", "market research", "experiential marketing strategy", "local presence strategy"],
  openGraph: {
    title: "STI - Local Partnership Intelligence for Brands",
    description: "Strategic intelligence for local brand partnerships. We research and grade local partners so you invest in the right ones.",
    url: "https://smarttechinvest.com",
    siteName: "Smart Technology Investments",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "STI - Local Partnership Intelligence for Brands",
    description: "We research, grade, and map local partners so brands invest in the right ones.",
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

const approachBullets = [
  "We grade partners on what actually matters: credibility, reach, engagement quality, owner story, and brand alignment—not just follower counts.",
  "We apply behavioral science to partnership decisions. Why do some local partnerships drive brand recall while others waste budget?",
  "We stay on the strategy side. We don't broker deals, run events, or manage logistics. You keep full control of execution and economics.",
];

const services = [
  {
    title: "Partner Intelligence Reports",
    description: "Deep research on local partners in your target markets. Each report includes credibility scores, reach metrics, owner profiles, and strategic fit analysis. Know who's worth pursuing before you reach out."
  },
  {
    title: "Market Landscape Mapping",
    description: "Coverage analysis across neighborhoods, cities, or regions. See where competitors have presence, where gaps exist, and where your brand would have maximum impact."
  },
  {
    title: "Partnership Strategy Consulting",
    description: "Neuroscience-informed frameworks for evaluating partnership opportunities. We help you think through the decision—you own the relationship and the outcome."
  },
];

export default function Home() {
  const posts = getAllPosts();
  const featuredPosts = posts.slice(0, 2);

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
          <h1 className="headline-xl text-balance text-white">Local Partnership Intelligence for Brands.</h1>
          <p className="text-lg text-white/90">We research, grade, and map local partners so you invest in the right ones. Strategy, not execution.</p>
          <div className="pt-2">
            <Button asChild variant="primary" size="md" className="rounded-full uppercase tracking-[0.25em] text-sm px-8 py-3">
              <a href="mailto:partnerships@smarttechinvest.com?subject=STI%20Partnership%20Briefing%20Request">
                Schedule a briefing
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="container section space-y-10">
        <div className="max-w-2xl space-y-6">
          <p className="headline-label text-[hsl(var(--primary))]">About</p>
          <h2 className="headline-lg">The research you need. The execution stays yours.</h2>
          <p className="text-base text-[hsl(var(--foreground-secondary))] leading-relaxed">
            Most brands know local partnerships drive results. The problem isn&apos;t execution—it&apos;s knowing where to place your bets.
          </p>
          <p className="text-base text-[hsl(var(--foreground-secondary))] leading-relaxed">
            Which shops actually have the reach they claim? Which owners have stories worth amplifying? Which neighborhoods are oversaturated, and which are underserved?
          </p>
          <p className="text-base text-[hsl(var(--foreground-secondary))] leading-relaxed">
            We do the research. You make the decisions.
          </p>
        </div>
      </section>

      <section id="services" className="container section space-y-12">
        <div className="space-y-4">
          <p className="headline-label text-[hsl(var(--primary))]">What We Provide</p>
          <h2 className="headline-lg">Strategic intelligence, not operational burden</h2>
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

      <section id="approach" className="container section space-y-8">
        <h2 className="headline-lg">How we think about local partnerships</h2>
        <ul className="max-w-2xl space-y-4 text-base text-[hsl(var(--foreground-secondary))] list-disc pl-5 marker:text-[hsl(var(--primary))]">
          {approachBullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="audience" className="container section space-y-8">
        <p className="headline-label text-[hsl(var(--primary))]">Who This Is For</p>
        <div className="max-w-2xl space-y-8">
          <div>
            <h2 className="headline-lg mb-4">Brand teams seeking local presence</h2>
            <p className="text-base text-[hsl(var(--foreground-secondary))] leading-relaxed">
              Marketing directors evaluating experiential alternatives. Partnership managers building local pipelines. CMOs asking why some local investments work and others don&apos;t.
            </p>
            <p className="text-base text-[hsl(var(--foreground-secondary))] leading-relaxed mt-4">
              You have budget for local partnerships. You need intelligence on where to deploy it.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="container section space-y-10">
        <div className="max-w-2xl space-y-6">
          <p className="headline-label text-[hsl(var(--primary))]">Get Started</p>
          <h2 className="headline-lg">Ready for better partnership decisions?</h2>
          <p className="text-base text-[hsl(var(--foreground-secondary))] leading-relaxed">
            Start with a briefing. We&apos;ll discuss your markets, your objectives, and whether our intelligence would be useful.
          </p>
        </div>
        <Button asChild variant="primary" size="md" className="rounded-full uppercase tracking-[0.25em] text-sm px-8 py-3">
          <a href="mailto:partnerships@smarttechinvest.com?subject=STI%20Partnership%20Briefing%20Request">
            Schedule a briefing
          </a>
        </Button>
      </section>

      <section id="blog" className="container section space-y-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="headline-label text-[hsl(var(--primary))]">Insights</p>
            <h2 className="headline-lg">How local partnerships actually work</h2>
            <p className="text-[hsl(var(--foreground-secondary))] text-base leading-relaxed">
              Neuroscience, behavioral economics, and market analysis—applied to brand partnership decisions. Written for strategists who want to understand the why, not just the what.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <Button asChild variant="primary" size="md" className="rounded-full uppercase tracking-[0.25em] text-sm px-7 py-3">
              <Link href="/blog">
                Read the blog
              </Link>
            </Button>
            <a
              href="mailto:partnerships@smarttechinvest.com?subject=Subscribe%20to%20STI%20Blog"
              className="text-xs uppercase tracking-[0.4em] text-[hsl(var(--foreground-tertiary))] hover:text-[hsl(var(--foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]"
            >
              Subscribe for updates
            </a>
          </div>
        </div>
        {featuredPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {featuredPosts.map((post) => {
              const preview = post.featuredImage || "/assets/og/default-brief.png";
              const { label, dateTime } = formatBriefDate(post.date);
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] transition-all hover:border-[hsl(var(--primary)/0.5)]"
                >
                  <article className="h-full">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={preview}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(min-width:1280px) 30vw, (min-width:768px) 50vw, 90vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-semibold leading-tight text-white group-hover:text-white/90 transition-colors">{post.title}</h3>
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <p className="text-sm text-[hsl(var(--foreground-secondary))] line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.45em] text-[hsl(var(--foreground-tertiary))]">
                        <span>{dateTime ? <time dateTime={dateTime}>{label}</time> : label}</span>
                        {post.tags && post.tags.length > 0 && (
                          <span>{post.tags[0]}</span>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 text-center">
            <p className="text-[hsl(var(--foreground-secondary))]">New posts coming soon. Subscribe to get notified.</p>
          </div>
        )}
      </section>
    </main>
  );
}
