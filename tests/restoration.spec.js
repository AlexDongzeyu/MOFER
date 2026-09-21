import { test as base, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { parse } from "parse5";

const languages = ["en", "zh-Hans", "fr", "zh-Hant", "ja", "ru", "de", "es"];
const languageNames = ["English", "简体中文", "Français", "繁體中文", "日本語", "Русский", "Deutsch", "Español"];
const pages = ["index.html", "about.html", "collections.html", "exhibitions.html", "research.html", "contact.html"];
const destinations = ["about.html", "collections.html", "exhibitions.html", "research.html", "contact.html"];
const packs = Object.fromEntries(languages.map((language) => [language, JSON.parse(readFileSync(new URL(`../assets/i18n/${language}.json`, import.meta.url), "utf8"))]));
const contentBaseline = JSON.parse(readFileSync(new URL("./fixtures/content.json", import.meta.url), "utf8"));
const historicalFacts = JSON.parse(readFileSync(new URL("./fixtures/facts.json", import.meta.url), "utf8"));

const test = base.extend({
  localOnly: [async ({ context, baseURL }, use) => {
    const externalRequests = [];
    await context.route("**/*", async (route) => {
      const url = new URL(route.request().url());
      const approvedMap = url.origin === "https://www.google.com" && url.pathname === "/maps" && url.searchParams.get("output") === "embed" && route.request().isNavigationRequest() && route.request().frame().parentFrame();
      if (approvedMap) {
        await route.fulfill({ contentType: "text/html", body: "<!doctype html><html><head><title>Google Maps test document</title></head><body></body></html>" });
      } else if (url.origin !== new URL(baseURL).origin) {
        externalRequests.push(route.request().url());
        await route.abort();
      } else {
        await route.continue();
      }
    });
    await use();
    expect(externalRequests, "Only the requested Google Maps embed may use an external service").toEqual([]);
  }, { auto: true }]
});

async function chooseLanguage(page, language) {
  await expect(page.locator("[data-language-select]")).toBeEnabled();
  await page.locator("[data-language-select]").selectOption(language);
  await expect(page.locator("html")).toHaveAttribute("data-language-ready", language);
  await expect(page.locator("html")).toHaveAttribute("lang", language);
}

test("English-first visits offer all eight native-language choices", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
  await expect(page.locator("h1")).toContainText("Museum of Far East Remembrance");
  await expect(page.locator("[data-language-select]")).toHaveValue("en");
  await expect(page.locator("[data-language-select] option")).toHaveText(languageNames);
});

