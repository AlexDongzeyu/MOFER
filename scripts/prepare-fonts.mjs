import assert from "node:assert/strict";
import { cp, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const families = [
  "bodoni-moda",
  "source-serif-4",
  "source-sans-3",
  "noto-serif-sc",
  "noto-sans-sc",
  "noto-serif-tc",
  "noto-sans-tc",
  "noto-serif-jp",
  "noto-sans-jp"
];

export async function prepareFonts(output) {
  const packages = path.resolve(import.meta.dirname, "../node_modules/@fontsource-variable");
  for (const family of families) {
    const source = path.join(packages, family);
    const destination = path.join(output, "assets/fonts", family);
    await mkdir(path.join(destination, "files"), { recursive: true });
    await cp(path.join(source, "index.css"), path.join(destination, "index.css"));
    await cp(path.join(source, "LICENSE"), path.join(destination, "LICENSE.txt"));
    const files = (await readdir(path.join(source, "files"))).filter((file) => file.endsWith("-wght-normal.woff2"));
    assert(files.length > 0, `No normal variable font files found for ${family}`);
    for (const file of files) {
      await cp(path.join(source, "files", file), path.join(destination, "files", file));
    }
  }
}