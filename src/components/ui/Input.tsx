import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const inputStyles = cva(
  "w-full rounded-md border bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] px-3 py-2 text-sm transition-colors placeholder:text-[hsl(var(--muted-foreground)/0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] invalid:ring-2 invalid:ring-[hsl(var(--destructive))] disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "border-[hsl(var(--border))]",
        subtle: "border-transparent shadow-[var(--shadow-sm)]",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-3",
        lg: "h-11 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Avoid clashing 'size' prop by omitting it from intrinsic input attrs
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputStyles> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, variant, size, ...props }, ref) => {
  return <input ref={ref} className={cn(inputStyles({ variant, size }), className)} {...props} />;
});
Input.displayName = "Input";


