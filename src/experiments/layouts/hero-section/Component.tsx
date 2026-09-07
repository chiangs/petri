import { useState } from 'react'
import { HeroControls } from './controls/HeroControls'
import { HeroSection } from './HeroSection'
import { useReducedMotion } from './use-reduced-motion'
import {
  DEFAULT_HEADLINE,
  DEFAULT_IMAGE_LAYOUT,
  DEFAULT_INSET_SPACING_X,
  DEFAULT_INSET_SPACING_Y,
  DEFAULT_NAV_LINKS,
  DEFAULT_SUBHEADING,
  HEROES,
  moveItem,
  type HeroDef,
  type HeroId,
  type HeroImageLayout,
  type NavLinkData,
} from './hero-data'

export default function Component() {
  const [navLinks, setNavLinks] = useState<NavLinkData[]>(DEFAULT_NAV_LINKS)
  const [heroId, setHeroId] = useState<HeroId>(HEROES[0].id)
  const [imageLayout, setImageLayout] = useState<HeroImageLayout>(DEFAULT_IMAGE_LAYOUT)
  const [insetSpacingX, setInsetSpacingX] = useState(DEFAULT_INSET_SPACING_X)
  const [insetSpacingY, setInsetSpacingY] = useState(DEFAULT_INSET_SPACING_Y)
  const [headline, setHeadline] = useState(DEFAULT_HEADLINE)
  const [subheading, setSubheading] = useState(DEFAULT_SUBHEADING)

  const reducedMotion = useReducedMotion()
  const activeHero: HeroDef = HEROES.find((hero) => hero.id === heroId) ?? HEROES[0]
  const heroInteractive = activeHero.kind === 'sprite' && !reducedMotion

  const handleNavLabelChange = (id: string, label: string) => {
    setNavLinks((links) => links.map((link) => (link.id === id ? { ...link, label } : link)))
  }

  const handleNavMoveUp = (id: string) => {
    setNavLinks((links) =>
      moveItem(
        links,
        links.findIndex((link) => link.id === id),
        'up',
      ),
    )
  }

  const handleNavMoveDown = (id: string) => {
    setNavLinks((links) =>
      moveItem(
        links,
        links.findIndex((link) => link.id === id),
        'down',
      ),
    )
  }

  return (
    <div className="w-full space-y-6">
      <HeroControls
        navLinks={navLinks}
        onNavLabelChange={handleNavLabelChange}
        onNavMoveUp={handleNavMoveUp}
        onNavMoveDown={handleNavMoveDown}
        heroId={heroId}
        onHeroChange={setHeroId}
        imageLayout={imageLayout}
        onImageLayoutChange={setImageLayout}
        insetSpacingX={insetSpacingX}
        onInsetSpacingXChange={setInsetSpacingX}
        insetSpacingY={insetSpacingY}
        onInsetSpacingYChange={setInsetSpacingY}
        headline={headline}
        subheading={subheading}
        onHeadlineChange={setHeadline}
        onSubheadingChange={setSubheading}
      />
      <HeroSection
        navLinks={navLinks}
        hero={activeHero}
        imageLayout={imageLayout}
        insetSpacingX={insetSpacingX}
        insetSpacingY={insetSpacingY}
        headline={headline}
        subheading={subheading}
        interactive={heroInteractive}
      />
    </div>
  )
}
