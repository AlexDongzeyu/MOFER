import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const root = path.resolve(import.meta.dirname, "..");
const source = await readFile(path.join(root, "assets/collections/pearl-buck-letter.jpg"));
const browser = await chromium.launch();

try {
  const page = await browser.newPage();
  const imageData = await page.evaluate(async (sourceUrl) => {
    const image = new Image();
    image.src = sourceUrl;
    await image.decode();
    const sample = document.createElement("canvas");
    sample.width = 384;
    sample.height = 144;
    const sampleContext = sample.getContext("2d");
    sampleContext.drawImage(image, 720, 1360, 384, 144, 0, 0, 384, 144);
    const pixels = sampleContext.getImageData(0, 0, sample.width, sample.height);
    const blurred = document.createElement("canvas");
    blurred.width = sample.width + 64;
    blurred.height = sample.height + 64;
    const blurredContext = blurred.getContext("2d");
    blurredContext.filter = "blur(8px)";
    blurredContext.drawImage(image, 688, 1328, blurred.width, blurred.height, 0, 0, blurred.width, blurred.height);
    const lighting = blurredContext.getImageData(32, 32, sample.width, sample.height).data;
    for (let offset = 0; offset < pixels.data.length; offset += 4) {
      const luminance = (pixels.data[offset] + pixels.data[offset + 1] + pixels.data[offset + 2]) / 3;
      const localLighting = (lighting[offset] + lighting[offset + 1] + lighting[offset + 2]) / 3;
      const shade = Math.max(118, Math.min(138, 128 + (luminance - localLighting) * 2));
      pixels.data[offset] = shade;
      pixels.data[offset + 1] = shade;
      pixels.data[offset + 2] = shade;
    }
    sampleContext.putImageData(pixels, 0, 0);
    const tile = document.createElement("canvas");
    tile.width = sample.width * 2;
    tile.height = sample.height * 2;
    const tileContext = tile.getContext("2d");
    for (const horizontal of [1, -1]) {
      for (const vertical of [1, -1]) {
        tileContext.save();
        tileContext.translate(horizontal < 0 ? tile.width : 0, vertical < 0 ? tile.height : 0);
        tileContext.scale(horizontal, vertical);
        tileContext.drawImage(sample, 0, 0);
        tileContext.restore();
      }
    }
    return tile.toDataURL("image/png");
  }, `data:image/jpeg;base64,${source.toString("base64")}`);
  const output = Buffer.from(imageData.split(",")[1], "base64");
  assert(output.length > 1000, "Texture output is unexpectedly empty");
  await mkdir(path.join(root, "assets/textures"), { recursive: true });
  await writeFile(path.join(root, "assets/textures/archive-paper.png"), output);
  console.log(`Generated 768 x 288 paper grain from the letter's blank margin (${output.length} bytes).`);
} finally {
  await browser.close();
}