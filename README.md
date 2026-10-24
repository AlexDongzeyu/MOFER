# MOFER

Production website: [mofer.org](https://mofer.org).

The Museum of Far East Remembrance website presents original collections and exhibition history in five languages. A darker archival-blue palette, quiet paper grain and muted plum exhibition field retain the museum's identity while letting the original objects lead. A four-scene historical film plays at 85% speed. Script-specific serif reading, single image mounts and aligned captions support an object-led gallery. Transitions use fades, without ornamental borders.

Home, About, Collections, Exhibitions and Contact are the site pages. The photo gallery is an expandable section within Collections, with a prominent access button at the top of that page. Research & Education has been removed. Old research URLs redirect to About; old gallery URLs redirect to Collections. The built site serves text, records, original photography, fonts, icons, texture and video locally. Fonts are generated from installed packages during the build, not from the legacy committed font directory. The only intentional third-party embed is Google Maps for Boynton House on Home and Exhibitions; the museum still needs no backend, database, translation service or runtime font CDN.

[PRODUCT.md](PRODUCT.md) records the content and product constraints. [DESIGN.md](DESIGN.md) documents the implemented museum visual system, with machine-readable component metadata in [.impeccable/design.json](.impeccable/design.json).

## Revision Status

The October 10 texture correction removes the opaque layer that washed out the approved paper pattern. The original grain is again rendered at full soft-light strength on page backgrounds, the header, exhibition field and footer, while preserving the darker palette and fade transitions. Twelve focused checks passed across four screen sizes, including rendered-pixel comparisons showing more than three times the grain variation of the masked version and readable text contrast.

This correction is live as Cloudflare version `a69a00b3-86f6-440d-bf10-a54c13540b6d`. Live verification confirmed the unmasked background treatment and exact stylesheet/texture matches with the built local assets.

The October 9 curatorial refresh names the collection's historical scope: late Qing and Republican China, the Second World War in Asia, postwar justice, and Chinese lives overseas. Collection titles, dates, places and full historical summaries remain unchanged. The five supported languages are English, Simplified Chinese, French, Traditional Chinese and Japanese; removed Russian, Spanish and Deutsch preferences safely fall back to English.

Collections now provides an interactive reading desk: browse three historical themes, move between objects, use keyboard arrows or Home/End, enlarge originals and open observation prompts. Selection and theme persist through language changes, and the full-image viewer follows the filtered group. The photograph gallery shows one coherent group at a time, with consistent frames and specific captions. All 39 originals remain available. Contact pairs direct methods and two real press previews with the collaboration narrative, aligning both columns at the top.

The build supplies a complete first collection record and eight original-image links without JavaScript. Native disclosures retain gallery and observation access. Static images, interface assets and all five language packs remain local; the Google Maps embed is still the only runtime third-party service.

Published to [Cloudflare](https://mofer.alexdong0414.workers.dev) as version `e42a4d1b-2df7-41d4-9213-87fec2e1c132`. Seventy-six targeted browser checks passed across desktop, wide, tablet and mobile projects, covering all five languages, historical facts, discovery controls, gallery groups, text enlargement, contrast, native fallbacks, poster alignment and maps. Live checks verified every page and language, the new interactions, removed-language 404 responses, and exact SHA-256 matches for the deployed controller, stylesheet and language packs.

The October 6 media update adds the 2026 Tokyo Trial poster, dates and opening hours alongside the 2025 Forgotten Ally poster and history. Both exhibitions share the existing Boynton House map. Large, uncropped posters align with the bottom of the adjacent content, using a shared two-column grid. Simplified and Traditional Chinese select the Chinese-led Tokyo Trial poster; all other languages use the English-led version. The supplied 2025 poster is bilingual. Interface separators use commas, not middle dots; original artwork is preserved.

Home and Exhibitions link directly to the [gallery within Collections](collections.html#gallery), containing all 39 supplied images, grouped by posters, the Tokyo Trial, collection material and community visits. Full photographs retain their supplied watermarks. Lazy-loaded WebP thumbnails open the original JPEGs in the existing keyboard-accessible zoom viewer, with a native expandable section and plain image links when JavaScript is unavailable. Direct gallery anchors automatically expand the section when JavaScript is enabled.

The initial media release was published to [Cloudflare](https://mofer.alexdong0414.workers.dev) on October 6, 2026 (version `b492ca37-a372-4bbf-8aa0-41e7dec1e992`). Its test results describe that earlier release, not subsequent layout refinements.

The refined layout was published the same day as version `38cc3766-8b5f-4000-9f67-39b4904f4979`. Responsive and multilingual checks passed, including exact poster bottom alignment and locale switching. Pixel comparisons verified all four encoded crossfades, including the loop boundary, and confirmed image content rather than sidebars at both edges of the portrait scene. Live checks confirmed redirects, the Collections gallery, poster variants and playback of the matching 18-second film.

To regenerate media after editing the supplied `img/` files, run `node scripts/prepare-media.mjs` with FFmpeg installed. This produces the committed assets and source-to-output manifest in `assets/gallery/`, plus `assets/video/remembrance-montage.mp4` and its poster. The film joins all four supplied clips in the order aircraft, convoy, transport, community, without audio. Each clip fills a 16:9 frame without bars or stretching; half-second crossfades include the final transition back to the first clip. The 18-second file plays in about 21 seconds at 0.85 speed. Normal builds need no FFmpeg: `npm run build` inserts gallery HTML into Collections from the committed manifest and English language pack. New interface strings are provided in all eight language packs.

The September 21 printed-album refinement, fade-led borders and Boynton House maps were approved for publication after local review. Pushing the release to the connected repository's `main` branch triggers Cloudflare's production build and deployment.

The existing "Moving Archive" identity and seed `f90512f9` are retained, without a new identity or visual-comp approval. The [printed archive plan](docs/superpowers/plans/2026-09-21-printed-archive.md) records the delegated direction and verification work. Current source establishes the implementation; completed reports establish results only for the revision they tested.

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
| Production domain | [mofer.org](https://mofer.org) |
| Worker name | `mofer` (must match `name` in [wrangler.jsonc](wrangler.jsonc)) |
| Production branch | `main` |
| Root directory | Leave blank (repository root) |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Node.js version | `22` (also set in [.nvmrc](.nvmrc)) |

No application secrets or Cloudflare bindings are needed. Cloudflare's connected build supplies deployment authentication; local build, dry-run, and test commands do not publish anything or require login.

[wrangler.jsonc](wrangler.jsonc) declares `assets.directory` as `./dist`. The build copies the public website entry set, skips the legacy source font directory, then generates fonts from the installed packages. Recovery records, tests, the dependency tree, Git files and developer documentation are not deployed. The 25 MiB per-file size check remains. After dependency installation, the build needs no network access to the original site or a font CDN.

The initial September 21 printed-album build contained **755 static files totaling 65.56 MiB**. That measurement describes the complete deployment directory, including all font subsets and media, not a single-page download size or a new measurement of the fade-led border revision. Browser requests select applicable assets and font subsets.

Workers' default HTML handling canonicalizes `.html` URLs to extensionless URLs. The original links remain valid, including cross-page fragment links. `assets.not_found_handling` is explicitly set to `404-page`, using the top-level [404.html](404.html) for missing routes. Do not add a catch-all SPA rewrite.

The earlier Pages-only `pages_build_output_dir` setting is not compatible with `wrangler deploy`: it caused the reported "Missing entry-point to Worker script or to assets directory" error. Keep the Workers configuration and deploy command together.

To validate deployment configuration and test Workers routing and headers locally without deploying:

```sh
npm run build
npm run check:deploy
npm run preview:cloudflare
```

Open <http://127.0.0.1:4174>. To use a different free port, run `npx wrangler dev --local --ip 127.0.0.1 --port 4181` directly. After pushing a release to `main`, verify the updated site at <https://mofer.org>. Custom-domain bindings and DNS remain managed in the Cloudflare dashboard; routine website updates do not require DNS changes.

## Editing the Website

| File | Responsibility |
| --- | --- |
| [index.html](index.html) | Wordmark and film, split museum introduction, three mounted object links, exhibition introduction, and gallery/contact routes |
| [about.html](about.html) | Photographic opening, museum purpose, background, collection context, and the retained contextual facts |
| [collections.html](collections.html) | Interactive reading desk, historical themes, top gallery access, grouped photo gallery and six wider collection themes |
| [exhibitions.html](exhibitions.html) | 2026 and 2025 posters, representative photographs, venue map, press coverage, and gallery access |
| [scripts/prepare-media.mjs](scripts/prepare-media.mjs) | Prepare the supplied images, thumbnails, provenance manifest and four-clip hero film |
| [contact.html](contact.html) | Email, telephone and two press previews; aligned collaboration copy and original photograph |
| [styles.css](styles.css) | Unchanged palette and grain, serif reading roles, printed mounts, fade-led joins and a restrained exhibition border, compact responsive spacing, and viewer presentation |
| [script.js](script.js) | Validated language loading, saved preferences, navigation, collection selection, measured row/caption alignment, image viewer, and ambient video |
| [scripts/prepare-fonts.mjs](scripts/prepare-fonts.mjs) | Generate the nine local normal-variable font families and licenses from installed packages |
| [assets/textures/exhibition-border.png](assets/textures/exhibition-border.png) | Retained development asset; no longer used in the interface |
| [scripts/prepare-exhibition-border.mjs](scripts/prepare-exhibition-border.mjs) | Legacy border preparation, not part of the normal build |
| [scripts/build.mjs](scripts/build.mjs) | Copy public assets, exclude legacy fonts, generate current fonts, and check per-file size |
| [assets/i18n/en.json](assets/i18n/en.json) | Canonical English text and eight collection records |
| [404.html](404.html) | Localized not-found page, including missing nested routes |
| [_headers](_headers) | Cloudflare response headers |
| [_redirects](_redirects) | Redirect retired gallery and research URLs without breaking existing links |

Images and video retain their relative paths in `assets/`. Copy lives in `assets/i18n/<locale>.json`, with `strings` for the interface, pages and photograph captions, and `collections` for the eight objects. Keep the same keys and record order in every language. Object IDs, image paths, optional `fit` values and `theme` values must match English. Translate title, type, date, place, summary, context and observation prompt (`look`). Themes are `war`, `change` and `culture`; all controls and validation use these same identities. Verify historical details before changing them.

After editing English copy, run `node scripts/sync-copy.mjs` to synchronize the default HTML text without reformatting the markup. Add `data-i18n`, `data-i18n-alt`, `data-i18n-aria`, or `data-i18n-title` to localized elements. The controller also updates document titles and descriptions. Adding fields or objects requires updating all packs and the corresponding validation/tests.

### Languages

| Choice | File |
| --- | --- |
| English | [assets/i18n/en.json](assets/i18n/en.json) |
| 简体中文 | [assets/i18n/zh-Hans.json](assets/i18n/zh-Hans.json) |
| Français | [assets/i18n/fr.json](assets/i18n/fr.json) |
| 繁體中文 | [assets/i18n/zh-Hant.json](assets/i18n/zh-Hant.json) |
| 日本語 | [assets/i18n/ja.json](assets/i18n/ja.json) |

English is the default on a fresh visit. A visitor's explicit selection is saved locally as `mofer-language` and retained across navigation and reloads. Invalid preferences fall back to English. If a selected translation fails to load or validate, the previous language stays readable and a localized retry action is available, including after an initial English load failure. An open image viewer updates its captions when a pending translation completes.

[docs/translation-review.md](docs/translation-review.md) records the historical review's scope and a university-name ambiguity needing curatorial confirmation. Its earlier review does not certify the October 9 copy or new observation prompts. Native-language museum approval is recommended for official terminology. Interface separators use commas, not ornamental dots.

### Boynton House Map

Home and Exhibitions include a map below their exhibition and press links, filling the available column height alongside the poster. The iframe uses Google place identifier `522738823898078509`, verified against Boynton House at 1300 Elgin Mills Road East, Richmond Hill. The [City of Richmond Hill venue page](https://www.richmondhill.ca/en/things-to-do/Boynton-House-Art-Exhibition-Space.aspx) confirms the address. The caption identifies the shared 2025 and 2026 exhibition venue, not a permanent MOFER location.

The iframe lazy-loads from Google, uses the selected language, and requires no application API key. Loading it contacts Google and is subject to Google's availability and privacy practices. The address and an external Google Maps link stay visible outside the iframe when the provider is blocked or unavailable. Geolocation, camera and microphone permissions remain disabled by the existing site headers.

Browser tests replace only the approved Google map iframe navigation with an inert document for deterministic checks; other external requests remain blocked. Those tests verify the museum's integration, not Google's map tiles. Real-provider rendering is checked separately with live captures.

Navigation collapses at (1024px) to a keyboard-accessible menu. Desktop links can wrap when text is enlarged; the rem-based header can grow beyond its minimum. The small brand descriptor is hidden at every width, and phones also hide the language icon. The native select retains (16px) text and a (148px) maximum width. Every main navigation item leads to its own page, and the old homepage anchors remain usable.

The original hero film is muted, inline and looping, with both playback-rate properties set to `0.25` and no playback button or native control bar. It remains visible and requests continuous playback even with reduced motion enabled; that preference still disables decorative animation and smooth scrolling. Browsers that block autoplay retain the still-image fallback. Continuous playback is the requested behavior, not a promise to override browser policy.

Collection photographs, documents, themes, and exhibition photographs open in a full-resolution viewer with previous/next, zoom, Escape, and focus return. Selecting a collection thumbnail brings its detail into view without discarding keyboard focus. A searchable collection database is still a future project described in the museum's copy, not a new feature claimed by this redesign.

### Local Fonts and Reading

| Locale | Editorial Headings and Prose | Interface and Captions |
| --- | --- | --- |
| `en`, `fr`, `de`, `es`, `ru` | Source Serif 4 Variable | Source Sans 3 Variable |
| `zh-Hans` | Noto Serif SC Variable | Noto Sans SC Variable |
| `zh-Hant` | Noto Serif TC Variable | Noto Sans TC Variable |
| `ja` | Noto Serif JP Variable | Noto Sans JP Variable |

Bodoni Moda is reserved for the MOFER identity. Root language selectors choose the families; Russian uses the Source families' Cyrillic coverage, and Chinese/Japanese use the regional Noto pairs. Serif type now carries editorial prose as well as headings; sans-serif remains the interface and caption role. No new font dependencies were added for this refinement. This is supported-family routing, not a claim that every possible character has been verified.

All nine families come from pinned `@fontsource-variable` packages at version `5.3.0`. [scripts/prepare-fonts.mjs](scripts/prepare-fonts.mjs) writes each package's stylesheet, license and all supplied normal variable WOFF2 files to `dist/assets/fonts/`. Fontsource `unicode-range` subsets and `font-display: swap` remain intact; no custom character-subsetting step runs. Browsers can request the applicable font subsets rather than treating the total output size as a single page download.

[scripts/build.mjs](scripts/build.mjs) deliberately excludes committed `assets/fonts/` when copying source assets. That directory remains a legacy reference, not the deployed font source. The old Hanken development dependency is still present but is neither selected in public CSS nor emitted by font preparation. Lucide icons and their license remain local under `assets/icons/`; no font or icon runtime CDN is used.

The shared page-title scale is (4.25 / 3.75 / 3rem), and section headings are (2.75 / 2.5 / 2.125rem), both at weight (600). Ordinary editorial prose is (1.1875rem) on desktop/tablet and (1.125rem) on phones: 19px and 18px at the default 16px root. Captions, standard navigation, buttons, text links and the select are (1rem); footer body text and back-to-top are also (1rem). Latin/Cyrillic reading uses (1.7) leading and (60ch); CJK uses (1.85) and (30em).

These are role defaults, not a claim that every visible word is 19px. The expanded compact menu uses (1.1rem), status/retry text (.85rem), and viewer counters (.8rem desktop / .875rem phone). Third-level titles, contact links, identity marks and the footer statement have component exceptions recorded in [DESIGN.md](DESIGN.md). The final editorial-prose rule in the stylesheet overrides earlier smaller local lede/summary sizes.

Readable text uses `rem`, while the large masthead, hero and footer wordmarks keep fixed-pixel identity sizes. The small viewer wordmark remains rem-based. Text enlargement should reflow prose and navigation without inflating the graphic marks or clipping long German metadata. Shrinkable grid tracks, zero intrinsic minimums where needed, hyphenation and wrapping are part of that behavior, not reasons to reduce body text.

### Printed-Album Layout and First Views

These are page priorities, not a requirement to squeeze every section into one viewport, especially at enlarged text sizes.

| Page | Intended First-View Task | Content Flow |
| --- | --- | --- |
| Home | Recognize MOFER over its historical film and choose Collections or Exhibitions | One primary button and one text link; split introduction, three mounted highlights, large exhibition posters, gallery/contact routes |
| About | Understand the museum's purpose through its photographic opening | Full museum context and three contextual facts remain here |
| Collections | Begin inspecting an original object | Compact heading and gallery access, image with adjacent discovery controls, historical context and observation prompt, then contact sheet and six themes |
| Exhibitions | Recognize the documented past exhibition | Photographic opening, dated historical context, gallery and press links; no future-event placeholders |
| Contact | Reach email, telephone and relevant reporting | Top-aligned direct contacts and illustrated press previews on the left; collaboration/photo on the right; contact methods come first on phones |

Sections and reading columns remain open. Images use transparent, square mounts with (8px) padding and a single (1px) outer rule at (38%) accent. Historical objects remain contained and uncropped, with any original scanned mount preserved as part of the image. Visitor photographs have consistent cropped previews with the complete original in the viewer. Full-bleed film and photographic openings stay unframed.

Home's three highlights use equal image stages and caption baselines, with (36px) desktop gaps, then one column on phones. Collection themes and exhibition photographs use two columns and one on phones; thumbnails use four and two. The gallery uses three columns on desktop and two on smaller screens. Shared section padding is (48 / 48 / 40px). Exact responsive exceptions are recorded in [DESIGN.md](DESIGN.md).

`scheduleArtifactLayout` measures mount bounds and row offsets in one animation-frame batch, skipping hidden gallery groups. Native-sized collection and pathway mounts retain centered rows. Home highlights and gallery groups use consistent stage sizes and full-column captions. The helper responds to image loads, font readiness, locale updates and resize without resetting focus, selection or viewer state.

The four small Home hero topic labels and duplicated three-fact block are no longer displayed there. Their removal does not discard substantive content or locale JSON: contextual facts remain on About, and full object summaries stay in the selected detail. Preserve the selected title's `h2`, `data-detail-title` hook and section association.

The unchanged [paper texture](assets/textures/archive-paper.png) comes from a blank margin of the original Pearl S. Buck letter, not a generated historical artifact. [scripts/prepare-texture.mjs](scripts/prepare-texture.mjs) reproduces it; no paper-grain regeneration is part of this revision. Texture stays off original photographs and documents. Flat image mounts remain part of the printed-album treatment; the fade-led border refinement does not change mounts, spacing or image alignment.

### Fade-Only Transitions

Smooth fades carry the transitions. The exhibition ornament and double image borders have been removed. The hero entrance and selected-object image changes use opacity only; reduced-motion settings remove interface animation.

No page uses isolated curls, ornamental symbols or decorative section borders. Single image mounts and the quiet masthead edge remain structural treatments.

The film meets the page through a (64px) fade. Photographic openings retain their legibility overlay and bottom fade. The darker exhibition field and footer use gradient joins of (48px) and (32px), without repeating texture at these transitions.

The former [border asset](assets/textures/exhibition-border.png) and [preparation script](scripts/prepare-exhibition-border.mjs) remain development history, not part of the current presentation or historical evidence.

### Museum Reference Evidence

References inform hierarchy and readable context, not branding, font licensing, copied assets or invented visitor services. This was not an unqualified full visual review of all four sites.

The October 9 discovery interaction draws on [IWM's official collection-search guidance](https://www.iwm.org.uk/collections/how-to): meaningful historical grouping, clear dates and object categories, and an image-led route into individual records. The small MOFER selection uses a reading desk rather than pretending to be a searchable institutional database. Both contact previews link to the existing verified September 9, 2025 reports; their summaries are original, not copied article text.

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

Run the build, deployment dry run and complete suite before publishing a revision. Use reports and screenshots from that exact revision; editor diagnostics and older passing results are not substitutes for runtime or visual verification.

```sh
npx playwright install chromium
npm run build
npm run check:deploy
npm test
```

The suite runs against Cloudflare's local Workers Static Assets runtime with external browser requests blocked. Coverage includes the six pages and eight languages, desktop/wide/tablet/mobile geometry, a 320-pixel overflow check, locale schemas, historical facts, content coverage, saved language, failed/invalid translation loads, all collection records, image inspection, quarter-speed playback, reduced motion, English fallback, contrast, headers, canonical routes and localized nested 404s. Focused checks also address regional font loading and serif reading, caption-to-mount edges, centered artifact rows, exhibition-only border placement, bounded border width and opacity, transparent raster edges, content alignment and first views, control geometry and 200% text enlargement. The suite starts and stops its test server on port 4175; set `TEST_PORT` to another free port if needed.

GitHub Actions runs the build, deployment dry run, and functional suite on pushes and pull requests. Test screenshots and failure traces remain local or in CI artifacts, not in the deployed site.

### Content and Visual Verification

Before the redesign, all 28 recovered files were independently checked against the original source hashes. That version remains in Git history. The current HTML, CSS, and JavaScript intentionally differ: the user authorized both a visual redesign and an editorial pass. The original historical media and collection metadata remain unchanged.

[tests/fixtures/content.json](tests/fixtures/content.json) retains the original bilingual records and text as reference evidence. Tests keep original English/Simplified Chinese collection metadata exact, preserve media identity across all translations, and require substantive text to remain present across the dedicated pages. [tests/fixtures/facts.json](tests/fixtures/facts.json) protects historical names, dates, counts, places, and themes. Coverage and keyword checks support, rather than replace, editorial translation review.

The duplicate Home notes were removed from presentation, not from the historical record: the facts and contrast guard now target their retained About presentation. Do not delete a content guard merely because a fact moved to its owning page.

Render tests save first-view and full-page captures in `test-results/`; the current report identifies the captured page/locale/viewport combinations. Other runtime checks cover text, attributes, image loading and overflow. These files and prior recovery captures are excluded from deployment and Git. The design is intentionally not a pixel-identical copy of the original site or a reference museum.

Current test results and screenshots are written to `test-results/`. The site has not been formally certified for accessibility, and a local test pass is not a claim of completed production deployment.

Original image/video assets remain unchanged. Generated reports are authoritative for the revision they tested. Earlier test counts describe earlier versions and should not be used as evidence for current edits. Font-family and loading checks do not establish exhaustive character coverage or native-language translation certification.

## Recovery Record

[recovery/manifest.json](recovery/manifest.json) records the original URLs, source sizes, hashes, capture time, and discovered page inventory for 28 recovered files. These hashes describe the recovery baseline; ordinary builds do not prevent intentional future edits.

[scripts/recover.mjs](scripts/recover.mjs) can re-fetch public source with `npm run recover`. It refuses to overwrite a local file whose contents differ, so it must not be used as a routine build or update command. No credentials are needed.

Published HTML, CSS, JavaScript, and media were recoverable. The owner's lost Git history, unpublished files, original development tooling, and any private systems are not recovered by downloading the public site. The added tooling, 404 page, headers, and deployment setup are new. External press, email, and telephone links intentionally retain their original destinations.