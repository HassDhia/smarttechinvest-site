import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-medium transition-colors",
  {
    variants: {
      variant: {
        brand: "border-[hsl(var(--border))] bg-[hsl(var(--muted))] text-[hsl(var(--foreground)/0.8)] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]",
        neutral: "border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))]",
        outline: "border-[hsl(var(--border))] bg-transparent text-[hsl(var(--muted-foreground))]",
      },
      size: {
        sm: "h-7 px-3 text-xs",
        md: "h-8 px-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "md",
    },
  }
);

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className, variant, size }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)}>{children}</span>;
}


