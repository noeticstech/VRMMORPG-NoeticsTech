"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  MessageSquare,
  Twitch,
  Twitter,
  Youtube,
} from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const socialIcons = {
  Discord: MessageSquare,
  Twitter,
  YouTube: Youtube,
  Twitch,
  Email: Mail,
} as const;

export function FooterSection() {
  return (
    <footer id="footer" className="relative overflow-hidden pt-8">
      <div aria-hidden="true" className="absolute inset-0 opacity-55">
        <Image
          fill
          alt=""
          className="object-cover object-center"
          sizes="100vw"
          src={siteConfig.images.footer}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,23,0.2)_0%,rgba(3,8,23,0.8)_50%,rgba(3,8,23,0.96)_100%)]" />
      </div>
      <Container className="relative z-10">
        <div className="section-frame rounded-[36px] px-6 py-10 md:px-8 md:py-12">
          <div className="glow-divider" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.4 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <p className="font-display text-2xl uppercase tracking-[0.24em] text-white">
                {siteConfig.name}
              </p>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted">
                Persistent worlds for players who want more than a game.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild>
                  <Link href="#projects">Explore the Universe</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="mailto:hello@noeticstech.com">Contact NoeticsTech</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="grid gap-4 sm:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.4 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="neon-card section-frame rounded-[28px] p-5">
                <p className="font-display text-sm uppercase tracking-[0.22em] text-primary">
                  Navigation
                </p>
                <ul className="mt-5 space-y-3">
                  {siteConfig.footerNav.map((item) => (
                    <li key={item.label}>
                      <Link
                        className="text-sm uppercase tracking-[0.16em] text-white/80 transition hover:text-white"
                        href={item.href}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="neon-card section-frame rounded-[28px] p-5">
                <p className="font-display text-sm uppercase tracking-[0.22em] text-primary">
                  Digital Universe
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {siteConfig.socialLinks.map((link) => {
                    const Icon = socialIcons[link.label as keyof typeof socialIcons];

                    return (
                      <Link
                        key={link.label}
                        aria-label={link.label}
                        className="icon-shell group flex size-11 items-center justify-center rounded-full text-white/75 transition hover:border-[color:rgba(78,207,255,0.28)] hover:text-primary"
                        href={link.href}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                      >
                        <Icon className="size-4 transition group-hover:scale-110" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
