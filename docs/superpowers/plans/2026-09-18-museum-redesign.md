# MOFER Museum Redesign Implementation Plan

> For execution: follow the executing-plans workflow inline. The user has delegated design decisions and will review the result afterward.

**Goal:** Present the museum in a dark, textured setting with a much slower ambient film and concise bilingual copy, preserving historical meaning and original media.

**Architecture:** Keep three static HTML pages, shared CSS and JavaScript, the existing translation dictionaries and collection records, and the Workers Static Assets build. Self-host licensed typefaces and Lucide icons. Add progressive enhancements for navigation and full-resolution image viewing without adding a framework or backend.

**Tech stack:** HTML, CSS, JavaScript, Playwright, Cloudflare Workers Static Assets, locally served fonts and icons.

## Global Constraints

- PRODUCT.md is the product authority. The user's follow-up authorizes rewriting prose for fluency and brevity while preserving historical claims, collection metadata, captions' meaning, contact information, and press destinations.
- Chinese remains the initial language; both languages must be complete.
- Preserve the current routes and anchor destinations.
- Preserve the original video and all collection/exhibition images.
- No invented exhibitions, opening times, ticketing, donation services, or historical claims.
- No framework or deployment migration; build remains `npm run build` and deploy remains `npx wrangler deploy`.
- Reduced-motion preferences, keyboard input, touch navigation, 320-pixel layouts, and readable long English copy are required.

## Selected Direction

Working title: Moving Archive. The reference site's photographic scale and restrained interface set the quality bar, not its exact typography, artwork, or composition.

The direction calibration assigned the moving-image prologue and object galleries, candidate five (key `f90512f9`). The user's follow-up replaces the initial light palette and dividing rules with a darker setting, drawing structural inspiration from ROM, AGO, and MoMA without copying their branding or content. The site's first impression remains the museum's original film and collection.

Palette: charcoal `#1b211d`, deep green `#121914`, olive `#303b2e`, mineral `#29332a`, brass `#d5bd86`, and muted wine `#3d2d34`, with warm light text. Genuine paper grain comes from a blank margin of the Pearl S. Buck letter, with broad lighting variation removed before tiling. Object images remain unaltered.

Typography: Bodoni Moda for the Latin museum wordmark and display titles; Hanken Grotesk for navigation, labels and reading; Noto Serif SC for Chinese display text. Use fixed/rem type sizes with responsive breakpoints, zero letter spacing, and comfortable body line lengths.

Structure: dark masthead; real film with a large MOFER identity and concise statement; compact introduction; artifact display with intact image proportions and selectable contact sheet; six collection themes; wine-toned exhibition gallery; research and collaboration; museum footer. Tonal changes and spacing replace decorative lines.

Interactions: keyboard-accessible mobile navigation; muted film looping at quarter speed without an on-page playback control; full-image viewing with Escape, focus return, zoom and previous/next controls; collection selection with preserved focus. The user's continuous-playback requirement applies even with reduced motion enabled; decorative animation and smooth scrolling still respect that preference. Denied autoplay uses a still fallback with fully visible hero text.

## Task 1: Protect Content and Navigation

- [x] Capture the original dictionaries and collection records to `tests/fixtures/content.json` before edits.
- [x] Extend `tests/restoration.spec.js` with baseline preservation, unobscured hero actions, a mobile-menu behavior check, image viewer controls, and reduced-motion behavior.
- [x] Run the narrow new checks against the old build to observe their expected failures.
- [x] Update only the shared header, hero structure and interaction code needed by those checks.
- [x] Rerun the touched behavior checks before continuing.

## Task 2: Implement the Museum Interface

- [x] Update `styles.css` with the complete visual system and responsive layouts; retain meaningful existing selectors for the test contract.
- [x] Update `index.html`, `collections.html`, `exhibitions.html` and `404.html` without dropping substantive copy.
- [x] Add local licensed typefaces and Lucide icon assets under `assets/`, with their license files and provenance.
- [x] Keep all UI labels in both languages. The follow-up humanizer pass revises existing prose without changing protected historical facts.
- [x] Run all three pages in both languages using the existing Workers browser test matrix.

## Task 3: Verify and Document

- [x] Build, run Workers deploy dry-run, and run the full browser suite.
- [x] Capture full pages plus legible section screenshots at desktop and mobile sizes; inspect text fit, photography, image controls, focus states and footer completeness together.
- [x] Fix material issues in one batch, then run one final confirmation pass.
- [x] Obtain an independent finish review grounded in screenshots and source.
- [x] Record the implemented design in `DESIGN.md` and update README editing/verification notes.
- [x] Leave a working local preview URL: `http://127.0.0.1:4173`.

The first design passed 80 checks. The dark-theme and editorial revision passed 88 checks before the final autoplay-fallback regression was added. Final verification is recorded in the generated test report and current README. Changes remain local for review, not committed or deployed.

## Follow-Up Revision

- [x] Implement quarter-speed looping and remove the visible playback control.
- [x] Replace white surfaces and decorative rules with dark tonal fields and genuine paper grain.
- [x] Tighten desktop/mobile spacing without obscuring actions or cropping artifact images.
- [x] Humanize both languages and synchronize the Chinese HTML fallback with an HTML parser.
- [x] Keep the original-copy fixture, protect collection metadata, and add independent historical-fact checks.
- [x] Obtain a separate editorial review: no material meaning loss identified.
- [x] Refresh DESIGN.md and its component sidecar from the implemented dark theme.
- [x] Add and reproduce an autoplay-denied regression; settle fallback hero content at full opacity.
- [x] Confirm the final browser suite, fallback capture, and finish-review verdict: 92 tests passed; final verdict `ship`.
- [x] Refresh the live local preview and finish the handoff: `http://127.0.0.1:4173` responds and quarter-speed looping was verified in a normal-motion browser.

Final delivery gates: Workers dry run passed; original media integrity check passed for all 23 files; editor diagnostics and diff whitespace checks passed. A later playback fix removed the unintended pause-and-hide rule under reduced motion, reproduced the original failure, and verified advancing frames in the actual preview without changing its motion preference. No changes were committed, pushed, or deployed.

## Checks

```sh
npm run build
npm test -- --project=mobile --grep "museum navigation|hero actions"
npm run check:deploy
npm test
```

The original fixture remains reference evidence for content coverage and exact collection metadata. Independently authored fact assertions protect names, dates, counts, places, and exhibition themes while allowing the requested wording changes. The suite also covers eight featured objects, six collection themes, language switching, visible quarter-speed playback under both motion preferences, denied-autoplay fallback, route/anchor links, contrast, headers, and 404s.