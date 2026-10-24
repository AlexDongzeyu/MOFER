# MOFER Product Context

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Purpose

MOFER, the Museum of Far East Remembrance, is a Canadian museum initiative collecting, preserving, digitizing, researching, and exhibiting original historical materials from the Far East. The website introduces modern Chinese history and its international connections through late Qing and Republican-era materials, the Second World War in Asia, postwar justice, and Chinese lives overseas. It documents the 2025 and 2026 Boynton House exhibitions and connects visitors with collaboration opportunities.

## Users

The existing content addresses visitors, researchers, educators, museums, archives, universities, community organizations, and volunteers.

General visitors exploring original artifacts lead the homepage hierarchy; historical context, research and partnership information remain accessible. Visitors looking for collaboration should reach direct contact methods without first reading a long invitation.

The object-led gallery direction uses a darker archival-blue palette, quiet paper grain and smooth fades, without exhibition ornaments. It refines the existing Moving Archive identity.

## Capabilities and Constraints

- Preserve the eight featured collection records, six collection themes, verified exhibition facts, contact details, historical media and external press links. Copy may be reorganized and clarified without inventing historical claims.
- Main navigation leads to About, Collections, Exhibitions and Contact. The photo gallery belongs to Collections; retired gallery URLs redirect there and retired Research URLs redirect to About.
- Use the original recovered photography and video, not invented or generated historical evidence.
- Improve visual design, navigation, responsive behavior, and accessibility without adding a backend, fabricated exhibits, visitor hours, ticketing, donations, or a new collection database.
- Keep the five-page static HTML/CSS/JavaScript stack, localized not-found page and existing Cloudflare Workers Static Assets configuration. Build and deployment instructions remain in [README.md](README.md).
- English is the default for a fresh visit. Provide English, 简体中文, Français, 繁體中文 and 日本語, retaining an explicitly selected language across pages and reloads. Russian, Spanish and the former Deutsch option are removed; their saved preferences fall back to English.
- Keep translations, historical media and interface assets local at runtime. Font assets are generated from installed packages during the build; no runtime font CDN or translation service is introduced.
- The Boynton House map is the sole intentional third-party embed, on Home and Exhibitions. It identifies the shared 2025 and 2026 venue at 1300 Elgin Mills Road East, Richmond Hill, and preserves a visible address and external map link when Google is unavailable. It is not a permanent MOFER location. The 2026 dates and hours come from the supplied poster.
- Use appropriate serif headings and editorial reading typography for Latin/Cyrillic, Simplified Chinese, Traditional Chinese and Japanese, with distinct sans-serif interface text. Reuse the existing font dependencies. Preserve full descriptions and records rather than shortening content to fit a visual treatment.
- Use the supplied English-led and Chinese-led Tokyo Trial posters according to the selected language. Do not fabricate events, dates or promotional imagery.
- The collection reading desk supports themed browsing, previous/next controls, keyboard selection, full-image inspection and observation prompts. Historical context must follow the existing record rather than manufacture new provenance.
- Group gallery photographs by posters, the Tokyo Trial, collection material and public visits. Show one group at a time with JavaScript, and retain native access to all originals without it.

### Current Revision Authority

Publication of the reviewed September 21 printed-album refinement, fade-led borders and Boynton House maps was explicitly authorized in a follow-up request. The release follows the editorial version at commit `c204e1c` and uses the existing GitHub-to-Cloudflare deployment connection.

The October 6 follow-up supplied exhibition posters and media, authorized Cloudflare publication, moved gallery access into Collections and removed the Research page. The October 9 request authorizes clearer historical copy, five supported languages, a darker palette, removal of ornaments, contact press previews and interactive collection discovery. These later requests override the older palette, language and decoration constraints.

## Brand Commitments

Preserve MOFER's name and its identity as the Museum of Far East Remembrance. The creative north star remains **Moving Archive**, with original seed `f90512f9`: the museum wordmark over its original film leads, and artifacts with historical context guide visitors. The current work refines that identity through a printed-album treatment; it does not establish a new brand, seed or approved visual comp.

Favor natural, fade-only transitions rather than decorative movement. Use archival charcoal and deep blue, muted paper-colored text, quiet grain and a darker plum exhibition field. No exhibition border, curl or isolated ornament is displayed. Readable serif text, compact organization and consistent caption baselines remain. Dot separators are excluded from interface text; marks inside historical originals remain untouched.

