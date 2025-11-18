# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

- Project type: Vite + React + TypeScript single-page app (SPA), deployed on Netlify. Build output is static (`dist/`) with one Netlify Function for the social preview image.

## Common commands
- Install deps: `npm install`
- Start dev server (Vite): `npm run dev`
  - Server binds to `0.0.0.0:3000` (see `vite.config.ts`)
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Netlify local dev (to exercise redirects and the function): `netlify dev` (requires Netlify CLI)
- Lint: not configured
- Tests: not configured

## Environment
- For local dev, `README.md` instructs setting `GEMINI_API_KEY` in `.env.local`. Vite injects it via `define` in `vite.config.ts`, though the app does not currently reference it at runtime.

## High-level architecture
- Entry points
  - `index.html` bootstraps the app, includes Tailwind (CDN) and html2canvas (CDN), PWA manifest and icons, and loads `/index.tsx`.
  - `index.tsx` mounts `<App />` into `#root` using React 19 `createRoot`.
- App flow (three views)
  - `App.tsx` orchestrates view state: `boot` → `hud` → `terminal`.
  - `components/BootSequence.tsx` renders a timed boot log then hands off to HUD.
  - `components/HudDisplay.tsx` shows the résumé heads-up display; any keypress switches to the terminal.
  - `components/Terminal.tsx` renders an interactive shell. Supported commands: `help`, `whoami`, `skills`, `experience`, `projects`, `contact`, `more`, `all`, `share`, `preview`, `exit`, `clear`. Content for these views is sourced from `constants.tsx` and typed via `types.ts`.
  - `components/PreviewGenerator.tsx` uses html2canvas to generate a shareable PNG overlay when `preview` is invoked from the terminal.
- Data and types
  - `constants.tsx` contains profile/skills/experience/projects/contact data.
  - `types.ts` defines `Experience` and `HistoryItem` shapes used across the UI.
- Styling & assets
  - Tailwind CSS is loaded via CDN (no PostCSS/Tailwind build step). PWA assets and `site.webmanifest` live under `public/` and are referenced from `index.html`.
- Build & resolution
  - Vite config sets alias `@` to repo root and defines `process.env.*` keys from Vite env (`vite.config.ts`). `tsconfig.json` mirrors the `@/*` path.
- Deployment & routing (Netlify)
  - `netlify.toml`: build command `npm run build`, publish `dist/`, SPA fallback `/* → /index.html`.
  - `/social-preview.png` is routed to a Netlify Function at `netlify/functions/social-preview.js`. That function reads `dist/index.html` to extract an embedded base64 PNG and serve it; if the embed is absent, the function returns 500. A static fallback image also exists at `public/social-preview.png`, but the redirect points to the function route.

## Notes specific to this repo
- There is no ESLint/Prettier or test runner configured in `package.json`.
- The Netlify function imports `sharp` but does not currently use it in the response pipeline.

## References (source of truth)
- `package.json`: scripts `{ dev, build, preview }`
- `README.md`: local run steps, `.env.local` (`GEMINI_API_KEY`)
- `vite.config.ts`: server port/host, define env, alias `@`
- `tsconfig.json`: path alias `@/*` → `./*`
- `index.html`: Tailwind + html2canvas CDNs, PWA manifest/icons, social meta, script to `/index.tsx`
- `index.tsx`, `App.tsx`: app bootstrap and view orchestration
- `components/{BootSequence,HudDisplay,Terminal,PreviewGenerator}.tsx`: view implementations
- `constants.tsx`, `types.ts`: static content and types
- `netlify.toml`: build, redirects, headers
- `netlify/functions/social-preview.js`: social preview function implementation
