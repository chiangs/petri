import type { HighlightColor } from "./palette";
import { Swatch } from "./Swatch";

// All user-facing text for this component, in one place.
const copy = {
  groupLabel: "Highlight colour",
  customLabel: "Custom colour",
} as const;

export interface SwatchPickerProps {
  colors: HighlightColor[];
  value: string;
  onChange: (hex: string) => void;
}

export function SwatchPicker({ colors, value, onChange }: SwatchPickerProps) {
  const swatches = colors.map((color) => (
    <Swatch
      key={color.value}
      color={color}
      isActive={color.value.toLowerCase() === value.toLowerCase()}
      onSelect={() => onChange(color.value)}
    />
  ));

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2" role="group" aria-label={copy.groupLabel}>
        {swatches}
      </div>

      <label className="flex items-center gap-2 text-sm text-muted">
        {copy.customLabel}
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="size-8 cursor-pointer rounded-control border border-border bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        />
      </label>
    </div>
  );
}
