# MOFER

The Museum of Far East Remembrance website presents the museum's original collections and exhibition history in eight languages. Its porcelain-blue palette, archival paper texture, muted purple exhibition area and slow historical film are unchanged. The site uses script-specific reading typography, open galleries and deliberate whitespace.

Home, About, Collections, Exhibitions, Research & Education, and Contact remain separate pages. The built site serves text, records, original photography, fonts, icons, texture and video locally. Fonts are generated from installed packages during the build, not from the legacy committed font directory. The frontend needs no API, database, framework, translation service or runtime CDN.

[PRODUCT.md](PRODUCT.md) records the content and product constraints. [DESIGN.md](DESIGN.md) documents the implemented museum visual system, with machine-readable component metadata in [.impeccable/design.json](.impeccable/design.json).

## Revision Status

The September 20 editorial typography and open-gallery revision was approved for publication after local review. Pushing `main` to the connected GitHub repository triggers Cloudflare's production build and deployment.

The existing "Moving Archive" identity and seed `f90512f9` are retained. The [implementation plan](docs/superpowers/plans/2026-09-20-editorial-typography.md) records the design decisions and verification outcome. Current source and generated reports describe the implemented revision.

## Local Preview

Use Node.js 22 or newer:

```sh
npm ci
npm run dev
```

Open <http://127.0.0.1:4173>. The preview serves the production files in `dist/`, including generated fonts. Preview that output rather than opening the source HTML against legacy source fonts. After editing source files, run `npm run build` to refresh the directory. If the default port is occupied, build first and use `npx http-server dist -a 127.0.0.1 -p 4180 -c-1`.

On Windows, use `npm.cmd` and `npx.cmd` if PowerShell blocks the corresponding `.ps1` commands.

## Cloudflare Workers Configuration

This repository uses **Workers Static Assets**, compatible with the `npx wrangler deploy` command in Cloudflare Workers Builds. It serves the static site directly; no Worker script, API, or database is required.

