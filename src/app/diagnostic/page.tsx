"use client";
import { useState } from "react";

export default function Diagnostic() {
  const [result, setResult] = useState<string>("");
  function handleSubmit(form: FormData) {
    const map = (v: FormDataEntryValue | null) => (String(v) === "High" ? 3 : String(v) === "Medium" ? 2 : 1);
    const score = ["icp", "pricing", "pipeline", "ops"].map((k) => map(form.get(k))).reduce((a, b) => a + b, 0);
    const tier = score >= 9 ? "High Leverage" : score >= 6 ? "Good Foundation" : "Quick Wins";
    const recommendation =
      tier === "High Leverage"
        ? "Focus on pricing power, channel scale, and ops scale. Consider Fractional Strategy."
        : tier === "Good Foundation"
        ? "Clarify ICP and offers; deploy a weekly operating cadence; test 1–2 new channels."
        : "Start with a Clarity Sprint: messaging, one dashboard, and outbound hygiene.";
    setResult(`Score: ${score}/12 — ${tier}. ${recommendation}`);
  }
  return (
    <section className="container section max-w-2xl">
      <h1 className="font-extrabold tracking-tight" style={{ fontFamily: "var(--font-heading)", fontSize: "var(--step-4)" }}>Growth Diagnostic</h1>
      <p className="mt-1" style={{ color: "var(--muted)" }}>Answer 4 quick questions for a tailored recommendation.</p>
      <form
        action={(formData) => {
          handleSubmit(formData);
        }}
        className="grid gap-3 mt-4"
      >
        {[
          ["icp", "ICP clarity"],
          ["pricing", "Pricing confidence"],
          ["pipeline", "Pipeline quality"],
          ["ops", "Ops automation"],
        ].map(([name, label]) => (
          <label key={name as string} className="grid gap-1 font-semibold">
            {label}
            <select name={name as string} className="border rounded-lg px-2 py-2 bg-white/80 backdrop-blur dark:bg-slate-900 border-slate-200 dark:border-slate-700">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>
        ))}
        <label className="grid gap-1 font-semibold">
          Email (optional)
          <input name="email" type="email" placeholder="you@example.com" className="border rounded-lg px-2 py-2 bg-white/80 backdrop-blur dark:bg-slate-900 border-slate-200 dark:border-slate-700" />
        </label>
        <button className="mt-1 px-4 py-2 rounded-xl bg-[var(--brand)] text-white w-full shadow hover:shadow-lg transition" style={{ transitionTimingFunction: "var(--ease-standard)", transitionDuration: "var(--dur-200)" }}>Get My Score</button>
      </form>
      {result && <div className="mt-3 p-3 border rounded-xl bg-white/60 dark:bg-slate-950/40 backdrop-blur-md" style={{ borderColor: "var(--border)" }}>{result}</div>}
    </section>
  );
}


