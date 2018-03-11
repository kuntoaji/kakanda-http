# Kakanda HTTP

Kakanda HTTP is an React JS application for searching HTTP status code or status message. Kakanda HTTP is inspired by [Alfred HTTP][inspiration]. Demo: <https://www.kaklabs.com/tools/kakanda-http>

<img src="https://github.com/kuntoaji/kakanda-http/raw/master/kakanda-http.png" alt="kakanda-http" width=400>

## Installation
* Install yarn - https://yarnpkg.com/en/docs/install
* Clone repository - `git clone git@github.com:kuntoaji/kakanda-http.git`
* Change directory - `cd kakanda-http`
* Run `yarn install`

## Commands
### yarn run server
Runs the app in the development mode. Open http://localhost:8080 to view it in the browser.

### yarn run build
Builds the app for to the build folder.

### yarn run build-production
Builds the app for production to the build folder. It minified and optimizes the build for the best performance.

## Known Bug
in production build, you need to define production variable before load `build/bundle.js`

```
<script>
  var production = 'production';
</script>
<script src="example.com/build/bundle.js"></script>
```

## License
Released under the MIT License, Copyright (c) 2017–ω Kunto Aji Kristianto.

[inspiration]: https://github.com/JoelQ/alfred-http
