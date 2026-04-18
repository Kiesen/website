# CLAUDE.md

Personal website: blog, résumé, and playground. Built with Nuxt 4 and Vue 3.

## Stack

- **Framework**: Nuxt 4 (Vue 3, Vite, Nitro server)
- **Language**: TypeScript (strict via Nuxt's generated tsconfigs)
- **Package manager**: Bun (`bun.lock` is the source of truth — do not regenerate with npm/pnpm/yarn)
- **Linting**: ESLint, Prettier (with `@trivago/prettier-plugin-sort-imports`)
- **Git hooks**: Husky runs `pretty-quick` and `lint` on pre-commit
- **Container**: Dockerfile present (currently still references `.next` — left over from the Next.js → Nuxt migration; needs updating before production builds work)

## Project layout

Nuxt 4 uses the `app/` directory as the source root (not `src/`):

- `app/app.vue` — root component
- `app/pages/` — file-based routes (create when needed)
- `app/components/` — auto-imported Vue components
- `app/composables/` — auto-imported composables (use `useX` naming)
- `app/layouts/` — layout templates
- `server/` — Nitro server routes (API endpoints live here, not in `app/`)
- `public/` — static assets served at root
- `nuxt.config.ts` — Nuxt configuration

## Commands

```bash
bun install            # install deps
bun run dev            # dev server on http://localhost:3000
bun run build          # production build (.output/)
bun run generate       # static site generation
bun run preview        # preview production build
```

## Conventions

- **Auto-imports**: Nuxt auto-imports components from `app/components/` and composables from `app/composables/`. Don't add manual imports for these — let Nuxt resolve them.
- **Vue style**: Use `<script setup lang="ts">` with the Composition API. Avoid the Options API.
- **Server routes**: Place API handlers in `server/api/` using `defineEventHandler`. Do not recreate the old `src/app/api/` Next.js structure.
- **Styling**: No CSS framework is currently configured. If adding one, prefer UnoCSS or Tailwind via the official Nuxt module rather than manual setup.
- **Imports order**: Prettier's import sort plugin enforces grouping — let it handle ordering on save / pre-commit rather than arranging manually.

## Migration context

This repo was recently ported from Next.js to Nuxt. A few legacy artifacts are still present:

- `.eslintrc` extends `next/core-web-vitals` — needs to be replaced with `@nuxt/eslint-config`.
- `Dockerfile` copies `.next/` — should copy `.output/` instead.
- `package.json` `name` is still `"tmp"` — set to something meaningful before publishing anywhere.

When working in unrelated areas, leave these alone unless asked. When asked to "fix migration leftovers," these are the targets.

## What not to do

- Don't add Next.js patterns (`app/page.tsx`, API routes under `app/api/`, `next/image`, etc.). This is a Vue/Nuxt project now.
- Don't introduce `npm`/`pnpm`/`yarn` lockfiles alongside `bun.lock`.
- Don't add `README.md` content yet — current README is the Nuxt starter default and will be rewritten as the site takes shape.
