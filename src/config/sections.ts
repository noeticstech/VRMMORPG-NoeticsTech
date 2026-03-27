export const heroSignals = [
  {
    title: "Persistent Worlds",
    value: "24/7",
    detail: "Always-on realms with synced state.",
  },
  {
    title: "Neural NPC Mesh",
    value: "AI",
    detail: "Factions react to players in real time.",
  },
  {
    title: "Trade Networks",
    value: "MMO",
    detail: "Trade routes drive the living economy.",
  },
] as const;

export const aboutCapabilities = [
  "Persistent societies",
  "Player-run economies",
  "Adaptive AI factions",
  "Shared global world",
] as const;

export const aboutStats = [
  {
    value: 12,
    suffix: "M+",
    label: "Millions of Players",
    description: "Scale for realm-wide population.",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Persistent Worlds",
    description: "Simulation never sleeps.",
  },
  {
    value: 300,
    suffix: "+",
    label: "AI-Driven Ecosystems",
    description: "Autonomous agents and systems.",
  },
  {
    value: 6,
    suffix: "th Gen",
    label: "Next-Gen VR Technology",
    description: "Low-latency presence tech.",
  },
] as const;

export const services = [
  {
    title: "VR Game Engine Systems",
    description: "Simulation, interaction, and world logic for embodied play.",
    icon: "cpu",
    tag: "Engine Layer",
  },
  {
    title: "Massive Multiplayer Infrastructure",
    description: "Shard orchestration and low-latency networking.",
    icon: "network",
    tag: "Scale Mesh",
  },
  {
    title: "AI NPC Ecosystems",
    description: "Memory, behavior, and faction intelligence.",
    icon: "brain",
    tag: "Autonomy Core",
  },
  {
    title: "Virtual Economy Platforms",
    description: "Trade, scarcity, and governed exchange.",
    icon: "coins",
    tag: "Economy Stack",
  },
] as const;

export const projectModules = [
  {
    title: "Territory Wars",
    description: "Guild conflict at world scale.",
    icon: "swords",
    position: "left-[4%] top-[8%]",
  },
  {
    title: "Player Cities",
    description: "Player-run hubs and districts.",
    icon: "building",
    position: "left-[32%] top-[2%]",
  },
  {
    title: "Economic Systems",
    description: "Reactive markets and logistics.",
    icon: "coins",
    position: "right-[30%] top-[6%]",
  },
  {
    title: "Training Cities",
    description: "Onboarding and mastery zones.",
    icon: "graduation",
    position: "right-[6%] top-[18%]",
  },
  {
    title: "Trading Network",
    description: "Ports, routes, and auctions.",
    icon: "network",
    position: "left-[18%] bottom-[10%]",
  },
  {
    title: "Political Systems",
    description: "Votes, laws, and alliances.",
    icon: "shield",
    position: "right-[10%] bottom-[8%]",
  },
] as const;

export type TeamProfileIcon = "code" | "pen" | "cog" | "palette" | "book" | "boxes";

export type TeamProfile = {
  name: string;
  label: string;
  bio: string;
  icon: TeamProfileIcon;
  accentColor: string;
  photo: string;
  profileUrl: string;
};

export const teamProfiles = [
  {
    name: "Kael Voss",
    label: "Developers",
    bio: "Builds core systems and live ops.",
    icon: "code",
    accentColor: "#4fcfff",
    photo: "/images/team/kael-voss.jpg",
    profileUrl: "https://example.com/team/kael-voss",
  },
  {
    name: "Mira Sol",
    label: "Designers",
    bio: "Shapes loops, balance, and progression.",
    icon: "pen",
    accentColor: "#ff71d9",
    photo: "/images/team/mira-sol.jpg",
    profileUrl: "https://example.com/team/mira-sol",
  },
  {
    name: "Orion Crest",
    label: "Engineers",
    bio: "Owns rendering, network, and cloud.",
    icon: "cog",
    accentColor: "#6f90ff",
    photo: "/images/team/orion-crest.jpg",
    profileUrl: "https://example.com/team/orion-crest",
  },
  {
    name: "Lyra Vale",
    label: "Artists",
    bio: "Crafts worlds, shaders, and UI.",
    icon: "palette",
    accentColor: "#ff8d4d",
    photo: "/images/team/lyra-vale.jpg",
    profileUrl: "https://example.com/team/lyra-vale",
  },
  {
    name: "Soren Quill",
    label: "Storytellers",
    bio: "Writes lore, events, and political arcs.",
    icon: "book",
    accentColor: "#b169ff",
    photo: "/images/team/soren-quill.jpg",
    profileUrl: "https://example.com/team/soren-quill",
  },
  {
    name: "Nova Rune",
    label: "Dreamers",
    bio: "Imagines regions, cities, and biomes.",
    icon: "boxes",
    accentColor: "#d96dff",
    photo: "/images/team/nova-rune.jpg",
    profileUrl: "https://example.com/team/nova-rune",
  },
] satisfies readonly TeamProfile[];
