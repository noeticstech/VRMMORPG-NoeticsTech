"use client";

import Image from "next/image";
import {
  Building2,
  Coins,
  GraduationCap,
  Network,
  Shield,
  Swords,
} from "lucide-react";
import { motion } from "framer-motion";
import { projectModules } from "@/config/sections";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { AdaptiveGrid } from "@/components/ui/grid";
import { SectionHeading } from "@/components/shared/SectionHeading";

const moduleIcons = {
  swords: Swords,
  building: Building2,
  coins: Coins,
  graduation: GraduationCap,
  network: Network,
  shield: Shield,
} as const;

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-[var(--space-section)]">
      <Container>
        <SectionHeading
          align="center"
          description="The NoeticsTech world stack is built as interoperable modules, allowing systems to expand into warfare, economy, governance, logistics, and civic life."
          eyebrow="Projects"
          title="The Virtual World"
        />
        <div className="mt-12">
          <motion.div
            className="section-frame relative overflow-hidden rounded-[36px] p-3"
            initial={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="relative min-h-[540px] overflow-hidden rounded-[28px] border border-white/10">
              <Image
                fill
                alt="A futuristic world map with modular VRMMORPG systems."
                className="object-cover object-center"
                sizes="100vw"
                src={siteConfig.images.projects}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,23,0.18)_0%,rgba(3,8,23,0.44)_40%,rgba(3,8,23,0.82)_100%)]" />
              <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full border border-[color:rgba(78,207,255,0.32)] bg-black/40 px-5 py-3 text-xs uppercase tracking-[0.24em] text-primary shadow-neon md:block">
                Global Server Core
              </div>
              <div className="absolute inset-0 hidden md:block">
                {projectModules.map((module, index) => {
                  const Icon = moduleIcons[module.icon];

                  return (
                    <motion.article
                      key={module.title}
                      className={`section-frame absolute max-w-[240px] rounded-[24px] px-4 py-4 ${module.position}`}
                      initial={{ opacity: 0, scale: 0.96 }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      viewport={{ once: true }}
                      whileHover={{ y: -6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary">
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <p className="font-display text-sm uppercase tracking-[0.16em] text-white">
                            {module.title}
                          </p>
                          <p className="mt-2 text-xs leading-6 text-muted">{module.description}</p>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </motion.div>
          <AdaptiveGrid className="mt-6 md:hidden">
            {projectModules.map((module, index) => {
              const Icon = moduleIcons[module.icon];

              return (
                <motion.article
                  key={module.title}
                  className="section-frame rounded-[24px] px-4 py-4"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="font-display text-sm uppercase tracking-[0.16em] text-white">
                        {module.title}
                      </p>
                      <p className="mt-2 text-xs leading-6 text-muted">{module.description}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AdaptiveGrid>
        </div>
      </Container>
    </section>
  );
}
