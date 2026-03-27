import type { FooterConfig } from "@/config/footer";

type FooterLegalProps = {
  legal: FooterConfig["legal"];
};

export function FooterLegal({ legal }: FooterLegalProps) {
  return (
    <section className="flex flex-col gap-4 border-t border-white/10 pt-5 text-[11px] uppercase tracking-[0.18em] text-white/46 md:flex-row md:items-center md:justify-between">
      <p>{legal.copyright}</p>
      <div className="flex flex-wrap items-center gap-4 md:justify-end">
        {legal.items.map((item) =>
          item.href ? (
            <a
              key={item.label}
              className="transition hover:text-white/76"
              href={item.href}
            >
              {item.label}
            </a>
          ) : (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 text-white/34"
            >
              {item.label}
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[9px] tracking-[0.18em] text-white/32">
                {item.placeholderLabel ?? "Coming Soon"}
              </span>
            </span>
          ),
        )}
      </div>
    </section>
  );
}
