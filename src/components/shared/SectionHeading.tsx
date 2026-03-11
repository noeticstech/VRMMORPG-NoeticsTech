import { cn } from "@/lib/utils";
import { Eyebrow, SectionLead, SectionTitle } from "@/components/ui/typography";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-5",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <SectionTitle>{title}</SectionTitle>
      <SectionLead>{description}</SectionLead>
      <div className={cn("glow-divider max-w-52", align === "center" && "mx-auto")} />
    </div>
  );
}