test("Boynton House maps sit below the exhibition links in every language", async ({ page }) => {
  test.setTimeout(120_000);
  const mapLanguages = { en: "en", "zh-Hans": "zh-CN", fr: "fr", "zh-Hant": "zh-TW", ja: "ja", ru: "ru", de: "de", es: "es" };
  const place = "Boynton House, 1300 Elgin Mills Road East, Richmond Hill, Ontario, Canada";
  for (const route of ["index.html", "exhibitions.html"]) {
    await page.goto(`/${route}`);
    const map = page.locator("[data-venue-map]");
    await expect(map).toHaveCount(1);
    await expect(map).toHaveAttribute("loading", "lazy");
    await expect(map).toHaveAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    await expect(map).toHaveCSS("color-scheme", "light");
    for (const language of languages) {
      await chooseLanguage(page, language);
      await expect(map).toHaveAttribute("title", packs[language].strings["venue.mapTitle"]);
      await expect(page.locator("[data-i18n='venue.caption']")).toHaveText(packs[language].strings["venue.caption"]);
      const source = new URL(await map.getAttribute("src"));
      expect(source.origin).toBe("https://www.google.com");
      expect(source.pathname).toBe("/maps");
      expect(source.searchParams.get("cid")).toBe("522738823898078509");
      expect(source.searchParams.get("output")).toBe("embed");
      expect(source.searchParams.get("hl")).toBe(mapLanguages[language]);
      const link = page.locator("[data-i18n='venue.openMap']");
      await expect(link).toHaveText(packs[language].strings["venue.openMap"]);
      const destination = new URL(await link.getAttribute("href"));
      expect(destination.searchParams.get("query")).toBe(place);
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
    const placement = await page.locator(".venue-map").evaluate((element) => {
      const parent = element.parentElement;
      const preceding = parent.querySelector(".press-links") || parent.querySelector(".text-link");
      const bounds = element.getBoundingClientRect();
      const frame = element.querySelector("iframe").getBoundingClientRect();
      return { afterLinks: bounds.top >= preceding.getBoundingClientRect().bottom, fits: bounds.width <= parent.getBoundingClientRect().width, height: frame.height };
    });
    expect(placement.afterLinks).toBe(true);
    expect(placement.fits).toBe(true);
    expect(placement.height).toBeGreaterThanOrEqual(200);
    expect(placement.height).toBeLessThanOrEqual(280);
  }
});

test("venue address and external map link remain usable if Google is unavailable", async ({ page }) => {
  await page.route("https://www.google.com/maps?**", (route) => route.abort());
  await page.goto("/exhibitions.html");
  const map = page.locator("[data-venue-map]");
  await expect(map).toHaveCount(1);
  await map.scrollIntoViewIfNeeded();
  await expect(page.locator(".venue-map")).toContainText("1300 Elgin Mills Road East");
  await expect(page.locator("[data-i18n='venue.openMap']")).toBeVisible();
  await expect(page.locator("[data-i18n='exhibition.summary']")).toContainText("2025");
});

test("script-specific typography loads locally for every museum language", async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto("/about.html");
  const regionalFonts = {
    "zh-Hans": ["Noto Serif SC Variable", "Noto Sans SC Variable"],
    "zh-Hant": ["Noto Serif TC Variable", "Noto Sans TC Variable"],
    ja: ["Noto Serif JP Variable", "Noto Sans JP Variable"]
  };
  for (const language of languages) {
    await chooseLanguage(page, language);
    const [display, body] = regionalFonts[language] || ["Source Serif 4 Variable", "Source Sans 3 Variable"];
    const typography = await page.evaluate(async ({ display, body }) => {
      const heading = document.querySelector("h1");
      const prose = document.querySelector(".about__grid p");
      const headingFaces = await document.fonts.load(`500 32px "${display}"`, heading.textContent);
      const proseFaces = await document.fonts.load(`400 18px "${display}"`, prose.textContent);
      const bodyFaces = await document.fonts.load(`400 16px "${body}"`, prose.textContent);
      return {
        heading: getComputedStyle(heading).fontFamily,
        body: getComputedStyle(document.body).fontFamily,
        prose: getComputedStyle(prose).fontFamily,
        proseLoaded: proseFaces.some((face) => face.status === "loaded"),
        headingLoaded: headingFaces.some((face) => face.status === "loaded"),
        bodyLoaded: bodyFaces.some((face) => face.status === "loaded"),
        proseSize: parseFloat(getComputedStyle(prose).fontSize),
        wordmark: getComputedStyle(document.querySelector(".brand__mark")).fontFamily
      };
    }, { display, body });
    expect(typography.heading, language).toContain(display);
    expect(typography.body, language).toContain(body);
    expect(typography.prose, language).toContain(display);
    expect(typography.proseLoaded, `${language} editorial reading font`).toBe(true);
    expect(typography.headingLoaded, `${language} display font`).toBe(true);
    expect(typography.bodyLoaded, `${language} reading font`).toBe(true);
    expect(typography.proseSize, `${language} prose size`).toBeGreaterThanOrEqual(18);
    expect(typography.wordmark).toContain("Bodoni Moda Variable");
  }
});

test("gallery presentation retains the palette and uncropped objects", async ({ page }) => {
  await page.goto("/collections.html");
  await expect(page.locator(".collection-card")).toHaveCount(8);
  const palette = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    return Object.fromEntries(["paper", "white", "ink", "muted", "cobalt", "mineral", "accent", "wine", "deep"].map((name) => [name, style.getPropertyValue(`--${name}`).trim()]));
  });
  expect(palette).toEqual({ paper: "#152436", white: "#f0eee8", ink: "#e8edf1", muted: "#b6c5d4", cobalt: "#30496a", mineral: "#21374e", accent: "#bdd4e7", wine: "#3d2d34", deep: "#0f1b2a" });
  for (const selector of [".collection-detail", ".collection-detail > .image-open", ".collection-card img", ".pathway-card > .image-open"]) {
    await expect(page.locator(selector).first()).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  }
  for (const selector of ["[data-detail-image]", ".collection-card img", ".pathway-card img"]) {
    await expect(page.locator(selector).first()).toHaveCSS("object-fit", "contain");
  }
  await page.goto("/");
  await expect(page.locator(".preview-object__image").first()).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
});

