#!/usr/bin/env node
/**
 * Build script for AI Travel Tips (Calmer Trips).
 * Converts docs/*.md into a static HTML site in site/.
 * Dependency-free: uses Node's built-in modules only.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, existsSync } from "node:fs";
import { join, basename } from "node:path";

const ROOT = new URL(".", import.meta.url).pathname;
const DOCS_DIR = join(ROOT, "docs");
const SITE_DIR = join(ROOT, "site");

// The manual's structure, in reading order.
const PAGES = [
  { file: "index.md", title: "Start Here", short: "Start Here" },
  { file: "01-itinerary-drafts-you-verify.md", title: "1. Itinerary Drafts You Verify", short: "1. Itineraries" },
  { file: "02-translation-restaurants-and-train-stations.md", title: "2. Translation at Tables and Ticket Windows", short: "2. Translation" },
  { file: "03-hotel-and-flight-research-honesty.md", title: "3. Hotel and Flight Research Honesty", short: "3. Bookings" },
  { file: "04-packing-list-generation.md", title: "4. Packing Lists That Fit Your Trip", short: "4. Packing" },
  { file: "05-offline-planning-with-local-models.md", title: "5. Offline Planning with Local Models", short: "5. Offline" },
  { file: "06-scam-resistant-booking-habits.md", title: "6. Scam-Resistant Booking Habits", short: "6. Scam Safety" },
  { file: "trip-worksheet.md", title: "The Trip Worksheet", short: "Worksheet" },
  { file: "verification-checklist.md", title: "The Verification Checklist", short: "Checklist" },
  { file: "glossary.md", title: "The Glossary", short: "Glossary" },
];

const STYLE = /* css */ `
:root {
  --ink: #25292e;
  --paper: #fbfaf7;
  --accent: #2b6777;
  --accent-soft: #e7f0f2;
  --line: #d9d6cd;
  --warn: #8a4a12;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font: 17px/1.65 Georgia, "Times New Roman", serif;
  -webkit-text-size-adjust: 100%;
}
main { max-width: 46rem; margin: 0 auto; padding: 2rem 1.2rem 4rem; }
header.site {
  background: var(--accent);
  color: #fff;
  padding: 0.7rem 1.2rem;
  font-family: Verdana, system-ui, sans-serif;
}
header.site .wrap {
  max-width: 46rem; margin: 0 auto;
  display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.4rem 1rem;
}
header.site .brand { font-weight: bold; font-size: 1rem; color: #fff; text-decoration: none; }
header.site nav { display: flex; flex-wrap: wrap; gap: 0.2rem 0.9rem; font-size: 0.8rem; }
header.site nav a { color: #dcebf0; text-decoration: none; }
header.site nav a:hover, header.site nav a[aria-current="page"] { color: #fff; text-decoration: underline; }
h1, h2, h3, h4 { font-family: Verdana, system-ui, sans-serif; line-height: 1.25; color: #1c2b31; }
h1 { font-size: 1.7rem; margin: 1.2rem 0 0.8rem; }
h2 { font-size: 1.2rem; margin: 2rem 0 0.6rem; border-bottom: 2px solid var(--accent-soft); padding-bottom: 0.25rem; }
h3 { font-size: 1.02rem; margin: 1.4rem 0 0.4rem; }
p, ul, ol { margin: 0.6rem 0; }
ul, ol { padding-left: 1.4rem; }
li { margin: 0.25rem 0; }
a { color: var(--accent); }
code {
  font-family: "SFMono-Regular", Consolas, monospace;
  font-size: 0.85em;
  background: #efece3;
  padding: 0.1em 0.35em;
  border-radius: 4px;
}
pre {
  background: #f0ede4;
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 0.8rem 1rem;
  overflow-x: auto;
}
pre code { background: none; padding: 0; font-size: 0.82rem; }
blockquote {
  margin: 1rem 0; padding: 0.1rem 1rem;
  border-left: 4px solid var(--accent);
  background: var(--accent-soft);
  border-radius: 0 6px 6px 0;
}
table { border-collapse: collapse; width: 100%; margin: 1rem 0; font-size: 0.92rem; }
th, td { border: 1px solid var(--line); padding: 0.4rem 0.6rem; text-align: left; vertical-align: top; }
th { background: var(--accent-soft); font-family: Verdana, system-ui, sans-serif; font-size: 0.82rem; }
hr { border: none; border-top: 1px solid var(--line); margin: 2rem 0; }
input[type="checkbox"] { margin-right: 0.35em; }
input[type="checkbox"]:disabled { accent-color: var(--accent); }
footer.pagenav {
  margin-top: 3rem; padding-top: 1rem; border-top: 2px solid var(--line);
  display: flex; justify-content: space-between; gap: 1rem;
  font-family: Verdana, system-ui, sans-serif; font-size: 0.82rem;
}
footer.pagenav a { text-decoration: none; }
footer.pagenav a:hover { text-decoration: underline; }
footer.colophon {
  margin-top: 2rem; font-size: 0.78rem; color: #6a6f75;
  font-family: Verdana, system-ui, sans-serif;
}
`;

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Inline markdown: code, links, bold, italic. Input must first be escaped. */
function inline(text) {
  let s = text;
  // inline code first (protect from further processing)
  s = s.replace(/`([^`]+)`/g, (_, c) => `\x00${escapeHtml(c)}\x01`);
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, "<em>$1</em>"); // images: not on plain site; render alt
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    let target = href;
    if (target.endsWith(".md")) target = target.slice(0, -3) + ".html";
    return `<a href="${target}">` + label + "</a>";
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
  s = s.replace(/(^|[\s(])_([^_\s][^_]*)_/g, "$1<em>$2</em>");
  s = s.replace(/\x00([\s\S]*?)\x01/g, "<code>$1</code>");
  return s;
}

/** Parse a markdown document into HTML body content. */
function markdownToHtml(md) {
  const out = [];
  const lines = md.split(/\r?\n/);
  let i = 0;
  let para = [];

  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${inline(para.join(" "))}</p>`);
      para = [];
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    // fenced code block
    if (/^```/.test(line.trim())) {
      flushPara();
      const lang = line.trim().slice(3);
      const buf = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i].trim())) {
        buf.push(lines[i]);
        i++;
      }
      i++; // closing fence
      const cls = lang ? ` class="lang-${escapeHtml(lang)}"` : "";
      out.push(`<pre${cls}><code>${escapeHtml(buf.join("\n"))}\n</code></pre>`);
      continue;
    }

    // heading
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      flushPara();
      const level = h[1].length;
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
      i++;
      continue;
    }

    // horizontal rule
    if (/^(---|\*\*\*)\s*$/.test(line.trim())) {
      flushPara();
      out.push("<hr>");
      i++;
      continue;
    }

    // blockquote
    if (line.trim().startsWith(">")) {
      flushPara();
      const buf = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        buf.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      out.push(`<blockquote>${inline(buf.join(" "))}</blockquote>`);
      continue;
    }

    // table
    if (
      line.trim().startsWith("|") &&
      i + 1 < lines.length &&
      /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1])
    ) {
      flushPara();
      const parseRow = (row) =>
        row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
      const head = parseRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(parseRow(lines[i]));
        i++;
      }
      const th = (c) => `<th>${inline(c)}</th>`;
      const td = (c) => `<td>${inline(c)}</td>`;
      const html =
        "<table><thead><tr>" +
        head.map(th).join("") +
        "</tr></thead><tbody>" +
        rows.map((r) => "<tr>" + r.map(td).join("") + "</tr>").join("") +
        "</tbody></table>";
      out.push(html);
      continue;
    }

    // lists (unordered incl. checkboxes, ordered)
    const ul = line.match(/^\s*[-*]\s+(.*)$/);
    const ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (ul || ol) {
      flushPara();
      const ordered = Boolean(ol);
      const itemRe = ordered ? /^\s*\d+[.)]\s+(.*)$/ : /^\s*[-*]\s+(.*)$/;
      const items = [];
      while (i < lines.length) {
        const m = lines[i].match(itemRe);
        if (!m) break;
        let text = m[1];
        i++;
        // continuation lines: indented (more than the bullet) non-list lines
        while (i < lines.length) {
          const cont = lines[i];
          if (
            cont.trim() !== "" &&
            /^\s{2,}\S/.test(cont) &&
            !itemRe.test(cont) &&
            !/^\s*#{1,4}\s/.test(cont)
          ) {
            text += " " + cont.trim();
            i++;
          } else {
            break;
          }
        }
        items.push(text);
      }
      const rendered = items
        .map((item) => {
          const cb = item.match(/^\[([ xX])\]\s+(.*)$/);
          if (cb) {
            const checked = cb[1] !== " ";
            return `<li><input type="checkbox" disabled${checked ? " checked" : ""}> ${inline(cb[2])}</li>`;
          }
          return `<li>${inline(item)}</li>`;
        })
        .join("");
      out.push(ordered ? `<ol>${rendered}</ol>` : `<ul>${rendered}</ul>`);
      continue;
    }

    // blank line
    if (line.trim() === "") {
      flushPara();
      i++;
      continue;
    }

    // paragraph line
    para.push(line.trim());
    i++;
  }
  flushPara();
  return out.join("\n");
}

/** First `# Heading` in the md, or the page title fallback. */
function firstHeading(md, fallback) {
  const h = md.match(/^#\s+(.+)$/m);
  return h ? h[1].trim() : fallback;
}

function shell(title, bodyHtml, currentFile, prev, next) {
  const nav = PAGES.map(
    (p) =>
      `<a href="${p.file.replace(/\.md$/, ".html")}"${
        p.file === currentFile ? ' aria-current="page"' : ""
      }>${p.short}</a>`
  ).join("\n");
  const prevLink = prev
    ? `<a href="${prev.file.replace(/\.md$/, ".html")}">← ${prev.short}</a>`
    : `<span></span>`;
  const nextLink = next
    ? `<a href="${next.file.replace(/\.md$/, ".html")}">${next.short} →</a>`
    : `<span></span>`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)} — AI Travel Tips</title>
<meta name="description" content="A plain-English manual for using AI to plan calmer trips.">
<style>${STYLE}</style>
</head>
<body>
<header class="site"><div class="wrap">
<a class="brand" href="index.html">AI Travel Tips</a>
<nav>
${nav}
</nav>
</div></header>
<main>
${bodyHtml}
<footer class="pagenav">${prevLink}${nextLink}</footer>
<footer class="colophon">Part of the AI Travel Tips manual · Published by Asdale Dynamics, LLC · <a href="https://opensource.org/licenses/MIT">MIT licensed</a></footer>
</main>
</body>
</html>
`;
}

export function build() {
  if (!existsSync(DOCS_DIR)) {
    throw new Error(`docs/ not found at ${DOCS_DIR} — nothing to build.`);
  }
  const source = join(ROOT, "docs");
  // allow listing pages that must exist
  for (const p of PAGES) {
    const src = join(source, p.file);
    const md = readFileSync(src, "utf8");
    const body = markdownToHtml(md);
    const title = firstHeading(md, p.title);
    const idx = PAGES.indexOf(p);
    const prev = idx > 0 ? PAGES[idx - 1] : null;
    const next = idx < PAGES.length - 1 ? PAGES[idx + 1] : null;
    const html = shell(title, body, p.file, prev, next);
    if (!existsSync(SITE_DIR)) mkdirSync(SITE_DIR, { recursive: true });
    const outFile = join(SITE_DIR, p.file.replace(/\.md$/, ".html"));
    writeFileSync(outFile, html, "utf8");
  }
  // copy any images from docs/ if present (none expected, but future-proof)
  for (const f of readdirSync(source)) {
    if (/\.(png|jpg|jpeg|svg|webp)$/i.test(f)) {
      const data = readFileSync(join(source, f));
      writeFileSync(join(SITE_DIR, basename(f)), data);
    }
  }
  return { pages: PAGES.length, outDir: SITE_DIR };
}

export function clean() {
  if (existsSync(SITE_DIR)) rmSync(SITE_DIR, { recursive: true, force: true });
}

const isMain = process.argv[1] && process.argv[1].endsWith("build.mjs");
if (isMain) {
  clean();
  const { pages, outDir } = build();
  console.log(`Built ${pages} pages into ${outDir}`);
}
