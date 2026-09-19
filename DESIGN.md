---
name: MOFER
description: A porcelain-blue, textured multilingual museum built around original historical material.
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
  display:
    fontFamily: '"Bodoni Moda Variable", "Noto Serif SC Variable", serif'
    fontSize: "5rem"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "0"
  headline:
    fontFamily: '"Bodoni Moda Variable", "Noto Serif SC Variable", serif'
    fontSize: "2.6rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0"
  title:
    fontFamily: '"Hanken Grotesk Variable", "Microsoft YaHei", sans-serif'
    fontSize: "1.35rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0"
  body:
    fontFamily: '"Hanken Grotesk Variable", "Microsoft YaHei", sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0"
  label:
    fontFamily: '"Hanken Grotesk Variable", "Microsoft YaHei", sans-serif'
    fontSize: ".78rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0"
  control:
    fontFamily: '"Hanken Grotesk Variable", "Microsoft YaHei", sans-serif'
    fontSize: ".9rem"
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: "0"
  navigation:
    fontFamily: '"Hanken Grotesk Variable", "Microsoft YaHei", sans-serif'
    fontSize: ".875rem"
    fontWeight: 500
    lineHeight: 1.7
    letterSpacing: "0"
  collection-title:
    fontFamily: '"Hanken Grotesk Variable", "Microsoft YaHei", sans-serif'
    fontSize: ".96rem"
    fontWeight: 500
    lineHeight: 1.55
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
  "48": "48px"
  "52": "52px"
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
    backgroundColor: "{colors.mineral}"
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

MOFER's original photographs, documents and film lead a quiet, dark museum site. Muted China/porcelain-blue surfaces and pale-blue actions frame the material; the existing muted purple exhibition field and real paper grain remain. The interface gives images more room without cropping historical objects.

Display serifs, compact sans-serif controls and aligned text groups support an English-default, eight-language museum. Titles lead, full contextual copy follows, and small factual notes replace oversized statistics. ROM, AGO and MoMA inform hierarchy and image presentation, with less visual flourish than AGO. Open layouts and tonal fields separate content without white canvases or decorative dividing lines.

**Key Characteristics:**
- Porcelain-blue fields, pale-blue actions and retained muted purple exhibitions.
- Real paper grain around larger, contained and untextured historical images.
- Title-first text groups and compact contextual notes, with visible keyboard focus.
- Six dedicated pages with an English default and eight persistent language choices.
- Original quarter-speed ambient film, with reduced motion for decorative UI.

The frontmatter records reusable tokens from [styles.css](styles.css); component-specific values and responsive exceptions stay with their roles below. Current HTML and [script.js](script.js) outrank planning language. [PRODUCT.md](PRODUCT.md) and the [approved revision plan](docs/superpowers/plans/2026-09-19-porcelain-blue-multilingual.md) supply the authorized constraints. [.impeccable/design.json](.impeccable/design.json) adds metadata and component previews. Its generated tonal ramps are swatch aids, not additional site colors.

## Colors

Cool, readable lettering and pale-blue actions sit against muted porcelain blue, with warm-white identity lettering and a distinct purple exhibition field.

### Primary
- **Pale Porcelain Blue** (`accent`): primary actions, selected titles, navigation feedback, factual labels, text selection and keyboard focus.
- **Muted Cobalt** (`cobalt`): secondary-action and icon-button hover backing, plus hovered and selected collection-image mats.

### Secondary
- **Muted Exhibition Purple** (`wine`): the retained full-width exhibition field. Its existing token name and value are unchanged.

### Neutral
- **Porcelain-Blue Canvas** (`paper`): page background and viewer toolbar fields. The legacy name does not imply a light surface.
- **Warm White** (`white`): lettering over film and dark bands, the wordmark and secondary actions; never a white canvas.
- **Reading White** (`ink`): primary body text.
- **Blue Gray** (`muted`): supporting prose and metadata.
- **Mineral Blue** (`mineral`): object displays, thumbnail mats, navigation states and native-select hover backing.
- **Deep Porcelain Blue** (`deep`): masthead, footer, viewer stage, native select and opaque image-control backing.

**The Quiet Accent Rule.** Pale blue marks actions, selection and keyboard focus against dark surfaces; it does not recolor the historical media.

