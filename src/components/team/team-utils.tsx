"use client";

import {
  BookOpen,
  Code2,
  Cog,
  Globe2,
  PencilRuler,
  PenTool,
  type LucideIcon,
} from "lucide-react";
import type { TeamProfileIcon } from "@/config/sections";

export const teamIcons: Record<TeamProfileIcon, LucideIcon> = {
  code: Code2,
  pen: PenTool,
  cog: Cog,
  palette: PencilRuler,
  book: BookOpen,
  boxes: Globe2,
};

export function withAlpha(hexColor: string, alpha: number) {
  const normalized = hexColor.replace("#", "");

  if (normalized.length !== 6) {
    return hexColor;
  }

  const parsed = Number.parseInt(normalized, 16);
  const r = (parsed >> 16) & 255;
  const g = (parsed >> 8) & 255;
  const b = parsed & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
