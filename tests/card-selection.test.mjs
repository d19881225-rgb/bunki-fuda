import assert from "node:assert/strict";
import test from "node:test";
import { cards, categories } from "../lib/cards.ts";
import { filterCards, getRecoveryCandidates, normalizeSearchText } from "../lib/card-selection.ts";

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

test("search treats kana, width, and Latin case consistently", () => {
  assert.equal(normalizeSearchText("ﾒｰﾙ ＰＣ スマホ"), "めーる pc すまほ");
  for (const query of ["メール", "めーる", "ﾒｰﾙ", "EMAIL", "email", "返信 メール"]) {
    assert.deepEqual(filterCards(cards, "all", query).map((card) => card.slug), ["inbox-freeze"]);
  }
  assert.deepEqual(filterCards(cards, "all", "すまほ").map((card) => card.slug), ["phone-first-morning", "late-night-scroll"]);
  assert.deepEqual(filterCards(cards, "all", "ＰＣ").map((card) => card.slug), ["tab-overload"]);
});

test("all twenty cards have usable, nonempty editorial search terms", () => {
  for (const card of cards) {
    assert.ok(card.searchTerms.length > 0, card.slug);
    assert.equal(new Set(card.searchTerms).size, card.searchTerms.length, `duplicate terms: ${card.slug}`);
    for (const term of card.searchTerms) {
      assert.ok(term.trim().length > 0, card.slug);
      assert.ok(filterCards(cards, "all", term).some((result) => result.slug === card.slug), `${card.slug}: ${term}`);
    }
  }
});

test("every suggested search has a result without mixing unrelated terms", () => {
  for (const query of ["メール", "片付け", "勉強", "スマホ"]) assert.ok(filterCards(cards, "all", query).length > 0);
  assert.ok(filterCards(cards, "home", "片付け").some((card) => card.slug === "room-reset"));
  assert.equal(filterCards(cards, "all", "メール 洗濯").length, 0);
});

test("broadening only the category keeps the searched words intact", () => {
  const query = "めーる";
  assert.equal(filterCards(cards, "home", query).length, 0);
  assert.deepEqual(filterCards(cards, "all", query).map((card) => card.slug), ["inbox-freeze"]);
});
