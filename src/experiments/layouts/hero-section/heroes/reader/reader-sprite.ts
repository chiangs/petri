import sheetUrl from "./reader-sprite.webp?url";

// Reader hero sprite sheet: 25 frames of a man putting reading glasses on, cut
// from the first ~2.2s of a 24fps source clip with FFmpeg. Frame 0 is the "no
// glasses" resting pose; the last frame is glasses on, hand adjusting the temple.
// Driven by the "text-cue" behaviour (use-sprite-cue.ts) — plays forward when the
// cursor settles on real text, back to frame 0 once it's been away for a beat.
// Each frame is 1024×640 in a 5-column × 5-row grid (5120×3200), WebP q84
// (~640 KB). The subject is a portrait, so the canvas uses `object-contain` with
// a dark background matching the clip's studio vignette. See hero-section/README.md.
export const READER_SPRITE = {
  sheetUrl,
  frameCount: 25,
  columns: 5,
  frameWidth: 1024,
  frameHeight: 640,
  objectFit: "contain",
  background: "radial-gradient(ellipse at center, #242322, #101010)",
} as const;
