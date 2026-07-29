import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../lib/cards.ts", import.meta.url), "utf8");

test("the library contains twenty complete cards", () => {
  assert.equal((source.match(/slug: "/g) ?? []).length, 20);
  assert.equal((source.match(/stopRule: "/g) ?? []).length, 20);
  assert.equal((source.match(/branch: "/g) ?? []).length, 20);
});

test("every slug is unique", () => {
  const slugs = [...source.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
  assert.equal(slugs.length, new Set(slugs).size);
});
