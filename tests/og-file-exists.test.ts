import { describe, it, expect } from 'vitest';
import { stat } from 'node:fs/promises';
import path from 'node:path';

describe('OG image generation - file existence', () => {
  it('public/social-preview.png exists and is non-empty', async () => {
    const p = path.join(process.cwd(), 'public', 'social-preview.png');
    const s = await stat(p);
    expect(s.isFile()).toBe(true);
    expect(s.size).toBeGreaterThan(0);
  });
});
