"use client";

import { motion } from "framer-motion";
import { footerConfig } from "@/config/footer";
import { Container } from "@/components/ui/container";
import { FooterBrand } from "./FooterBrand";
import { FooterCTA } from "./FooterCTA";
import { FooterLegal } from "./FooterLegal";
import { FooterNav } from "./FooterNav";
import { FooterNetwork } from "./FooterNetwork";
import { FooterSignals } from "./FooterSignals";

const starField = [
  { left: "8%", top: "13%", size: 2.5, duration: "7.4s", delay: "-0.9s" },
  { left: "18%", top: "22%", size: 1.8, duration: "9.2s", delay: "-1.8s" },
  { left: "29%", top: "11%", size: 2.2, duration: "8.1s", delay: "-2.7s" },
  { left: "44%", top: "18%", size: 2.8, duration: "7.8s", delay: "-0.6s" },
  { left: "56%", top: "10%", size: 1.9, duration: "9.4s", delay: "-3.4s" },
  { left: "68%", top: "24%", size: 2.4, duration: "8.6s", delay: "-2.1s" },
  { left: "82%", top: "15%", size: 2.1, duration: "7.2s", delay: "-1.2s" },
  { left: "91%", top: "26%", size: 1.7, duration: "9.8s", delay: "-2.8s" },
] as const;

export function FooterSection() {
  return (
    <footer id="footer" className="relative overflow-hidden pt-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 16% 10%, rgba(78, 207, 255, 0.14), transparent 24%),
            radial-gradient(circle at 82% 8%, rgba(143, 107, 255, 0.18), transparent 26%),
            radial-gradient(circle at 50% 84%, rgba(255, 141, 77, 0.08), transparent 28%),
            linear-gradient(180deg, rgba(4, 9, 24, 0.18), rgba(3, 8, 23, 0.94))
          `,
        }}
      />
      <Container className="relative z-10">
        <motion.div
          className="section-frame relative overflow-hidden rounded-[40px] px-6 py-8 md:px-8 md:py-10 lg:px-12 lg:py-12"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.2 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(180deg, rgba(255,255,255,0.04), transparent 16%, transparent 78%, rgba(78,207,255,0.04)),
                radial-gradient(circle at 50% 38%, rgba(78, 207, 255, 0.08), transparent 30%),
                radial-gradient(circle at 50% 62%, rgba(143, 107, 255, 0.08), transparent 34%)
              `,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(78, 207, 255, 0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(78, 207, 255, 0.12) 1px, transparent 1px)
              `,
              backgroundPosition: "center center",
              backgroundSize: "96px 96px",
              maskImage:
                "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.75) 25%, rgba(0,0,0,1) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[36%] h-[28rem] w-[74rem] -translate-x-1/2 rounded-[50%] border border-[rgba(78,207,255,0.16)] opacity-70"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[40%] h-[24rem] w-[62rem] -translate-x-1/2 rounded-[50%] border border-[rgba(143,107,255,0.18)] opacity-55"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[44%] h-36 w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(78,207,255,0.18)_0%,rgba(143,107,255,0.1)_42%,transparent_72%)] blur-3xl"
          />
          {starField.map((star, index) => (
            <span
              key={`${star.left}-${star.top}-${index}`}
              aria-hidden="true"
              className="star-particle pointer-events-none"
              style={{
                left: star.left,
                top: star.top,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: star.delay,
                ["--duration" as string]: star.duration,
              }}
            />
          ))}
          <div className="relative z-10">
            <div className="glow-divider" />
            <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
              <div className="space-y-8 lg:space-y-10">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, amount: 0.4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <FooterBrand brand={footerConfig.brand} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, amount: 0.4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <FooterCTA cta={footerConfig.cta} />
                </motion.div>
              </div>
              <motion.div
                className="space-y-8 border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
                initial={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, amount: 0.4 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <FooterNav nav={footerConfig.nav} />
                <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(78,207,255,0.35),rgba(143,107,255,0.22),transparent)]" />
                <FooterNetwork network={footerConfig.network} />
              </motion.div>
            </div>
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.35 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <FooterSignals signals={footerConfig.signals} />
            </motion.div>
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.55, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.35 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <FooterLegal legal={footerConfig.legal} />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}