Image mats, exhibition captions and media overlays retain their component-specific colors. Hero gradients support text legibility over contextual media, not object inspection.

## Typography

Bodoni Moda supplies Latin display lettering, with Noto Serif SC for Chinese headings. Hanken Grotesk handles Latin body text and controls; Chinese body text falls back to Microsoft YaHei and platform sans-serif. Other scripts use available glyphs in these stacks and platform fallbacks; local imports do not establish complete local coverage for Cyrillic, Japanese or every supported script. There is no language-driven font switch. The three variable families are imported locally through [styles.css](styles.css); font files and their accompanying licenses are unchanged.

### Hierarchy
- **Display:** shared page titles, reducing to (3.4rem) on phones. The homepage MOFER wordmark uses a separate identity scale (6rem, then 5rem, 4rem and 3.5rem at the narrower breakpoints).
- **Headline:** the shared section-heading baseline changes to (2.65rem) at widths up to (960px) and (2.35rem) up to (640px). Exhibition, introduction and Contact headings have local overrides, not separate global scales.
- **Title:** the sans-serif `h3` baseline. Featured-object titles instead use the display family at (1.75rem), then (1.5rem) on tablets and (1.65rem) in the single-column phone layout. Research, pathway and exhibition titles follow their own component roles.
- **Body:** the inherited reading baseline. Editorial components adjust leading, usually within (1.7 to 1.9); supporting statements, About prose and homepage pathways use limits such as (60ch), (68ch) and (48ch).
- **Label:** factual metadata below headings, with natural case and zero tracking.
- **Control / Navigation:** sans-serif action and route labels; actions carry the heavier weight.
- **Collection Title:** compact thumbnail titles, reducing to (.89rem) on phones. Home preview titles are larger than selector labels, without adopting the display scale.

The root is (16px). Type steps at explicit breakpoints rather than scaling with viewport width; letter spacing stays zero. Headings balance and wrap, while prose uses pretty wrapping.

**The Title First Rule.** Give headings and object names priority; place classification and exhibition status below them.

**The Context Before Count Rule.** Keep quantities, dates and location facts inside compact labelled notes, not oversized standalone statistics.

This revision records text allocation, not a new English story: retain full-copy summaries and substantive meaning while giving titles, paragraphs and metadata distinct positions. Preserve names, dates, counts, places, themes and collection identity in every language. [tests/fixtures/content.json](tests/fixtures/content.json) provides original-copy reference evidence, while [tests/fixtures/facts.json](tests/fixtures/facts.json) records independently protected facts. Native-language and curatorial approval questions belong in [docs/translation-review.md](docs/translation-review.md), not in public theme or interface copy; this design record does not certify that approval.

## Layout

The shared frame has a maximum width of (1320px), with two responsive side gutters. Full-width exhibition and footer bands align their content to that frame. Sections are open layouts or tonal fields, not floating cards.

| Viewport Width | Side Gutter | Masthead Minimum | Section Block Padding |
| --- | --- | --- | --- |
| Above 1200px | 48px | 84px | 64px |
| 961px to 1200px | 36px | 84px | 64px |
| 641px to 960px | 30px | 82px | 52px |
| 361px to 640px | 22px | 74px | 40px |
| Up to 360px | 18px | 74px | 40px |

Keep controls and metadata compact, with enough separation to scan images and their descriptions. The spacing entries capture recurring values, not a strict mathematical grid. The same masthead, footer, section frame and page-hero treatment connect Home, About, Collections, Exhibitions, Research and Contact; the homepage previews lead into dedicated pages rather than substituting for them.

- Featured objects use an image/detail split (1.45fr / .85fr), equal columns on tablets, then one on phones. The detail sits above the thumbnail grid.
- Collection selectors use four columns, then two on phones. Pathways use three, two and one across desktop, tablet and phone layouts.
- Home collection previews use three image-led links, then one column on phones. Each link includes an item query that selects the corresponding record on Collections.
- Exhibition photographs use four columns, then two from (960px), with contextual photographs in (4 / 3) frames. Research entries use two columns, then one on phones.
- Museum notes use a definition list: label and full contextual text, not a number display. The homepage pairs this list with introductory prose; About uses a three-column record row. Tablet notes form three columns and phone notes return to stacked rows with label/value tracks.
- Flexible tracks use `minmax(0, ...)` where content must shrink and wrap. The phone Contact layout specifically uses `minmax(0, 1fr)`, a (2rem) section heading and a shrinkable details column; long contact links wrap anywhere. This local long-language fix is not a global type-scaling rule.

