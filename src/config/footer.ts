export type FooterLinkItem = {
  label: string;
  href?: string;
  placeholderLabel?: string;
};

export type FooterAction = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type FooterNetworkKind =
  | "discord"
  | "x"
  | "youtube"
  | "github"
  | "email";

export type FooterNetworkItem = {
  kind: FooterNetworkKind;
  label: string;
  href: string;
};

export type FooterSignalItem = {
  label: string;
  detail: string;
};

export type FooterConfig = {
  brand: {
    eyebrow: string;
    name: string;
    identityLine: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    actions: FooterAction[];
  };
  nav: {
    eyebrow: string;
    description: string;
    items: FooterLinkItem[];
  };
  network: {
    eyebrow: string;
    title: string;
    description: string;
    items: FooterNetworkItem[];
  };
  signals: {
    eyebrow: string;
    items: FooterSignalItem[];
  };
  legal: {
    copyright: string;
    items: FooterLinkItem[];
  };
};

export const footerConfig = {
  brand: {
    eyebrow: "Digital Universe Command Deck",
    name: "NoeticsTech",
    identityLine: "Persistent worlds for players who want more than a game.",
  },
  cta: {
    eyebrow: "Enter the Command Deck",
    title: "Build inside the persistent frontier.",
    description:
      "NoeticsTech engineers VRMMORPG worlds where AI factions, living economies, and world systems stay alive long after the session ends.",
    actions: [
      {
        label: "Explore the Universe",
        href: "#projects",
        variant: "primary",
      },
      {
        label: "Contact NoeticsTech",
        href: "mailto:hello@noeticstech.com",
        variant: "secondary",
      },
    ],
  },
  nav: {
    eyebrow: "Navigation",
    description: "Quick routes across the NoeticsTech universe.",
    items: [
      { label: "Vision", href: "#about" },
      { label: "Technology", href: "#technology" },
      { label: "Projects", href: "#projects" },
      { label: "Team", href: "#team" },
      { label: "Blog", placeholderLabel: "Coming Soon" },
      { label: "Contact", href: "mailto:hello@noeticstech.com" },
    ],
  },
  network: {
    eyebrow: "Network",
    title: "Open Channels",
    description: "Signal the studio across the wider universe.",
    items: [
      { kind: "discord", label: "Discord", href: "https://discord.com" },
      { kind: "x", label: "X / Twitter", href: "https://x.com" },
      { kind: "youtube", label: "YouTube", href: "https://youtube.com" },
      { kind: "github", label: "GitHub", href: "https://github.com" },
      { kind: "email", label: "Email", href: "mailto:hello@noeticstech.com" },
    ],
  },
  signals: {
    eyebrow: "Universe Signals",
    items: [
      {
        label: "Persistent Worlds",
        detail: "Always-on realm simulation",
      },
      {
        label: "AI-Driven NPCs",
        detail: "Adaptive faction intelligence",
      },
      {
        label: "Player Economies",
        detail: "Trade routes and scarcity loops",
      },
      {
        label: "World Systems",
        detail: "Politics, cities, and laws",
      },
      {
        label: "Network Scale",
        detail: "Infrastructure for living realms",
      },
    ],
  },
  legal: {
    copyright: "© 2026 NoeticsTech — All Rights Reserved",
    items: [
      {
        label: "Privacy Policy",
        placeholderLabel: "Coming Soon",
      },
      {
        label: "Terms of Use",
        placeholderLabel: "Coming Soon",
      },
    ],
  },
} satisfies FooterConfig;
