---
title: Theme Parameters
weight: 1
tags: ["configuration"]
---

All parameters this theme reads from `hugo.toml`'s `[params]` table.

| Parameter                 | Type   | Default              | Purpose                                                                                   |
|---------------------------|--------|----------------------|-------------------------------------------------------------------------------------------|
| `primaryColor`            | string | `blue`               | Tailwind palette name used for the `primary-*` role throughout the theme |
| `description`             | string | -                    | Fallback meta description |
| `iconUrl`                 | string | `favicon.svg`        | Site icon shown in the sidebar, breadcrumbs, and browser tab |
| `relatedCount`            | int    | `5`                  | Max number of "Related" notes shown per page |
| `footerText`              | string | `Built with Hugo …`  | Text shown at the right of the footer strip |
| `sidebar.enable`          | bool   | `true`               | Show the left sidebar tree (overridable per page via front matter `sidebar: false`) |
| `breadcrumbs.enable`      | bool   | `true`               | Show the mobile breadcrumb bar |
| `toc.enable`              | bool   | `true`               | Show the right-panel table of contents (overridable per page via `toc: false`) |
