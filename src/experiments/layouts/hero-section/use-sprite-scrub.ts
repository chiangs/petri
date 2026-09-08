import { useEffect, useRef, type RefObject } from "react";
import { drawSpriteFrame, sizeCanvasToFrame } from "./sprite-frame";

// Fixed feel for the cursor scrub — tuned once, not exposed as controls.
/** Per-frame easing of the displayed frame toward the cursor target (0–1). */
const TRACKING_SMOOTHING = 0.16;
/** Per-frame easing back to the idle pose once the pointer leaves the window (0–1). */
const RETURN_TO_IDLE_SPEED = 0.09;
/** How far the cursor sweeps the frame range about the canvas centre (1 = edge to edge).
 *  <1 leaves headroom so a cursor in the screen corner doesn't pin the extreme frame. */
const SCRUB_SENSITIVITY = 0.95;
/** Where the subject's chin sits in the *frame* (0 = top, 1 = bottom). The look-down
 *  (heroes that pass `panEndFrame`) starts when the pointer drops below where that
 *  point renders on the canvas — computed through `object-cover`, so it stays put
 *  as the hero box resizes. */
const SUBJECT_CHIN_FRACTION = 0.46;
/** Pointer travel below the chin, in px, over which the pan settles to its end frame
 *  (X-tracking fades out) before the head starts to tilt. */
const DIP_SETTLE_PX = 60;
/** Further pointer travel, in px, mapping the head-tilt from its start to the deepest
 *  look-down (the last frame). */
const DIP_DEPTH_PX = 150;
/** The look-down pose faces down-*left*, so it only engages when the cursor is at the
 *  subject's centre or to its left (`across` = leftness, 1 = far left). Full at
 *  ≥ DIP_ACROSS_FULL, off by DIP_ACROSS_MIN — to the right the subject keeps panning. */
const DIP_ACROSS_FULL = 0.48;
const DIP_ACROSS_MIN = 0.34;

interface SpriteScrubOptions {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  /** The loaded sprite sheet, or null while it is still decoding. */
  image: HTMLImageElement | null;
  frameCount: number;
  /** Frames per row in the sheet grid (frames run left-to-right, then top-to-bottom). */
  columns: number;
  frameWidth: number;
  frameHeight: number;
  /** Frame the character rests on when the pointer is away. */
  idleFrame: number;
  /** Optional: last frame of the pan. Frames after it (up to the last) are a head-tilt
   *  look-down scrubbed by pointer-Y once the pointer drops below the head. Omit for a
   *  plain horizontal pan across the whole sheet. */
  panEndFrame?: number;
  /** When true, frame 0 is the *rightward*-gaze pose (the pan sheet runs right→left), so
   *  pointer X is inverted to keep the subject looking toward the cursor. */
  panFromRight?: boolean;
  /** False when another behaviour drives this hero — the hook does nothing. */
  active: boolean;
  /** When false, the idle frame is drawn once with no pointer listeners or loop. */
  interactive: boolean;
}

/**
 * Drives a grid sprite-sheet `<canvas>` from cursor position: maps the pointer's
 * X against the canvas's horizontal span to a target frame, eases the displayed
 * frame toward it, and eases back to `idleFrame` when the pointer leaves the
 * window. The pointer is tracked on `window`, so the character keeps following
 * the cursor even when it's outside the image. If `panEndFrame` is given, the pan
 * runs `0`→`panEndFrame`; once the pointer drops below the subject's chin the pan
 * first settles to `panEndFrame` (X-tracking fades over `DIP_SETTLE_PX`), then the
 * target carries on into the head-tilt look-down (`panEndFrame`→last frame) over
 * `DIP_DEPTH_PX` more — but only with the cursor at the subject's centre or left
 * (`DIP_ACROSS_*`), since the pose faces down-left; to the right it keeps panning.
 * Above the chin, Y does nothing and the pan is untouched.
 * Only the nearest whole frame is ever drawn — no cross-fading between frames — so
 * there is no motion ghosting. rAF loop + listeners + observer are torn down on
 * cleanup (same shape as mobile-bottom-nav/use-nav-scroll.ts).
 *
 * `idleFrame` is read live through a ref so switching heroes doesn't restart the
 * loop; only a new sheet, `active`, or `interactive` re-runs the effect.
 */
