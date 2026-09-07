import type { HeroDef, HeroImageLayout, NavLinkData } from "./hero-data";
import { NavBar } from "./NavBar";
import { HeroVisual } from "./HeroVisual";
import { HeroText } from "./HeroText";

interface HeroSectionProps {
  navLinks: NavLinkData[];
  hero: HeroDef;
  imageLayout: HeroImageLayout;
  insetSpacingX: number;
  insetSpacingY: number;
  headline: string;
  subheading: string;
  interactive: boolean;
}

/** The piece: a black page frame holding the nav, the interactive hero image, and the hero text. */
export function HeroSection({
  navLinks,
  hero,
  imageLayout,
  insetSpacingX,
  insetSpacingY,
  headline,
  subheading,
  interactive,
}: HeroSectionProps) {
  return (
    <div className="flex min-h-[520px] flex-col overflow-hidden rounded-card border border-border bg-black sm:min-h-[620px]">
      <NavBar links={navLinks} />
      <HeroVisual
        hero={hero}
        layout={imageLayout}
        insetSpacingX={insetSpacingX}
        insetSpacingY={insetSpacingY}
        interactive={interactive}
      />
      <HeroText headline={headline} subheading={subheading} />
    </div>
  );
}
