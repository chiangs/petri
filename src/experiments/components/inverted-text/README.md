# inverted-text

Explores CSS `mix-blend-mode: difference` as a display-type treatment: the word **INVERTED**
is filled white and subtracts whatever colour sits behind it, so it reads white on dark, black
on light, and shifts hue over saturated colours.

## Layout

The promotable piece lives at the top level: `InvertedStage.tsx` + `StageBackground.tsx` +
`modes.ts` + `styles.css` + `subject.svg` + `photo.jpg` (the stage renders the word over a
mode-driven backdrop; `InvertedStage` imports its own CSS). Everything that only exists to *drive*
the demo — the mode / speed / lightness / image-source / colour controls and the "essentials" code
viewer — lives in `controls/` and is not part of a promotion.

## Controls

Four mode buttons plus one contextual control that swaps with the mode:

- **Swirl** (default / "controls off") — two oversized, heavily-blurred layers of green / purple
  / blue radial blobs, `screen`-blended so they bleed into each other. The layers counter-rotate
  and breathe out of phase, so the shape keeps morphing while still circling behind the text.
  The slider becomes a **Slow → Fast** speed control (drives the CSS `--swirl-duration`).
- **Image** — a monochrome scene with one vibrant subject in the centre; the text stays quiet
  over the grey and flips hard where it crosses the subject. The contextual control becomes an
  **Illustration / Photo** toggle: `subject.svg` (a drawn orb) or `photo.jpg` (a real photograph
  — a red umbrella in near-white rain, from Unsplash).
- **Dark → Light** — the slider becomes a **lightness** control driving a neutral grey backdrop
  from black to white.
- **Colour** — the contextual control becomes a row of flat-colour swatches (blue, cyan, green,
  orange, red, magenta — see `controls/palette.ts`). Picking one snaps the backdrop in ~200ms so
  you can watch the hue subtraction (e.g. white − blue ≈ yellow, white − cyan ≈ red).

## Notes

- `.invert-text` (in `styles.css`) is the effect. It is not called `.invert` because Tailwind
  v4 already generates an `.invert` filter utility.
- The blend needs an opaque backdrop in the same stacking context — the stage card provides it.
- **Known contrast trade-off:** near the middle of the Dark → Light slider the text blends to
  mid-grey on mid-grey and visually disappears. That is the effect being demonstrated; the
  stage carries a `role="img"` + `aria-label` so the word stays available to assistive tech.
- Non-standard values used on purpose: `text-[clamp(2.5rem,22cqw,15rem)]` (the stage is an
  `@container`, so the word scales with the stage width, not the viewport) and a fixed
  `h-[32rem]` stage — a showcase canvas, not layout on the 4px content scale.
- The swirl animation is disabled under `prefers-reduced-motion: reduce`.
- **The essentials** code block (JSX / CSS toggle + Copy button) shows the minimum needed to
  reproduce the effect; the sources live in `controls/codeSamples.ts`.
- `photo.jpg` — "A red umbrella in heavy rain" by Heike Trautmann, via Unsplash (Unsplash
  License: free to use, no attribution required; credited here as a courtesy). Downscaled to
  1600px. Swap in any monochrome-with-a-vibrant-subject shot by replacing the file.
