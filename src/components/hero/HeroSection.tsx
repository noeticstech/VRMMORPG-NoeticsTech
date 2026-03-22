"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { heroSignals } from "@/config/sections";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { TextType } from "@/components/ui/TextType";
import { Eyebrow } from "@/components/ui/typography";
import { Card1 } from "@/components/cards";
import { HeroPlanet } from "./HeroPlanet";

const heroChips = ["AI factions", "Player economy", "Persistent world"] as const;

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden pb-20 pt-32 md:pb-24 lg:pt-36">
      <Container className="relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[680px] space-y-8"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/24 px-4 py-2 backdrop-blur-md">
              <span className="size-2 rounded-full bg-primary shadow-neon" />
              <Eyebrow className="text-primary">{siteConfig.hero.eyebrow}</Eyebrow>
            </div>
            <div className="space-y-5">
              <TextType
                as="h1"
                className="font-display text-4xl leading-[0.94] tracking-[0.08em] text-glow sm:text-5xl lg:text-7xl"
                cursorBlinkDuration={0.65}
                cursorClassName="text-primary/80"
                cursorCharacter="_"
                deletingSpeed={22}
                initialDelay={180}
                loop
                pauseDuration={1200}
                text={siteConfig.hero.title}
                typingSpeed={110}
              />
              <p className="max-w-xl text-base leading-7 text-muted md:text-lg md:leading-8">
                {siteConfig.hero.subtitle}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href={siteConfig.hero.primaryCta.href}>
                  {siteConfig.hero.primaryCta.label}
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href={siteConfig.hero.secondaryCta.href}>
                  {siteConfig.hero.secondaryCta.label}
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              {heroChips.map((chip) => (
                <span
                  key={chip}
                  className="metric-chip rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.26em] text-white/70"
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroPlanet />
          </motion.div>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {heroSignals.map((signal, index) => (
            <motion.div
              key={signal.title}
              initial={{ opacity: 0, y: 24 }}
              transition={{
                duration: 0.55,
                delay: 0.14 + index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true, amount: 0.4 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Card1
                contentClassName="items-start"
                header={
                  <div className="flex w-full items-center justify-between gap-4 px-4 text-white">
                    <span className="card-index">0{index + 1}</span>
                    <span className="font-display text-sm uppercase tracking-[0.22em] text-primary">
                      {signal.value}
                    </span>
                  </div>
                }
              >
                <div className="flex h-full flex-col justify-start gap-3 px-4 pt-2">
                  <p className="font-display text-sm uppercase tracking-[0.16em] text-white">
                    {signal.title}
                  </p>
                  <p className="max-w-[18rem] text-sm leading-6 text-muted">{signal.detail}</p>
                </div>
              </Card1>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
