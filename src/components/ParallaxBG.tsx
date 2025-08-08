"use client";
import { useEffect, useState } from "react";

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
  const slow = reducedMotion ? undefined : `translateY(${-(y * slowCoef)}px)`;
  const fast = reducedMotion ? undefined : `translateY(${-(y * fastCoef)}px)`;
  const noiseT = reducedMotion ? undefined : `translateY(${-(y * noiseCoef)}px)`;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 select-none" aria-hidden>
      {/* Far radial glow */}
      <div
        className="absolute inset-0"
        style={{
          transform: slow,
          background:
            "radial-gradient(1000px 520px at 50% -10%, rgba(15,37,68,0.08), transparent 60%)",
        }}
      />
      {/* Near subtle grid/noise */}
      <div
        className="absolute inset-0"
        style={{
          transform: fast,
          opacity: Math.max(0.08, Math.min(0.18, 0.18 - y * 0.0002)),
          backgroundImage:
            "radial-gradient(rgba(15,37,68,0.1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          backgroundPosition: "0 0",
        }}
      />
      {/* Ultra-subtle noise layer */}
      <div
        className="absolute inset-0 opacity-[0.10] dark:opacity-[0.08]"
        style={{
          transform: noiseT,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.015) 0.8px, transparent 0.8px)",
          backgroundSize: "3px 3px",
          backgroundPosition: "0 0",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}


