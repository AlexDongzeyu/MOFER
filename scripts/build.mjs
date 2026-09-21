import assert from "node:assert/strict";
import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { prepareFonts } from "./prepare-fonts.mjs";

const root = path.resolve(import.meta.dirname, "..");
const output = path.join(root, "dist");
const entries = ["index.html", "about.html", "collections.html", "exhibitions.html", "research.html", "contact.html", "404.html", "styles.css", "script.js", "assets", "_headers"];

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