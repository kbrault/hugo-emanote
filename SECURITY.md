# Security Policy

This is a small open-source Hugo theme, maintained on a best-effort basis.

There's no formal support contract or guaranteed response time, but security issues are taken seriously and will be looked at as soon as possible.

## Reporting a Vulnerability

Please **do not open a public issue** for security problems. Instead:

- Use GitHub's **Private Vulnerability Reporting** (Security tab → *Report a vulnerability*)

Include what you found, how to reproduce it, and which file/template is
affected.

## Scope

Mainly relevant to:

- XSS or unsafe use of `safeHTML` / `safeJS` / `safeCSS` in the templates
- The client-side search script (`static/js/search.js`)
- Third-party CDN scripts the theme loads (Tailwind CSS browser build,
  Google Fonts, Fontsource)

For vulnerabilities in Hugo itself, report upstream to the [Hugo project](https://github.com/gohugoio/hugo/security) instead.
