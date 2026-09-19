import { test as base, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

const contentBaseline = JSON.parse(readFileSync(new URL("./fixtures/content.json", import.meta.url), "utf8"));
const historicalFacts = JSON.parse(readFileSync(new URL("./fixtures/facts.json", import.meta.url), "utf8"));

const routes = ["index.html", "collections.html", "exhibitions.html"];
const test = base.extend({
  localOnly: [async ({ context, baseURL }, use) => {
    const externalRequests = [];
    await context.route("**/*", async (route) => {
      const url = new URL(route.request().url());
      if (url.origin !== new URL(baseURL).origin) {
        externalRequests.push(url.href);
        await route.abort();
      } else {
        await route.continue();
      }
    });
    await use();
    expect(externalRequests, "The website must not depend on its original host").toEqual([]);
  }, { auto: true }]
});

for (const route of routes) {
  for (const language of ["zh", "en"]) {
    test(`${route} renders ${language} locally`, async ({ page }, testInfo) => {
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("response", (response) => {
        if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
      });
      const response = await page.goto(`/${route}`);
      expect(response.status()).toBe(200);
      const content = await page.evaluate(() => ({ translations, collectionItems }));
      expect(Object.keys(content.translations[language])).toEqual(expect.arrayContaining(Object.keys(contentBaseline.translations[language])));
      expect(content.collectionItems.map(({ summary, ...metadata }) => metadata)).toEqual(contentBaseline.collectionItems.map(({ summary, ...metadata }) => metadata));
      for (const fact of historicalFacts.translations) {
        for (const value of fact[language]) {
          expect(content.translations[language][fact.key], `${fact.key} must preserve ${value}`).toContain(value);
        }
      }
      for (const [index, fact] of historicalFacts.collections.entries()) {
        for (const value of fact[language]) {
          expect(content.collectionItems[index].summary[language], `Collection ${index + 1} must preserve ${value}`).toContain(value);
        }
      }
      const initialHeading = await page.locator("h1").innerText();
      if (language === "en") {
        await page.locator("[data-language-toggle]").click();
        await expect(page.locator("h1")).not.toHaveText(initialHeading);
      }
      await expect(page.locator("html")).toHaveAttribute("lang", language === "zh" ? "zh-Hans" : "en");
      for (const key of contentBaseline.pages[route].filter((key) => key !== "nav.pause")) {
        await expect(page.locator(`[data-i18n="${key}"]`).first()).toHaveText(content.translations[language][key]);
      }
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator(".primary-nav a")).toHaveCount(5);
      await expect(page.locator(".site-footer")).toContainText("MOFER");
      if (route !== "exhibitions.html") {
        await expect(page.locator(".collection-card")).toHaveCount(8);
        await expect(page.locator(".pathway-card")).toHaveCount(6);
      }
      await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0));
      await page.evaluate(() => document.fonts.ready);
      await page.locator("img").evaluateAll((images) => Promise.all(images.map((image) => image.decode())));
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "Page has horizontal overflow").toBe(true);
      await page.screenshot({ path: testInfo.outputPath("viewport.png"), animations: "disabled" });
      if (["desktop", "mobile"].includes(testInfo.project.name)) {
        await page.screenshot({ path: testInfo.outputPath("full.png"), fullPage: true, animations: "disabled" });
        if (route === "index.html" && language === "en") {
          for (const section of ["collections", "pathways", "exhibition", "research", "involvement"]) {
            await page.locator(`section.${section}`).screenshot({
              path: testInfo.outputPath(`${section}.png`),
              animations: "disabled",
              style: ".site-header, .skip-link { visibility: hidden !important; }"
            });
          }
        }
      }
      if (testInfo.project.name === "mobile") {
        await page.setViewportSize({ width: 320, height: 740 });
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "Small phone has horizontal overflow").toBe(true);
        await expect(page.locator("h1")).toBeVisible();
      }
      expect(errors).toEqual([]);
    });
  }

  test(`${route} keeps navigation and anchors local`, async ({ page, baseURL }) => {
    await page.goto(`/${route}`);
    const links = await page.locator(".primary-nav a").evaluateAll((elements) => elements.map((element) => element.getAttribute("href")));
    expect(links).toEqual(["index.html#about", "collections.html", "exhibitions.html", "index.html#research", "index.html#contact"]);
    for (const href of links) {
      const response = await page.goto(new URL(href, baseURL).href);
      if (response) expect(response.status()).toBe(200);
      expect(new URL(page.url()).origin).toBe(baseURL);
      const anchor = new URL(page.url()).hash;
      if (anchor) await expect(page.locator(anchor)).toBeVisible();
    }
    await page.locator(".brand").click();
    await expect(page).toHaveURL(/#top$/);
  });
}

