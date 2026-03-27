import type { FooterConfig } from "@/config/footer";

type FooterBrandProps = {
  brand: FooterConfig["brand"];
};

export function FooterBrand({ brand }: FooterBrandProps) {
  return (
    <section className="space-y-4">
      <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-primary/75">
        {brand.eyebrow}
      </p>
      <div className="space-y-4">
        <p className="bg-[linear-gradient(90deg,#eef8ff_0%,#84e7ff_35%,#b98cff_68%,#eef8ff_100%)] bg-clip-text font-display text-[2.15rem] uppercase leading-none tracking-[0.28em] text-transparent sm:text-[2.7rem] lg:text-[3rem]">
          {brand.name}
        </p>
        <p className="max-w-xl text-sm leading-7 text-white/72 sm:text-base">
          {brand.identityLine}
        </p>
      </div>
    </section>
  );
}
