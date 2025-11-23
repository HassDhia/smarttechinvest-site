"use client";
import { useEffect, useRef, useState } from "react";

export function ParallaxBG() {
  const [y, setY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onMQ = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener?.('change', onMQ);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener?.('change', onMQ);
    };
  }, []);

  const slowCoef = isMobile ? 0.02 : 0.05;
  const fastCoef = isMobile ? 0.06 : 0.12;
  const noiseCoef = isMobile ? 0.03 : 0.08;

  const glowRef = useRef<HTMLDivElement | null>(null);
  const beamRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const noiseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const slowPx = reducedMotion ? 0 : -(y * slowCoef);
    const fastPx = reducedMotion ? 0 : -(y * fastCoef);
    const noisePx = reducedMotion ? 0 : -(y * noiseCoef);
    const gridOpacity = Math.max(0.08, Math.min(0.18, 0.18 - y * 0.0002));

    if (glowRef.current) glowRef.current.style.setProperty("--ty", `${slowPx}px`);
    if (beamRef.current) beamRef.current.style.setProperty("--ty", `${fastPx}px`);
    if (gridRef.current) {
      gridRef.current.style.setProperty("--ty", `${fastPx}px`);
      gridRef.current.style.setProperty("--alpha", `${gridOpacity}`);
    }
    if (noiseRef.current) noiseRef.current.style.setProperty("--ty", `${noisePx}px`);
  }, [y, slowCoef, fastCoef, noiseCoef, reducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 select-none overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[hsl(var(--background))]" />
      <div ref={glowRef} className="absolute inset-0 bg-glow parallax-transform opacity-70 mix-blend-screen" />
      <div ref={beamRef} className="absolute inset-0 bg-aurora opacity-50 parallax-transform mix-blend-screen" />
      <div ref={gridRef} className="absolute inset-0 bg-grid parallax-transform opacity-var" />
      <div ref={noiseRef} className="absolute inset-0 opacity-[0.12] bg-noise parallax-transform" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[color-mix(in srgb, hsl(var(--foreground)) 15%, transparent)] via-[color-mix(in srgb, hsl(var(--foreground)) 5%, transparent)] to-transparent" />
    </div>
  );
}