The existing Worker is connected to [AlexDongzeyu/MOFER](https://github.com/AlexDongzeyu/MOFER). It builds and deploys from `main` using the settings below.

| Setting | Value |
| --- | --- |
| Worker name | `mofer` (must match `name` in [wrangler.jsonc](wrangler.jsonc)) |
| Production branch | `main` |
| Root directory | Leave blank (repository root) |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Node.js version | `22` (also set in [.nvmrc](.nvmrc)) |

No application secrets or Cloudflare bindings are needed. Cloudflare's connected build supplies deployment authentication; local build, dry-run, and test commands do not publish anything or require login.

[wrangler.jsonc](wrangler.jsonc) declares `assets.directory` as `./dist`. The build copies the public website entry set, skips the legacy source font directory, then generates fonts from the installed packages. Recovery records, tests, the dependency tree, Git files and developer documentation are not deployed. The 25 MiB per-file size check remains. After dependency installation, the build needs no network access to the original site or a font CDN.

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
| [index.html](index.html) | Wordmark and film, split museum introduction, three open object links, exhibition introduction, and research/contact routes |
| [about.html](about.html) | Photographic opening, museum purpose, background, collection context, and the retained contextual facts |
| [collections.html](collections.html) | Compact introduction, count lede, large selected object and reading column, contact sheet, and six collection themes |
| [exhibitions.html](exhibitions.html) | Exhibition history, gallery, press coverage, and contact |
| [research.html](research.html) | Compact introduction, descriptive heading, four existing activities, and collaboration photograph |
| [contact.html](contact.html) | Email, telephone and press links first; collaboration copy and original photograph second |
| [styles.css](styles.css) | Unchanged palette, locale-specific type roles, open galleries, responsive geometry, and viewer presentation |
| [script.js](script.js) | Validated language loading, saved preferences, navigation, collection selection, image viewer, and ambient video |
| [scripts/prepare-fonts.mjs](scripts/prepare-fonts.mjs) | Generate the nine local normal-variable font families and licenses from installed packages |
| [scripts/build.mjs](scripts/build.mjs) | Copy public assets, exclude legacy fonts, generate current fonts, and check per-file size |
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

The six additional translations received the previously documented independent editorial review. [docs/translation-review.md](docs/translation-review.md) retains its scope and the historical university-name ambiguity that needs curatorial confirmation. This typography/layout revision does not change locale packs or certify translations. Native-language museum approval is still recommended for official terminology.

Navigation collapses at (1024px) to a keyboard-accessible menu. Desktop links can wrap when text is enlarged; the rem-based header can grow beyond its minimum. Phones hide the small brand descriptor and language icon, while the native select retains its (132px) maximum width. Every main navigation item leads to its own page, and the old homepage anchors remain usable.

The original hero film is muted, inline and looping, with both playback-rate properties set to `0.25` and no playback button or native control bar. It remains visible and requests continuous playback even with reduced motion enabled; that preference still disables decorative animation and smooth scrolling. Browsers that block autoplay retain the still-image fallback. Continuous playback is the requested behavior, not a promise to override browser policy.

Collection photographs, documents, themes, and exhibition photographs open in a full-resolution viewer with previous/next, zoom, Escape, and focus return. Selecting a collection thumbnail brings its detail into view without discarding keyboard focus. A searchable collection database is still a future project described in the museum's copy, not a new feature claimed by this redesign.

### Local Fonts and Reading

| Locale | Headings | Body and Controls |
| --- | --- | --- |
| `en`, `fr`, `de`, `es`, `ru` | Source Serif 4 Variable | Source Sans 3 Variable |
| `zh-Hans` | Noto Serif SC Variable | Noto Sans SC Variable |
| `zh-Hant` | Noto Serif TC Variable | Noto Sans TC Variable |
| `ja` | Noto Serif JP Variable | Noto Sans JP Variable |

Bodoni Moda is reserved for the MOFER identity. Root language selectors choose the reading families; Russian uses the Source families' Cyrillic coverage, and Chinese/Japanese use the regional Noto pairs. This is supported-family routing, not a claim that every possible character has been verified.

All nine families come from pinned `@fontsource-variable` packages at version `5.3.0`. [scripts/prepare-fonts.mjs](scripts/prepare-fonts.mjs) writes each package's stylesheet, license and all supplied normal variable WOFF2 files to `dist/assets/fonts/`. Fontsource `unicode-range` subsets and `font-display: swap` remain intact; no custom character-subsetting step runs. Browsers can request the applicable font subsets rather than treating the total output size as a single page download.

[scripts/build.mjs](scripts/build.mjs) deliberately excludes committed `assets/fonts/` when copying source assets. That directory remains a legacy reference, not the deployed font source. The old Hanken development dependency is still present but is neither selected in public CSS nor emitted by font preparation. Lucide icons and their license remain local under `assets/icons/`; no font or icon runtime CDN is used.

The shared page-title scale is (4.25 / 3.75 / 3rem), section headings (2.5 / 2.25 / 2rem), main prose (1.0625rem desktop, 1rem phones), and shared metadata (.875rem). Latin/Cyrillic reading uses (1.75) leading and (64ch); CJK uses (1.95) and (32em). These are role defaults, not uniform values for every heading, caption or control; [DESIGN.md](DESIGN.md) records the exceptions.

Readable text uses `rem`, while the large masthead, hero and footer wordmarks keep fixed-pixel identity sizes. The small viewer wordmark remains rem-based. Text enlargement should reflow prose and navigation without inflating the graphic marks or clipping long German metadata. Shrinkable grid tracks, zero intrinsic minimums where needed, hyphenation and wrapping are part of that behavior, not reasons to reduce body text.

### Open Layout and First Views

These are page priorities, not a requirement to squeeze every section into one viewport, especially at enlarged text sizes.

| Page | Intended First-View Task | Content Flow |
| --- | --- | --- |
| Home | Recognize MOFER over its original film and choose Collections or Past exhibitions | One primary button and one text link; split introduction, three open highlights, exhibition feature, research/contact routes |
| About | Understand the museum's purpose through its photographic opening | Full museum context and three contextual facts remain here |
| Collections | Read the count lede and begin inspecting the selected object | Compact introduction, object plus unframed reading column, thumbnails, then six themes; no redundant image banner |
| Exhibitions | Recognize the documented past exhibition | Photographic opening, dated historical context, gallery and press links; no future-event placeholders |
| Research | Understand the museum's existing research and education work | Compact introduction and descriptive heading, four activities, then collaboration copy and photograph |
| Contact | Reach email, telephone and press links before the invitation | Direct contacts on the left and collaboration/photo on the right; contact methods come first on phones |

Preview, thumbnail and theme image mats are transparent; the selected-object surround is also unframed. Historical objects remain contained and uncropped. Home's three highlights use varied column proportions; collection themes and exhibition photographs use two columns on desktop and one on phones. Collection thumbnails use four columns and two on phones. The image-inspection dialog remains a framed tool with full-image containment.

The four small Home hero topic labels and duplicated three-fact block are no longer displayed there. Their removal does not discard substantive content or locale JSON: contextual facts remain on About, and full object summaries stay in the selected detail. Preserve the selected title's `h2`, `data-detail-title` hook and section association.

The unchanged [paper texture](assets/textures/archive-paper.png) comes from a blank margin of the original Pearl S. Buck letter, not a generated historical artifact. [scripts/prepare-texture.mjs](scripts/prepare-texture.mjs) reproduces it; no texture regeneration is part of this revision. Texture stays off the original photographs and documents. Deliberate separation and open reading columns replace repeated frames, without changing the nine palette values or adding marketing claims.

### Museum Reference Evidence

References inform hierarchy and readable context, not branding, font licensing, copied assets or invented visitor services. This was not an unqualified full visual review of all four sites.

| Reference | Usable Observation | Capture Limitation |
| --- | --- | --- |
| [Royal Ontario Museum](https://www.rom.on.ca/) | Live DOM/computed type evidence included ABCMonumentGrotesk and ROMCoign; clear display/body hierarchy | The automated PNG showed an introductory loader, not a reliable finished-page composition |
| [Art Gallery of Ontario](https://ago.ca/) | Integrated-browser DOM evidence showed Common Ground type roles and ranked content | Headless captures showed a security page |
| [Smithsonian American History](https://americanhistory.si.edu/) | Accessible page content supported object-first stories and routes into collections | Headless captures showed a security page; no complete visual assessment is claimed |
| [Canadian Museum of History](https://www.historymuseum.ca/) | Futura PT evidence, readable supporting text and practical navigation hierarchy | The captured video failed to black and a cookie banner obscured the view |

The generated study under `recovery/reference/museum-study-sep20/` remains ignored reference material. Security pages, loaders, failed media and cookie-obscured captures are not design evidence. MOFER's implemented fonts are the local families listed above, not copies of these museum brands.

### Future Exhibitions

The [future exhibition proposal](docs/superpowers/plans/2026-09-19-porcelain-blue-multilingual.md) recommends an uncropped poster-led homepage feature and a dedicated exhibition page with adjacent factual details and a photographic sequence. No future exhibition title, date, poster, marketing material, booking action, or placeholder is displayed before the owner supplies approved content.

## Verification

This documentation-only refresh did not run terminals, browsers, servers, detectors, builds or tests; the owning session controls the shared full-suite run. Editor diagnostics on the four documentation files are not a substitute for runtime or visual verification.

```sh
npx playwright install chromium
npm run build
npm run check:deploy
npm test
```

The suite runs against Cloudflare's local Workers Static Assets runtime with external browser requests blocked. Coverage includes the six pages and eight languages, desktop/wide/tablet/mobile geometry, a 320-pixel overflow check, locale schemas, historical facts, content coverage, saved language, failed/invalid translation loads, all collection records, image inspection, quarter-speed playback, reduced motion, English fallback, contrast, headers, canonical routes and localized nested 404s. New focused checks address locale-specific font families/loading, open-gallery geometry and text enlargement. The suite starts and stops its test server on port 4175; set `TEST_PORT` to another free port if needed.

GitHub Actions runs the build, deployment dry run, and functional suite on pushes and pull requests. Test screenshots and failure traces remain local or in CI artifacts, not in the deployed site.

### Content and Visual Verification

Before the redesign, all 28 recovered files were independently checked against the original source hashes. That version remains in Git history. The current HTML, CSS, and JavaScript intentionally differ: the user authorized both a visual redesign and an editorial pass. The original historical media and collection metadata remain unchanged.

[tests/fixtures/content.json](tests/fixtures/content.json) retains the original bilingual records and text as reference evidence. Tests keep original English/Simplified Chinese collection metadata exact, preserve media identity across all translations, and require substantive text to remain present across the dedicated pages. [tests/fixtures/facts.json](tests/fixtures/facts.json) protects historical names, dates, counts, places, and themes. Coverage and keyword checks support, rather than replace, editorial translation review.

The duplicate Home notes were removed from presentation, not from the historical record: the facts and contrast guard now target their retained About presentation. Do not delete a content guard merely because a fact moved to its owning page.

Render tests save first-view and full-page captures in `test-results/`; the current report identifies the captured page/locale/viewport combinations. Other runtime checks cover text, attributes, image loading and overflow. These files and prior recovery captures are excluded from deployment and Git. The design is intentionally not a pixel-identical copy of the original site or a reference museum.

Current test results and screenshots are written to `test-results/`. The site has not been formally certified for accessibility, and a local test pass is not a claim of completed production deployment.

Original image/video assets remain unchanged. Generated reports are authoritative for the revision they tested; pending checks remain pending. Earlier test counts describe earlier versions and should not be used as evidence for current edits. Font-family and loading checks do not establish exhaustive character coverage or native-language translation certification.

## Recovery Record

[recovery/manifest.json](recovery/manifest.json) records the original URLs, source sizes, hashes, capture time, and discovered page inventory for 28 recovered files. These hashes describe the recovery baseline; ordinary builds do not prevent intentional future edits.

[scripts/recover.mjs](scripts/recover.mjs) can re-fetch public source with `npm run recover`. It refuses to overwrite a local file whose contents differ, so it must not be used as a routine build or update command. No credentials are needed.

Published HTML, CSS, JavaScript, and media were recoverable. The owner's lost Git history, unpublished files, original development tooling, and any private systems are not recovered by downloading the public site. The added tooling, 404 page, headers, and deployment setup are new. External press, email, and telephone links intentionally retain their original destinations.