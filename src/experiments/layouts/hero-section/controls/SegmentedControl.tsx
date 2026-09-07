import { cn } from "@/lib/cn";

interface SegmentedControlProps<T extends string> {
  legend: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({
  legend,
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  const buttons = options.map((option) => {
    const selected = option.value === value;
    return (
      <button
        key={option.value}
        type="button"
        aria-pressed={selected}
        onClick={() => onChange(option.value)}
        className={cn(
          "rounded-control px-3 py-1.5 text-sm font-medium outline-none transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
          selected ? "bg-brand-500 text-white" : "text-muted hover:bg-brand-50 hover:text-brand-700",
        )}
      >
        {option.label}
      </button>
    );
  });

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide text-muted">{legend}</span>
      <div
        role="group"
        aria-label={legend}
        className="flex flex-wrap gap-1 rounded-control border border-border bg-surface p-1"
      >
        {buttons}
      </div>
    </div>
  );
}
