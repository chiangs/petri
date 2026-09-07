import { cn } from "@/lib/cn";

const copy = {
  label: (name: string) => `${name} — gradient stand-in until this hero gets its own animation`,
} as const;

interface HeroGradientProps {
  name: string;
  gradientClass: string;
}

/** Stand-in for a hero that isn't sprite-animated yet — mirrors the sprite canvas's box. */
export function HeroGradient({ name, gradientClass }: HeroGradientProps) {
  return (
    <div
      role="img"
      aria-label={copy.label(name)}
      className={cn(
        "flex h-full w-full items-center justify-center text-sm font-medium text-white/70",
        gradientClass,
      )}
    >
      {name}
    </div>
  );
}
