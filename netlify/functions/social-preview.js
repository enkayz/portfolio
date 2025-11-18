import { readFile } from 'node:fs/promises';
import path from 'node:path';

const previewPath = path.join(process.cwd(), 'social_preview.png');

export const handler = async () => {
  try {
    const imageBuffer = await readFile(previewPath);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
      body: imageBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Failed to load social preview image', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
      body: 'Unable to generate social preview image.',
    };
  }
};
