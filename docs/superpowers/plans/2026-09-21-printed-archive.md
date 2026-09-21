# Printed Archive Transitions and Typography Plan

**Goal:** Give the existing museum a more compact, immersive print character with graceful section transitions, readable text, and aligned image groups.

**Architecture:** Preserve the static six-page site, original media, existing language controller and palette. Extend shared CSS and the existing image-rendering path rather than introducing a framework. Keep image-group alignment separate from a small, page-specific family of decorative accents.

## Direction and Constraints

- The user approved the existing colors and requested denser, period-informed typography, elegant transitions on every page, no decorative dots, centered images and captions aligned to their images. Frames are optional where appropriate.
- The user was unavailable for the direction question and delegated decisions. Choose a restrained printed-album treatment: archive-derived scrollwork at chapter boundaries, fine flat paper-mount edges, serif reading text and clear sans-serif controls. Do not imitate wood, embossing or gilding.
- The ornament source is the existing cover of *A Letter from Madame Chiang Kai-shek to Boys and Girls Across the Ocean*. Its printed border is source material, not evidence that a newly composed website ornament is itself historical. Preserve the original scan unchanged.
- Keep all nine palette tokens, paper texture, historical facts, collection records, six themes, eight languages, saved language choice and existing routes. The film stays muted, looping at 0.25 speed, with no playback controls even under reduced motion.
- Keep the regional Source/Noto families. Give headlines stronger weight; use serif faces for editorial reading passages, at least 18px ordinary prose and 16px captions. Keep controls legible; use smaller text only for genuinely secondary utility roles.
- Remove middle-dot separators and any decorative dot rules. Ordinary punctuation and marks inside original artifacts are content and remain unchanged.
- New borders and transitions supersede the earlier frameless/no-divider preference only in the scope now requested. Do not surround paragraphs with panels or introduce unrelated ornaments, events, dates, search, ticketing or future-exhibition placeholders.
- The design requests were completed locally. Publication of the reviewed refinements and venue maps was authorized separately on September 21, 2026.

## Spatial Model

```text
film / photographic opening
         soft tonal join
heading + compact reading column
      restrained printed ornament
equal columns: centered artifacts + aligned captions
         purple exhibition field
research / contact / footer, with related edge treatment
```

Use the same transition vocabulary with different intensity: a soft join after moving or photographic media, a small printed rule/scrollwork at content divisions, and a quiet edge into the footer. Do not add large blank bands solely to hold decoration. Reduce combined section padding; keep related copy close to its image.

## Task 1: Readability and Image Alignment

**Files:** `tests/restoration.spec.js`, `styles.css`, `script.js`, and existing page markup where image/caption grouping requires it.

- [x] Add failing checks for centered image rows, aligned caption edges, serif reading text of at least 18px and captions of at least 16px.
- [x] Tune existing font roles and spacing without new font downloads or altered translations.
- [x] Align each caption group to the visible image or mount width. Group grid items by their actual row and offset shorter media by half the row's height difference. Recompute after image loading, collection rendering and resizing without changing keyboard focus or image-viewer state.
- [x] Use light printed mounts on artifact images. Keep controls on visible imagery and preserve uncropped originals. Do not frame full-bleed media or wrap text sections in cards.
- [x] Run focused desktop/mobile checks, then existing first-view, large-text, navigation and viewer checks.

## Task 2: Transitions and Dot Removal

**Files:** `scripts/prepare-ornament.mjs`, a generated image beneath `assets/textures/`, `styles.css`, `index.html`, `exhibitions.html`, and focused tests.

- [x] Generate a restrained transparent ornament from a text-free part of the existing booklet border, following the existing browser-canvas asset-preparation pattern. Validate nonempty alpha and preserve provenance.
- [x] Apply a coherent transition treatment to section boundaries and footers across all pages. Blend photographic openings and the purple band into adjacent fields without reducing content contrast.
- [x] Replace the two middle-dot venue separators with commas and remove unused dot-style rules.
- [x] Check decoded ornament assets, readable text, transition coverage, compact spacing, and absence of ornamental dot separators.

## Task 3: Confirmation and Handoff

