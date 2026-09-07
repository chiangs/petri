import { SpriteHeroCanvas } from "../../SpriteHeroCanvas";
import { READER_SPRITE } from "./reader-sprite";

interface ReaderHeroProps {
  interactive: boolean;
  label: string;
}

/** The reader hero: puts glasses on when the cursor is over text (text-cue behaviour). */
export function ReaderHero({ interactive, label }: ReaderHeroProps) {
  return (
    <SpriteHeroCanvas
      sheetUrl={READER_SPRITE.sheetUrl}
      frameCount={READER_SPRITE.frameCount}
      columns={READER_SPRITE.columns}
      frameWidth={READER_SPRITE.frameWidth}
      frameHeight={READER_SPRITE.frameHeight}
      behavior="text-cue"
      idleFrame={0}
      objectFit={READER_SPRITE.objectFit}
      background={READER_SPRITE.background}
      interactive={interactive}
      label={label}
    />
  );
}
