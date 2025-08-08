"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ProofBar } from "./ProofBar";

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
      <motion.div
        aria-hidden
        className="absolute -top-28 right-[-10%] h-[520px] w-[520px] rounded-full blur-3xl opacity-15 bg-[radial-gradient(circle_at_30%_30%,_var(--brand-600),_transparent_60%)]"
        initial={{ scale: 0.9, opacity: 0.12 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1 }}
      />
      <div className="max-w-screen-xl mx-auto px-4 py-16 text-center">
        <div className="relative mx-auto mb-6 h-10 w-10">
          <Image src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=200&auto=format&fit=crop" alt="Light accent" fill sizes="40px" className="rounded-full opacity-80" />
        </div>
        {badge ? (
          <div
            className="inline-block mb-3 px-3 py-1 rounded-full border border-[var(--border)] font-semibold bg-white/60 text-slate-900 dark:bg-white/10 dark:text-white/90"
          >
            {badge}
          </div>
        ) : null}
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-extrabold tracking-tight text-[var(--foreground)] text-[var(--step-5)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <p className="mt-3 opacity-90 max-w-3xl mx-auto text-[var(--muted)] text-[var(--step-1)]">{subtitle}</p>
        ) : null}
        {ctaText && ctaHref ? (
          <div className="mt-6">
            <a
              href={ctaHref}
              className="inline-block font-semibold px-5 py-2.5 rounded-xl transition duration-200 ease-out bg-[var(--brand)] text-white shadow-sm hover:shadow-[0_8px_24px_rgba(16,42,67,0.24)]"
            >
              {ctaText}
            </a>
          </div>
        ) : null}
        {/* Proof bar */}
        <ProofBar />
      </div>
    </section>
  );
}


