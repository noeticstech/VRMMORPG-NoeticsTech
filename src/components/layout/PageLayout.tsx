import type { ReactNode } from "react";
import { ScrollProgress } from "@/components/bonus/ScrollProgress";
import { SectionTransitionBackground } from "@/components/effects/SectionTransitionBackground";
import { frameTransitions } from "@/config/frameTransitions";
import { Navbar } from "./Navbar";

type PageLayoutProps = {
  children: ReactNode;
};

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="relative isolate min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <SectionTransitionBackground transitions={frameTransitions} />
      <Navbar />
      <main className="relative z-10">{children}</main>
    </div>
  );
}
