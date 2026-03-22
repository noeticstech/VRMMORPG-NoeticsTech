"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[60]">
      <Container className="pt-4">
        <div className="section-frame rounded-full border-white/10 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <Link
              className="font-display text-[1.15rem] leading-none tracking-[0.02em] md:text-[1.3rem]"
              href="#hero"
            >
              <span className="text-primary">𝑵𝒐𝒆𝒕𝒊𝒄𝒔</span>
              <span className="text-secondary">𝑻𝒆𝒄𝒉</span>
            </Link>
            <nav className="hidden items-center gap-2 lg:flex">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/70 transition hover:bg-white/8 hover:text-white"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="hidden lg:block">
              <Button asChild size="sm" variant="nav">
                <Link href="#footer">Join The Network</Link>
              </Button>
            </div>
            <button
              aria-expanded={open}
              aria-label="Toggle navigation"
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white lg:hidden"
              onClick={() => setOpen((value) => !value)}
              type="button"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
          <div
            className={cn(
              "grid transition-all duration-300 lg:hidden",
              open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <nav className="flex flex-col gap-2 border-t border-white/10 pt-4">
                {siteConfig.nav.map((item) => (
                  <Link
                    key={item.href}
                    className="rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.2em] text-white/80 transition hover:bg-white/8 hover:text-white"
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button asChild className="mt-2 w-full" variant="secondary">
                  <Link href="#footer">Join The Network</Link>
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
