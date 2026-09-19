# MOFER Product Context

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Purpose

MOFER, the Museum of Far East Remembrance, is a Canadian museum initiative collecting, preserving, digitizing, researching, and exhibiting original historical materials from the Far East. The website introduces the collection, documents the 2025 Boynton House exhibition, and connects visitors with research and collaboration opportunities.

## Users

The existing content addresses visitors, researchers, educators, museums, archives, universities, community organizations, and volunteers.

Working assumption for the September 18 redesign: general visitors exploring the artifacts should lead the homepage hierarchy; research and partnership information remains accessible. The user delegated decisions when asked and will review the result later.

## Capabilities and Constraints

- Preserve the substantive museum content, eight featured collection records, six collection themes, exhibition facts and captions, research activities, contact details, and external press links across all supported languages.
- Keep the original routes and legacy homepage anchors working. All main navigation items now lead to dedicated About, Collections, Exhibitions, Research & Education, and Contact pages.
- Use the original recovered photography and video, not invented or generated historical evidence.
- Improve visual design, navigation, responsive behavior, and accessibility without adding a backend, fabricated exhibits, visitor hours, ticketing, donations, or a new collection database.
- Keep the static HTML/CSS/JavaScript stack and Cloudflare Workers Static Assets deployment. Build: `npm run build`. Deploy: `npx wrangler deploy`.
- English is the default for a fresh visit. Provide English, 简体中文, Français, 繁體中文, 日本語, Русский, Deutsch, and Español, retaining an explicitly selected language across pages and reloads.
- Upcoming exhibitions and poster/marketing presentation are planning-only until the owner supplies approved content. Do not add placeholders, fabricated events, dates, or promotional images.

## Brand Commitments

Preserve MOFER's name and its identity as the Museum of Far East Remembrance. Reference sites inform hierarchy and image presentation, not branding or content to copy: https://loewentheilcollection.com/, https://www.rom.on.ca/, https://ago.ca/, and https://www.moma.org/.

The user's latest direction retains the paper texture and muted purple exhibition area but replaces green with a porcelain-blue palette. Avoid white canvases, decorative dividing lines, and oversized standalone statistics. Use readable contextual facts, aligned text groups, and images that make good use of their frames without cropping historical documents. The film should play continuously at one quarter of normal speed without an on-page start/stop button. Reduced-motion settings must not hide or pause this requested film; they still disable decorative interface animation. A still fallback remains for browsers that block autoplay.

The user requests natural, concise language and high-quality translations, while focusing this revision on text placement rather than changing content. Historical names, dates, counts, places, exhibition themes, collection identity, and substantive meaning must survive. Original prose is reference evidence, not wording that must remain verbatim. Source ambiguities are recorded in `docs/translation-review.md` for owner confirmation.

## Evidence on Hand

- Six public pages and a localized not-found page, with eight local language packs in `assets/i18n/` and shared interactions in `script.js`.
- Original collection photography in `assets/collections/` and `assets/collections/extended/`.
- Original Boynton House exhibition photography in `assets/exhibitions/`.
- Original video and poster in `assets/video/`.
- Recovery provenance in `recovery/manifest.json` and restoration baseline in Git history.
- Original-copy and collection-metadata fixtures, plus independently recorded historical details for the editorial pass.
- Playwright tests for all eight languages, source facts, dedicated navigation, saved language choice, translation-load failures, collection selection, slow video, responsive widths, and Workers routing.

## Product Principles

- Let original objects and their historical context carry the experience.
- Improve presentation without rewriting historical claims or inventing services.
- Make collection exploration useful on phones and with keyboard input.
- Keep editorial decisions and deployment instructions explicit and maintainable.

## Accessibility and Inclusion

Maintain multilingual access, readable text, visible keyboard focus, reduced-motion support for decorative UI, labelled controls, and layouts without text or control overlap. These are implementation quality requirements, not claims of an independent accessibility certification.