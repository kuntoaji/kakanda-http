# Kakanda HTTP

Kakanda HTTP is a simple React JS application for searching HTTP status code or status message. Kakanda HTTP is inspired by [Alfred HTTP][inspiration].
Kakanda HHTP does not require Javascript bundler. It embraces the use of [JS modules feature from browsers][js_modules].

Demo: <https://tools.kaklabs.com/http-status-codes.html>

<img src="https://github.com/kuntoaji/kakanda-http/raw/master/kakanda-http.png" alt="kakanda-http" width=400>

## How To Run Kakanda HTTP
* Clone repository - `git clone git@github.com:kuntoaji/kakanda-http.git`
* Change directory - `cd kakanda-http`
* Run web server. If your machine has python, you can run `python -m SimpleHTTPServer`.
* Open localhost from your browser. Example: `localhost:8000`.

## How To Build JS Modules
* Run `npm install`
* Run `npx babel modules --out-dir build --presets react-app/prod`
* If you want to run in watch mode `npx babel --watch app --out-dir build --presets react-app/prod`

## License
Released under the MIT License, Copyright (c) 2017–ω Kunto Aji Kristianto.

[inspiration]: https://github.com/JoelQ/alfred-http
[js_modules]: https://v8.dev/features/modules
