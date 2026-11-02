# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Editorial direction — 3 November 2026

Use the public S8-VOICE-001 guide at https://docs.system8.com.au/writing-style-standard/. Retain Dylan’s practical Whirlpool voice and the curiosity in his user-confirmed aspirationz writing. Give concrete observations, questions and checks. Keep music and sound visible beside systems work. Describe design requirements separately from deployed capabilities, and retain necessary privacy, permission and recovery boundaries.

Netlify builds this directory and publishes dist/client. Preserve the recovered public/_headers and public/_redirects and the /sites/ directory.
