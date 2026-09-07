import { cn } from "@/lib/cn";
import { resolveBackground, type BackdropOptions, type Mode } from "./modes";

interface StageBackgroundProps extends BackdropOptions {
  mode: Mode;
}

/**
 * The full-bleed backdrop layer inside the stage. Flat-colour modes snap quickly
 * via a short background-colour transition; `swirl` mode animates from CSS, its
 * loop length driven by the `--swirl-duration` custom property.
 */
export function StageBackground({ mode, ...options }: StageBackgroundProps) {
  const { className, style } = resolveBackground(mode, options);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 transition-[background-color] duration-200 ease-out",
        className,
      )}
      style={style}
    />
  );
}
