"use client";

import type { CSSProperties } from "react";
import { useId, useMemo } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { TeamProfile } from "@/config/sections";
import { cn } from "@/lib/utils";
import { useInjectedStyle } from "@/components/cards/useInjectedStyle";
import { withAlpha } from "../team-utils";

const cardStyles = `
  .creator-profile-card,
  .creator-profile-card * {
    box-sizing: border-box;
  }

  .creator-profile-card {
    position: relative;
    width: 100%;
    aspect-ratio: 360 / 528;
    transform: perspective(1400px) translate3d(0, 0, 0) scale(1);
    transform-style: preserve-3d;
    contain: layout paint style;
    filter:
      drop-shadow(0 0 26px rgba(31, 115, 255, 0.18))
      drop-shadow(0 18px 24px rgba(0, 5, 24, 0.6));
    cursor: pointer;
    transition:
      transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
      filter 220ms ease;
  }

  .creator-profile-card:hover,
  .creator-profile-card:focus-within {
    transform: perspective(1400px) translate3d(0, -10px, 40px) scale(1.028);
    filter:
      drop-shadow(0 0 34px rgba(86, 170, 255, 0.24))
      drop-shadow(0 0 12px rgba(126, 238, 255, 0.12))
      drop-shadow(0 24px 36px rgba(0, 5, 24, 0.72));
  }

  .creator-profile-card-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    pointer-events: none;
  }

  .creator-profile-card-svg .frame-line-core,
  .creator-profile-card-svg .frame-line-accent,
  .creator-profile-card-svg .frame-dot {
    transition: opacity 220ms ease;
  }

  .creator-profile-card-svg .frame-line-core {
    opacity: 0.88;
  }

  .creator-profile-card-svg .frame-line-accent {
    opacity: 0.98;
  }

  .creator-profile-card-hover-glow {
    opacity: 0.42;
    transition: opacity 220ms ease;
  }

  .creator-profile-card:hover .creator-profile-card-hover-glow,
  .creator-profile-card:focus-within .creator-profile-card-hover-glow {
    opacity: 1;
  }

  .creator-profile-card-svg .frame-pulse {
    animation: creatorCardPulse 3.8s ease-in-out infinite;
  }

  .creator-profile-card-svg .frame-pulse--slow {
    animation-duration: 5.4s;
  }

  .creator-profile-card-svg .frame-pulse--fast {
    animation-duration: 2.8s;
  }

  .creator-profile-card-svg .frame-sweep {
    stroke-dasharray: 160 1400;
    stroke-dashoffset: 0;
    animation: creatorCardSweep 6.8s linear infinite;
  }

  .creator-profile-card-svg .frame-sweep--soft {
    stroke-dasharray: 108 980;
    animation-duration: 8.2s;
    opacity: 0.72;
  }

  .creator-profile-card-svg .frame-sweep--delay {
    animation-delay: -3.1s;
  }

  .creator-profile-card-svg .frame-dot {
    animation: creatorCardDotPulse 2.4s ease-in-out infinite;
  }

  @keyframes creatorCardPulse {
    0%,
    100% {
      opacity: 0.42;
    }

    50% {
      opacity: 1;
    }
  }

  @keyframes creatorCardSweep {
    from {
      stroke-dashoffset: 0;
    }

    to {
      stroke-dashoffset: -1560;
    }
  }

  @keyframes creatorCardDotPulse {
    0%,
    100% {
      opacity: 0.5;
      transform: scale(0.94);
      transform-origin: center;
    }

    50% {
      opacity: 1;
      transform: scale(1.16);
      transform-origin: center;
    }
  }
`;

const FRAME_WIDTH = 360;
const FRAME_HEIGHT = 528;

const outerPath =
  "M 34 10 L 326 10 L 348 32 L 348 472 L 330 490 L 282 490 L 256 518 L 104 518 L 78 490 L 30 490 L 12 472 L 12 32 Z";
const innerFramePath =
  "M 42 18 L 318 18 L 340 40 L 340 466 L 324 482 L 280 482 L 254 508 L 106 508 L 80 482 L 36 482 L 20 466 L 20 40 Z";
const panelTrimPath =
  "M 38 52 L 38 448 L 50 460 L 310 460 L 322 448 L 322 52";
