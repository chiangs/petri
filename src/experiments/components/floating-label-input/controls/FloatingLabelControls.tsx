import type { InputType } from "../FloatingLabelInput";
import { RangeControl } from "./RangeControl";
import { SegmentedControl } from "./SegmentedControl";

// Dev-time controls for iterating on the floating-label input. NOT part of
// the piece — lives in `controls/` so it's left behind when the input is promoted.

const copy = {
  groupLabel: "Floating label input controls",
  typeLegend: "Input type",
  radiusLabel: "Border radius",
  radiusValue: (px: number) => `${px}px`,
} as const;

const TYPE_OPTIONS = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "password", label: "Password" },
] as const satisfies readonly { value: InputType; label: string }[];

const RADIUS_MIN = 0;
const RADIUS_MAX = 56;
const RADIUS_STEP = 4;

interface FloatingLabelControlsProps {
  inputType: InputType;
  radius: number;
  onInputTypeChange: (value: InputType) => void;
  onRadiusChange: (value: number) => void;
}

export function FloatingLabelControls({
  inputType,
  radius,
  onInputTypeChange,
  onRadiusChange,
}: FloatingLabelControlsProps) {
  return (
    <div
      role="group"
      aria-label={copy.groupLabel}
      className="flex flex-wrap items-end gap-x-8 gap-y-4"
    >
      <SegmentedControl
        legend={copy.typeLegend}
        options={TYPE_OPTIONS}
        value={inputType}
        onChange={onInputTypeChange}
      />
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
