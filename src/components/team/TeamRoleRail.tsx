"use client";

import type { CSSProperties } from "react";
import {
  BookOpen,
  Code2,
  Cog,
  Globe2,
  PencilRuler,
  PenTool,
} from "lucide-react";

const roleIcons = {
  code: Code2,
  pen: PenTool,
  cog: Cog,
  palette: PencilRuler,
  book: BookOpen,
  boxes: Globe2,
} as const;

const roleLabels = [
  "Developers",
  "Designers",
  "Engineers",
  "Artists",
  "Storytellers",
  "Dreamers",
] as const;

const roleColors = [
  "#4fcfff",
  "#ff71d9",
  "#6f90ff",
  "#ff8d4d",
  "#b169ff",
  "#d96dff",
] as const;

type TeamRole = {
  title: string;
  description: string;
  icon: keyof typeof roleIcons;
};

type TeamRoleRailProps = {
  roles: readonly TeamRole[];
};

export function TeamRoleRail({ roles }: TeamRoleRailProps) {
  const viewWidth = 1200;
  const viewHeight = 88;
  const lineY = 46;
  const edgeInset = 24;
  const columnWidth = viewWidth / roles.length;
  const centers = roles.map((_, index) => columnWidth * index + columnWidth / 2);
  const connectorGap = 46;
  const segments = [
    {
      start: edgeInset,
      end: centers[0] - connectorGap,
      startColor: roleColors[0],
      endColor: roleColors[0],
    },
    ...centers.slice(0, -1).map((centerX, index) => ({
      start: centerX + connectorGap,
      end: centers[index + 1] - connectorGap,
      startColor: roleColors[index],
      endColor: roleColors[index + 1],
    })),
    {
      start: centers[centers.length - 1] + connectorGap,
      end: viewWidth - edgeInset,
      startColor: roleColors[roleColors.length - 1],
      endColor: roleColors[roleColors.length - 1],
    },
  ];

  return (
    <div className="absolute inset-x-1 bottom-0 z-10 md:inset-x-4 lg:inset-x-6 xl:inset-x-8">
      <div className="relative hidden md:block">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[1rem] h-[3.5rem] w-full overflow-visible"
          preserveAspectRatio="none"
          viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        >
          <defs>
            {segments.map((segment, index) => (
              <linearGradient
                key={`segment-gradient-${segment.start}-${segment.end}`}
                id={`team-rail-segment-${index}`}
                gradientUnits="userSpaceOnUse"
                x1={segment.start}
                x2={segment.end}
                y1={0}
                y2={0}
              >
                <stop offset="0%" stopColor={segment.startColor} />
                <stop offset="100%" stopColor={segment.endColor} />
              </linearGradient>
            ))}
            <radialGradient id="team-rail-start-dot" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#effcff" />
              <stop offset="45%" stopColor={roleColors[0]} />
              <stop offset="100%" stopColor="rgba(79,207,255,0)" />
            </radialGradient>
            <radialGradient id="team-rail-end-dot" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f9f0ff" />
              <stop offset="45%" stopColor={roleColors[roleColors.length - 1]} />
              <stop offset="100%" stopColor="rgba(217,109,255,0)" />
            </radialGradient>
            <filter id="team-rail-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.8" result="blurred" />
              <feMerge>
                <feMergeNode in="blurred" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle
            cx={edgeInset}
            cy={lineY}
            fill="url(#team-rail-start-dot)"
            filter="url(#team-rail-glow)"
            r="5.6"
          />
          <circle cx={edgeInset} cy={lineY} fill={roleColors[0]} r="2.4" />
          <circle
            cx={viewWidth - edgeInset}
            cy={lineY}
            fill="url(#team-rail-end-dot)"
            filter="url(#team-rail-glow)"
            r="5.6"
          />
          <circle
            cx={viewWidth - edgeInset}
            cy={lineY}
            fill={roleColors[roleColors.length - 1]}
            r="2.4"
          />
          {segments.map((segment, index) => {
            const segmentPath = `M ${segment.start} ${lineY} L ${segment.end} ${lineY}`;
            const duration = 4.6;
            const delay = index * 0.28;

            return (
              <g key={`segment-${segment.start}-${segment.end}`}>
                <path
                  d={segmentPath}
                  fill="none"
                  opacity="0.58"
                  stroke={`url(#team-rail-segment-${index})`}
                  strokeLinecap="round"
                  strokeWidth="1.7"
                />
                <path
                  d={segmentPath}
                  fill="none"
                  filter="url(#team-rail-glow)"
                  opacity="0.92"
                  pathLength="1"
                  stroke={`url(#team-rail-segment-${index})`}
                  strokeLinecap="round"
                  strokeWidth="4.4"
                  strokeDasharray="0.26 0.74"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    begin={`${delay}s`}
                    dur={`${duration}s`}
                    from="0"
                    repeatCount="indefinite"
                    to="-1"
                  />
                </path>
                <path
                  d={segmentPath}
                  fill="none"
                  filter="url(#team-rail-glow)"
                  opacity="0.78"
                  pathLength="1"
                  stroke="#effcff"
                  strokeLinecap="round"
                  strokeWidth="1.2"
                  strokeDasharray="0.07 0.93"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    begin={`${delay}s`}
                    dur={`${duration}s`}
                    from="0"
                    repeatCount="indefinite"
                    to="-1"
                  />
                </path>
              </g>
            );
          })}
        </svg>
        <div className="grid grid-cols-6 gap-1 lg:gap-3 xl:gap-5">
          {roles.map((role, index) => {
            const Icon = roleIcons[role.icon];
            const color = roleColors[index % roleColors.length];
            const label = roleLabels[index] ?? role.title;
            const nodeStyle = {
              borderColor: `${color}4d`,
              boxShadow: `0 0 0 1px ${color}26, inset 0 0 24px rgba(255,255,255,0.03), 0 0 32px ${color}24`,
            } satisfies CSSProperties;
            const innerRingStyle = {
              borderColor: `${color}c8`,
              boxShadow: `0 0 20px ${color}3d`,
            } satisfies CSSProperties;
            const outerArcStyle = {
              borderTopColor: `${color}f0`,
              borderRightColor: `${color}f0`,
              boxShadow: `0 0 18px ${color}28`,
            } satisfies CSSProperties;
            const lowerArcStyle = {
              borderBottomColor: `${color}e0`,
              borderLeftColor: `${color}e0`,
              boxShadow: `0 0 16px ${color}24`,
            } satisfies CSSProperties;
            const connectorStyle = {
              backgroundColor: color,
              boxShadow: `0 0 16px ${color}`,
            } satisfies CSSProperties;

            return (
              <div
                key={role.title}
                className="relative flex flex-col items-center gap-3 text-center"
              >
                <span
                  className="absolute left-1/2 top-[2rem] size-1.5 -translate-x-1/2 rounded-full"
                  style={connectorStyle}
                />
                <div
                  className="relative flex size-[4rem] items-center justify-center rounded-full border bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(12,18,38,0.92)_60%,rgba(4,7,18,0.98)_100%)] lg:size-[4.6rem] xl:size-[5rem]"
                  style={nodeStyle}
                >
                  <div className="absolute inset-[3px] rounded-full bg-[#091122]" />
                  <div
                    className="absolute inset-[6px] rounded-full border"
                    style={innerRingStyle}
                  />
                  <div
                    className="absolute inset-[-4px] rounded-full border-[2px] border-transparent rotate-[12deg]"
                    style={outerArcStyle}
                  />
                  <div
                    className="absolute inset-[-2px] rounded-full border-[2px] border-transparent -rotate-[18deg]"
                    style={lowerArcStyle}
                  />
                  <svg
                    aria-hidden
                    className="pointer-events-none absolute inset-[-5px] size-[calc(100%+10px)]"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      fill="none"
                      r="46"
                      stroke={color}
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      strokeDasharray="42 248"
                      style={{ filter: `drop-shadow(0 0 6px ${color})` }}
                    >
                      <animateTransform
                        attributeName="transform"
                        dur={`${3.6 + index * 0.35}s`}
                        from="0 50 50"
                        repeatCount="indefinite"
                        to="360 50 50"
                        type="rotate"
                      />
                    </circle>
                  </svg>
                  <Icon className="relative z-[1] size-6 text-white lg:size-7 xl:size-8" />
                </div>
                <p className="font-display text-[0.82rem] uppercase tracking-[0.08em] text-white lg:text-[0.92rem] xl:text-[1rem]">
                  {label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:hidden">
        {roles.map((role, index) => {
          const Icon = roleIcons[role.icon];
          const color = roleColors[index % roleColors.length];
          const label = roleLabels[index] ?? role.title;
          const nodeStyle = {
            borderColor: `${color}4d`,
            boxShadow: `0 0 0 1px ${color}22, inset 0 0 22px rgba(255,255,255,0.03), 0 0 24px ${color}1e`,
          } satisfies CSSProperties;

          return (
            <div key={role.title} className="flex items-center gap-3">
              <div
                className="relative flex size-[4.15rem] shrink-0 items-center justify-center rounded-full border bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(12,18,38,0.92)_60%,rgba(4,7,18,0.98)_100%)]"
                style={nodeStyle}
              >
                <div
                  className="absolute inset-[-3px] rounded-full border-[2px] border-transparent rotate-[12deg]"
                  style={{ borderTopColor: `${color}e0`, borderRightColor: `${color}e0` }}
                />
                <Icon className="relative z-[1] size-6 text-white" />
              </div>
              <p className="font-display text-sm uppercase tracking-[0.08em] text-white">
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