- [x] Run all page/language/viewport checks, 320px layouts, 200% text enlargement, source-fact guards and film behavior.
- [x] Inspect one batched desktop/mobile set. No material visual corrections were required.
- [x] Complete an independent finish review and update PRODUCT, README, DESIGN and its sidecar from the implemented result.
- [x] Verify the Cloudflare build package without deploying. Keep a local preview available and leave changes uncommitted for review.

## Focused Checks

```sh
npm run build
npm test -- --project=desktop --project=mobile --grep "printed archive|centered artifact|script-specific typography"
npm test -- --project=desktop --project=mobile --grep "visible on arrival|captions and expansion|doubled text size|intermediate widths|artifact viewer"
npm test
npm run check:deploy
```

## Initial Verified Outcome

- The full browser suite passed 136 tests with zero failures, errors or skips. It checks all public pages, eight languages, four viewport sizes, 320px overflow, larger text, source facts, preserved colors and media, transitions, caption alignment, image controls and the original film behavior.
- The new alignment and serif-reading checks failed against the previous version before implementation. The transition check likewise demonstrated the missing treatment before the source-derived asset and joins were added.
- Independent source review found no material alignment-controller issues. The independent visual review returned `disposition: ship` with no material fixes.
- The layout scan returned zero findings. Its 36 typography advisories describe documented role-specific or responsive size exceptions; no zero-advisory claim is made.
- Build output is 755 static files, 65.56 MiB. The additional ornament is a 41,105-byte transparent PNG derived from the unchanged booklet scan. The Cloudflare deployment dry run, editor diagnostics and Git whitespace check passed.
- The actual preview at http://127.0.0.1:4173/ confirms matching image-row centers, 19px desktop prose and the decoded ornament. A visible foreground browser confirms the muted film advancing at 0.25 speed without controls, including under reduced motion. The editor's hidden shared tab can pause media in the background; the site does not add a new pause rule.
- This initial design handoff was local and uncommitted; publication was authorized separately afterward.

## Quieter Ornament Follow-Up

The user liked the traditional influence but found the cropped central strip and its repetition overwhelming. This follow-up supersedes the initial blanket ornament rule, without reopening the palette, fonts, image alignment, mounts or content. The user delegated the one-accent-per-page direction when asked.

- Home: one compact, complete cloud-scroll outline at Collection Highlights, aligned to the reading edge rather than centered under the film.
- Exhibitions: a smaller inverted cloud-scroll at the exhibition chapter, related to Home without repeating its exact arrangement.
- About: a small print corner at Museum Notes.
- Collections: a reversed album-corner accent at the collection themes.
- Research: a short offset double rule at the collaboration chapter.
- Contact: a single short correspondence rule at the contact section.
- All other section joins, photographic edges and footers rely on the existing tonal transitions and spacing. The not-found page needs no ornament.

The new cloud-scroll is original geometric linework inspired by traditional scroll forms, not a crop of a historical object or a claimed period reproduction. Remove the earlier cropped strip and its now-unused generator. Keep all decoration noninteractive and outside the text flow.

- [x] Replace the blanket-transition test with one-accent-per-page and complete-outline checks; observe failure before implementation.
- [x] Add the small cloud-scroll asset and scoped page treatments. Remove the previous strip and generator.
- [x] Verify desktop/mobile geometry, language layouts and representative screenshots.
- [x] Refresh the design record and complete the local-only handoff.

### Follow-Up Verification

The scoped browser run passed 40 tests with no failures, errors or skips. It covered every public page in all eight languages at four viewport sizes, narrow-phone overflow, enlarged text, preserved image alignment and colors, one accent per page, undecorated footers and not-found content, and an unclipped outline with transparent edge clearance. The layout scan returned no findings. The independent visual review returned `disposition: ship` with no material fixes. The earlier 136-test result describes the initial printed treatment, not a new full-suite run for this follow-up.

The local preview remains http://127.0.0.1:4173/. This follow-up was handed over locally before publication was authorized.

## Fade-Led Border Follow-Up

