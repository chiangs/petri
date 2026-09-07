import { GlassFace } from "./GlassFace";

// Front face of the glass card: chip, logo image, number, holder + expiry.

const copy = {
  holderLabel: "Card holder",
  expiryLabel: "Expires",
} as const;

interface CardFrontProps {
  holder: string;
  number: string;
  expiry: string;
  network: string;
  logoSrc: string;
  logoAlt: string;
  paused: boolean;
  blur: number;
}

export function CardFront({
  holder,
  number,
  expiry,
  network,
  logoSrc,
  logoAlt,
  paused,
  blur,
}: CardFrontProps) {
  return (
    <GlassFace paused={paused} blur={blur} className="flex flex-col justify-between p-5 text-white">
      <div className="relative flex items-start justify-between">
        <div
          aria-hidden="true"
          className="h-9 w-12 rounded-md bg-gradient-to-br from-amber-200 to-yellow-400 shadow-inner ring-1 ring-white/40"
        />
        <img src={logoSrc} alt={logoAlt} className="h-12 w-12 drop-shadow-md" />
      </div>

      <p className="relative font-mono text-xl tracking-[0.2em] drop-shadow-md">{number}</p>

      <div className="relative flex items-end justify-between gap-4 text-sm">
        <span className="flex flex-col gap-0.5">
          <span className="text-[0.625rem] tracking-widest text-white/70 uppercase">
            {copy.holderLabel}
          </span>
          <span className="font-medium drop-shadow-md">{holder}</span>
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-[0.625rem] tracking-widest text-white/70 uppercase">
            {copy.expiryLabel}
          </span>
          <span className="font-medium drop-shadow-md">{expiry}</span>
        </span>
        <span className="font-semibold tracking-wide drop-shadow-md">{network}</span>
      </div>
    </GlassFace>
  );
}
