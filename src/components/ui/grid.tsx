import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GridProps = {
  children: ReactNode;
  className?: string;
};

export function FeatureGrid({ children, className }: GridProps) {
  return <div className={cn("grid gap-6 md:grid-cols-2 xl:grid-cols-4", className)}>{children}</div>;
}

export function AdaptiveGrid({ children, className }: GridProps) {
  return <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>{children}</div>;
}
