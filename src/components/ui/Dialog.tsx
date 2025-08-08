"use client";
import * as React from "react";
import * as RD from "@radix-ui/react-dialog";
import { LazyMotion, m, domAnimation } from "framer-motion";

const overlay = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.24, ease: [0.2, 0.8, 0.2, 1] as const } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};
const panel = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.2, 0.8, 0.2, 1] as const } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.2 } },
};

export function Dialog({ children }: { children: React.ReactNode }) {
  return <RD.Root>{children}</RD.Root>;
}

export const DialogTrigger = RD.Trigger;
export const DialogClose = RD.Close;

export function DialogContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <RD.Portal>
      <LazyMotion features={domAnimation}>
        <RD.Overlay asChild>
          <m.div
            className="fixed inset-0 z-[var(--z-overlay)] bg-black/40"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={overlay}
          />
        </RD.Overlay>
        <RD.Content asChild>
          <m.div
            className={"fixed inset-0 z-[calc(var(--z-overlay)+1)] grid place-items-center p-4 " + className}
            initial="hidden"
            animate="show"
            exit="exit"
            variants={panel}
          >
            <div className="w-full max-w-md rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] shadow-[var(--shadow)] p-4 outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]">
              {children}
            </div>
          </m.div>
        </RD.Content>
      </LazyMotion>
    </RD.Portal>
  );
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <RD.Title className="text-lg font-semibold">{children}</RD.Title>;
}
export function DialogDescription({ children }: { children: React.ReactNode }) {
  return <RD.Description className="text-sm text-[hsl(var(--muted-foreground))]">{children}</RD.Description>;
}



