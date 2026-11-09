# System 8 homepages

Netlify builds this directory for both custom domains. `index.html` is the portfolio résumé for `portfolio.system8.com.au`. `system8.html` is Signal Run, served at the apex by `public/_redirects`. Both are Vite HTML entries and carry separate titles and canonicals. The repository root contains the earlier terminal-style portfolio.

Run `npm ci`, `npm run build`, and `npm run test:sites`. Deploy `dist/client`. For local browser checks, open `/` and `/system8.html` with `npm run dev`. Vite does not apply the Netlify host rules locally. The portfolio print button uses the browser's print dialog.

Signal Run uses WebGPU for its orbital field and falls back to Canvas 2D if an adapter cannot be used. Three relay buttons, field taps and arrow keys use the same flight state. Sound is off initially, and reduced motion disables the ambient animation and moves directly to selected relays.

The public directory stays at `/sites/`. The apex and portfolio robots and sitemap routes are declared in `public/_redirects`; `network-sitemap.xml` still lists the portfolio as its own property.

The 3 November 2026 revision follows S8-VOICE-001 v2: practical diagnostic questions from Dylan’s Whirlpool writing, with the curiosity and musical perspective in the user-confirmed aspirationz journal. Describe proposals as proposals, preserve technical warnings and avoid decorative contrast slogans.