const contentClip =
  "polygon(8.2% 0%, 91.8% 0%, 100% 6.6%, 100% 96.9%, 95.8% 100%, 4.2% 100%, 0% 96.9%, 0% 6.6%)";

type CreatorProfileCardIds = {
  outerLine: string;
  softLine: string;
  glowSoft: string;
  glowStrong: string;
  dotGlow: string;
  edgeBloom: string;
};

function HoverGlowPaths({
  accentColor,
  ids,
}: {
  accentColor: string;
  ids: CreatorProfileCardIds;
}) {
  const accentStrong = withAlpha(accentColor, 0.88);
  const accentSoft = withAlpha(accentColor, 0.56);

  return (
    <>
      <path
        d={outerPath}
        fill="none"
        filter={`url(#${ids.glowStrong})`}
        stroke="rgba(188, 246, 255, 0.96)"
        strokeLinejoin="miter"
        strokeWidth="2.3"
      />
      <path
        d={innerFramePath}
        fill="none"
        filter={`url(#${ids.glowSoft})`}
        stroke={accentStrong}
        strokeLinejoin="miter"
        strokeWidth="1.9"
      />
      <path
        d={panelTrimPath}
        fill="none"
        filter={`url(#${ids.glowSoft})`}
        stroke={accentSoft}
        strokeLinejoin="miter"
        strokeWidth="1.8"
      />
      <rect
        fill="rgba(242, 253, 255, 0.94)"
        filter={`url(#${ids.glowStrong})`}
        height="2.5"
        rx="1.25"
        width="160"
        x="100"
        y="493.5"
      />
    </>
  );
}

