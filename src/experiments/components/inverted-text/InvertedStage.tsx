import { StageBackground } from "./StageBackground";
import type { BackdropOptions, Mode } from "./modes";
import "./styles.css";

// All user-facing text this component renders.
const copy = {
  word: "INVERT",
  stageLabel: (mode: string) =>
    `The word “INVERTED” in large type, subtracting the colours of the ${mode} backdrop behind it.`,
} as const;

const MODE_LABEL: Record<Mode, string> = {
  swirl: "circling green, purple and blue",
  image: "monochrome scene with a vibrant subject at its centre",
  manual: "adjustable dark-to-light",
  colour: "a saturated flat colour",
};

interface InvertedStageProps extends BackdropOptions {
  mode: Mode;
}

export function InvertedStage({ mode, ...options }: InvertedStageProps) {
  return (
    <div
      role="img"
      aria-label={copy.stageLabel(MODE_LABEL[mode])}
      className="relative isolate flex h-[32rem] min-h-96 items-center justify-center overflow-hidden rounded-card border border-border bg-bg"
    >
      <StageBackground mode={mode} {...options} />
      <h1 className="invert-text relative px-6 text-center text-[clamp(2.5rem,15vw,11rem)] leading-none font-black tracking-tighter uppercase">
        {copy.word}
      </h1>
    </div>
  );
}
