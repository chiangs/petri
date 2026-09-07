// Shared canvas helpers for the sprite-sheet hero engines (use-sprite-scrub,
// use-sprite-cue). Non-component code lives here so Fast Refresh keeps working.

/** Size a canvas's backing store to one frame at the device pixel ratio. */
export function sizeCanvasToFrame(
  canvas: HTMLCanvasElement,
  frameWidth: number,
  frameHeight: number,
): void {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(frameWidth * dpr);
  canvas.height = Math.round(frameHeight * dpr);
}

interface DrawFrameOptions {
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement;
  /** Frame to show; clamped to the sheet range. */
  frameIndex: number;
  frameCount: number;
  /** Frames per row in the sheet grid (frames run left-to-right, then top-to-bottom). */
  columns: number;
  frameWidth: number;
  frameHeight: number;
}

/** Blit one grid-sheet frame so it fills the whole canvas. */
export function drawSpriteFrame({
  ctx,
  image,
  frameIndex,
  frameCount,
  columns,
  frameWidth,
  frameHeight,
}: DrawFrameOptions): void {
  const index = Math.max(0, Math.min(frameCount - 1, Math.round(frameIndex)));
  const { canvas } = ctx;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    image,
    (index % columns) * frameWidth,
    Math.floor(index / columns) * frameHeight,
    frameWidth,
    frameHeight,
    0,
    0,
    canvas.width,
    canvas.height,
  );
}
