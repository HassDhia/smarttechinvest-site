"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<string>("light");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);
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
      className="group relative z-10 mt-auto inline-flex w-full items-center gap-2 rounded-md px-3 h-9 text-sm text-foreground/80 hover:text-foreground hover:bg-accent transition-[background,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]"
    >
      <span className="relative inline-flex h-5 w-5 items-center justify-center">
        <Sun size={18} strokeWidth={1.5} className={["absolute transition-transform duration-200", isDark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"].join(" ")} />
        <Moon size={18} strokeWidth={1.5} className={["absolute transition-transform duration-200", isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"].join(" ")} />
      </span>
      <span className="leading-none">Theme</span>
      <span className="ml-auto inline-flex items-center rounded bg-[hsl(var(--muted))] px-2 py-0.5 text-[11px] text-[hsl(var(--muted-foreground))] group-hover:text-foreground">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
}


