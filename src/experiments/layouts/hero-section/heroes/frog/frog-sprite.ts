import sheetUrl from "./frog-sprite.webp?url";

// Frog hero sprite sheet: 25 frames of a dance where the frog points screen-left,
// raises both arms (centre), then points screen-right — cut from a 24fps source
// clip with FFmpeg and resampled so the frames run monotonically from "pointing
// left" (frame 0) through arms-up (~frame 12) to "pointing right" (frame 24), so
// cursor X maps straight onto the index. The frog is a tall standing figure, so
// the canvas uses `object-contain` with a matching orange background rather than
// cropping it. Each frame is 1024×534 in a 5-column × 5-row grid (5120×2670),
// WebP q90 (~660 KB). See hero-section/README.md.
export const FROG_SPRITE = {
  sheetUrl,
  frameCount: 25,
  columns: 5,
  frameWidth: 1024,
  frameHeight: 534,
  /** Arms-up pose (middle of the sweep) the frog eases back to on pointer leave. */
  idleFrame: 12,
  objectFit: "contain",
  /** Matches the clip's vertical background gradient so the letterbox is seamless. */
  background: "linear-gradient(180deg, #ff640d, #ff820d)",
} as const;
