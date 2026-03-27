import Link from "next/link";
import type { FooterConfig } from "@/config/footer";

type FooterNavProps = {
  nav: FooterConfig["nav"];
};

function isHashLink(href: string) {
  return href.startsWith("#");
}

function isHttpLink(href: string) {
  return href.startsWith("http");
}

export function FooterNav({ nav }: FooterNavProps) {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-primary/72">
          {nav.eyebrow}
        </p>
        <p className="max-w-sm text-sm leading-6 text-white/58">
          {nav.description}
        </p>
      </div>
      <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {nav.items.map((item) => (
          <li key={item.label}>
            {item.href ? (
              isHashLink(item.href) ? (
                <Link
                  className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-white/78 transition hover:text-white"
                  href={item.href}
                >
                  <span className="size-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(78,207,255,0.6)] transition group-hover:scale-125" />
                  {item.label}
                </Link>
              ) : (
                <a
                  className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-white/78 transition hover:text-white"
                  href={item.href}
                  rel={isHttpLink(item.href) ? "noreferrer" : undefined}
                  target={isHttpLink(item.href) ? "_blank" : undefined}
                >
                  <span className="size-1.5 rounded-full bg-primary shadow-[0_0_12px_rgba(78,207,255,0.6)] transition group-hover:scale-125" />
                  {item.label}
                </a>
              )
            ) : (
              <span className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-white/42">
                <span className="size-1.5 rounded-full bg-white/20" />
                {item.label}
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[9px] tracking-[0.18em] text-white/38">
                  {item.placeholderLabel ?? "Coming Soon"}
                </span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
