import assert from "node:assert/strict";
import test from "node:test";
import { cards, categories } from "../lib/cards.ts";
import { filterCards, getRecoveryCandidates } from "../lib/card-selection.ts";

test("all ten category and energy combinations return matching cards", () => {
  for (const category of categories) for (const energy of ["low", "normal"]) {
    const candidates = getRecoveryCandidates(cards, category.key, energy);
    assert.ok(candidates.length > 0, `${category.key}/${energy} has no candidates`);
    assert.ok(candidates.every((card) => card.category === category.key && (card.energy === energy || card.energy === "any")));
  }
});

test("all twenty cards are available, with four per category", () => {
  assert.equal(filterCards(cards, "all", "").length, 20);
  for (const category of categories) assert.equal(filterCards(cards, category.key, "").length, 4);
});

test("search matches scenarios and combines terms with the category", () => {
  assert.deepEqual(filterCards(cards, "all", "洗い物").map((card) => card.slug), ["sink-pile"]);
  assert.deepEqual(filterCards(cards, "work", "資料　空欄").map((card) => card.slug), ["blank-document"]);
  assert.equal(filterCards(cards, "night", "資料").length, 0);
  assert.equal(filterCards(cards, "all", "該当しないキーワード").length, 0);
  assert.equal(filterCards(cards, "all", "　 \n ").length, 20);
});
