import * as React from "react";
import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-xl font-semibold transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:opacity-50 disabled:cursor-not-allowed active:translate-y-[1px]";
    const variants: Record<ButtonVariant, string> = {
      primary: "bg-[var(--brand)] text-white hover:-translate-y-0.5 shadow-sm",
      secondary: "bg-white text-[var(--brand)] border border-[var(--border)] hover:-translate-y-0.5 shadow-sm",
      ghost: "bg-transparent text-[var(--brand)] hover:bg-slate-100/70 dark:hover:bg-slate-800/60",
      destructive: "bg-red-600 text-white hover:-translate-y-0.5 shadow-sm",
    };
    const sizes: Record<ButtonSize, string> = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2",
      lg: "px-5 py-2.5 text-base",
    };
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";