The sticky masthead's anchor offset is its height plus (24px). Short-phone hero adjustments apply below (640px) wide and (740px) high without shrinking the whole page.

## Elevation & Depth

There are no box shadows. Dark tonal fields, spacing and fine raster grain provide depth. The viewer uses a deep-blue stage, porcelain-blue toolbar fields and a dark modal backdrop (`rgb(9 17 29 / 90%)`).

[assets/textures/archive-paper.png](assets/textures/archive-paper.png) comes from a blank margin of [assets/collections/pearl-buck-letter.jpg](assets/collections/pearl-buck-letter.jpg). [scripts/prepare-texture.mjs](scripts/prepare-texture.mjs) removes uneven local illumination, limits contrast and mirrors the crop into a repeating raster tile. CSS blends it with `soft-light` on the body, masthead, exhibition field and footer. It is derived paper grain, not an AI-generated historical artifact; the original letter image is unchanged.

The texture asset and its preparation are retained, not regenerated for the palette change.

**The Flat Gallery Rule.** Use tonal fields, subtle paper grain and spacing for depth; keep texture off original object photographs and avoid imitation bevels.

## Shapes

Media frames, icon controls and the native dialog are square; text-action buttons have a slight radius (2px). Components have no decorative borders or horizontal rules. Keyboard focus retains its pale-blue outline (3px) with an offset (5px).

Historical objects, documents and posters use containment. Image padding is small and component-specific: selectors use (4px), previews and pathways (5px), and featured objects (8px), reducing to (5px) on phones. Larger images come from the frame allocation and thinner mats, never destructive cropping. Contextual hero and exhibition photographs use cover; the inspection viewer always contains the full original image.

The image-expansion affordance is a warm-white Lucide icon (20px) on an opaque deep-blue square (36px). Generic icon buttons are (46px), reducing to (42px) on phones.

## Components

### Buttons

Primary actions use pale blue with deep-blue text, including over the film; hover lightens the blue. Secondary actions use warm-white text on translucent dark-blue backing, with muted-cobalt hover and no underline. Both have a directional arrow that moves (2px, -2px) over (180ms ease).

Minimum height is (50px). On phones, both variants use (46px) minimum height, (.83rem) text and (11px 16px) padding. Icon buttons use mineral-blue backing, muted-cobalt hover over (160ms ease) and disabled opacity (.3). Viewer and menu icons retain accessible names and native title tooltips. Supporting text links use pale blue, warm-white hover and the same directional icon without a filled button surface.

### Navigation And Language

The masthead is dark and textured. Route hover, focus and `aria-current="page"` use pale-blue text on mineral-blue backing; the current route also uses bold text. There are no underline indicators. The MOFER wordmark leads Home; the five navigation links lead directly to [about.html](about.html), [collections.html](collections.html), [exhibitions.html](exhibitions.html), [research.html](research.html) and [contact.html](contact.html). Legacy homepage anchors remain available, but are not substitutes for these page destinations.

At widths up to (1024px), a labelled toggle opens a full-width dark menu so long translated labels do not overlap the wordmark. Content-grid changes remain at (960px). Link activation, an outside click, Escape or returning to desktop closes it; Escape returns focus to the toggle. Without JavaScript, route links remain visible.

The language control is a native select with eight autonyms, no flags and no two-state toggle: English (`en`), 简体中文 (`zh-Hans`), Français (`fr`), 繁體中文 (`zh-Hant`), 日本語 (`ja`), Русский (`ru`), Deutsch (`de`) and Español (`es`). It uses reading-white text on deep blue, mineral-blue hover, a (44px) minimum height and a (132px) maximum width. On phones its maximum width is (103px) and the adjacent language icon is hidden. Native option rendering remains platform-controlled.

All six pages start with English HTML fallback. The script loads English first, then restores a supported explicit choice from `localStorage` under `mofer-language`; an unavailable storage API leaves the control usable without persistence. Locale packs provide shared strings and eight collection records. Switching updates document language and title, metadata, page copy, image descriptions, accessible control names and collection content. The select is temporarily disabled during loading; a failed switch retains the current content and exposes a status message with a localized retry button. An initial English-load failure can also be retried without reloading.

