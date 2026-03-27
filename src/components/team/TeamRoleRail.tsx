"use client";

import { useId, type CSSProperties } from "react";
import type { TeamProfile } from "@/config/sections";
import { cn } from "@/lib/utils";
import { teamIcons, withAlpha } from "./team-utils";

type TeamRoleRailProps = {
  className?: string;
  profiles: readonly TeamProfile[];
};

export function TeamRoleRail({ className, profiles }: TeamRoleRailProps) {
  const gradientPrefix = useId().replace(/:/g, "");
  const viewWidth = 1200;
  const viewHeight = 96;
  const lineY = 56;
  const edgeInset = 24;
  const columnWidth = viewWidth / profiles.length;
  const centers = profiles.map((_, index) => columnWidth * index + columnWidth / 2);
  const connectorGap = 48;
  const segments = [
    {
      start: edgeInset,
      end: centers[0] - connectorGap,
      startColor: profiles[0].accentColor,
      endColor: profiles[0].accentColor,
    },
    ...centers.slice(0, -1).map((centerX, index) => ({
      start: centerX + connectorGap,
      end: centers[index + 1] - connectorGap,
      startColor: profiles[index].accentColor,
      endColor: profiles[index + 1].accentColor,
    })),
    {
      start: centers[centers.length - 1] + connectorGap,
      end: viewWidth - edgeInset,
      startColor: profiles[profiles.length - 1].accentColor,
      endColor: profiles[profiles.length - 1].accentColor,
    },
  ];

  return (
    <div className={cn("relative", className)}>
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[6rem] w-full overflow-visible"
        preserveAspectRatio="none"
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      >
        <defs>
          {segments.map((segment, index) => (
            <linearGradient
              key={`segment-gradient-${segment.start}-${segment.end}`}
              id={`${gradientPrefix}-team-rail-segment-${index}`}
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
          <radialGradient
            id={`${gradientPrefix}-team-rail-start-dot`}
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor="#effcff" />
            <stop offset="45%" stopColor={profiles[0].accentColor} />
            <stop offset="100%" stopColor="rgba(79,207,255,0)" />
          </radialGradient>
          <radialGradient
            id={`${gradientPrefix}-team-rail-end-dot`}
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor="#f9f0ff" />
            <stop offset="45%" stopColor={profiles[profiles.length - 1].accentColor} />
            <stop offset="100%" stopColor="rgba(217,109,255,0)" />
          </radialGradient>
          <filter
            id={`${gradientPrefix}-team-rail-glow`}
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur result="blurred" stdDeviation="3.8" />
            <feMerge>
              <feMergeNode in="blurred" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={edgeInset}
          cy={lineY}
          fill={`url(#${gradientPrefix}-team-rail-start-dot)`}
          filter={`url(#${gradientPrefix}-team-rail-glow)`}
          r="5.6"
        />
        <circle cx={edgeInset} cy={lineY} fill={profiles[0].accentColor} r="2.4" />
        <circle
          cx={viewWidth - edgeInset}
          cy={lineY}
          fill={`url(#${gradientPrefix}-team-rail-end-dot)`}
          filter={`url(#${gradientPrefix}-team-rail-glow)`}
          r="5.6"
        />
        <circle
          cx={viewWidth - edgeInset}
          cy={lineY}
          fill={profiles[profiles.length - 1].accentColor}
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
                stroke={`url(#${gradientPrefix}-team-rail-segment-${index})`}
                strokeLinecap="round"
                strokeWidth="1.7"
              />
              <path
                d={segmentPath}
                fill="none"
                filter={`url(#${gradientPrefix}-team-rail-glow)`}
                opacity="0.92"
                pathLength="1"
                stroke={`url(#${gradientPrefix}-team-rail-segment-${index})`}
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
                filter={`url(#${gradientPrefix}-team-rail-glow)`}
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
      <div className="grid grid-cols-6 gap-2 pt-0 lg:gap-3 xl:gap-5">
        {profiles.map((profile) => {
          const Icon = teamIcons[profile.icon];
          const color = profile.accentColor;
          const nodeStyle = {
            borderColor: withAlpha(color, 0.3),
            boxShadow: `0 0 0 1px ${withAlpha(color, 0.16)}, inset 0 0 24px rgba(255,255,255,0.03), 0 0 32px ${withAlpha(color, 0.14)}`,
          } satisfies CSSProperties;
          const innerRingStyle = {
            borderColor: withAlpha(color, 0.78),
            boxShadow: `0 0 20px ${withAlpha(color, 0.24)}`,
          } satisfies CSSProperties;
          const outerArcStyle = {
            borderTopColor: withAlpha(color, 0.92),
            borderRightColor: withAlpha(color, 0.92),
            boxShadow: `0 0 18px ${withAlpha(color, 0.16)}`,
          } satisfies CSSProperties;
          const lowerArcStyle = {
            borderBottomColor: withAlpha(color, 0.88),
            borderLeftColor: withAlpha(color, 0.88),
            boxShadow: `0 0 16px ${withAlpha(color, 0.14)}`,
          } satisfies CSSProperties;

          return (
            <div
              key={profile.name}
              className="relative flex flex-col items-center pt-0 text-center"
            >
              <span
                className="relative z-[2] size-2 rounded-full"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 14px ${withAlpha(color, 0.84)}`,
                }}
              />
              <div
                className="relative mt-4 flex size-[4rem] items-center justify-center rounded-full border bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(12,18,38,0.92)_60%,rgba(4,7,18,0.98)_100%)] lg:size-[4.35rem] xl:size-[4.75rem]"
                style={nodeStyle}
              >
                <div className="absolute inset-[3px] rounded-full bg-[#091122]" />
                <div
                  className="absolute inset-[6px] rounded-full border"
                  style={innerRingStyle}
                />
                <div
                  className="absolute inset-[-4px] rotate-[12deg] rounded-full border-[2px] border-transparent"
                  style={outerArcStyle}
                />
                <div
                  className="absolute inset-[-2px] -rotate-[18deg] rounded-full border-[2px] border-transparent"
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
                    style={{ filter: `drop-shadow(0 0 6px ${withAlpha(color, 0.64)})` }}
                  >
                    <animateTransform
                      attributeName="transform"
                      dur="4.2s"
                      from="0 50 50"
                      repeatCount="indefinite"
                      to="360 50 50"
                      type="rotate"
                    />
                  </circle>
                </svg>
                <Icon className="relative z-[1] size-6 text-white lg:size-7 xl:size-8" />
              </div>
              <p className="mt-3 font-display text-[0.82rem] uppercase tracking-[0.08em] text-white lg:text-[0.92rem] xl:text-[1rem]">
                {profile.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