test("centered artifact rows keep captions aligned with their images", async ({ page }) => {
  for (const route of ["index.html", "collections.html"]) {
    await page.goto(`/${route}`);
    await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
    await page.locator("img").evaluateAll((images) => Promise.all(images.map((image) => image.decode())));
    await page.evaluate(() => document.fonts.ready);
    await expect.poll(async () => page.evaluate(() => {
      let error = 0;
      for (const grid of document.querySelectorAll(".preview-grid, .collection-list, .pathway-grid")) {
        const rows = new Map();
        for (const item of grid.children) {
          const image = item.querySelector("img");
          const caption = item.querySelector("h3");
          const imageBox = image.getBoundingClientRect();
          const mount = image.closest(".artifact-mount, .image-open, .preview-object__image") || image;
          const mountStyle = getComputedStyle(mount);
          const inset = parseFloat(mountStyle.paddingLeft) + parseFloat(mountStyle.borderLeftWidth);
          error = Math.max(error, Math.abs(caption.getBoundingClientRect().left - (imageBox.left - inset)));
          const row = Math.round(item.getBoundingClientRect().top);
          if (!rows.has(row)) rows.set(row, []);
          rows.get(row).push(imageBox.top + imageBox.height / 2);
        }
        for (const centers of rows.values()) error = Math.max(error, Math.max(...centers) - Math.min(...centers));
      }
      return error;
    }), { message: `${route} artifact alignment` }).toBeLessThanOrEqual(2);
    const sizes = await page.locator(".preview-object p, .collection-card__copy > span, .pathway-card p").evaluateAll((elements) => elements.map((element) => parseFloat(getComputedStyle(element).fontSize)));
    expect(sizes.length).toBeGreaterThan(0);
    for (const size of sizes) expect(size).toBeGreaterThanOrEqual(16);
  }
});

test("faded exhibition borders stay subtle and isolated", async ({ page }) => {
  const accents = {
    "index.html": "exhibition",
    "exhibitions.html": "exhibition"
  };
  for (const route of [...pages, "404.html"]) {
    await page.goto(`/${route}`);
    await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
    const edges = await page.locator("main > section, .site-footer").evaluateAll((elements) => elements.map((element) => {
      const ornament = getComputedStyle(element, "::before");
      return {
        classes: Array.from(element.classList),
        content: ornament.content,
        display: ornament.display,
        mask: ornament.maskImage,
        width: parseFloat(ornament.width),
        height: parseFloat(ornament.height),
        opacity: parseFloat(ornament.opacity),
        left: parseFloat(ornament.left),
        sectionWidth: element.getBoundingClientRect().width
      };
    }).filter((edge) => edge.content !== "none" && edge.content !== "normal" && edge.display !== "none"));
    expect(edges, route).toHaveLength(accents[route] ? 1 : 0);
    if (edges.length) {
      const edge = edges[0];
      expect(edge.classes, route).toContain(accents[route]);
      expect(edge.width, route).toBeGreaterThanOrEqual(180);
      expect(edge.width, route).toBeLessThanOrEqual(320);
      expect(edge.height, route).toBeLessThanOrEqual(28);
      expect(edge.opacity, route).toBeGreaterThanOrEqual(.2);
      expect(edge.opacity, route).toBeLessThanOrEqual(.4);
      expect(edge.left, route).toBeLessThan(edge.sectionWidth / 3);
      expect(edge.mask, route).toContain("exhibition-border.png");
    }
    await expect(page.locator("body")).not.toContainText(/[\u00b7\u2022\u25cf]/u);
  }
  const ornament = await page.evaluate(async () => {
    const image = new Image();
    image.src = "/assets/textures/exhibition-border.png";
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let visible = 0;
    let clipped = false;
    for (let offset = 3; offset < pixels.length; offset += 4) {
      if (pixels[offset] <= 40) continue;
      visible += 1;
      const column = ((offset - 3) / 4) % canvas.width;
      const row = Math.floor((offset - 3) / 4 / canvas.width);
      if (column < 2 || row < 2 || column >= canvas.width - 2 || row >= canvas.height - 2) clipped = true;
    }
    return { coverage: visible / (canvas.width * canvas.height), clipped };
  });
  expect(ornament.coverage).toBeGreaterThan(.02);
  expect(ornament.coverage).toBeLessThan(.4);
  expect(ornament.clipped).toBe(false);
});

test("primary collection and contact content are visible on arrival", async ({ page }) => {
  test.setTimeout(120_000);
  for (const route of ["collections.html", "contact.html"]) {
    await page.goto(`/${route}`);
    for (const language of languages) {
      await chooseLanguage(page, language);
      await page.evaluate(() => document.fonts.ready);
      if (route === "collections.html") {
        await expect(page.locator("[data-detail-image]"), language).toBeInViewport({ ratio: .7 });
      } else {
        await expect(page.locator('a[href="mailto:communications@mofer.org"]'), language).toBeInViewport();
      }
    }
  }
});

