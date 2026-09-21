---
name: MOFER
description: A porcelain-blue moving archive with script-specific typography and open editorial galleries.
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
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0"
  headline:
    fontFamily: '"Source Serif 4 Variable", "Noto Serif SC Variable", serif'
    fontSize: "2.5rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0"
  title:
    fontFamily: '"Source Sans 3 Variable", "Noto Sans SC Variable", "Noto Sans JP Variable", sans-serif'
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0"
  body:
    fontFamily: '"Source Sans 3 Variable", "Noto Sans SC Variable", "Noto Sans JP Variable", sans-serif'
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
  label:
    fontFamily: '"Source Sans 3 Variable", "Noto Sans SC Variable", "Noto Sans JP Variable", sans-serif'
    fontSize: ".875rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0"
  control:
    fontFamily: '"Source Sans 3 Variable", "Noto Sans SC Variable", "Noto Sans JP Variable", sans-serif'
    fontSize: ".9rem"
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: "0"
  navigation:
    fontFamily: '"Source Sans 3 Variable", "Noto Sans SC Variable", "Noto Sans JP Variable", sans-serif'
    fontSize: ".875rem"
    fontWeight: 500
    lineHeight: 1.75
    letterSpacing: "0"
  collection-title:
    fontFamily: '"Source Sans 3 Variable", "Noto Sans SC Variable", "Noto Sans JP Variable", sans-serif'
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.5
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
  "36": "36px"
  "40": "40px"
  "44": "44px"
  "48": "48px"
  "56": "56px"
  "64": "64px"
  "72": "72px"
  "88": "88px"
  "96": "96px"
  "104": "104px"
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
    padding: "0"
    width: "100%"
  image-expand:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.white}"
    width: "36px"
    height: "36px"
---

# Design System: MOFER

## Overview

**Creative North Star: "Moving Archive"**

MOFER's original photographs, documents and film lead a quiet editorial museum. The established porcelain-blue palette, pale-blue actions, muted purple exhibition field and real paper grain remain. Intact objects sit directly in open layouts, with deliberate whitespace instead of repeated colored mats or enclosing panels.

Locale-specific serif headings and sans-serif reading text give eight languages a shared, legible hierarchy. Names lead, full historical context follows, and small factual notes remain in context. The MOFER wordmark over the original film anchors the identity; artifacts and their stories guide visitors through the museum.

**Key Characteristics:**
- Unchanged porcelain-blue fields, pale-blue actions and muted purple exhibitions.
- Original paper grain around contained, untextured historical images.
- Script-specific reading typography, title-first context and deliberate whitespace.
- Six dedicated pages with English fallback and eight persistent language choices.
- Original quarter-speed film; reduced motion removes decorative UI movement.

This authorized refresh records the local September 20 implementation, not a new identity or a publication. The original seed (`f90512f9`) remains in [index.html](index.html). Published commit `7cfd293` is the previous version; this revision has no push or deployment authority.

The frontmatter records reusable desktop/default-language tokens from [styles.css](styles.css); locale mappings and responsive exceptions follow below. Current source outranks intentions in the [editorial typography plan](docs/superpowers/plans/2026-09-20-editorial-typography.md). [PRODUCT.md](PRODUCT.md) retains product constraints. [.impeccable/design.json](.impeccable/design.json) extends the tokens with metadata and component previews; its preserved tonal ramps are swatch aids, not additional site colors.

