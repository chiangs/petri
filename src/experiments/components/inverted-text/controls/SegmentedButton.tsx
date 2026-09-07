import { cn } from "@/lib/cn";

interface SegmentedButtonProps {
  label: string;
  isActive: boolean;
  onSelect: () => void;
  /** `md` for the mode row, `sm` for the code-sample / image-source toggles. */
  size?: "sm" | "md";
}

const sizes = {
  sm: "h-8 px-3 text-xs font-semibold tracking-wide uppercase",
  md: "h-9 px-3 text-sm font-medium",
} as const;

/** A single button in a segmented / toggle group. The parent owns selection. */
export function SegmentedButton({ label, isActive, onSelect, size = "md" }: SegmentedButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onSelect}
      className={cn(
        "rounded-control transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
        sizes[size],
        isActive
          ? "bg-brand-500 text-bg hover:bg-brand-600"
          : "border border-border bg-surface text-ink hover:bg-brand-50 hover:text-brand-700",
      )}
    >
      {label}
    </button>
  );
}
