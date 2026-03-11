"use client";

import {
  BookOpen,
  Boxes,
  Code2,
  Cog,
  Palette,
  PenTool,
} from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { teamRoles } from "@/config/sections";
import { Container } from "@/components/ui/container";
import { AdaptiveGrid } from "@/components/ui/grid";
import { MediaPanel } from "@/components/shared/MediaPanel";
import { SectionHeading } from "@/components/shared/SectionHeading";

const roleIcons = {
  code: Code2,
  pen: PenTool,
  cog: Cog,
  palette: Palette,
  book: BookOpen,
  boxes: Boxes,
} as const;

export function TeamSection() {
  return (
    <section id="team" className="relative py-[var(--space-section)]">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <SectionHeading
              description="Developers, designers, engineers, artists, story architects, and world builders work as one live-universe team. The product is part MMO infrastructure, part simulation platform, part cinematic worldcraft."
              eyebrow="Team"
              title="The Creators"
            />
            <AdaptiveGrid>
              {teamRoles.map((role, index) => {
                const Icon = roleIcons[role.icon];

                return (
                  <motion.article
                    key={role.title}
                    className="neon-card section-frame rounded-[24px] px-4 py-5"
                    initial={{ opacity: 0, y: 24 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[color:rgba(255,141,77,0.2)] bg-[color:rgba(255,141,77,0.08)] text-accent shadow-accent">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <p className="font-display text-sm uppercase tracking-[0.18em] text-white">
                          {role.title}
                        </p>
                        <p className="mt-2 text-xs leading-6 text-muted">{role.description}</p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AdaptiveGrid>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <MediaPanel
              alt="The NoeticsTech team collaborating around a holographic world."
              className="h-full"
              imageClassName="object-cover object-center"
              src={siteConfig.images.team}
            >
              <div className="absolute inset-x-6 bottom-6 rounded-[24px] border border-[color:rgba(255,141,77,0.18)] bg-black/28 p-5 backdrop-blur-xl">
                <p className="font-display text-sm uppercase tracking-[0.18em] text-accent">
                  Building Worlds Beyond Imagination
                </p>
                <p className="mt-3 max-w-lg text-sm leading-7 text-white/80">
                  The operating model blends AAA production craft with frontier platform
                  engineering so the world can scale without losing identity.
                </p>
              </div>
            </MediaPanel>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