for (const route of ["index.html", "collections.html"]) {
  test(`${route} selects all eight collections in both languages`, async ({ page }) => {
    await page.goto(`/${route}`);
    const revisedDescriptions = await page.evaluate(() => collectionItems.map((item) => item.summary));
    for (const language of ["zh", "en"]) {
      if (language === "en") await page.locator("[data-language-toggle]").click();
      for (let index = 0; index < 8; index += 1) {
        const card = page.locator(".collection-card").nth(index);
        const title = await card.locator("h3").innerText();
        const image = await card.locator("img").getAttribute("src");
        await card.click();
        await expect(card).toHaveAttribute("aria-pressed", "true");
        await expect(page.locator(".collection-card[aria-pressed=true]")).toHaveCount(1);
        await expect(page.locator("[data-detail-title]")).toHaveText(title);
        await expect(page.locator("[data-detail-image]")).toHaveAttribute("src", image);
        await expect(page.locator("[data-detail-description]")).toHaveText(revisedDescriptions[index][language]);
        await expect(page.locator("[data-detail-date]")).not.toBeEmpty();
        await expect(page.locator("[data-detail-place]")).not.toBeEmpty();
      }
    }
  });
}

test("language retains the original reload behavior and keyboard control", async ({ page }) => {
  await page.goto("/collections.html");
  const toggle = page.locator("[data-language-toggle]");
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-Hans");
  await toggle.click();
  const menu = page.locator("[data-menu-toggle]");
  if (await menu.isVisible()) await menu.click();
  await page.locator('.primary-nav a[href="exhibitions.html"]').click();
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-Hans");
});

test("hero video loops at quarter speed without playback controls", async ({ page }) => {
  await page.goto("/");
  const video = page.locator("[data-hero-video]");
  await expect(video).toHaveJSProperty("playbackRate", 0.25);
  await expect(video).toHaveJSProperty("defaultPlaybackRate", 0.25);
  await expect(video).toHaveJSProperty("muted", true);
  await expect(video).toHaveJSProperty("loop", true);
  await expect(video).toHaveJSProperty("controls", false);
  await expect(page.locator("[data-motion-toggle]")).toHaveCount(0);
  await page.waitForFunction(() => document.querySelector("video").currentTime > 0.1);
  await video.evaluate((element) => { element.currentTime = element.duration - 0.2; });
  await page.waitForFunction(() => document.querySelector("video").currentTime < 1);
  await expect(video).toHaveJSProperty("paused", false);
  await expect(video).toHaveJSProperty("playbackRate", 0.25);
});

test("blocked autoplay keeps hero text and actions fully visible", async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    Object.defineProperty(HTMLMediaElement.prototype, "autoplay", {
      configurable: true,
      get() { return false; },
      set() {}
    });
    HTMLMediaElement.prototype.play = function () {
      return Promise.reject(new DOMException("Autoplay is blocked", "NotAllowedError"));
    };
  });
  await page.goto("/");
  await expect(page.locator("[data-hero-video]")).toHaveJSProperty("paused", true);
  await expect(page.locator(".hero__content")).toHaveCSS("opacity", "1");
  await expect(page.locator(".hero__actions a")).toHaveCount(2);
  for (const action of await page.locator(".hero__actions a").all()) await expect(action).toBeVisible();
  await expect(page.locator("[data-motion-toggle]")).toHaveCount(0);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: testInfo.outputPath("autoplay-fallback.png") });
});

