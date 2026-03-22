"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
} from "react";
import { cn } from "@/lib/utils";
import { useInjectedStyle } from "./useInjectedStyle";

const cardStyles = `
  .news-update-card,
  .news-update-card * {
    box-sizing: border-box;
  }

  .news-update-card {
    --card-translate-x: 0px;
    --card-translate-y: 0px;
    --card-rotate-x: 0deg;
    --card-rotate-y: 0deg;
    position: relative;
    width: min(100%, 980px);
    aspect-ratio: 1100 / 820;
    transform:
      perspective(1600px)
      translate3d(var(--card-translate-x), var(--card-translate-y), 0)
      rotateX(var(--card-rotate-x))
      rotateY(var(--card-rotate-y));
    transform-style: preserve-3d;
    contain: layout paint style;
    filter: drop-shadow(0 0 26px rgba(56, 122, 255, 0.2));
    cursor: pointer;
    transition: transform 180ms ease, filter 220ms ease;
  }

  .news-update-frame {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    pointer-events: none;
  }

  .news-update-frame .frame-line-core,
  .news-update-frame .frame-line-accent,
  .news-update-frame .frame-dot {
    transition: opacity 220ms ease, transform 220ms ease;
  }

  .news-update-frame .frame-line-core {
    opacity: 0.78;
  }

  .news-update-frame .frame-line-accent {
    opacity: 0.9;
  }

  .news-update-frame .frame-hover-glow {
    pointer-events: none;
    mix-blend-mode: screen;
    opacity: 1;
  }

  .news-update-card:hover {
    filter:
      drop-shadow(0 0 34px rgba(86, 170, 255, 0.28))
      drop-shadow(0 0 14px rgba(126, 238, 255, 0.16));
  }

  .news-update-card:hover .news-update-frame .frame-line-core,
  .news-update-card:hover .news-update-frame .frame-line-accent,
  .news-update-card:hover .news-update-frame .frame-dot {
    opacity: 1;
  }

  .news-update-frame .frame-pulse {
    animation: framePulse 3.8s ease-in-out infinite;
    animation-play-state: paused;
  }

  .news-update-frame .frame-pulse--slow {
    animation-duration: 5.4s;
  }

  .news-update-frame .frame-pulse--fast {
    animation-duration: 2.8s;
  }

  .news-update-frame .frame-sweep {
    stroke-dasharray: 180 2400;
    stroke-dashoffset: 0;
    animation: frameSweep 6.8s linear infinite;
    animation-play-state: paused;
  }

  .news-update-frame .frame-sweep--soft {
    stroke-dasharray: 120 1800;
    animation-duration: 8.2s;
    opacity: 0.7;
  }

  .news-update-frame .frame-sweep--delay {
    animation-delay: -3.1s;
  }

  .news-update-frame .frame-dot {
    animation: dotPulse 2.4s ease-in-out infinite;
    animation-play-state: paused;
  }

  .news-update-card:is(:hover, :focus-within) .news-update-frame .frame-pulse,
  .news-update-card:is(:hover, :focus-within) .news-update-frame .frame-sweep,
  .news-update-card:is(:hover, :focus-within) .news-update-frame .frame-dot {
    animation-play-state: running;
  }

  @keyframes framePulse {
    0%,
    100% {
      opacity: 0.4;
    }

    50% {
      opacity: 1;
    }
  }

  @keyframes frameSweep {
    from {
      stroke-dashoffset: 0;
    }

    to {
      stroke-dashoffset: -2580;
    }
  }

  @keyframes dotPulse {
    0%,
    100% {
      opacity: 0.45;
      transform: scale(0.92);
      transform-origin: center;
    }

    50% {
      opacity: 1;
      transform: scale(1.15);
      transform-origin: center;
    }
  }
`;

const outerMidPath =
  "M88 156 L112 132 V118 L142 88 H268 L292 112 H908 L932 88 H1058 L1088 118 V132 L1112 156 V670 L1080 702 H852 L824 730 H376 L348 702 H120 L88 670 Z";

