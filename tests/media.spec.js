import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync(new URL("../assets/gallery/manifest.json", import.meta.url), "utf8"));
const locales = ["en", "zh-Hans", "zh-Hant", "fr", "ja"];

test.beforeEach(async ({ page }) => {
  await page.route("https://www.google.com/maps?**", (route) => route.fulfill({ contentType: "text/html", body: "<title>Map fixture</title>" }));
});

test("both exhibition posters, accurate hours, gallery links and the venue map remain available", async ({ page }) => {
  for (const route of ["/", "/exhibitions"]) {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
    await expect(page.locator("[data-poster]")).toHaveCount(2);
    for (const poster of await page.locator("[data-poster]").all()) {
      await poster.scrollIntoViewIfNeeded();
      await expect(poster).toHaveCSS("object-fit", "contain");
      await expect.poll(() => poster.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
      const ratio = await poster.evaluate((image) => {
        const bounds = image.getBoundingClientRect();
        return Math.abs(bounds.width / bounds.height - image.naturalWidth / image.naturalHeight);
      });
      expect(ratio).toBeLessThan(.01);
    }
    await expect(page.locator("[data-i18n='media.dates']")).toContainText("October 6–11, 2026");
    await expect(page.locator("[data-i18n='media.hoursEarly']")).toContainText("10:30 am–6:00 pm");
    await expect(page.locator("[data-i18n='media.hoursLate']")).toContainText("10:30 am–7:30 pm");
    await expect(page.locator("[data-i18n='exhibition.summary']")).toContainText("2025");
    await expect(page.locator("[data-venue-map]")).toHaveCount(1);
    await page.locator("[data-i18n='media.visit']").click();
    await expect(page).toHaveURL(/#venue$/);
    await expect(page.locator(".venue-map")).toBeInViewport();
    await page.locator("[data-i18n='media.viewGallery']").first().click();
    await expect(page).toHaveURL(/collections(?:\.html)?#tokyo$/);
    await expect(page.locator("#tokyo")).toBeVisible();
  }
});

test("gallery includes every supplied photograph with full-size keyboard viewing", async ({ page, request }) => {
  await page.goto("/collections#gallery");
  await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
  const photos = page.locator(".photo-grid img");
  expect(manifest).toHaveLength(39);
  await expect(photos).toHaveCount(39);
  expect(new Set(await photos.evaluateAll((images) => images.map((image) => image.dataset.fullSrc))).size).toBe(39);
  for (const item of manifest) {
    for (const suffix of [".jpg", "-thumb.webp"]) {
      const response = await request.get(`/assets/gallery/${item.id}${suffix}`);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toMatch(/^image\//);
    }
  }
  const trigger = page.locator(".photo-grid [data-image-open]").first();
  await trigger.click();
  const viewer = page.locator("[data-image-viewer]");
  await expect(viewer).toBeVisible();
  await expect(viewer.locator("[data-viewer-image]")).toHaveAttribute("src", /tokyo-poster-01\.jpg$/);
  await expect.poll(() => viewer.locator("img").evaluate((image) => image.naturalWidth)).toBeGreaterThan(480);
  await page.keyboard.press("ArrowRight");
  await expect(viewer.locator("[data-viewer-counter]")).toHaveText("02 / 03");
  await viewer.locator("[data-viewer-zoom]").click();
  await expect(viewer).toHaveClass(/is-zoomed/);
  await page.keyboard.press("Escape");
  await expect(viewer).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("gallery and exhibition additions translate in all five languages", async ({ page }) => {
  for (const route of ["/collections#gallery", "/exhibitions"]) {
    await page.goto(route);
    for (const locale of locales) {
      await expect(page.locator("[data-language-select]")).toBeEnabled();
      await page.locator("[data-language-select]").selectOption(locale);
      await expect(page.locator("html")).toHaveAttribute("data-language-ready", locale);
      await expect(page.locator("[data-language-status]")).toBeHidden();
      const unresolved = await page.locator("[data-i18n]").evaluateAll((elements) => elements.filter((element) => element.textContent === element.dataset.i18n).map((element) => element.dataset.i18n));
      expect(unresolved).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
});

test("gallery provides ordinary full-image links without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto("/collections");
  await page.locator(".collection-gallery summary").click();
  await expect(page.locator(".gallery-original")).toHaveCount(39);
  await expect(page.locator("h1")).toHaveText("Collections");
  await expect(page.locator(".gallery-original").first()).toHaveAttribute("href", /tokyo-poster-01\.jpg$/);
  await context.close();
});

test("the four-scene film decodes throughout a short continuous loop", async ({ page }) => {
  await page.goto("/");
  const video = page.locator("[data-hero-video]");
  await expect(video).toHaveJSProperty("playbackRate", .85);
  await expect.poll(() => video.evaluate((element) => element.readyState)).toBeGreaterThanOrEqual(2);
  const duration = await video.evaluate((element) => element.duration);
  expect(duration).toBeGreaterThan(17.9);
  expect(duration).toBeLessThan(18.2);
  for (const time of [1, 6, 11, 16]) {
    await video.evaluate((element, time) => new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Film seek timed out")), 5000);
      element.addEventListener("seeked", () => { clearTimeout(timeout); resolve(); }, { once: true });
      element.currentTime = time;
    }), time);
    expect(await video.evaluate((element) => element.error)).toBeNull();
    expect(await video.evaluate((element) => element.videoWidth)).toBe(960);
    expect(await video.evaluate((element) => element.videoHeight)).toBe(540);
  }
});

test("large posters align with their content and follow the selected language", async ({ page }) => {
  for (const route of ["/", "/exhibitions"]) {
    await page.goto(route);
    for (const locale of locales) {
      await expect(page.locator("[data-language-select]")).toBeEnabled();
      await page.locator("[data-language-select]").selectOption(locale);
      await expect(page.locator("html")).toHaveAttribute("data-language-ready", locale);
      const poster = page.locator("[data-poster-en]");
      await poster.scrollIntoViewIfNeeded();
      await expect(poster).toHaveAttribute("src", locale.startsWith("zh-") ? "assets/gallery/boynton-visitors-01.jpg" : "assets/gallery/tokyo-poster-01.jpg");
      await poster.evaluate((image) => image.decode());
      await page.evaluate(() => document.fonts.ready);
      const rows = await page.locator(".poster-layout").evaluateAll((elements) => elements.map((row) => {
        const frame = row.querySelector(":scope > .image-open").getBoundingClientRect();
        const image = row.querySelector("[data-poster]").getBoundingClientRect();
        const copy = row.querySelector(":scope > div").getBoundingClientRect();
        return { width: image.width, available: row.clientWidth, frameBottom: frame.bottom, imageBottom: image.bottom, copyBottom: copy.bottom, desktop: innerWidth > 960 };
      }));
      for (const row of rows) {
        expect(row.width / row.available).toBeGreaterThan(row.desktop ? .4 : .85);
        if (row.desktop) {
          expect(Math.abs(row.frameBottom - row.copyBottom)).toBeLessThanOrEqual(2);
          expect(Math.abs(row.imageBottom - row.copyBottom)).toBeLessThanOrEqual(10);
        }
      }
      expect(await page.locator("[data-i18n]").allTextContents()).not.toEqual(expect.arrayContaining([expect.stringMatching(/[·•]/)]));
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
});

test("gallery belongs to Collections and retired pages redirect", async ({ page, request }) => {
  await page.goto("/collections");
  await expect(page.locator(".collection-gallery")).not.toHaveAttribute("open", "");
  await page.locator(".collection-gallery-link").click();
  await expect(page.locator(".collection-gallery")).toHaveAttribute("open", "");
  await expect(page.locator(".photo-grid img")).toHaveCount(39);
  await expect(page.locator(".primary-nav a")).toHaveCount(4);
  await expect(page.locator('a[href*="research"], a[href*="gallery.html"]')).toHaveCount(0);
  for (const route of ["/gallery", "/gallery.html"]) {
    const response = await request.get(route, { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(response.headers().location).toMatch(/collections#gallery$/);
  }
  for (const route of ["/research", "/research.html"]) {
    const response = await request.get(route, { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(response.headers().location).toMatch(/\/about$/);
  }
  await page.goto("/gallery");
  await expect(page).toHaveURL(/collections#gallery$/);
  await expect(page.locator(".collection-gallery")).toHaveAttribute("open", "");
});
