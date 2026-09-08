import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import "./styles.css";

// A single placeholder shape. Purely visual — `aria-hidden` so screen readers
// hear the container's loading label, not a run of empty boxes. The moving sweep
// lives in `styles.css` (`.skeleton`).

type Size = number | string;

interface SkeletonProps {
  /** Number → px, string → used as-is. Defaults to full width. */
  width?: Size;
  /** Number → px, string → used as-is. */
  height?: Size;
  /** Corner radius in px. Ignored when `circle`. */
  radius?: number;
  /** Render a circle (radius → 50%), e.g. an avatar. */
  circle?: boolean;
  className?: string;
}

const toCss = (value: Size | undefined): string | undefined =>
  typeof value === "number" ? `${value}px` : value;

export function Skeleton({
  width = "100%",
  height = "1rem",
  radius = 4,
  circle = false,
  className,
}: SkeletonProps) {
  const style: CSSProperties = {
    width: toCss(width),
    height: toCss(height),
    borderRadius: circle ? "50%" : `${radius}px`,
  };

  return <div aria-hidden="true" className={cn("skeleton", className)} style={style} />;
}
