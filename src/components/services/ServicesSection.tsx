"use client";

import Image from "next/image";
import { BrainCircuit, Coins, Cpu, Network } from "lucide-react";
import { motion } from "framer-motion";
import { services } from "@/config/sections";
import { siteConfig } from "@/config/site";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { FeatureGrid } from "@/components/ui/grid";
import { SectionHeading } from "@/components/shared/SectionHeading";

const serviceIcons = {
  cpu: Cpu,
  network: Network,
  brain: BrainCircuit,
  coins: Coins,
} as const;

export function ServicesSection() {
  return (
    <section id="technology" className="relative py-[var(--space-section)]">
      <div aria-hidden="true" className="absolute inset-0 opacity-55">
        <Image
          fill
          alt=""
          className="object-cover object-center"
          sizes="100vw"
          src={siteConfig.images.services}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,23,0.8)_0%,rgba(3,8,23,0.64)_36%,rgba(3,8,23,0.95)_100%)]" />
      </div>
      <Container className="relative z-10">
        <SectionHeading
          align="center"
          description="Our stack fuses simulation systems, hyperscale networking, AI orchestration, and economy tooling into one modular platform for persistent VR universes."
          eyebrow="Services"
          title="Game Technology"
        />
        <FeatureGrid className="mt-12">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{ y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Card className="neon-card h-full rounded-[30px]">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex size-14 items-center justify-center rounded-[22px] border border-white/10 bg-white/5 text-primary">
                        <motion.div
                          animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.04, 1] }}
                          transition={{
                            duration: 6 + index,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          <Icon className="size-6" />
                        </motion.div>
                      </div>
                      <span className="rounded-full border border-white/10 bg-black/18 px-3 py-2 text-[10px] uppercase tracking-[0.28em] text-white/70">
                        {service.tag}
                      </span>
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-7">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </FeatureGrid>
      </Container>
    </section>
  );
}
