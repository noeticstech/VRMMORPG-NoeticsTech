import { AboutSection } from "@/components/about/AboutSection";
import { FooterSection } from "@/components/footer/FooterSection";
import { HeroSection } from "@/components/hero/HeroSection";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { SectionSpacer } from "@/components/shared/SectionSpacer";
import { TeamSection } from "@/components/team/TeamSection";

export default function Home() {
  return (
    <PageLayout>
      <HeroSection />
      <SectionSpacer />
      <AboutSection />
      <SectionSpacer />
      <ServicesSection />
      <SectionSpacer />
      <ProjectsSection />
      <SectionSpacer />
      <TeamSection />
      <SectionSpacer />
      <FooterSection />
    </PageLayout>
  );
}
