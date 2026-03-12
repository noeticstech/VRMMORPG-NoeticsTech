"use client";

import { Bot, Network, Orbit } from "lucide-react";
import { motion } from "framer-motion";

const orbitCards = [
  {
    title: "Faction Memory",
    detail: "NPCs remember conflict and trade.",
    icon: Bot,
    className: "left-0 top-[14%]",
  },
  {
    title: "Global Sync",
    detail: "Cities and raids stay coherent.",
    icon: Network,
    className: "right-0 top-[26%]",
  },
  {
    title: "Living Orbit",
    detail: "The simulation runs beyond sessions.",
    icon: Orbit,
    className: "left-[18%] bottom-[4%]",
  },
] as const;

export function HeroPlanet() {
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[560px] sm:h-[500px] lg:h-[560px]">
      <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(78,207,255,0.22),transparent_68%)] blur-3xl" />
      <motion.div
        animate={{ rotate: 360 }}
        className="absolute inset-[8%] rounded-full border border-white/8"
        transition={{ duration: 28, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        className="absolute inset-[18%] rounded-full border border-[color:rgba(78,207,255,0.24)]"
        transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <motion.div
        animate={{ y: [0, -12, 0], scale: [1, 1.02, 1] }}
        className="planet-core absolute left-1/2 top-1/2 size-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-[10%] rounded-full border border-white/14" />
        <div className="absolute inset-[19%] rounded-full border border-[color:rgba(255,255,255,0.08)]" />
        <div className="absolute inset-x-[12%] top-1/2 h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        <div className="absolute left-1/2 top-[14%] h-[72%] w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.65, 0.4] }}
        className="absolute inset-[22%] rounded-full border border-[color:rgba(78,207,255,0.24)]"
        transition={{ duration: 6.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      {orbitCards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            animate={{ y: [0, -10, 0] }}
            className={`neon-card section-frame absolute max-w-[220px] rounded-[24px] px-4 py-4 ${card.className}`}
            transition={{
              duration: 4.5 + index,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="card-index">0{index + 1}</span>
              <div className="h-px w-12 bg-gradient-to-r from-[rgba(78,207,255,0.8)] to-transparent" />
            </div>
            <div className="flex items-start gap-3">
              <div className="icon-shell flex size-11 shrink-0 items-center justify-center rounded-2xl text-primary">
                <Icon className="size-5" />
              </div>
              <div className="space-y-2">
                <p className="font-display text-sm uppercase tracking-[0.16em] text-white">
                  {card.title}
                </p>
                <p className="text-xs leading-5 text-muted">{card.detail}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
