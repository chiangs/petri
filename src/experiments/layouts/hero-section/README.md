# Hero section

**Intent:** A page-hero pattern where the hero image is *interactive* — the pictured character
plays a sprite-sheet animation in response to the cursor. A mocked top nav sits above, hero text
below. Three heroes, two interaction behaviours:

- **`"cursor-x"`** (`use-sprite-scrub.ts`) — Cat and Frog. Frames run monotonically from a "left"
  pose through a centre pose to a "right" pose, so cursor X maps straight onto the frame index.
  The pointer is tracked on `window`, so the character keeps following the cursor even outside the
  image; it eases back to its centre idle pose only when the cursor leaves the window. The Cat also
  passes `panEndFrame` (its pan sheet runs right→left, so it sets `panFromRight` to invert X): the
  pan runs `0`→`panEndFrame` and is untouched by cursor Y while the pointer is level with or above
  the cat. Once the pointer drops below the cat's chin (computed through `object-cover`), the pan
  first settles to `panEndFrame`, then cursor **Y** carries the target on through the remaining
  frames — a head-tilt look-down — as long as the cursor is at the cat's centre or left (the pose
  faces down-left); below and to the right the cat keeps panning (looks right).
- **`"text-cue"`** (`use-sprite-cue.ts`) — Reader. Plays the sheet forward (frame 0 → last) once
  the cursor settles on real text, and back to frame 0 once it's been away from text for a beat.
  "Over text" is tracked from element enter/leave (`mouseover` / `mouseout`), not from sampling
  `pointermove`, so it stays correct while the cursor sits still on text. A `REACTION_MS` delay
  before starting, a `GAP_MS` grace across element boundaries (nav link → nav link), and a longer
  `RESET_MS` before reversing make it read like a person actually reaching for their reading
  glasses.

Only the nearest whole frame is ever drawn — no blending between frames — so there's no motion
ghosting; a few dozen frames per gesture is enough that the stepping isn't noticeable. All the
timing constants are fixed in the two hooks, not exposed as controls.

## Structure

- `SpriteHeroCanvas.tsx` loads a sheet and calls **both** behaviour hooks (rules of hooks); each
  hook does nothing unless its `active` matches the hero's `behavior`. `sprite-frame.ts` holds the
  shared canvas helpers (`sizeCanvasToFrame`, `drawSpriteFrame`).
- `hero-data.ts` lists the heroes; `HeroVisual.tsx` maps each sprite hero's id to its component
  and accessible label (`SPRITE_HEROES`).
- Each hero is a folder under `heroes/`: a `<name>-sprite.ts` (frame metadata, `objectFit`,
  optional `background`, `?url` import of the sheet) and a thin `<Name>Hero.tsx`.
- Live controls (`controls/`, dev-only): hero selector, nav links, headline/subheading, image
  layout. The controls panel carries `data-hero-cue-ignore` so its label text doesn't trigger the
  Reader's glasses cue.

## Sprite sheets

Each was cut from a 24fps AI-generated clip with FFmpeg. A grid rather than a single row keeps
frames near source resolution while staying under the 16383px WebP dimension limit.

- **Cat** — a gaze pan (screen-left → screen-right, gaze held *up*) that carries on into a
  head-tilt look-down. **WIP (`exp/cat-sprite-hires`, uncommitted)** — needs a feel check in
  `npm run dev`. Two sheets in the folder:
  - `cat-sprite-hires.webp` (**in use**) — 45 native frames from the first ~1.88s of a
    1920×1080 24fps clip (`ffmpeg -t 1.88 -vf "fps=24"`, no reversal), `magick montage
    -tile 5x9 -mode Concatenate`; no interpolation; 1920×1080, 5×9 grid (9600×9720), WebP q90
    (~1.9 MB). `object-cover`. Frames read: 0 = gaze screen-*right* → `panEndFrame` (21) = gaze
    screen-left (the pan — hence `panFromRight`) → 21–44 the head tilts down into a curious
    look-down (last frame ≈ the deepest peer). Cursor X drives the pan; once the cursor is
    below the cat's chin the pan settles to frame 21 then cursor Y carries the target through
    21→44. The clip continues past frame 44 into a turn fully away — trimmed off. Decodes to ~93 MP — over older iOS
    Safari's ~16 MP single-image ceiling (under the 16383px WebP dimension cap); see Browser
    note.
  - `cat-sprite.webp` (kept, not imported) — the original lower-res version: ~1.9s sub-range,
    45 native frames, 880×378, 9×5 grid (7920×1890), WebP q90 (~585 KB). Swap the import in
    `cat-sprite.ts` back to revert.
- **Frog** (`heroes/frog/frog-sprite.webp`) — a dance: points screen-left, arms up (centre),
  points screen-right; 25 frames resampled from that sub-range; 1024×534, 5×5 grid, WebP q90
  (~660 KB). Tall standing figure → `object-contain` with a `background` gradient matching the
  clip's own background, so the letterbox is invisible.
