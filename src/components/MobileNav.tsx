"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { durations, easings, overlayVariants } from "../lib/motion";
import { navLinks } from "../lib/nav-links";
import { ThemeToggle } from "./ThemeToggle";

export function MobileNav() {
  const [open, setOpen] = useState(false);

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

  return (
    <div className="lg:hidden">
      <div
        className="fixed top-0 inset-x-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="flex h-14 items-center justify-between text-[0.65rem] tracking-[0.35em] uppercase text-[hsl(var(--foreground-secondary))]">
          <Link href="/" className="font-semibold text-[hsl(var(--foreground))] tracking-[0.5em]">
            STI
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle className="h-8 px-3 py-1 text-[0.6rem]" />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
              className="rounded-full border border-white/30 p-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 bg-transparent"
            >
              {open ? <X aria-hidden /> : <Menu aria-hidden />}
            </button>
          </div>
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
              aria-label="Navigation"
              className="absolute inset-x-4 top-20 rounded-3xl border border-white/15 bg-[#05070e] text-white/90 p-6 backdrop-blur-xl"
              tabIndex={-1}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: durations.md, ease: easings.standard } }}
              exit={{ y: -20, opacity: 0, transition: { duration: durations.sm } }}
            >
              <ul className="flex flex-col divide-y divide-white/10 text-base font-semibold">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between rounded-xl px-2 py-4 text-white/90 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070e]"
                    >
                      <span className="text-lg">{label}</span>
                      <ChevronRight
                        size={18}
                        aria-hidden
                        className="text-white/35 transition-colors group-hover:text-white/70"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </m.nav>
          </m.div>
        ) : null}
      </AnimatePresence>

      <div className="h-14" />
    </div>
  );
}