function FrameSvg({
  accentColor,
  ids,
}: {
  accentColor: string;
  ids: CreatorProfileCardIds;
}) {
  const accentSoft = withAlpha(accentColor, 0.64);
  const accentStrong = withAlpha(accentColor, 0.92);
  const accentGlow = withAlpha(accentColor, 0.28);
  const sideGlow = withAlpha(accentColor, 0.14);

  return (
    <svg
      aria-hidden="true"
      className="creator-profile-card-svg"
      preserveAspectRatio="none"
      viewBox={`0 0 ${FRAME_WIDTH} ${FRAME_HEIGHT}`}
    >
      <defs>
        <linearGradient id={ids.outerLine} x1="0" x2={FRAME_WIDTH} y1="0" y2="0">
          <stop offset="0%" stopColor="rgba(90, 120, 220, 0.18)" />
          <stop offset="12%" stopColor="#2f7dff" />
          <stop offset="50%" stopColor="#7ee4ff" />
          <stop offset="88%" stopColor="#2f7dff" />
          <stop offset="100%" stopColor="rgba(90, 120, 220, 0.18)" />
        </linearGradient>
        <linearGradient id={ids.softLine} x1="0" x2={FRAME_WIDTH} y1="0" y2="0">
          <stop offset="0%" stopColor="rgba(78, 115, 220, 0.18)" />
          <stop offset="50%" stopColor="rgba(164, 232, 255, 0.82)" />
          <stop offset="100%" stopColor="rgba(78, 115, 220, 0.18)" />
        </linearGradient>
        <filter height="140%" id={ids.glowSoft} width="140%" x="-20%" y="-20%">
          <feGaussianBlur result="blur" stdDeviation="4" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter height="160%" id={ids.glowStrong} width="160%" x="-30%" y="-30%">
          <feGaussianBlur result="blur" stdDeviation="8" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter height="1200%" id={ids.dotGlow} width="1200%" x="-600%" y="-600%">
          <feGaussianBlur result="blur" stdDeviation="3" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter height="160%" id={ids.edgeBloom} width="160%" x="-30%" y="-30%">
          <feDropShadow
            dx="0"
            dy="0"
            floodColor="#178eff"
            floodOpacity="0.78"
            stdDeviation="3.8"
          />
          <feDropShadow
            dx="0"
            dy="0"
            floodColor="#f2fdff"
            floodOpacity="0.38"
            stdDeviation="1.2"
          />
        </filter>
      </defs>

      <path d={outerPath} fill="#0a1638" />
      <path d={outerPath} fill={`url(#${ids.outerLine})`} opacity="0.12" />
      <path
        className="frame-line-core"
        d={outerPath}
        fill="none"
        filter={`url(#${ids.edgeBloom})`}
        stroke="rgba(197, 227, 255, 0.72)"
        strokeLinejoin="miter"
        strokeWidth="1.6"
      />
      <path
        className="frame-line-accent frame-sweep"
        d={outerPath}
        fill="none"
        filter={`url(#${ids.glowSoft})`}
        stroke={`url(#${ids.outerLine})`}
        strokeLinejoin="miter"
        strokeWidth="2.4"
      />
      <path
        className="frame-line-accent frame-sweep"
        d={outerPath}
        fill="none"
        filter={`url(#${ids.glowStrong})`}
        stroke="rgba(188, 246, 255, 0.96)"
        strokeLinejoin="miter"
        strokeWidth="2.1"
      />

      <path d={innerFramePath} fill="#08153f" />
      <path
        className="frame-line-core"
        d={innerFramePath}
        fill="none"
        stroke="rgba(197, 227, 255, 0.58)"
        strokeLinejoin="miter"
        strokeWidth="1"
      />
      <path
        className="frame-line-accent frame-sweep frame-sweep--soft frame-sweep--delay"
        d={innerFramePath}
        fill="none"
        filter={`url(#${ids.glowSoft})`}
        stroke={`url(#${ids.softLine})`}
        strokeLinejoin="miter"
        strokeWidth="1.8"
      />
      <path
        className="frame-line-accent frame-sweep frame-sweep--soft frame-sweep--delay"
        d={innerFramePath}
        fill="none"
        filter={`url(#${ids.glowStrong})`}
        stroke={accentStrong}
        strokeLinejoin="miter"
        strokeWidth="1.6"
      />

      <path
        className="frame-line-core"
        d={panelTrimPath}
        fill="none"
        stroke={withAlpha("#79eeff", 0.58)}
        strokeLinejoin="miter"
        strokeWidth="1.1"
      />
      <path
        className="frame-line-accent frame-pulse"
        d={panelTrimPath}
        fill="none"
        filter={`url(#${ids.glowSoft})`}
        stroke={accentSoft}
        strokeLinejoin="miter"
        strokeWidth="1.65"
      />
      <path
        className="frame-line-accent frame-pulse frame-pulse--fast"
        d={panelTrimPath}
        fill="none"
        filter={`url(#${ids.glowStrong})`}
        stroke="rgba(242, 253, 255, 0.92)"
        strokeLinejoin="miter"
        strokeWidth="1.3"
      />

      <g
        className="frame-line-core"
        stroke="rgba(121, 238, 255, 0.62)"
        strokeWidth="1.05"
      >
        <polyline points="72 30 50 52 50 154" />
        <polyline points="288 30 310 52 310 154" />
        <polyline points="50 334 50 442 72 464" />
        <polyline points="310 334 310 442 288 464" />
      </g>
      <g
        className="frame-line-accent frame-pulse frame-pulse--fast"
        filter={`url(#${ids.glowStrong})`}
        stroke="rgba(188, 246, 255, 0.92)"
        strokeWidth="1.55"
      >
        <polyline points="72 30 50 52 50 154" />
        <polyline points="288 30 310 52 310 154" />
        <polyline points="50 334 50 442 72 464" />
        <polyline points="310 334 310 442 288 464" />
      </g>

      <ellipse
        cx="180"
        cy="16"
        fill={accentGlow}
        filter={`url(#${ids.glowSoft})`}
        rx="56"
        ry="14"
      />
      <ellipse
        cx="22"
        cy="262"
        fill={sideGlow}
        filter={`url(#${ids.glowSoft})`}
        rx="16"
        ry="72"
      />
      <ellipse
        cx="338"
        cy="262"
        fill={sideGlow}
        filter={`url(#${ids.glowSoft})`}
        rx="16"
        ry="72"
      />
      <rect
        className="frame-line-accent frame-pulse frame-pulse--slow"
        fill="rgba(242, 253, 255, 0.94)"
        filter={`url(#${ids.glowStrong})`}
        height="2.5"
        rx="1.25"
        width="160"
        x="100"
        y="493.5"
      />

      <circle
        className="frame-dot"
        cx="34"
        cy="34"
        fill="rgba(242, 253, 255, 0.94)"
        filter={`url(#${ids.dotGlow})`}
        r="2.4"
      />
      <circle
        className="frame-dot"
        cx="326"
        cy="34"
        fill="rgba(242, 253, 255, 0.94)"
        filter={`url(#${ids.dotGlow})`}
        r="2.4"
      />
      <circle
        className="frame-dot"
        cx="44"
        cy="474"
        fill={accentStrong}
        filter={`url(#${ids.dotGlow})`}
        r="2.2"
      />
      <circle
        className="frame-dot"
        cx="316"
        cy="474"
        fill={accentStrong}
        filter={`url(#${ids.dotGlow})`}
        r="2.2"
      />

      <g className="creator-profile-card-hover-glow">
        <HoverGlowPaths accentColor={accentColor} ids={ids} />
      </g>
    </svg>
  );
}

