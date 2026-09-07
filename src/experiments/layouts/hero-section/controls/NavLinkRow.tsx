import { cn } from "@/lib/cn";

const copy = {
  labelFor: (index: number) => `Nav link ${index + 1} label`,
  moveUp: "Move up",
  moveDown: "Move down",
} as const;

interface NavLinkRowProps {
  index: number;
  label: string;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onLabelChange: (value: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function NavLinkRow({
  index,
  label,
  canMoveUp,
  canMoveDown,
  onLabelChange,
  onMoveUp,
  onMoveDown,
}: NavLinkRowProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="flex-1">
        <span className="sr-only">{copy.labelFor(index)}</span>
        <input
          type="text"
          value={label}
          onChange={(event) => onLabelChange(event.target.value)}
          className="h-9 w-full rounded-control border border-border bg-surface px-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        />
      </label>
      <button
        type="button"
        aria-label={copy.moveUp}
        disabled={!canMoveUp}
        onClick={onMoveUp}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-control border border-border bg-surface text-muted transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
          canMoveUp ? "hover:bg-canvas hover:text-ink" : "cursor-not-allowed opacity-40",
        )}
      >
        <span aria-hidden="true">↑</span>
      </button>
      <button
        type="button"
        aria-label={copy.moveDown}
        disabled={!canMoveDown}
        onClick={onMoveDown}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-control border border-border bg-surface text-muted transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
          canMoveDown ? "hover:bg-canvas hover:text-ink" : "cursor-not-allowed opacity-40",
        )}
      >
        <span aria-hidden="true">↓</span>
      </button>
    </div>
  );
}
