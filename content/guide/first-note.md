---
title: Writing Your First Note
weight: 1
tags: ["getting-started", "markdown"]
description: A tour of the Markdown features this theme styles out of the box.
---

This page exists to exercise every piece of typography the theme styles: headings, lists, tables, code, callouts, and task lists.

Check more on [Markdown's cheat sheet](https://www.markdownguide.org/cheat-sheet/)

## Callouts

{{% callout type="note" %}}
A plain note. Good for general context that isn't critical.
{{% /callout %}}

{{% callout type="tip" title="Pro tip" %}}
Use `weight` in front matter to control ordering in the sidebar tree.
{{% /callout %}}

{{% callout type="warning" fold="true" %}}
Foldable callouts start collapsed when `fold="true"` is set ; useful for long asides that would otherwise push more important content below the fold.
{{% /callout %}}

## Code

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"
```

## Tables

| Feature      | Supported |
|--------------|-----------|
| Dark mode    | Yes       |
| Sidebar tree | Yes       |
| Backlinks    | Related notes (tag-based) |

## Tasks

- [x] Clone the theme
- [x] Point `hugo.toml` at it
- [ ] Write your first note

## Links

See the [reference section](/reference/) for configuration options, or read more about [Hugo itself](https://gohugo.io) on its official site.
