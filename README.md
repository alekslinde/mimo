<img src="mimo.svg" width="100px">

A modern Webpack 5 starter kit with Bootstrap 5 support, SCSS, asset optimization, and live reload.

## Quick Start

1. Install [NVM](https://github.com/nvm-sh/nvm#installing-and-updating)
2. Install latest Node.js:  
   `nvm install node`
3. Install dependencies:  
   `npm i`
4. Start development server:  
   `npm run dev:start`

## Available Scripts

- `npm run dev:start` — Start dev server with live reload on http://localhost:8080
- `npm start` — Watch files and rebuild on changes (no dev server)
- `npm run build` — Production build with minification and cache busting
- `npm run dev:stop` — Kill the dev server process

## Features

- **Webpack 5** with hot module reloading
- **Bootstrap 5** and Popper.js included
- **SCSS compilation** with Autoprefixer
- **Babel transpilation** for modern JavaScript
- **SVG sprite generation** for icons
- **Asset optimization** — images, fonts, favicons
- **Cache busting** with content hashes
- **PHP file support** (optional)

## Project Structure

```
src/
├── index.html          # Main HTML entry point
├── assets/
│   ├── js/
│   │   └── main.js     # JavaScript entry point
│   ├── scss/           # SCSS files
│   ├── icons/          # SVG icons (sprite)
│   └── fonts/          # Web fonts (optional)
dist/                   # Build output (generated)
```

## Browser Support

- Modern browsers (see `browserslist` in package.json)
- iOS 7+
- Not IE 11

## Security

Dependencies are pinned via `overrides` in `package.json` to pull patched
transitive packages without forcing major upgrades.

**Do not run `npm audit fix --force`.** It downgrades `svg-sprite-loader` from
6.0.11 to 0.3.1 (a 2016 release), which introduces *more* vulnerabilities than
it fixes — including critical ones. Use `npm audit fix` (without `--force`) or
add an `overrides` entry instead.

### Known audit findings (not exploitable)

`npm audit` reports 4 high findings in the
`svg-sprite-loader` → `svg-baker` → `image-size` chain (ICNS/JXL/HEIF parser
infinite loops). The advisory has no patched version — 2.0.2 is the latest
release and is still flagged.

These are **not reachable in this project**. `svg-baker` calls `image-size` only
from `raster-to-svg.js`, which `symbolFactory` invokes only when the loader
content is a `Buffer`. Two independent guards prevent that:

1. `svg-sprite-loader` does not set `loader.raw`, so webpack passes loader
   content as a **string** — `Buffer.isBuffer(content)` is never true.
2. The loader rejects any input not containing `<svg` before reaching
   `svg-baker` at all.

`npm audit` flags the dependency edge, not the call path. Re-verify these two
conditions if `svg-sprite-loader` is ever upgraded.

The durable fix is migrating off `svg-sprite-loader` — it was last published in
2023, is effectively unmaintained, and pins `postcss@^5` and `micromatch@3`.
Webpack 5 native asset modules or `svg-spritemap-webpack-plugin` are the usual
replacements.
