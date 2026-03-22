"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FrameTransitionConfig } from "@/config/frameTransitions";

type TransitionState = {
  id: string;
  frameSrc: string;
  opacity: number;
};

type SectionTransitionBackgroundProps = {
  transitions: readonly FrameTransitionConfig[];
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function buildFrameSources(transitions: readonly FrameTransitionConfig[]) {
  return Object.fromEntries(
    transitions.map((transition) => [
      transition.id,
      Array.from({ length: transition.frameCount }, (_, index) => {
        const frameNumber = String(index + 1).padStart(3, "0");
        return `${transition.frameDir}/ezgif-frame-${frameNumber}.jpg`;
      }),
    ]),
  ) as Record<string, string[]>;
}

export function SectionTransitionBackground({
  transitions,
}: SectionTransitionBackgroundProps) {
  const transitionFrames = useMemo(
    () => buildFrameSources(transitions),
    [transitions],
  );
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageCacheRef = useRef<Record<string, HTMLImageElement>>({});
  const loadedSourcesRef = useRef<Set<string>>(new Set());
  const loadingSourcesRef = useRef<Set<string>>(new Set());
  const desiredStateRef = useRef<TransitionState | null>(null);
  const activeFrameRef = useRef<string | null>(null);
  const bootedRef = useRef(false);
  const [visibleState, setVisibleState] = useState<{
    id: string;
    opacity: number;
  } | null>(null);

  useEffect(() => {
    imageCacheRef.current = {};
    loadedSourcesRef.current = new Set();
    loadingSourcesRef.current = new Set();
    desiredStateRef.current = null;
    activeFrameRef.current = null;
    bootedRef.current = false;

    let frameHandle = 0;
    let bootHandle = 0;
    let bootHandleTwo = 0;
    let isDisposed = false;

    const drawFrame = (src: string) => {
      const canvas = canvasRef.current;
      const image = imageCacheRef.current[src];

      if (!canvas || !image || !loadedSourcesRef.current.has(src)) {
        return false;
      }

      const context = canvas.getContext("2d");

      if (!context) {
        return false;
      }

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (
        canvas.width !== Math.round(viewportWidth * dpr) ||
        canvas.height !== Math.round(viewportHeight * dpr)
      ) {
        canvas.width = Math.round(viewportWidth * dpr);
        canvas.height = Math.round(viewportHeight * dpr);
        canvas.style.width = `${viewportWidth}px`;
        canvas.style.height = `${viewportHeight}px`;
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, viewportWidth, viewportHeight);

      const scale = Math.max(
        viewportWidth / image.naturalWidth,
        viewportHeight / image.naturalHeight,
      );
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const offsetX = (viewportWidth - drawWidth) / 2;
      const offsetY = (viewportHeight - drawHeight) / 2;

      context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      activeFrameRef.current = src;

      return true;
    };

    const ensureFrameLoaded = (src: string, priority: "high" | "auto" = "auto") => {
      if (loadedSourcesRef.current.has(src) || loadingSourcesRef.current.has(src)) {
        return;
      }

      loadingSourcesRef.current.add(src);

      const image = new window.Image();
      image.decoding = "async";

      if ("fetchPriority" in image) {
        image.fetchPriority = priority;
      }

      image.onload = () => {
        if (isDisposed) {
          return;
        }

        imageCacheRef.current[src] = image;
        loadedSourcesRef.current.add(src);
        loadingSourcesRef.current.delete(src);

        if (desiredStateRef.current?.frameSrc === src) {
          drawFrame(src);

          setVisibleState({
            id: desiredStateRef.current.id,
            opacity: desiredStateRef.current.opacity,
          });
        }
      };

      image.onerror = () => {
        loadingSourcesRef.current.delete(src);
      };

      image.src = src;
    };

    const preloadNeighbors = (state: TransitionState | null) => {
      if (!state) {
        return;
      }

      const frames = transitionFrames[state.id];
      const currentIndex = frames.indexOf(state.frameSrc);

      if (currentIndex === -1) {
        return;
      }

      for (let offset = -2; offset <= 2; offset += 1) {
        const frameSrc = frames[currentIndex + offset];

        if (frameSrc) {
          ensureFrameLoaded(frameSrc, offset === 0 ? "high" : "auto");
        }
      }
    };

    const computeState = () => {
      const viewportHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      return (
        transitions
          .map((transition) => {
            const startElement = document.getElementById(transition.startSectionId);
            const endElement = document.getElementById(transition.endSectionId);
            const fadeOutElement = transition.fadeOutSectionId
              ? document.getElementById(transition.fadeOutSectionId)
              : null;

            if (!startElement || !endElement) {
              return null;
            }

            const frames = transitionFrames[transition.id];
            const startY = startElement.offsetTop;
            const endY = endElement.offsetTop;
            const sequenceProgress = clamp(
              (scrollTop - startY) / Math.max(endY - startY, 1),
              0,
              1,
            );
            const frameIndex = Math.round(sequenceProgress * (frames.length - 1));

            let opacity = scrollTop < startY - viewportHeight * 0.15 ? 0 : 1;

            if (fadeOutElement) {
              const fadeStart = fadeOutElement.offsetTop - viewportHeight * 0.42;
              const fadeEnd = fadeOutElement.offsetTop + viewportHeight * 0.12;

              opacity *=
                scrollTop <= fadeStart
                  ? 1
                  : 1 - clamp((scrollTop - fadeStart) / Math.max(fadeEnd - fadeStart, 1), 0, 1);
            }

            if (opacity <= 0.01) {
              return null;
            }

            return {
              id: transition.id,
              frameSrc: frames[frameIndex],
              opacity,
            } satisfies TransitionState;
          })
          .find(Boolean) ?? null
      );
    };

    const applyState = (nextState: TransitionState | null) => {
      desiredStateRef.current = nextState;
      preloadNeighbors(nextState);

      if (!nextState) {
        setVisibleState(null);
        return;
      }

      if (drawFrame(nextState.frameSrc)) {
        setVisibleState({
          id: nextState.id,
          opacity: nextState.opacity,
        });
        return;
      }

      ensureFrameLoaded(nextState.frameSrc, "high");
    };

    const updateState = () => {
      frameHandle = 0;

      if (!bootedRef.current) {
        return;
      }

      applyState(computeState());
    };

    const queueUpdate = () => {
      if (!frameHandle) {
        frameHandle = window.requestAnimationFrame(updateState);
      }
    };

    const primeFirstFrames = () => {
      Object.values(transitionFrames).forEach((sources) => {
        sources.slice(0, 6).forEach((src, index) => {
          ensureFrameLoaded(src, index < 2 ? "high" : "auto");
        });
      });
    };

    const boot = () => {
      bootHandle = window.requestAnimationFrame(() => {
        bootHandleTwo = window.requestAnimationFrame(() => {
          if (isDisposed) {
            return;
          }

          bootedRef.current = true;
          applyState(computeState());
        });
      });
    };

    primeFirstFrames();

    if (document.readyState === "complete") {
      boot();
    } else {
      window.addEventListener("load", boot, { once: true });
    }

    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      isDisposed = true;

      if (frameHandle) {
        window.cancelAnimationFrame(frameHandle);
      }

      if (bootHandle) {
        window.cancelAnimationFrame(bootHandle);
      }

      if (bootHandleTwo) {
        window.cancelAnimationFrame(bootHandleTwo);
      }

      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      window.removeEventListener("load", boot);
    };
  }, [transitionFrames, transitions]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ opacity: visibleState?.opacity ?? 0 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.12)_0%,rgba(2,6,23,0.22)_36%,rgba(2,6,23,0.38)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(114,182,255,0.08)_0%,transparent_58%)]" />
    </div>
  );
}
