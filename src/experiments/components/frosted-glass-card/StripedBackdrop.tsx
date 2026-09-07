import type { ReactNode } from "react";
import { FieldLayers } from "./FieldLayers";

// A loud, moving field for the glass to distort. The card floats centred over it.

interface StripedBackdropProps {
  /** Freezes the scrolling wave lines (from the controls toggle). */
  paused: boolean;
  children: ReactNode;
}

export function StripedBackdrop({ paused, children }: StripedBackdropProps) {
  return (
    <div className="relative isolate flex min-h-[28rem] items-center justify-center overflow-hidden rounded-card bg-[#1e1b4b]">
      <FieldLayers paused={paused} variant="stage" />
      {children}
    </div>
  );
}
