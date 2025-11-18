import { describe, it, expect } from 'vitest';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'node-html-parser';

describe('OG meta tags', () => {
  it('point to /social-preview.png and have correct attributes', async () => {
    const htmlPath = path.join(process.cwd(), 'index.html');
    const html = await readFile(htmlPath, 'utf-8');
    const root = parse(html);

    const ogImage = root.querySelector('meta[property="og:image"]');
    expect(ogImage?.getAttribute('content')).toBe('/social-preview.png');

    const ogType = root.querySelector('meta[property="og:image:type"]');
    expect(ogType?.getAttribute('content')).toBe('image/png');

    const ogW = root.querySelector('meta[property="og:image:width"]');
    const ogH = root.querySelector('meta[property="og:image:height"]');
    expect(ogW?.getAttribute('content')).toBe('1200');
    expect(ogH?.getAttribute('content')).toBe('630');

    const twImage = root.querySelector('meta[name="twitter:image"]');
    expect(twImage?.getAttribute('content')).toBe('/social-preview.png');
  });
});
