import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative group w-full">
        <input
          type={type}
          className={cn(
            'flex h-12 w-full rounded-2xl border-none bg-surface-base px-4 py-2 text-sm font-medium text-brand-secondary ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/20 disabled:cursor-not-allowed disabled:opacity-50 transition-premium shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)]',
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute inset-0 rounded-2xl pointer-events-none border border-brand-secondary/5 group-focus-within:border-brand-primary/30 transition-premium" />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