### Home Preview And Museum Notes

Each home preview is a real link with a contained original image, the complete object title and smaller type metadata. Its image frame is (280px), becomes (205px) on tablets, then returns to (280px) in the single-column phone layout. Hover changes the title to pale blue; keyboard focus remains visible. These are individual image-led items, not nested section cards.

Museum notes use a semantic definition list. Labels are restrained pale-blue sans-serif text; supporting facts are muted and readable. The first-exhibition quantity, collection period and Canadian base remain in their complete context. There is no giant-number or statistic-card component.

### Collection Selector And Detail

Each native thumbnail button shows a contained image, its title, then type metadata. Hover and selection change the image mat to muted cobalt; selection adds a pale-blue title and checkmark alongside `aria-pressed`. No line carries the selected state.

Selection updates the live detail region and scrolls it into view, instantly under reduced motion. Language switching preserves the selected record and focused thumbnail. The mineral-blue detail field presents the title, type, full summary, date and place without nested cards; summaries are not repeated visibly in thumbnails. The featured image is (440px) high, then (360px) on tablets and (295px) on phones, with containment throughout.

### Image Inspection

An opaque expansion control opens a native modal dialog. Trigger-image hover reduces opacity to (.92) over (220ms ease). The viewer contains the full image, locks background scrolling, closes with Escape and returns focus to the opening control.

Previous/next controls and arrow keys cycle within the image group; single-image groups disable those buttons. The featured group contains the eight collection records; pathway and exhibition grids have their own groups. Zoom uses (200%) image dimensions in a scrollable stage and resets when the image changes. Captions and a tabular counter remain visible. If a pending language change completes while the viewer is open, its caption and image description update without changing the selected item, zoom or scroll position.

### Film And Motion

The original film is muted, inline and looping, with `defaultPlaybackRate` and `playbackRate` set to (0.25). There is no on-page play/pause button or native control bar. It requests continuous playback regardless of motion preference, as explicitly required for this film; browser autoplay policy may leave a still image. When playback is unavailable, hero text settles at full opacity instead of freezing its entrance animation.

Reduced-motion CSS removes decorative animation and transitions and makes scrolling immediate, but does not hide or pause the film. The homepage content has one entrance (850ms, `cubic-bezier(.16, 1, .3, 1)`), only from (961px) with no reduced-motion preference.

### Fields And Other Patterns

The native language select is the implemented input control; there are no text-entry forms, search fields, filter chips or ticketing controls. The sidecar contains nine self-contained previews using original imagery, scoped CSS and inline Lucide paths. They record appearance and CSS states, not the runtime language, menu, collection-selection or dialog logic.

Upcoming-exhibition and poster presentation remains brainstorming only in the [revision plan](docs/superpowers/plans/2026-09-19-porcelain-blue-multilingual.md). No proposed poster layout, promotion, event, placeholder or generated imagery is part of this recorded system.

## Do's and Don'ts

### Do:
- Do keep original object images fully visible and free of texture overlays.
- Do place names and headings before type and status metadata.
- Do use compact responsive spacing and let all eight languages wrap naturally.
- Do retain full contextual facts and original meaning while improving text allocation.
- Do keep the native language select and explicit preference persistence across dedicated pages.
- Do retain visible focus, labelled controls, dialog focus return and motion-preference fallbacks.
- Do use the existing local fonts, Lucide icons and historical media.

### Don't:
- Don't add white canvases, decorative dividing lines or above-title kickers.
- Don't turn sections into floating cards or add bevels, offset shadows or pill controls.
- Don't replace contextual museum notes with giant standalone numbers or crop documents to fill frames.
- Don't add visible film playback controls or promise autoplay when the browser blocks it.
- Don't hide or pause the requested film for reduced motion; remove decorative UI animation instead.
- Don't invent historical evidence, visitor services or approval and rights claims.
- Don't publish upcoming-exhibition placeholders or treat a future poster proposal as a shipped pattern.
- Don't use wordmark-sized type in compact controls or scale fonts with viewport width.
- Don't replace Lucide icons with glyphs or treat sidecar tonal ramps as site colors.