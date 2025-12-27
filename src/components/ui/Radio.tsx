import * as React from 'react';
import { cn } from '../../lib/cn';

export type RadioProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => (
    <input
      type="radio"
      ref={ref}
      className={cn(
        'h-4 w-4 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))] cursor-pointer',
        'checked:border-[hsl(var(--primary))]',
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
Radio.displayName = 'Radio';
