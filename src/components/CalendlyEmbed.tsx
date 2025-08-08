"use client";
import { useEffect, useRef, useCallback } from "react";
import Script from "next/script";

export function CalendlyEmbed({ url }: { url: string }) {
  // Ensure Calendly styles are available in the <head> even on client-side navigations
  useEffect(() => {
    const existing = document.querySelector(
      'link[href="https://assets.calendly.com/assets/external/widget.css"]'
    ) as HTMLLinkElement | null;
    if (!existing) {
      const linkEl = document.createElement("link");
      linkEl.rel = "stylesheet";
      linkEl.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(linkEl);
    }
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const initCalendly = useCallback(() => {
    const calendlyGlobal = (window as unknown as { Calendly?: any }).Calendly;
    if (!calendlyGlobal || !containerRef.current) return;

    // Clean previous mount to avoid duplicates on hot reloads / navs
    containerRef.current.innerHTML = "";

    calendlyGlobal.initInlineWidget({
      url,
      parentElement: containerRef.current,
    });
  }, [url]);

  useEffect(() => {
    initCalendly();
  }, [initCalendly]);

  return (
    <div className="w-full">
      <div ref={containerRef} className="calendly-inline-widget rounded-2xl bg-transparent h-[720px] min-w-[320px]" />
      {/* Load Calendly's script right after the page becomes interactive to avoid blank widget */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={initCalendly}
      />
    </div>
  );
}


