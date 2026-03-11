"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { aboutCapabilities, aboutStats } from "@/config/sections";
import { siteConfig } from "@/config/site";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { MediaPanel } from "@/components/shared/MediaPanel";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Container } from "@/components/ui/container";

export function AboutSection() {
  return (
    <section id="about" className="relative py-[var(--space-section)]">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.96fr_1.04fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <MediaPanel
              alt="A holographic city and AI intelligence representing the NoeticsTech vision."
              className="h-full"
              imageClassName="object-cover object-center"
              src={siteConfig.images.about}
            >
              <div className="absolute inset-x-6 bottom-6 rounded-[24px] border border-white/10 bg-black/28 p-5 backdrop-blur-xl">
                <p className="font-display text-sm uppercase tracking-[0.18em] text-primary">
                  World Simulation Directive
                </p>
                <p className="mt-3 max-w-md text-sm leading-7 text-white/80">
                  Persistent world-state orchestration, adaptive AI response, and socially
                  meaningful progression architecture.
                </p>
              </div>
            </MediaPanel>
          </motion.div>
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <SectionHeading
              description="NoeticsTech is building a persistent VR world platform where society, conflict, trade, and discovery evolve in real time across an always-on universe."
              eyebrow="The Vision"
              title="A New Kind of Reality"
            />
            <div className="grid gap-3">
              {aboutCapabilities.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/5 px-4 py-4"
                >
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
                  <p className="text-sm leading-7 text-white/80">{item}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {aboutStats.map((stat, index) => (
                <motion.article
                  key={stat.label}
                  className="neon-card section-frame rounded-[26px] px-5 py-5"
                  initial={{ opacity: 0, y: 24 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <p className="font-display text-3xl uppercase tracking-[0.2em] text-primary">
                    <AnimatedCounter suffix={stat.suffix} value={stat.value} />
                  </p>
                  <p className="mt-4 font-display text-sm uppercase tracking-[0.18em] text-white">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">{stat.description}</p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
