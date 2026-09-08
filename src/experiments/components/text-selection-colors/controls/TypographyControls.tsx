// Dev-only controls for tuning the demo text. Scaffolding — left behind on promotion.

const copy = {
  groupLabel: "Typography controls",
  fontSize: "Font size",
  lineHeight: "Line height",
  px: (n: number) => `${n}px`,
  ratio: (n: number) => n.toFixed(2),
} as const;

export interface TypographyControlsProps {
  fontSize: number;
  lineHeight: number;
  onFontSizeChange: (value: number) => void;
  onLineHeightChange: (value: number) => void;
}

const rangeClass =
  "h-2 w-56 cursor-pointer appearance-none rounded-full bg-border accent-brand-500 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600";

export function TypographyControls({
  fontSize,
  lineHeight,
  onFontSizeChange,
  onLineHeightChange,
}: TypographyControlsProps) {
  return (
    <div
      role="group"
      aria-label={copy.groupLabel}
      className="flex flex-wrap items-end gap-x-8 gap-y-4"
    >
      <label className="flex flex-col gap-1 text-sm">
        <span className="flex items-baseline justify-between gap-4 font-medium text-ink">
          {copy.fontSize}
          <span className="tabular-nums text-muted">{copy.px(fontSize)}</span>
        </span>
        <input
          type="range"
          min={16}
          max={32}
          step={1}
          value={fontSize}
          onChange={(event) => onFontSizeChange(Number(event.target.value))}
          className={rangeClass}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="flex items-baseline justify-between gap-4 font-medium text-ink">
          {copy.lineHeight}
          <span className="tabular-nums text-muted">{copy.ratio(lineHeight)}</span>
        </span>
        <input
          type="range"
          min={1.3}
          max={2}
          step={0.05}
          value={lineHeight}
          onChange={(event) => onLineHeightChange(Number(event.target.value))}
          className={rangeClass}
        />
      </label>
    </div>
  );
}
