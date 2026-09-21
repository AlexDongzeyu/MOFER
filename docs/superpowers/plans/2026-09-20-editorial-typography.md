# Editorial Typography and Open Galleries Implementation Plan

> The design work was completed locally using the executing-plans workflow and delegated routine design decisions. Publication to GitHub and Cloudflare was authorized in a separate follow-up on September 20, 2026.

**Goal:** Refine every museum page into a calm, legible editorial gallery with appropriate typography for all eight languages and fewer visual containers.

**Architecture:** Retain the six-page static site, local translations, original media, existing interaction controller and Workers deployment. Use locale-driven CSS type roles and locally built Fontsource assets. Shared layout rules give the six pages coherent reading measures and spatial rhythm without replacing their content.

**Tech Stack:** HTML, CSS, JavaScript, Fontsource variable fonts, Node build scripts and Playwright.

## Global Constraints

- Preserve the porcelain-blue palette, muted purple exhibition field and existing raster paper texture. Principal colors remain canvas `#152436`, deep blue `#0f1b2a`, mineral blue `#21374e`, pale blue `#bdd4e7`, reading white `#e8edf1` and exhibition purple `#3d2d34`; other existing color tokens also remain unchanged.
- Preserve historical copy, all eight collection records, six themes, contact destinations, all eight languages and saved language choice.
- Keep the original muted quarter-speed looping film without playback controls, including under reduced motion. Preserve the reduced-motion treatment of decorative UI.
- Do not introduce events, hours, tickets, search, memberships, a backend, future-exhibition placeholders or imported museum branding.
- Historical documents and posters remain uncropped. Image viewing, keyboard access and selection states stay functional.
- Keep fixed role-based type sizes, zero letter spacing, ordinary prose at least 16px, and narrower measures for CJK prose. No viewport-scaled type or decorative divider rules.

## Design Decision

Choose an open editorial gallery over a more image-only presentation or a type-only refresh. Image-only treatment would hide useful context; a type-only refresh would leave the repeated colored image mats and tight section rhythm unresolved. The palette, wordmark and moving-film identity are already approved and remain the visual anchors.

One quiet signature is enough: intact historical objects presented directly against the textured field, with clear captions and generous separation. Supporting text stays close to the image or topic it describes. Larger breaks distinguish sections, not every paragraph. Preserve readable context rather than using empty space to hide information.

```text
Home:       wordmark + film -> museum introduction -> open collection highlights
                           -> purple exhibition feature -> research/contact links
Collection: compact introduction -> large object + reading column
                                -> open contact sheet -> collection themes
Other pages: clear page introduction -> image/context -> purposeful reading groups
```

## Typography

| Languages | Headings | Body and Controls |
| --- | --- | --- |
| English, French, German, Spanish | Source Serif 4 | Source Sans 3 |
| Russian | Source Serif 4, with Cyrillic coverage | Source Sans 3, with Cyrillic coverage |
| Simplified Chinese | Noto Serif SC | Noto Sans SC |
| Traditional Chinese | Noto Serif TC | Noto Sans TC |
| Japanese | Noto Serif JP | Noto Sans JP |

Keep Bodoni Moda for the MOFER identity only. Sharing the Latin/Cyrillic pair keeps one museum identity rather than giving each translation an unrelated look. The three regional Noto pairs prevent Chinese/Japanese glyph-form substitutions. Use about 58-64 characters for Latin prose and roughly 30-34 em for CJK prose, with script-appropriate leading. Serve normal variable faces and licenses locally; no runtime font CDN.

## Reference Study

- ROM: decisive display/body contrast, clearly ranked exhibition highlights, strong image scale. Do not import its ticketing, large event inventory or dense utility layer.
- AGO: measured Common Ground type roles and a distinct separation between lead exhibitions, secondary exhibitions and practical information. Keep MOFER quieter than its oversized event lettering.
- Smithsonian American History: object-led discovery with useful historical context and clear routes into collections, stories and exhibitions. Do not reproduce the number of homepage sections.
- Canadian Museum of History: clear practical navigation, readable supporting text and restrained repeated content groups. MOFER has no permanent visit offer to advertise.
- Reference content and rendered font measurements are stored only in ignored `recovery/reference/museum-study-sep20/`. Some automated captures show security checks; those captures are not visual evidence of the museum design. AGO's integrated-browser type measurements and Smithsonian's accessible page content provide separate evidence.