test("artifact captions and expansion controls stay with the visible image", async ({ page }) => {
  for (const route of ["index.html", "collections.html"]) {
    await page.goto(`/${route}`);
    await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
    const selector = route === "index.html" ? ".preview-object img" : "[data-detail-image], .pathway-card img";
    await page.locator(selector).evaluateAll((images) => Promise.all(images.map((image) => image.decode())));
    const images = await page.locator(selector).evaluateAll((elements) => elements.map((image) => {
      const bounds = image.getBoundingClientRect();
      const opener = image.closest(".image-open");
      const control = opener?.querySelector(".image-open__symbol")?.getBoundingClientRect();
      const caption = image.closest(".preview-object")?.querySelector("h3")?.getBoundingClientRect();
      return {
        source: image.getAttribute("src"),
        ratio: bounds.width / bounds.height,
        naturalRatio: image.naturalWidth / image.naturalHeight,
        controlInside: !control || (control.left >= bounds.left && control.right <= bounds.right && control.top >= bounds.top && control.bottom <= bounds.bottom),
        captionGap: caption ? caption.top - bounds.bottom : null
      };
    }));
    for (const image of images) {
      expect(Math.abs(image.ratio - image.naturalRatio), image.source).toBeLessThan(.01);
      expect(image.controlInside, image.source).toBe(true);
      if (image.captionGap !== null) expect(image.captionGap, image.source).toBeLessThanOrEqual(28);
    }
  }
});

test("editorial pages remain usable with doubled text size", async ({ page }) => {
  test.setTimeout(120_000);
  for (const route of ["index.html", "collections.html", "contact.html"]) {
    await page.goto(`/${route}`);
    await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
    for (const language of ["en", "de", "zh-Hant", "ja", "ru"]) {
      await chooseLanguage(page, language);
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => {
        const brand = document.createRange();
        brand.selectNodeContents(document.querySelector(".brand"));
        const navigation = document.querySelector(".primary-nav");
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          brandRight: brand.getBoundingClientRect().right,
          actionsLeft: document.querySelector(".header-actions").getBoundingClientRect().left,
          navigationLeft: getComputedStyle(navigation).display === "none" ? null : navigation.querySelector("a").getBoundingClientRect().left
        };
      });
      expect(layout.overflow, `${route} ${language} enlarged text`).toBe(false);
      expect(layout.brandRight, `${route} ${language} masthead`).toBeLessThanOrEqual(layout.actionsLeft - 4);
      if (layout.navigationLeft !== null) expect(layout.navigationLeft).toBeGreaterThanOrEqual(layout.brandRight + 8);
    }
  }
});

test("language files preserve collection identity and source historical facts", async () => {
  const keys = Object.keys(packs.en.strings).sort();
  for (const language of languages) {
    const pack = packs[language];
    expect(pack.locale).toBe(language);
    expect(Object.keys(pack.strings).sort()).toEqual(keys);
    expect(pack.collections).toHaveLength(8);
    for (const value of Object.values(pack.strings)) expect(value.trim()).not.toBe("");
    for (const [index, item] of pack.collections.entries()) {
      expect(item.id).toBe(packs.en.collections[index].id);
      expect(item.image).toBe(contentBaseline.collectionItems[index].image);
      expect(item.fit).toBe(contentBaseline.collectionItems[index].fit);
      for (const field of ["type", "title", "date", "place", "summary"]) expect(item[field].trim()).not.toBe("");
    }
  }
  for (const [language, originalLanguage] of [["en", "en"], ["zh-Hans", "zh"]]) {
    const pack = packs[language];
    for (const fact of historicalFacts.translations) {
      for (const value of fact[originalLanguage]) expect(pack.strings[fact.key], fact.key).toContain(value);
    }
    for (const [index, fact] of historicalFacts.collections.entries()) {
      for (const value of fact[originalLanguage]) expect(pack.collections[index].summary, `${language} collection ${index}`).toContain(value);
      for (const field of ["type", "title", "date", "place"]) {
        expect(pack.collections[index][field]).toBe(contentBaseline.collectionItems[index][field][originalLanguage]);
      }
    }
  }
});