test("Cloudflare canonical routes, security headers, and true 404s work", async ({ request }) => {
  for (const route of ["/", "/index.html", "/collections", "/collections.html", "/exhibitions", "/exhibitions.html"]) {
    const response = await request.get(route);
    expect(response.status()).toBe(200);
    expect(response.headers()["x-content-type-options"]).toBe("nosniff");
    expect(await response.text()).toContain("MOFER");
  }
  for (const route of ["/not-a-museum-page", "/nested/missing", "/package.json", "/recovery/manifest.json"]) {
    const response = await request.get(route);
    expect(response.status()).toBe(404);
    expect(await response.text()).toContain("Page not found");
  }
});

test("contact and press links retain their original destinations", async ({ page }) => {
  await page.goto("/exhibitions.html");
  await expect(page.locator('a[href="mailto:communications@mofer.org"]')).toHaveCount(1);
  await expect(page.locator('a[href="tel:+16477795286"]')).toHaveCount(1);
  await expect(page.locator('a[href="https://www.worldchinesemedia.com/2025/09/09/13163/"]')).toHaveAttribute("target", "_blank");
  await expect(page.locator('a[href="https://www.canadanewsreport.com/2025/09/09/16923/"]')).toHaveAttribute("rel", /noreferrer/);
});

test("museum navigation opens, closes with Escape, and follows an anchor", async ({ page }, testInfo) => {
  await page.goto("/");
  const menu = page.locator("[data-menu-toggle]");
  const navigation = page.locator(".primary-nav");
  if (["desktop", "wide"].includes(testInfo.project.name)) {
    await expect(menu).not.toBeVisible();
    await expect(navigation).toBeVisible();
    return;
  }
  await expect(menu).toBeVisible();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(navigation).not.toBeVisible();
  await menu.click();
  await expect(navigation).toBeVisible();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(navigation).not.toBeVisible();
  await expect(menu).toBeFocused();
  await menu.click();
  await navigation.locator('[href="index.html#about"]').click();
  await expect(page).toHaveURL(/#about$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(navigation).not.toBeVisible();
});

test("hero actions stay unobscured in both languages", async ({ page }, testInfo) => {
  await page.goto("/");
  for (const language of ["zh", "en"]) {
    if (language === "en") await page.locator("[data-language-toggle]").click();
    for (const action of await page.locator(".hero__actions a").all()) {
      await action.scrollIntoViewIfNeeded();
      expect(await action.evaluate((element) => {
        const box = element.getBoundingClientRect();
        return element.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2));
      }), "Hero action is covered by another element").toBe(true);
    }
    await expect(page.locator("[data-motion-toggle]")).toHaveCount(0);
  }
  if (testInfo.project.name === "mobile") {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(page.locator(".intro h2")).toBeInViewport({ ratio: .1 });
  }
});

