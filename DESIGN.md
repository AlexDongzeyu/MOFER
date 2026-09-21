---
name: MOFER
description: A porcelain-blue moving archive with serif reading, printed-album mounts and fade-led transitions.
colors:
  paper: "#152436"
  white: "#f0eee8"
  ink: "#e8edf1"
  muted: "#b6c5d4"
  cobalt: "#30496a"
  mineral: "#21374e"
  accent: "#bdd4e7"
  wine: "#3d2d34"
  deep: "#0f1b2a"
typography:
  identity:
    fontFamily: '"Bodoni Moda Variable", serif'
    fontSize: "38px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0"
  display:
    fontFamily: '"Source Serif 4 Variable", "Noto Serif SC Variable", serif'
    fontSize: "4.25rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0"
  headline:
    fontFamily: '"Source Serif 4 Variable", "Noto Serif SC Variable", serif'
    fontSize: "2.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0"
  title:
    fontFamily: '"Source Sans 3 Variable", "Noto Sans SC Variable", "Noto Sans JP Variable", sans-serif'
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0"
  body:
    fontFamily: '"Source Serif 4 Variable", "Noto Serif SC Variable", serif'
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0"
  label:
    fontFamily: '"Source Sans 3 Variable", "Noto Sans SC Variable", "Noto Sans JP Variable", sans-serif'
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0"
  caption:
    fontFamily: '"Source Sans 3 Variable", "Noto Sans SC Variable", "Noto Sans JP Variable", sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0"
  control:
    fontFamily: '"Source Sans 3 Variable", "Noto Sans SC Variable", "Noto Sans JP Variable", sans-serif'
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: "0"
  navigation:
    fontFamily: '"Source Sans 3 Variable", "Noto Sans SC Variable", "Noto Sans JP Variable", sans-serif'
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.7
    letterSpacing: "0"
  collection-title:
    fontFamily: '"Source Serif 4 Variable", "Noto Serif SC Variable", serif'
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0"
rounded:
  square: "0"
  button: "2px"
spacing:
  "8": "8px"
  "12": "12px"
  "16": "16px"
  "20": "20px"
  "24": "24px"
  "28": "28px"
  "30": "30px"
  "32": "32px"
  "36": "36px"
  "40": "40px"
  "44": "44px"
  "48": "48px"
  "56": "56px"
  "64": "64px"
  gutter: "48px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.deep}"
    typography: "{typography.control}"
    rounded: "{rounded.button}"
    padding: "12px 21px"
  button-primary-hover:
    backgroundColor: "#dbe7f1"
  button-secondary:
    backgroundColor: "rgb(15 27 42 / 82%)"
    textColor: "{colors.white}"
    typography: "{typography.control}"
    rounded: "{rounded.button}"
    padding: "12px 21px"
  button-secondary-hover:
    backgroundColor: "{colors.cobalt}"
  text-link:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
  text-link-hover:
    textColor: "{colors.white}"
  icon-button:
    backgroundColor: "{colors.mineral}"
    textColor: "inherit"
    rounded: "{rounded.square}"
    padding: "0"
    width: "46px"
    height: "46px"
  icon-button-hover:
    backgroundColor: "{colors.cobalt}"
  primary-navigation:
    textColor: "{colors.ink}"
    typography: "{typography.navigation}"
  primary-navigation-current:
    backgroundColor: "{colors.mineral}"
    textColor: "{colors.accent}"
  language-select:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.ink}"
    padding: "8px 5px"
  language-select-hover:
    backgroundColor: "{colors.mineral}"
  collection-card:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "0 0 8px"
  collection-preview:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
  collection-detail:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
  museum-notes:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
  image-open:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.square}"
    padding: "8px"
    width: "fit-content"
  artifact-mount:
    backgroundColor: "transparent"
    rounded: "{rounded.square}"
    padding: "8px"
    width: "fit-content"
  section-transition:
    textColor: "{colors.accent}"
  image-expand:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.white}"
    width: "36px"
    height: "36px"
