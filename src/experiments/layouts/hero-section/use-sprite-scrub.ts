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
 * the cursor even when it's outside the image. Only the nearest whole frame is
 * ever drawn — no blending between frames — so there is no motion ghosting. rAF
 * loop + listeners + observer are torn down on cleanup (same shape as
 * mobile-bottom-nav/use-nav-scroll.ts).
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

    let pointerClientX: number | null = null; // last cursor X in the viewport; null once it leaves
    let raf = 0;
    let last = 0;

    const onPointerMove = (event: PointerEvent) => {
      pointerClientX = event.clientX;
    };
    const onPointerGone = () => {
      pointerClientX = null;
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 100) : 16.667;
      last = now;

      const { idleFrame, frameCount } = optionsRef.current;

      let target: number;
      let smoothing: number;
      if (pointerClientX === null) {
        target = idleFrame;
        smoothing = RETURN_TO_IDLE_SPEED;
      } else {
        const rect = canvas.getBoundingClientRect();
        const across = rect.width > 0 ? (pointerClientX - rect.left) / rect.width : 0.5;
        const swept = 0.5 + (across - 0.5) * SCRUB_SENSITIVITY;
        target = Math.min(1, Math.max(0, swept)) * (frameCount - 1);
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
