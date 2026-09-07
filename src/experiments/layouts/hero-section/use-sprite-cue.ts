import { useEffect, useRef, type RefObject } from "react";
import { drawSpriteFrame, sizeCanvasToFrame } from "./sprite-frame";

// Fixed feel for the "put the glasses on to read" cue — tuned once, not controls.
/** Grace for brief non-text moments between elements (nav link → nav link, heading → body). */
const GAP_MS = 240;
/** Human beat between the cursor settling on text and the glasses starting to go on. */
const REACTION_MS = 260;
/** Time the cursor must stay away from text before the glasses come back off. */
const RESET_MS = 1000;
/** Playback duration of the put-on gesture (frame 0 → last). */
const ON_MS = 720;
/** Playback duration of the take-off gesture (last → frame 0); a touch quicker. */
const OFF_MS = 600;

/** Tags whose rendered content reads as "text a person would put glasses on for". */
const TEXT_TAGS = new Set([
  "A",
  "BUTTON",
  "P",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "LI",
  "SPAN",
  "LABEL",
  "STRONG",
  "EM",
  "SMALL",
  "B",
  "I",
  "BLOCKQUOTE",
  "FIGCAPTION",
  "SUMMARY",
  "CODE",
]);

/** True when `el` (or a close ancestor) is a text element the reader would focus on. */
function isTextElement(el: Element | null): boolean {
  for (let depth = 0; el && depth < 4; depth += 1, el = el.parentElement) {
    if (el.closest("[data-hero-cue-ignore]")) return false;
    if (TEXT_TAGS.has(el.tagName) && (el.textContent ?? "").trim().length > 0) return true;
  }
  return false;
}

interface SpriteCueOptions {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  /** The loaded sprite sheet, or null while it is still decoding. */
  image: HTMLImageElement | null;
  /** Frames 0 → `frameCount - 1` run from "off" to the fully-on pose. */
  frameCount: number;
  columns: number;
  frameWidth: number;
  frameHeight: number;
  /** False when another behaviour drives this hero — the hook does nothing. */
  active: boolean;
  /** When false, frame 0 is drawn once with no listeners or loop. */
  interactive: boolean;
}

/**
 * Plays a sprite sheet forward (frame 0 → last) once the cursor settles on real
 * text, and back to frame 0 once it's been away from text for a beat — like a
 * person reaching for their reading glasses.
 *
 * "Over text" is tracked from element enter/leave (`mouseover` / `mouseout`), not
 * from sampling `pointermove`, so it stays correct while the cursor sits still on
 * text. A `REACTION_MS` delay before starting, a `GAP_MS` grace across element
 * boundaries, and a longer `RESET_MS` before reversing keep it from twitching as
 * the cursor moves along a sentence or between nav links. The rAF loop parks once
 * the pose is resting; any `mouseover` restarts it.
 */
export function useSpriteCue(options: SpriteCueOptions): void {
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
    let progress = 0; // 0 = glasses off, 1 = fully on
    let target = 0;
    let lastDrawnIndex = -1;

    const draw = () => {
      const { frameCount, columns } = optionsRef.current;
      const index = Math.round(progress * (frameCount - 1));
      if (index === lastDrawnIndex) return;
      lastDrawnIndex = index;
      drawSpriteFrame({ ctx, image, frameIndex: index, frameCount, columns, frameWidth, frameHeight });
    };

    sizeCanvasToFrame(canvas, frameWidth, frameHeight);
    draw(); // show frame 0 immediately, before any cursor activity
    const observer = new ResizeObserver(() => {
      sizeCanvasToFrame(canvas, frameWidth, frameHeight);
      lastDrawnIndex = -1; // the backing store was cleared — force a redraw
      draw();
    });
    observer.observe(canvas);

    if (!optionsRef.current.interactive) {
      return () => observer.disconnect();
    }

    let overTextEl = false; // is the currently-hovered element text? (mouseover/out)
    let lastTextAt = -Infinity; // performance.now() of the last frame we were over text
    let engagedSince: number | null = null;
    let leftTextAt: number | null = null;
    let raf = 0;
    let last = 0;
    let running = false;

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 100) : 16.667;
      last = now;

      if (overTextEl) lastTextAt = now; // keep fresh while genuinely hovering — survives an idle cursor
      const over = now - lastTextAt < GAP_MS;

      if (over) {
        leftTextAt = null;
        if (engagedSince === null) engagedSince = now;
        if (now - engagedSince >= REACTION_MS) target = 1;
      } else {
        engagedSince = null;
        if (leftTextAt === null) leftTextAt = now;
        if (now - leftTextAt >= RESET_MS) target = 0;
      }

      const step = dt / (target > progress ? ON_MS : OFF_MS);
      if (progress < target) progress = Math.min(target, progress + step);
      else if (progress > target) progress = Math.max(target, progress - step);

      draw();

      // Park the loop only in a genuinely settled state. `overTextEl` (not the
      // graced `over`) gates "resting on" so we keep ticking through the grace
      // window; `!over` gates "resting off" so the REACTION countdown can run.
      const restingOn = target === 1 && progress === 1 && overTextEl;
      const restingOff = target === 0 && progress === 0 && !over;
      if (restingOn || restingOff) {
        running = false;
        last = 0;
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    const ensureLoop = () => {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(tick);
    };

    const onMouseOver = (event: MouseEvent) => {
      const wasOverText = overTextEl;
      overTextEl = isTextElement(event.target as Element | null);
      if (overTextEl) lastTextAt = performance.now();
      // Nothing to animate if the glasses are off and we're moving non-text → non-text.
      if (overTextEl || wasOverText || progress > 0) ensureLoop();
    };
    const onMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget === null) {
        overTextEl = false; // cursor left the document
        ensureLoop();
      }
    };
    const onBlur = () => {
      overTextEl = false;
      ensureLoop();
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("blur", onBlur);

    return () => {
      observer.disconnect();
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("blur", onBlur);
      cancelAnimationFrame(raf);
    };
  }, [canvasRef, image, active, interactive]);
}
