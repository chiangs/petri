# Frosted glass card

**Intent:** Prove out an Apple-style "liquid / frosted glass" surface — a soft blur warped by an SVG
turbulence + displacement filter, plus a 1px inset border highlight — and see how real text and
imagery read through it.

The card is styled like a credit card (chip, number, holder, holographic mark, flippable back) over a
loud moving field (a colourful gradient with scrolling curvy diagonal white lines) so the distortion
is actually visible.

## Parts

- `GlassFilter.tsx` — hidden zero-size `<svg>` holding the `<filter>` (`feTurbulence` →
  `feDisplacementMap`). Its `scale` is live-driven by the slider.
- `FieldLayers.tsx` — the moving field (vivid gradient + scrolling rotated wave-line tile). Rendered
  once full-size by `StripedBackdrop` and again, smaller, inside every glass face.
- `styles.css` — `.fg-field-blur` (`filter: blur() saturate() url(#…)` on the field copy,
  `clip-path`'d to the card rect), `.fg-face` / `.fg-face-tint` / `.fg-face-scrim` (edge highlight,
  frost tint, text scrim), and the `fg-scroll` line-tile keyframes.
- `StripedBackdrop.tsx` — the stage the card floats over; renders `FieldLayers` full-size.
- `GlassCard.tsx` / `GlassFace.tsx` / `CardFront.tsx` / `CardBack.tsx` — the card as a single
  `<button>` that flips on click / Enter / Space (`aria-pressed` = flipped). `GlassFace` stacks the
  blurred-field copy + tint + scrim behind each face's content; `CardFront` / `CardBack` supply the
  content.
- `controls/` — dev-time controls, **not** part of the card: `GlassControls.tsx` / `RangeControl.tsx`,
  blur (0–16px, default 3) + displacement-scale (0–80, default 24) sliders and a pause-motion toggle,
  wired to state in `Component.tsx`. Left behind when the card is promoted.

### Why the frost is a duplicated field, not `backdrop-filter`

`backdrop-filter` is silently disabled by Chromium/Firefox when any ancestor has `transform`,
`perspective`, or `transform-style: preserve-3d` — which the flip wrapper has. Any frost using
`backdrop-filter` therefore can't live inside the flip, so it stays flat while the card
foreshortens and sticks out past the rotating face (the "white box").

Fix: don't use `backdrop-filter`. Each face renders its **own copy** of the moving field and blurs +
displaces it with a plain `filter` — which works fine inside a 3D transform. The whole face, blur
included, rotates as one. The copy only lines up *roughly* with the real field behind the card
(it's centred on the same point, then heavily blurred); a frosted panel showing a shifted view of
its surroundings is exactly how real glass reads.

`.fg-field-blur` also carries `overflow: hidden` + `clip-path: inset(0 round 1rem)` because filtered
content is not clipped by an ancestor's rounded `overflow` and would otherwise bleed past the card.

## Browser note

Works the same in **Chromium and Firefox** now — it's a normal `filter`, not `backdrop-filter`, so
both blur and ripple render in both. Cost: the field is drawn three times (stage + two faces), each
with an SVG filter; fine for a prototype, worth revisiting if promoted.

## Showcase-only styling

The rainbow gradient and the white wave-line SVG are deliberately literal (raw colours, data-URI),
not tokenised — there's no design-token equivalent for "loud test background". Everything else uses
token utilities. Don't copy the raw values into dev-ready work.

## Promotion

`GlassCard` is generic and props-driven (`holder`, `number`, `expiry`, `network`, `logoSrc`,
`logoAlt`, `blur`, `paused`) with no baked-in mock text — `DEMO_CARD` lives in `Component.tsx`. To
promote, move `GlassCard` + `GlassFace` + `CardFront` + `CardBack` + `FieldLayers` + `GlassFilter` +
`styles.css` into `src/dev-ready/components/`; leave `controls/` and `Component.tsx` behind.
Note the frost currently assumes the field it shows *is* `FieldLayers` — a promoted version would
take the behind-glass content as a prop or a slot.
