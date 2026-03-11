export const heroSignals = [
  {
    title: "Persistent Worlds",
    value: "24/7",
    detail: "Always-live universe states with synchronized realm persistence.",
  },
  {
    title: "Neural NPC Mesh",
    value: "AI",
    detail: "Dynamic factions, adaptive encounters, and responsive story arcs.",
  },
  {
    title: "Trade Networks",
    value: "MMO",
    detail: "Player-driven economies spanning regions, guilds, and territories.",
  },
] as const;

export const aboutCapabilities = [
  "Evolving virtual societies that remember player choices",
  "Real player economies with governed scarcity and exchange",
  "Dynamic AI characters that shape quests, politics, and conflict",
  "Global multiplayer universe built for persistent presence",
] as const;

export const aboutStats = [
  {
    value: 12,
    suffix: "M+",
    label: "Millions of Players",
    description: "Mass-scale concurrency planned for global faction growth.",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Persistent Worlds",
    description: "Regional shards stay alive with uninterrupted simulation loops.",
  },
  {
    value: 300,
    suffix: "+",
    label: "AI-Driven Ecosystems",
    description: "Autonomous agents react to climate, trade, and social pressure.",
  },
  {
    value: 6,
    suffix: "th Gen",
    label: "Next-Gen VR Technology",
    description: "Latency-aware rendering, presence systems, and haptic hooks.",
  },
] as const;

export const services = [
  {
    title: "VR Game Engine Systems",
    description:
      "Runtime architecture, interaction loops, and simulation layers tailored for embodied play.",
    icon: "cpu",
    tag: "Engine Layer",
  },
  {
    title: "Massive Multiplayer Infrastructure",
    description:
      "Elastic services, shard orchestration, and low-latency network routing for persistent realms.",
    icon: "network",
    tag: "Scale Mesh",
  },
  {
    title: "AI NPC Ecosystems",
    description:
      "Behavior graphs, memory systems, and faction logic that turn scripted spaces into living societies.",
    icon: "brain",
    tag: "Autonomy Core",
  },
  {
    title: "Virtual Economy Platforms",
    description:
      "Secure trade layers, resource balancing, and player-governed markets designed for longevity.",
    icon: "coins",
    tag: "Economy Stack",
  },
] as const;

export const projectModules = [
  {
    title: "Territory Wars",
    description: "Asymmetric battlegrounds that reshape borders and supply chains.",
    icon: "swords",
    position: "left-[4%] top-[8%]",
  },
  {
    title: "Player Cities",
    description: "Guild-led hubs with zoning, commerce, and civic progression.",
    icon: "building",
    position: "left-[32%] top-[2%]",
  },
  {
    title: "Economic Systems",
    description: "Reactive pricing, material sinks, and cross-region logistics.",
    icon: "coins",
    position: "right-[30%] top-[6%]",
  },
  {
    title: "Training Cities",
    description: "Skill arenas, onboarding districts, and faction academies.",
    icon: "graduation",
    position: "right-[6%] top-[18%]",
  },
  {
    title: "Trading Network",
    description: "Linked ports, caravans, auction houses, and rare-item circulation.",
    icon: "network",
    position: "left-[18%] bottom-[10%]",
  },
  {
    title: "Political Systems",
    description: "Council votes, laws, reputations, and alliance management.",
    icon: "shield",
    position: "right-[10%] bottom-[8%]",
  },
] as const;

export const teamRoles = [
  {
    title: "Developers",
    description: "Gameplay systems, tooling, and live world infrastructure.",
    icon: "code",
  },
  {
    title: "Designers",
    description: "Interaction loops, faction progression, and encounter architecture.",
    icon: "pen",
  },
  {
    title: "Engineers",
    description: "Rendering, networking, cloud systems, and performance pipelines.",
    icon: "cog",
  },
  {
    title: "Artists",
    description: "Worlds, interfaces, shaders, and cinematic environmental mood.",
    icon: "palette",
  },
  {
    title: "Story Architects",
    description: "Political lore, branching events, and universe continuity.",
    icon: "book",
  },
  {
    title: "World Builders",
    description: "Biomes, regions, cities, and spatial identity across the map.",
    icon: "boxes",
  },
] as const;
