import type { FooterConfig } from "@/config/footer";

type FooterSignalsProps = {
  signals: FooterConfig["signals"];
};

export function FooterSignals({ signals }: FooterSignalsProps) {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(9,17,42,0.76)_0%,rgba(5,10,24,0.92)_100%)] px-5 py-5">
      <div
        aria-hidden="true"
        className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(78,207,255,0.6),rgba(143,107,255,0.42),transparent)]"
      />
      <div className="relative z-10 space-y-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.38em] text-primary/76">
          {signals.eyebrow}
        </p>
        <div className="grid gap-4 md:grid-cols-5">
          {signals.items.map((item, index) => (
            <div
              key={item.label}
              className={[
                "space-y-1.5",
                index === 0 ? "" : "md:border-l md:border-white/10 md:pl-5",
              ].join(" ")}
            >
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary shadow-[0_0_14px_rgba(78,207,255,0.75)]" />
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/82">
                  {item.label}
                </p>
              </div>
              <p className="text-xs leading-6 text-white/52">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
