import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

const languages = ["en", "zh-Hans", "fr", "zh-Hant", "ja"];
const routes = ["/", "/about", "/collections", "/exhibitions", "/contact"];
const packs = Object.fromEntries(languages.map((locale) => [locale, JSON.parse(readFileSync(new URL(`../assets/i18n/${locale}.json`, import.meta.url), "utf8"))]));

test.beforeEach(async ({ page }) => {
  await page.route("https://www.google.com/maps?**", (route) => route.fulfill({ contentType: "text/html", body: "<title>Map fixture</title>" }));
});

async function chooseLanguage(page, language) {
  await expect(page.locator("[data-language-select]")).toBeEnabled();
  await page.locator("[data-language-select]").selectOption(language);
  await expect(page.locator("html")).toHaveAttribute("data-language-ready", language);
}

test("the reading desk filters, steps, zooms and preserves historical context", async ({ page }) => {
  await page.goto("/collections");
  await expect(page.locator("[data-collection-controls]")).toBeVisible();
  await expect(page.locator(".collection-card")).toHaveCount(8);
  await page.locator("[data-collection-next]").click();
  await expect(page.locator("[data-detail-title]")).toHaveText(packs.en.collections[1].title);
  await expect(page.locator("[data-collection-position]")).toHaveText("Object 2 of 8");
  await expect(page).toHaveURL(/item=china-army-seasoned-team/);
  await page.locator(".object-prompt summary").click();
  await expect(page.locator("[data-detail-look]")).toHaveText(packs.en.collections[1].look);
  await page.locator("[data-collection-filter='change']").click();
  await expect(page.locator(".collection-card")).toHaveCount(2);
  await expect(page.locator("[data-detail-title]")).toHaveText(packs.en.collections[5].title);
  await expect(page.locator("[data-detail-context]")).toHaveText(packs.en.collections[5].context);
  await page.locator(".collection-card").first().focus();
  await page.keyboard.press("End");
  await expect(page.locator("[data-detail-title]")).toHaveText(packs.en.collections[6].title);
  await page.locator(".collection-stage [data-image-open]").click();
  await expect(page.locator("[data-viewer-counter]")).toHaveText("02 / 02");
  await page.locator("[data-viewer-next]").click();
  await expect(page.locator("#viewer-caption")).toHaveText(packs.en.collections[5].title);
  await page.keyboard.press("Escape");
  await page.locator("[data-collection-filter='culture']").click();
  await expect(page.locator(".collection-card")).toHaveCount(1);
  await expect(page.locator("[data-collection-next]")).toBeDisabled();
  await expect(page.locator("[data-detail-title]")).toHaveText(packs.en.collections[7].title);
  await chooseLanguage(page, "zh-Hant");
  await expect(page.locator("[data-detail-look]")).toHaveText(packs["zh-Hant"].collections[7].look);
  await expect(page.locator("[data-detail-context]")).toHaveText(packs["zh-Hant"].collections[7].context);
  await expect(page.locator(".collection-card")).toHaveCount(1);
  await page.locator("[data-collection-filter='all']").click();
  await expect(page.locator(".collection-card")).toHaveCount(8);
  await expect(page.locator("[data-detail-title]")).toHaveText(packs["zh-Hant"].collections[7].title);
});

test("gallery groups stay coherent and original photographs remain accessible", async ({ page }) => {
  await page.goto("/collections#gallery");
  const counts = { posters: 3, tokyo: 15, archive: 10, community: 11 };
  for (const [category, count] of Object.entries(counts)) {
    await page.locator(`[data-gallery-filter="${category}"]`).click();
    await expect(page.locator("[data-gallery-panel]:visible")).toHaveCount(1);
    await expect(page.locator(`#${category} .photo-grid img`)).toHaveCount(count);
    await expect(page.locator("[data-gallery-count]")).toHaveText(`${count} photographs`);
    await expect(page.locator(`[data-gallery-filter="${category}"]`)).toHaveAttribute("aria-current", "true");
    const captions = await page.locator(`#${category} figcaption`).allTextContents();
    expect(new Set(captions).size).toBe(count);
    const image = page.locator(`#${category} .photo-grid img`).first();
    const original = await image.getAttribute("data-full-src");
    await page.locator(`#${category} [data-image-open]`).first().click();
    await expect(page.locator("[data-viewer-image]")).toHaveAttribute("src", original);
    await page.keyboard.press("Escape");
  }
  await page.goto("/collections#archive");
  await expect(page.locator("#archive")).toBeVisible();
  await expect(page.locator("#posters")).toBeHidden();
  await chooseLanguage(page, "fr");
  await expect(page.locator("[data-gallery-count]")).toHaveText("10 photographies");
});

