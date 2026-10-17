# Kakanda HTTP

Kakanda HTTP is a simple React application for searching HTTP status codes by code, phrase, or description. It lists every code in the IANA HTTP Status Code Registry, grouped by class, with a link to the RFC section that defines each one. Kakanda HTTP is inspired by [Alfred HTTP][inspiration].

Kakanda HTTP is a static page with no third-party requests. [esbuild][esbuild] bundles the app and React 19 into one self-hosted file, `build/kakanda-http.js`, which is committed so the page runs without a build step.

Demo: <https://tools.kaklabs.com/http-status-codes.html>

<img src="https://github.com/kuntoaji/kakanda-http/raw/master/kakanda-http.png" alt="kakanda-http" width=400>

## How To Run Kakanda HTTP
* Clone repository - `git clone git@github.com:kuntoaji/kakanda-http.git`
* Change directory - `cd kakanda-http`
* Run a web server, for example `npm start` (runs `python3 -m http.server 8000`).
* Open `http://localhost:8000` in your browser.
* Link to a status code with its anchor, for example `http://localhost:8000/#404`.
* Share a search with `?q=`, for example `http://localhost:8000/?q=retry-after`. Press `/` to focus the search and `Esc` to clear it.

## How To Build
Requires Node.js 22 or later.

* Run `npm install`
* Run `npm run build` to bundle `modules/` and React into `build/kakanda-http.js`
* Run `npm run watch` to rebuild on every change
* Run `npm test` to run the tests

## License
Released under the MIT License, Copyright (c) 2017–ω Kunto Aji Kristianto.

[inspiration]: https://github.com/JoelQ/alfred-http
[esbuild]: https://esbuild.github.io/
