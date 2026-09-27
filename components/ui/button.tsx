import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "motion-soft inline-flex min-h-11 items-center justify-center gap-2 rounded-none px-6 py-3 text-sm font-normal focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50 ",
  {
    variants: {
      variant: {
        default: "border border-celadon bg-transparent text-ink hover:bg-indigo-ink hover:text-white",
        secondary: "border border-transparent bg-transparent text-ink hover:border-line",
        ghost: "text-ink-soft hover:bg-porcelain-deep hover:text-ink",
        risk: "bg-cinnabar text-white hover:bg-cinnabar-deep"
      },
      size: {
        default: "min-h-13",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-5 text-base",
        icon: "size-11 px-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button };

