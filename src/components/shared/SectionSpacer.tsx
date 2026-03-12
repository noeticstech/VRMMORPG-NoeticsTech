import { cn } from "@/lib/utils";

type SectionSpacerProps = {
  className?: string;
};

export function SectionSpacer({ className }: SectionSpacerProps) {
  return (
    <section
      aria-hidden="true"
      className={cn("pointer-events-none h-[clamp(28rem,63vw,56rem)]", className)}
    />
  );
}
