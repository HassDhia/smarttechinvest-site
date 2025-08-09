import * as React from "react";

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={
        "animate-pulse rounded-md bg-[hsl(var(--muted))] dark:bg-slate-800/80 " +
        className
      }
      aria-hidden="true"
    />
  );
}


