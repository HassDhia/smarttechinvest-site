"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { durations, easings, overlayVariants } from "../lib/motion";
import { navLinks } from "../lib/nav-links";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("has-drawer");
    } else {
      document.body.style.removeProperty("overflow");
      document.documentElement.classList.remove("has-drawer");
    }
    return () => {
      document.body.style.removeProperty("overflow");
      document.documentElement.classList.remove("has-drawer");
    };
  }, [open]);

  useEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;
    if (open) {
      main.setAttribute("aria-hidden", "true");
      main.setAttribute("inert", "");
    } else {
      main.removeAttribute("aria-hidden");
      main.removeAttribute("inert");
    }
  }, [open]);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <div className="lg:hidden">
      <div className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-gradient-to-b from-black/80 via-black/60 to-transparent backdrop-blur-md px-4" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="flex h-14 items-center justify-between text-[0.65rem] tracking-[0.35em] uppercase text-white/70">
          <Link href="/" className="font-semibold text-white tracking-[0.5em]">
            STI
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-full border border-white/30 p-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <m.div
            className="fixed inset-0 z-40"
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <m.div
              key="scrim"
              className="absolute inset-0 bg-black/70"
              onClick={() => setOpen(false)}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={overlayVariants}
            />
            <m.nav
              key="panel"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
              className="absolute inset-x-4 top-6 rounded-3xl border border-white/15 bg-[#05070e] text-white/90 p-6 backdrop-blur-xl"
              tabIndex={-1}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: durations.md, ease: easings.standard } }}
              exit={{ y: -20, opacity: 0, transition: { duration: durations.sm } }}
            >
              <div className="flex items-center justify-between mb-4">
                <span id="mobile-menu-title" className="text-[0.65rem] tracking-[0.3em] uppercase text-white/60">
                  Navigation
                </span>
                <button
                  ref={closeRef}
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/30 p-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  <X aria-hidden />
                </button>
              </div>
              <ul className="flex flex-col gap-4 text-sm font-semibold">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl border border-white/15 px-4 py-3 text-white/90"
                    >
                      <span>{label}</span>
                      <span className="text-[0.65rem] tracking-[0.3em] text-white/40">↗</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/schedule"
                    onClick={() => setOpen(false)}
                    className="btn-gradient block rounded-full px-5 py-3 text-center text-xs tracking-[0.35em] uppercase"
                  >
                    Book Lab
                  </Link>
                </li>
              </ul>
            </m.nav>
          </m.div>
        ) : null}
      </AnimatePresence>

      <div className="h-14" />
    </div>
  );
}
