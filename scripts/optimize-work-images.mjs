// Pre-generates right-sized derivatives of the very tall project screenshots so the runtime
// image optimizer never has to decode 10,000px-tall sources. Run: node scripts/optimize-work-images.mjs
import sharp from "sharp";
import fs from "node:fs";

const SOURCES = { "adventure-gene": "cwh--1.jpg", "car-dealer": "cwh--2.jpg", "home-press": "cwh--3.jpg", eduma: "cwh--4.jpg", fitwell: "cwh--5.png" };
const dims = {};
for (const [slug, file] of Object.entries(SOURCES)) {
  const src = `public/legacy/${file}`;
  const meta = await sharp(src, { limitInputPixels: false }).metadata();
  // Card / hero crop: top of the page, 1600 x 1600 (covers every object-top crop used on the site)
  await sharp(src, { limitInputPixels: false }).resize({ width: 1600 }).extract({ left: 0, top: 0, width: 1600, height: 1600 }).webp({ quality: 80 }).toFile(`public/work/${slug}-card.webp`);
  // Full page for the scroll-pan viewer
  const full = await sharp(src, { limitInputPixels: false }).resize({ width: 1200 }).webp({ quality: 76 }).toBuffer({ resolveWithObject: true });
  fs.writeFileSync(`public/work/${slug}-full.webp`, full.data);
  dims[`/work/${slug}-card.webp`] = [1600, 1600];
  dims[`/work/${slug}-full.webp`] = [full.info.width, full.info.height];
  console.log(slug, `${meta.width}x${meta.height}`, "->", `card ${(fs.statSync(`public/work/${slug}-card.webp`).size / 1024) | 0}KB`, `full ${full.info.width}x${full.info.height} ${(full.data.length / 1024) | 0}KB`);
}
const path = "src/content/image-dims.json";
const all = { ...JSON.parse(fs.readFileSync(path, "utf8")), ...dims };
fs.writeFileSync(path, JSON.stringify(all, null, 1));
