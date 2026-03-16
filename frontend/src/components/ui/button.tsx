import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-bold transition-premium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default:
          'bg-brand-primary text-white clay-button hover:bg-brand-primary/90',
        destructive:
          'bg-red-500 text-white shadow-sm hover:bg-red-500/90',
        outline:
          'border-2 border-brand-primary/20 bg-transparent text-brand-primary hover:bg-brand-primary/5 hover:border-brand-primary/40',
        secondary:
          'bg-brand-secondary text-white clay-button hover:bg-brand-secondary/90',
        ghost: 'hover:bg-brand-primary/5 text-brand-secondary',
        link: 'text-brand-primary underline-offset-4 hover:underline',
        clay: 'bg-surface-elevated text-brand-secondary shadow-clay-external relative before:content-[""] before:absolute before:inset-0 before:rounded-2xl before:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.03)] after:content-[""] after:absolute after:inset-0 after:rounded-2xl after:shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.7)] hover:bg-surface-base border border-white/40',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-xl px-4 text-xs',
        lg: 'h-14 rounded-2xl px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
