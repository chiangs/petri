import { cn } from "@/lib/cn";
import { RangeControl } from "./RangeControl";

// Dev-time controls for iterating on the glass settings. NOT part of the card —
// lives in `controls/` so it's left behind when `GlassCard` is promoted.

// All user-facing text for this file, in one place.
const copy = {
  groupLabel: "Glass controls",
  blurLabel: "Blur",
  scaleLabel: "Displacement scale",
  blurValue: (px: number) => `${px}px`,
  scaleValue: (n: number) => `${n}`,
  motionPlaying: "Pause motion",
  motionPaused: "Resume motion",
} as const;

const BLUR_MIN = 0;
const BLUR_MAX = 16;
const SCALE_MIN = 0;
const SCALE_MAX = 80;

interface GlassControlsProps {
  blur: number;
  scale: number;
  paused: boolean;
  onBlurChange: (value: number) => void;
  onScaleChange: (value: number) => void;
  onTogglePaused: () => void;
}

export function GlassControls({
  blur,
  scale,
  paused,
  onBlurChange,
  onScaleChange,
  onTogglePaused,
}: GlassControlsProps) {
  const motionLabel = paused ? copy.motionPaused : copy.motionPlaying;

  return (
    <div
      role="group"
      aria-label={copy.groupLabel}
      className="flex flex-wrap items-end gap-x-8 gap-y-4 rounded-card border border-border bg-surface p-4"
    >
      <RangeControl
        label={copy.blurLabel}
        valueText={copy.blurValue(blur)}
        value={blur}
        min={BLUR_MIN}
        max={BLUR_MAX}
        step={1}
        onChange={onBlurChange}
      />
      <RangeControl
        label={copy.scaleLabel}
        valueText={copy.scaleValue(scale)}
        value={scale}
        min={SCALE_MIN}
        max={SCALE_MAX}
        step={1}
        onChange={onScaleChange}
      />
      <button
        type="button"
        aria-pressed={paused}
        onClick={onTogglePaused}
        className={cn(
          "h-9 rounded-control border px-3 text-sm font-medium transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
          paused
            ? "border-brand-500 bg-brand-50 text-brand-700 hover:bg-surface"
            : "border-border bg-surface text-muted hover:bg-brand-50 hover:text-ink",
        )}
      >
        {motionLabel}
      </button>
    </div>
  );
}
