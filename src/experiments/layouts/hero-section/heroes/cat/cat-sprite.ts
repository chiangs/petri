import sheetUrl from "./cat-sprite-hires.webp?url";

// Cat hero sprite sheet (hi-res): 45 native frames from the first ~1.88s of a
// 1920×1080 24fps source clip (hf_20260906_112543…mp4) with FFmpeg
// (`-t 1.88 -vf "fps=24"`, no reversal — the clip already runs the right way) laid
// out with `magick montage -tile 5x9 -mode Concatenate`. No interpolation. Each
// frame is 1920×1080 in a 5-column × 9-row grid (9600×9720), WebP q90 (~1.9 MB).
// The previous 880×378 sheet is kept alongside as cat-sprite.webp; swap the import
// above back to revert.
//
// Frames read: 0 = gaze screen-*right* (held up) → `panEndFrame` (21) = gaze
// screen-left (still up) — that's the horizontal pan, so `panFromRight` inverts
// pointer X — then 21→44 the head tilts down into a curious look-down (last frame ≈
// the deepest peer, just before the clip turns the body away). use-sprite-scrub
// maps pointer-X onto 0→21; when the pointer drops below the cat's chin it settles
// the pan to frame 21 and then carries the target on through 21→44 by how far below.
//
// Browser note (see hero-section/README.md): 9600×9720 decodes to ~93 MP — well
// over the ~16 MP single-image ceiling older iOS Safari applied (though under the
// 16383px WebP dimension cap on both axes). Fine on current desktop
// Chrome/Firefox/Safari; a mobile-facing version would need smaller frames.
export const CAT_SPRITE = {
  sheetUrl,
  frameCount: 45,
  columns: 5,
  frameWidth: 1920,
  frameHeight: 1080,
  /** Last frame of the gaze pan; frames after it (→ 44) are the pointer-below look-down. */
  panEndFrame: 21,
  /** The pan sheet runs right→left (frame 0 = rightward gaze), so pointer X is inverted. */
  panFromRight: true,
  /** Eyes-centred, gaze-up pose (mid-pan) the cat eases back to on pointer leave. */
  idleFrame: 10,
  /** The frame is already wide; cover fills the hero cleanly with no letterbox. */
  objectFit: "cover",
} as const;