---

# Design System: MOFER

## Overview

**Creative North Star: "Moving Archive"**

MOFER's original photographs, documents and film lead a quiet editorial museum. The established porcelain-blue palette, pale-blue actions, muted purple exhibition field and real paper grain remain. A denser printed-album treatment pairs flat, fine-edged mounts with smooth fades. A softly feathered printed border marks only the exhibition entry on Home and Exhibitions; sections and reading columns stay open.

Locale-specific serif headings and editorial prose give eight languages a shared reading rhythm; sans-serif controls and captions remain distinct. Names lead, full historical context follows, and captions share the width of their mounts. Equal columns and row-centered images provide newspaper-like density without a literal newspaper layout. The MOFER wordmark over the original film remains the identity anchor.

**Key Characteristics:**
- Unchanged porcelain-blue fields, pale-blue actions and muted purple exhibitions.
- Original paper grain and flat printed mounts around contained, untextured artifacts.
- Fade-led transitions with a softly feathered border only at exhibition entries.
- Script-specific serif headings and prose, distinct from sans-serif interface text.
- Equal columns, row-centered images and captions aligned to mount bounds.
- Six dedicated pages with English fallback and eight persistent language choices.
- Original quarter-speed film; reduced motion removes decorative UI movement.

This refresh records the September 21 implementation, not a new identity. The original seed (`f90512f9`) remains in [index.html](index.html); no new seed or approved visual comp is claimed. The fade-led refinement replaces the page-specific accent requirement; typography, media mounts and alignment remain. Commit `c204e1c` is the preceding editorial version. Publication of the reviewed refinement and venue maps was authorized separately after the local design handoff.

The frontmatter records reusable desktop/default-language tokens from [styles.css](styles.css); locale mappings and responsive exceptions follow below. Current source outranks intentions in the [printed archive plan](docs/superpowers/plans/2026-09-21-printed-archive.md). [PRODUCT.md](PRODUCT.md) retains product constraints. [.impeccable/design.json](.impeccable/design.json) extends the tokens with metadata and component previews; its preserved tonal ramps are swatch aids, not additional site colors.

