import { test, expect } from "@playwright/test";

test("the original paper pattern is unmasked across the page and chrome", async ({ page }) => {
  await page.route("https://www.google.com/maps?**", (route) => route.fulfill({ contentType: "text/html", body: "<title>Map fixture</title>" }));
  for (const route of ["/", "/about", "/collections", "/exhibitions", "/contact"]) {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
    const pattern = await page.locator("body").evaluate((body) => {
      const style = getComputedStyle(body);
      return { image: style.backgroundImage, blend: style.backgroundBlendMode, size: style.backgroundSize };
    });
    expect(pattern.image).toContain("archive-paper.png");
    expect(pattern.image).not.toContain("gradient");
    expect(pattern.blend).toBe("soft-light");
    expect(pattern.size).toBe("768px 288px");
    for (const selector of [".site-header", ".site-footer"]) {
      expect(await page.locator(selector).evaluate((element) => getComputedStyle(element).backgroundImage)).toContain("archive-paper.png");
    }
    if (["/", "/exhibitions"].includes(route)) {
      expect(await page.locator(".exhibition").evaluate((element) => getComputedStyle(element).backgroundImage)).toContain("archive-paper.png");
    }
  }
});

test("rendered grain is visibly stronger than the masked version without losing contrast", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
  await page.addStyleTag({ content: "body > * { visibility: hidden !important; }" });
  const options = { clip: { x: 0, y: 0, width: 256, height: 144 }, animations: "disabled" };
  const restored = await page.screenshot(options);
  await page.locator("body").evaluate((body) => {
    body.style.backgroundImage = 'linear-gradient(rgb(16 26 36 / 78%), rgb(16 26 36 / 78%)), url("/assets/textures/archive-paper.png")';
    body.style.backgroundSize = "auto, 768px 288px";
    body.style.backgroundBlendMode = "normal, soft-light";
  });
  const masked = await page.screenshot(options);
  const measurements = await page.evaluate(async ({ restored, masked }) => {
    function luminance(channels) {
      const [red, green, blue] = channels.map((channel) => {
        const value = channel / 255;
        return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
      });
      return red * .2126 + green * .7152 + blue * .0722;
    }
    async function measure(encoded) {
      const image = new Image();
      image.src = `data:image/png;base64,${encoded}`;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      const values = [];
      let brightest = 0;
      for (let index = 0; index < pixels.length; index += 4) {
        const channels = [pixels[index], pixels[index + 1], pixels[index + 2]];
        values.push(channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722);
        brightest = Math.max(brightest, luminance(channels));
      }
      const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
      return { deviation: Math.sqrt(values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length), brightest };
    }
    const after = await measure(restored);
    const before = await measure(masked);
    const muted = getComputedStyle(document.documentElement).getPropertyValue("--muted").trim();
    const foreground = luminance([1, 3, 5].map((index) => parseInt(muted.slice(index, index + 2), 16)));
    return { gain: after.deviation / before.deviation, deviation: after.deviation, contrast: (foreground + .05) / (after.brightest + .05) };
  }, { restored: restored.toString("base64"), masked: masked.toString("base64") });
  expect(measurements.gain).toBeGreaterThan(3);
  expect(measurements.deviation).toBeGreaterThan(1);
  expect(measurements.contrast).toBeGreaterThanOrEqual(4.5);
});
