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
        ghost: 'hover:text-muted transition-colors duration-300',
      },
      size: {
        default: 'h-8 px-4 py-1.5',
        sm: '',
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
