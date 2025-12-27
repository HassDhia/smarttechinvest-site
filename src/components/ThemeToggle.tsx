"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "../lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    setTheme(isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  if (!mounted || theme === null) {
    return null;
  }

  const isDark = theme === "dark";
  const toggle = () => {
    const next = isDark ? "light" : "dark";
    setTheme(next);
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("theme", next);
    }
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      aria-pressed={isDark}
      onClick={toggle}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[color-mix(in srgb, hsl(var(--card)) 70%, transparent)] px-4 py-2 text-[0.65rem] font-semibold tracking-[0.35em] uppercase text-[hsl(var(--foreground))]/80 transition-colors hover:text-[hsl(var(--foreground))]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]",
        className
      )}
    >
      <span className="relative inline-flex h-4 w-4 items-center justify-center">
        <Sun
          size={14}
          strokeWidth={1.5}
          className={cn("absolute transition-all duration-200", isDark ? "scale-0 opacity-0 -rotate-90" : "scale-100 opacity-100 rotate-0")}
        />
        <Moon
          size={14}
          strokeWidth={1.5}
          className={cn("absolute transition-all duration-200", isDark ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 rotate-90")}
        />
      </span>
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
