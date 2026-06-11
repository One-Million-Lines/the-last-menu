# The Last Menu

The Last Menu is a browser-based editor for building floating mobile menus from JSON and exporting them as a single vanilla JavaScript bundle. It is designed for teams that want a configurable website menu without building a custom navigation system for every site.

## What it does

It lets you define a floating menu, preview it instantly, and download either the raw JSON config or a ready-to-embed JavaScript file.

## Why it exists

Many marketing sites, landing pages, and mobile-first experiences need a compact navigation layer, but custom menu work is repetitive. This project turns that into a reusable editor plus export flow.

## Features

- JSON-driven menu configuration
- Live preview inside the editor
- Sample presets for common menu layouts
- Theme switching with bundled CSS themes
- Nested menu items
- Downloadable JSON config
- Downloadable one-file JavaScript bundle with config and theme included
- No backend or account required

## How it works

1. The editor keeps the menu state in a Zustand store.
2. The JSON editor and toolbar update the same shared config object.
3. The preview renders the bundled `LastMenu` script inside an iframe.
4. Export uses `src/lib/bundler.ts` to combine theme CSS, the runtime, and the current config into a single file.

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- Radix UI primitives
- Lucide icons

## Project structure

```text
src/
  components/editor/  JSON editor, toolbar, preview
  lib/                bundle generation and embedded runtime/theme sources
  pages/              landing page and editor page
  store/              Zustand state for menu config and JSON text
  types/              menu config types and sample presets
menus/                example menu JSON files
themes/               exported CSS theme files
```

## Getting started

```bash
git clone <repo-url>
cd the-last-menu
npm install
npm run dev
```

Open `http://localhost:5310`.

## Configuration

This project does not require environment variables for local development.

The production build uses `/demo/the-last-menu/` as the Vite base path.

## Usage

1. Open `/editor`.
2. Start from a preset or import your own JSON file.
3. Adjust theme, icons, columns, items, and nested links.
4. Download the JSON config or the generated `last-menu-bundle.js` file.
5. Embed the exported bundle on any website.

## Development

```bash
npm run dev
npm run build
npm run build:dev
npm run lint
npm run preview
```

## Roadmap

- Add more preset menu templates
- Add validation for imported JSON
- Add documentation for embedding the exported bundle
- Add automated tests for bundling and config parsing

## Contributing

This project is public and open for collaboration. If you’re interested in contributing, improving the project, or discussing ideas, feel free to reach out.

LinkedIn: https://linkedin.com/in/alexrada

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Open a pull request

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).