test("the dedicated pages retain all substantive museum content", async () => {
  const usedKeys = new Set();
  function visit(node) {
    const key = node.attrs?.find((attribute) => attribute.name === "data-i18n")?.value;
    if (key) usedKeys.add(key);
    for (const child of node.childNodes || []) visit(child);
  }
  for (const route of pages) visit(parse(readFileSync(new URL(`../${route}`, import.meta.url), "utf8")));
  const substantive = Object.keys(contentBaseline.translations.en).filter((key) => /body|summary|\.lede$|\.intro$|^gallery\.|^facts\.|^hero\.title$|^footer\.note$/u.test(key));
  for (const key of substantive) expect(usedKeys.has(key), `The site must render ${key}`).toBe(true);
});

for (const route of pages) {
  test(`${route} renders all eight languages without missing content`, async ({ page }, testInfo) => {
    test.setTimeout(120_000);
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
    expect((await page.goto(`/${route}`)).status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
    for (const language of languages) {
      await test.step(language, async () => {
        await chooseLanguage(page, language);
        const pack = packs[language];
        const rendered = await page.locator("[data-i18n]").evaluateAll((elements) => elements.map((element) => ({ key: element.dataset.i18n, text: element.textContent })));
        expect(rendered.length).toBeGreaterThan(8);
        for (const element of rendered) expect(element.text, `${route} ${language} ${element.key}`).toBe(pack.strings[element.key]);
        for (const [dataAttribute, attribute] of [["data-i18n-alt", "alt"], ["data-i18n-aria", "aria-label"]]) {
          const values = await page.locator(`[${dataAttribute}]`).evaluateAll((elements, attributes) => elements.map((element) => ({ key: element.getAttribute(attributes[0]), value: element.getAttribute(attributes[1]) })), [dataAttribute, attribute]);
          for (const value of values) expect(value.value).toBe(pack.strings[value.key]);
        }
        await expect(page.locator("[data-language-select]")).toHaveAttribute("aria-label", pack.strings["language.label"]);
        await expect(page.locator(".primary-nav a")).toHaveCount(5);
        await expect(page.locator("h1")).toBeVisible();
        await expect(page.locator(".site-footer")).toContainText("MOFER");
        if (route === "index.html") {
          await expect(page.locator(".museum-paths")).toHaveAccessibleName(`${pack.strings["research.label"]} ${pack.strings["contact.label"]}`);
        }
        if (route === "collections.html") {
          await expect(page.locator(".collection-card h3")).toHaveText(pack.collections.map((item) => item.title));
          await expect(page.locator(".pathway-card")).toHaveCount(6);
          await expect(page.locator("[data-detail-description]")).toHaveText(pack.collections[0].summary);
        }
        await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0));
        await page.evaluate(() => document.fonts.ready);
        await page.locator("img").evaluateAll((images) => Promise.all(images.map((image) => image.decode())));
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} ${language} overflow`).toBe(true);
        if (["desktop", "mobile"].includes(testInfo.project.name) && ["en", "zh-Hans", "zh-Hant", "ja", "ru", "de"].includes(language)) {
          await page.screenshot({ path: testInfo.outputPath(`${language}-viewport.png`), animations: "disabled" });
          await page.screenshot({ path: testInfo.outputPath(`${language}-full.png`), fullPage: true, animations: "disabled" });
        }
        if (testInfo.project.name === "mobile") {
          await page.setViewportSize({ width: 320, height: 740 });
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} ${language} small-phone overflow`).toBe(true);
          await page.setViewportSize({ width: 390, height: 844 });
        }
      });
    }
    expect(errors).toEqual([]);
  });
}

test("main navigation uses dedicated destinations consistently", async ({ page, request }) => {
  for (const route of pages) {
    await page.goto(`/${route}`);
    expect(await page.locator(".primary-nav a").evaluateAll((links) => links.map((link) => link.getAttribute("href")))).toEqual(destinations);
    if (route !== "index.html") await expect(page.locator('.primary-nav a[aria-current="page"]')).toHaveAttribute("href", route);
  }
  for (const route of pages) {
    for (const path of [`/${route}`, route === "index.html" ? "/" : `/${route.replace(".html", "")}`]) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
      expect(response.headers()["x-content-type-options"]).toBe("nosniff");
    }
  }
  await page.goto("/");
  for (const anchor of ["about", "collections", "exhibitions", "research", "contact"]) await expect(page.locator(`#${anchor}`)).toHaveCount(1);
});

