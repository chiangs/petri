import { cn } from "@/lib/cn";

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
  disabled?: boolean;
}

export function RangeControl({
  label,
  valueText,
  value,
  min,
  max,
  step,
  onChange,
  disabled = false,
}: RangeControlProps) {
  return (
    <label className={cn("flex flex-col gap-1 text-sm", disabled && "opacity-40")}>
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
        disabled={disabled}
        onChange={(event) => onChange(event.target.valueAsNumber)}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-not-allowed"
      />
    </label>
  );
}
