import { AboutSection } from "@/components/about/AboutSection";
import { FooterSection } from "@/components/footer/FooterSection";
import { HeroSection } from "@/components/hero/HeroSection";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { TeamSection } from "@/components/team/TeamSection";

export default function Home() {
  return (
    <PageLayout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <TeamSection />
      <FooterSection />
    </PageLayout>
  );
}
