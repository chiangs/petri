// The SVG <filter> that `.fg-field-blur` references via `filter: url(#…)`.
// Rendered once per route as a zero-size, aria-hidden <svg> so it adds no layout.

/** Shared with `styles.css` (`.fg-field-blur { filter: … url(#fg-glass-displace) }`). */
export const FILTER_ID = "fg-glass-displace";

interface GlassFilterProps {
  /** `feDisplacementMap` scale — how hard the turbulence ripples the frosted field. */
  scale: number;
}

export function GlassFilter({ scale }: GlassFilterProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
    >
      <filter id={FILTER_ID} x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.012 0.016"
          numOctaves={2}
          seed={7}
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale={scale}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
