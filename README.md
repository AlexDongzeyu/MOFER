# MOFER

The Museum of Far East Remembrance website presents the museum's original collections and exhibition history in eight languages. Its porcelain-blue surfaces retain the archival paper texture and muted purple exhibition area, with a slow historical film and an image-led collection.

Home, About, Collections, Exhibitions, Research & Education, and Contact have separate pages. All text, collection records, original photography, fonts, icons, texture, and video are stored locally. The frontend needs no API, database, framework, translation service, or runtime CDN.

[PRODUCT.md](PRODUCT.md) records the content and product constraints. [DESIGN.md](DESIGN.md) documents the implemented museum visual system, with machine-readable component metadata in [.impeccable/design.json](.impeccable/design.json).

## Local Preview

Use Node.js 22 or newer:

```sh
npm ci
npm run dev
```

Open <http://127.0.0.1:4173>. The preview serves the production files in `dist/`. After editing source files, run `npm run build` to refresh that directory. If the default port is occupied, build first and use `npx http-server dist -a 127.0.0.1 -p 4180 -c-1`.

On Windows, use `npm.cmd` and `npx.cmd` if PowerShell blocks the corresponding `.ps1` commands.

## Deploy on Cloudflare Workers

This repository uses **Workers Static Assets**, compatible with the `npx wrangler deploy` command in Cloudflare Workers Builds. It serves the static site directly; no Worker script, API, or database is required.

