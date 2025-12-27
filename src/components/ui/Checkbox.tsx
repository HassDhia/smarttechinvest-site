import * as React from 'react';
import { cn } from '../../lib/cn';

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <input
      type="checkbox"
      ref={ref}
      className={cn(
        'h-4 w-4 rounded border border-[hsl(var(--border))] bg-[hsl(var(--background))] cursor-pointer',
        'checked:bg-[hsl(var(--primary))] checked:border-[hsl(var(--primary))]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-colors duration-[var(--dur-200)]',
        'accent-[hsl(var(--primary))]',
        className
      )}
      {...props}
    />
  )
);
Checkbox.displayName = 'Checkbox';
