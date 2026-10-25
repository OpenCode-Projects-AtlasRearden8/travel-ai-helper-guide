# AI Travel Tips (Calmer Trips)

A plain-English manual for using AI to plan calmer trips: itinerary drafts you
verify, translation in restaurants and train stations, honest hotel/flight
research, packing-list generation, offline planning with local models, and
scam-resistant booking habits. Ships as Markdown docs plus a small static HTML
site you build yourself — no accounts, no cloud, no tracking.

Written the same way as everything published by **Asdale Dynamics, LLC**:
like a friend would — clear, warm, step by step, never condescending.

## Who it's for

Beginners who have heard "just use AI for travel" and (sensibly) don't trust it
yet. This manual shows exactly which parts AI is great at (drafting, translating
written text, re-planning) and which parts stay yours (verifying knife-edge
facts, paying safely). Every workflow ends in a *verified* result, not a
confident guess.

## What's inside

- `docs/` — the manual:
  - [Itinerary drafts you verify](docs/01-itinerary-drafts-you-verify.md)
  - [Translation at tables and ticket windows](docs/02-translation-restaurants-and-train-stations.md)
  - [Hotel and flight research honesty](docs/03-hotel-and-flight-research-honesty.md)
  - [Packing lists that fit your trip](docs/04-packing-list-generation.md)
  - [Offline planning with local models](docs/05-offline-planning-with-local-models.md)
  - [Scam-resistant booking habits](docs/06-scam-resistant-booking-habits.md)
  - Companions: [trip worksheet](docs/trip-worksheet.md),
    [verification checklist](docs/verification-checklist.md),
    [glossary](docs/glossary.md)
- `build.mjs` — dependency-free Node build script
- `site/` — generated static HTML (open `site/index.html` in any browser);
  committed so it can be served directly (for example with GitHub Pages)
- `tests/` — build and content tests (Node's built-in test runner)

## Build & test

Requires Node 18+ (built and tested with Node 20). No npm dependencies to install.

```sh
node build.mjs     # builds the static site into site/
npm test           # runs the build + content test suite
```

`npm test` first rebuilds the site from scratch, then verifies: every doc
converted, every internal link resolvable, no unfinished template brackets left
in output, key content present, and the site index lists all chapters.

Then open `site/index.html` in a browser — everything is plain static HTML/CSS.

## Design notes

- **AI drafts, you verify.** Every chapter pairs a fast AI workflow with a
  short human verification step. The
  [verification checklist](docs/verification-checklist.md) is the heart of the
  manual.
- **Local-first.** The site, the build, the tests: all run on your machine.
  Chapter 5 extends this to *offline AI planning* with local models for dead
  zones.
- **No secrets, no personal data** in any file.
- **Complements the free-travel-planner-kit, never duplicates it.** That kit
  provides printables; this manual teaches the AI workflow that feeds them.

## Related projects

- **free-travel-planner-kit** — printable travel planning sheets (paper layer)
- **The Massive AI Manual** — the beginner AI book this style guides from
- Hub: dylanasdale.github.io

Copyright (c) 2026 **Asdale Dynamics, LLC**. MIT-licensed — see [LICENSE](LICENSE).