[ROM](https://www.rom.on.ca/), [AGO](https://ago.ca/), [Smithsonian American History](https://americanhistory.si.edu/) and [Canadian Museum of History](https://www.historymuseum.ca/) inform hierarchy, image scale and readable context, not borrowed branding, fonts or assets. Available reference evidence is limited to the successful DOM, font and content observations documented in [README.md](README.md); blocked, loading or failed-video captures are not visual evidence.

## Colors

Cool, readable lettering and pale-blue actions sit against muted porcelain blue, with warm-white identity lettering and a distinct purple exhibition field.

### Primary
- **Pale Porcelain Blue** (`accent`): primary actions, selected titles, navigation feedback, factual labels, text selection and keyboard focus.
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

**The Quiet Accent Rule.** Pale blue marks actions, selection and keyboard focus against dark surfaces; it does not recolor the historical media.

All nine palette primitives are unchanged. Exhibition captions and media overlays retain component-specific colors. Hero gradients support text legibility over contextual media, not object inspection; removing a mat does not change the palette.

## Typography

**Display Font:** Source Serif 4 for Latin and Cyrillic; regional Noto Serif families for Chinese and Japanese.
**Body Font:** Source Sans 3 for Latin and Cyrillic; regional Noto Sans families for Chinese and Japanese, also used for controls and metadata.
**Identity Font:** Bodoni Moda, only for MOFER identity lettering.

| Document Language | Heading Family | Reading and Control Family |
| --- | --- | --- |
| `en`, `fr`, `de`, `es`, `ru` | Source Serif 4 Variable | Source Sans 3 Variable |
| `zh-Hans` | Noto Serif SC Variable | Noto Sans SC Variable |
| `zh-Hant` | Noto Serif TC Variable | Noto Sans TC Variable |
| `ja` | Noto Serif JP Variable | Noto Sans JP Variable |

The root language selects the roles. The default heading stack ends with Noto Serif SC and generic serif; the default body stack includes Noto Sans SC, Noto Sans JP and generic sans-serif. Regional Noto stacks fall back to the corresponding Source family and then the generic family. Source includes Cyrillic subsets; SC, TC and JP preserve the intended regional glyph forms instead of sharing one Chinese face.

The pairing is editorial rather than ornamental: serifs establish subjects; sans-serif prose, captions and controls carry reading and action. No display face is assigned to ordinary body copy.

### Hierarchy

| Role | Above 960px | 641px to 960px | Up to 640px |
| --- | --- | --- | --- |
| Shared page title | 4.25rem | 3.75rem | 3rem |
| Shared section heading | 2.5rem | 2.25rem | 2rem |
| Main reading copy | 1.0625rem | 1.0625rem | 1rem |
| Shared metadata size | .875rem | .875rem | .875rem |

The frontmatter is the default role baseline, not a promise that every element uses one size or leading. Latin/Cyrillic reading copy uses (1.75) leading and a (64ch) measure. Chinese and Japanese use (1.95), (32em), strict line breaking and heading leading (1.45), versus (1.2) for default headings. Heading weights are generally (500); research item titles use (600). The root remains (16px), while main prose sizes are assigned by component.

- **Content titles:** the shared sans-serif third-level heading is (1.25rem / 1.45). The selected-object serif title is (2rem), becoming (1.75rem) at (960px); collection-theme titles are (1.5rem). Exhibition section headings retain their own (3.125rem / 2.8rem / 2.25rem) steps.
- **Reading exceptions:** compact-intro ledes and the Home introduction use (1.125rem) on desktop. On phones they become (1rem) and (1.0625rem), respectively. Home pathway copy uses a (48ch) limit. Hero statements, metadata and control labels have local leading, not the universal reading leading.
- **Metadata:** normal-case labels remain below titles. Metadata size does not imply a uniform weight or line-height; definition labels, exhibition captions and thumbnail types retain their own roles.
- **Controls:** button text is (.9rem), then (.83rem) on phones. Navigation is (.875rem), (.8rem) at (1200px), and (1.1rem) in the expanded compact menu. The native select is (.8rem), then (.75rem). These are control exceptions, not a smaller prose baseline.
- **Collection titles:** thumbnail text is (1rem), then (.9375rem) on phones; Home preview titles stay (1.125rem). Full titles wrap rather than being truncated.

Ordinary text uses `rem` so text enlargement remains useful. Large identity marks deliberately use fixed pixel sizes: masthead (38 / 34 / 32px), Home wordmark (96 / 80 / 64 / 56px), and footer (72 / 64px), at their existing breakpoints. The Home museum-name subtitle still uses `rem`; the small viewer wordmark is also an exception at (1.8rem / 1.4rem). Preserve the graphic identity without freezing readable copy at 200% text size.

Type changes only at explicit breakpoints; no font size depends on viewport width. Tracking is zero. Headings balance, prose wraps naturally, and German prose/headings allow automatic hyphenation. Long thumbnail metadata also allows hyphenation and anywhere wrapping.

**The Script Before Style Rule.** Use the locale's Source or regional Noto pair for readable text; reserve Bodoni for MOFER identity lettering.

**The Title First Rule.** Give headings and object names priority; place classification and exhibition status below them.

**The Context Before Count Rule.** Keep quantities, dates and location facts inside compact labelled notes, not oversized standalone statistics.

### Local Font Delivery

[scripts/prepare-fonts.mjs](scripts/prepare-fonts.mjs) copies the nine pinned Fontsource (5.3.0) families into `dist/assets/fonts/` during [scripts/build.mjs](scripts/build.mjs). Each family receives its package stylesheet, license and all supplied `-wght-normal.woff2` files. Normal variable faces, Fontsource `unicode-range` subsets and `font-display: swap` are retained; this is not custom character subsetting. No runtime font CDN is involved.

Committed source font assets remain legacy references and are explicitly excluded from the build copy. Hanken's remaining development dependency is not a public type role or a generated family. Family routing and checked runtime samples do not certify every Unicode character, fallback environment or native translation. Historical and linguistic approval questions remain in [docs/translation-review.md](docs/translation-review.md).

## Layout

The shared content frame has a maximum width of (1320px), with two responsive side gutters. Full-width exhibition and footer bands align their content to that frame. Sections are open layouts or tonal fields, not floating cards. Larger breaks separate subjects; images, captions and related prose stay close enough to read together.

| Viewport Width | Side Gutter | Masthead Minimum | Section Block Padding |
| --- | --- | --- | --- |
| Above 1200px | 48px | 5.25rem | 88px |
| 961px to 1200px | 36px | 5.25rem | 88px |
| 641px to 960px | 30px | 5.125rem | 64px |
| 361px to 640px | 22px | 4.625rem | 56px |
| Up to 360px | 18px | 4.625rem | 56px |

These are shared defaults, not universal element dimensions. Compact introductions use (72px 40px), (56px 32px), then (40px 24px) block padding; the next section starts with (24px) top padding. Header heights are minima in `rem`, not fixed pixel boxes.

- Home's introduction pairs its headline on the left with prose on the right (0.8fr / 1.2fr; 104px gap), stacking at (960px). The duplicate three-fact block and four small hero topic labels no longer appear on Home; contextual museum notes remain on About.
- Home collection highlights are three open images in varied columns (1.15fr / .75fr / 1.15fr; 56px gap), then one column on phones. Images keep their natural proportions within maximum heights of (350 / 260 / 320px). Captions follow the visible image rather than an invisible fixed-height stage.
- Collections uses a compact introduction and count lede instead of an image banner and repeated headings. The large selected object and unframed reading column sit above the thumbnails: (1.5fr / .85fr), then (1.2fr / 1fr) at (960px), then one column on phones. Images keep their natural proportions within maximum heights of (520 / 420 / 360px). Featured-object and theme inspection triggers fit the image bounds so expansion controls remain on the artwork.
- Collection selectors use four columns and two on phones. Collection themes use two columns on desktop/tablet and one on phones. Exhibition photographs likewise use two columns and one on phones, retaining contextual (4 / 3) crops.
- About and Exhibitions retain photographic openings. Research and Contact use compact introductions; Research keeps a descriptive heading, all four existing activities in a two-column grid, and its collaboration photograph. Activity entries stack on phones.
- Contact places email, telephone and press links first, in the left desktop column. Collaboration copy and the original photograph follow on the right. At (640px), the single-column order keeps contact methods first; its photograph retains its original proportions.
- About's three contextual notes use a three-column record row and stack on phones. Labels sit above complete facts, not beside giant numerals. The homepage's research/contact routes use two open columns, then one on phones.

The spacing entries represent recurring values, not a strict mathematical grid. Shrinkable grid tracks and children prevent intrinsic widths from forcing long translations off-screen; metadata and contact links wrap. Preserve these constraints when enlarging text. The navigation breakpoint (1024px) is separate from content-grid changes (960px).

The sticky masthead's anchor offset uses the header token plus (24px). Short-phone hero adjustments apply up to (640px) wide and (740px) high without shrinking the whole page. First-view tasks and the limited verification evidence are recorded in [README.md](README.md), not promoted into a universal hero requirement.

**The Open Gallery Rule.** Give intact objects and their context space; do not restore colored thumbnail mats or an enclosing collection-detail panel.

## Elevation & Depth

There are no box shadows. Dark tonal fields, spacing and fine raster grain provide depth. The viewer uses a deep-blue stage, porcelain-blue toolbar fields and a dark modal backdrop (`rgb(9 17 29 / 90%)`).

[assets/textures/archive-paper.png](assets/textures/archive-paper.png) comes from a blank margin of [assets/collections/pearl-buck-letter.jpg](assets/collections/pearl-buck-letter.jpg). [scripts/prepare-texture.mjs](scripts/prepare-texture.mjs) removes uneven local illumination, limits contrast and mirrors the crop into a repeating raster tile. CSS blends it with `soft-light` on the body, masthead, exhibition field and footer. It is derived paper grain, not an AI-generated historical artifact; the original letter image is unchanged.

The texture asset and its preparation are retained, not regenerated for this typography and layout refinement.

**The Flat Gallery Rule.** Use tonal fields, subtle paper grain and spacing for depth; keep texture off original object photographs and avoid imitation bevels.

## Shapes

Media frames, icon controls and the native dialog are square; text-action buttons have a slight radius (2px). Components have no decorative borders or horizontal rules. Keyboard focus retains its pale-blue outline (3px) with an offset (5px).

Historical objects, documents and posters use containment without added mat padding or backing. Preview, thumbnail and theme surrounds are transparent; the collection detail no longer has a filled enclosing panel. Any mount or border inside an original scan remains part of that image. Contextual hero and exhibition photographs use cover; the inspection viewer always contains the full original image. A framed modal inspection tool remains appropriate even though editorial content is unframed.

The image-expansion affordance is a warm-white Lucide icon (20px) on an opaque deep-blue square (36px). Generic icon buttons are (46px), reducing to (42px) on phones.

## Components

### Buttons

Primary actions use pale blue with deep-blue text, including over the film; hover lightens the blue. Their directional arrow moves (2px, -2px) over (180ms ease). Home's secondary route is now an unfilled text link, warm white over the film, not a second filled button. The existing filled-secondary CSS variant remains defined with translucent dark-blue backing and muted-cobalt hover; it is not the default for supporting routes.

Button minimum height is (50px); phones use (46px), (.83rem) text and (11px 16px) padding. Text links use (44px) minimum height, (.9rem / 1.5) text, pale blue and warm-white hover outside the hero. Icon buttons use mineral-blue backing, muted-cobalt hover over (160ms ease) and disabled opacity (.3). Viewer and menu controls retain accessible names and native title tooltips.

### Navigation And Language

The masthead is dark and textured. Route hover, focus and `aria-current="page"` use pale-blue text on mineral-blue backing; the current route also uses bold text. There are no underline indicators. The MOFER wordmark leads Home; the five navigation links lead directly to [about.html](about.html), [collections.html](collections.html), [exhibitions.html](exhibitions.html), [research.html](research.html) and [contact.html](contact.html). Legacy homepage anchors remain available, but are not substitutes for these page destinations.

Desktop route links can wrap as text enlarges; the header grows beyond its minimum instead of clipping them. At widths up to (1024px), a labelled toggle opens a full-width dark menu. Content-grid changes remain at (960px). Link activation, an outside click, Escape or returning to desktop closes it; Escape returns focus to the toggle. Without JavaScript, route links remain visible. Phones hide the small brand descriptor, not the MOFER wordmark or readable page title.

The language control is a native select with eight autonyms, no flags and no two-state toggle: English (`en`), 简体中文 (`zh-Hans`), Français (`fr`), 繁體中文 (`zh-Hant`), 日本語 (`ja`), Русский (`ru`), Deutsch (`de`) and Español (`es`). It uses reading-white text on deep blue, mineral-blue hover, a (44px) minimum height and a (132px) maximum width, including phones. Phones hide the adjacent language icon. Native option rendering remains platform-controlled.

All six pages start with English HTML fallback. The script loads English first, then restores a supported explicit choice from `localStorage` under `mofer-language`; an unavailable storage API leaves the control usable without persistence. Locale packs provide shared strings and eight collection records. Switching updates document language and title, metadata, page copy, image descriptions, accessible control names and collection content. The select is temporarily disabled during loading; a failed switch retains the current content and exposes a status message with a localized retry button. An initial English-load failure can also be retried without reloading.

### Home Preview And Museum Notes

Each Home preview is a real item-query link with a contained original image, complete title and smaller type metadata. The transparent frame and varied grid give images room without card chrome. Hover changes the title to pale blue; keyboard focus remains visible.

Museum notes remain on About as a semantic definition list. Labels are restrained pale-blue sans-serif text; supporting facts are muted and readable. The first-exhibition quantity, collection period and Canadian base retain their complete context. Removing their duplicate Home presentation does not remove the facts or locale-pack entries. There is no giant-number or statistic-card component.

### Collection Selector And Detail

Each native thumbnail button shows a contained image, title and type metadata. Hover changes image opacity to (.85); selection uses a pale-blue title, checkmark and `aria-pressed`, not a colored mat or dividing line. Images are (210px) high by default, (155px) up to (1200px), (165px) up to (960px), and (125px) up to (360px). The phone title uses the smaller collection-title role without shrinking its metadata below the shared size.

Selection updates the live detail region and scrolls it into view, instantly under reduced motion. Language switching preserves the selected record and focused thumbnail. The unframed reading column presents the title, type, full summary, date and place; summaries are not repeated visibly in thumbnails. Preserve the selected title as an `h2`, its `data-detail-title` hook and its section-label association. Full descriptions and locale JSON are not shortened to create whitespace.

### Image Inspection

An opaque expansion control opens a native modal dialog. Trigger-image hover reduces opacity to (.92) over (220ms ease). The viewer contains the full image, locks background scrolling, closes with Escape and returns focus to the opening control.

Previous/next controls and arrow keys cycle within the image group; single-image groups disable those buttons. The featured group contains the eight collection records; pathway and exhibition grids have their own groups. Zoom uses (200%) image dimensions in a scrollable stage and resets when the image changes. Captions and a tabular counter remain visible. If a pending language change completes while the viewer is open, its caption and image description update without changing the selected item, zoom or scroll position.

### Film And Motion

The original film is muted, inline and looping, with `defaultPlaybackRate` and `playbackRate` set to (0.25). There is no on-page play/pause button or native control bar. It requests continuous playback regardless of motion preference, as explicitly required for this film; browser autoplay policy may leave a still image. When playback is unavailable, hero text settles at full opacity instead of freezing its entrance animation.

Reduced-motion CSS removes decorative animation and transitions and makes scrolling immediate, but does not hide or pause the film. The homepage content has one entrance (850ms, `cubic-bezier(.16, 1, .3, 1)`), only from (961px) with no reduced-motion preference.

### Fields And Other Patterns

The native language select is the implemented input control; there are no text-entry forms, search fields, filter chips or ticketing controls. The sidecar contains ten self-contained previews using original imagery, scoped CSS and inline Lucide paths. They record appearance and CSS states, not runtime language, menu, collection-selection or dialog logic. Font delivery, identity provenance and responsive metadata extend the frontmatter without adding new palette primitives.

Upcoming-exhibition and poster presentation remains brainstorming only in the [earlier revision plan](docs/superpowers/plans/2026-09-19-porcelain-blue-multilingual.md). No proposed poster layout, promotion, event, placeholder or generated imagery is part of this recorded system.

## Do's and Don'ts

### Do:
- Do keep original object images fully visible and free of texture overlays.
- Do place names and headings before type and status metadata.
- Do use deliberate responsive whitespace and let all eight languages wrap naturally.
- Do use the locale-specific font pair and enlarge readable text independently of graphic identity marks.
- Do retain full contextual facts and original meaning while improving text allocation.
- Do keep the native language select and explicit preference persistence across dedicated pages.
- Do retain visible focus, labelled controls, dialog focus return and motion-preference fallbacks.
- Do use build-generated local fonts, existing Lucide icons and original historical media.

### Don't:
- Don't add white canvases, decorative dividing lines or above-title kickers.
- Don't turn sections into floating cards or add bevels, offset shadows or pill controls.
- Don't restore colored image mats or an enclosing collection-detail panel.
- Don't replace contextual museum notes with giant standalone numbers or crop documents to fill frames.
- Don't add visible film playback controls or promise autoplay when the browser blocks it.
- Don't hide or pause the requested film for reduced motion; remove decorative UI animation instead.
- Don't invent historical evidence, visitor services or approval and rights claims.
- Don't publish upcoming-exhibition placeholders or treat a future poster proposal as a shipped pattern.
- Don't use wordmark-sized type in compact controls or scale fonts with viewport width.
- Don't replace Lucide icons with glyphs or treat sidecar tonal ramps as site colors.
- Don't treat legacy source fonts, borrowed museum branding or failed reference captures as current design authority.