[ROM](https://www.rom.on.ca/), [AGO](https://ago.ca/), [Smithsonian American History](https://americanhistory.si.edu/) and [Canadian Museum of History](https://www.historymuseum.ca/) inform hierarchy, image scale and readable context, not borrowed branding, fonts or assets. Available reference evidence is limited to the successful DOM, font and content observations documented in [README.md](README.md); blocked, loading or failed-video captures are not visual evidence.

## Colors

Cool, readable lettering and pale-blue actions sit against muted porcelain blue, with warm-white identity lettering and a distinct purple exhibition field.

### Primary
- **Pale Porcelain Blue** (`accent`): primary actions, selected titles, navigation feedback, factual labels, text selection, keyboard focus and low-opacity printed edges and exhibition border.
- **Muted Cobalt** (`cobalt`): icon-button and retained filled-secondary-action hover backing, not image mats.

### Secondary
- **Muted Exhibition Purple** (`wine`): the retained full-width exhibition field. Its existing token name and value are unchanged.

### Neutral
- **Porcelain-Blue Canvas** (`paper`): page background and viewer toolbar fields. The legacy name does not imply a light surface.
- **Warm White** (`white`): lettering over film and dark bands, the wordmark and secondary actions; never a white canvas.
- **Reading White** (`ink`): primary body text.
- **Blue Gray** (`muted`): supporting prose and metadata.
- **Mineral Blue** (`mineral`): navigation states, icon controls, language status and native-select hover backing; no longer an object-display surround.
- **Deep Porcelain Blue** (`deep`): masthead, footer, viewer stage, native select and opaque image-control backing.

**The Quiet Accent Rule.** Pale blue marks actions, selection, keyboard focus and restrained printed edges against dark surfaces; it does not recolor the historical media.

All nine palette primitives are unchanged. Mount rules mix the existing accent with transparency, not a new gold or frame color. Exhibition captions and media overlays retain component-specific colors. Hero gradients support text legibility and transitions over contextual media, not object inspection.

## Typography

**Display Font:** Source Serif 4 for Latin and Cyrillic; regional Noto Serif families for Chinese and Japanese.
**Editorial Body Font:** The same Source Serif 4 or regional Noto Serif family as editorial headings.
**Interface Font:** Source Sans 3 for Latin and Cyrillic; regional Noto Sans families for Chinese and Japanese, used for controls, captions and metadata.
**Identity Font:** Bodoni Moda, only for MOFER identity lettering.

| Document Language | Editorial Headings and Prose | Interface and Caption Family |
| --- | --- | --- |
| `en`, `fr`, `de`, `es`, `ru` | Source Serif 4 Variable | Source Sans 3 Variable |
| `zh-Hans` | Noto Serif SC Variable | Noto Sans SC Variable |
| `zh-Hant` | Noto Serif TC Variable | Noto Sans TC Variable |
| `ja` | Noto Serif JP Variable | Noto Sans JP Variable |

The root language selects the roles. The serif stack ends with Noto Serif SC and generic serif for default-language content; the default interface stack includes Noto Sans SC, Noto Sans JP and generic sans-serif. Regional Noto stacks fall back to the corresponding Source family and then the generic family. Source includes Cyrillic subsets; SC, TC and JP preserve the intended regional glyph forms instead of sharing one Chinese face. The CSS variable named `--body` still means the inherited sans-serif interface family; the final editorial-prose rule explicitly uses `--display`.

The pairing is editorial rather than ornamental: serifs carry sustained reading as well as subjects, while sans-serif captions, labels and controls distinguish reference information and actions. This reuses the existing nine font families without new dependencies.

### Hierarchy

| Role | Above 960px | 641px to 960px | Up to 640px |
| --- | --- | --- | --- |
| Shared page title | 4.25rem | 3.75rem | 3rem |
| Shared section heading | 2.75rem | 2.5rem | 2.125rem |
| Ordinary editorial prose | 1.1875rem (19px) | 1.1875rem (19px) | 1.125rem (18px) |
| Captions and shared metadata | 1rem (16px) | 1rem (16px) | 1rem (16px) |

The frontmatter is the default role baseline, not a promise that every visible word is 19px. Pixel equivalents assume the unchanged (16px) root. Latin/Cyrillic reading uses (1.7) leading and a (60ch) measure. Chinese and Japanese use (1.85), (30em), strict line breaking and heading leading (1.45), versus (1.2) for default headings. Shared first- and second-level headings use weight (600); identity marks and some third-level titles retain their own weights.

- **Content titles:** the shared sans-serif third-level heading is (1.25rem / 1.45), weight (500), with research item titles at (600). The selected-object serif title is (2rem), becoming (1.75rem) at (960px). Collection-theme titles are (1.5rem), weight (500); exhibition section headings retain their (3.125rem / 2.8rem / 2.25rem) steps.
- **Editorial prose:** the final shared rule includes hero statements and ledes, Home summaries, compact-intro ledes, collection summaries, theme descriptions and other reading passages. It overrides their earlier smaller local sizes. Measures still vary where composition requires it, including Home route summaries at (48ch) and bounded hero copy.
- **Captions and metadata:** normal-case labels remain below titles at (1rem). Exhibition captions use (1.65) leading; viewer captions use (1.5), including phones. Definition labels, types and dates retain their own weights and leading.
- **Controls:** navigation, buttons, text links and the native select use (1rem), including phones. The expanded compact navigation menu is (1.1rem), not smaller. The footer body and back-to-top link are (1rem); its serif statement is (1.25rem) on larger screens and (1rem) on phones.
- **Collection titles:** thumbnail names are serif, weight (600), at (1.125rem), then (1.0625rem) on phones. Home preview titles are (1.25rem / 1.4), weight (600). Full titles wrap rather than being truncated.
- **Actual smaller exceptions:** the language-load status and its retry label inherit (.85rem); the viewer counter uses (.8rem), then (.875rem) on phones. Generic contact-panel links retain (1.12rem / .97rem); the dedicated Contact page overrides them to (1.25rem / 1.125rem). These are component exceptions, not the editorial reading baseline. Hidden brand-descriptor rules do not define a visible small-text role.

Ordinary text uses `rem` so text enlargement remains useful. Large identity marks deliberately use fixed pixel sizes: masthead (38 / 34 / 32px), Home wordmark (96 / 80 / 64 / 56px), and footer (72 / 64px), at their existing breakpoints. The Home museum-name subtitle still uses `rem`; the small viewer wordmark is also an exception at (1.8rem / 1.4rem). Preserve the graphic identity without freezing readable copy at 200% text size.

Type changes only at explicit breakpoints; no font size depends on viewport width. Tracking is zero. Headings balance, prose wraps naturally, and German prose/headings allow automatic hyphenation. Long thumbnail metadata also allows hyphenation and anywhere wrapping.

**The Script Before Style Rule.** Use the locale's Source or regional Noto serif for editorial headings and prose, its sans-serif for interface text, and Bodoni only for MOFER identity lettering.

**The Title First Rule.** Give headings and object names priority; place classification and exhibition status below them.

**The Context Before Count Rule.** Keep quantities, dates and location facts inside compact labelled notes, not oversized standalone statistics.

### Local Font Delivery

[scripts/prepare-fonts.mjs](scripts/prepare-fonts.mjs) copies the nine pinned Fontsource (5.3.0) families into `dist/assets/fonts/` during [scripts/build.mjs](scripts/build.mjs). Each family receives its package stylesheet, license and all supplied `-wght-normal.woff2` files. Normal variable faces, Fontsource `unicode-range` subsets and `font-display: swap` are retained; this is not custom character subsetting. No runtime font CDN is involved.

Committed source font assets remain legacy references and are explicitly excluded from the build copy. Hanken's remaining development dependency is not a public type role or a generated family. Family routing and checked runtime samples do not certify every Unicode character, fallback environment or native translation. Historical and linguistic approval questions remain in [docs/translation-review.md](docs/translation-review.md).

## Layout

The shared content frame has a maximum width of (1320px), with two responsive side gutters. Full-width exhibition and footer bands align their content to that frame. Sections are open layouts or tonal fields, not floating cards. Reduced gaps give reading and image groups a compact printed-album rhythm without a literal newspaper column system.

| Viewport Width | Side Gutter | Masthead Minimum | Section Block Padding |
| --- | --- | --- | --- |
| Above 1200px | 48px | 5.25rem | 56px |
| 961px to 1200px | 36px | 5.25rem | 56px |
| 641px to 960px | 30px | 5.125rem | 48px |
| 361px to 640px | 22px | 4.625rem | 40px |
| Up to 360px | 18px | 4.625rem | 40px |

These are shared defaults, not universal element dimensions. Compact introductions use (48px 28px), (40px 24px), then (32px 20px) block padding; the next section starts with (24px) top padding. Header heights are minima in `rem`, not fixed pixel boxes.

- Home's introduction pairs its headline on the left with prose on the right (.85fr / 1.15fr; 64px gap), tightening to (50px) below (1200px) and stacking at (960px). About and Research also start with a (64px) paired-column gap. Contextual museum notes remain on About, not duplicated on Home.
- Home highlights use three equal columns with (36px) gaps, tightening to (28px) at (960px), then one column with (32px) gaps on phones. Images retain natural proportions within maximum heights of (330 / 260 / 320px). Mounts, not empty fixed-height stages, set caption width.
- Collections places the large selected object beside an open reading column above the thumbnails: (1.35fr / 1fr; 44px gap), then (1.2fr / 1fr; 32px gap) at (960px), then one column on phones. Images retain natural proportions within maximum heights of (520 / 420 / 360px). Paired media and copy are vertically centered; the expansion control stays on the visible image inside its mount.
- Collection selectors use four columns and two on phones, with row/column gaps of (36px / 28px), then (24px / 18px) at (960px), then (32px / 20px) on phones. Collection themes use two columns with (44px / 40px) gaps, then (40px / 24px), then one column with (32px) gaps. Theme image height caps are (360 / 300 / 340px).
- Exhibition photographs use two columns with (36px) gaps, then (40px / 28px) at (960px), then one column with (36px) gaps on phones. Contextual exhibition photography retains its (4 / 3) cover treatment; original artifact scans remain contained.
- About and Exhibitions retain photographic openings. Research and Contact use compact introductions; Research keeps a descriptive heading, all four existing activities in a two-column grid, and its collaboration photograph. Activity entries stack on phones.
- Contact places email, telephone and press links first, in the left desktop column. Collaboration copy and the original photograph follow on the right. At (640px), the single-column order keeps contact methods first; its photograph retains its original proportions.
- About's three contextual notes use a three-column record row and stack on phones. Labels sit above complete facts, not beside giant numerals. The homepage's research/contact routes use two open columns, then one on phones.

The spacing entries represent recurring values, not a strict mathematical grid. Shrinkable grid tracks and children prevent intrinsic widths from forcing long translations off-screen; metadata and contact links wrap. Preserve these constraints when enlarging text. The navigation breakpoint (1024px) is separate from content-grid changes (960px).

[script.js](script.js) schedules row alignment for Home previews, the contact sheet, themes and exhibition galleries. It groups items by rounded top position, reads loaded mount widths and heights, then writes `--caption-width` and `--media-offset` in a batched animation frame. A shorter mount receives half the difference from its row's tallest mount. Image loads, font readiness/loading completion, locale updates and resize trigger recalculation; a width-cached `ResizeObserver` ignores height-only changes. This layout routine changes neither focus nor viewer state.

The sticky masthead's anchor offset uses the header token plus (24px). Short-phone hero adjustments apply up to (640px) wide and (740px) high without shrinking the whole page. First-view tasks and the limited verification evidence are recorded in [README.md](README.md), not promoted into a universal hero requirement.

**The Open Gallery Rule.** Keep sections and reading columns open; flat artifact mounts do not justify colored mats or enclosing text panels.

**The Mount and Caption Rule.** Align caption bounds to the mount and center each row's images vertically; do not crop an artifact or reserve an empty fixed-height image stage just to align it.

## Elevation & Depth

There are no box shadows. Dark tonal fields, fine raster grain, flat printed edges and gradient joins provide depth. The viewer uses a deep-blue stage, porcelain-blue toolbar fields and a dark modal backdrop (`rgb(9 17 29 / 90%)`).

[assets/textures/archive-paper.png](assets/textures/archive-paper.png) comes from a blank margin of [assets/collections/pearl-buck-letter.jpg](assets/collections/pearl-buck-letter.jpg). [scripts/prepare-texture.mjs](scripts/prepare-texture.mjs) removes uneven local illumination, limits contrast and mirrors the crop into a repeating raster tile. CSS blends it with `soft-light` on the body, masthead, exhibition field and footer. It is derived paper grain, not an AI-generated historical artifact; the original letter image is unchanged.

The paper-grain asset and its preparation are unchanged. A separate, feathered raster border appears only at the exhibition entry on Home and Exhibitions; its provenance is recorded below. It does not replace the background texture.

**The Flat Gallery Rule.** Use tonal fields, subtle paper grain and printed edges for depth; keep texture off original object photographs and avoid wood, bevels or gilding.

## Shapes

Artifact mounts, icon controls and the native dialog are square; text-action buttons have a slight radius (2px). Mounts use transparent paper context, (8px) padding and a (1px) outer rule in accent mixed with (38%) opacity. A second (1px) rule sits (3px) inside, at (20%) accent. These flat printed edges replace the previous blanket border prohibition only for the newly requested media treatment. Keyboard focus retains its separate pale-blue outline (3px) with an offset (5px).

Historical objects, documents and posters retain natural proportions and containment inside mounts, without colored mat fills, cropping, rounded edges or simulated three-dimensional frames. The mount wraps only the image, not its reading column. Any mount or border inside an original scan remains part of that image. Full-bleed film and photographic openings stay unframed; contextual exhibition photographs retain cover. The native inspection modal is a separate framed tool and always contains the full original image.

The image-expansion affordance is a warm-white Lucide icon (20px) on an opaque deep-blue square (36px). Generic icon buttons are (46px), reducing to (42px) on phones.

## Components

### Buttons

Primary actions use pale blue with deep-blue text, including over the film; hover lightens the blue. Their directional arrow moves (2px, -2px) over (180ms ease). Home's secondary route is now an unfilled text link, warm white over the film, not a second filled button. The existing filled-secondary CSS variant remains defined with translucent dark-blue backing and muted-cobalt hover; it is not the default for supporting routes.

Button minimum height is (50px); phones use (46px) and (11px 16px) padding, retaining (1rem) text. Text links use (44px) minimum height, (1rem / 1.5) text, pale blue and warm-white hover outside the hero. Icon buttons use mineral-blue backing, muted-cobalt hover over (160ms ease) and disabled opacity (.3). Viewer and menu controls retain accessible names and native title tooltips.

### Navigation And Language

The masthead is dark and textured, ending in a quiet (1px) edge at (22%) accent. Route hover, focus and `aria-current="page"` use pale-blue text on mineral-blue backing; the current route also uses bold text. There are no underline or dot indicators. The MOFER wordmark leads Home; the five navigation links lead directly to [about.html](about.html), [collections.html](collections.html), [exhibitions.html](exhibitions.html), [research.html](research.html) and [contact.html](contact.html). Legacy homepage anchors remain available, but are not substitutes for these page destinations.

Desktop route links can wrap as text enlarges; the header grows beyond its minimum instead of clipping them. At widths up to (1024px), a labelled toggle opens a full-width dark menu. Content-grid changes remain at (960px). Link activation, an outside click, Escape or returning to desktop closes it; Escape returns focus to the toggle. Without JavaScript, route links remain visible. The small brand descriptor is hidden at every width, not the MOFER wordmark or readable page title.

The language control is a native select with eight autonyms, no flags and no two-state toggle: English (`en`), 简体中文 (`zh-Hans`), Français (`fr`), 繁體中文 (`zh-Hant`), 日本語 (`ja`), Русский (`ru`), Deutsch (`de`) and Español (`es`). It uses (1rem) reading-white text on deep blue, mineral-blue hover, a (44px) minimum height and a (148px) maximum width, including phones. Phones hide the adjacent language icon. Native option rendering remains platform-controlled.

All six pages start with English HTML fallback. The script loads English first, then restores a supported explicit choice from `localStorage` under `mofer-language`; an unavailable storage API leaves the control usable without persistence. Locale packs provide shared strings and eight collection records. Switching updates document language and title, metadata, page copy, image descriptions, accessible control names and collection content. The select is temporarily disabled during loading; a failed switch retains the current content and exposes a status message with a localized retry button. An initial English-load failure can also be retried without reloading.

### Home Preview And Museum Notes

Each Home preview is a real item-query link with a contained original image, complete serif title and sans-serif type metadata. Its transparent printed mount joins an equal-column grid, with caption bounds following the mount and images centered within each row. Hover changes the title to pale blue; keyboard focus remains visible.

Museum notes remain on About as a semantic definition list. Labels are restrained pale-blue sans-serif text; supporting facts are muted and readable. The first-exhibition quantity, collection period and Canadian base retain their complete context. Removing their duplicate Home presentation does not remove the facts or locale-pack entries. There is no giant-number or statistic-card component.

### Collection Selector And Detail

Each native thumbnail button contains a noninteractive printed-mount span around the image, followed by its title and type metadata. Hover changes image opacity to (.85); selection uses a pale-blue title, checkmark and `aria-pressed`, not a colored mat or extra divider. Image heights are natural, capped at (210px) by default, (180px) up to (1200px), and (150px) up to (360px). The phone title uses the smaller collection-title role without shrinking its metadata below (1rem).

Selection updates the live detail region and scrolls it into view, instantly under reduced motion. Language switching preserves the selected record and focused thumbnail. The unframed reading column presents the title, type, full summary, date and place; summaries are not repeated visibly in thumbnails. Preserve the selected title as an `h2`, its `data-detail-title` hook and its section-label association. Full descriptions and locale JSON are not shortened to create whitespace.

### Fade-Led Transitions

Soft fades carry the page transitions. Pattern appears only once at the purple exhibition entry on Home and once on Exhibitions. About, Collections, Research, Contact and 404 have no decorative accent; neither do footers, the film edge or other sections. No page requires an isolated symbol.

The exhibition border is an empty, absolutely positioned pseudo-element (8px) below the section top. It aligns left with the shared content gutter through `max(var(--gutter), calc((100% - var(--max)) / 2))`, with width `min(320px, calc(100% - var(--gutter) * 2))` and height (24px). The existing pale-blue accent tints the raster mask at (.34) opacity; `center / contain no-repeat` preserves its proportions. It takes no pointer events, carries no assistive-technology text and changes no padding or layout space.

The film ends in a (64px) paper-color fade. Photographic openings combine their legibility overlay with a (64px) fade, reduced to (56px) on phones. The textured purple exhibition band blends to the paper field over (48px) at each edge; the textured footer joins from paper over (32px). The masthead retains its quiet straight edge.

[assets/textures/exhibition-border.png](assets/textures/exhibition-border.png) is prepared by [scripts/prepare-exhibition-border.mjs](scripts/prepare-exhibition-border.mjs) from the text-free printed bottom edge of the unchanged [booklet scan](assets/collections/extended/madame-chiang-letter-children.jpg). The crop starts at (6%) from the left and (96.7%) from the top, spanning (88%) of the width and (2.7%) of the height. The (1024 x 44px) white-alpha raster fades to transparency at all four edges, using squared horizontal (220px) and vertical (12px) feathering in the source raster. CSS supplies a flat tint, not embossed material. This is modern source-derived decoration, not an authenticated historic website border, and no new historical date is assigned to it.

The two Boynton House venue separators use commas; original titles, captions and punctuation inside artifacts are not decorative material to erase. The localized border does not change the established mounts, typography or image alignment.

**The Fade First Rule.** Let smooth fades carry transitions; reserve a softly feathered border for the exhibition entry on Home and Exhibitions, with no isolated symbols or repeated page-wide pattern.

### Venue Map

Home and Exhibitions place a Google Maps figure below the existing exhibition/press links in the right-hand feature column. The map is a functional framed tool, not a new decorative card or page section. Its caption, iframe title and external link use the selected language; the caption identifies the 2025 exhibition venue.

The iframe is full-width with a stable (240px) height, reducing to (220px) on phones, and a single existing mount-color border. It uses `color-scheme: light` so Google's native controls do not inherit the surrounding dark theme. Native map colors and attribution are not tinted or obscured. The caption wraps naturally above it; the verified street address remains below. Keep the address and external link available even when the lazy-loaded third-party frame cannot load. Existing geolocation restrictions remain unchanged.

### Image Inspection

An opaque expansion control opens a native modal dialog. Trigger-image hover reduces opacity to (.92) over (220ms ease). The viewer contains the full image, locks background scrolling, closes with Escape and returns focus to the opening control.

Previous/next controls and arrow keys cycle within the image group; single-image groups disable those buttons. The featured group contains the eight collection records; pathway and exhibition grids have their own groups. Zoom uses (200%) image dimensions in a scrollable stage and resets when the image changes. Captions and a tabular counter remain visible. If a pending language change completes while the viewer is open, its caption and image description update without changing the selected item, zoom or scroll position.

### Film And Motion

The original film is muted, inline and looping, with `defaultPlaybackRate` and `playbackRate` set to (0.25). There is no on-page play/pause button or native control bar. It requests continuous playback regardless of motion preference, as explicitly required for this film; browser autoplay policy may leave a still image. When playback is unavailable, hero text settles at full opacity instead of freezing its entrance animation.

Reduced-motion CSS removes decorative animation and transitions and makes scrolling immediate, but does not hide or pause the film. The homepage content has one entrance (850ms, `cubic-bezier(.16, 1, .3, 1)`), only from (961px) with no reduced-motion preference.

### Fields And Other Patterns

The native language select is the implemented input control; there are no text-entry forms, search fields, filter chips or ticketing controls. The sidecar contains ten self-contained previews using original imagery, scoped CSS and inline Lucide paths, with one subtle raster-border preview on the current porcelain-blue canvas. They record appearance and CSS states, not runtime language, menu, measured row alignment, collection-selection or dialog logic. Font delivery, source provenance and responsive metadata extend the frontmatter without adding new palette primitives.

Upcoming-exhibition and poster presentation remains brainstorming only in the [earlier revision plan](docs/superpowers/plans/2026-09-19-porcelain-blue-multilingual.md). No proposed poster layout, promotion, event, placeholder or generated imagery is part of this recorded system.

## Do's and Don'ts

### Do:
- Do keep original object images fully visible and free of texture overlays.
- Do lead with smooth fades, keep the exhibition border localized and retain flat double-rule mounts around artifact media.
- Do align captions to mount bounds and center images within each grid row.
- Do place names and headings before type and status metadata.
- Do keep reading compact but organized and let all eight languages wrap naturally.
- Do use locale-specific serif editorial prose and sans-serif interface text, enlarging readable text independently of graphic identity marks.
- Do retain full contextual facts and original meaning while improving text allocation.
- Do keep the native language select and explicit preference persistence across dedicated pages.
- Do retain visible focus, labelled controls, dialog focus return and motion-preference fallbacks.
- Do use build-generated local fonts, existing Lucide icons and original historical media.

### Don't:
- Don't add white canvases, ornamental dots or above-title kickers.
- Don't turn sections into floating cards or add wood, bevels, gilding, offset shadows or pill controls.
- Don't restore colored image mats or enclose reading columns in decorative frames.
- Don't spread the exhibition border across the page or add isolated symbols, corner rules or line accents at other section joins.
- Don't present the source-derived border as an authenticated historic website border or assign it a new historical date.
- Don't replace contextual museum notes with giant standalone numbers or crop documents to fill frames.
- Don't add visible film playback controls or promise autoplay when the browser blocks it.
- Don't hide or pause the requested film for reduced motion; remove decorative UI animation instead.
- Don't invent historical evidence, visitor services or approval and rights claims.
- Don't publish upcoming-exhibition placeholders or treat a future poster proposal as a shipped pattern.
- Don't use wordmark-sized type in compact controls or scale fonts with viewport width.
- Don't replace Lucide icons with glyphs or treat sidecar tonal ramps as site colors.
- Don't treat legacy source fonts, borrowed museum branding or failed reference captures as current design authority.