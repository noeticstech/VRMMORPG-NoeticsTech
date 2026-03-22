export type FrameTransitionConfig = {
  id: string;
  startSectionId: string;
  endSectionId: string;
  fadeOutSectionId?: string;
  frameDir: string;
  frameCount: number;
};

// Add future transitions here.
// - `startSectionId` and `endSectionId` define the scroll span that advances frames.
// - `fadeOutSectionId` lets a sequence gently disappear before the next content block.
export const frameTransitions: readonly FrameTransitionConfig[] = [
  {
    id: "landing-to-virtual",
    startSectionId: "hero",
    endSectionId: "projects",
    fadeOutSectionId: "about",
    frameDir: "/frames/landing-to-virtual",
    frameCount: 107,
  },
] as const;
