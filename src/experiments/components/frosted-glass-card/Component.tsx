import { useState } from "react";
import { GlassControls } from "./controls/GlassControls";
import { GlassCard } from "./GlassCard";
import { GlassFilter } from "./GlassFilter";
import { StripedBackdrop } from "./StripedBackdrop";
import hologramUrl from "./hologram.svg?url";
import "./styles.css";

// All user-facing text for this experiment, in one place.
const copy = {
  intro:
    "An SVG turbulence and displacement filter feeds backdrop-filter, so the moving field warps as it passes through the card. Drag the sliders and flip the card to judge how text and imagery read through the glass.",
  logoAlt: "Holographic card mark",
} as const;

// Self-contained mock card — no network, no backend.
const DEMO_CARD = {
  holder: "AVA RENTON",
  number: "4921 8890 0246 1357",
  expiry: "08 / 29",
  network: "AURORA",
} as const;

const BLUR_DEFAULT = 3;
const SCALE_DEFAULT = 24;

export default function Component() {
  const [blur, setBlur] = useState(BLUR_DEFAULT);
  const [scale, setScale] = useState(SCALE_DEFAULT);
  const [paused, setPaused] = useState(false);

  const togglePaused = () => setPaused((value) => !value);

  return (
    <div className="w-full space-y-6">
      <p className="max-w-2xl text-sm text-muted">{copy.intro}</p>

      <GlassControls
        blur={blur}
        scale={scale}
        paused={paused}
        onBlurChange={setBlur}
        onScaleChange={setScale}
        onTogglePaused={togglePaused}
      />

      <StripedBackdrop paused={paused}>
        <GlassCard
          holder={DEMO_CARD.holder}
          number={DEMO_CARD.number}
          expiry={DEMO_CARD.expiry}
          network={DEMO_CARD.network}
          logoSrc={hologramUrl}
          logoAlt={copy.logoAlt}
          blur={blur}
          paused={paused}
        />
      </StripedBackdrop>

      <GlassFilter scale={scale} />
    </div>
  );
}
