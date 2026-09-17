# MOFER

The Museum of Far East Remembrance website, recovered from the published site for an owner-authorized restoration on September 17, 2026. This is the existing design, not a redesign.

The three public pages, shared CSS/JavaScript, both language dictionaries, collection records, 21 collection/exhibition images, hero poster, and hero video are stored locally. The original frontend requires no API, database, framework, or runtime CDN.

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
| [styles.css](styles.css) | Original colors, fonts, layout, image crops, and responsive breakpoints |
| [script.js](script.js) | `translations`, `collectionItems`, language switching, collection selection, video controls, and header scrolling |
| [404.html](404.html) | Added not-found page using the existing styles |
| [_headers](_headers) | Cloudflare response headers |

Images and video are in `assets/` at their original relative paths. To change translated copy, update both `zh` and `en` values in `translations`, plus the HTML fallback text where applicable. Update collection titles, dates, places, images, and summaries together in `collectionItems`.

The original language switch applies to the current page and resets to Chinese on navigation/reload. The mobile navigation and visibility of the motion button also retain the original responsive behavior. A searchable collection database is described as a future project in the source; it is not an existing feature of this restoration.

One inherited layout issue is intentionally unchanged: at 390 x 844 in English, the homepage's bottom topic strip overlaps the secondary hero action. The main navigation still reaches Exhibitions. Address this in the redesign phase rather than changing the restoration baseline.

## Verification

```sh
npx playwright install chromium
npm run build
npm run check:deploy
npm test
```

The functional suite runs against Cloudflare's local Workers Static Assets runtime, with external browser requests blocked. It covers all three pages in Chinese and English at desktop, wide desktop, tablet, and mobile sizes, plus 320-pixel overflow checks; collection selection; keyboard language activation; video playback; local navigation/anchors; contact links; canonical routes; security headers; and 404s. It starts and stops its own test server on port 4175. Set `TEST_PORT` to another free port if necessary.

GitHub Actions runs the build, deployment dry run, and functional suite on pushes and pull requests. Test screenshots and failure traces remain local or in CI artifacts, not in the deployed site.

### Restoration Evidence and Limits

All 28 recovered files were independently checked against the hashes recorded from the published source. The three pages, stylesheet, interaction script, images, and video remain byte-identical. The Cloudflare functional suite passed all 60 checks; the six mobile render checks also passed at 320 pixels.

An initial independent visual comparison used 48 live/local screenshots across the same 24 page/language/viewport combinations. Forty-three matched at zero pixel tolerance; five had differences confined to asynchronously painted collection thumbnails. Further full-capture attempts encountered live image/video readiness timeouts. A complete pixel-match result is therefore **not claimed**. The experimental comparison tool is not part of the published commands.

Captured screenshots, comparison evidence, and the experimental tool are retained locally under `recovery/reference/`, outside Git and deployment. For later redesign work, capture a new baseline directly from the live site, wait for image decoding, and compare the same video frame, browser, operating system, and viewport. Matching source does not eliminate platform-specific font rendering differences.

## Recovery Record

[recovery/manifest.json](recovery/manifest.json) records the original URLs, source sizes, hashes, capture time, and discovered page inventory for 28 recovered files. These hashes describe the recovery baseline; ordinary builds do not prevent intentional future edits.

[scripts/recover.mjs](scripts/recover.mjs) can re-fetch public source with `npm run recover`. It refuses to overwrite a local file whose contents differ, so it must not be used as a routine build or update command. No credentials are needed.

Published HTML, CSS, JavaScript, and media were recoverable. The owner's lost Git history, unpublished files, original development tooling, and any private systems are not recovered by downloading the public site. The added tooling, 404 page, headers, and deployment setup are new. External press, email, and telephone links intentionally retain their original destinations.