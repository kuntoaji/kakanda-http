# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Requires Node.js 22 or later. There is no linter.

- `npm install`: install React and esbuild
- `npm run build`: bundle `modules/` and React into `build/kakanda-http.js`
- `npm run watch`: rebuild on every change
- `npm test`: run all unit tests with `node --test` (finds `test/**/*.test.js`)
- `node --test --test-name-pattern="matches by code"`: run a single test by name
- `npm start`: serve the page at `http://localhost:8000` (`python3 -m http.server`)

## Architecture

Kakanda HTTP is a static, single-page React 19 app for searching HTTP status codes. `index.html` holds all the CSS inline and loads one script, `build/kakanda-http.js`.

- **The bundle is committed.** `build.js` (esbuild) bundles `modules/index.jsx`, the app and React into one minified, production-mode ES module. The page runs on any static host without a build step. After you edit anything in `modules/`, run `npm run build` and commit `build/kakanda-http.js` with the source change.
- **No third-party requests.** React is self-hosted inside the bundle. Do not add CDN scripts, fonts or import maps.
- **Keep logic in plain `.js`.** Tests import `modules/filterStatuses.js` and `modules/HTTP_STATUSES.js` directly in Node, which cannot run JSX. Only the React components use `.jsx`. Put new testable logic in `.js` modules.
- **Search** (`groupStatuses` in `modules/filterStatuses.js`): it groups statuses by the first digit of the code into the classes in `STATUS_CLASSES`. A status matches when its code, phrase, summary and class name together contain every word of the query, in any order. Empty groups are dropped.
- **Anchors:** each list item has `id` set to its status code, so `/#404` links to it. The list renders after page load, so `KakandaHTTP.jsx` scrolls to the hash target on mount.
- **Badge colours:** the `.kakanda-http__status--N` classes in `index.html` colour each class 1 to 5 and meet WCAG AA contrast.

## Relationship to kaktools

The live demo (https://tools.kaklabs.com/http-status-codes.html) is a separate Jekyll page in the kaktools repo (`_tools/http-status-codes.html`). That page renders the same list server side from `_data/http_statuses.yml`. `modules/HTTP_STATUSES.js` mirrors that YAML, with the same fields (`code`, `phrase`, `summary`, `reference`), and the badge colours mirror kaktools' `.kt-status--N`. When the user says the changes were made in kaktools, port the data and UI changes here.
