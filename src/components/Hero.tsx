"use client";
import { motion, m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ProofBar } from "./ProofBar";
import { Button } from "./ui/Button";
import { useRef } from "react";

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
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0px", "-48px"]);
  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Let the site background show through. Add subtle, non-blocking accents only. */}
      <motion.div
        aria-hidden
        className="absolute -top-28 right-[-10%] h-[520px] w-[520px] rounded-full opacity-20"
        initial={{ scale: 0.9, opacity: 0.12 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1 }}
      >
        <div className="pointer-events-none absolute inset-0 bg-glow" />
      </motion.div>
      <div className="max-w-screen-xl mx-auto px-4 py-16 text-center">
        <div className="relative mx-auto mb-6 h-10 w-10">
          <Image src="/globe.svg" alt="" fill sizes="40px" className="opacity-80" />
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
          className="font-extrabold tracking-tight text-[var(--step-5)] text-gradient"
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <p className="mt-3 max-w-3xl mx-auto text-foreground/90 fs-step-1">{subtitle}</p>
        ) : null}
        {ctaText && ctaHref ? (
          <div className="mt-6">
            <Button asChild variant="gradient" className="hover:-translate-y-0.5">
              <Link href={ctaHref}>{ctaText}</Link>
            </Button>
          </div>
        ) : null}
        {/* Proof bar */}
        <ProofBar />
        {/* Ambient aurora accent (micro‑parallax) */}
        <m.div aria-hidden style={{ y: parallaxY }} className="pointer-events-none absolute inset-x-0 -bottom-24 h-64 blur-2xl opacity-60 bg-aurora" />
      </div>
    </section>
  );
}


