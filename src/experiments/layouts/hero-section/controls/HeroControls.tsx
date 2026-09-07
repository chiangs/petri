import type { HeroId, HeroImageLayout, NavLinkData } from "../hero-data";
import { HeroLayoutControl } from "./HeroLayoutControl";
import { HeroSelectControl } from "./HeroSelectControl";
import { HeroTextControl } from "./HeroTextControl";
import { NavLinksControl } from "./NavLinksControl";

const copy = {
  groupLabel: "Hero controls",
} as const;

interface HeroControlsProps {
  navLinks: NavLinkData[];
  onNavLabelChange: (id: string, label: string) => void;
  onNavMoveUp: (id: string) => void;
  onNavMoveDown: (id: string) => void;
  heroId: HeroId;
  onHeroChange: (id: HeroId) => void;
  imageLayout: HeroImageLayout;
  onImageLayoutChange: (layout: HeroImageLayout) => void;
  insetSpacingX: number;
  onInsetSpacingXChange: (spacing: number) => void;
  insetSpacingY: number;
  onInsetSpacingYChange: (spacing: number) => void;
  headline: string;
  subheading: string;
  onHeadlineChange: (value: string) => void;
  onSubheadingChange: (value: string) => void;
}

export function HeroControls({
  navLinks,
  onNavLabelChange,
  onNavMoveUp,
  onNavMoveDown,
  heroId,
  onHeroChange,
  imageLayout,
  onImageLayoutChange,
  insetSpacingX,
  onInsetSpacingXChange,
  insetSpacingY,
  onInsetSpacingYChange,
  headline,
  subheading,
  onHeadlineChange,
  onSubheadingChange,
}: HeroControlsProps) {
  return (
    <div
      role="group"
      aria-label={copy.groupLabel}
      // Dev scaffolding — its label text shouldn't trigger the Reader hero's glasses cue.
      data-hero-cue-ignore
      className="grid grid-cols-1 gap-6 rounded-card border border-border bg-surface p-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
    >
      <HeroSelectControl value={heroId} onChange={onHeroChange} />
      <HeroLayoutControl
        layout={imageLayout}
        onLayoutChange={onImageLayoutChange}
        spacingX={insetSpacingX}
        onSpacingXChange={onInsetSpacingXChange}
        spacingY={insetSpacingY}
        onSpacingYChange={onInsetSpacingYChange}
      />
      <HeroTextControl
        headline={headline}
        subheading={subheading}
        onHeadlineChange={onHeadlineChange}
        onSubheadingChange={onSubheadingChange}
      />
      <NavLinksControl
        links={navLinks}
        onLabelChange={onNavLabelChange}
        onMoveUp={onNavMoveUp}
        onMoveDown={onNavMoveDown}
      />
    </div>
  );
}