test("language choices survive navigation, reload, and keyboard selection", async ({ page }) => {
  await page.goto("/collections.html");
  await chooseLanguage(page, "fr");
  await expect(page.locator("[data-detail-title]")).toHaveText(packs.fr.collections[0].title);
  const menu = page.locator("[data-menu-toggle]");
  if (await menu.isVisible()) await menu.click();
  await page.locator('.primary-nav a[href="research.html"]').click();
  await expect(page.locator("html")).toHaveAttribute("data-language-ready", "fr");
  await expect(page.locator("h1")).toHaveText(packs.fr.strings["page.research.title"]);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-language-ready", "fr");
  await page.locator("[data-language-select]").focus();
  await page.keyboard.press("Home");
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
});

test("a failed translation retains readable content and the prior selection", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
  await page.route("**/assets/i18n/de.json", (route) => route.fulfill({ status: 503, body: "Unavailable" }));
  await page.locator("[data-language-select]").selectOption("de");
  await expect(page.locator("[data-language-status]")).toBeVisible();
  await expect(page.locator("[data-language-select]")).toHaveValue("en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator(".hero__statement")).toHaveText(packs.en.strings["hero.title"]);
  await chooseLanguage(page, "es");
  await expect(page.locator("[data-language-status]")).not.toBeVisible();
});

test("an initial English load failure can be retried without reloading", async ({ page }) => {
  let firstRequest = true;
  await page.route("**/assets/i18n/en.json", async (route) => {
    if (firstRequest) {
      firstRequest = false;
      await route.fulfill({ status: 503, body: "Unavailable" });
    } else {
      await route.continue();
    }
  });
  await page.goto("/collections.html");
  const status = page.locator("[data-language-status]");
  await expect(status).toBeVisible();
  await expect(status.getByRole("button", { name: "Try again" })).toBeVisible();
  await status.getByRole("button", { name: "Try again" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
  await expect(page.locator(".collection-card")).toHaveCount(8);
  await expect(status).not.toBeVisible();
});

test("an open image viewer follows a pending language change", async ({ page }) => {
  await page.goto("/collections.html");
  await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
  let releaseTranslation;
  const translationGate = new Promise((resolve) => { releaseTranslation = resolve; });
  await page.route("**/assets/i18n/fr.json", async (route) => {
    await translationGate;
    await route.continue();
  });
  await page.locator("[data-language-select]").selectOption("fr");
  await page.locator("[data-collection-detail] [data-image-open]").click();
  await expect(page.locator("[data-image-viewer]")).toBeVisible();
  await page.locator("[data-viewer-zoom]").click();
  const scrollPosition = await page.locator(".viewer-stage").evaluate((stage) => {
    stage.scrollTo({ left: 80, top: 60, behavior: "instant" });
    return { left: stage.scrollLeft, top: stage.scrollTop };
  });
  expect(scrollPosition.left + scrollPosition.top).toBeGreaterThan(0);
  releaseTranslation();
  await expect(page.locator("html")).toHaveAttribute("data-language-ready", "fr");
  await expect(page.locator("#viewer-caption")).toHaveText(packs.fr.collections[0].title);
  await expect(page.locator("[data-viewer-image]")).toHaveAttribute("alt", packs.fr.collections[0].title);
  await expect(page.locator("[data-image-viewer]")).toHaveClass(/is-zoomed/);
  await expect(page.locator("[data-viewer-zoom]")).toHaveAttribute("aria-label", packs.fr.strings["viewer.zoomOut"]);
  expect(await page.locator(".viewer-stage").evaluate((stage) => ({ left: stage.scrollLeft, top: stage.scrollTop }))).toEqual(scrollPosition);
  await page.locator("[data-viewer-next]").click();
  await expect(page.locator("#viewer-caption")).toHaveText(packs.fr.collections[1].title);
  await expect(page.locator("[data-image-viewer]")).not.toHaveClass(/is-zoomed/);
});

test("an invalid saved language falls back to English", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("mofer-language", "../unavailable"));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
  await expect(page.locator("[data-language-select]")).toHaveValue("en");
});

test("all collection records and image captions follow every language", async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto("/collections.html");
  for (const language of languages) {
    await chooseLanguage(page, language);
    for (const [index, item] of packs[language].collections.entries()) {
      const card = page.locator(".collection-card").nth(index);
      await card.click();
      await expect(card).toBeFocused();
      await expect(card).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator('.collection-card[aria-pressed="true"]')).toHaveCount(1);
      await expect(page.locator("[data-detail-title]")).toHaveText(item.title);
      await expect(page.locator("[data-detail-description]")).toHaveText(item.summary);
      await expect(page.locator("[data-detail-date]")).toHaveText(item.date);
      await expect(page.locator("[data-detail-place]")).toHaveText(item.place);
      await expect(page.locator("[data-detail-image]")).toHaveAttribute("alt", item.title);
    }
    await page.locator("[data-collection-detail] [data-image-open]").click();
    await expect(page.locator("#viewer-caption")).toHaveText(packs[language].collections[7].title);
    await expect(page.locator("[data-viewer-close]")).toHaveAttribute("aria-label", packs[language].strings["viewer.close"]);
    await page.keyboard.press("Escape");
  }
});

