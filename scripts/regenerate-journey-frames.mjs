/**
 * Regenerate the ExplodedJourney scroll frames at higher resolution.
 *
 * The committed frames are 1024x576 JPEGs that the canvas stretches to
 * ~1500-2200 device pixels, which is why the section looks soft. There is no
 * higher-resolution source in the repo, so this script performs an offline
 * lanczos3 upscale to 1920x1080 with mild unsharp masking. That replaces the
 * browser's bilinear on-the-fly upscale with a much better precomputed result.
 * Originals remain recoverable from git history (commit 3cf451e).
 *
 * Requires sharp (one-off: `npm install --no-save sharp`).
 *
 * Usage:  node scripts/regenerate-journey-frames.mjs [quality=80]
 */
import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const FRAMES_DIR = fileURLToPath(new URL('../public/journey/frames/', import.meta.url));
const TARGET = { width: 1920, height: 1080 };
const QUALITY = Number(process.argv[2]) || 80;

const files = (await readdir(FRAMES_DIR)).filter((name) => name.endsWith('.jpg')).sort();
if (files.length === 0) {
  console.error(`No frames found in ${FRAMES_DIR}`);
  process.exit(1);
}

let totalBefore = 0;
let totalAfter = 0;
const skipped = [];
const startedAt = Date.now();

for (const file of files) {
  const path = join(FRAMES_DIR, file);
  // Read first: sharp keeps the file mapped on Windows and blocks an in-place write.
  const input = await readFile(path);
  const { width, height } = await sharp(input).metadata();

  // Frames must be 16:9 like the target; anything else would be distorted.
  if (Math.abs(width / height - TARGET.width / TARGET.height) > 0.01) {
    skipped.push(`${file} (${width}x${height})`);
    continue;
  }

  totalBefore += (await stat(path)).size;

  const output = await sharp(input)
    .resize(TARGET.width, TARGET.height, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 1.8 }).modulate({ brightness: 1.06 })
    .jpeg({ quality: QUALITY, mozjpeg: true, chromaSubsampling: '4:2:0' })
    .toBuffer();
  await writeFile(path, output);

  totalAfter += output.length;
}

const seconds = ((Date.now() - startedAt) / 1000).toFixed(1);
console.log(`Regenerated ${files.length - skipped.length} frames at ${TARGET.width}x${TARGET.height} (q${QUALITY}) in ${seconds}s`);
console.log(`Total size: ${(totalBefore / 1024 / 1024).toFixed(1)} MB -> ${(totalAfter / 1024 / 1024).toFixed(1)} MB (avg ${(totalAfter / (files.length - skipped.length) / 1024).toFixed(0)} KB/frame)`);
if (skipped.length > 0) console.warn(`Skipped non-16:9 frames: ${skipped.join(', ')}`);
