import assert from "node:assert/strict";
import test from "node:test";
import { cards } from "../lib/cards.ts";

test("the library contains twenty-five complete cards", () => {
  assert.equal(cards.length, 25);
  for (const card of cards) {
    assert.equal(card.steps.length, 3, card.slug);
    assert.ok(card.steps.every((step) => step.trim()), card.slug);
    assert.ok(card.branch.trim() && card.stopRule.trim() && card.why.trim(), card.slug);
    assert.ok(card.minutes >= 2 && card.minutes <= 5, card.slug);
  }
});

test("every slug is unique", () => {
  const slugs = cards.map((card) => card.slug);
  assert.equal(slugs.length, new Set(slugs).size);
});
