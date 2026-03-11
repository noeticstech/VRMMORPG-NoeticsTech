# NoeticsTech

Futuristic AAA-style marketing site for a VRMMORPG universe platform built with Next.js, React, TypeScript, Tailwind CSS v4, Framer Motion, and shadcn-style UI primitives.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Project Structure

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    about/
      AboutSection.tsx
    bonus/
      FloatingNav.tsx
      ScrollProgress.tsx
    effects/
      AnimatedGrid.tsx
      LightStreaks.tsx
      StarfieldBackground.tsx
    footer/
      FooterSection.tsx
    hero/
      HeroPlanet.tsx
      HeroSection.tsx
    layout/
      Navbar.tsx
      PageLayout.tsx
    projects/
      ProjectsSection.tsx
    services/
      ServicesSection.tsx
    shared/
      AnimatedCounter.tsx
      MediaPanel.tsx
      SectionHeading.tsx
    team/
      TeamSection.tsx
    ui/
      button.tsx
      card.tsx
      container.tsx
      grid.tsx
      typography.tsx
  config/
    sections.ts
    site.ts
    theme.ts
  lib/
    utils.ts
  styles/
    theme.css
public/
  images/
    README.md
    about-vision.svg
    footer-digital-universe.svg
    hero-vr-world.svg
    projects-world-map.svg
    services-technology.svg
    team-creators.svg
```

## Image Integration

Section imagery is centrally mapped in `src/config/site.ts`. The current files in `public/images/` are lightweight placeholders so the app builds immediately. Replace them with the supplied renders using the same filenames, or update the paths in `site.ts`.

## Expansion Notes

The structure is already split to support future additions like blog routes, launcher pages, community portals, player dashboards, and developer documentation without rewriting the landing page shell.
