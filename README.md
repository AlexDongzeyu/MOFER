# MOFER

The Museum of Far East Remembrance website, recovered on September 17, 2026 and redesigned on September 18. It presents the museum's original collections and exhibition history in Chinese and English, with concise copy, dark archival surfaces, and a slow historical film.

The three public pages, shared CSS/JavaScript, both language dictionaries, collection records, 21 collection/exhibition images, hero poster, and hero video are stored locally. The original frontend requires no API, database, framework, or runtime CDN.

[PRODUCT.md](PRODUCT.md) records the content and product constraints. [DESIGN.md](DESIGN.md) documents the implemented museum visual system, with machine-readable component metadata in [.impeccable/design.json](.impeccable/design.json).

## Local Preview

Use Node.js 22 or newer:

```sh
npm ci
npm run dev
```

Open <http://127.0.0.1:4173>. The preview serves the production files in `dist/`. After editing source files, run `npm run build` to refresh that directory. If the default port is occupied, build first and use `npx http-server dist -a 127.0.0.1 -p 4180 -c-1`.

On Windows, use `npm.cmd` and `npx.cmd` if PowerShell blocks the corresponding `.ps1` commands.

## Deploy on Cloudflare Workers

This repository uses **Workers Static Assets**, compatible with the `npx wrangler deploy` command in Cloudflare Workers Builds. It serves the static site directly; no Worker script, API, or database is required.

