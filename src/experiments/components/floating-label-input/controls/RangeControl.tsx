// One labelled slider in the controls row.

interface RangeControlProps {
  label: string;
  /** Value rendered next to the label, already formatted (e.g. "24px"). */
  valueText: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

export function RangeControl({
  label,
  valueText,
  value,
  min,
  max,
  step,
  onChange,
}: RangeControlProps) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="flex items-baseline justify-between gap-4 font-medium text-ink">
        {label}
        <span className="tabular-nums text-muted">{valueText}</span>
      </span>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(event.target.valueAsNumber)}
        className="h-2 w-56 cursor-pointer appearance-none rounded-full bg-border accent-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      />
    </label>
  );
}
