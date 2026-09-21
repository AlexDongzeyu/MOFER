# MOFER Product Context

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Purpose

MOFER, the Museum of Far East Remembrance, is a Canadian museum initiative collecting, preserving, digitizing, researching, and exhibiting original historical materials from the Far East. The website introduces the collection, documents the 2025 Boynton House exhibition, and connects visitors with research and collaboration opportunities.

## Users

The existing content addresses visitors, researchers, educators, museums, archives, universities, community organizations, and volunteers.

General visitors exploring original artifacts lead the homepage hierarchy; historical context, research and partnership information remain accessible. Visitors looking for collaboration should reach direct contact methods without first reading a long invitation.

The printed-album direction uses smooth fades and restrained pattern at the exhibition entry on Home and Exhibitions. It refines the existing identity; publication requires separate authorization.

## Capabilities and Constraints

- Preserve the substantive museum content, eight featured collection records, six collection themes, exhibition facts and captions, research activities, contact details, and external press links across all supported languages.
- Keep the original routes and legacy homepage anchors working. All main navigation items now lead to dedicated About, Collections, Exhibitions, Research & Education, and Contact pages.
- Use the original recovered photography and video, not invented or generated historical evidence.
- Improve visual design, navigation, responsive behavior, and accessibility without adding a backend, fabricated exhibits, visitor hours, ticketing, donations, or a new collection database.
- Keep the six-page static HTML/CSS/JavaScript stack, localized not-found page and existing Cloudflare Workers Static Assets configuration. Build and deployment instructions remain in [README.md](README.md); configuration is unchanged, and publishing requires separate authorization.
- English is the default for a fresh visit. Provide English, 简体中文, Français, 繁體中文, 日本語, Русский, Deutsch, and Español, retaining an explicitly selected language across pages and reloads.
- Keep translations, historical media and interface assets local at runtime. Font assets are generated from installed packages during the build; no runtime font CDN or translation service is introduced.
- The user-requested Boynton House map is the sole intentional third-party embed, on Home and Exhibitions. It identifies the 2025 venue at 1300 Elgin Mills Road East, Richmond Hill, and preserves a visible address and external map link when Google is unavailable. Do not present it as a permanent MOFER location, current exhibition or offer of visitor hours.
- Use appropriate serif headings and editorial reading typography for Latin/Cyrillic, Simplified Chinese, Traditional Chinese and Japanese, with distinct sans-serif interface text. Reuse the existing font dependencies. Preserve full descriptions and records rather than shortening content to fit a visual treatment.
- Upcoming exhibitions and poster/marketing presentation are planning-only until the owner supplies approved content. Do not add placeholders, fabricated events, dates, or promotional images.

### Current Revision Authority

Publication of the reviewed September 21 printed-album refinement, fade-led borders and Boynton House maps was explicitly authorized in a follow-up request. The release follows the editorial version at commit `c204e1c` and uses the existing GitHub-to-Cloudflare deployment connection.

## Brand Commitments

Preserve MOFER's name and its identity as the Museum of Far East Remembrance. The creative north star remains **Moving Archive**, with original seed `f90512f9`: the museum wordmark over its original film leads, and artifacts with historical context guide visitors. The current work refines that identity through a printed-album treatment; it does not establish a new brand, seed or approved visual comp.

Favor natural, fade-led transitions with a small amount of printed pattern, not isolated decorative symbols or borders across the whole page. Preserve all nine porcelain-blue palette values, the original paper texture and muted purple exhibition field. Pattern is confined to a softly feathered border at the exhibition entry on Home and Exhibitions; other pages need no individual accent. Larger readable text, compact editorial organization, vertically centered image rows and aligned captions remain. Newspaper-like density does not mean a literal newspaper layout. Ornamental dots are excluded; historical marks inside original artifacts are not interface decoration.

The printed-album treatment leads with soft tonal joins and thin, flat, transparent image mounts. About, Collections, Research, Contact and 404 have no decorative accent; neither do footers, the film edge or other sections. Existing film, photographic, purple-band and footer fades remain unchanged. The exhibition border adds no padding or layout space. Keep documents uncropped, original scanned mounts intact, full-bleed media unframed and reading columns open. Do not add wood, bevels, gilding, white canvases or oversized standalone statistics.

[assets/textures/exhibition-border.png](assets/textures/exhibition-border.png) is a modern raster derivative of the text-free printed bottom edge of the museum's [booklet scan](assets/collections/extended/madame-chiang-letter-children.jpg), which remains untouched. Its pattern fades to transparency on all four edges and is tinted with the existing pale-blue accent. It is not an authenticated historic website border; no new historical date is assigned to the decoration.

