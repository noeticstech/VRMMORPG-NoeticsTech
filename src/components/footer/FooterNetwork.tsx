import type { ComponentType, SVGProps } from "react";
import {
  Github,
  Mail,
  MessageSquare,
  Twitter,
  Youtube,
} from "lucide-react";
import type { FooterConfig, FooterNetworkKind } from "@/config/footer";

type FooterNetworkProps = {
  network: FooterConfig["network"];
};

const networkIcons: Record<
  FooterNetworkKind,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  discord: MessageSquare,
  x: Twitter,
  youtube: Youtube,
  github: Github,
  email: Mail,
};

function isHttpLink(href: string) {
  return href.startsWith("http");
}

export function FooterNetwork({ network }: FooterNetworkProps) {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.36em] text-primary/72">
          {network.eyebrow}
        </p>
        <div className="space-y-1.5">
          <p className="font-display text-lg uppercase tracking-[0.14em] text-white">
            {network.title}
          </p>
          <p className="max-w-sm text-sm leading-6 text-white/58">
            {network.description}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {network.items.map((item) => {
          const Icon = networkIcons[item.kind];

          return (
            <a
              key={item.label}
              className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[10px] uppercase tracking-[0.18em] text-white/72 transition hover:-translate-y-0.5 hover:border-[color:rgba(78,207,255,0.35)] hover:bg-white/[0.08] hover:text-white"
              href={item.href}
              rel={isHttpLink(item.href) ? "noreferrer" : undefined}
              target={isHttpLink(item.href) ? "_blank" : undefined}
            >
              <span className="icon-shell flex size-8 items-center justify-center rounded-full text-primary transition group-hover:scale-105">
                <Icon className="size-3.5" />
              </span>
              {item.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}
