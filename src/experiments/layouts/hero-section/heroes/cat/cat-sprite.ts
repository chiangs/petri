import sheetUrl from "./cat-sprite.webp?url";

// Cat hero sprite sheet: 45 frames of a single left→right head turn, cut from a
// 24fps source clip with FFmpeg. The sub-range was chosen so the cat's gaze stays
// *up* across the whole turn (up-left → up-forward → up-right) — matching where a
// cursor over the nav or logo sits. Native frames only — interpolation softened
// the image and blending adjacent frames ghosted the ears mid-turn; 45 frames is
// enough that plain nearest-frame stepping isn't noticeable. Frames run
// monotonically left→right so cursor X maps straight onto the index. Each frame is
// 880×378 in a 9-column × 5-row grid (7920×1890), WebP q90 (~585 KB). See
// hero-section/README.md.
export const CAT_SPRITE = {
  sheetUrl,
  frameCount: 45,
  columns: 9,
  frameWidth: 880,
  frameHeight: 378,
  /** Forward-facing pose (middle of the turn) the cat eases back to on pointer leave. */
  idleFrame: 22,
  /** The frame is already wide; cover fills the hero cleanly with no letterbox. */
  objectFit: "cover",
} as const;