test("homepage collection links select the corresponding object", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-collection-preview="7"]').click();
  await expect(page.locator("[data-detail-title]")).toHaveText(packs.en.collections[7].title);
  await expect(page.locator(".collection-card").last()).toHaveAttribute("aria-pressed", "true");
});

test("artifact viewer supports next, previous, zoom, Escape and focus return", async ({ page }) => {
  await page.goto("/collections.html");
  await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
  const trigger = page.locator("[data-collection-detail] [data-image-open]");
  await trigger.click();
  const viewer = page.locator("[data-image-viewer]");
  await expect(viewer).toBeVisible();
  await viewer.locator("[data-viewer-next]").click();
  await expect(viewer.locator("img")).toHaveAttribute("src", packs.en.collections[1].image);
  await page.keyboard.press("ArrowLeft");
  await expect(viewer.locator("img")).toHaveAttribute("src", packs.en.collections[0].image);
  const initialWidth = (await viewer.locator("img").boundingBox()).width;
  await viewer.locator("[data-viewer-zoom]").click();
  expect((await viewer.locator("img").boundingBox()).width).toBeGreaterThan(initialWidth * 1.9);
  await page.keyboard.press("Escape");
  await expect(viewer).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("museum navigation opens and closes predictably", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
  const menu = page.locator("[data-menu-toggle]");
  const navigation = page.locator(".primary-nav");
  if (["desktop", "wide"].includes(testInfo.project.name)) {
    await expect(menu).not.toBeVisible();
    await expect(navigation).toBeVisible();
    return;
  }
  await expect(navigation).not.toBeVisible();
  await menu.click();
  await expect(navigation).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(navigation).not.toBeVisible();
  await expect(menu).toBeFocused();
  await menu.click();
  await navigation.locator('[href="about.html"]').click();
  await expect(page).toHaveURL(/\/about(?:\.html)?$/u);
  await expect(page.locator("[data-menu-toggle]")).toHaveAttribute("aria-expanded", "false");
});

test("translated header stays separated at intermediate widths", async ({ page }) => {
  await page.goto("/");
  for (const width of [961, 1024, 1025, 1120, 1200]) {
    await page.setViewportSize({ width, height: 900 });
    for (const language of ["ru", "es", "de", "fr"]) {
      await chooseLanguage(page, language);
      await page.evaluate(() => document.fonts.ready);
      const menu = page.locator("[data-menu-toggle]");
      if (await menu.isVisible()) {
        await expect(page.locator(".primary-nav")).not.toBeVisible();
        await menu.click();
        await expect(page.locator(".primary-nav")).toBeVisible();
        await page.keyboard.press("Escape");
      } else {
        const brand = await page.locator(".brand").boundingBox();
        const firstLink = await page.locator(".primary-nav a").first().boundingBox();
        const lastLink = await page.locator(".primary-nav a").last().boundingBox();
        const controls = await page.locator(".header-actions").boundingBox();
        expect(firstLink.x, `${language} at ${width}px`).toBeGreaterThanOrEqual(brand.x + brand.width + 8);
        expect(lastLink.x + lastLink.width).toBeLessThanOrEqual(controls.x - 8);
      }
    }
  }
});

test("hero video loops at quarter speed without playback controls", async ({ page }) => {
  await page.goto("/");
  const video = page.locator("[data-hero-video]");
  for (const [property, value] of [["playbackRate", .25], ["defaultPlaybackRate", .25], ["muted", true], ["loop", true], ["controls", false]]) await expect(video).toHaveJSProperty(property, value);
  await expect(page.locator("[data-motion-toggle]")).toHaveCount(0);
  await page.waitForFunction(() => document.querySelector("video").currentTime > .1);
  await video.evaluate((element) => { element.currentTime = element.duration - .2; });
  await page.waitForFunction(() => document.querySelector("video").currentTime < 1);
  await expect(video).toHaveJSProperty("paused", false);
});

test("hero video stays visible and playing with reduced motion enabled", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const video = page.locator("[data-hero-video]");
  await expect(video).toBeVisible();
  await expect(video).toHaveJSProperty("playbackRate", .25);
  await page.waitForFunction(() => document.querySelector("video").currentTime > .1);
  await expect(video).toHaveJSProperty("paused", false);
  await expect(page.locator(".hero__content")).toHaveCSS("animation-name", "none");
  expect(await video.evaluate((element) => element.getVideoPlaybackQuality().totalVideoFrames)).toBeGreaterThan(0);
});

