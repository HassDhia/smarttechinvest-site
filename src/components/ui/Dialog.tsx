"use client";
import * as React from "react";
import * as RD from "@radix-ui/react-dialog";
import { m } from "framer-motion";
import { overlayVariants, panelVariants } from "../../lib/motion";

// Variants sourced from centralized motion tokens

export function Dialog({ children }: { children: React.ReactNode }) {
  return <RD.Root>{children}</RD.Root>;
}

export const DialogTrigger = RD.Trigger;
export const DialogClose = RD.Close;

export function DialogContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <RD.Portal>
      <RD.Overlay asChild>
        <m.div
          className="fixed inset-0 z-[var(--z-overlay)] bg-[color-mix(in srgb, hsl(var(--background)) 20%, hsl(var(--foreground)) 80%)]/60 motion-reduce:transition-none"
          initial="hidden"
          animate="show"
          exit="exit"
          variants={overlayVariants}
        />
      </RD.Overlay>
      <RD.Content asChild>
        <m.div
          className={"fixed inset-0 z-[calc(var(--z-overlay)+1)] grid place-items-center p-4 motion-reduce:transition-none " + className}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={panelVariants}
        >
          <div className="w-full max-w-md rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] shadow-[var(--shadow)] p-4 outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]">
            {children}
          </div>
        </m.div>
      </RD.Content>
    </RD.Portal>
  );
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <RD.Title className="text-lg font-semibold">{children}</RD.Title>;
}
export function DialogDescription({ children }: { children: React.ReactNode }) {
  return <RD.Description className="text-sm text-[hsl(var(--muted-foreground))]">{children}</RD.Description>;
}


