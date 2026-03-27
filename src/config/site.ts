export const siteConfig = {
  name: "NoeticsTech",
  description:
    "A VRMMORPG universe platform for persistent worlds, AI factions, and player economies.",
  hero: {
    eyebrow: "Persistent VR Universe",
    title: "ENTER THE DIGITAL UNIVERSE",
    subtitle:
      "We build VRMMORPG worlds where players live, trade, and shape the simulation.",
    primaryCta: {
      label: "Explore the World",
      href: "#projects",
    },
    secondaryCta: {
      label: "View Technology",
      href: "#technology",
    },
  },
  nav: [
    { label: "Vision", href: "#about" },
    { label: "Technology", href: "#technology" },
    { label: "Projects", href: "#projects" },
    { label: "Team", href: "#team" },
  ],
  images: {
    hero: "/images/hero-vr-world.svg",
    about: "/images/about-vision.svg",
    services: "/images/services-technology.svg",
    projects: "/images/projects-world-map.svg",
  },
} as const;
