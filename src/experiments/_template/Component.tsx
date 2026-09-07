// ─────────────────────────────────────────────────────────────────────────────
// COPY-ME STARTER
//
// 1. Copy this whole `_template/` folder into either
//      src/experiments/components/<your-slug>/   (a standalone component idea)
//    or
//      src/experiments/layouts/<your-slug>/      (a layout / navigation flow)
//    Use a kebab-case folder name — it becomes the URL hash: #<your-slug>.
//
// 2. Fill in `meta.ts` (title, description, tags, optional complexity).
//
// 3. Build your idea in the default component below. Follow docs/DESIGN.md:
//    token utilities (bg-bg, text-ink, text-muted, border-border, bg-brand-500,
//    rounded-card), `cn()` for conditional classes, visible hover + focus-visible
//    states, AA contrast, values + conditional renders computed above the return,
//    one component per file, user-facing text in the `copy` block. Keep it working
//    in current Chrome, Firefox, and Safari — flag anything uncertain (see
//    docs/DESIGN.md "Browser note").
//
// 4. If the idea has settings worth tuning live (durations, sizes, counts,
//    colors, easings, toggles…), ASK THE DESIGNER which to expose as on-screen
//    controls and their range / default / step. Put control components in a
//    `controls/` subfolder — scaffolding, not part of what gets promoted — and
//    drive them from `useState` here in Component.tsx.
//
// 5. Save. It appears in the sidebar automatically — no registry edits.
//
// This `_template/` folder is NOT registered or routed (it lives outside
// components/ and layouts/), so leave it here for the next person.
// ─────────────────────────────────────────────────────────────────────────────

// All user-facing text for this experiment, in one place.
const copy = {
  placeholder: 'Start building here.',
} as const

export default function Component() {
  return (
    <div className="flex min-h-64 items-center justify-center rounded-card border border-dashed border-border text-sm text-muted">
      {copy.placeholder}
    </div>
  )
}
