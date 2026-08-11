# emanote-hugo

A Hugo theme that reproduces the look & feel of [Emanote](https://emanote.srid.ca)'s
default theme: a centered card layout with a note-tree sidebar, a tinted note-title
strip, a right-hand table of contents, tag chips, callouts, and a Lora / Mona Sans /
Space Mono type system on a configurable Tailwind color palette with light/dark mode.

This is an independent set of Go (Hugo) templates. It contains none of Emanote's
original Haskell/Heist source — only the visual language (layout, spacing, color
roles, typography) has been carried over. See **Design notes & deliberate
differences** below for what didn't translate 1:1.

## Quick start

```bash
# From your Hugo site's root
git submodule add https://github.com/yourname/emanote-hugo themes/emanote-hugo
```

`hugo.toml`:

```toml
theme = "emanote-hugo"

[outputs]
  home = ["HTML", "RSS", "JSON"]   # JSON powers the Ctrl+K search

[params]
  primaryColor = "blue"             # any Tailwind color name
  description  = "My notes"
  iconUrl      = "favicon.svg"

[taxonomies]
  tag = "tags"

[markup.goldmark]
  [markup.goldmark.parser]
    [markup.goldmark.parser.attribute]
      block = true
      title = true

# Optional but recommended: makes code blocks use this theme's shipped
# static/css/chroma.css (a "monokai" palette tuned for the always-dark
# code-block background) instead of Hugo's default inline-styled colors.
[markup.highlight]
  noClasses = false
  style = "monokai"
```

Run `hugo server` and visit `http://localhost:1313`. A full working example — the one
used to test this theme — lives in `exampleSite/`:

```bash
cd exampleSite
hugo server --themesDir ../.. --theme emanote-hugo
```

Requires **Hugo 0.123+** (extended not required — Tailwind is loaded from a CDN, not
compiled locally — see "Compiling Tailwind" below if you want a local build instead).

## Configuration

All params live under `[params]` in `hugo.toml`. See
`exampleSite/content/reference/params.md` for the full table. The two worth knowing
up front:

- **`primaryColor`** — every component is written against a `primary-*` color role,
  never a hardcoded palette. Set this to any built-in Tailwind color name (`red`,
  `teal`, `violet`, `blue`, ...) to re-theme the whole site from one line.
- Per-page front matter can override `sidebar: false` and `toc: false` to hide either
  panel on a specific page (e.g. a landing page).

## Content authoring

- **Ordering**: the sidebar tree and section listings sort with Hugo's normal page
  sort — set `weight:` in front matter for manual ordering.
- **Tags**: add `tags: ["a", "b"]` to front matter; they render as chips at the
  bottom of the note and feed the "Related" panel.
- **Callouts**: use the `callout` shortcode —
  `{{% callout type="tip" title="Optional" %}}body{{% /callout %}}`. Types: `note`,
  `info`, `tip`, `warning`, `danger`, `success`, `quote`, `example`. Add `fold="true"`
  for a collapsed-by-default `<details>` callout.
- **Search**: works out of the box once `JSON` is in the home page's `[outputs]` —
  no extra setup.

## Design notes & deliberate differences

A few things in Emanote don't have a native Hugo equivalent and were adapted rather
than faked:

- **Backlinks → "Related".** Emanote's sidebar backlinks come from a wikilink graph
  built at parse time; standard Markdown links (and Hugo) don't have that concept.
  This theme's right panel instead uses Hugo's built-in `Pages.Related` (shared
  `tags`), styled identically to the original backlink chips. If you wire up a real
  backlink index (e.g. via a build-time script), swap the header text in
  `layouts/partials/related-list.html` back to "Linked from".
- **Folgezettel tree semantics** (Emanote's clickable folder-index nodes) are
  simplified to Hugo's ordinary section/page tree — nodes are just pages, and
  "children" are a page's descendants under `content/`.
- **Tailwind is loaded from a CDN** (`@tailwindcss/browser@4` via jsDelivr) and
  JIT-compiles the utility classes in-browser, matching how Emanote's own dev/live
  server works. This needs no Node/npm step to get started, at the cost of a
  first-paint delay and a third-party script dependency. See below to compile it
  locally instead.
- **Mona Sans** isn't on Google Fonts (it's GitHub's typeface); it's loaded here via
  a Fontsource CDN build for convenience. Self-host it for production — see below.
- **Stork/WASM search** is replaced with a small vanilla-JS Ctrl+K modal reading a
  generated `/index.json` — same UX affordance, none of the WASM dependency.

## Compiling Tailwind locally (optional)

For production, or to drop the CDN script entirely:

```bash
npm install -D @tailwindcss/cli @tailwindcss/postcss
```

Move the contents of `layouts/partials/theme-tokens.html`'s `<style
type="text/tailwindcss">` block into a `styles/input.css`, add
`@import "tailwindcss";` at the top, then:

```bash
npx @tailwindcss/cli -i styles/input.css -o static/css/main.css --minify
```

Replace the `<script src=".../@tailwindcss/browser@4">` tag in
`layouts/partials/head.html` with `<link rel="stylesheet" href="{{ "css/main.css" |
relURL }}">`.

## Self-hosting fonts

Download [Lora](https://fonts.google.com/specimen/Lora),
[Space Mono](https://fonts.google.com/specimen/Space+Mono), and
[Mona Sans](https://github.com/github/mona-sans) (woff2), place them under
`static/fonts/`, and replace the `<link>` tags in `layouts/partials/styles.html` with
local `@font-face` rules pointing at `/fonts/...`.

## License

MIT for the templates in this repository. Design language credited to Emanote
(AGPL-3.0-or-later / CC0-1.0 dual-licensed templates), https://github.com/srid/emanote.
