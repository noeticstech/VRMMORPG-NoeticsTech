import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type TypographyProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
};

export function Eyebrow({ className, children, ...props }: TypographyProps) {
  return (
    <p
      className={cn(
        "font-display text-[11px] uppercase tracking-[0.34em] text-primary",
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
        "font-display text-4xl leading-[0.94] tracking-[0.08em] text-glow sm:text-5xl lg:text-7xl",
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
        "font-display text-3xl uppercase tracking-[0.14em] text-white sm:text-4xl lg:text-[3.2rem]",
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
      className={cn(
        "max-w-[40rem] text-[15px] leading-7 text-muted md:text-base md:leading-8",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
