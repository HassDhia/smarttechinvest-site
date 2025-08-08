import * as React from "react";
import { cn } from "../../lib/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm",
        "placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";


