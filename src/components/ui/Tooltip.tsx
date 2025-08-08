"use client";
import * as React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

export function Tooltip({ content, children }: { content: string; children: React.ReactNode }) {
  return (
    <RadixTooltip.Provider delayDuration={150}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Content sideOffset={6} className="rounded-md bg-slate-900 text-white text-xs px-2 py-1 shadow">
          {content}
          <RadixTooltip.Arrow className="fill-slate-900" />
        </RadixTooltip.Content>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}


