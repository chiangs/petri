# Text selection colours

**Intent:** Show how the browser text-selection highlight can be restyled, and how
`::selection { background; color }` reads at different type sizes and line heights.

A white card holds three sentences of lorem ipsum. `SelectionText.tsx` emits a scoped
`.selection-demo ::selection` rule into a `<style>` tag (the pseudo-element can't take an
inline style). `SwatchPicker.tsx` + `Swatch.tsx` are the feature: four pastel presets from
`palette.ts` plus a native `<input type="color">`. `readableTextOn()` picks dark or white
text per colour so custom picks keep contrast.

`controls/TypographyControls.tsx` (font size, line height) is dev scaffolding — it stays
behind on promotion. The piece to promote is `SelectionText.tsx` plus the picker.