Bodoni remains the MOFER identity face, not the reading face for every language. Source Serif 4 serves both Latin/Cyrillic editorial headings and prose; Source Sans 3 serves interface text. Regional Noto Serif/Sans SC, TC and JP provide the corresponding Chinese and Japanese roles. Ordinary editorial prose is 19px on desktop and 18px on phones at the default root; captions, standard controls and footer body text are 16px. Genuine utility text and other component exceptions remain documented rather than claiming every visible word has one size. [DESIGN.md](DESIGN.md) records the implemented hierarchy, compact spacing, alignment and build-generated font delivery. A selected family or successful runtime sample does not certify exhaustive glyph coverage.

Reference sites inform hierarchy, image scale and readable context, not branding, fonts, assets or services to copy. Current references are [ROM](https://www.rom.on.ca/), [AGO](https://ago.ca/), [Smithsonian American History](https://americanhistory.si.edu/) and [Canadian Museum of History](https://www.historymuseum.ca/). Loewentheil Collection and MoMA remain earlier study context, not new design authority. [README.md](README.md) records which DOM/font/content observations were usable; security pages, loaders, failed video and cookie-obscured captures do not constitute a full visual review.

The original film should play continuously, muted and inline, at one quarter of normal speed without an on-page start/stop button or native control bar. Reduced-motion settings must not hide or pause this requested film; they still disable decorative interface animation and smooth scrolling. A still fallback remains for browsers that block autoplay.

The user requests natural, concise language and high-quality translations, while this revision changes presentation rather than historical photo/title copy or locale packs. Historical names, dates, counts, places, exhibition themes, collection identity and meaning must survive. The two repeated Boynton House venue separators on Home and Exhibitions use commas instead of middle dots; original artifact punctuation is retained. Previously removed duplicate Home labels and facts remain available in their owning contexts, including the About notes. Original prose remains reference evidence, not a blanket requirement for verbatim wording in future authorized editorial work. Source ambiguities and native-language/curatorial approval questions remain in [docs/translation-review.md](docs/translation-review.md); this refresh does not resolve or certify them.

## Evidence on Hand

- Six public pages and a localized not-found page, with eight local language packs in `assets/i18n/` and shared interactions in [script.js](script.js).
- Original collection photography in `assets/collections/` and `assets/collections/extended/`.
- Original Boynton House exhibition photography in `assets/exhibitions/`.
- Original video and poster in `assets/video/`.
- Recovery provenance in [recovery/manifest.json](recovery/manifest.json) and restoration baseline in Git history.
- Original-copy and collection-metadata fixtures, plus independently recorded historical details for the editorial pass.
- Build-generated normal-variable font assets and licenses for nine families; committed source font assets remain legacy references and are not copied to deployment output.
- Unchanged paper-grain derivative and a separate feathered exhibition-border derivative, each with a preparation script; the original scans remain unchanged and the new border is not historical evidence.
- Shared row-alignment code measures mount bounds after image, font, locale and width changes without resetting focus or image-viewer state.
- Playwright coverage for all eight languages, source facts, dedicated navigation, saved language, translation failures, collection selection, slow video, responsive widths, local fonts, serif prose, mount/caption alignment, exhibition-only border placement and transparent edges, text enlargement and Workers routing. Generated reports establish results only for the revision tested, as described in [README.md](README.md).

## Product Principles

- Let original objects and their historical context carry the experience.
- Improve presentation without rewriting historical claims or inventing services.
- Make collection exploration useful on phones and with keyboard input.
- Give each page a clear first task: identify the museum, inspect an object, understand its work or contact it. Preserve full context beyond that first view.
- Remove repeated presentation before removing information; whitespace should clarify relationships, not conceal content.
- Keep image groups evenly organized and their captions attached; use fades for continuity and keep localized pattern subordinate to reading.
- Keep editorial decisions and deployment instructions explicit and maintainable.

## Accessibility and Inclusion

Maintain multilingual access, readable text, visible keyboard focus, reduced-motion support for decorative UI, labelled controls and layouts without text or control overlap. Support 200% text enlargement through readable rem-based copy, wrapping navigation and shrinkable layouts; large identity marks may retain their graphic size. Contact methods come before supporting collaboration material on phones. Preserve the native language control, explicit saved choice, image-viewer focus return and full-image inspection.

These are implementation quality requirements, not an independent accessibility certification. Focused checks on selected pages, languages and viewports do not establish complete accessibility, exhaustive font coverage or native-language translation approval.