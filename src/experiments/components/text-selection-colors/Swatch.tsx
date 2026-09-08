import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import type { HighlightColor } from "./palette";

export interface SwatchProps {
  color: HighlightColor;
  isActive: boolean;
  onSelect: () => void;
}

const base =
  "size-8 rounded-full border border-border transition-transform " +
  "hover:scale-105 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600";

const activeRing = "ring-2 ring-ink ring-offset-2";

export function Swatch({ color, isActive, onSelect }: SwatchProps) {
  const style: CSSProperties = { backgroundColor: color.value };

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      aria-label={color.name}
      style={style}
      className={cn(base, isActive && activeRing)}
    />
  );
}
