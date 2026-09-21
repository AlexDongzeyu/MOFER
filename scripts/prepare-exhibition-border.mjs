import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const root = path.resolve(import.meta.dirname, "..");
const source = await readFile(path.join(root, "assets/collections/extended/madame-chiang-letter-children.jpg"));
const browser = await chromium.launch();

try {
  const page = await browser.newPage();
  const result = await page.evaluate(async (sourceUrl) => {
    const image = new Image();
    image.src = sourceUrl;
    await image.decode();
    const crop = { left: image.naturalWidth * .06, top: image.naturalHeight * .967, width: image.naturalWidth * .88, height: image.naturalHeight * .027 };
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = Math.round(crop.height / crop.width * canvas.width);
    const context = canvas.getContext("2d");
    context.drawImage(image, crop.left, crop.top, crop.width, crop.height, 0, 0, canvas.width, canvas.height);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    let visible = 0;
    for (let offset = 0; offset < pixels.data.length; offset += 4) {
      const horizontal = (offset / 4) % canvas.width;
      const vertical = Math.floor(offset / 4 / canvas.width);
      const horizontalFade = Math.min(1, horizontal / 220, (canvas.width - 1 - horizontal) / 220) ** 2;
      const verticalFade = Math.min(1, vertical / 12, (canvas.height - 1 - vertical) / 12) ** 2;
      const ink = Math.min(pixels.data[offset + 1] - pixels.data[offset] * .55, pixels.data[offset] - pixels.data[offset + 2] * 1.25);
      const alpha = Math.max(0, Math.min(255, (ink - 8) * 6)) * horizontalFade * verticalFade;
      pixels.data[offset] = 255;
      pixels.data[offset + 1] = 255;
      pixels.data[offset + 2] = 255;
      pixels.data[offset + 3] = alpha;
      if (alpha > 40) visible += 1;
    }
    context.putImageData(pixels, 0, 0);
    return { image: canvas.toDataURL("image/png"), width: canvas.width, height: canvas.height, coverage: visible / (canvas.width * canvas.height) };
  }, `data:image/jpeg;base64,${source.toString("base64")}`);
  assert(result.coverage > .02 && result.coverage < .4, "The feathered border must remain visible without a solid backdrop");
  await mkdir(path.join(root, "assets/textures"), { recursive: true });
  const output = Buffer.from(result.image.split(",")[1], "base64");
  await writeFile(path.join(root, "assets/textures/exhibition-border.png"), output);
  console.log(`Generated ${result.width} x ${result.height} feathered border (${output.length} bytes; ${(result.coverage * 100).toFixed(1)}% ink coverage).`);
} finally {
  await browser.close();
}