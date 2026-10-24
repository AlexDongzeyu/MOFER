import assert from "node:assert/strict";
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { prepareFonts } from "./prepare-fonts.mjs";

const root = path.resolve(import.meta.dirname, "..");
const output = path.join(root, "dist");
const entries = ["index.html", "about.html", "collections.html", "exhibitions.html", "contact.html", "404.html", "styles.css", "script.js", "assets", "_headers", "_redirects"];

for (const entry of entries) {
  await stat(path.join(root, entry));
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const entry of entries) {
  await cp(path.join(root, entry), path.join(output, entry), {
    recursive: true,
    filter: (source) => source !== path.join(root, "assets/fonts")
  });
}
await prepareFonts(output);

const media = JSON.parse(await readFile(path.join(root, "assets", "gallery", "manifest.json"), "utf8"));
const { strings, collections } = JSON.parse(await readFile(path.join(root, "assets", "i18n", "en.json"), "utf8"));
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const gallery = [["posters", "media.posters"], ["tokyo", "media.tokyoGroup"], ["archive", "media.archive"], ["community", "media.community"]].map(([category, key]) => `
      <section class="photo-section" data-gallery-panel id="${category}" aria-labelledby="${category}-title">
        <h3 id="${category}-title" data-i18n="${key}">${escape(strings[key])}</h3>
        <div class="gallery-grid photo-grid">
          ${media.filter((item) => item.category === category).map((item) => `<figure>
            <a class="gallery-original" href="assets/gallery/${item.id}.jpg"><img src="assets/gallery/${item.id}-thumb.webp" data-full-src="assets/gallery/${item.id}.jpg" loading="lazy" decoding="async" alt="${escape(strings[`photo.${item.id}`])}" data-i18n-alt="photo.${item.id}"></a>
            <figcaption><span data-i18n="photo.${item.id}">${escape(strings[`photo.${item.id}`])}</span></figcaption>
          </figure>`).join("\n          ")}
        </div>
      </section>`).join("\n");
const galleryPath = path.join(output, "collections.html");
let collectionPage = (await readFile(galleryPath, "utf8")).replace("<!-- GALLERY_CONTENT -->", gallery);
for (const field of ["type", "title", "summary", "date", "place", "context", "look"]) {
  collectionPage = collectionPage.replace(`<!-- DETAIL_${field.toUpperCase()} -->`, escape(collections[0][field]));
}
const fallback = collections.map((item) => `<a class="collection-card" href="${escape(item.image)}">
  <span class="artifact-mount"><img src="${escape(item.image)}" alt="${escape(item.title)}" decoding="async"></span>
  <div class="collection-card__copy"><h3>${escape(item.title)}</h3><span>${escape(item.type)}</span></div>
</a>`).join("\n");
collectionPage = collectionPage.replace("<!-- COLLECTION_FALLBACK -->", fallback);
await writeFile(galleryPath, collectionPage);

let fileCount = 0;
let totalBytes = 0;
for (const entry of await readdir(output, { recursive: true })) {
  const info = await stat(path.join(output, entry));
  if (!info.isFile()) continue;
  assert(info.size <= 25 * 1024 * 1024, `${entry} exceeds Cloudflare Pages' 25 MiB asset limit`);
  fileCount += 1;
  totalBytes += info.size;
}
console.log(`Built ${fileCount} static files (${(totalBytes / 1024 / 1024).toFixed(2)} MiB) in dist/.`);