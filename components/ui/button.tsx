import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-button-gradient text-shadow-sm hover:shadow-button hover:text-shadow transition-[shadow, text-shadow] duration-300',
        secondary:
          'border border-border bg-border/50 hover:bg-border transition-colors duration-300',
        tertiary:
          'bg-primary hover:bg-primary/80 transition-colors duration-300',
        outline:
          'border border-border hover:bg-primary/5 transition-colors duration-300',
        ghost: '',
        'no-hover': 'border border-border bg-border/50 cursor-default',
      },
      size: {
        default: 'px-4 py-1.5 gap-4',
        sm: 'px-3 py-1 gap-1.5 font-normal',
        lg: 'px-6 py-3 text-base',
      },
      rounded: {
        default: 'rounded-full',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
