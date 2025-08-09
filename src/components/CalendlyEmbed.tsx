"use client";
import { useEffect } from "react";

export function CalendlyEmbed({ url }: { url: string }) {
  // Ensure Calendly CSS/JS are available on client navigations
  useEffect(() => {
    const cssHref = "https://assets.calendly.com/assets/external/widget.css";
    if (!document.querySelector(`link[href="${cssHref}"]`)) {
      const linkEl = document.createElement("link");
      linkEl.rel = "stylesheet";
      linkEl.href = cssHref;
      document.head.appendChild(linkEl);
    }

    const jsSrc = "https://assets.calendly.com/assets/external/widget.js";
    if (!document.querySelector(`script[src="${jsSrc}"]`)) {
      const script = document.createElement("script");
      script.src = jsSrc;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full">
      <div
        className="calendly-inline-widget rounded-2xl bg-transparent min-w-[320px] h-[720px]"
        data-url={url}
      />
    </div>
  );
}


