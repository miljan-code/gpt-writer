import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-medium',
  {
    variants: {
      variant: {
        default:
          'bg-button-gradient text-shadow-sm hover:shadow-button hover:text-shadow transition-[shadow, text-shadow] duration-300',
        secondary:
          'border border-border bg-border/50 hover:bg-border transition-colors duration-300',
        ghost: 'hover:text-muted transition-colors duration-300',
      },
      size: {
        default: 'px-4 py-1.5 gap-4',
        sm: 'px-3 py-1 gap-1.5 font-normal',
        lg: 'px-6 py-3 text-base',
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
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
