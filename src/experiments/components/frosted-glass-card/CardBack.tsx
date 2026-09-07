import { GlassFace } from "./GlassFace";

// Back face of the glass card: magnetic stripe, signature strip, CVV, network.

const copy = {
  cvvLabel: "CVV",
  cvvValue: "•••",
  signatureHint: "Authorised signature",
} as const;

interface CardBackProps {
  holder: string;
  network: string;
  paused: boolean;
  blur: number;
}

export function CardBack({ holder, network, paused, blur }: CardBackProps) {
  return (
    <GlassFace paused={paused} blur={blur} className="flex flex-col gap-4 py-5 text-white">
      {/* Magnetic stripe */}
      <div aria-hidden="true" className="relative mt-2 h-11 w-full bg-black/70" />

      <div className="relative flex items-center gap-3 px-5">
        <div className="flex h-8 flex-1 items-center rounded-sm bg-white/85 px-3 font-mono text-sm text-ink italic">
          {holder}
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[0.625rem] tracking-widest text-white/70 uppercase">
            {copy.cvvLabel}
          </span>
          <span className="font-mono text-sm tracking-widest drop-shadow-md">
            {copy.cvvValue}
          </span>
        </div>
      </div>

      <div className="relative flex items-end justify-between px-5 text-sm">
        <span className="text-[0.625rem] tracking-widest text-white/70 uppercase">
          {copy.signatureHint}
        </span>
        <span className="font-semibold tracking-wide drop-shadow-md">{network}</span>
      </div>
    </GlassFace>
  );
}
