import type { CSSProperties } from "react";

export const siteTheme = {
  colors: {
    background: "#030817",
    foreground: "#edf5ff",
    surface: "#08122d",
    panel: "#0d1a3d",
    line: "#203867",
    primary: "#4ecfff",
    secondary: "#8f6bff",
    accent: "#ff8d4d",
    muted: "#8ba5d7",
    success: "#4dffd1",
  },
  gradients: {
    hero:
      "radial-gradient(circle at top left, rgba(78, 207, 255, 0.22), transparent 38%), radial-gradient(circle at 85% 18%, rgba(143, 107, 255, 0.22), transparent 30%), linear-gradient(180deg, rgba(3, 8, 23, 0.2) 0%, rgba(3, 8, 23, 0.92) 82%)",
    aurora:
      "radial-gradient(circle at 20% 20%, rgba(78, 207, 255, 0.14), transparent 25%), radial-gradient(circle at 80% 0%, rgba(143, 107, 255, 0.16), transparent 30%), radial-gradient(circle at 50% 100%, rgba(255, 141, 77, 0.1), transparent 22%)",
    card:
      "linear-gradient(135deg, rgba(78, 207, 255, 0.16) 0%, rgba(13, 26, 61, 0.6) 36%, rgba(143, 107, 255, 0.16) 100%)",
    button:
      "linear-gradient(135deg, rgba(78, 207, 255, 1) 0%, rgba(120, 155, 255, 1) 38%, rgba(143, 107, 255, 1) 100%)",
  },
  glow: {
    primary: "0 0 40px rgba(78, 207, 255, 0.34)",
    secondary: "0 0 42px rgba(143, 107, 255, 0.28)",
    accent: "0 0 38px rgba(255, 141, 77, 0.22)",
    panel:
      "0 20px 80px rgba(3, 8, 23, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
  },
  spacing: {
    section: "clamp(5rem, 8vw, 8rem)",
    gutter: "clamp(1.25rem, 3vw, 2.5rem)",
  },
  animation: {
    fast: "220ms",
    base: "420ms",
    slow: "900ms",
  },
} as const;

const themeVariables = {
  "--theme-background": siteTheme.colors.background,
  "--theme-foreground": siteTheme.colors.foreground,
  "--theme-surface": siteTheme.colors.surface,
  "--theme-panel": siteTheme.colors.panel,
  "--theme-line": siteTheme.colors.line,
  "--theme-primary": siteTheme.colors.primary,
  "--theme-secondary": siteTheme.colors.secondary,
  "--theme-accent": siteTheme.colors.accent,
  "--theme-muted": siteTheme.colors.muted,
  "--theme-success": siteTheme.colors.success,
  "--gradient-hero": siteTheme.gradients.hero,
  "--gradient-aurora": siteTheme.gradients.aurora,
  "--gradient-card": siteTheme.gradients.card,
  "--gradient-button": siteTheme.gradients.button,
  "--shadow-neon": siteTheme.glow.primary,
  "--shadow-secondary": siteTheme.glow.secondary,
  "--shadow-accent": siteTheme.glow.accent,
  "--shadow-panel": siteTheme.glow.panel,
  "--space-section": siteTheme.spacing.section,
  "--space-gutter": siteTheme.spacing.gutter,
  "--motion-fast": siteTheme.animation.fast,
  "--motion-base": siteTheme.animation.base,
  "--motion-slow": siteTheme.animation.slow,
} satisfies Record<`--${string}`, string>;

export function getThemeStyle(): CSSProperties {
  return themeVariables as CSSProperties;
}
