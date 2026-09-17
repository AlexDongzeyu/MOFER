import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const origin = "https://mofer.org";
const root = path.resolve(import.meta.dirname, "..");
const routes = new Set(["index.html", "collections.html", "exhibitions.html"]);
const resources = new Set();
const pages = [];
const browser = await chromium.launch();

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();

  for (const route of routes) {
    const response = await page.goto(`${origin}/${route}`, { waitUntil: "load" });
    assert.equal(response.status(), 200, `Unable to load ${route}`);
    await page.locator("[data-language-toggle]").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.locator("[data-language-toggle]").click();
    assert.equal(await page.locator("html").getAttribute("lang"), "en");

    const record = await page.evaluate(() => ({
      title: document.title,
      links: Array.from(document.querySelectorAll("a[href]"), (element) => element.href),
      resources: [
        ...Array.from(document.querySelectorAll("script[src], img[src], video[src], source[src]"), (element) => element.src),
        ...Array.from(document.querySelectorAll("link[href]"), (element) => element.href),
        ...Array.from(document.querySelectorAll("video[poster]"), (element) => element.poster),
        ...performance.getEntriesByType("resource").map((entry) => entry.name)
      ],
      collectionCount: document.querySelectorAll(".collection-card").length,
      pathwayCount: document.querySelectorAll(".pathway-card").length,
      hasVideo: Boolean(document.querySelector("[data-hero-video]"))
    }));

    for (const link of record.links) {
      const url = new URL(link);
      if (url.origin === origin && (url.pathname.endsWith(".html") || url.pathname === "/")) {
        routes.add(url.pathname === "/" ? "index.html" : url.pathname.slice(1));
      }
    }
    resources.add(`${origin}/${route}`);
    for (const resource of record.resources) {
      const url = new URL(resource);
      if (url.origin === origin) {
        url.hash = "";
        resources.add(url.href);
      }
    }
    pages.push({ route, ...record, resources: undefined });
    console.log(`Discovered ${route}: ${record.collectionCount} collections, ${record.pathwayCount} pathways`);
  }
} finally {
  await browser.close();
}

const files = [];
for (const resource of [...resources].sort()) {
  const url = new URL(resource);
  const relativePath = decodeURIComponent(url.pathname.slice(1));
  const destination = path.resolve(root, relativePath);
  assert(destination.startsWith(root + path.sep), `Unsafe resource path: ${relativePath}`);
  const response = await fetch(resource, { signal: AbortSignal.timeout(60_000) });
  assert(response.ok, `Download failed: ${resource} (${response.status})`);
  const data = Buffer.from(await response.arrayBuffer());
  assert(data.length > 0, `Empty resource: ${resource}`);
  assert(data.length <= 25 * 1024 * 1024, `Asset exceeds Cloudflare Pages limit: ${relativePath}`);
  let existing;
  try {
    existing = await readFile(destination);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  if (existing) {
    assert(existing.equals(data), `Refusing to overwrite modified local file: ${relativePath}`);
  } else {
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, data);
  }
  if ([".html", ".css", ".js"].includes(path.extname(relativePath))) {
    const referencePath = path.join(root, "recovery", "reference", "source", relativePath);
    await mkdir(path.dirname(referencePath), { recursive: true });
    await writeFile(referencePath, data);
  }
  files.push({
    source: resource,
    path: relativePath,
    bytes: data.length,
    contentType: response.headers.get("content-type"),
    sha256: createHash("sha256").update(data).digest("hex")
  });
  console.log(`Recovered ${relativePath} (${data.length} bytes)`);
}

const manifest = {
  origin,
  capturedAt: new Date().toISOString(),
  pages,
  files,
  totals: { pages: pages.length, resources: resources.size, recovered: files.length, missing: resources.size - files.length }
};
await mkdir(path.join(root, "recovery"), { recursive: true });
await writeFile(path.join(root, "recovery", "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(JSON.stringify(manifest.totals));