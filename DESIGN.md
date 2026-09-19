---
name: MOFER
description: A dark, textured bilingual museum built around original historical material.
colors:
  paper: "#1b211d"
  white: "#f2ecdf"
  ink: "#eee8db"
  muted: "#b9c0b2"
  forest: "#303b2e"
  mineral: "#29332a"
  accent: "#d5bd86"
  wine: "#3d2d34"
  deep: "#121914"
typography:
  display:
    fontFamily: '"Bodoni Moda Variable", "Noto Serif SC Variable", serif'
    fontSize: "5rem"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "0"
  headline:
    fontFamily: '"Bodoni Moda Variable", "Noto Serif SC Variable", serif'
    fontSize: "2.85rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0"
  title:
    fontFamily: '"Bodoni Moda Variable", "Noto Serif SC Variable", serif'
    fontSize: "1.9rem"
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
    fontSize: ".91rem"
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
    backgroundColor: "#e7d4a7"
  button-secondary:
    backgroundColor: "rgb(18 25 20 / 72%)"
    textColor: "{colors.white}"
    typography: "{typography.control}"
    rounded: "{rounded.button}"
    padding: "12px 21px"
  button-secondary-hover:
    backgroundColor: "{colors.forest}"
  icon-button:
    backgroundColor: "{colors.mineral}"
    textColor: "inherit"
    rounded: "{rounded.square}"
    padding: "0"
    width: "46px"
    height: "46px"
  icon-button-hover:
    backgroundColor: "{colors.forest}"
  primary-navigation:
    textColor: "{colors.ink}"
    typography: "{typography.navigation}"
  primary-navigation-current:
    backgroundColor: "{colors.mineral}"
    textColor: "{colors.accent}"
  collection-card:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "0 0 8px"
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

MOFER's original photographs, documents and film lead a quiet, dark museum site. Charcoal and olive surfaces fit the film's palette; muted wine distinguishes exhibitions and brass marks actions. Subtle paper grain adds texture to the surrounding interface.

Display serifs, compact sans-serif controls and efficient spacing support reading in Chinese and English. ROM, AGO and MoMA inform hierarchy and image presentation, with less visual flourish than AGO. Tonal fields and spacing separate content without white canvases or decorative dividing lines.

**Key Characteristics:**
- Dark tonal fields with subtle raster paper grain.
- Original object images remain contained and untextured.
- Compact, title-first layouts with visible keyboard focus.
- Chinese-first bilingual pages and quarter-speed ambient film.

The frontmatter records the normative tokens from [styles.css](styles.css). [script.js](script.js) owns interaction behavior; [PRODUCT.md](PRODUCT.md) records product commitments. [.impeccable/design.json](.impeccable/design.json) adds metadata and component previews. Its generated tonal ramps are swatch aids, not additional site colors.

## Colors

Warm lettering and brass actions sit against charcoal, olive and muted wine.

### Primary
- **Brass** (`accent`): primary actions, selected titles, navigation feedback, metadata, text selection and keyboard focus.

### Secondary
- **Muted Wine** (`wine`): the full-width exhibition field.

### Neutral
- **Charcoal Canvas** (`paper`): page background and viewer toolbar fields. The legacy name does not imply a light surface.
- **Warm White** (`white`): lettering over film and dark bands, the wordmark and secondary actions; never a white canvas.
- **Reading Ivory** (`ink`): primary body text.
- **Sage Gray** (`muted`): supporting prose and metadata.
- **Olive** (`forest`): secondary-action, icon-button and language-button hover backing.
- **Mineral** (`mineral`): object displays, thumbnail mats and navigation/control states.
- **Deep Green** (`deep`): masthead, footer, viewer stage and opaque image-control backing.

**The Quiet Accent Rule.** Brass marks actions, selection and keyboard focus against dark surfaces; it does not recolor the historical media.

Image mats, exhibition captions and media overlays retain their component-specific colors. Hero gradients support text legibility over contextual media, not object inspection.

## Typography