- **Reader** (`heroes/reader/reader-sprite.webp`) — the first ~2.2s of a man putting reading
  glasses on: frame 0 is "no glasses", the last frame is glasses on with a hand at the temple;
  25 frames, 1024×640, 5×5 grid, WebP q84 (~640 KB). Portrait → `object-contain` with a dark
  radial `background` matching the studio vignette.

## Browser note

- Canvas 2D + `requestAnimationFrame` + window `pointermove` + `devicePixelRatio` backing-store
  scaling render consistently in current Chrome, Firefox, and Safari. `use-sprite-cue.ts` also
  uses bubbling `mouseover` / `mouseout` on `document` (widely supported).
- **Touch / iOS Safari:** there is no hover, and `pointermove` only fires mid-drag, so on touch
  devices the hero simply rests on its resting frame — no scrub, no cue. Acceptable for this
  prototype; a mobile-facing production version would need a different input (scroll-linked,
  device tilt, an autoplay loop).
- The frog (5120×2670) and reader (5120×3200) sheets are well under the **16383px WebP
  dimension limit** and Firefox's 32767px image cap. Decoded sizes (~14–16 MP) sit around the
  ~16 MP ceiling older iOS Safari applied to a single image; a substantially larger animation
  would need to check that limit or split into multiple sheets.
- The hi-res cat sheet (`cat-sprite-hires.webp`, 9600×9720, 1920×1080 frames) is under the
  16383px WebP dimension cap on both axes and Firefox's 32767px cap, but decodes to **~93 MP**
  — well past the ~16 MP single-image ceiling older iOS Safari applied. Fine on current
  desktop Chrome/Firefox/Safari; a mobile-facing version would need smaller frames or a split
  sheet. The original 880×378 `cat-sprite.webp` (7920×1890, ~15 MP) stays in the folder as the
  safe fallback.
- `object-cover` (cat) crops the frame on very tall/wide hero areas; `object-contain` (frog,
  reader) letterboxes it, with the gap filled by a CSS `background` matching the clip so it reads
  full-bleed at any hero aspect.
- Automated in-browser verification of the interaction was blocked in this environment (the local
  security setup resets WebSocket connections to Chrome's debug port); the behaviour was checked
  by code review and static renders. Confirm the feel with `npm run dev`.

## Accessibility note

The cursor-driven animations have no keyboard or pointer-free equivalent — decorative
enhancements with no established accessible pattern, so they ship under the novel-interaction
carve-out in `docs/DESIGN.md` → Accessibility → Scope carve-outs. The accessible baseline is
intact: the canvas is `role="img"` with an `aria-label` describing the subject, it renders a
single static frame under `prefers-reduced-motion: reduce` (no rAF, no window listeners), the nav
links keep hover + `focus-visible` states, and heading order (page `h1` → hero `h2`) is unbroken.

## Best-practice note

- Both behaviour hooks read their tunables from module-level constants rather than props/tokens —
  there's no motion-token infrastructure in `src/index.css`, and they were tuned to
  reference clips once. Production would lift them to props.
- `use-sprite-scrub.ts` reads `idleFrame` through a ref (kept current by an effect) so switching
  heroes doesn't restart the rAF loop mid-frame — a deliberate step around the usual "put
  everything in the dependency array" guidance.
- `use-sprite-cue.ts` decides "is the cursor over text" from the `mouseover` target's tag name
  (`A`, `P`, `H1`–`H6`, `LI`, `SPAN`, `BUTTON`, …) rather than precise glyph hit-testing
  (`caretPositionFromPoint`) — so the whole box of a `<p>` counts, padding included. Good enough
  for the demo; production reading-aware UI would use the caret API or explicit opt-in markers.
  Tracking element enter/leave rather than sampling pointer position is what lets the cue stay
  correct while the cursor sits still on text.
- Adding a sprite hero: create `heroes/<name>/` (`<name>-sprite.ts` + `<Name>Hero.tsx`), add one
  line to `SPRITE_HEROES` in `HeroVisual.tsx`, and add the hero to `HEROES` in `hero-data.ts`. New
  behaviours are a new `use-sprite-*.ts` hook called alongside the others in `SpriteHeroCanvas`.

## When promoting

Move the shared engine (`SpriteHeroCanvas.tsx`, `sprite-frame.ts`, `use-sprite-scrub.ts`,
`use-sprite-cue.ts`, `use-reduced-motion.ts`) plus `HeroSection.tsx` / `NavBar.tsx` / `NavLink.tsx`
/ `HeroVisual.tsx` / `HeroText.tsx` and the per-hero `heroes/<name>/` folders into
`src/dev-ready/layouts/`. Turn the hook constants, nav links, hero list, and text into props (the
`controls/` UI stays behind). Carry the notes above forward as comments on the affected code.
Decide final hero-text placement (overlay on the image is the more common pattern) before baking
in a layout.
