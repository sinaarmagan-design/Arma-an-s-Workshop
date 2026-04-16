#!/usr/bin/env node
/**
 * Remove image background and replace with white.
 *
 * Usage:
 *   node scripts/remove-bg.js <image-path> [output-path]
 *   npm run remove-bg -- public/images/goyard.webp
 *
 * Output defaults to <input-name>_white.png in the same directory.
 * Pass --transparent to keep a transparent background instead of white.
 */

const { removeBackground } = require("@imgly/background-removal-node");
const fs = require("fs");
const path = require("path");

async function main() {
  const args = process.argv.slice(2);
  const transparent = args.includes("--transparent");
  const files = args.filter((a) => !a.startsWith("--"));

  if (files.length === 0) {
    console.error(
      "Usage: node scripts/remove-bg.js [--transparent] <image-path> [output-path]"
    );
    process.exit(1);
  }

  const inputPath = path.resolve(files[0]);
  if (!fs.existsSync(inputPath)) {
    console.error("File not found:", inputPath);
    process.exit(1);
  }

  const defaultOutput = inputPath.replace(/\.[^.]+$/, "_white.png");
  const outputPath = path.resolve(files[1] ?? defaultOutput);

  console.log("Processing:", inputPath);
  console.log("Output:    ", outputPath);

  // removeBackground accepts a file path (Node) or URL
  const blob = await removeBackground(inputPath);
  const buffer = Buffer.from(await blob.arrayBuffer());

  if (transparent) {
    // Just save the PNG with transparency as-is
    fs.writeFileSync(outputPath, buffer);
    console.log("Done (transparent background):", outputPath);
    return;
  }

  // Composite onto a white background using built-in canvas
  // We use the Sharp-free approach via raw PNG decode with the "sharp" optional
  // dep, falling back to a pure-JS approach with the "pngjs" package if available,
  // or simply saving the transparent PNG if neither is present.
  try {
    // Try sharp first (fastest)
    const sharp = require("sharp");
    const { width, height } = await sharp(buffer).metadata();
    const whiteBg = await sharp({
      create: {
        width,
        height,
        channels: 3,
        background: { r: 255, g: 255, b: 255 },
      },
    })
      .png()
      .toBuffer();

    const result = await sharp(whiteBg).composite([{ input: buffer }]).toBuffer();
    fs.writeFileSync(outputPath, result);
    console.log("Done (white background via sharp):", outputPath);
    return;
  } catch {
    // sharp not available — try pngjs
  }

  try {
    const { PNG } = require("pngjs");
    const src = PNG.sync.read(buffer);
    const dst = new PNG({ width: src.width, height: src.height });
    // Fill with white
    dst.data.fill(255);
    // Alpha-composite src over white
    for (let i = 0; i < src.data.length; i += 4) {
      const a = src.data[i + 3] / 255;
      dst.data[i] = Math.round(src.data[i] * a + 255 * (1 - a));
      dst.data[i + 1] = Math.round(src.data[i + 1] * a + 255 * (1 - a));
      dst.data[i + 2] = Math.round(src.data[i + 2] * a + 255 * (1 - a));
      dst.data[i + 3] = 255;
    }
    fs.writeFileSync(outputPath, PNG.sync.write(dst));
    console.log("Done (white background via pngjs):", outputPath);
    return;
  } catch {
    // pngjs not available either — save transparent PNG
  }

  // Fallback: save transparent PNG (works fine on white backgrounds in the browser)
  const fallbackPath = outputPath.replace(/_white\.png$/, "_transparent.png");
  fs.writeFileSync(fallbackPath, buffer);
  console.log(
    "Note: neither sharp nor pngjs found — saved transparent PNG instead:",
    fallbackPath
  );
  console.log(
    'Install one of them with: npm install --save-dev sharp   or   npm install --save-dev pngjs'
  );
}

main().catch((err) => {
  console.error("Error:", err.message ?? err);
  process.exit(1);
});
