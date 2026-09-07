// Shared types + default content for the hero-section experiment.
// Non-component values live here so Fast Refresh keeps working (see docs/DESIGN.md).

export interface NavLinkData {
  id: string;
  label: string;
}

/**
 * One selectable hero image. Every hero is meant to become cursor-interactive the
 * same way — a `"sprite"` hero has its own subfolder under `heroes/` with a sprite
 * sheet and frame metadata; a `"gradient"` hero is a stand-in swatch until it gets
 * one.
 */
export interface HeroDef {
  id: string;
  label: string;
  kind: "sprite" | "gradient";
  /** Gradient heroes only — Tailwind gradient classes for the stand-in swatch. */
  gradientClass?: string;
}

export const DEFAULT_NAV_LINKS: NavLinkData[] = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const HEROES = [
  { id: "frog", label: "Frog", kind: "sprite" },
  { id: "cat", label: "Cat", kind: "sprite" },
  { id: "reader", label: "Reader", kind: "sprite" },
] as const satisfies readonly HeroDef[];

export type HeroId = (typeof HEROES)[number]["id"];

/** "full-bleed" — image touches the frame edges. "inset" — a spacing gap reveals the black backdrop. */
export type HeroImageLayout = "full-bleed" | "inset";

export const DEFAULT_HEADLINE = "Make it unforgettable.";
export const DEFAULT_SUBHEADING = "A short line of supporting copy goes here.";
export const DEFAULT_IMAGE_LAYOUT: HeroImageLayout = "full-bleed";

export const DEFAULT_INSET_SPACING_X = 24;
export const DEFAULT_INSET_SPACING_Y = 24;
export const INSET_SPACING_MIN = 0;
export const INSET_SPACING_MAX = 64;
export const INSET_SPACING_STEP = 4;

/** Swap an item with its neighbor in `direction`; no-ops past either end of the list. */
export function moveItem<T>(items: T[], index: number, direction: "up" | "down"): T[] {
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= items.length) return items;

  const next = [...items];
  [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
  return next;
}
