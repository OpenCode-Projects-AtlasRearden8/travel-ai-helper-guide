# STATUS.md — AI Travel Tips (Calmer Trips)

Generated as part of a resumed build. Read this first for the shape of the
project and what has been verified.

## What this is

A plain-English manual for using AI to plan calmer trips, written in the
Asdale Dynamics, LLC house style: clear, warm, step by step, never
condescending. It covers the six requested pillars:

1. **Itinerary drafts you verify** — AI drafts, short human verification of
   load-bearing facts.
2. **Translation in restaurants and train stations** — helper prompts for
   menus and ticket windows, including accessibility: a paper backup instead
   of a second phone.
3. **Hotel and flight research honesty** — AI as shortlisting engine, never
   price-checker; live checks you must do yourself.
4. **Packing-list generation** — edit-first checklists targeted to the trip.
5. **Offline planning with local models** — running small local models (LM
   Studio / Ollama, small open-weight models) so planning keeps working in
   dead zones.
6. **Scam-resistant booking habits** — verified domains, safe payment
   channels, urgency-pressure red flags, offline paper trails.

Plus three companions:

- **Trip worksheet** (a fill-in trip workspace that mirrors the chapters)
- **Verification checklist** (the trust-everything checklist)
- **Glossary** (all jargon used, defined plainly)

Deliberately complements **free-travel-planner-kit**: that kit is printable
sheets; this manual is the AI workflow behind them. It doesn't reprint the
kit's forms and doesn't assume its files.

## How to run it

Everything is local-first: no dependencies, no network, no accounts.

```sh
# build the site (Node 18+, tested on Node 20)
node build.mjs
# view it
open site/index.html        # or just double-click the file

# run the test suite (11 tests, Node's built-in runner)
npm test
```

## Layout

```
LICENSE            MIT, Copyright (c) 2026 Asdale Dynamics, LLC
README.md          how to read it, how to build it, how to make it yours
build.mjs          dependency-free static site builder (2026-10-25)
package.json       metadata for running npm test
docs/              every chapter including index, worksheet, checklist, glossary
site/              generated HTML site (one page per doc, self-contained)
tests/             build + content tests
```

## What got done in this session

- docs/, LICENSE, README were found complete on arrival (10 MD docs: intro +
  6 chapters + worksheet + checklist + glossary, no placeholders).
- Added the missing pieces that make this a **built, tested** project:
  - `build.mjs` — docs → static site builder, single file, no npm deps.
    - handles headings, paragraphs, ordered/unordered/check-box lists with
      wrapped continuation lines, fenced code blocks, tables, blockquotes,
      bold-italic-links-in-order; converts internal `.md` links to `.html`,
      adds a sitewide nav, prev/next footers, and a colophon crediting
      Asdale Dynamics, LLC on every page.
  - `package.json` with `npm test` → Node's built-in test runner.
  - `tests/build.test.mjs` — 11 tests:
    * one HTML page per doc, no stray files
    * HTML well-formedness wrapper (doctype, inlined CSS, sitemap nav, credit line)
    * index site index lists all six chapters + three companions
    * every internal `.html`link resolves to a page actually shipped
    * chapter-specific keyword spot-checks (runner vs. docs drift)
    * rendering checks (tables, code blocks, disabled check boxes)
    * no raw markdown artifacts such as unconverted ``` fences, unconverted
      `[text](file.md)` links, or un-stripped hash markers in headings
    * prev/next chapter navigation chains correctly
    * build() is idempotent (deterministic output)
- Fixed real converter bugs found by the tests themselves:
  1. list-item continuation lines (indented wrapped sentences) were being
     mis-parsed as paragraphs — now merges back into the right `<li>`;
  2. added a footer credit on docs that were missing one.
- README: verified against reality — `site/` is generated but committed so it
  can be opened or served without building first; build/test instructions
  already state the Node 18+ requirement accurately.
- LICENSE already correct (exact line: `Copyright (c) 2026 Asdale Dynamics, LLC`).

## Verification results

```text
npm test
# suites 2 / tests 11 / pass 11 / fail 0
node build.mjs → "Built 10 pages into /workspace/.../site"
```

Manual spot-checks: tables render as `<table>` with headers, code-prompts
render as `<pre>`, checklist renders as disabled check boxes, site index
contains all chapter links, no `.md` hrefs leak into any HTML page.

## Known gaps / not done on purpose

- Only the docs.md → HTML path exists; no feed or print-css special-casing
  for the worksheet beyond the browser's default.
- The "free-travel-planner-kit" referenced as a companion project is *not*
  part of this repository; README and index.md describe the boundary, they
  don't link into repo-local files.
- No CI config (GitHub Actions) — tests run locally only, consistent with
  the local-first no-secrets posture.
- No multi-language output / no RTL styles yet. Every doc is English-only.
- Checkboxes in the HTML are `disabled` — they're for reading/printing, not
  form submission (by design: no JS, no backend).
- Search across the site is browser-native (Ctrl+F); no JS search index.

## Notes for next time

- `npm test` rebuilds the site from scratch (clean → build → assertions) and
  cleans up afterwards; run `node build.mjs` after tests if you want site/
  back on disk without a second build step.
- Content is commit-safe - no secrets, no API keys, no personal data.
- Do not add co-author trailers to commits when editing this repo.