In Cloudflare, create or open a Worker connected to [AlexDongzeyu/MOFER](https://github.com/AlexDongzeyu/MOFER) and use these build settings. If the Worker is already connected, keep the commands below and retry deployment using the latest commit.

| Setting | Value |
| --- | --- |
| Worker name | `mofer` (must match `name` in [wrangler.jsonc](wrangler.jsonc)) |
| Production branch | `main` |
| Root directory | Leave blank (repository root) |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Node.js version | `22` (also set in [.nvmrc](.nvmrc)) |

No application secrets or Cloudflare bindings are needed. Cloudflare's connected build supplies deployment authentication; local build, dry-run, and test commands do not publish anything or require login.

[wrangler.jsonc](wrangler.jsonc) declares `assets.directory` as `./dist`. The build copies only the website into that directory, excluding recovery records, tests, dependencies, Git files, and developer documentation. It retains the 25 MiB per-file size check. No network access to the original site is needed during a build or normal operation.

Workers' default HTML handling canonicalizes `.html` URLs to extensionless URLs. The original links remain valid, including cross-page fragment links. `assets.not_found_handling` is explicitly set to `404-page`, using the top-level [404.html](404.html) for missing routes. Do not add a catch-all SPA rewrite.

The earlier Pages-only `pages_build_output_dir` setting is not compatible with `wrangler deploy`: it caused the reported "Missing entry-point to Worker script or to assets directory" error. Keep the Workers configuration and deploy command together.

To validate deployment configuration and test Workers routing and headers locally without deploying:

```sh
npm run build
npm run check:deploy
npm run preview:cloudflare
```

Open <http://127.0.0.1:4174>. To use a different free port, run `npx wrangler dev --local --ip 127.0.0.1 --port 4181` directly. Connecting a custom domain and changing DNS are separate owner-managed steps after checking the deployment.

## Editing the Website

| File | Responsibility |
| --- | --- |
| [index.html](index.html) | Short homepage overview, contextual museum notes, selected object links, and exhibition introduction |
| [about.html](about.html) | Museum purpose, background, and collection context |
| [collections.html](collections.html) | Featured collection selector and additional collection themes |
| [exhibitions.html](exhibitions.html) | Exhibition history, gallery, press coverage, and contact |
| [research.html](research.html) | Preservation, digitization, research, education, and collaboration |
| [contact.html](contact.html) | Contact information, collaboration invitation, and press links |
| [styles.css](styles.css) | Museum design tokens, local typography, gallery layouts, responsive breakpoints, and image-viewer presentation |
| [script.js](script.js) | Validated language loading, saved preferences, navigation, collection selection, image viewer, and ambient video |
| [assets/i18n/en.json](assets/i18n/en.json) | Canonical English text and eight collection records |
| [404.html](404.html) | Localized not-found page, including missing nested routes |
| [_headers](_headers) | Cloudflare response headers |

Images and video retain their original relative paths in `assets/`. Copy lives in `assets/i18n/<locale>.json`, with `strings` for the interface and pages, and `collections` for the eight objects. Keep the same keys and record order in every language. Object IDs, image paths, and optional `fit` values must match English; translate the title, type, date, place, and summary. Verify historical details before changing them.

After editing English copy, run `node scripts/sync-copy.mjs` to synchronize the default HTML text without reformatting the markup. Add `data-i18n`, `data-i18n-alt`, or `data-i18n-aria` to localized elements. The controller also updates document titles and descriptions. Adding fields or objects requires updating all packs and the corresponding validation/tests.

### Languages

| Choice | File |
| --- | --- |
| English | [assets/i18n/en.json](assets/i18n/en.json) |
| 简体中文 | [assets/i18n/zh-Hans.json](assets/i18n/zh-Hans.json) |
| Français | [assets/i18n/fr.json](assets/i18n/fr.json) |
| 繁體中文 | [assets/i18n/zh-Hant.json](assets/i18n/zh-Hant.json) |
| 日本語 | [assets/i18n/ja.json](assets/i18n/ja.json) |
| Русский | [assets/i18n/ru.json](assets/i18n/ru.json) |
| Deutsch | [assets/i18n/de.json](assets/i18n/de.json) |
| Español | [assets/i18n/es.json](assets/i18n/es.json) |

English is the default on a fresh visit. A visitor's explicit selection is saved locally as `mofer-language` and retained across navigation and reloads. Invalid preferences fall back to English. If a selected translation fails to load or validate, the previous language stays readable and a localized retry action is available, including after an initial English load failure. An open image viewer updates its captions when a pending translation completes.

The six additional translations received an independent editorial review. [docs/translation-review.md](docs/translation-review.md) records the review scope and one historical university-name ambiguity that needs curatorial confirmation. Native-language museum approval is still recommended for official terminology.

Navigation collapses to a keyboard-accessible menu on tablet and mobile. Every main navigation item leads to its own page, while the old homepage anchors remain usable. The hero film is muted, loops automatically at `0.25` speed, and has no playback control. As requested, it remains visible and playing even with reduced motion enabled; that preference still disables decorative animation and smooth scrolling. Browsers that block autoplay retain the still-image fallback.

Collection photographs, documents, themes, and exhibition photographs open in a full-resolution viewer with previous/next, zoom, Escape, and focus return. Selecting a collection thumbnail brings its detail into view without discarding keyboard focus. A searchable collection database is still a future project described in the museum's copy, not a new feature claimed by this redesign.

Typography is self-hosted under `assets/fonts/`: Bodoni Moda, Hanken Grotesk, and Noto Serif SC from their pinned Fontsource packages, with the original font licenses. Lucide SVG icons and their license are under `assets/icons/`. No fonts or icons are requested from an external CDN. Existing photography and video remain at their original paths.

The background texture in `assets/textures/archive-paper.png` comes from a blank margin of the Pearl S. Buck letter, not a generated historical artifact. `node scripts/prepare-texture.mjs` reproduces the raster tile. The document image itself is unchanged. Deep porcelain blue, blue-gray image mats, pale blue accents, and the muted purple exhibition band replace green and white surfaces. Contextual notes replace oversized statistics; images use reduced padding while retaining their full proportions.

### Future Exhibitions

The [future exhibition proposal](docs/superpowers/plans/2026-09-19-porcelain-blue-multilingual.md) recommends an uncropped poster-led homepage feature and a dedicated exhibition page with adjacent factual details and a photographic sequence. No future exhibition title, date, poster, marketing material, booking action, or placeholder is displayed before the owner supplies approved content.

## Verification

```sh
npx playwright install chromium
npm run build
npm run check:deploy
npm test
```

The suite runs against Cloudflare's local Workers Static Assets runtime with external browser requests blocked. Each of the six pages is exercised in all eight languages at desktop, wide desktop, tablet, and mobile widths, including a 320-pixel overflow check. It also covers locale schemas, historical facts, cross-page content coverage, remembered language choice, failed/invalid language loads, all eight collection records in every language, image-viewer controls, quarter-speed playback, reduced-motion behavior, English fallback content, contrast, headers, canonical routes, and localized nested 404s. It starts and stops its test server on port 4175; set `TEST_PORT` to another free port if needed.

GitHub Actions runs the build, deployment dry run, and functional suite on pushes and pull requests. Test screenshots and failure traces remain local or in CI artifacts, not in the deployed site.

### Content and Visual Verification

Before the redesign, all 28 recovered files were independently checked against the original source hashes. That version remains in Git history. The current HTML, CSS, and JavaScript intentionally differ: the user authorized both a visual redesign and an editorial pass. The original historical media and collection metadata remain unchanged.

[tests/fixtures/content.json](tests/fixtures/content.json) retains the original bilingual records and text as reference evidence. Tests keep original English/Simplified Chinese collection metadata exact, preserve media identity across all translations, and require substantive text to remain present across the dedicated pages. [tests/fixtures/facts.json](tests/fixtures/facts.json) protects historical names, dates, counts, places, and themes. Coverage and keyword checks support, rather than replace, editorial translation review.

Render tests save English, Simplified Chinese, and German first-viewport and full-page captures on desktop/mobile in `test-results/`. Every other locale is still checked for complete text, attributes, image loading, and overflow. These files and prior recovery captures are excluded from deployment and Git. The design is intentionally not a pixel-identical copy of the original site or a reference museum.

Current test results and screenshots are written to `test-results/`. The site has not been formally certified for accessibility, and a local test pass is not a claim of completed production deployment.

Original image/video assets remain unchanged. Fresh verification results for this revision are recorded in the generated reports; earlier test counts describe earlier versions and should not be used as evidence for current edits.

## Recovery Record

[recovery/manifest.json](recovery/manifest.json) records the original URLs, source sizes, hashes, capture time, and discovered page inventory for 28 recovered files. These hashes describe the recovery baseline; ordinary builds do not prevent intentional future edits.

[scripts/recover.mjs](scripts/recover.mjs) can re-fetch public source with `npm run recover`. It refuses to overwrite a local file whose contents differ, so it must not be used as a routine build or update command. No credentials are needed.

Published HTML, CSS, JavaScript, and media were recoverable. The owner's lost Git history, unpublished files, original development tooling, and any private systems are not recovered by downloading the public site. The added tooling, 404 page, headers, and deployment setup are new. External press, email, and telephone links intentionally retain their original destinations.