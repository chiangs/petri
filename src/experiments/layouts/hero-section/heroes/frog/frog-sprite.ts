import sheetUrl from "./frog-sprite.webp?url";

// Frog hero sprite sheet: 28 frames of a dance where the frog points screen-left
// (frame 0), raises both arms into a double peace sign (~frame 13), then points
// screen-right (frame 27) — so cursor X maps straight onto the index. Cut from the
// ~1.3–4.0s sub-range of a 1920×1080 24fps source clip with FFmpeg
// (`-ss 1.3 -t 2.8 -vf "crop=1600:1000:200:50,fps=10"`) and laid out with
// `magick montage -tile 7x4 -mode Concatenate`. Native crop resolution, no
// interpolation. Each frame is 1600×1000 in a 7-column × 4-row grid (11200×4000),
// WebP q90 (~1.7 MB). The frog is a tall standing figure, so the canvas uses
// `object-contain` with a matching orange background rather than cropping it.
export const FROG_SPRITE = {
  sheetUrl,
  frameCount: 28,
  columns: 7,
  frameWidth: 1600,
  frameHeight: 1000,
  /** Arms-up pose (middle of the sweep) the frog eases back to on pointer leave. */
  idleFrame: 13,
  objectFit: "contain",
  /** Matches the clip's vertical background gradient so the letterbox is seamless. */
  background: "linear-gradient(180deg, #ff640d, #ff820d)",
} as const;