const outerFrontPath =
  "M102 166 L128 140 H1072 L1098 166 V614 L1082 630 V662 L1052 692 H148 L118 662 V630 L102 614 Z";

const headerPath =
  "M126 162 L152 136 H270 L292 160 H908 L930 136 H1048 L1074 162 V200 L1048 226 H152 L126 200 Z";

const panelOuterPath =
  "M126 262 L152 236 H1048 L1074 262 V620 L1048 646 H152 L126 620 Z";

const panelInnerPath =
  "M152 280 L174 258 H1026 L1048 280 V602 L1026 624 H174 L152 602 Z";

const sideLeftGlowPath = "M92 178 L92 664";
const sideRightGlowPath = "M1108 178 L1108 664";
const innerSideLeftPath = "M112 192 L112 652";
const innerSideRightPath = "M1088 192 L1088 652";

function clamp01(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function getEdgeProximity(rect: DOMRect, x: number, y: number) {
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const dx = x - centerX;
  const dy = y - centerY;
  let kx = Number.POSITIVE_INFINITY;
  let ky = Number.POSITIVE_INFINITY;

  if (dx !== 0) {
    kx = centerX / Math.abs(dx);
  }

  if (dy !== 0) {
    ky = centerY / Math.abs(dy);
  }

  return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
}

function getCursorAngle(rect: DOMRect, x: number, y: number) {
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const dx = x - centerX;
  const dy = y - centerY;

  if (dx === 0 && dy === 0) {
    return 0;
  }

  const radians = Math.atan2(dy, dx);
  let degrees = radians * (180 / Math.PI) + 90;

  if (degrees < 0) {
    degrees += 360;
  }

  return degrees;
}

type Card1Ids = {
  outerLine: string;
  softLine: string;
  sideLine: string;
  headerFill: string;
  headerGlow: string;
  panelGlow: string;
  glowSoft: string;
  glowStrong: string;
  dotGlow: string;
  maskBlur: string;
  pointerGlowMask: string;
};

function HoverGlowPaths({ ids }: { ids: Card1Ids }) {
  return (
    <>
      <path
        d={outerMidPath}
        fill="none"
        filter={`url(#${ids.glowStrong})`}
        stroke="rgba(138, 236, 255, 0.82)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path
        d={outerFrontPath}
        fill="none"
        filter={`url(#${ids.glowStrong})`}
        stroke="rgba(138, 236, 255, 0.95)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d={sideLeftGlowPath}
        fill="none"
        filter={`url(#${ids.glowStrong})`}
        stroke="rgba(138, 236, 255, 0.95)"
        strokeLinecap="round"
        strokeWidth="4.4"
      />
      <path
        d={sideRightGlowPath}
        fill="none"
        filter={`url(#${ids.glowStrong})`}
        stroke="rgba(138, 236, 255, 0.95)"
        strokeLinecap="round"
        strokeWidth="4.4"
      />
      <path
        d={innerSideLeftPath}
        fill="none"
        filter={`url(#${ids.glowSoft})`}
        stroke="rgba(138, 236, 255, 0.52)"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d={innerSideRightPath}
        fill="none"
        filter={`url(#${ids.glowSoft})`}
        stroke="rgba(138, 236, 255, 0.52)"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d={headerPath}
        fill="none"
        filter={`url(#${ids.glowStrong})`}
        stroke="rgba(138, 236, 255, 0.88)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <line
        filter={`url(#${ids.glowStrong})`}
        stroke="rgba(182, 244, 255, 0.96)"
        strokeLinecap="round"
        strokeWidth="3"
        x1="214"
        x2="986"
        y1="150"
        y2="150"
      />
      <line
        filter={`url(#${ids.glowSoft})`}
        stroke="rgba(138, 236, 255, 0.54)"
        strokeLinecap="round"
        strokeWidth="2"
        x1="330"
        x2="870"
        y1="136"
        y2="136"
      />
      <line
        filter={`url(#${ids.glowSoft})`}
        stroke="rgba(138, 236, 255, 0.46)"
        strokeLinecap="round"
        strokeWidth="1.8"
        x1="188"
        x2="446"
        y1="176"
        y2="176"
      />
      <line
        filter={`url(#${ids.glowSoft})`}
        stroke="rgba(138, 236, 255, 0.46)"
        strokeLinecap="round"
        strokeWidth="1.8"
        x1="754"
        x2="1012"
        y1="176"
        y2="176"
      />
      <line
        filter={`url(#${ids.glowSoft})`}
        stroke="rgba(138, 236, 255, 0.48)"
        strokeLinecap="round"
        strokeWidth="2.6"
        x1="108"
        x2="1092"
        y1="244"
        y2="244"
      />
      <line
        filter={`url(#${ids.glowSoft})`}
        stroke="rgba(138, 236, 255, 0.38)"
        strokeLinecap="round"
        strokeWidth="1.8"
        x1="126"
        x2="1074"
        y1="252"
        y2="252"
      />
      <path
        d={panelOuterPath}
        fill="none"
        filter={`url(#${ids.glowStrong})`}
        stroke="rgba(138, 236, 255, 0.78)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.4"
      />
      <path
        d={panelInnerPath}
        fill="none"
        filter={`url(#${ids.glowStrong})`}
        stroke="rgba(138, 236, 255, 0.52)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
      <line
        filter={`url(#${ids.glowStrong})`}
        stroke="rgba(182, 244, 255, 0.9)"
        strokeLinecap="round"
        strokeWidth="2.8"
        x1="184"
        x2="1016"
        y1="648"
        y2="648"
      />
      <line
        filter={`url(#${ids.glowStrong})`}
        stroke="rgba(182, 244, 255, 0.96)"
        strokeLinecap="round"
        strokeWidth="3.2"
        x1="540"
        x2="660"
        y1="660"
        y2="660"
      />
      <path
        d="M126 560 L114 572 V606 L138 628"
        fill="none"
        filter={`url(#${ids.glowStrong})`}
        stroke="rgba(138, 236, 255, 0.9)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path
        d="M1074 560 L1086 572 V606 L1062 628"
        fill="none"
        filter={`url(#${ids.glowStrong})`}
        stroke="rgba(138, 236, 255, 0.9)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </>
  );
}

function FrameSvg({
  glowMaskRef,
  ids,
}: {
  glowMaskRef: React.RefObject<SVGEllipseElement | null>;
  ids: Card1Ids;
}) {
  return (
    <svg
      aria-hidden="true"
      className="news-update-frame"
      preserveAspectRatio="none"
      viewBox="0 0 1200 820"
    >
      <defs>
        <linearGradient id={ids.outerLine} x1="0" x2="1200" y1="0" y2="0">
          <stop offset="0%" stopColor="rgba(90, 120, 220, 0.18)" />
          <stop offset="12%" stopColor="#2f7dff" />
          <stop offset="50%" stopColor="#7ee4ff" />
          <stop offset="88%" stopColor="#2f7dff" />
          <stop offset="100%" stopColor="rgba(90, 120, 220, 0.18)" />
        </linearGradient>

        <linearGradient id={ids.softLine} x1="0" x2="1200" y1="0" y2="0">
          <stop offset="0%" stopColor="rgba(78, 115, 220, 0.18)" />
          <stop offset="50%" stopColor="rgba(164, 232, 255, 0.82)" />
          <stop offset="100%" stopColor="rgba(78, 115, 220, 0.18)" />
        </linearGradient>

        <linearGradient id={ids.sideLine} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(106, 184, 255, 0)" />
          <stop offset="18%" stopColor="rgba(106, 184, 255, 0.85)" />
          <stop offset="50%" stopColor="rgba(106, 184, 255, 0.18)" />
          <stop offset="82%" stopColor="rgba(106, 184, 255, 0.85)" />
          <stop offset="100%" stopColor="rgba(106, 184, 255, 0)" />
        </linearGradient>

        <linearGradient id={ids.headerFill} x1="600" x2="600" y1="136" y2="226">
          <stop offset="0%" stopColor="rgba(39, 72, 148, 0.94)" />
          <stop offset="45%" stopColor="rgba(21, 39, 85, 0.92)" />
          <stop offset="100%" stopColor="rgba(10, 18, 42, 0.96)" />
        </linearGradient>

        <radialGradient id={ids.headerGlow} cx="50%" cy="10%" r="70%">
          <stop offset="0%" stopColor="rgba(142, 221, 255, 0.46)" />
          <stop offset="50%" stopColor="rgba(77, 137, 255, 0.24)" />
          <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
        </radialGradient>

        <linearGradient id={ids.panelGlow} x1="600" x2="600" y1="236" y2="646">
          <stop offset="0%" stopColor="rgba(11, 18, 40, 0.94)" />
          <stop offset="100%" stopColor="rgba(4, 8, 18, 0.98)" />
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

        <filter height="340%" id={ids.maskBlur} width="340%" x="-120%" y="-120%">
          <feGaussianBlur stdDeviation="28" />
        </filter>

        <mask height="820" id={ids.pointerGlowMask} maskUnits="userSpaceOnUse" width="1200" x="0" y="0">
          <rect fill="black" height="820" width="1200" x="0" y="0" />
          <ellipse
            ref={glowMaskRef}
            cx="600"
            cy="410"
            fill="white"
            filter={`url(#${ids.maskBlur})`}
            opacity="0"
            rx="140"
            ry="110"
          />
        </mask>
      </defs>

      <path
        className="frame-line-core"
        d={outerMidPath}
        fill="none"
        stroke="rgba(104, 128, 214, 0.22)"
        strokeWidth="2"
      />

      <path
        className="frame-line-core"
        d={outerFrontPath}
        fill="rgba(5, 10, 22, 0.94)"
        stroke="rgba(73, 115, 232, 0.3)"
        strokeWidth="2"
      />

      <path
        className="frame-line-accent frame-sweep"
        d={outerFrontPath}
        fill="none"
        filter={`url(#${ids.glowSoft})`}
        stroke={`url(#${ids.outerLine})`}
        strokeWidth="3"
      />

      <path
        className="frame-line-accent frame-sweep"
        d={outerFrontPath}
        fill="none"
        filter={`url(#${ids.glowStrong})`}
        stroke="rgba(146, 239, 255, 0.96)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.2"
      />

      <g>
        <path
          className="frame-line-core"
          d={headerPath}
          fill={`url(#${ids.headerFill})`}
          stroke="rgba(68, 118, 240, 0.35)"
          strokeWidth="2"
        />

        <path
          className="frame-line-accent frame-pulse"
          d={headerPath}
          fill={`url(#${ids.headerGlow})`}
          filter={`url(#${ids.glowSoft})`}
          stroke={`url(#${ids.softLine})`}
          strokeWidth="3"
        />

        <line
          className="frame-line-accent frame-pulse"
          filter={`url(#${ids.glowStrong})`}
          stroke="rgba(146, 229, 255, 0.92)"
          strokeWidth="2.5"
          x1="214"
          x2="986"
          y1="150"
          y2="150"
        />

        <line
          className="frame-line-core"
          stroke="rgba(106, 208, 255, 0.32)"
          strokeWidth="1.5"
          x1="330"
          x2="870"
          y1="136"
          y2="136"
        />

        <line
          className="frame-line-core"
          stroke="rgba(78, 121, 230, 0.16)"
          strokeWidth="1"
          x1="188"
          x2="446"
          y1="176"
          y2="176"
        />

        <line
          className="frame-line-core"
          stroke="rgba(78, 121, 230, 0.16)"
          strokeWidth="1"
          x1="754"
          x2="1012"
          y1="176"
          y2="176"
        />

        <line
          className="frame-line-accent frame-pulse frame-pulse--fast"
          filter={`url(#${ids.glowStrong})`}
          stroke="#d8fbff"
          strokeWidth="2.2"
          x1="310"
          x2="420"
          y1="186"
          y2="186"
        />

        <line
          className="frame-line-accent frame-pulse frame-pulse--fast"
          filter={`url(#${ids.glowStrong})`}
          stroke="#d8fbff"
          strokeWidth="2.2"
          x1="780"
          x2="890"
          y1="186"
          y2="186"
        />
      </g>

      <line
        className="frame-line-core"
        stroke="rgba(98, 140, 238, 0.36)"
        strokeWidth="2"
        x1="108"
        x2="1092"
        y1="244"
        y2="244"
      />

      <line
        className="frame-line-core"
        stroke="rgba(152, 230, 255, 0.18)"
        strokeWidth="1"
        x1="126"
        x2="1074"
        y1="252"
        y2="252"
      />

      <g>
        <path
          className="frame-line-core"
          d={panelOuterPath}
          fill={`url(#${ids.panelGlow})`}
          stroke="rgba(76, 112, 214, 0.22)"
          strokeWidth="2"
        />

        <path
          className="frame-line-core"
          d={panelInnerPath}
          fill="rgba(3, 6, 16, 0.96)"
          stroke="rgba(76, 112, 214, 0.18)"
          strokeWidth="1.5"
        />

        <path
          className="frame-line-accent"
          d={panelOuterPath}
          fill="none"
          filter={`url(#${ids.glowSoft})`}
          stroke={`url(#${ids.softLine})`}
          strokeWidth="2.4"
        />

        <path
          className="frame-line-accent frame-sweep frame-sweep--soft frame-sweep--delay"
          d={panelOuterPath}
          fill="none"
          filter={`url(#${ids.glowStrong})`}
          stroke="rgba(128, 232, 255, 0.92)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
        />

        <line
          className="frame-line-accent frame-pulse frame-pulse--slow"
          filter={`url(#${ids.glowSoft})`}
          stroke="rgba(122, 226, 255, 0.82)"
          strokeWidth="2"
          x1="184"
          x2="1016"
          y1="648"
          y2="648"
        />

        <line
          className="frame-line-accent"
          filter={`url(#${ids.glowStrong})`}
          stroke="rgba(176, 240, 255, 0.92)"
          strokeWidth="2.5"
          x1="540"
          x2="660"
          y1="660"
          y2="660"
        />
      </g>

      <path
        className="frame-line-accent frame-pulse"
        d={sideLeftGlowPath}
        fill="none"
        filter={`url(#${ids.glowStrong})`}
        stroke={`url(#${ids.sideLine})`}
        strokeLinecap="round"
        strokeWidth="4"
      />

      <path
        className="frame-line-accent frame-pulse"
        d={sideRightGlowPath}
        fill="none"
        filter={`url(#${ids.glowStrong})`}
        stroke={`url(#${ids.sideLine})`}
        strokeLinecap="round"
        strokeWidth="4"
      />

      <path
        className="frame-line-core"
        d={innerSideLeftPath}
        fill="none"
        stroke="rgba(84, 132, 240, 0.42)"
        strokeWidth="1.2"
      />

      <path
        className="frame-line-core"
        d={innerSideRightPath}
        fill="none"
        stroke="rgba(84, 132, 240, 0.42)"
        strokeWidth="1.2"
      />

      <path
        className="frame-line-accent frame-pulse frame-pulse--fast"
        d="M126 560 L114 572 V606 L138 628"
        fill="none"
        filter={`url(#${ids.glowSoft})`}
        stroke="rgba(122, 226, 255, 0.8)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />

      <path
        className="frame-line-accent frame-pulse frame-pulse--fast"
        d="M1074 560 L1086 572 V606 L1062 628"
        fill="none"
        filter={`url(#${ids.glowSoft})`}
        stroke="rgba(122, 226, 255, 0.8)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />

      <circle
        className="frame-dot"
        cx="92"
        cy="180"
        fill="#b8f3ff"
        filter={`url(#${ids.dotGlow})`}
        r="3"
      />
      <circle
        className="frame-dot"
        cx="1108"
        cy="180"
        fill="#b8f3ff"
        filter={`url(#${ids.dotGlow})`}
        r="3"
      />
      <circle
        className="frame-dot"
        cx="92"
        cy="670"
        fill="#b8f3ff"
        filter={`url(#${ids.dotGlow})`}
        r="3"
      />
      <circle
        className="frame-dot"
        cx="1108"
        cy="670"
        fill="#b8f3ff"
        filter={`url(#${ids.dotGlow})`}
        r="3"
      />

      <g className="frame-hover-glow" mask={`url(#${ids.pointerGlowMask})`}>
        <HoverGlowPaths ids={ids} />
      </g>
    </svg>
  );
}

type Card1Props = {
  className?: string;
  header?: ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  children?: ReactNode;
};

export function Card1({
  className,
  contentClassName,
  children,
  header,
  headerClassName,
}: Card1Props) {
  useInjectedStyle("noeticstech-card1-styles", cardStyles);

  const cardRef = useRef<HTMLDivElement>(null);
  const glowMaskRef = useRef<SVGEllipseElement>(null);
  const frameIdRef = useRef<number | null>(null);
  const currentRef = useRef({
    tx: 0,
    ty: 0,
    rx: 0,
    ry: 0,
    gx: 600,
    gy: 410,
    ga: 0,
    grx: 140,
    gry: 110,
  });
  const targetRef = useRef({
    tx: 0,
    ty: 0,
    rx: 0,
    ry: 0,
    gx: 600,
    gy: 410,
    ga: 0,
    grx: 140,
    gry: 110,
  });
  const prefix = useId().replace(/:/g, "");
  const ids = useMemo<Card1Ids>(
    () => ({
      outerLine: `${prefix}-card1-outerLine`,
      softLine: `${prefix}-card1-softLine`,
      sideLine: `${prefix}-card1-sideLine`,
      headerFill: `${prefix}-card1-headerFill`,
      headerGlow: `${prefix}-card1-headerGlow`,
      panelGlow: `${prefix}-card1-panelGlow`,
      glowSoft: `${prefix}-card1-glowSoft`,
      glowStrong: `${prefix}-card1-glowStrong`,
      dotGlow: `${prefix}-card1-dotGlow`,
      maskBlur: `${prefix}-card1-maskBlur`,
      pointerGlowMask: `${prefix}-card1-pointerGlowMask`,
    }),
    [prefix],
  );

  const setVar = useCallback((name: string, value: string) => {
    if (cardRef.current) {
      cardRef.current.style.setProperty(name, value);
    }
  }, []);

  const tick = useCallback(function animateFrame() {
    const current = currentRef.current;
    const target = targetRef.current;

    current.tx += (target.tx - current.tx) * 0.16;
    current.ty += (target.ty - current.ty) * 0.16;
    current.rx += (target.rx - current.rx) * 0.16;
    current.ry += (target.ry - current.ry) * 0.16;
    current.gx += (target.gx - current.gx) * 0.2;
    current.gy += (target.gy - current.gy) * 0.2;
    current.ga += (target.ga - current.ga) * 0.16;
    current.grx += (target.grx - current.grx) * 0.18;
    current.gry += (target.gry - current.gry) * 0.18;

    setVar("--card-translate-x", `${current.tx.toFixed(3)}px`);
    setVar("--card-translate-y", `${current.ty.toFixed(3)}px`);
    setVar("--card-rotate-x", `${current.rx.toFixed(3)}deg`);
    setVar("--card-rotate-y", `${current.ry.toFixed(3)}deg`);

    if (glowMaskRef.current) {
      glowMaskRef.current.setAttribute("cx", current.gx.toFixed(2));
      glowMaskRef.current.setAttribute("cy", current.gy.toFixed(2));
      glowMaskRef.current.setAttribute("rx", current.grx.toFixed(2));
      glowMaskRef.current.setAttribute("ry", current.gry.toFixed(2));
      glowMaskRef.current.setAttribute("opacity", current.ga.toFixed(4));
    }

    const settled =
      Math.abs(target.tx - current.tx) < 0.01 &&
      Math.abs(target.ty - current.ty) < 0.01 &&
      Math.abs(target.rx - current.rx) < 0.01 &&
      Math.abs(target.ry - current.ry) < 0.01 &&
      Math.abs(target.gx - current.gx) < 0.02 &&
      Math.abs(target.gy - current.gy) < 0.02 &&
      Math.abs(target.ga - current.ga) < 0.001 &&
      Math.abs(target.grx - current.grx) < 0.02 &&
      Math.abs(target.gry - current.gry) < 0.02;

    if (settled) {
      frameIdRef.current = null;
      return;
    }

    frameIdRef.current = requestAnimationFrame(animateFrame);
  }, [setVar]);

  const ensureAnimation = useCallback(() => {
    if (frameIdRef.current !== null) {
      return;
    }

    frameIdRef.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    return () => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, []);

  const applyHoverGlow = useCallback((clientX: number, clientY: number) => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const edgeStrength = clamp01(getEdgeProximity(rect, x, y) * 1.22 + 0.12);
    const angle = getCursorAngle(rect, x, y);
    const angleRadians = (angle * Math.PI) / 180;
    const horizontalBias = Math.abs(Math.cos(angleRadians));
    const verticalBias = Math.abs(Math.sin(angleRadians));

    targetRef.current.gx = (x / rect.width) * 1200;
    targetRef.current.gy = (y / rect.height) * 820;
    targetRef.current.ga = edgeStrength;
    targetRef.current.grx = 90 + horizontalBias * 120;
    targetRef.current.gry = 90 + verticalBias * 120;
  }, []);

  const applyMagnet = useCallback((clientX: number, clientY: number, boost = 1) => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const offsetX = (clientX - rect.left) / rect.width - 0.5;
    const offsetY = (clientY - rect.top) / rect.height - 0.5;

    targetRef.current.tx = offsetX * 12 * boost;
    targetRef.current.ty = offsetY * 12 * boost;
    targetRef.current.rx = offsetY * -3.6 * boost;
    targetRef.current.ry = offsetX * 3.6 * boost;
  }, []);

  const updateCardMagnet = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      applyMagnet(event.clientX, event.clientY, 1.15);
      applyHoverGlow(event.clientX, event.clientY);
      ensureAnimation();
    },
    [applyHoverGlow, applyMagnet, ensureAnimation],
  );

  const updateZoneMagnet = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      event.stopPropagation();
      applyMagnet(event.clientX, event.clientY, 4.2);
      applyHoverGlow(event.clientX, event.clientY);
      ensureAnimation();
    },
    [applyHoverGlow, applyMagnet, ensureAnimation],
  );

  const resetCardMagnet = useCallback(() => {
    targetRef.current.tx = 0;
    targetRef.current.ty = 0;
    targetRef.current.rx = 0;
    targetRef.current.ry = 0;
    targetRef.current.ga = 0;
    ensureAnimation();
  }, [ensureAnimation]);

  return (
    <div
      ref={cardRef}
      className={cn("news-update-card", className)}
      onPointerLeave={resetCardMagnet}
      onPointerMove={updateCardMagnet}
    >
      <FrameSvg glowMaskRef={glowMaskRef} ids={ids} />
      {header ? (
        <div
          className={cn(
            "absolute left-[10.5%] top-[16.5%] z-[4] flex h-[11%] w-[79%] items-center",
            headerClassName,
          )}
          onPointerMove={updateZoneMagnet}
        >
          {header}
        </div>
      ) : null}
      {children ? (
        <div
          className={cn(
            "absolute left-[10.5%] top-[28.8%] z-[4] flex h-[50%] w-[79%]",
            contentClassName,
          )}
          onPointerMove={updateZoneMagnet}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
