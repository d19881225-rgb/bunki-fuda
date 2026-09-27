import assert from "node:assert/strict";
import test from "node:test";
import { cards } from "../lib/cards.ts";
import { formatCardForCopy } from "../lib/card-copy.ts";
import { copyText } from "../lib/share-actions.ts";

test("every copied card includes exactly three numbered steps, fallback, stopping rule, and source", () => {
  for (const card of cards) {
    const url = `https://d19881225-rgb.github.io/bunki-fuda/fuda/${card.slug}/`;
    const text = formatCardForCopy(card, url);
    assert.ok(text.startsWith(`${card.title}｜分岐札\n状況：${card.trigger}\n目安：${card.minutes}分\n`));
    assert.equal(text.split("\n").filter((line) => /^\d+\. /.test(line)).length, 3);
    card.steps.forEach((step, index) => assert.ok(text.includes(`${index + 1}. ${step}`)));
    assert.ok(text.includes(`それも重いなら：${card.branch}`));
    assert.ok(text.includes(`ここで終えてよい目安：${card.stopRule}`));
    assert.ok(text.endsWith(`出典：${url}`));
    assert.doesNotMatch(text, /searchTerms|チェック済み|検索入力/);
  }
});

test("full procedure copies successfully or remains available for manual copying", async () => {
  const text = formatCardForCopy(cards[0], "https://example.com/card/");
  let copied;
  assert.deepEqual(await copyText(text, async (value) => { copied = value; }), { kind: "copied" });
  assert.equal(copied, text);
  assert.deepEqual(await copyText(text), { kind: "manual", text });
  assert.deepEqual(await copyText(text, async () => { throw new Error("denied"); }), { kind: "manual", text });
});
