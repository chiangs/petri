import { cn } from "@/lib/cn";

interface RangeControlProps {
  /** Short visible label, e.g. "Dark → Light". */
  label: string;
  ariaLabel: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}

/** Labelled range slider used for both the lightness and swirl-speed controls. */
export function RangeControl({
  label,
  ariaLabel,
  value,
  min,
  max,
  step = 1,
  onChange,
}: RangeControlProps) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <span className="font-medium text-ink">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={ariaLabel}
        onChange={(event) => onChange(event.target.valueAsNumber)}
        className={cn(
          "h-1 w-40 cursor-pointer accent-brand-500",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600",
        )}
      />
    </label>
  );
}
