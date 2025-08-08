"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export function Hero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  badge,
}: {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  badge?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      {/* Let the site background show through. Add subtle, non-blocking accents only. */}
      <motion.div aria-hidden className="absolute -top-28 right-[-10%] h-[520px] w-[520px] rounded-full blur-3xl opacity-15"
        initial={{ scale: 0.9, opacity: 0.12 }} animate={{ scale: 1, opacity: 0.2 }} transition={{ duration: 1 }}
        style={{ background: "radial-gradient(circle at 30% 30%, var(--brand-600), transparent 60%)" }} />
      <div className="max-w-screen-xl mx-auto px-4 py-16 text-center">
        <div className="relative mx-auto mb-6 h-10 w-10">
          <Image src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=200&auto=format&fit=crop" alt="Light accent" fill sizes="40px" className="rounded-full opacity-80" />
        </div>
        {badge ? (
          <div className="inline-block mb-3 px-3 py-1 rounded-full border font-semibold bg-white/60 text-slate-900 dark:bg-white/10 dark:text-white/90"
            style={{ borderColor: "var(--border)" }}>
            {badge}
          </div>
        ) : null}
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-extrabold tracking-tight"
          style={{ fontFamily: "var(--font-heading)", fontSize: "var(--step-5)", color: "var(--foreground)" }}
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <p className="mt-3 opacity-90 max-w-3xl mx-auto" style={{ fontSize: "var(--step-1)", color: "var(--muted)" }}>{subtitle}</p>
        ) : null}
        {ctaText && ctaHref ? (
          <div className="mt-6">
            <a
              href={ctaHref}
              className="inline-block font-semibold px-5 py-2.5 rounded-xl transition bg-[var(--brand)] text-white shadow-sm hover:shadow-[0_8px_24px_rgba(16,42,67,0.24)]"
              style={{ transitionTimingFunction: "var(--ease-standard)", transitionDuration: "var(--dur-200)" }}
            >
              {ctaText}
            </a>
          </div>
        ) : null}
        {/* Proof bar */}
        <div className="mt-6 flex items-center justify-center gap-3 text-xs" style={{ color: "var(--muted)" }}>
          <span>Trusted by SMB leaders</span>
          <span aria-hidden>•</span>
          <span>Outcomes: +$1.2M ARR · +8% margin · −34% cycle</span>
        </div>
      </div>
    </section>
  );
}


