"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { teamRoles } from "@/config/sections";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TeamRoleRail } from "./TeamRoleRail";

export function TeamSection() {
  return (
    <section id="team" className="relative py-[var(--space-section)]">
      <Container>
        <motion.div
          className="space-y-10"
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
          <div className="relative mx-auto mt-2 min-h-[14rem] w-full max-w-[68rem] md:min-h-[18rem] lg:min-h-[22rem] xl:min-h-[26rem]">
            <div className="pointer-events-none absolute inset-x-[1%] top-0 h-[72%] overflow-hidden">
              <Image
                fill
                priority={false}
                alt="The NoeticsTech team collaborating around a holographic world."
                className="object-cover object-[center_20%] opacity-68 [mask-image:linear-gradient(180deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.92)_54%,rgba(0,0,0,0.42)_78%,transparent_100%)]"
                sizes="(min-width: 1280px) 68rem, (min-width: 768px) 90vw, 100vw"
                src={siteConfig.images.team}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.18)_0%,rgba(2,6,23,0.38)_42%,rgba(2,6,23,0.86)_100%)]" />
            </div>
            <div className="pointer-events-none absolute inset-x-[12%] top-[18%] h-[36%] bg-[radial-gradient(circle_at_center,rgba(83,195,255,0.2)_0%,rgba(120,91,255,0.14)_32%,transparent_72%)] blur-3xl" />
            <TeamRoleRail roles={teamRoles} />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