type CreatorProfileCardProps = TeamProfile & {
  className?: string;
};

export function CreatorProfileCard({
  accentColor,
  bio,
  className,
  name,
  photo,
  profileUrl,
}: CreatorProfileCardProps) {
  useInjectedStyle("noeticstech-creator-profile-card-styles", cardStyles);

  const prefix = useId().replace(/:/g, "");
  const ids = useMemo<CreatorProfileCardIds>(
    () => ({
      outerLine: `${prefix}-creator-card-outer-line`,
      softLine: `${prefix}-creator-card-soft-line`,
      glowSoft: `${prefix}-creator-card-glow-soft`,
      glowStrong: `${prefix}-creator-card-glow-strong`,
      dotGlow: `${prefix}-creator-card-dot-glow`,
      edgeBloom: `${prefix}-creator-card-edge-bloom`,
    }),
    [prefix],
  );

  const ctaStyle = {
    borderColor: withAlpha(accentColor, 0.28),
    boxShadow: `0 0 20px ${withAlpha(accentColor, 0.14)}`,
  } satisfies CSSProperties;
  const nameGlowStyle = {
    textShadow: `0 0 14px ${withAlpha(accentColor, 0.18)}`,
  } satisfies CSSProperties;

  return (
    <div className={cn("creator-profile-card", className)}>
      <div
        className="absolute left-[9.7%] top-[4.55%] z-[4] h-[83.9%] w-[80.6%] overflow-hidden rounded-[24px]"
        style={{ clipPath: contentClip }}
      >
        <div className="relative h-full w-full bg-[#050b1c]">
          <Image
            fill
            alt={`${name} profile portrait`}
            className="object-cover"
            sizes="(min-width: 1536px) 192px, (min-width: 1280px) 176px, (min-width: 1024px) 152px, 45vw"
            src={photo}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(180deg, rgba(4, 9, 24, 0.06) 0%, rgba(4, 9, 24, 0.16) 24%, rgba(3, 8, 23, 0.88) 74%, rgba(3, 8, 23, 0.96) 100%),
                radial-gradient(circle at 50% 95%, ${withAlpha(accentColor, 0.28)} 0%, transparent 42%)
              `,
            }}
          />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[rgba(3,8,23,0.4)] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-[1] px-4 pb-4 pt-16">
            <div className="max-w-[72%] space-y-2 pr-2">
              <p
                className="min-h-[2.2em] max-w-[8ch] font-display text-[1.05rem] uppercase leading-[1.04] tracking-[0.1em] text-white"
                style={nameGlowStyle}
              >
                {name}
              </p>
              <p
                className="min-h-[4.2rem] max-w-[14rem] text-[10.5px] leading-[1.55] text-white/78"
                style={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 4,
                }}
              >
                {bio}
              </p>
            </div>
            <a
              aria-label={`Explore Profile: ${name}`}
              className="group absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full border bg-[rgba(255,255,255,0.1)] text-white/90 backdrop-blur-md transition hover:scale-105 hover:bg-[rgba(255,255,255,0.16)] hover:text-white"
              href={profileUrl}
              rel="noreferrer"
              style={ctaStyle}
              target="_blank"
            >
              <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
      <FrameSvg accentColor={accentColor} ids={ids} />
    </div>
  );
}
