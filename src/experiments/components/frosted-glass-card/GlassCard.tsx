import { useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { CardBack } from "./CardBack";
import { CardFront } from "./CardFront";

// All user-facing text for this file, in one place.
const copy = {
  ariaLabel: "Payment card — activate to flip between the front and back",
  showingFront: "Showing front",
  showingBack: "Showing back",
} as const;

export interface GlassCardProps {
  holder: string;
  number: string;
  expiry: string;
  network: string;
  logoSrc: string;
  logoAlt: string;
  /** Blur radius in px for the frosted field, from the slider. */
  blur: number;
  /** Freezes the moving field (from the pause toggle). */
  paused: boolean;
}

const FACE_CLASS =
  "absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";

const FLIP_MS = 600;

const CARD_SHADOW =
  "shadow-[0_2px_6px_-2px_rgba(0,0,0,0.45),0_18px_50px_-12px_rgba(0,0,0,0.55)]";
const CARD_SHADOW_HOVER =
  "group-hover:shadow-[0_4px_10px_-2px_rgba(0,0,0,0.5),0_28px_65px_-14px_rgba(0,0,0,0.65)]";

export function GlassCard({
  holder,
  number,
  expiry,
  network,
  logoSrc,
  logoAlt,
  blur,
  paused,
}: GlassCardProps) {
  const [flipped, setFlipped] = useState(false);

  // The shadow rides on the rotating element, not the button — otherwise it stays
  // full-size and you see a card-shaped ghost where the card was before the flip.
  const spinStyle: CSSProperties = {
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
    transitionProperty: "transform, box-shadow",
    transitionDuration: `${FLIP_MS}ms, 200ms`,
    transitionTimingFunction: "ease-in-out",
  };
  const stateText = flipped ? copy.showingBack : copy.showingFront;

  return (
    <button
      type="button"
      aria-label={copy.ariaLabel}
      aria-pressed={flipped}
      onClick={() => setFlipped((value) => !value)}
      className={cn(
        "group relative block aspect-[1.586] w-[22rem] max-w-full rounded-2xl [perspective:1200px]",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
      )}
    >
      <span
        style={spinStyle}
        className={cn(
          "absolute inset-0 rounded-2xl [transform-style:preserve-3d]",
          CARD_SHADOW,
          CARD_SHADOW_HOVER,
        )}
      >
        <span className={cn(FACE_CLASS, "[transform:rotateY(0deg)]")}>
          <CardFront
            holder={holder}
            number={number}
            expiry={expiry}
            network={network}
            logoSrc={logoSrc}
            logoAlt={logoAlt}
            paused={paused}
            blur={blur}
          />
        </span>
        <span className={cn(FACE_CLASS, "[transform:rotateY(180deg)]")}>
          <CardBack holder={holder} network={network} paused={paused} blur={blur} />
        </span>
      </span>

      <span className="sr-only">{stateText}</span>
    </button>
  );
}
