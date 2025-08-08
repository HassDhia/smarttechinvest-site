"use client";
import * as React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

export function Tooltip({ content, children }: { content: string; children: React.ReactNode }) {
  return (
    <RadixTooltip.Provider delayDuration={200} skipDelayDuration={200}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            sideOffset={8}
            collisionPadding={8}
            className="rounded-md border border-[var(--border)] bg-slate-900 text-white text-xs px-2 py-1 shadow z-[var(--z-overlay)] opacity-0 scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100 transition-[opacity,transform] duration-[var(--dur-100)] ease-[var(--ease-standard)] motion-reduce:transition-none"
          >
            {content}
            <RadixTooltip.Arrow className="fill-slate-900" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}


