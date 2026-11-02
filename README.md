# SE Roadmap

An interactive, frontend-only roadmap for learning backend software engineering.
42 curated topics across 7 categories, with bookmarks, notes, and progress
stored in your browser (`localStorage`, no account).

Built with Next.js 16 (App Router) + React 19 + TypeScript + Tailwind + shadcn/ui + Framer Motion.

---

## Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Production build

```bash
npm run build
npm run start
```

## Docker

The image is a multi-stage Next.js `output: 'standalone'` build. Compose binds the
container to `127.0.0.1:46402` so it is only reachable via the local nginx reverse
proxy — never directly from the internet.

```bash
docker compose up -d --build
curl -I http://127.0.0.1:46402/         # → 200
docker compose logs -f se-roadmap        # tail
docker compose down                      # stop
```

## Public URL

Published via the host's existing Cloudflare Tunnel + nginx stack (see
`../../nginx_setup`):

- `https://roadmap.wakeuplate.io.vn/`

After changing nginx/tunnel configuration:

```bash
cd ../../nginx_setup
sudo SE_ROADMAP_PORT=46402 ./setup_nginx.sh
sudo EXPOSE_SE_ROADMAP=yes ./setup_cloudflare_tunnel.sh
```

## Updating content

The single source of truth is `lib/curriculum.ts`. Edit a topic's `summary`,
`details`, or `resources` array and rebuild the image:

```bash
docker compose up -d --build
```

All other UI is rendered from that array.

## Storage keys (browser)

| Key | Shape |
|---|---|
| `se-roadmap:bookmarks` | JSON `string[]` of topic slugs |
| `se-roadmap:notes` | JSON `Record<slug, string>` |
| `se-roadmap:progress` | JSON `Record<slug, boolean>` (an unticked topic stays as `false`) |
| `se-roadmap:code-lang` | plain string `ts` or `python` (CodeTabs language) |
| `theme` | plain string `dark` / `light`: next-themes' default key, not namespaced |

These are what live visitors already have saved. Renaming a key or changing its
format resets that value for every visitor (e.g. passing
`STORAGE_KEYS.theme` as next-themes' `storageKey` would reset everyone's theme).
Clearing site data for the domain wipes them all.
