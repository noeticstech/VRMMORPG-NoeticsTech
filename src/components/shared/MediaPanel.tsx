import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type MediaPanelProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  children?: ReactNode;
};

export function MediaPanel({
  src,
  alt,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
  imageClassName,
  overlayClassName,
  children,
}: MediaPanelProps) {
  return (
    <div className={cn("section-frame rounded-[32px] p-3", className)}>
      <div className="scan-line relative isolate min-h-[320px] overflow-hidden rounded-[24px]">
        <Image
          fill
          alt={alt}
          className={cn("object-cover", imageClassName)}
          priority={priority}
          sizes={sizes}
          src={src}
        />
        <div
          className={cn(
            "absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,23,0.05)_0%,rgba(3,8,23,0.48)_48%,rgba(3,8,23,0.84)_100%)]",
            overlayClassName,
          )}
        />
        {children}
      </div>
    </div>
  );
}
