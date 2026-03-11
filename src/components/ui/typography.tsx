import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type TypographyProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
};

export function Eyebrow({ className, children, ...props }: TypographyProps) {
  return (
    <p
      className={cn(
        "font-display text-xs uppercase tracking-[0.38em] text-primary",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function DisplayTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode }) {
  return (
    <h1
      className={cn(
        "font-display text-4xl leading-[0.95] tracking-[0.1em] text-glow sm:text-5xl lg:text-7xl",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function SectionTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode }) {
  return (
    <h2
      className={cn(
        "font-display text-3xl uppercase tracking-[0.18em] text-white sm:text-4xl lg:text-5xl",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function SectionLead({ className, children, ...props }: TypographyProps) {
  return (
    <p
      className={cn("max-w-2xl text-base leading-8 text-muted md:text-lg", className)}
      {...props}
    >
      {children}
    </p>
  );
}
