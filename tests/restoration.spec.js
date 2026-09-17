import { test as base, expect } from "@playwright/test";

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
      const initialHeading = await page.locator("h1").innerText();
      if (language === "en") {
        await page.locator("[data-language-toggle]").click();
        await expect(page.locator("h1")).not.toHaveText(initialHeading);
      }
      await expect(page.locator("html")).toHaveAttribute("lang", language === "zh" ? "zh-Hans" : "en");
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator(".primary-nav a")).toHaveCount(5);
      await expect(page.locator(".site-footer")).toContainText("MOFER");
      if (route !== "exhibitions.html") {
        await expect(page.locator(".collection-card")).toHaveCount(8);
        await expect(page.locator(".pathway-card")).toHaveCount(6);
      }
      await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0));
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "Page has horizontal overflow").toBe(true);
      await page.screenshot({ path: testInfo.outputPath("viewport.png"), animations: "disabled" });
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
  await page.locator('.primary-nav a[href="exhibitions.html"]').click();
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-Hans");
});

test("hero video advances and the visible motion control pauses and resumes", async ({ page }) => {
  await page.goto("/");
  await page.waitForFunction(() => document.querySelector("video").currentTime > 0.2);
  const control = page.locator("[data-motion-toggle]");
  if (await control.isVisible()) {
    await control.click();
    await expect(control).toHaveAttribute("aria-pressed", "true");
    expect(await page.locator("video").evaluate((video) => video.paused)).toBe(true);
    const pausedTime = await page.locator("video").evaluate((video) => video.currentTime);
    await page.locator("[data-language-toggle]").click();
    await expect(control).toContainText("Play");
    expect(await page.locator("video").evaluate((video) => video.currentTime)).toBe(pausedTime);
    await control.click();
    await expect(control).toHaveAttribute("aria-pressed", "false");
    await page.waitForFunction((previous) => document.querySelector("video").currentTime > previous, pausedTime);
  }
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