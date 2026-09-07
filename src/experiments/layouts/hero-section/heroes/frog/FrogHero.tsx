import { SpriteHeroCanvas } from "../../SpriteHeroCanvas";
import { FROG_SPRITE } from "./frog-sprite";

interface FrogHeroProps {
  interactive: boolean;
  label: string;
}

/** The frog hero: its own sprite sheet + frame metadata handed to the shared engine. */
export function FrogHero({ interactive, label }: FrogHeroProps) {
  return (
    <SpriteHeroCanvas
      sheetUrl={FROG_SPRITE.sheetUrl}
      frameCount={FROG_SPRITE.frameCount}
      columns={FROG_SPRITE.columns}
      frameWidth={FROG_SPRITE.frameWidth}
      frameHeight={FROG_SPRITE.frameHeight}
      behavior="cursor-x"
      idleFrame={FROG_SPRITE.idleFrame}
      objectFit={FROG_SPRITE.objectFit}
      background={FROG_SPRITE.background}
      interactive={interactive}
      label={label}
    />
  );
}
