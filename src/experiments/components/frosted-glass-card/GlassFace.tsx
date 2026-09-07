import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { FieldLayers } from "./FieldLayers";

// Shared shell for a card face. Back to front:
//   1. a blurred + displaced copy of the moving field (`.fg-field-blur`)
//   2. a faint white frost tint with a diagonal sheen (`.fg-face-tint`)
//   3. a dark scrim for text contrast (`.fg-face-scrim`)
//   4. the bevelled glass edge (`.fg-face-edge`) — above 1–3 so they don't wash it out
//   5. the face's own content
// All of it rotates with the card during the flip — the blur is a plain `filter`
// on layer 1, not `backdrop-filter`, so the 3D transform doesn't disable it.

interface GlassFaceProps {
  paused: boolean;
  /** Blur radius in px, from the slider. */
  blur: number;
  /** Layout classes for the content (flex direction, padding, text colour…). */
  className?: string;
  children: ReactNode;
}

export function GlassFace({ paused, blur, className, children }: GlassFaceProps) {
  const blurVar = { "--fg-blur": `${blur}px` } as CSSProperties;

  return (
    <div className={cn("fg-face absolute inset-0 overflow-hidden rounded-2xl", className)}>
      <div aria-hidden="true" style={blurVar} className="fg-field-blur absolute inset-0">
        <FieldLayers paused={paused} variant="glass" />
      </div>
      <span aria-hidden="true" className="fg-face-tint absolute inset-0" />
      <span aria-hidden="true" className="fg-face-scrim absolute inset-0" />
      <span aria-hidden="true" className="fg-face-edge pointer-events-none absolute inset-0" />
      {children}
    </div>
  );
}