In Cloudflare, create or open a Worker connected to [AlexDongzeyu/MOFER](https://github.com/AlexDongzeyu/MOFER) and use these build settings. If the Worker is already connected, keep the commands below and retry deployment using the latest commit.

| Setting | Value |
| --- | --- |
| Worker name | `mofer` (must match `name` in [wrangler.jsonc](wrangler.jsonc)) |
| Production branch | `main` |
| Root directory | Leave blank (repository root) |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Node.js version | `22` (also set in [.nvmrc](.nvmrc)) |

No application secrets or Cloudflare bindings are needed. Cloudflare's connected build supplies deployment authentication; local build, dry-run, and test commands do not publish anything or require login.

[wrangler.jsonc](wrangler.jsonc) declares `assets.directory` as `./dist`. The build copies only the website into that directory, excluding recovery records, tests, dependencies, Git files, and developer documentation. It retains the 25 MiB per-file size check. No network access to the original site is needed during a build or normal operation.

Workers' default HTML handling canonicalizes `.html` URLs to extensionless URLs. The original links remain valid, including cross-page fragment links. `assets.not_found_handling` is explicitly set to `404-page`, using the top-level [404.html](404.html) for missing routes. Do not add a catch-all SPA rewrite.

The earlier Pages-only `pages_build_output_dir` setting is not compatible with `wrangler deploy`: it caused the reported "Missing entry-point to Worker script or to assets directory" error. Keep the Workers configuration and deploy command together.

To validate deployment configuration and test Workers routing and headers locally without deploying:

```sh
npm run build
npm run check:deploy
npm run preview:cloudflare
```

Open <http://127.0.0.1:4174>. To use a different free port, run `npx wrangler dev --local --ip 127.0.0.1 --port 4181` directly. Connecting a custom domain and changing DNS are separate owner-managed steps after checking the deployment.

## Editing the Website

| File | Responsibility |
| --- | --- |
| [index.html](index.html) | Homepage, About, collection preview, exhibition, research, and contact sections |
| [collections.html](collections.html) | Featured collection selector and additional collection themes |
| [exhibitions.html](exhibitions.html) | Exhibition history, gallery, press coverage, and contact |
| [styles.css](styles.css) | Museum design tokens, local typography, gallery layouts, responsive breakpoints, and image-viewer presentation |
| [script.js](script.js) | Bilingual copy, collection records, navigation menu, collection selection, full-image viewer, and ambient video playback |
| [404.html](404.html) | Not-found page using the museum design |
| [_headers](_headers) | Cloudflare response headers |

Images and video are in `assets/` at their original relative paths. To edit copy, update both `zh` and `en` values in `translations`, then run `node scripts/sync-copy.mjs` to synchronize the Chinese HTML fallback without reformatting the markup. Collection titles, dates, places, images, and summaries live in `collectionItems`; verify historical details before changing them.

The language switch applies to the current page and resets to Chinese on navigation/reload. Navigation collapses to a keyboard-accessible menu on tablet and mobile. The hero film is muted, loops automatically at `0.25` playback speed, and has no on-page playback control. As requested, the film remains visible and playing even when reduced motion is enabled; that preference still disables decorative animation and smooth scrolling. Browsers that block autoplay retain the still-image fallback.

Collection photographs, documents, themes, and exhibition photographs open in a full-resolution viewer with previous/next, zoom, Escape, and focus return. Selecting a collection thumbnail brings its detail into view without discarding keyboard focus. A searchable collection database is still a future project described in the museum's copy, not a new feature claimed by this redesign.

Typography is self-hosted under `assets/fonts/`: Bodoni Moda, Hanken Grotesk, and Noto Serif SC from their pinned Fontsource packages, with the original font licenses. Lucide SVG icons and their license are under `assets/icons/`. No fonts or icons are requested from an external CDN. Existing photography and video remain at their original paths.

The background texture in `assets/textures/archive-paper.png` comes from a blank margin of the Pearl S. Buck letter, not a generated historical artifact. `node scripts/prepare-texture.mjs` reproduces the muted, mirrored raster tile. The document image itself is unchanged. Charcoal, olive, brass, and a muted wine exhibition band replace white surfaces; spacing and tonal changes replace decorative rules.

## Verification

```sh
npx playwright install chromium
npm run build
npm run check:deploy
npm test
```

The functional suite runs against Cloudflare's local Workers Static Assets runtime, with external browser requests blocked. It covers all three pages in Chinese and English at desktop, wide desktop, tablet, and mobile sizes, plus 320-pixel overflow and short-screen hero checks; historical facts; collection selection and focus; the mobile menu; the image viewer; quarter-speed looping and reduced motion; Chinese fallback text; base-color contrast; local navigation; headers; and 404s. It starts and stops its own test server on port 4175. Set `TEST_PORT` to another free port if necessary.

GitHub Actions runs the build, deployment dry run, and functional suite on pushes and pull requests. Test screenshots and failure traces remain local or in CI artifacts, not in the deployed site.

### Content and Visual Verification

Before the redesign, all 28 recovered files were independently checked against the original source hashes. That version remains in Git history. The current HTML, CSS, and JavaScript intentionally differ: the user authorized both a visual redesign and an editorial pass. The original historical media and collection metadata remain unchanged.

[tests/fixtures/content.json](tests/fixtures/content.json) retains all 73 original entries per language, eight collection records, and each page's content keys as reference evidence. Tests keep collection metadata exact and require every original content field to render. [tests/fixtures/facts.json](tests/fixtures/facts.json) independently protects historical names, dates, counts, places, themes, and other details while allowing the requested prose changes. These checks support, rather than replace, editorial review.

The render tests save first-viewport screenshots and full-page desktop/mobile captures in `test-results/`, including legible homepage-section captures. Those files and prior recovery/reference captures are excluded from deployment and Git. The current design is intentionally not a pixel-identical copy of the recovered site or of the Loewentheil reference.

Current test results and screenshots are written to `test-results/`. The site has not been formally certified for accessibility, and a local test pass is not a claim of completed production deployment.

The final September 18 revision passed 92 browser checks with no failures, errors, or skips, plus the Workers deployment dry run. The editorial review found no material change to historical meaning, and the visual finish review returned `ship` after the blocked-autoplay fallback was corrected. All 23 original image/video assets still match their recovery hashes.

## Recovery Record

[recovery/manifest.json](recovery/manifest.json) records the original URLs, source sizes, hashes, capture time, and discovered page inventory for 28 recovered files. These hashes describe the recovery baseline; ordinary builds do not prevent intentional future edits.

[scripts/recover.mjs](scripts/recover.mjs) can re-fetch public source with `npm run recover`. It refuses to overwrite a local file whose contents differ, so it must not be used as a routine build or update command. No credentials are needed.

Published HTML, CSS, JavaScript, and media were recoverable. The owner's lost Git history, unpublished files, original development tooling, and any private systems are not recovered by downloading the public site. The added tooling, 404 page, headers, and deployment setup are new. External press, email, and telephone links intentionally retain their original destinations.