The original blue paper-grain background pattern was explicitly approved on October 10. Preserve [the existing texture](assets/textures/archive-paper.png) and its recognizable character across page backgrounds; do not replace it with a flat surface or a different pattern during future refinements. This approval concerns the background grain, not the removed exhibition ornaments. Keep the darker palette and fade-only transitions.

The pattern must remain visibly recognizable, not merely present in a CSS URL. Use the original full-strength soft-light treatment; do not wash it out beneath an opaque color overlay. Preserve it on the non-photographic header, exhibition field and footer as well as the page background, while keeping it off historical images.

The gallery treatment leads with soft tonal joins and single, flat image mounts. Keep documents uncropped, original scanned mounts intact, full-bleed media unframed and reading columns open. Visitor photographs may use consistent cropped previews, with the full original available in the viewer. Do not add wood, bevels, gilding, white canvases or oversized standalone statistics.

The former source-derived exhibition-border asset is retained as development history, not part of the current interface or evidence of an original museum border.

Bodoni remains the MOFER identity face, not the reading face for every language. Source Serif 4 serves both Latin/Cyrillic editorial headings and prose; Source Sans 3 serves interface text. Regional Noto Serif/Sans SC, TC and JP provide the corresponding Chinese and Japanese roles. Ordinary editorial prose is 19px on desktop and 18px on phones at the default root; captions, standard controls and footer body text are 16px. Genuine utility text and other component exceptions remain documented rather than claiming every visible word has one size. [DESIGN.md](DESIGN.md) records the implemented hierarchy, compact spacing, alignment and build-generated font delivery. A selected family or successful runtime sample does not certify exhaustive glyph coverage.

Reference sites inform hierarchy, image scale and readable context, not branding, fonts, assets or services to copy. Current references are [ROM](https://www.rom.on.ca/), [AGO](https://ago.ca/), [Smithsonian American History](https://americanhistory.si.edu/) and [Canadian Museum of History](https://www.historymuseum.ca/). Loewentheil Collection and MoMA remain earlier study context, not new design authority. [README.md](README.md) records which DOM/font/content observations were usable; security pages, loaders, failed video and cookie-obscured captures do not constitute a full visual review.

The four supplied clips play continuously, muted and inline, at 0.85 speed without native controls. Encoded crossfades include the loop boundary and every clip fills the hero. Reduced motion disables interface fades and smooth scrolling but preserves the previously requested ambient film. A still fallback remains for browsers that block autoplay.

The user requests natural, concise language and high-quality translations, while this revision changes presentation rather than historical photo/title copy or locale packs. Historical names, dates, counts, places, exhibition themes, collection identity and meaning must survive. The two repeated Boynton House venue separators on Home and Exhibitions use commas instead of middle dots; original artifact punctuation is retained. Previously removed duplicate Home labels and facts remain available in their owning contexts, including the About notes. Original prose remains reference evidence, not a blanket requirement for verbatim wording in future authorized editorial work. Source ambiguities and native-language/curatorial approval questions remain in [docs/translation-review.md](docs/translation-review.md); this refresh does not resolve or certify them.

## Evidence on Hand

- Five public pages and a localized not-found page, with five local language packs in `assets/i18n/` and shared interactions in [script.js](script.js).
- Original collection photography in `assets/collections/` and `assets/collections/extended/`.
- Original Boynton House exhibition photography in `assets/exhibitions/`.
- Original video and poster in `assets/video/`.
- Recovery provenance in [recovery/manifest.json](recovery/manifest.json) and restoration baseline in Git history.
- Original-copy and collection-metadata fixtures, plus independently recorded historical details for the editorial pass.
- Build-generated normal-variable font assets and licenses for nine families; committed source font assets remain legacy references and are not copied to deployment output.
- The unchanged paper-grain derivative is used quietly; original scans remain unchanged and no source-derived ornament is displayed.
- Shared row-alignment code measures mount bounds after image, font, locale and width changes without resetting focus or image-viewer state.
- Playwright coverage for all five languages, source facts, themed collection discovery, coherent gallery groups, press previews, saved preferences, native fallbacks, responsive layouts, maps and true not-found handling. Tests establish results only for the revision tested.

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