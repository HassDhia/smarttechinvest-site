"use client";
import * as React from "react";
import * as RadixToast from "@radix-ui/react-toast";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <RadixToast.Provider swipeDirection="right">
      {children}
      <RadixToast.Viewport className="fixed bottom-4 right-4 w-96 max-w-[calc(100%-2rem)] z-[var(--z-toast)] outline-none" />
    </RadixToast.Provider>
  );
}

export function Toast({ title, description, open, onOpenChange }: { title: string; description?: string; open?: boolean; onOpenChange?: (o: boolean) => void }) {
  return (
    <RadixToast.Root
      open={open}
      onOpenChange={onOpenChange}
      className="relative rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow transition-[opacity,transform] data-[state=open]:opacity-100 data-[state=open]:translate-y-0 data-[state=closed]:opacity-0 data-[state=closed]:translate-y-2 motion-reduce:transition-none"
    >
      <RadixToast.Title className="font-semibold">{title}</RadixToast.Title>
      {description ? <RadixToast.Description className="text-sm" style={{ color: "var(--muted)" }}>{description}</RadixToast.Description> : null}
      <RadixToast.Close className="absolute top-2 right-2 text-sm rounded-md px-2 py-1 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/70" aria-label="Close">✕</RadixToast.Close>
    </RadixToast.Root>
  );
}


