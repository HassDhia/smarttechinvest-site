import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-base text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--foreground-secondary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-[var(--dur-200)]",
  {
    variants: {
      variant: {
        default: "border-[hsl(var(--border))] hover:border-[hsl(var(--border)/0.8)]",
        subtle: "border-transparent bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted)/0.8)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(textareaVariants({ variant }), className)}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
