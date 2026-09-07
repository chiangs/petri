# petri

A library of frontend experiments — components, interactions, layouts — each
rendered as a live preview alongside its source code, Storybook-style.

## Adding an experiment

Create a new folder under `src/experiments/<slug>/` with:

- `Component.tsx` — default-exports the component to preview
- `meta.ts` — default-exports `{ title, description?, tags? }`

It's picked up automatically; no registration needed.

## Development

```
npm install
npm run dev
npm run build
```
