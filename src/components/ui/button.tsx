"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        primary:
          "bg-[image:var(--gradient-button)] text-slate-950 shadow-neon hover:brightness-110",
        secondary:
          "border border-white/10 bg-white/5 text-white backdrop-blur-md hover:border-[color:rgba(78,207,255,0.35)] hover:bg-white/10",
        ghost:
          "border border-transparent bg-transparent text-white hover:border-white/10 hover:bg-white/5",
        nav: "border border-white/10 bg-black/20 text-white/90 backdrop-blur-md hover:border-[color:rgba(78,207,255,0.3)] hover:text-white",
      },
      size: {
        default: "h-11 px-6 text-sm tracking-[0.18em]",
        sm: "h-9 px-4 text-xs tracking-[0.16em]",
        lg: "h-13 px-7 text-sm tracking-[0.22em]",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