The user prefers the earlier patterned line and the soft fades to the isolated cloud symbol, but still does not want decoration repeated throughout the site. Remove the cloud and the forced corner/rule accents. Keep all existing soft color joins. Use one short, softly feathered textile-derived border at the entry to the purple exhibition section on Home and Exhibitions only. All other pages and footers stay without decorative ornaments.

The border reuses the existing booklet's text-free printed edge as a modern design derivative. Keep the source image unchanged, feather all four edges into transparency, limit its displayed width to 320px and reduce its visual strength. Do not restore the old 520px repeated strip or alter typography, mounts, maps, spacing or historical content.

- [x] Update and run the ornament-scope regression against the rejected symbols.
- [x] Generate the feathered border, replace the scoped CSS and remove the unused cloud asset.
- [x] Verify affected desktop/mobile layouts and refresh the design notes without publishing.

The final scoped run passed 32 checks with no failures, errors or skips, covering all pages and eight languages across four viewports, narrow-phone layouts, artifact alignment and the limited ornament scope. Six preceding desktop/mobile checks also confirmed map integration and alignment. The layout scan returned no findings, and independent visual review returned `disposition: ship`: the pattern is faint but visible, feathered rather than sharply cropped, and confined to the two exhibition entries. The new source-derived asset is 1024 x 44px and 35,398 bytes, with 18.1% visible ink coverage before its CSS tint. No full-suite rerun or publication is claimed for this narrow follow-up.

## Boynton House Map Addition

The user requested a Google map beneath the exhibition link on Home and beneath the press links on Exhibitions to use the empty portion of the text column. The user delegated the loading decision when asked. Use a compact lazy-loaded iframe, localized title/caption/link, visible venue address and a permanent Google Maps link. Label it as the 2025 exhibition venue, not a permanent MOFER location or an announcement of a current exhibition.

The City of Richmond Hill confirms Boynton House on the grounds of Richmond Green Park at 1300 Elgin Mills Road East, Richmond Hill, ON L4S 1M5: https://www.richmondhill.ca/en/things-to-do/Boynton-House-Art-Exhibition-Space.aspx . Do not copy current hours or unrelated exhibitions from that source.

Google's public place page confirms the same location at coordinates 43.898668, -79.399887 and feature ID `0x7412430d4c01d2d`, corresponding to the embed's decimal `cid=522738823898078509`. The exact-place embed was visually confirmed to show the Boynton House pin in Richmond Green Park. Google renders that place label on its map canvas; absence from DOM text is not evidence that the pin is missing.

- [x] Add failing tests for placement, Google URL/address, all eight translated labels, lazy loading, responsive size and a usable external link when the provider is unavailable.
- [x] Add the same map figure to the existing two exhibition text columns. Reuse local translation handling, keep the map's Google UI language synchronized, and preserve current styling and security headers.
- [x] Treat Google Maps as the sole intentional third-party embed. Isolate provider content in deterministic tests; verify the real service separately without claiming mocked pixels are a live map.
- [x] Validate affected page/language layouts, update the product/design notes and leave the revision local for review.

### Map Verification

- The complete browser suite passed 144 tests with zero failures, errors or skips. This includes the two map placements, all eight labels and Google language codes, the exact place identifier, lazy loading, iframe title, responsive dimensions and visible fallback when Google requests are blocked.
- Four separate real-provider checks rendered the map using the production markup: Home and Exhibitions at desktop size in English and phone size in Simplified Chinese. Live captures show the Boynton House pin and its Richmond Green Park surroundings. Deterministic test captures use an inert third-party document and are not represented as live map evidence.
- The iframe explicitly uses `color-scheme: light` to keep Google's controls readable within the dark museum. The surrounding palette and existing security headers remain unchanged. The provider may render place names on a canvas; its own document fonts are allowed to finish loading before live captures.
- Independent review found no material integration or layout issues. Build, Cloudflare deployment dry run, editor diagnostics and Git whitespace checks passed.
- The map is a Google-hosted exception to local site assets. No application API key or backend was added. The address and external map link remain available independently of provider loading.
- The map addition and earlier design refinements were handed over locally and uncommitted. Publication was authorized in a subsequent request.