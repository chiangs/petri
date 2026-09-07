import type { ComponentType, CSSProperties, ReactNode } from "react";
import type { HeroDef, HeroImageLayout } from "./hero-data";
import { CatHero } from "./heroes/cat/CatHero";
import { FrogHero } from "./heroes/frog/FrogHero";
import { ReaderHero } from "./heroes/reader/ReaderHero";
import { HeroGradient } from "./HeroGradient";

const copy = {
  catLabel: "Animated black cat that turns to follow your cursor",
  frogLabel: "Animated frog that points wherever your cursor goes",
  readerLabel: "Man who puts on reading glasses when the cursor is over text",
} as const;

interface SpriteHeroProps {
  interactive: boolean;
  label: string;
}

/** Which component + accessible label drives each `"sprite"` hero id. */
const SPRITE_HEROES: Record<string, { Component: ComponentType<SpriteHeroProps>; label: string }> =
  {
    cat: { Component: CatHero, label: copy.catLabel },
    frog: { Component: FrogHero, label: copy.frogLabel },
    reader: { Component: ReaderHero, label: copy.readerLabel },
  };

interface HeroVisualProps {
  hero: HeroDef;
  layout: HeroImageLayout;
  /** Gap (px) revealing the black backdrop on left/right, only when `layout` is "inset". */
  insetSpacingX: number;
  /** Gap (px) revealing the black backdrop on top/bottom, only when `layout` is "inset". */
  insetSpacingY: number;
  /** False under reduced motion or for a hero with no sprite sheet. */
  interactive: boolean;
}

/** Fills the frame between the nav and the hero text with the active hero's visual. */
export function HeroVisual({
  hero,
  layout,
  insetSpacingX,
  insetSpacingY,
  interactive,
}: HeroVisualProps) {
  const style: CSSProperties | undefined =
    layout === "inset"
      ? {
          marginLeft: insetSpacingX,
          marginRight: insetSpacingX,
          marginTop: insetSpacingY,
          marginBottom: insetSpacingY,
        }
      : undefined;

  const spriteHero = hero.kind === "sprite" ? SPRITE_HEROES[hero.id] : undefined;

  let visual: ReactNode;
  if (spriteHero) {
    const SpriteHero = spriteHero.Component;
    visual = <SpriteHero interactive={interactive} label={spriteHero.label} />;
  } else {
    visual = <HeroGradient name={hero.label} gradientClass={hero.gradientClass ?? ""} />;
  }

  return (
    <div style={style} className="flex flex-1 overflow-hidden">
      {visual}
    </div>
  );
}
