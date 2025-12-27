import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] disabled:opacity-50 disabled:cursor-not-allowed active:translate-y-[0.5px] hover:-translate-y-[2px] transition-[background,transform,box-shadow,filter] duration-[var(--dur-200)] ease-[var(--ease-standard)] motion-reduce:transform-none motion-reduce:hover:translate-y-0",
  {
    variants: {
      variant: {
        primary: "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.9)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)]",
        secondary: "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)]",
        ghost: "bg-transparent text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] hover:shadow-[var(--shadow-sm)]",
        outline: "border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] hover:border-[hsl(var(--primary))] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]",
        destructive: "bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] hover:bg-[hsl(var(--destructive)/0.9)] active:bg-[hsl(var(--destructive)/0.85)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)]",
        gradient: "btn-gradient shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)]",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-11 px-5 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, isLoading = false, children, disabled, type = "button", ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className);
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, {
        className: cn(classes, (child.props as any)?.className),
      });
    }
    return (
      <button
        type={type}
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
            <span>{children}</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";


