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
