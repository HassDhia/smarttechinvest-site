"use client";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onMQ = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onMQ);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener?.("change", onMQ);
    };
  }, []);
  if (!visible) return null;
  return (
    <button
      aria-label="Back to top"
      onClick={() => {
        if (reduced) {
          window.scrollTo(0, 0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className="fixed right-5 bottom-20 px-3 py-2 rounded-full bg-[var(--brand)] text-white shadow-sm hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
    >
      ↑
    </button>
  );
}


