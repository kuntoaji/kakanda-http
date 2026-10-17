# Kakanda HTTP

Kakanda HTTP is a simple React application for searching HTTP status codes by code, phrase, or description. It lists every code in the IANA HTTP Status Code Registry, grouped by class, with a link to the RFC section that defines each one. Kakanda HTTP is inspired by [Alfred HTTP][inspiration].

Kakanda HTTP does not require a JavaScript bundler. It uses [JS modules][js_modules] and an [import map][import_maps] to load React 19 in the browser.

Demo: <https://tools.kaklabs.com/http-status-codes.html>

<img src="https://github.com/kuntoaji/kakanda-http/raw/master/kakanda-http.png" alt="kakanda-http" width=400>

## How To Run Kakanda HTTP
* Clone repository - `git clone git@github.com:kuntoaji/kakanda-http.git`
* Change directory - `cd kakanda-http`
* Run a web server, for example `npm start` (runs `python3 -m http.server 8000`).
* Open `http://localhost:8000` in your browser.
* Link to a status code with its anchor, for example `http://localhost:8000/#404`.

## How To Build JS Modules
Requires Node.js 22.18+ or 24.11+.

* Run `npm install`
* Run `npm run build` to compile the JSX in `modules/` into `build/`
* Run `npm run watch` to rebuild on every change
* Run `npm test` to run the tests

## License
Released under the MIT License, Copyright (c) 2017–ω Kunto Aji Kristianto.

[inspiration]: https://github.com/JoelQ/alfred-http
[js_modules]: https://v8.dev/features/modules
[import_maps]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap
