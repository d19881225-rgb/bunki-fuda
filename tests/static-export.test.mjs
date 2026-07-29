import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const outRoot = new URL("../out/", import.meta.url);

test("exports the home, policy, sitemap, and all twenty card pages", async () => {
  await Promise.all([
    access(new URL("index.html", outRoot)),
    access(new URL("about/index.html", outRoot)),
    access(new URL("privacy/index.html", outRoot)),
    access(new URL("robots.txt", outRoot)),
    access(new URL("sitemap.xml", outRoot)),
    access(new URL("fuda/overslept-morning/index.html", outRoot)),
    access(new URL("fuda/tomorrow-anxiety/index.html", outRoot)),
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
});
