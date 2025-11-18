const path = require('node:path');
const sharp = require('sharp');

const previewPath = path.join(__dirname, '..', '..', 'social_preview.png');

exports.handler = async () => {
  try {
    const imageBuffer = await sharp(previewPath).png().toBuffer();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': imageBuffer.length.toString(),
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
