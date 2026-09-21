# MOFER Product Context

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Purpose

MOFER, the Museum of Far East Remembrance, is a Canadian museum initiative collecting, preserving, digitizing, researching, and exhibiting original historical materials from the Far East. The website introduces the collection, documents the 2025 Boynton House exhibition, and connects visitors with research and collaboration opportunities.

## Users

The existing content addresses visitors, researchers, educators, museums, archives, universities, community organizations, and volunteers.

General visitors exploring original artifacts lead the homepage hierarchy; historical context, research and partnership information remain accessible. Visitors looking for collaboration should reach direct contact methods without first reading a long invitation.

For the September 20 refinement, the unavailable user explicitly delegated routine design decisions and will review the local result later. This is authority to refine the existing presentation, not evidence of a new identity approval or permission to publish.

## Capabilities and Constraints

- Preserve the substantive museum content, eight featured collection records, six collection themes, exhibition facts and captions, research activities, contact details, and external press links across all supported languages.
- Keep the original routes and legacy homepage anchors working. All main navigation items now lead to dedicated About, Collections, Exhibitions, Research & Education, and Contact pages.
- Use the original recovered photography and video, not invented or generated historical evidence.
- Improve visual design, navigation, responsive behavior, and accessibility without adding a backend, fabricated exhibits, visitor hours, ticketing, donations, or a new collection database.
- Keep the six-page static HTML/CSS/JavaScript stack, localized not-found page and existing Cloudflare Workers Static Assets configuration. Build and deployment instructions remain in [README.md](README.md); configuration is unchanged, and publishing requires separate authorization.
- English is the default for a fresh visit. Provide English, 简体中文, Français, 繁體中文, 日本語, Русский, Deutsch, and Español, retaining an explicitly selected language across pages and reloads.
- Keep translations, historical media and interface assets local at runtime. Font assets are generated from installed packages during the build; no runtime font CDN or translation service is introduced.
- Use appropriate reading typography for Latin/Cyrillic, Simplified Chinese, Traditional Chinese and Japanese. Preserve full descriptions and records rather than shortening content to fit a visual treatment.
- Upcoming exhibitions and poster/marketing presentation are planning-only until the owner supplies approved content. Do not add placeholders, fabricated events, dates, or promotional images.

### Current Revision Authority

The editorial typography and open-gallery revision is **local only**. Commit `7cfd293` is the previous published version identified in the handoff. There is no current authority to commit, push or deploy this revision. Existing deployment documentation and autonomous design delegation do not override that boundary.

## Brand Commitments

Preserve MOFER's name and its identity as the Museum of Far East Remembrance. The creative north star remains **Moving Archive**, with original seed `f90512f9`: the museum wordmark over its original film leads, and artifacts with historical context guide visitors. The current work refines that identity into a quieter editorial presentation; it does not establish a new brand.

The user likes the current colors and style. Preserve all nine porcelain-blue palette values, the original paper texture and muted purple exhibition field. The latest request is for more appropriate fonts by language and an artistic, elegant, simple layout with fewer frames and elements and deliberate whitespace. Open image presentation and unframed reading columns must retain historical documents in full. Keep contextual facts readable; do not bring back white canvases, decorative dividing lines or oversized standalone statistics.

Bodoni remains the MOFER identity face, not the reading face for every language. Source Serif 4/Source Sans 3 serve Latin and Cyrillic text; regional Noto Serif/Sans SC, TC and JP serve Simplified Chinese, Traditional Chinese and Japanese. [DESIGN.md](DESIGN.md) records the implemented type roles, responsive exceptions and build-generated font delivery. A selected family or successful runtime sample does not certify exhaustive glyph coverage.

Reference sites inform hierarchy, image scale and readable context, not branding, fonts, assets or services to copy. Current references are [ROM](https://www.rom.on.ca/), [AGO](https://ago.ca/), [Smithsonian American History](https://americanhistory.si.edu/) and [Canadian Museum of History](https://www.historymuseum.ca/). Loewentheil Collection and MoMA remain earlier study context, not new design authority. [README.md](README.md) records which DOM/font/content observations were usable; security pages, loaders, failed video and cookie-obscured captures do not constitute a full visual review.

The original film should play continuously, muted and inline, at one quarter of normal speed without an on-page start/stop button or native control bar. Reduced-motion settings must not hide or pause this requested film; they still disable decorative interface animation and smooth scrolling. A still fallback remains for browsers that block autoplay.

The user requests natural, concise language and high-quality translations, while this revision changes typography, grouping and text placement rather than substantive content or locale JSON. Historical names, dates, counts, places, exhibition themes, collection identity and meaning must survive. Removing duplicated Home labels and facts does not remove their contextual presentation elsewhere, including the retained About notes. Original prose remains reference evidence, not a blanket requirement for verbatim wording in future authorized editorial work. Source ambiguities and native-language/curatorial approval questions remain in [docs/translation-review.md](docs/translation-review.md); this refresh does not resolve or certify them.

## Evidence on Hand

- Six public pages and a localized not-found page, with eight local language packs in `assets/i18n/` and shared interactions in [script.js](script.js).
- Original collection photography in `assets/collections/` and `assets/collections/extended/`.
- Original Boynton House exhibition photography in `assets/exhibitions/`.
- Original video and poster in `assets/video/`.
- Recovery provenance in [recovery/manifest.json](recovery/manifest.json) and restoration baseline in Git history.
- Original-copy and collection-metadata fixtures, plus independently recorded historical details for the editorial pass.
- Build-generated normal-variable font assets and licenses for nine families; committed source font assets remain legacy references and are not copied to deployment output.
- Playwright coverage for all eight languages, source facts, dedicated navigation, saved language, translation failures, collection selection, slow video, responsive widths, local fonts, text enlargement and Workers routing. Coverage is not a claim that a pending run passed; [README.md](README.md) separates the supplied focused evidence from the parent's pending full-suite result.

## Product Principles

- Let original objects and their historical context carry the experience.
- Improve presentation without rewriting historical claims or inventing services.
- Make collection exploration useful on phones and with keyboard input.
- Give each page a clear first task: identify the museum, inspect an object, understand its work or contact it. Preserve full context beyond that first view.
- Remove repeated presentation before removing information; whitespace should clarify relationships, not conceal content.
- Keep editorial decisions and deployment instructions explicit and maintainable.

## Accessibility and Inclusion

Maintain multilingual access, readable text, visible keyboard focus, reduced-motion support for decorative UI, labelled controls and layouts without text or control overlap. Support 200% text enlargement through readable rem-based copy, wrapping navigation and shrinkable layouts; large identity marks may retain their graphic size. Contact methods come before supporting collaboration material on phones. Preserve the native language control, explicit saved choice, image-viewer focus return and full-image inspection.

These are implementation quality requirements, not an independent accessibility certification. Focused checks on selected pages, languages and viewports do not establish complete accessibility, exhaustive font coverage or native-language translation approval.