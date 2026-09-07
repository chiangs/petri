import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useSpriteCue } from "./use-sprite-cue";
import { useSpriteScrub } from "./use-sprite-scrub";

/** "cursor-x" scrubs frames by pointer position; "text-cue" plays on/off when the cursor hits text. */
export type SpriteBehavior = "cursor-x" | "text-cue";

interface SpriteHeroCanvasProps {
  /** Grid sprite sheet: `frameCount` frames of `frameWidth`×`frameHeight`, `columns` per row. */
  sheetUrl: string;
  frameCount: number;
  columns: number;
  frameWidth: number;
  frameHeight: number;
  behavior: SpriteBehavior;
  /** "cursor-x" only — the frame it rests on when the pointer is away. */
  idleFrame: number;
  /** How the frame fills the hero area. Tall figures use "contain" plus a `background`. */
  objectFit: "cover" | "contain";
  /** CSS background for the canvas element — shows through the "contain" letterbox. */
  background?: string;
  /** When false, renders the resting frame with no cursor interaction (reduced motion). */
  interactive: boolean;
  /** Describes the pictured subject for assistive tech. */
  label: string;
}

/**
 * Reusable engine: loads a grid sprite sheet and hands it to whichever behaviour
 * hook the hero asked for. Both hooks are always called (rules of hooks); the one
 * that isn't `active` does nothing. Per-hero folders only supply the sheet, its
 * frame metadata, and the behaviour — no per-hero animation code.
 */
export function SpriteHeroCanvas({
  sheetUrl,
  frameCount,
  columns,
  frameWidth,
  frameHeight,
  behavior,
  idleFrame,
  objectFit,
  background,
  interactive,
  label,
}: SpriteHeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    let active = true;
    const img = new Image();
    img.decoding = "async";
    img.src = sheetUrl;
    img.onload = () => {
      if (active) setImage(img);
    };
    return () => {
      active = false;
      setImage(null);
    };
  }, [sheetUrl]);

  const shared = { canvasRef, image, frameCount, columns, frameWidth, frameHeight, interactive };
  useSpriteScrub({ ...shared, idleFrame, active: behavior === "cursor-x" });
  useSpriteCue({ ...shared, active: behavior === "text-cue" });

  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover object-center";

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      style={{ background }}
      className={cn("h-full w-full", fitClass)}
    />
  );
}