test("artifact image viewer supports navigation, Escape, and focus return", async ({ page }) => {
  await page.goto("/collections.html");
  const trigger = page.locator("[data-collection-detail] [data-image-open]");
  await trigger.click();
  const viewer = page.locator("[data-image-viewer]");
  await expect(viewer).toBeVisible();
  await expect(viewer.locator("img")).toHaveAttribute("src", "assets/collections/tim-louie-victory-address.jpg");
  await viewer.locator("[data-viewer-next]").click();
  await expect(viewer.locator("img")).toHaveAttribute("src", "assets/collections/china-army-seasoned-team.jpg");
  await page.keyboard.press("ArrowLeft");
  await expect(viewer.locator("img")).toHaveAttribute("src", "assets/collections/tim-louie-victory-address.jpg");
  await page.keyboard.press("Escape");
  await expect(viewer).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("hero video stays visible and playing when reduced motion is enabled", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const video = page.locator("[data-hero-video]");
  await expect(video).toBeVisible();
  await expect(video).toHaveJSProperty("autoplay", true);
  await expect(video).toHaveJSProperty("playbackRate", 0.25);
  await page.waitForFunction(() => document.querySelector("video").currentTime > 0.1);
  await expect(video).toHaveJSProperty("paused", false);
  await expect(page.locator("[data-motion-toggle]")).toHaveCount(0);
  await expect(page.locator(".hero__content")).toHaveCSS("animation-name", "none");
  expect(await video.evaluate((element) => element.getVideoPlaybackQuality().totalVideoFrames)).toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(video).toBeVisible();
  await expect(video).toHaveJSProperty("paused", false);
  await expect(video).toHaveJSProperty("playbackRate", 0.25);
});

test("selected artifact is brought into view without losing the selected control", async ({ page }) => {
  await page.goto("/collections.html");
  const card = page.locator(".collection-card").last();
  await card.click();
  await expect(card).toBeFocused();
  await expect(page.locator("[data-collection-detail]")).toBeInViewport({ ratio: .3 });
  await expect(page.locator("[data-detail-title]")).toContainText("黄柳霜");
});

test("Chinese editorial copy is readable before scripts run", async ({ page }) => {
  await page.route("**/script.js", (route) => route.abort());
  for (const route of routes) {
    await page.goto(`/${route}`);
    await expect(page.locator(".site-footer > p")).toHaveText("收藏、研究与分享远东的历史。");
    if (route === "index.html") {
      await expect(page.locator(".hero__statement")).toHaveText("保存远东记忆，让更多人了解这段历史。");
      await expect(page.locator("#about-title")).toHaveText("关于 MOFER");
    }
    if (route !== "exhibitions.html") {
      await expect(page.locator("#collections-title")).toHaveText("馆藏精选");
    }
  }
});

test("archive surfaces have readable base colors without decorative dividers", async ({ page }) => {
  await page.goto("/");
  const presentation = await page.evaluate(() => {
    function luminance(color) {
      const channels = color.match(/[\d.]+/gu).slice(0, 3).map(Number).map((channel) => {
        const value = channel / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
      });
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    }
    const pairs = [
      [".intro__summary", "body"],
      [".about__grid p", "body"],
      [".section__statement", "body"],
      [".collection-detail__body > p:not(.section-label)", ".collection-detail"],
      [".gallery-grid figcaption", ".exhibition"],
      [".hero .button--primary", ".hero .button--primary"]
    ];
    return {
      contrast: pairs.map(([textSelector, surfaceSelector]) => {
        const foreground = luminance(getComputedStyle(document.querySelector(textSelector)).color);
        const background = luminance(getComputedStyle(document.querySelector(surfaceSelector)).backgroundColor);
        return { textSelector, ratio: (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05) };
      }),
      dividers: Array.from(document.querySelectorAll(".site-header, .intro, .section, .work-grid article, .hero__footer")).map((element) => {
        const style = getComputedStyle(element);
        return [style.borderTopWidth, style.borderBottomWidth, style.borderLeftWidth, style.borderRightWidth].map(parseFloat);
      }),
      texture: getComputedStyle(document.body).backgroundImage,
      canvasLuminance: luminance(getComputedStyle(document.body).backgroundColor)
    };
  });
  for (const sample of presentation.contrast) expect(sample.ratio, sample.textSelector).toBeGreaterThanOrEqual(4.5);
  for (const widths of presentation.dividers) expect(widths).toEqual([0, 0, 0, 0]);
  expect(presentation.texture).toContain("archive-paper.png");
  expect(presentation.canvasLuminance).toBeLessThan(0.2);
});