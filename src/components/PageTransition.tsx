"use client";
import { AnimatePresence, m } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { durations } from "../lib/motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  if (reduced) return <>{children}</>;

  const key = pathname ?? (typeof window !== "undefined" ? window.location.pathname : "initial");

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.main
        key={key}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: durations.sm }}
        className="min-h-dvh bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
      >
        {children}
      </m.main>
    </AnimatePresence>
  );
}