export function useSpriteScrub(options: SpriteScrubOptions): void {
  const { canvasRef, image, active, interactive } = options;

  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  });

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingQuality = "high";

    const { frameWidth, frameHeight } = optionsRef.current;
    let frame = optionsRef.current.idleFrame;

    const draw = () => {
      const { frameCount, columns } = optionsRef.current;
      drawSpriteFrame({
        ctx,
        image,
        frameIndex: frame,
        frameCount,
        columns,
        frameWidth,
        frameHeight,
      });
    };

    sizeCanvasToFrame(canvas, frameWidth, frameHeight);
    const observer = new ResizeObserver(() => {
      sizeCanvasToFrame(canvas, frameWidth, frameHeight);
      draw();
    });
    observer.observe(canvas);

    if (!optionsRef.current.interactive) {
      draw();
      return () => observer.disconnect();
    }

    let pointerClientX: number | null = null; // last cursor position in the viewport; null once it leaves
    let pointerClientY = 0;
    let raf = 0;
    let last = 0;

    const onPointerMove = (event: PointerEvent) => {
      pointerClientX = event.clientX;
      pointerClientY = event.clientY;
    };
    const onPointerGone = () => {
      pointerClientX = null;
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 100) : 16.667;
      last = now;

      const { idleFrame, frameCount, panEndFrame, panFromRight } = optionsRef.current;
      const panCeil = panEndFrame ?? frameCount - 1;

      let target: number;
      let smoothing: number;
      if (pointerClientX === null) {
        target = idleFrame;
        smoothing = RETURN_TO_IDLE_SPEED;
      } else {
        const rect = canvas.getBoundingClientRect();
        const fromLeft = rect.width > 0 ? (pointerClientX - rect.left) / rect.width : 0.5;
        const across = panFromRight ? 1 - fromLeft : fromLeft;
        const swept = 0.5 + (across - 0.5) * SCRUB_SENSITIVITY;
        const panTarget = Math.min(1, Math.max(0, swept)) * panCeil;

        if (panEndFrame === undefined) {
          target = panTarget; // plain pan across the whole sheet
        } else {
          // Chin position on the canvas, through object-cover (matches how the
          // frame is actually painted, so it survives a hero-box resize).
          const scale = Math.max(rect.width / frameWidth, rect.height / frameHeight);
          const renderedHeight = frameHeight * scale;
          const chinY =
            rect.top + (rect.height - renderedHeight) / 2 + SUBJECT_CHIN_FRACTION * renderedHeight;
          const belowChin = pointerClientY - chinY;

          // Only look down when the cursor is at the subject's centre or left; to the
          // right, keep panning (the look-down pose faces down-left).
          const dipAllowed = Math.min(
            1,
            Math.max(0, (across - DIP_ACROSS_MIN) / (DIP_ACROSS_FULL - DIP_ACROSS_MIN)),
          );
          // settle: 0 above the chin → 1 by DIP_SETTLE_PX below it. Eases X-tracking
          // out and brings the pan to its end frame (the cat finishes turning forward).
          const settle = Math.min(1, Math.max(0, belowChin / DIP_SETTLE_PX)) * dipAllowed;
          // dip: begins once settled, 0 → 1 over DIP_DEPTH_PX more. Drives the head-tilt.
          const dip =
            Math.min(1, Math.max(0, (belowChin - DIP_SETTLE_PX) / DIP_DEPTH_PX)) * dipAllowed;

          const settled = panTarget + (panCeil - panTarget) * settle;
          target = settled + (frameCount - 1 - panCeil) * dip;
        }
        smoothing = TRACKING_SMOOTHING;
      }

      // Frame-rate-normalise the per-frame easing so the feel matches at 60/120Hz.
      const factor = 1 - Math.pow(1 - smoothing, dt / 16.667);
      frame += (target - frame) * factor;
      if (Math.abs(target - frame) < 0.01) frame = target;

      draw();
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerGone);
    window.addEventListener("blur", onPointerGone);
    raf = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerGone);
      window.removeEventListener("blur", onPointerGone);
      cancelAnimationFrame(raf);
    };
  }, [canvasRef, image, active, interactive]);
}
