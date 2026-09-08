import type { CSSProperties } from "react";

/** Which backdrop the stage is showing behind the inverting text. */
export type Mode = "swirl" | "image" | "manual" | "colour";

/** In `image` mode, which picture to show. */
export type ImageSource = "illustration" | "photo";

/** Baseline swirl loop length, in seconds, at 100% speed. */
const SWIRL_BASE_SECONDS = 18;

/** Convert a speed percentage (20–200) into an animation-duration string. */
export function swirlDuration(speed: number): string {
  return `${Math.round((SWIRL_BASE_SECONDS * 100) / speed)}s`;
}

/** The knobs that shape a backdrop; only some apply to any given mode. */
export interface BackdropOptions {
  /** `manual` mode: neutral grey from black (0) to white (100). */
  lightness: number;
  /** `swirl` mode: loop speed as a percentage of the baseline. */
  speed: number;
  /** `image` mode: drawn illustration vs. bundled photograph. */
  imageSource: ImageSource;
  /** `colour` mode: the chosen flat backdrop colour (any CSS colour string). */
  colour: string;
}

interface Background {
  /** Class applied to the backdrop layer (swirl animation, image bitmaps). */
  className?: string;
  /** Inline style for flat-colour backdrops and the swirl duration variable. */
  style?: CSSProperties;
}

/** Resolve the stage backdrop for the current mode and its options. */
export function resolveBackground(mode: Mode, options: BackdropOptions): Background {
  switch (mode) {
    case "swirl":
      return {
        className: "stage-bg--swirl",
        style: { "--swirl-duration": swirlDuration(options.speed) } as CSSProperties,
      };
    case "image":
      return {
        className: options.imageSource === "photo" ? "stage-bg--photo" : "stage-bg--image",
      };
    case "manual":
      return { style: { backgroundColor: `hsl(0 0% ${options.lightness}%)` } };
    case "colour":
      return { style: { backgroundColor: options.colour } };
  }
}
