export default function Resources() {
  return (
    <section className="container section">
      <h1 className="font-extrabold tracking-tight" style={{ fontFamily: "var(--font-heading)", fontSize: "var(--step-4)" }}>Strategy OS Resources</h1>
      <p className="mt-1" style={{ color: "var(--muted)" }}>Templates and assets to run a high-leverage operating cadence.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {[
          ["Weekly Review", "Template", "Agenda + scorecard"],
          ["Pipeline", "Dashboard", "Stage health + forecast"],
          ["OKRs", "Planner", "Quarterly alignment"],
        ].map(([label, value, hint]) => (
          <div key={String(label)} className="rounded-2xl p-5 bg-white/85 dark:bg-white/5 backdrop-blur-md border" style={{ borderColor: "var(--border)" }}>
            <div className="font-extrabold tracking-tight text-[#0f2544] dark:text-[#9cc4ff]" style={{ fontSize: "var(--step-2)" }}>{value as string}</div>
            <div className="font-semibold">{label as string}</div>
            <div className="mt-0.5" style={{ color: "var(--muted)", fontSize: "var(--step--1)" }}>{hint as string}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        {["before", "after"].map((seed, i) => (
          <figure key={seed} className="relative rounded-2xl overflow-hidden bg-white/85 dark:bg-white/5 backdrop-blur-md border" style={{ borderColor: "var(--border)" }}>
            <img
              src={i === 0 ? "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop" : "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1600&auto=format&fit=crop"}
              alt={seed}
              loading="lazy"
              className="w-full h-auto"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <figcaption className="relative px-4 py-3 font-semibold text-[#0f2544] dark:text-[#dbeafe]">{seed === "before" ? "Before" : "After"}</figcaption>
          </figure>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="/schedule" className="inline-block px-5 py-2.5 rounded-xl bg-[var(--brand)] text-white shadow hover:shadow-lg transition" style={{ transitionTimingFunction: "var(--ease-standard)", transitionDuration: "var(--dur-200)" }}>Request Access</a>
      </div>
    </section>
  );
}