## Task 1: Script-Specific Typography

**Files:** `tests/restoration.spec.js`, `styles.css`, `package.json`, `package-lock.json`, `scripts/build.mjs`, and one focused font-preparation module if needed.

**Interface:** `html[lang]` selects `--display` and `--body`; the build emits local CSS/font assets beneath `dist/assets/fonts/` with licenses. No translation-controller API changes are required.

- [x] Add a browser check for each locale's computed heading/body families and actually loaded font faces. Preserve the Bodoni wordmark and all palette tokens in the same focused slice.
- [x] Run the check against the current shared-font stack and observe the missing family behavior.
- [x] Install pinned Fontsource families, generate the normal-face assets from their packages during the existing build, and map locale-specific roles in CSS.
- [x] Run typography checks on desktop and mobile before changing adjacent layout rules.

## Task 2: Open Galleries and Reading Rhythm

**Files:** `styles.css`, the six existing public HTML pages only where grouping needs semantic changes, and `tests/restoration.spec.js`.

**Interface:** Existing gallery, detail, section, heading and text-link classes remain; selection, dialog, language, anchors and navigation hooks are preserved.

- [x] Add checks for transparent image mats/detail surroundings, intact contained images, readable prose sizes and unchanged colors.
- [x] Remove repeated colored mats and the large enclosing collection-detail panel. Keep the native dialog framed because it is an inspection tool.
- [x] Give collections a larger image allocation, align captions and related copy, consolidate heading roles, and use distinct section/paragraph spacing. Reduce repeated supporting labels where the same information is already adjacent without removing substantive content.
- [x] Reflow all page types on phones without small prose, awkward narrow columns or excessive empty space. Keep touch controls and selection states clear.
- [x] Run the focused layout/font checks and existing navigation, collection and viewer checks.

## Task 3: Verification and Handoff

- [x] Run the full page/locale/viewport suite, including existing 320px checks, source-fact guards, image decoding, viewer recovery and film playback.
- [x] Inspect a batched desktop/mobile set including English, Russian, Simplified/Traditional Chinese, Japanese and long German text. Apply one material correction batch, then confirm.
- [x] Check 200% text scaling, locale-specific font loading and representative glyph rendering, navigation geometry and local-only font requests.
- [x] Complete the bounded independent finish review, update PRODUCT/README/DESIGN and the design sidecar, and validate the Cloudflare package.
- [x] Start or reuse the local preview and provide its URL. Leave all changes local for review.

## Focused Commands

```sh
npm run build
npm test -- --project=desktop --grep "script-specific typography|open gallery"
npm test -- --project=desktop --project=mobile --grep "script-specific typography|open gallery|intermediate widths|image viewer"
npm test
npm run check:deploy
```

## Verification Outcome

- The final browser suite passed 128 tests with zero failures, errors or skips. It covers every public page in all eight languages and four viewport sizes, additional 320px layouts, font loading, source facts, language recovery, image inspection, navigation, first-view tasks, contrast and the original film behavior.
- Enlarged-text checks passed at 200% for Home, Collections and Contact in English, German, Traditional Chinese, Japanese and Russian. Intrinsic grid sizing and long metadata wrapping were corrected without reducing reading text.
- The visual review found one material issue: fixed-height transparent image areas left captions or expansion controls detached from the visible image. Natural image sizing, maximum-height caps and image-sized triggers corrected it. Geometry regressions and fresh desktop/mobile captures confirm the fix.
- The independent final verdict is `disposition: ship`, with no remaining material findings. The layout scan returned no findings. Typography advisories concern documented component and responsive sizes; the wordmark's missing machine-readable role was recorded separately rather than changing the identity to satisfy the detector.
- The build produces 754 static files, totaling 65.52 MiB, including self-hosted normal variable-font subsets and licenses. This is the complete asset bundle, not a per-page download. Cloudflare's deployment dry run passed; historical media and all nine palette tokens remain unchanged.
- The actual preview at http://127.0.0.1:4173/ was restored to English and normal text size. The original video is visible and playing at 0.25 speed.
- README, PRODUCT, DESIGN and the design sidecar describe the implemented result. The implementation handoff was local and uncommitted; publication was authorized separately afterward.