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
import { Card2 } from "@/components/cards";
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

const mapChips = ["Zone sync", "Live economy", "Realm politics"] as const;

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-[var(--space-section)]">
      <Container>
        <SectionHeading
          align="center"
          description="Expandable world modules for conflict, cities, trade, training, and governance."
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
              <div className="card-surface absolute left-5 top-5 hidden rounded-[22px] px-4 py-4 lg:block">
                <p className="card-index">World Mesh</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {mapChips.map((chip) => (
                    <span
                      key={chip}
                      className="metric-chip rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.24em] text-white/70"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
              <div className="metric-chip absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full px-5 py-3 text-xs uppercase tracking-[0.24em] text-primary shadow-neon md:block">
                Global Server Core
              </div>
              <div className="absolute inset-0 hidden md:block">
                {projectModules.map((module, index) => {
                  const Icon = moduleIcons[module.icon];

                  return (
                    <motion.div
                      key={module.title}
                      className={`absolute w-full max-w-[228px] ${module.position}`}
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
                      <Card2 contentClassName="items-start">
                        <div className="flex h-full w-full flex-col justify-between gap-3 px-4 py-3">
                          <div className="flex items-center justify-between">
                            <span className="card-index">0{index + 1}</span>
                            <div className="h-px w-12 bg-gradient-to-r from-[rgba(78,207,255,0.8)] to-transparent" />
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="icon-shell flex size-10 shrink-0 items-center justify-center rounded-2xl text-primary">
                              <Icon className="size-5" />
                            </div>
                            <div>
                              <p className="font-display text-sm uppercase tracking-[0.16em] text-white">
                                {module.title}
                              </p>
                              <p className="mt-2 text-xs leading-5 text-muted">{module.description}</p>
                            </div>
                          </div>
                        </div>
                      </Card2>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
          <AdaptiveGrid className="mt-6 md:hidden">
            {projectModules.map((module, index) => {
              const Icon = moduleIcons[module.icon];

              return (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <Card2 contentClassName="items-start">
                    <div className="flex h-full w-full flex-col justify-between gap-3 px-4 py-3">
                      <div className="flex items-center justify-between">
                        <span className="card-index">0{index + 1}</span>
                        <div className="h-px w-12 bg-gradient-to-r from-[rgba(78,207,255,0.8)] to-transparent" />
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="icon-shell flex size-10 shrink-0 items-center justify-center rounded-2xl text-primary">
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <p className="font-display text-sm uppercase tracking-[0.16em] text-white">
                            {module.title}
                          </p>
                          <p className="mt-2 text-xs leading-5 text-muted">{module.description}</p>
                        </div>
                      </div>
                    </div>
                  </Card2>
                </motion.div>
              );
            })}
          </AdaptiveGrid>
        </div>
      </Container>
    </section>
  );
}
