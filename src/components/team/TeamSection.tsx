"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { teamProfiles } from "@/config/sections";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CreatorProfileCard } from "./CreatorProfileCard";
import { TeamRoleRail } from "./TeamRoleRail";
import { teamIcons, withAlpha } from "./team-utils";

export function TeamSection() {
  return (
    <section id="team" className="relative overflow-hidden py-[var(--space-section)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[8%] top-[16%] h-40 bg-[radial-gradient(circle_at_center,rgba(79,207,255,0.16)_0%,rgba(79,207,255,0.08)_28%,transparent_72%)] blur-3xl"
      />
      <Container>
        <motion.div
          className="relative space-y-10"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.25 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <SectionHeading
            align="center"
            description="Building worlds beyond imagination."
            eyebrow="Team"
            title="The Creators"
          />
          <div className="relative hidden lg:block">
            <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[38px] border border-white/8 bg-[linear-gradient(180deg,rgba(4,9,24,0.94)_0%,rgba(3,8,23,0.98)_100%)] px-6 pb-8 pt-7 shadow-[0_30px_90px_rgba(3,8,23,0.54)] xl:px-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[14%] top-4 h-48 bg-[radial-gradient(circle_at_center,rgba(79,207,255,0.18)_0%,rgba(79,207,255,0.1)_28%,transparent_72%)] blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[16%] bottom-2 h-32 bg-[radial-gradient(circle_at_center,rgba(123,116,255,0.14)_0%,rgba(79,207,255,0.08)_26%,transparent_72%)] blur-3xl"
              />
              <div className="relative grid grid-cols-6 gap-3 xl:gap-5">
                {teamProfiles.map((profile, index) => (
                  <motion.div
                    key={profile.name}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 24 }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <CreatorProfileCard
                      {...profile}
                      className="max-w-[11rem] xl:max-w-[12rem]"
                    />
                    <div className="mt-3 h-16 w-px">
                      <div
                        className="h-full w-full opacity-90"
                        style={{
                          backgroundImage: `repeating-linear-gradient(to bottom, ${withAlpha(profile.accentColor, 0.9)} 0 4px, transparent 4px 8px)`,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <TeamRoleRail className="-mt-1" profiles={teamProfiles} />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:hidden">
            {teamProfiles.map((profile, index) => {
              const Icon = teamIcons[profile.icon];
              const color = profile.accentColor;
              const nodeStyle = {
                borderColor: withAlpha(color, 0.3),
                boxShadow: `0 0 0 1px ${withAlpha(color, 0.16)}, inset 0 0 24px rgba(255,255,255,0.03), 0 0 24px ${withAlpha(color, 0.14)}`,
              } satisfies CSSProperties;

              return (
                <motion.div
                  key={profile.name}
                  className="relative overflow-hidden rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(4,9,24,0.94)_0%,rgba(3,8,23,0.98)_100%)] px-4 pb-5 pt-5 shadow-[0_22px_60px_rgba(3,8,23,0.42)]"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.48,
                    delay: index * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-[18%] top-2 h-24 blur-2xl"
                    style={{
                      background: `radial-gradient(circle at center, ${withAlpha(color, 0.2)} 0%, transparent 68%)`,
                    }}
                  />
                  <CreatorProfileCard {...profile} className="mx-auto max-w-[12rem]" />
                  <div className="mt-3 flex flex-col items-center gap-0">
                    <div
                      className="h-11 w-px"
                      style={{
                        backgroundImage: `repeating-linear-gradient(to bottom, ${withAlpha(color, 0.9)} 0 4px, transparent 4px 8px)`,
                      }}
                    />
                    <span
                      className="size-2 rounded-full"
                      style={{
                        backgroundColor: color,
                        boxShadow: `0 0 14px ${withAlpha(color, 0.84)}`,
                      }}
                    />
                    <div
                      className="relative mt-4 flex size-[4.25rem] items-center justify-center rounded-full border bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(12,18,38,0.92)_60%,rgba(4,7,18,0.98)_100%)]"
                      style={nodeStyle}
                    >
                      <div
                        className="absolute inset-[4px] rounded-full border"
                        style={{
                          borderColor: withAlpha(color, 0.72),
                          boxShadow: `0 0 18px ${withAlpha(color, 0.2)}`,
                        }}
                      />
                      <div
                        className="absolute inset-[-4px] rotate-[12deg] rounded-full border-[2px] border-transparent"
                        style={{
                          borderTopColor: withAlpha(color, 0.9),
                          borderRightColor: withAlpha(color, 0.9),
                        }}
                      />
                      <Icon className="relative z-[1] size-6 text-white" />
                    </div>
                    <p className="mt-3 font-display text-sm uppercase tracking-[0.08em] text-white">
                      {profile.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