test("gallery access applies the sticky-header offset only once", async ({ page }) => {
  for (const route of ["/collections", "/collections#archive"]) {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
    if (!route.includes("#")) await page.locator(".collection-gallery-link").click();
    await expect(async () => {
      const geometry = await page.locator(".collection-gallery").evaluate((gallery) => ({
        top: gallery.getBoundingClientRect().top,
        headerBottom: document.querySelector(".site-header").getBoundingClientRect().bottom
      }));
      expect(geometry.top, route).toBeGreaterThanOrEqual(geometry.headerBottom);
      expect(geometry.top, route).toBeLessThanOrEqual(geometry.headerBottom + 32);
    }).toPass({ timeout: 5_000 });
  }
});

test("every page remains organized and translated in the five supported languages", async ({ page }) => {
  test.setTimeout(120_000);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("[data-language-select] option")).toHaveCount(5);
    for (const language of languages) {
      await chooseLanguage(page, language);
      const content = await page.locator("[data-i18n]").evaluateAll((elements) => elements.map((element) => ({ key: element.dataset.i18n, value: element.textContent })));
      for (const item of content) expect(item.value).toBe(packs[language].strings[item.key]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await expect(page.locator("body")).not.toContainText(/[\u00b7\u2022\u25cf]/u);
    }
  }
  expect(errors).toEqual([]);
});

test("contact previews fill the left column and preserve the real press destinations", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator(".press-preview")).toHaveCount(2);
  await expect(page.locator(".press-preview").first()).toHaveAttribute("href", "https://www.worldchinesemedia.com/2025/09/09/13163/");
  await expect(page.locator(".press-preview").last()).toHaveAttribute("href", "https://www.canadanewsreport.com/2025/09/09/16923/");
  for (const language of languages) {
    await chooseLanguage(page, language);
    const geometry = await page.locator(".contact-section").evaluate((section) => {
      const left = section.querySelector(".contact-details").getBoundingClientRect();
      const right = section.querySelector(".contact-story").getBoundingClientRect();
      return { left, right, desktop: innerWidth > 960 };
    });
    if (geometry.desktop) {
      expect(Math.abs(geometry.left.top - geometry.right.top)).toBeLessThan(2);
      expect(geometry.left.height / geometry.right.height).toBeGreaterThan(.7);
    }
    await expect(page.locator(".press-preview h3").first()).toHaveText(packs[language].strings["press.worldTitle"]);
    await expect(page.locator('a[href="mailto:communications@mofer.org"]')).toBeVisible();
  }
});

test("new reading and interaction text meets the contrast threshold", async ({ page }) => {
  for (const [route, selectors] of [
    ["/collections", ["[data-detail-description]", "[data-detail-context]", ".collection-stage > p", ".collection-filters button[aria-pressed='true']", "[data-collection-position]"]],
    ["/contact", [".press-preview p", ".press-preview__source", ".press-preview time", ".contact-panel dt"]]
  ]) {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
    const ratios = await page.evaluate((selectors) => {
      function luminance(color) {
        const channels = color.match(/[\d.]+/g).slice(0, 3).map(Number).map((channel) => {
          const value = channel / 255;
          return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
        });
        return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
      }
      return selectors.map((selector) => {
        const element = document.querySelector(selector);
        let parent = element;
        while (getComputedStyle(parent).backgroundColor === "rgba(0, 0, 0, 0)") parent = parent.parentElement;
        const foreground = luminance(getComputedStyle(element).color);
        const background = luminance(getComputedStyle(parent).backgroundColor);
        return { selector, ratio: (Math.max(foreground, background) + .05) / (Math.min(foreground, background) + .05) };
      });
    }, selectors);
    for (const result of ratios) expect(result.ratio, result.selector).toBeGreaterThanOrEqual(4.5);
  }
});

test("retired language preferences safely migrate to English", async ({ page, request }) => {
  for (const language of ["ru", "es", "de"]) {
    await page.addInitScript((value) => localStorage.setItem("mofer-language", value), language);
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
    await expect(page.locator("[data-language-select]")).toHaveValue("en");
    const response = await request.get(`/assets/i18n/${language}.json`);
    expect(response.status()).toBe(404);
  }
});

test("the collection and gallery provide meaningful native fallbacks without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto("/collections");
  await expect(page.locator("[data-detail-title]")).toHaveText(packs.en.collections[0].title);
  await expect(page.locator("[data-detail-description]")).toHaveText(packs.en.collections[0].summary);
  await expect(page.locator(".collection-card[href]")).toHaveCount(8);
  await expect(page.locator("[data-collection-controls]")).toBeHidden();
  await page.locator(".collection-gallery summary").click();
  await expect(page.locator(".gallery-original")).toHaveCount(39);
  await expect(page.locator("[data-gallery-panel]")).toHaveCount(4);
  await context.close();
});
