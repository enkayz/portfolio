import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.cwd());

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function main() {
  const srcTtf = path.join(root, 'assets', 'JetBrainsMono-Regular.ttf');
  const outDir = path.join(root, 'public', 'fonts');
  await ensureDir(outDir);

  const ttf = await readFile(srcTtf);
  await writeFile(path.join(outDir, 'JetBrainsMono-Regular.ttf'), ttf);
  console.log('Copied TTF font → public/fonts');
}

main().catch((err) => {
  console.error('Font build failed:', err);
  process.exitCode = 1;
});
