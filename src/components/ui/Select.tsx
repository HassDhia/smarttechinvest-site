import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const selectVariants = cva(
  'h-10 w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-base text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--foreground-secondary))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-[var(--dur-200)]'
);

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & VariantProps<typeof selectVariants>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(selectVariants(), className)}
      {...props}
    />
  )
);
Select.displayName = 'Select';
