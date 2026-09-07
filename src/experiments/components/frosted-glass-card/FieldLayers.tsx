import type { CSSProperties } from "react";

// The loud moving field: a fixed vivid gradient + a scrolling layer of curvy
// diagonal white lines.
//
// Rendered full-size behind the card (`variant="stage"`) AND again inside each
// glass face (`variant="glass"`) where a `filter` blurs + displaces it. That copy
// is why the frost can rotate with the card at all: `backdrop-filter` is disabled
// by a 3D-transformed ancestor, but a plain `filter` on a duplicate is not.
//
// The card is centred in the stage, so the glass copy is sized to the stage and
// re-centred on the card — the gradient and the line tile then line up with what's
// actually behind the card (they drift a little on very narrow viewports, where
// the real stage is < STAGE_W; heavily blurred, so it reads fine).

// Deliberately literal: a fixed vivid field with no token equivalent. Showcase-only.
const colorField: CSSProperties = {
  backgroundColor: "#1e1b4b",
  backgroundImage: [
    "radial-gradient(60% 80% at 15% 20%, #f472b6 0%, transparent 60%)",
    "radial-gradient(50% 70% at 85% 15%, #38bdf8 0%, transparent 55%)",
    "radial-gradient(70% 60% at 75% 90%, #fbbf24 0%, transparent 55%)",
    "radial-gradient(60% 70% at 25% 85%, #34d399 0%, transparent 55%)",
    "conic-gradient(from 200deg at 50% 50%, #6366f1, #8b5cf6, #ec4899, #6366f1)",
  ].join(","),
};

// Nominal stage box: `max-w-6xl` (72rem) minus the page's `px-6` (3rem), and the
// stage's `min-h-[28rem]`. Keep in sync with Experiment's <main> and StripedBackdrop.
const STAGE_W = "69rem";
const STAGE_H = "28rem";

interface FieldLayersProps {
  /** Freezes the scrolling wave lines (from the controls toggle). */
  paused: boolean;
  variant: "stage" | "glass";
}

export function FieldLayers({ paused, variant }: FieldLayersProps) {
  const layers = (
    <>
      <div aria-hidden="true" className="absolute inset-0" style={colorField} />
      <div
        aria-hidden="true"
        data-paused={paused}
        className="fg-lines pointer-events-none absolute -inset-1/2 -rotate-[18deg]"
      />
    </>
  );

  if (variant === "stage") return layers;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: STAGE_W, height: STAGE_H }}
    >
      {layers}
    </div>
  );
}
