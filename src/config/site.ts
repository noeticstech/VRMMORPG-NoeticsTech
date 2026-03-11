export const siteConfig = {
  name: "NoeticsTech",
  description:
    "A high-end landing page for a VRMMORPG platform building persistent digital societies, AI-driven ecosystems, and large-scale virtual economies.",
  hero: {
    eyebrow: "VRMMORPG Universe Platform",
    title: "ENTER THE DIGITAL UNIVERSE",
    subtitle:
      "Building the future of VR MMORPG worlds. Where players don't just play the game — they live inside it.",
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
  footerNav: [
    { label: "Technology", href: "#technology" },
    { label: "Projects", href: "#projects" },
    { label: "Team", href: "#team" },
    { label: "Blog", href: "#footer" },
    { label: "Careers", href: "#footer" },
  ],
  socialLinks: [
    { label: "Discord", href: "https://discord.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "Twitch", href: "https://twitch.tv" },
    { label: "Email", href: "mailto:hello@noeticstech.com" },
  ],
  images: {
    hero: "/images/hero-vr-world.svg",
    about: "/images/about-vision.svg",
    services: "/images/services-technology.svg",
    projects: "/images/projects-world-map.svg",
    team: "/images/team-creators.svg",
    footer: "/images/footer-digital-universe.svg",
  },
} as const;
