import * as React from "react";

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={
        "animate-pulse rounded-md bg-[hsl(var(--muted))] dark:bg-[color-mix(in_srgb,_hsl(var(--card))_85%,_transparent)] " +
        className
      }
      aria-hidden="true"
    />
  );
}

