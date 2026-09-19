# Porcelain Blue and Multilingual Museum Plan

**Goal:** Improve the museum's typography, image scale and navigation while adding eight complete language choices with English as the default.

**Architecture:** Keep static HTML/CSS/JavaScript and Workers Static Assets. Each main navigation destination has its own HTML page. Local JSON language packs carry all public text and translated collection descriptions; a native select retains the chosen language across pages. Original historical media and quarter-speed playback remain unchanged.

## Decisions

- The user delegated the navigation decision when asked. Use Home, About, Collections, Exhibitions, Research & Education, and Contact, with a shorter homepage linking into the dedicated pages.
- Use deep porcelain blue and blue-gray in place of green, retain the muted purple exhibition field, and keep the existing paper texture. Use warm light text and restrained porcelain-blue accents, not white backgrounds or decorative rules.
- Replace the oversized `100+`, `1860s+`, and `CA` row with contextual facts in readable text. Do not change their meaning.
- Enlarge collection imagery by reducing mat padding and choosing sensible image proportions. Keep the entire document, poster, or photograph visible in the full-image viewer.
- English is the default on a fresh visit. Choices are English, 简体中文, Français, 繁體中文, 日本語, Русский, Deutsch, and Español. A saved explicit choice survives navigation and reload.
- Translate visible content, collection fields, image descriptions, titles, and accessible control names. Preserve names, dates, quantities, historical qualifications, and the future status of the digital catalogue.
- Keep the muted quarter-speed film continuously playing, with no playback button. Reduced-motion preferences still remove decorative UI animation, but must not hide or pause this film.
- Do not publish any upcoming-exhibition poster, date, title, marketing copy, or placeholder. Record a presentation proposal separately for later owner-supplied content.
- Complete the design revision locally for review. Publication to GitHub and the connected Cloudflare Worker was authorized in a separate follow-up on September 19, 2026.

## Implementation

- [x] Add failing tests for English default, the complete language menu, preference persistence, and dedicated navigation destinations.
- [x] Extract the current English/Simplified Chinese content into local language packs and define a single complete translation contract.
- [x] Add French/Spanish, Traditional Chinese/Japanese, and German/Russian translations as independent bounded tasks. Review shared historical facts and terminology afterward.
- [x] Implement language loading, localized text/attributes/collection fields, native language selection, and persistence with English fallback on a failed or invalid selection.
- [x] Add dedicated About, Research & Education, and Contact pages using the existing museum content. Align every navigation bar and build output with the six-page structure.
- [x] Apply the blue/purple palette, compact contextual facts, improved paragraph widths and alignment, and larger artifact images.
- [x] Retain and adapt existing factual, video, keyboard, image-viewer, contrast, and Workers route checks. Add a complete locale/page matrix and persistence/error checks.
- [x] Inspect desktop/mobile screenshots across representative long-script and CJK translations, apply material corrections, and confirm the results.
- [x] Update PRODUCT.md, DESIGN.md, its sidecar and README from the implemented result. Preserve the existing live preview for review.

## Initial Checks

```sh
npm test -- --project=desktop --grep "English-first|dedicated destinations"
npm run build
npm test
npm run check:deploy
```

The first check must initially fail against the Chinese-first two-language header and mixed page/anchor navigation. Translation completeness must compare every locale's keys and eight collection records with the canonical English pack, and behavioral tests must inspect rendered text rather than only JSON structure.

## Verification Outcome

- The full 108-test browser suite passed with zero failures, errors or skips. Each public page was exercised in all eight languages at four viewport sizes, with additional 320px overflow checks.
- After the final semantic-only homepage correction, all four homepage render tests passed again, including computed screen-reader region names in all eight languages. The region now derives its name from translated headings.
- Red-green checks cover initial translation-load recovery, delayed viewer-caption translation with preserved zoom and scroll, and long navigation labels at 961, 1024, 1025, 1120 and 1200 pixels. The Russian phone Contact overflow was also corrected and verified.
- The layout detector returned no findings. Independent visual review ended with `disposition: ship`; the sole final accessibility finding was resolved and confirmed. Translation review scope and the historical institution-name question remain in `docs/translation-review.md`.
- Build, Cloudflare deployment dry run, editor diagnostics and Git whitespace checks passed. No historical media was changed.
- The actual preview at http://127.0.0.1:4173/ was verified English-first with eight options and visible, advancing, muted, looping video at 0.25 speed even with reduced motion enabled.
- The implementation handoff was local and uncommitted; publication was authorized separately afterward.

## Future Exhibition Proposal (Planning Only)

Recommend a poster-led feature immediately below the homepage film once approved material arrives, plus a dedicated exhibition detail page. Display a portrait poster at its natural ratio, never stretched into a landscape banner. Keep title, dates, venue and a short description adjacent on desktop and below it on phones. A secondary photographic sequence can follow the poster, with captions and an accessible full-image viewer.

Avoid autoplay carousels, invented "coming soon" copy, empty booking buttons, and image text that is repeated as inaccessible background decoration. If several exhibitions are active, show one lead exhibition and a clear archive list rather than competing hero banners. Ask the owner for the final poster, an uncropped high-resolution master, approved translations, dates, venue/access information, alt text context, credits, and the actual action visitors can take. Nothing from this proposal is added to the public site yet.