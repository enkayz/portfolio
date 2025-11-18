import { describe, it, expect } from 'vitest';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { parse as parseToml } from 'toml';

describe('Netlify headers for social-preview.png', () => {
  it('includes short cache control', async () => {
    const tomlPath = path.join(process.cwd(), 'netlify.toml');
    const txt = await readFile(tomlPath, 'utf-8');
    const cfg = parseToml(txt);
    const headers = cfg.headers || [];
    const h = headers.find((x: any) => x.for === '/social-preview.png');
    expect(h).toBeTruthy();
    const values = h.values || {};
    const cc = values['Cache-Control'] || values['cache-control'] || '';
    expect(cc).toContain('max-age=60');
    expect(cc).toContain('must-revalidate');
  });
});
