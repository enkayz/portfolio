import { describe, it, expect } from 'vitest';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

describe('OG image validity', () => {
  it('has PNG signature and correct dimensions', async () => {
    const p = path.join(process.cwd(), 'public', 'social-preview.png');
    const buf = await readFile(p);
    // PNG signature: 89 50 4E 47 0D 0A 1A 0A
    const sig = Array.from(buf.slice(0, 8));
    expect(sig).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

    const meta = await sharp(buf).metadata();
    expect(meta.width).toBe(1200);
    expect(meta.height).toBe(630);
  });
});
