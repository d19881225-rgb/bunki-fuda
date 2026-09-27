import assert from "node:assert/strict";
import test from "node:test";
import { copyLink, shareLink } from "../lib/share-actions.ts";
const url = "https://d19881225-rgb.github.io/bunki-fuda/fuda/sink-pile/";

test("copies the current card URL when clipboard is available", async () => {
  let copied;
  assert.deepEqual(await copyLink(url, async (value) => { copied = value; }), { kind: "copied" });
  assert.equal(copied, url);
});
test("offers manual copying when clipboard is absent or denied", async () => {
  assert.deepEqual(await copyLink(url), { kind: "manual", url });
  assert.deepEqual(await copyLink(url, async () => { throw new Error("denied"); }), { kind: "manual", url });
});
test("native share cancellation does not copy anything", async () => {
  let copied = false;
  const result = await shareLink("分岐札", url, async () => { throw { name: "AbortError" }; }, async () => { copied = true; });
  assert.deepEqual(result, { kind: "cancelled" });
  assert.equal(copied, false);
});
test("failed or unsupported native sharing falls back to copying", async () => {
  assert.deepEqual(await shareLink("分岐札", url, async () => { throw new Error("unavailable"); }, async () => {}), { kind: "copied" });
  assert.deepEqual(await shareLink("分岐札", url, undefined, async () => {}), { kind: "copied" });
  assert.deepEqual(await shareLink("分岐札", url, async () => {}), { kind: "shared" });
});
