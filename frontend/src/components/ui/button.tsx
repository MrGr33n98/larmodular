import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-primary disabled:pointer-events-none disabled:opacity-50 active:scale-95 relative overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'bg-clay-primary text-white shadow-[0_5px_0_var(--clay-primary-deep),_0_8px_20px_rgba(74,152,40,0.35)] hover:shadow-[0_8px_0_var(--clay-primary-deep),_0_14px_28px_rgba(74,152,40,0.4)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-[0_2px_0_var(--clay-primary-deep),_0_4px_12px_rgba(74,152,40,0.25)] before:content-[""] before:absolute before:top-1 before:left-3 before:right-3 before:h-2 before:bg-white/30 before:rounded-full',
        destructive:
          'bg-clay-danger text-white shadow-[0_5px_0_#a83428,_0_8px_20px_rgba(208,88,64,0.35)] hover:shadow-[0_8px_0_#a83428,_0_14px_28px_rgba(208,88,64,0.4)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-[0_2px_0_#a83428,_0_4px_12px_rgba(208,88,64,0.2)] before:content-[""] before:absolute before:top-1 before:left-3 before:right-3 before:h-2 before:bg-white/20 before:rounded-full',
        outline:
          'border-2 border-clay-primary/20 bg-transparent text-clay-primary hover:bg-clay-primary/5 hover:border-clay-primary/40',
        secondary:
          'bg-clay-secondary text-clay-wood-dark shadow-[0_5px_0_var(--clay-wood-mid),_0_8px_20px_rgba(184,136,72,0.3)] hover:shadow-[0_8px_0_var(--clay-wood-mid),_0_14px_28px_rgba(184,136,72,0.38)] hover:-translate-y-1 active:translate-y-0.5 active:shadow-[0_2px_0_var(--clay-wood-mid),_0_4px_12px_rgba(184,136,72,0.2)] before:content-[""] before:absolute before:top-1 before:left-3 before:right-3 before:h-2 before:bg-white/30 before:rounded-full',
        ghost: 'hover:bg-clay-primary/5 text-clay-text-secondary',
        link: 'text-clay-primary underline-offset-4 hover:underline',
        clay: 'bg-clay-surface-0 text-clay-text-primary shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-0.5 active:shadow-sm before:content-[""] before:absolute before:top-1 before:left-3 before:right-3 before:h-2 before:bg-white/50 before:rounded-full',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-lg px-4 text-xs',
        lg: 'h-14 rounded-2xl px-10 text-base',
        icon: 'h-11 w-11',
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
