import { RangeControl } from "./RangeControl";

// Dev-time controls for iterating on the skeleton. NOT part of the piece — lives
// in `controls/` so it's left behind when the primitives are promoted.

const copy = {
  groupLabel: "Skeleton controls",
  radiusLabel: "Border radius",
  radiusValue: (px: number) => `${px}px`,
} as const;

export const RADIUS_MIN = 0;
export const RADIUS_MAX = 16;
export const RADIUS_STEP = 1;

interface SkeletonControlsProps {
  radius: number;
  onRadiusChange: (value: number) => void;
}

export function SkeletonControls({ radius, onRadiusChange }: SkeletonControlsProps) {
  return (
    <div role="group" aria-label={copy.groupLabel} className="flex flex-wrap items-end gap-x-8 gap-y-4">
      <RangeControl
        label={copy.radiusLabel}
        valueText={copy.radiusValue(radius)}
        value={radius}
        min={RADIUS_MIN}
        max={RADIUS_MAX}
        step={RADIUS_STEP}
        onChange={onRadiusChange}
      />
    </div>
  );
}
