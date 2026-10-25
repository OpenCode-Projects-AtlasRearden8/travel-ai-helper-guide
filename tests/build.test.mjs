import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { build, clean } from "../build.mjs";

const ROOT = new URL("..", import.meta.url).pathname;
const SITE = join(ROOT, "site");

const CHAPTERS = [
  "01-itinerary-drafts-you-verify",
  "02-translation-restaurants-and-train-stations",
  "03-hotel-and-flight-research-honesty",
  "04-packing-list-generation",
  "05-offline-planning-with-local-models",
  "06-scam-resistant-booking-habits",
];
const COMPANIONS = ["trip-worksheet", "verification-checklist", "glossary"];
const ALL_PAGES = ["index", ...CHAPTERS, ...COMPANIONS];

before(() => {
  clean();
  build();
});

after(() => {
  clean();
});

const html = (name) => readFileSync(join(SITE, `${name}.html`), "utf8");

describe("build output", () => {
  it("creates site/ with one HTML page per doc", () => {
    for (const name of ALL_PAGES) {
      const file = join(SITE, `${name}.html`);
      assert.ok(existsSync(file), `missing ${name}.html`);
    }
    const files = readdirSync(SITE);
    assert.equal(files.length, ALL_PAGES.length, "site has no stray files");
  });

  it("every page is complete HTML with nav and stylesheet", () => {
    for (const name of ALL_PAGES) {
      const page = html(name);
      assert.match(page, /<!DOCTYPE html>/);
      assert.match(page, /<style>/, `${name} inlines CSS`);
      assert.match(page, /<header class="site">/, `${name} has site nav`);
      assert.match(page, /Asdale Dynamics, LLC/, `${name} has credit`);
    }
  });

  it("site index lists all six chapters and the three companions", () => {
    const home = html("index");
    for (const c of CHAPTERS) assert.match(home, new RegExp(`${c}\\.html`));
    for (const c of COMPANIONS) assert.match(home, new RegExp(`${c}\\.html`));
  });

  it("all internal .md links resolve to included pages", () => {
    const valid = new Set(ALL_PAGES.map((n) => `${n}.html`));
    for (const name of ALL_PAGES) {
      const page = html(name);
      const links = [...page.matchAll(/href="([^"#]+\.html)"/g)].map((m) => m[1]);
      for (const link of links) {
        assert.ok(
          valid.has(link),
          `${name}.html links to ${link}, which is not in the site`
        );
      }
    }
  });

  it("converted content keeps the language of the source", () => {
    assert.match(html("index"), /drafting assistant/);
    assert.match(html("index"), /free-travel-planner-kit/);
    assert.match(html(CHAPTERS[0]), /load-bearing details/);
    assert.match(html(CHAPTERS[1]), /train \(or bus\) station/i);
    assert.match(html(CHAPTERS[2]), /official website|book direct|honesty/i);
    assert.match(html(CHAPTERS[3]), /packing list/i);
    assert.match(html(CHAPTERS[4]), /local model/i);
    assert.match(html(CHAPTERS[5]), /scam/i);
    assert.match(html("glossary"), /hallucination/i);
    assert.match(html("verification-checklist"), /checklist/i);
    assert.match(html("trip-worksheet"), /worksheet/i);
  });

  it("renders tables, code blocks, and checkboxes", () => {
    // worksheet has a table of bookings
    assert.match(html("trip-worksheet"), /<table>/);
    assert.match(html("trip-worksheet"), /<thead>/);
    // chapters have fenced code blocks for prompts
    assert.match(html(CHAPTERS[0]), /<pre><code>/);
    // checklist has interactive-looking checkbox items
    assert.match(html("verification-checklist"), /<input type="checkbox" disabled/);
  });

  it("leaves no raw markdown artifacts in the output", () => {
    for (const name of ALL_PAGES) {
      const page = html(name);
      // fenced code markers
      assert.doesNotMatch(page.replace(/<code>[\s\S]*?<\/code>/g, ""), /```/);
      // heading hashes in text (outside code)
      assert.doesNotMatch(page.replace(/<code>[\s\S]*?<\/code>/g, ""), /&gt;?\s#{1,4}\s/);
      // markdown-style links that failed to convert
      assert.doesNotMatch(page, /\]\(\.?\/?[\w-]+\.md\)/);
    }
  });

  it("prev/next navigation chains chapters correctly", () => {
    const ch1 = html(CHAPTERS[0]);
    assert.match(ch1, /href="index\.html"/);
    assert.match(ch1, /href="02-translation-restaurants-and-train-stations\.html"/);
    const last = html(CHAPTERS[5]);
    assert.match(last, /href="trip-worksheet\.html"/);
  });

  it("build() is idempotent", () => {
    const first = build();
    const before = readFileSync(join(SITE, "index.html"), "utf8");
    const again = build();
    const after = readFileSync(join(SITE, "index.html"), "utf8");
    assert.equal(first.pages, again.pages);
    assert.equal(before, after);
  });
});

describe("source docs well-formed", () => {
  it("docs/ contains no placeholder brackets from the template era", () => {
    for (const f of readdirSync(join(ROOT, "docs"))) {
      if (!f.endsWith(".md")) continue;
      const md = readFileSync(join(ROOT, "docs", f), "utf8");
      assert.doesNotMatch(md, /TODO|FIXME|XXX/i, `${f} has no unfinished markers`);
    }
  });

  it("every doc ends with a copyright or attribution line", () => {
    for (const f of readdirSync(join(ROOT, "docs"))) {
      if (!f.endsWith(".md")) continue;
      const md = readFileSync(join(ROOT, "docs", f), "utf8");
      assert.match(md, /Asdale Dynamics, LLC/, `${f} missing credit`);
    }
  });
});