Bodoni Moda supplies Latin display lettering, with Noto Serif SC for Chinese headings. Hanken Grotesk handles Latin body text and controls; Chinese body text falls back to Microsoft YaHei and platform sans-serif. There is no language-driven font switch. The three variable fonts are locally loaded through [styles.css](styles.css).

### Hierarchy
- **Display:** shared page titles, reducing to (3.4rem) on phones. The homepage MOFER wordmark uses a separate identity scale (6rem, then 5rem, 4rem and 3.5rem at the narrower breakpoints).
- **Headline:** section headings, reducing to (2.65rem) at widths up to (960px) and (2.35rem) up to (640px). Exhibition and introduction headings have local overrides.
- **Title:** featured-object headings, reducing to (1.5rem) on tablets, then (1.65rem) in the single-column phone layout. This is not a universal `h3` style.
- **Body:** the inherited reading baseline. Editorial components adjust leading, usually within (1.7 to 1.9), and constrain paragraph widths in pixels.
- **Label:** factual metadata below headings, with natural case and zero tracking.
- **Control / Navigation:** sans-serif action and route labels; actions carry the heavier weight.
- **Collection Title:** compact thumbnail titles, reducing to (.83rem) on phones.

The root is (16px). Type steps at explicit breakpoints rather than scaling with viewport width; letter spacing stays zero. Headings balance and wrap, while prose uses pretty wrapping.

**The Title First Rule.** Give headings and object names priority; place classification and exhibition status below them.

Use concise, natural prose throughout both languages, including summaries, captions and UI labels. Preserve names, dates, counts, places, themes and exact collection metadata; summary wording may change. [tests/fixtures/content.json](tests/fixtures/content.json) provides original-copy reference evidence, while [tests/fixtures/facts.json](tests/fixtures/facts.json) records independently protected facts.

## Layout

The shared frame has a maximum width of (1320px), with two responsive side gutters. Full-width exhibition and footer bands align their content to that frame. Sections are open layouts or tonal fields, not floating cards.

| Viewport Width | Side Gutter | Masthead Minimum | Section Block Padding |
| --- | --- | --- | --- |
| Above 1200px | 48px | 84px | 64px |
| 961px to 1200px | 36px | 84px | 64px |
| 641px to 960px | 30px | 82px | 52px |
| 361px to 640px | 22px | 74px | 40px |
| Up to 360px | 18px | 74px | 40px |

Keep controls and metadata compact, with enough separation to scan images and their descriptions. The spacing entries capture recurring values, not a strict mathematical grid.

- Featured objects use an image/detail split (1.35fr / .85fr), equal columns on tablets, then one on phones. The detail sits above the thumbnail grid.
- Collection selectors use four columns, then two on phones. Pathways use three, two and one across desktop, tablet and phone layouts.
- Exhibition photographs use four columns, then two from (960px), with contextual photographs in (4 / 3) frames. Research entries use two columns, then one on phones.
- Introductory facts use content-aware value widths; tablet facts form three columns, then stack on phones. Flexible tracks let bilingual text wrap without overlap.

The sticky masthead's anchor offset is its height plus (24px). Short-phone hero adjustments apply below (640px) wide and (740px) high without shrinking the whole page.

## Elevation & Depth

There are no box shadows. Dark tonal fields, spacing and fine raster grain provide depth. The viewer uses a deep-green stage, charcoal toolbar fields and a dark modal backdrop (`rgb(11 19 15 / 90%)`).

[assets/textures/archive-paper.png](assets/textures/archive-paper.png) comes from a blank margin of [assets/collections/pearl-buck-letter.jpg](assets/collections/pearl-buck-letter.jpg). [scripts/prepare-texture.mjs](scripts/prepare-texture.mjs) removes uneven local illumination, limits contrast and mirrors the crop into a repeating raster tile. CSS blends it with `soft-light` on the body, masthead, exhibition field and footer. It is derived paper grain, not an AI-generated historical artifact; the original letter image is unchanged.

**The Flat Gallery Rule.** Use tonal fields, subtle paper grain and spacing for depth; keep texture off original object photographs and avoid imitation bevels.

## Shapes

