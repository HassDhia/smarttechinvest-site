export default function Offers() {
  const offers = [
    {
      title: "Pilot: Clarity Sprint",
      tagline: "2–4 weeks to diagnose constraints and implement core systems.",
      bullets: ["Strategy review + OKR draft", "Pipeline and GTM audit", "1 dashboard + cadence install"],
      anchor: "Typical investment: $5k–$12k",
      cta: "Start Sprint",
    },
    {
      title: "Fractional Chief of Strategy",
      tagline: "Executive leverage without the full-time overhead.",
      bullets: ["Weekly operating cadence", "Pricing, positioning, GTM projects", "Systems and team enablement"],
      anchor: "Typical investment: $6k–$18k/mo",
      cta: "Book Intro",
      highlight: true,
    },
    {
      title: "Advisory Retainer",
      tagline: "Ongoing counsel for founders and leadership teams.",
      bullets: ["Monthly strategy sessions", "On-call support", "Deal, hiring, and roadmap guidance"],
      anchor: "Typical investment: $2k–$6k/mo",
      cta: "Check Fit",
    },
  ];
  return (
    <section className="container section">
      <h1 className="font-extrabold tracking-tight" style={{ fontFamily: "var(--font-heading)", fontSize: "var(--step-4)" }}>Productized Offers</h1>
      <p className="mt-1" style={{ color: "var(--muted)" }}>Start small, move fast, and scale what works.</p>
      <div className="mt-3 text-sm rounded-xl border px-3 py-2 bg-white/70 dark:bg-white/5" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
        Risk reversal: If we’re not adding clear value in 30 days, you can opt out — no hard feelings.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {offers.map((o) => (
          <article key={o.title} className={`rounded-2xl p-5 bg-white/90 dark:bg-white/5 backdrop-blur-md border ${o.highlight ? "border-[var(--brand)] shadow" : ""}`} style={{ borderColor: o.highlight ? undefined : "var(--border)" }}>
            <h3 className="text-lg font-bold">{o.title}</h3>
            <p className="font-semibold text-[#0f2544] dark:text-[#9cc4ff] mt-1">{o.tagline}</p>
            <ul className="list-disc pl-5 my-3 text-sm leading-6">
              {o.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="font-bold text-[#0f2544] dark:text-[#9cc4ff]">{o.anchor}</p>
            <a href="/schedule" className="inline-block mt-3 px-4 py-2 rounded-xl bg-[var(--brand)] text-white shadow hover:shadow-lg transition" style={{ transitionTimingFunction: "var(--ease-standard)", transitionDuration: "var(--dur-200)" }}>{o.cta}</a>
          </article>
        ))}
      </div>
    </section>
  );
}


