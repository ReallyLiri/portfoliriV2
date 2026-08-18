#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const GALLERIES_PATH = path.join(ROOT, "src/Content/galleries.js");
const PUBLIC_DIR = path.join(ROOT, "public");
const PREVIEW_SIZE = 720;

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif"]);

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function loadGalleries(text) {
  const match = text.match(/export const GALLERIES = ([\s\S]*);\s*$/);
  if (!match) {
    throw new Error("Could not locate GALLERIES object in galleries.js");
  }
  return (0, eval)("(" + match[1] + ")");
}

function previewSrcFor(src) {
  const ext = path.extname(src);
  const base = src.slice(0, -ext.length);
  return `${base}-preview${ext}`;
}

async function generatePreviewFile(src, previewSrc) {
  const inputPath = path.join(PUBLIC_DIR, src.replace(/^\.\//, ""));
  const outputPath = path.join(PUBLIC_DIR, previewSrc.replace(/^\.\//, ""));

  if (!fs.existsSync(inputPath)) {
    console.warn(`Skipping missing source image: ${src}`);
    return false;
  }

  try {
    const image = sharp(inputPath);
    const { width, height } = await image.metadata();
    const resizeOptions =
      width >= height ? { width: PREVIEW_SIZE } : { height: PREVIEW_SIZE };

    await image.resize(resizeOptions).toFile(outputPath);
    return true;
  } catch (err) {
    console.warn(`Skipping unreadable source image ${src}: ${err.message}`);
    return false;
  }
}

async function main() {
  const originalText = fs.readFileSync(GALLERIES_PATH, "utf8");
  const galleries = loadGalleries(originalText);

  let updatedText = originalText;
  let generatedCount = 0;
  let migratedCount = 0;

  for (const [name, gallery] of Object.entries(galleries)) {
    if (!gallery.rowHeight || !Array.isArray(gallery.images)) {
      continue;
    }

    for (const image of gallery.images) {
      const alreadyMigrated = !!image.full;
      const originalSrc = image.full || image.src;
      const ext = path.extname(originalSrc).toLowerCase();
      if (!IMAGE_EXTENSIONS.has(ext)) {
        continue;
      }

      const previewSrc = alreadyMigrated
        ? image.src
        : previewSrcFor(originalSrc);

      const created = await generatePreviewFile(originalSrc, previewSrc);
      if (created) {
        generatedCount++;
        console.log(`Generated preview for ${name}: ${previewSrc}`);
      }
      if (!created && !alreadyMigrated) {
        continue;
      }

      if (!alreadyMigrated) {
        const srcFieldPattern = new RegExp(
          `src: "${escapeRegExp(originalSrc)}",`,
        );
        if (srcFieldPattern.test(updatedText)) {
          updatedText = updatedText.replace(
            srcFieldPattern,
            `src: "${previewSrc}", full: "${originalSrc}",`,
          );
          migratedCount++;
        }
      }
    }
  }

  if (updatedText !== originalText) {
    fs.writeFileSync(GALLERIES_PATH, updatedText);
  }

  console.log(
    `Done. Generated/refreshed ${generatedCount} preview file(s) at ${PREVIEW_SIZE}px, migrated ${migratedCount} image entr${
      migratedCount === 1 ? "y" : "ies"
    } in galleries.js.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
