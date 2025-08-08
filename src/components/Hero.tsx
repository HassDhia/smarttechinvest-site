"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ProofBar } from "./ProofBar";
import { Button } from "./ui/Button";

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
        className="absolute -top-28 right-[-10%] h-[520px] w-[520px] rounded-full opacity-20"
        initial={{ scale: 0.9, opacity: 0.12 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1 }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_0%,theme(colors.primary)/0.12,transparent)]" />
      </motion.div>
      <div className="max-w-screen-xl mx-auto px-4 py-16 text-center">
        <div className="relative mx-auto mb-6 h-10 w-10">
          <Image src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=200&auto=format&fit=crop" alt="Light accent" fill sizes="40px" className="rounded-full opacity-80" />
        </div>
        {badge ? (
          <div className="inline-flex items-center mb-3 px-3 h-8 rounded-full border border-[hsl(var(--border))] font-medium bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] transition-colors">
            {badge}
          </div>
        ) : null}
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-extrabold tracking-tight text-foreground text-[var(--step-5)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <p className="mt-3 max-w-3xl mx-auto text-foreground/90 text-[var(--step-1)]">{subtitle}</p>
        ) : null}
        {ctaText && ctaHref ? (
          <div className="mt-6">
            <Button asChild className="shadow-[var(--shadow-sm)] hover:-translate-y-0.5">
              <Link href={ctaHref}>{ctaText}</Link>
            </Button>
          </div>
        ) : null}
        {/* Proof bar */}
        <ProofBar />
      </div>
    </section>
  );
}


