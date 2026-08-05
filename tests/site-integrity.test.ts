import { describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { SELECTED_WORK, TECHNICAL_REFERENCES } from '../constants';
import { parse as parseToml } from 'toml';

const FONT_SIGNATURES = new Set([
  '00010000', // TrueType
  '4f54544f', // OpenType/CFF: OTTO
  '774f4646', // WOFF
  '774f4632', // WOFF2
]);

describe('published portfolio assets', () => {
  it('ships a valid self-hosted font rather than an HTML error document', async () => {
    const font = await readFile(path.join(process.cwd(), 'assets', 'JetBrainsMono-Regular.ttf'));
    expect(FONT_SIGNATURES.has(font.subarray(0, 4).toString('hex'))).toBe(true);
  });

  it('links only to documentation routes published by the canonical docs site', () => {
    const publishedDocumentationRoutes = new Set([
      '/microsoft-365-governance-baseline/',
      '/sharepoint-migration-decision-framework/',
      '/power-pages-dataverse-fit/',
      '/scribe8-technical-specification/',
      '/lasp-discovery/',
      '/hybrid-transition/',
      '/way-of-working/',
      '/public-evidence-model/',
      '/automation-platform/',
      '/meeting-intelligence/',
      '/live-audio-reliability/',
    ]);
    const documentationLinks = [...SELECTED_WORK, ...TECHNICAL_REFERENCES]
      .map(item => new URL(item.url))
      .filter(url => url.hostname === 'docs.system8.com.au');

    expect(documentationLinks.length).toBeGreaterThan(0);
    for (const url of documentationLinks) {
      expect(publishedDocumentationRoutes.has(url.pathname), `${url.href} must resolve to a published docs route`).toBe(true);
    }
  });

  it('publishes valid crawler policy and sitemap artifacts', async () => {
    const [robots, sitemap] = await Promise.all([
      readFile(path.join(process.cwd(), 'public', 'robots.txt'), 'utf8'),
      readFile(path.join(process.cwd(), 'public', 'sitemap.xml'), 'utf8'),
    ]);

    expect(robots).toContain('User-agent: *');
    expect(robots).toContain('Sitemap: https://system8.com.au/sitemap.xml');
    expect(sitemap).toContain('<urlset');
    expect(sitemap).toContain('<loc>https://system8.com.au/</loc>');
  });

  it('sets the baseline security headers on every response', async () => {
    const config = parseToml(await readFile(path.join(process.cwd(), 'netlify.toml'), 'utf8'));
    const globalHeaders = (config.headers || []).find((entry: { for?: string }) => entry.for === '/*')?.values || {};

    expect(globalHeaders['Content-Security-Policy']).toBeTruthy();
    expect(globalHeaders['X-Content-Type-Options']).toBe('nosniff');
    expect(globalHeaders['Referrer-Policy']).toBe('strict-origin-when-cross-origin');
    expect(globalHeaders['Permissions-Policy']).toBe('camera=(), microphone=(), geolocation=()');
  });

  it('renders metadata without escaped newline text in the document head', async () => {
    const html = await readFile(path.join(process.cwd(), 'index.html'), 'utf8');
    const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] || '';

    expect(head).not.toContain('\\n');
    expect(head).toContain('<link rel="canonical" href="https://system8.com.au/dylan-boekelman">');
  });
});
