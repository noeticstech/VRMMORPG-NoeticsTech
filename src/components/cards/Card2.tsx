"use client";

import {
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
  .card2-frame,
  .card2-frame * {
    box-sizing: border-box;
  }

  .card2-frame {
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
    filter: drop-shadow(0 0 24px rgba(56, 122, 255, 0.18));
    cursor: pointer;
    transition: filter 220ms ease;
  }

  .card2-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    pointer-events: none;
  }

  .card2-svg .frame-line-core,
  .card2-svg .frame-line-accent,
  .card2-svg .frame-dot {
    transition: opacity 220ms ease;
  }

  .card2-svg .frame-line-core {
    opacity: 0.78;
  }

  .card2-svg .frame-line-accent {
    opacity: 0.9;
  }

  .card2-svg .frame-hover-glow {
    pointer-events: none;
    mix-blend-mode: screen;
    opacity: 1;
  }

  .card2-frame:hover {
    filter:
      drop-shadow(0 0 32px rgba(86, 170, 255, 0.24))
      drop-shadow(0 0 14px rgba(126, 238, 255, 0.14));
  }

  .card2-frame:hover .card2-svg .frame-line-core,
  .card2-frame:hover .card2-svg .frame-line-accent,
  .card2-frame:hover .card2-svg .frame-dot {
    opacity: 1;
  }

  .card2-svg .frame-pulse {
    animation: card2Pulse 3.8s ease-in-out infinite;
    animation-play-state: paused;
  }

  .card2-svg .frame-pulse--slow {
    animation-duration: 5.4s;
  }

  .card2-svg .frame-pulse--fast {
    animation-duration: 2.8s;
  }

  .card2-svg .frame-sweep {
    stroke-dasharray: 180 2400;
    stroke-dashoffset: 0;
    animation: card2Sweep 6.8s linear infinite;
    animation-play-state: paused;
  }

  .card2-svg .frame-dot {
    animation: card2DotPulse 2.4s ease-in-out infinite;
    animation-play-state: paused;
  }

  .card2-frame:is(:hover, :focus-within) .frame-pulse,
  .card2-frame:is(:hover, :focus-within) .frame-sweep,
  .card2-frame:is(:hover, :focus-within) .frame-dot {
    animation-play-state: running;
  }

  @keyframes card2Pulse {
    0%,
    100% {
      opacity: 0.4;
    }

    50% {
      opacity: 1;
    }
  }

  @keyframes card2Sweep {
    from {
      stroke-dashoffset: 0;
    }

    to {
      stroke-dashoffset: -2580;
    }
  }

  @keyframes card2DotPulse {
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

const sideLeftGlowPath = "M92 178 L92 664";
const sideRightGlowPath = "M1108 178 L1108 664";
const innerSideLeftPath = "M112 192 L112 652";
const innerSideRightPath = "M1088 192 L1088 652";
const sideBracketLeftPath = "M126 560 L114 572 V606 L138 628";
const sideBracketRightPath = "M1074 560 L1086 572 V606 L1062 628";

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

type Card2Ids = {
  outerLine: string;
  softLine: string;
  sideLine: string;
  glowSoft: string;
  glowStrong: string;
  dotGlow: string;
  maskBlur: string;
  pointerGlowMask: string;
};

function HoverGlowPaths({ ids }: { ids: Card2Ids }) {
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
        filter={`url(#${ids.glowStrong})`}
        stroke="rgba(182, 244, 255, 0.9)"
        strokeLinecap="round"
        strokeWidth="2.8"
        x1="184"
        x2="1016"
        y1="648"
        y2="648"
      />
      <path
        d={sideBracketLeftPath}
        fill="none"
        filter={`url(#${ids.glowStrong})`}
        stroke="rgba(138, 236, 255, 0.9)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path
        d={sideBracketRightPath}
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
  ids: Card2Ids;
}) {
  return (
    <svg
      aria-hidden="true"
      className="card2-svg"
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
        fill="none"
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
        className="frame-line-accent frame-pulse frame-pulse--slow"
        filter={`url(#${ids.glowSoft})`}
        stroke="rgba(122, 226, 255, 0.82)"
        strokeWidth="2"
        x1="184"
        x2="1016"
        y1="648"
        y2="648"
      />

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
        d={sideBracketLeftPath}
        fill="none"
        filter={`url(#${ids.glowSoft})`}
        stroke="rgba(122, 226, 255, 0.8)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />

      <path
        className="frame-line-accent frame-pulse frame-pulse--fast"
        d={sideBracketRightPath}
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

type Card2Props = {
  className?: string;
  contentClassName?: string;
  children?: ReactNode;
};

export function Card2({ className, contentClassName, children }: Card2Props) {
  useInjectedStyle("noeticstech-card2-styles", cardStyles);

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
  const ids = useMemo<Card2Ids>(
    () => ({
      outerLine: `${prefix}-card2-outerLine`,
      softLine: `${prefix}-card2-softLine`,
      sideLine: `${prefix}-card2-sideLine`,
      glowSoft: `${prefix}-card2-glowSoft`,
      glowStrong: `${prefix}-card2-glowStrong`,
      dotGlow: `${prefix}-card2-dotGlow`,
      maskBlur: `${prefix}-card2-maskBlur`,
      pointerGlowMask: `${prefix}-card2-pointerGlowMask`,
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

  const applyMagnet = useCallback((clientX: number, clientY: number) => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const offsetX = (clientX - rect.left) / rect.width - 0.5;
    const offsetY = (clientY - rect.top) / rect.height - 0.5;

    targetRef.current.tx = offsetX * 14;
    targetRef.current.ty = offsetY * 14;
    targetRef.current.rx = offsetY * -4.2;
    targetRef.current.ry = offsetX * 4.2;
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      applyMagnet(event.clientX, event.clientY);
      applyHoverGlow(event.clientX, event.clientY);
      ensureAnimation();
    },
    [applyHoverGlow, applyMagnet, ensureAnimation],
  );

  const handlePointerLeave = useCallback(() => {
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
      className={cn("card2-frame", className)}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      <FrameSvg glowMaskRef={glowMaskRef} ids={ids} />
      {children ? (
        <div
          className={cn(
            "absolute left-[10.5%] top-[14.5%] z-[4] flex h-[64%] w-[79%]",
            contentClassName,
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
