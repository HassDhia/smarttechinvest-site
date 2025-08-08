"use client";
import * as React from "react";
import * as RadixToast from "@radix-ui/react-toast";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <RadixToast.Provider swipeDirection="right">{children}<RadixToast.Viewport className="fixed bottom-4 right-4 w-96 max-w-[calc(100%-2rem)]" /></RadixToast.Provider>
  );
}

export function Toast({ title, description, open, onOpenChange }: { title: string; description?: string; open?: boolean; onOpenChange?: (o: boolean) => void }) {
  return (
    <RadixToast.Root open={open} onOpenChange={onOpenChange} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow">
      <RadixToast.Title className="font-semibold">{title}</RadixToast.Title>
      {description ? <RadixToast.Description className="text-sm" style={{ color: "var(--muted)" }}>{description}</RadixToast.Description> : null}
      <RadixToast.Close className="absolute top-2 right-2 text-sm" aria-label="Close">✕</RadixToast.Close>
    </RadixToast.Root>
  );
}


