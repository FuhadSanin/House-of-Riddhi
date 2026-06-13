/**
 * Compress + convert every image under public/generated/ (all subfolders) to WebP.
 * Target: ≤ 200 KB per file. Output stays beside the source file.
 * Run:  node scripts/optimise-images.mjs
 */

import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, basename, dirname } from "path";

const INPUT_ROOT = new URL("../public/generated/", import.meta.url).pathname.replace(/%20/g, " ");
const MAX_BYTES  = 200 * 1024;
const EXTS       = new Set([".png", ".jpg", ".jpeg", ".webp"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) files.push(...await walk(p));
    else if (EXTS.has(extname(e.name).toLowerCase())) files.push(p);
  }
  return files;
}

async function optimise(filePath) {
  const ext  = extname(filePath).toLowerCase();
  const name = basename(filePath, ext);
  const dir  = dirname(filePath);
  const out  = join(dir, `${name}.webp`);

  if (ext === ".webp") {
    const { size } = await stat(filePath);
    if (size <= MAX_BYTES) {
      console.log(`  ✓ skip  ${filePath.replace(INPUT_ROOT, "")}  (${kb(size)} KB)`);
      return;
    }
  }

  let lo = 20, hi = 90, bestBuf = null;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const buf = await sharp(filePath)
      .webp({ quality: mid, effort: 4 })
      .toBuffer();
    if (buf.byteLength <= MAX_BYTES) {
      bestBuf = buf;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  if (!bestBuf) {
    const meta = await sharp(filePath).metadata();
    let width = meta.width;
    while (!bestBuf && width > 100) {
      width = Math.floor(width * 0.8);
      const buf = await sharp(filePath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 20, effort: 4 })
        .toBuffer();
      if (buf.byteLength <= MAX_BYTES) bestBuf = buf;
    }
  }

  if (!bestBuf) {
    console.warn(`  ✗ SKIP  ${filePath} — could not reach target size`);
    return;
  }

  const { writeFile } = await import("fs/promises");
  await writeFile(out, bestBuf);

  const srcStat = await stat(filePath);
  console.log(
    `  ✓ done  ${filePath.replace(INPUT_ROOT, "")}  →  ${basename(out)}` +
    `  (${kb(srcStat.size)} KB → ${kb(bestBuf.byteLength)} KB)`
  );
}

function kb(bytes) {
  return (bytes / 1024).toFixed(1);
}

const files = await walk(INPUT_ROOT);

console.log(`\nOptimising ${files.length} image(s) under public/generated/\n`);
for (const f of files) await optimise(f);
console.log("\nDone.\n");