test("blocked autoplay keeps hero content fully visible", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(HTMLMediaElement.prototype, "autoplay", { configurable: true, get() { return false; }, set() {} });
    HTMLMediaElement.prototype.play = function () { return Promise.reject(new DOMException("Autoplay blocked", "NotAllowedError")); };
  });
  await page.goto("/");
  await expect(page.locator("[data-hero-video]")).toHaveJSProperty("paused", true);
  await expect(page.locator(".hero__content")).toHaveCSS("opacity", "1");
  await expect(page.locator(".hero__actions a")).toHaveCount(2);
});

test("English fallback content remains readable without the script", async ({ page }) => {
  await page.route("**/script.js", (route) => route.abort());
  for (const route of pages) {
    await page.goto(`/${route}`);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator(".site-footer > p")).toHaveText(packs.en.strings["footer.note"]);
    await expect(page.locator(".primary-nav a")).toHaveText(["About", "Collections", "Exhibitions", "Research", "Contact"]);
  }
});

test("missing nested pages retain localized content and true 404 responses", async ({ page, request }) => {
  expect((await page.goto("/nested/not-a-page")).status()).toBe(404);
  await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
  for (const language of languages) {
    await chooseLanguage(page, language);
    await expect(page.locator("h1")).toHaveText(packs[language].strings["error.title"]);
  }
  for (const route of ["/package.json", "/recovery/manifest.json", "/docs/not-public"]) expect((await request.get(route)).status()).toBe(404);
});

test("contact destinations remain intact and no upcoming event is invented", async ({ page }) => {
  await page.goto("/contact.html");
  await expect(page.locator('a[href="mailto:communications@mofer.org"]')).toHaveCount(1);
  await expect(page.locator('a[href="tel:+16477795286"]')).toHaveCount(1);
  await expect(page.locator('a[href="https://www.worldchinesemedia.com/2025/09/09/13163/"]')).toHaveAttribute("target", "_blank");
  await expect(page.locator('a[href="https://www.canadanewsreport.com/2025/09/09/16923/"]')).toHaveAttribute("rel", /noreferrer/);
  await page.goto("/exhibitions.html");
  await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
  await expect(page.locator("[data-i18n='exhibition.summary']")).toContainText("2025");
  await expect(page.locator("[data-upcoming], .upcoming-exhibition")).toHaveCount(0);
});

test("facts stay compact, images use their frames, and text has sufficient contrast", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
  await expect(page.locator(".intro__facts strong")).toHaveCount(0);
  const measureContrast = (pairs) => {
    function luminance(color) {
      const channels = color.match(/[\d.]+/gu).slice(0, 3).map(Number).map((channel) => {
        const value = channel / 255;
        return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
      });
      return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
    }
    return pairs.map(([text, background]) => {
      const foreground = luminance(getComputedStyle(document.querySelector(text)).color);
      const surface = luminance(getComputedStyle(document.querySelector(background)).backgroundColor);
      return (Math.max(foreground, surface) + .05) / (Math.min(foreground, surface) + .05);
    });
  };
  const contrast = await page.evaluate(measureContrast, [[".intro__summary", "body"], [".hero .button--primary", ".hero .button--primary"]]);
  for (const ratio of contrast) expect(ratio).toBeGreaterThanOrEqual(4.5);
  await page.goto("/about.html");
  await expect(page.locator("html")).toHaveAttribute("data-language-ready", "en");
  await expect(page.locator(".museum-record .museum-notes > div")).toHaveCount(3);
  await expect(page.locator(".museum-record .museum-notes")).toContainText("100");
  const notesContrast = await page.evaluate(measureContrast, [[".museum-notes dd", "body"]]);
  expect(notesContrast[0]).toBeGreaterThanOrEqual(4.5);
  await page.goto("/collections.html");
  await expect(page.locator(".collection-card")).toHaveCount(8);
  const images = await page.locator(".collection-card img, [data-detail-image]").evaluateAll((elements) => elements.map((image) => ({ fit: getComputedStyle(image).objectFit, padding: parseFloat(getComputedStyle(image).paddingTop) })));
  for (const image of images) { expect(image.fit).toBe("contain"); expect(image.padding).toBeLessThanOrEqual(8); }
});