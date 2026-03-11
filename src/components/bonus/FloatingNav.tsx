"use client";

import Link from "next/link";
import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

type FloatingNavProps = {
  items: ReadonlyArray<{
    label: string;
    href: string;
  }>;
};

export function FloatingNav({ items }: FloatingNavProps) {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 280);
  });

  return (
    <motion.nav
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 rounded-full border border-white/10 bg-black/30 p-2 backdrop-blur-xl lg:block"
      initial={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              className="flex rounded-full px-4 py-3 text-xs font-medium uppercase tracking-[0.24em] text-white/70 transition hover:bg-white/8 hover:text-white"
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
