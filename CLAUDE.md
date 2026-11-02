# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install                       # install deps
npm run dev                       # http://localhost:3000
npm run build && npm run start    # local production build
npm run lint                      # next lint (no test script exists)

docker compose up -d --build      # rebuild + run container on 127.0.0.1:46402
docker compose logs -f se-roadmap # tail logs
docker compose down               # stop
```

There is no unit/e2e test runner configured. `playwright/before` and `playwright/after` are screenshot snapshot folders for manual visual diffing — not a Playwright test suite.

## Workflow rule — when finishing a code change

Do all three before reporting success, in this order:

1. **Test it carefully.** Run `npm run dev`, exercise the changed surface in a browser (golden path + obvious edge cases), and watch the terminal for type/runtime errors. Run `npm run lint` if touching `.ts`/`.tsx`. For visual changes, compare against `playwright/before/*.png` and drop new shots into `playwright/after/`.
2. **Commit to git.** Use a meaningful, English commit message that explains the *why*, not just the *what*. Don't bundle unrelated changes.
3. **Rebuild the Docker container.** `docker compose up -d --build`, then `curl -I http://127.0.0.1:46402/` to confirm a 200. The standalone build can surface issues that `next dev` hides (e.g. missing files in `output: 'standalone'` traces).

Skipping any step — especially the rebuild — has burned us before; `next dev` and the Docker image diverge.

## Architecture

This is a **frontend-only, statically-generated** Next.js 14 (App Router) site. There is no backend, no API routes, no database. All user state lives in `localStorage`: bookmarks, notes and completion under the `se-roadmap:*` keys in `lib/storage-keys.ts`, the code-tab language under `se-roadmap:code-lang`, and the theme under next-themes' default key `theme` (formats in README → Storage keys; changing a key or format resets that value for every visitor). The site is reachable in production at `https://roadmap.wakeuplate.io.vn/` via a Cloudflare Tunnel + nginx reverse proxy stack that lives outside this repo at `../../nginx_setup` — the container only binds `127.0.0.1:46402`, never the public internet.

### The curriculum is the spine

Three files together define every topic on the site, and they must stay in sync:

- **`lib/curriculum.ts`** — `CURRICULUM: Topic[]`. Source of truth for metadata: slug, title, category, type (`core` | `practice` | `read`), summary, external resources, difficulty, est. minutes, optional `dependsOn`. The order of this array drives the homepage roadmap order and the Previous/Next navigation on topic pages.
- **`lib/categories.ts`** — `CATEGORIES: Category[]`. Defines the 7 categories, their colors (via CSS vars like `--cat-foundations`), icons, and display order. `Topic.category` must reference a `CategoryId` defined here.
- **`content/topics/*.mdx`** — Long-form lesson content per topic. Each MDX file is imported and registered in `content/topics/index.ts` as `TOPIC_CONTENT[slug] = Component`. The topic page renders `TOPIC_CONTENT[slug]` if present, otherwise a "content being written" placeholder.

**Adding or renaming a topic** requires updating all three: add to `CURRICULUM`, ensure its `category` exists in `CATEGORIES`, create `content/topics/<slug>.mdx`, and register the component in `content/topics/index.ts`. Slugs must match across all three. Optional: `lib/checkpoint-questions.ts` adds self-check questions for the topic.

### Routing & static generation

- `app/page.tsx` — homepage; renders the roadmap canvas from `CURRICULUM` + `CATEGORIES`.
- `app/topic/[slug]/page.tsx` — uses `generateStaticParams()` over `ALL_SLUGS` from `lib/curriculum.ts`, so **every topic is pre-rendered at build time**. A slug missing from `CURRICULUM` will 404 even if its MDX file exists.
- `app/bookmarks/`, `app/notes/` — client-rendered views over the `localStorage` state.

### MDX pipeline

Configured in `next.config.mjs` via `@next/mdx`:
- `remark-gfm` (tables, task lists)
- `rehype-slug` + `rehype-autolink-headings` (anchor links on headings)
- `rehype-pretty-code` with Shiki, dual theme (`github-dark-dimmed` / `github-light`), `keepBackground: false` so code blocks inherit Tailwind styling.

`pageExtensions` includes `mdx`, so MDX files can be routes too — but content MDX lives under `content/topics/` and is imported as components, not routed directly.

### Client-state hooks

`hooks/use-local-storage.ts` is the foundation: one `useSyncExternalStore`-backed store per key shared by every hook instance in the tab (writes are computed from the latest stored value and notify all instances), the server snapshot during hydration (stored value arrives in the re-render after), cross-tab `storage` events, and an in-memory fallback on quota/privacy errors. Many components read the same key at once (the homepage has ~50 instances), so never give an instance its own copy that it writes back — that is how a homepage visit used to wipe progress and bookmarks. The feature-specific hooks (`use-bookmarks`, `use-notes`, `use-progress`) wrap it with the right key from `lib/storage-keys.ts`. **Always go through these hooks rather than touching `localStorage` directly** — the SSR-safety and cross-tab sync are easy to miss.

Components that read this state must be Client Components (`'use client'`) and should guard against the pre-hydration empty state to avoid hydration mismatches (`hooks/use-has-mounted.ts` helps here).

### Styling

- Tailwind + shadcn/ui primitives in `components/ui/` (button, card, badge, progress, textarea).
- Category colors are CSS variables defined in `app/globals.css` and referenced via inline `style={{ ['--chip']: cat.colorVar }}` — keep colors threaded through CSS vars, don't hardcode hex.
- Path alias `@/*` → repo root (see `tsconfig.json`).
- Dark mode is the default theme (`defaultTheme="dark"` in `app/layout.tsx`), via `next-themes`.

### Docker image

`Dockerfile` is a 3-stage build (deps → builder → runner) producing a Next.js `output: 'standalone'` runtime on `node:24-alpine` (Node 24 LTS; Node 20 reached end-of-life in April 2026), running as the non-root `nextjs` user, listening on `:3000` inside the container. `docker-compose.yml` binds it to `127.0.0.1:46402` only. The healthcheck `wget`s `/` — if it starts failing, the standalone build is missing files (most likely from a new dependency that didn't get traced).
