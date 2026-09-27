import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { cards, getCard } from "../lib/cards.ts";

const outRoot = new URL("../out/", import.meta.url);

test("exports the home, policy, sitemap, and all twenty card pages", async () => {
  await Promise.all([
    access(new URL("index.html", outRoot)),
    access(new URL("about/index.html", outRoot)),
    access(new URL("privacy/index.html", outRoot)),
    access(new URL("robots.txt", outRoot)),
    access(new URL("sitemap.xml", outRoot)),
    access(new URL("404.html", outRoot)),
    ...cards.map((card) => access(new URL(`fuda/${card.slug}/index.html`, outRoot))),
  ]);

  const sitemap = await readFile(new URL("sitemap.xml", outRoot), "utf8");
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 23);
});

test("the hero previews a real card with its three steps and stopping rule", async () => {
  const html = await readFile(new URL("index.html", outRoot), "utf8");
  const preview = html.match(/<a[^>]*data-preview-card="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
  assert.ok(preview, "actual card preview is rendered");
  const card = getCard(preview[1]);
  assert.ok(card);
  assert.ok(preview[2].includes(card.title));
  assert.ok(preview[2].includes(card.trigger));
  assert.ok(preview[2].includes(card.stopRule));
  for (const step of card.steps) assert.ok(preview[2].includes(step));
  assert.doesNotMatch(html, /class="hero-diagram"/);
});

test("the library and all details render the new card surfaces with category labels", async () => {
  const html = await readFile(new URL("index.html", outRoot), "utf8");
  assert.equal((html.match(/class="fuda-card"/g) ?? []).length, 20);
  assert.match(html, /class="card-grid" data-count="20"/);
  assert.match(html, /class="search-control"/);
  for (const card of cards) {
    const detail = await readFile(new URL(`fuda/${card.slug}/index.html`, outRoot), "utf8");
    assert.ok(detail.includes(`class="detail-sheet" data-category="${card.category}"`));
    assert.match(detail, /class="category-badge"/);
  }
});

test("uses the GitHub Pages base path for assets and navigation", async () => {
  const html = await readFile(new URL("index.html", outRoot), "utf8");
  assert.match(html, /\/bunki-fuda\/_next\/static\//);
  assert.match(html, /href="\/bunki-fuda\/about\/?"/);
  assert.match(html, /分岐札/);
  assert.match(html, /失敗した日の、/);
  assert.match(html, /id="library-search"/);
  for (const card of cards) assert.match(html, new RegExp(`href="/bunki-fuda/fuda/${card.slug}/"`));
});

test("every page has its own canonical URL and every card has its own share title", async () => {
  for (const path of ["", "about/", "privacy/", ...cards.map((card) => `fuda/${card.slug}/`)]) {
    const html = await readFile(new URL(`${path}index.html`, outRoot), "utf8");
    assert.ok(html.includes(`rel="canonical" href="https://d19881225-rgb.github.io/bunki-fuda/${path}"`), `canonical for ${path}`);
    assert.doesNotMatch(html, /localhost:3000|pagead2\.googlesyndication/);
    assert.match(html, /id="main-content"/);
  }
  for (const card of cards) {
    const html = await readFile(new URL(`fuda/${card.slug}/index.html`, outRoot), "utf8");
    assert.ok(html.includes(`property="og:title" content="${card.title}｜分岐札"`));
    assert.match(html, /type="checkbox"/);
    assert.match(html, /同じ場面の、別の札。/);
    assert.match(html, /3手順をコピー/);
    assert.match(html, /内容を自動送信しません/);
  }
});

test("home explains matching and exposes search examples without storing user input", async () => {
  const html = await readFile(new URL("index.html", outRoot), "utf8");
  assert.match(html, /aria-describedby="search-hint"/);
  assert.match(html, /ひらがな・カタカナどちらでも検索できます/);
  assert.match(html, /aria-label="検索例"/);
  for (const term of ["メール", "片付け", "勉強", "スマホ"]) assert.ok(html.includes(`>${term}</button>`));
});
