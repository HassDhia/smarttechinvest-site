"use client";
import { useEffect, useState } from "react";

export function ThemeToggle({ children }: { children?: React.ReactNode }) {
  const [theme, setTheme] = useState<string>("light");
  useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem("theme")) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(saved);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle("dark", saved === "dark");
    }
  }, []);
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("theme", next);
    }
  };
  return (
    <button onClick={toggle} className="w-full">
      {children ?? <span className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">Toggle Theme</span>}
    </button>
  );
}


