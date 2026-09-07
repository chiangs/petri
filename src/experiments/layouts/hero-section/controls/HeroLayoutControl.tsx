import {
  INSET_SPACING_MAX,
  INSET_SPACING_MIN,
  INSET_SPACING_STEP,
  type HeroImageLayout,
} from "../hero-data";
import { RangeControl } from "./RangeControl";
import { SegmentedControl } from "./SegmentedControl";

const copy = {
  groupLabel: "Hero image layout",
  spacingXLabel: "Horizontal spacing",
  spacingYLabel: "Vertical spacing",
  spacingValue: (px: number) => `${px}px`,
  layoutOptions: {
    "full-bleed": "Full-bleed",
    inset: "Inset",
  } satisfies Record<HeroImageLayout, string>,
} as const;

const LAYOUT_OPTIONS = (["full-bleed", "inset"] as const satisfies readonly HeroImageLayout[]).map(
  (value) => ({ value, label: copy.layoutOptions[value] }),
);

interface HeroLayoutControlProps {
  layout: HeroImageLayout;
  onLayoutChange: (layout: HeroImageLayout) => void;
  spacingX: number;
  onSpacingXChange: (spacing: number) => void;
  spacingY: number;
  onSpacingYChange: (spacing: number) => void;
}

export function HeroLayoutControl({
  layout,
  onLayoutChange,
  spacingX,
  onSpacingXChange,
  spacingY,
  onSpacingYChange,
}: HeroLayoutControlProps) {
  const spacingDisabled = layout === "full-bleed";

  return (
    <div className="flex flex-col gap-3">
      <SegmentedControl
        legend={copy.groupLabel}
        options={LAYOUT_OPTIONS}
        value={layout}
        onChange={onLayoutChange}
      />
      <RangeControl
        label={copy.spacingXLabel}
        valueText={copy.spacingValue(spacingX)}
        value={spacingX}
        min={INSET_SPACING_MIN}
        max={INSET_SPACING_MAX}
        step={INSET_SPACING_STEP}
        onChange={onSpacingXChange}
        disabled={spacingDisabled}
      />
      <RangeControl
        label={copy.spacingYLabel}
        valueText={copy.spacingValue(spacingY)}
        value={spacingY}
        min={INSET_SPACING_MIN}
        max={INSET_SPACING_MAX}
        step={INSET_SPACING_STEP}
        onChange={onSpacingYChange}
        disabled={spacingDisabled}
      />
    </div>
  );
}
