import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

function escXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function extractInnerSvg(svgText) {
  const start = svgText.indexOf('<svg');
  if (start === -1) return svgText;
  const after = svgText.indexOf('>', start);
  const end = svgText.lastIndexOf('</svg>');
  if (after !== -1 && end !== -1) {
    return svgText.slice(after + 1, end);
  }
  return svgText;
}

function wrapByChars(text, maxChars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let current = '';
  for (const w of words) {
    if (!current.length) {
      current = w;
      continue;
    }
    if ((current + ' ' + w).length <= maxChars) {
      current += ' ' + w;
    } else {
      lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);
  return lines;
}

async function main() {
  const cfgPath = path.join(root, 'og-config.json');
  const cfg = JSON.parse(await readFile(cfgPath, 'utf-8'));

  const iconSvgRaw = await readFile(path.join(root, 'assets', 'icon-base.svg'), 'utf-8');
  const iconInner = extractInnerSvg(iconSvgRaw);
  const fontTtf = await readFile(path.join(root, 'assets', 'JetBrainsMono-Regular.ttf'));
  const fontBase64 = fontTtf.toString('base64');

  const width = 1200;
  const height = 630;
  const pad = 48;
  const contentW = width - pad * 2;
  const contentH = height - pad * 2;

  // Typographic scale (tuned smaller)
  let titleSize = 56; // was 64
  const nameSize = 34; // was 40
  const subtitleSize = 24; // was 28

  // If title is very long, auto-reduce a bit
  if (String(cfg.title).length > 42) titleSize = 50;
  if (String(cfg.title).length > 56) titleSize = 44;

  const leftX = pad * 2;
  const rightX = width - pad * 2;
  const usableWidth = width - leftX - pad * 2; // ~1008px

  const approxCharWidth = 0.6 * titleSize;
  const maxTitleCharsPerLine = Math.max(18, Math.floor(usableWidth / approxCharWidth));
  const titleLines = wrapByChars(cfg.title, maxTitleCharsPerLine);

  const lineGap = Math.round(titleSize * 0.35);
  const titleStartY = 140;
  const nameY = titleStartY + titleSize * titleLines.length + lineGap + 8;
  const subtitleY = nameY + nameSize + 12;
  const footerY2 = pad + contentH - 24; // bottom line (url)
  const footerY1 = footerY2 - 36;       // label line above

  // Build <tspan> for title lines
  const titleSpans = titleLines
    .map((line, idx) => `<tspan x="${leftX}" dy="${idx === 0 ? 0 : titleSize + lineGap}">${escXml(line)}</tspan>`) 
    .join('');

  const svg = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${width}\" height=\"${height}\" viewBox=\"0 0 ${width} ${height}\">
  <defs>
    <style><![CDATA[
      @font-face {
        font-family: 'JetBrains Mono';
        src: url('data:font/ttf;base64,${fontBase64}') format('truetype');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      .mono { font-family: 'JetBrains Mono', monospace; }
    ]]></style>
  </defs>
  <!-- Background -->
  <rect x=\"0\" y=\"0\" width=\"${width}\" height=\"${height}\" fill=\"#0a0a0a\" />

  <!-- Watermark icon (smaller, shifted further off-canvas) -->
  <g opacity=\"0.08\" transform=\"translate(${width - 400}, ${-40}) scale(0.35)\">
    ${iconInner}
  </g>

  <!-- Inner border -->
  <rect x=\"${pad}\" y=\"${pad}\" width=\"${contentW}\" height=\"${contentH}\" rx=\"16\" ry=\"16\" fill=\"none\" stroke=\"#14b8a6\" stroke-opacity=\"0.3\" stroke-width=\"2\" />

  <!-- Text content -->
  <g class=\"mono\">
    <text x=\"${leftX}\" y=\"${titleStartY}\" font-size=\"${titleSize}\" fill=\"#facc15\" font-weight=\"700\">${titleSpans}</text>
    <text x=\"${leftX}\" y=\"${nameY}\" font-size=\"${nameSize}\" fill=\"#22d3ee\" font-weight=\"600\">${escXml(cfg.name)}</text>
    <text x=\"${leftX}\" y=\"${subtitleY}\" font-size=\"${subtitleSize}\" fill=\"#d1d5db\">${escXml(cfg.subtitle)}</text>

    <text x=\"${rightX}\" y=\"${footerY1}\" font-size=\"22\" fill=\"#e5e7eb\" text-anchor=\"end\">Explore the interactive shell at:</text>
    <text x=\"${rightX}\" y=\"${footerY2}\" font-size=\"26\" fill=\"#facc15\" font-weight=\"700\" text-anchor=\"end\">${escXml(cfg.url)}</text>
  </g>
</svg>`;

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  const outPath = path.join(root, 'public', 'social-preview.png');
  await writeFile(outPath, png);

  const meta = await sharp(png).metadata();
  const bytes = png.length.toLocaleString();
  console.log(`Generated public/social-preview.png (${meta.width}x${meta.height}, ${bytes} bytes)`);
}

main().catch((err) => {
  console.error('Failed to generate social preview:', err);
  process.exitCode = 1;
});
