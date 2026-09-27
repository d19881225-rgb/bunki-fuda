import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { cards } from "../lib/cards.ts";

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
  }
});
