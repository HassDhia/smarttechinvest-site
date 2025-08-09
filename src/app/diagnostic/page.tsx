"use client";
import { useRef, useState } from "react";
import { Button } from "../../components/ui/Button";
import { Toast } from "../../components/ui/Toast";

export default function Diagnostic() {
  const [result, setResult] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ title: string; description?: string } | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(form: FormData) {
    const map = (v: FormDataEntryValue | null) => (String(v) === "High" ? 3 : String(v) === "Medium" ? 2 : 1);
    const get = (k: string) => String(form.get(k) || "");
    const icp = get("icp");
    const pricing = get("pricing");
    const pipeline = get("pipeline");
    const ops = get("ops");
    const email = get("email").trim();

    if (!email) {
      setToastMsg({ title: "Add your email to receive your score", description: "Enter your email and click Get My Score again." });
      setToastOpen(true);
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return;
    }

    const score = [icp, pricing, pipeline, ops].map((v) => map(v)).reduce((a, b) => a + b, 0);
    const tier = score >= 9 ? "High Leverage" : score >= 6 ? "Good Foundation" : "Quick Wins";
    const recommendation =
      tier === "High Leverage"
        ? "Focus on pricing power, channel scale, and ops scale. Consider Fractional Strategy."
        : tier === "Good Foundation"
        ? "Clarify ICP and offers; deploy a weekly operating cadence; test 1–2 new channels."
        : "Start with a Clarity Sprint: messaging, one dashboard, and outbound hygiene.";
    setResult(`Score: ${score}/12 — ${tier}. ${recommendation}`);

    setSending(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          icp,
          pricing,
          pipeline,
          ops,
          email,
          url: typeof window !== "undefined" ? window.location.href : "",
          referrer: typeof document !== "undefined" ? document.referrer : "",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        }),
      });
      setToastMsg({ title: "Message received", description: "Thanks! I’ll follow up shortly." });
    } catch {
      setToastMsg({ title: "Could not send lead", description: "Please try again or book a call." });
    } finally {
      setSending(false);
      setToastOpen(true);
    }
  }
  return (
    <section className="container section max-w-2xl">
      <h1 className="font-extrabold tracking-tight text-[var(--step-4)] text-gradient">Growth Diagnostic</h1>
      <p className="mt-1 text-[var(--muted)]">Answer 4 quick questions for a tailored recommendation.</p>
      <form action={handleSubmit} className="grid gap-3 mt-4">
        {[
          ["icp", "ICP clarity"],
          ["pricing", "Pricing confidence"],
          ["pipeline", "Pipeline quality"],
          ["ops", "Ops automation"],
        ].map(([name, label]) => (
          <label key={name as string} className="grid gap-1 font-semibold">
            {label}
            <select
              name={name as string}
              className="border rounded-lg px-3 py-2 bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600 transition-colors"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>
        ))}
        <label className="grid gap-1 font-semibold">
          Email
          <input
            ref={emailInputRef}
            name="email"
            type="email"
            placeholder="you@example.com"
            className="border rounded-lg px-3 py-2 bg-white text-slate-900 placeholder:text-slate-500 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400 border-slate-200 dark:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600 transition-colors"
          />
        </label>
        <Button type="submit" className="mt-1 w-full" variant="gradient" disabled={sending}>
          {sending ? "Sending..." : "Get My Score"}
        </Button>
      </form>
      {result && (
        <div className="mt-3 p-3 border border-[var(--border)] rounded-xl bg-white/60 dark:bg-slate-950/40 backdrop-blur-md">
          {result} <a className="underline ml-2" href="/schedule">Book a call →</a>
        </div>
      )}
      {toastMsg ? <Toast title={toastMsg.title} description={toastMsg.description} open={toastOpen} onOpenChange={setToastOpen} /> : null}
    </section>
  );
}


