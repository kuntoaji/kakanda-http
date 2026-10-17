# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Requires Node.js 22 or later. There is no linter.

- `npm install`: install React, esbuild and Playwright
- `npx playwright install chromium`: download the browser for the e2e tests (once)
- `npm run build`: bundle `modules/` and React into `build/kakanda-http.js`
- `npm run watch`: rebuild on every change
- `npm test`: run the unit tests in `test/` with `node --test`
- `node --test --test-name-pattern="matches by code" "test/**/*.test.js"`: run a single unit test by name
- `npm run test:e2e`: run the Playwright browser tests in `e2e/` (Chromium; the config starts its own server on port 8123)
- `npx playwright test -g "Copy link"`: run a single e2e test by name
- `npm start`: serve the page at `http://localhost:8000` (`python3 -m http.server`)

## Architecture

Kakanda HTTP is a static, single-page React 19 app for searching HTTP status codes. `index.html` holds all the CSS inline and loads one script, `build/kakanda-http.js`.

- **The bundle is committed.** `build.js` (esbuild) bundles `modules/index.jsx`, the app and React into one minified, production-mode ES module. The page runs on any static host without a build step. After you edit anything in `modules/`, run `npm run build` and commit `build/kakanda-http.js` with the source change. CI (`.github/workflows/ci.yml`) rebuilds the bundle and fails if it differs from the committed file.
- **No third-party requests.** React is self-hosted inside the bundle. Do not add CDN scripts, fonts or import maps.
- **Keep logic in plain `.js`.** Unit tests import `modules/filterStatuses.js`, `modules/url.js` and `modules/HTTP_STATUSES.js` directly in Node, which cannot run JSX. Only the React components use `.jsx`. Put new testable logic in `.js` modules.
- **Search** (`groupStatuses` in `modules/filterStatuses.js`): it groups statuses by the first digit of the code into the classes in `STATUS_CLASSES`. A status matches when its code, phrase, summary, headers and class name together contain every word of the query, in any order. `note` is left out on purpose, because notes name other codes. Empty groups are dropped. The query is kept in `?q=` with `history.replaceState` (helpers in `modules/url.js`).
- **Data fields:** each entry in `modules/HTTP_STATUSES.js` has `code`, `phrase`, `summary` and `reference` (an RFC Editor link, RFC 9110 where it defines the code). Optional fields: `headers`, `cacheable` (RFC 9110 section 15.1), `note` and `deprecated`.
- **Anchors:** each list item has `id` set to its status code, so `/#404` links to it. The list renders after page load, so `KakandaHTTP.jsx` scrolls to the hash target on mount.
- **Badge colours:** the `.kakanda-http__status--N` classes in `index.html` colour each class 1 to 5 and meet WCAG AA contrast.

## Relationship to kaktools

The live demo (https://tools.kaklabs.com/http-status-codes.html) is a separate Jekyll page in the kaktools repo (`_tools/http-status-codes.html`). That page renders the same list server side from `_data/http_statuses.yml`. `modules/HTTP_STATUSES.js` mirrors that YAML for `code`, `phrase`, `summary` and `reference`, and the badge colours mirror kaktools' `.kt-status--N`. The optional fields exist only here. When the user says the changes were made in kaktools, port the data and UI changes here.
