"use client";
import Script from "next/script";

export function CalendlyEmbed({ url }: { url: string }) {
  return (
    <div className="w-full">
      <div
        className="calendly-inline-widget rounded-2xl bg-transparent"
        data-url={url}
        style={{ minWidth: 320, height: 720 }}
      />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
    </div>
  );
}