Media frames, icon controls and the native dialog are square; text-action buttons have a slight radius (2px). Components have no decorative borders or horizontal rules. Keyboard focus retains its brass outline (3px) with an offset (5px).

Object photographs use containment. Contextual exhibition photography can fill its frame. The image-expansion affordance is a warm-white Lucide icon (20px) on an opaque deep-green square (36px). Generic icon buttons are (46px), reducing to (42px) on phones.

## Components

### Buttons

Primary actions use brass with deep-green text, including over the film; hover lightens the brass. Secondary actions use warm-white text on translucent dark backing, with olive hover and no underline. Both have a directional arrow that moves (2px, -2px) over (180ms ease).

Minimum height is (50px). On phones, both variants use (46px) minimum height, (.83rem) text and (11px 16px) padding. Icon buttons use mineral backing, olive hover over (160ms ease) and disabled opacity (.3). Viewer and menu icons retain accessible names and native title tooltips.

### Navigation And Language

The masthead is dark and textured. Route hover, focus and `aria-current="page"` use brass text on mineral backing; the current route also uses bold text. There are no underline indicators.

At widths up to (960px), a labelled toggle opens a full-width dark menu. Link activation, an outside click, Escape or returning to desktop closes it; Escape returns focus to the toggle. Without JavaScript, route links remain visible.

The language button uses brass text on mineral backing with olive hover. Chinese-first pages offer `EN`, then a Chinese label after switching. The switch updates document language, copy, control names and collection data in place; language choice resets on navigation or reload. Preserve the three public routes and their section anchors.

### Collection Selector And Detail

Each native thumbnail button shows a contained image, its title, then type metadata. Hover and selection brighten the image mat; selection adds a brass title and checkmark alongside `aria-pressed`. No line carries the selected state.

Selection updates the live detail region and scrolls it into view, instantly under reduced motion. Language switching preserves the selected record and focused thumbnail. The mineral detail field presents the title, type, summary, date and place without nested cards; summaries are not repeated visibly in thumbnails.

### Image Inspection

An opaque expansion control opens a native modal dialog. Trigger-image hover reduces opacity to (.92) over (220ms ease). The viewer contains the full image, locks background scrolling, closes with Escape and returns focus to the opening control.

Previous/next controls and arrow keys cycle within the image group; single-image groups disable those buttons. The featured group contains the eight collection records; pathway and exhibition grids have their own groups. Zoom uses (200%) image dimensions in a scrollable stage and resets when the image changes. Captions and a tabular counter remain visible.

### Film And Motion

The original film is muted, inline and looping, with `defaultPlaybackRate` and `playbackRate` set to (0.25). There is no on-page play/pause button or native control bar. It requests continuous playback regardless of motion preference, as explicitly required for this film; browser autoplay policy may leave a still image. When playback is unavailable, hero text settles at full opacity instead of freezing its entrance animation.

Reduced-motion CSS removes decorative animation and transitions and makes scrolling immediate, but does not hide or pause the film. The homepage content has one entrance (850ms, `cubic-bezier(.16, 1, .3, 1)`), only from (961px) with no reduced-motion preference.

### Fields And Other Patterns

There are no implemented form inputs, search fields, filter chips or ticketing controls. Sidecar snippets show component appearances and CSS states; they do not implement menu, language, selection or dialog behavior.

## Do's and Don'ts

### Do:
- Do keep original object images fully visible and free of texture overlays.
- Do place names and headings before type and status metadata.
- Do use compact responsive spacing and let both languages wrap naturally.
- Do preserve substantive bilingual facts while editing prose for clarity.
- Do retain visible focus, labelled controls, dialog focus return and motion-preference fallbacks.
- Do use the existing local fonts, Lucide icons and historical media.

### Don't:
- Don't add white canvases, decorative dividing lines or above-title kickers.
- Don't turn sections into floating cards or add bevels, offset shadows or pill controls.
- Don't add visible film playback controls or promise playback despite browser and motion preferences.
- Don't invent historical evidence, visitor services or approval and rights claims.
- Don't use wordmark-sized type in compact controls or scale fonts with viewport width.
- Don't replace Lucide icons with glyphs or treat sidecar tonal ramps as site colors.