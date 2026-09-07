import { cn } from "@/lib/cn";

interface ColourSwatchProps {
  /** Proper colour name, used as the button's accessible label. */
  name: string;
  value: string;
  isActive: boolean;
  onSelect: (value: string) => void;
}

/** One circular colour chip in the backdrop-colour group. */
export function ColourSwatch({ name, value, isActive, onSelect }: ColourSwatchProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-label={name}
      onClick={() => onSelect(value)}
      style={{ backgroundColor: value }}
      className={cn(
        "size-7 rounded-full border border-black/10 transition-transform",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
        isActive ? "ring-2 ring-ink ring-offset-2" : "hover:scale-110",
      )}
    />
  );
}
