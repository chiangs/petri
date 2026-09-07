import { SpriteHeroCanvas } from "../../SpriteHeroCanvas";
import { CAT_SPRITE } from "./cat-sprite";

interface CatHeroProps {
  interactive: boolean;
  label: string;
}

/** The cat hero: its own sprite sheet + frame metadata handed to the shared engine. */
export function CatHero({ interactive, label }: CatHeroProps) {
  return (
    <SpriteHeroCanvas
      sheetUrl={CAT_SPRITE.sheetUrl}
      frameCount={CAT_SPRITE.frameCount}
      columns={CAT_SPRITE.columns}
      frameWidth={CAT_SPRITE.frameWidth}
      frameHeight={CAT_SPRITE.frameHeight}
      behavior="cursor-x"
      idleFrame={CAT_SPRITE.idleFrame}
      objectFit={CAT_SPRITE.objectFit}
      interactive={interactive}
      label={label}
    />
  );
}
