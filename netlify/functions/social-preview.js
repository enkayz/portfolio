const sharp = require('sharp');

const WIDTH = 1200;
const HEIGHT = 600;
const DEFAULT_TITLE = 'Dylan Boekelman – Systems & DevOps Engineer';

const escapeForXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const createSvg = (title) => `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#03111c" />
        <stop offset="40%" stop-color="#0b2a36" />
        <stop offset="100%" stop-color="#051721" />
      </linearGradient>
      <linearGradient id="frame" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#19c2c2" stop-opacity="0.8" />
        <stop offset="50%" stop-color="#12ffba" stop-opacity="0.6" />
        <stop offset="100%" stop-color="#19c2c2" stop-opacity="0.8" />
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <rect width="100%" height="100%" fill="url(#bg)" />
    <rect x="36" y="32" width="${WIDTH - 72}" height="${HEIGHT - 64}" rx="20" ry="20" fill="none" stroke="url(#frame)" stroke-width="4" opacity="0.85" />
    <rect x="52" y="48" width="${WIDTH - 104}" height="${HEIGHT - 96}" rx="18" ry="18" fill="#06131c" stroke="#0bd8c7" stroke-width="2" opacity="0.35" />

    <g filter="url(#glow)">
      <text x="70" y="220" fill="#dbff00" font-family="'IBM Plex Mono', 'SFMono-Regular', 'Consolas', monospace" font-size="56" font-weight="700" letter-spacing="1">
        SYSTEM8 // SOCIAL PREVIEW
      </text>
      <text x="70" y="300" fill="#a7ffeb" font-family="'Inter', 'Segoe UI', sans-serif" font-size="44" font-weight="600">${escapeForXml(title)}</text>
      <text x="70" y="360" fill="#7cd7ff" font-family="'Inter', 'Segoe UI', sans-serif" font-size="32" font-weight="500">Dylan Boekelman</text>
      <text x="70" y="408" fill="#c5d7e2" font-family="'Inter', 'Segoe UI', sans-serif" font-size="26" font-weight="400">Systems &amp; DevOps Engineer · Telephony &amp; Audio-Visual Technologist</text>
    </g>

    <g transform="translate(${WIDTH - 470}, ${HEIGHT - 180})">
      <rect width="380" height="110" rx="14" ry="14" fill="#08252f" stroke="#19c2c2" stroke-width="2" opacity="0.75" />
      <text x="26" y="48" fill="#7cd7ff" font-family="'IBM Plex Mono', 'SFMono-Regular', 'Consolas', monospace" font-size="26">Access the interactive shell</text>
      <text x="26" y="80" fill="#dbff00" font-family="'IBM Plex Mono', 'SFMono-Regular', 'Consolas', monospace" font-size="30" font-weight="700">www.system8.com.au</text>
    </g>

    <circle cx="${WIDTH - 140}" cy="140" r="70" fill="none" stroke="#19c2c2" stroke-width="3" opacity="0.5" />
    <circle cx="${WIDTH - 140}" cy="140" r="48" fill="none" stroke="#12ffba" stroke-width="2" opacity="0.8" />
    <circle cx="${WIDTH - 140}" cy="140" r="18" fill="#12ffba" opacity="0.9" />
  </svg>
`;

exports.handler = async (event) => {
  const titleParam = event?.queryStringParameters?.title;
  const title = (titleParam && titleParam.trim().slice(0, 140)) || DEFAULT_TITLE;

  try {
    const svg = createSvg(title);
    const imageBuffer = await sharp(Buffer.from(svg))
      .resize(WIDTH, HEIGHT)
      .png()
      .toBuffer();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': imageBuffer.length.toString(),
        'Cache-Control': 'public, max-age=300',
      },
      body: imageBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Failed to generate social preview image', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
      body: 'Unable to generate social preview image.',
    };
  }
};
