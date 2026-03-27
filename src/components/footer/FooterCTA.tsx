import Link from "next/link";
import type { FooterConfig } from "@/config/footer";
import { Button } from "@/components/ui/button";

type FooterCTAProps = {
  cta: FooterConfig["cta"];
};

function isHttpLink(href: string) {
  return href.startsWith("http");
}

export function FooterCTA({ cta }: FooterCTAProps) {
  return (
    <section className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(155deg,rgba(12,22,54,0.78)_0%,rgba(7,14,33,0.92)_55%,rgba(4,8,20,0.98)_100%)] px-6 py-7 shadow-[0_28px_80px_rgba(3,8,23,0.34)] md:px-8 md:py-8">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 18% 20%, rgba(78, 207, 255, 0.18), transparent 26%),
            radial-gradient(circle at 86% 14%, rgba(143, 107, 255, 0.18), transparent 24%),
            linear-gradient(135deg, rgba(255,255,255,0.06), transparent 30%, transparent 75%, rgba(78,207,255,0.05))
          `,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(78,207,255,0.7),rgba(143,107,255,0.55),transparent)]"
      />
      <div className="relative z-10 space-y-5">
        <div className="space-y-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.38em] text-primary/80">
            {cta.eyebrow}
          </p>
          <h2 className="max-w-2xl font-display text-[1.85rem] uppercase leading-[0.96] tracking-[0.08em] text-white sm:text-[2.4rem] lg:text-[2.9rem]">
            {cta.title}
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
            {cta.description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {cta.actions.map((action) => {
            if (action.href.startsWith("#")) {
              return (
                <Button
                  key={action.label}
                  asChild
                  className="min-w-[13rem]"
                  size={action.variant === "primary" ? "lg" : "default"}
                  variant={action.variant}
                >
                  <Link href={action.href}>{action.label}</Link>
                </Button>
              );
            }

            return (
              <Button
                key={action.label}
                asChild
                className="min-w-[13rem]"
                size={action.variant === "primary" ? "lg" : "default"}
                variant={action.variant}
              >
                <a
                  href={action.href}
                  rel={isHttpLink(action.href) ? "noreferrer" : undefined}
                  target={isHttpLink(action.href) ? "_blank" : undefined}
                >
                  {action.label}
                </a>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
