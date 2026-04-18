# frederik.dev

[![CI](https://github.com/Kiesen/website/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Kiesen/website/actions/workflows/ci.yml)

Personal portfolio — blog, résumé, and playground. Built with Nuxt 4 and Vue 3, deployed on DigitalOcean via Docker.

## Features

- Animated particle-network hero with interactive 3D depth effect
- Sections: About, Experience, Skills, Projects, Contact
- **Spotify "Last Liked" widget** — live card showing the most recently liked track, linked directly to Spotify (see [setup](#spotify-widget) below)
- Dark / light theme toggle
- Fully static-export capable (`bun run generate`)

## Stack

| Layer           | Choice                          |
| --------------- | ------------------------------- |
| Framework       | Nuxt 4 (Vue 3, Vite, Nitro)     |
| Language        | TypeScript (strict)             |
| Styling         | Tailwind CSS                    |
| Package manager | Bun                             |
| Hosting         | DigitalOcean (Docker)           |
| Registry        | DigitalOcean Container Registry |

## Getting started

```bash
bun install
bun run dev       # http://localhost:3000
```

Other commands:

```bash
bun run build     # production build → .output/
bun run generate  # static site → .output/public/
bun run preview   # preview production build
bun run lint      # ESLint + Prettier check
bun run lint:fix  # auto-fix
```

## Spotify widget

The "Last liked on Spotify" card calls `/api/spotify/last-liked` (a Nitro server route), which fetches your most recently saved track via the Spotify Web API. The response is cached server-side for one hour.

### One-time setup

1. Create an app at [developer.spotify.com](https://developer.spotify.com/dashboard) and note the **Client ID** and **Client Secret**.
2. Add `http://localhost:3000/api/spotify/callback` as a Redirect URI in the app settings.
3. Create a `.env` file (git-ignored) with:

```env
NUXT_SPOTIFY_CLIENT_ID=
NUXT_SPOTIFY_CLIENT_SECRET=
NUXT_SPOTIFY_REDIRECT_URI=http://localhost:3000/api/spotify/callback
NUXT_SPOTIFY_AUTH_SECRET=any-random-string
NUXT_SPOTIFY_REFRESH_TOKEN=   # filled in step 5
```

4. Start the dev server and open `http://localhost:3000/api/spotify/auth` — this redirects to Spotify's OAuth consent screen.
5. After granting access, the callback prints a refresh token to the terminal. Paste it into `NUXT_SPOTIFY_REFRESH_TOKEN`.

In production set the same env vars on your server (or as DigitalOcean App Platform env vars), using your live domain as the redirect URI.

## Release flow

Releases are managed with [release-it](https://github.com/release-it/release-it).

```bash
GITHUB_TOKEN=ghp_xxx bun run release
```

This will interactively bump the version, commit, create an annotated git tag, push everything to `main`, and open a GitHub Release. Pushing the tag then triggers the [release pipeline](.github/workflows/release.yml) which retags the existing `:latest` Docker image with the semver version — no rebuild needed.

## CI / CD

| Workflow                                     | Trigger              | What it does                                |
| -------------------------------------------- | -------------------- | ------------------------------------------- |
| [ci.yml](.github/workflows/ci.yml)           | push / PR → `main`   | lint, build, Docker build & push `:latest`  |
| [release.yml](.github/workflows/release.yml) | push of `v*.*.*` tag | pulls `:latest`, retags as `vX.Y.Z`, pushes |

Required repository secrets: `DO_ACCESS_TOKEN`, `DO_REGISTRY`.
