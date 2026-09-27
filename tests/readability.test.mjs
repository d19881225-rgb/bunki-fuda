import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

function luminance(hex) {
  const channels = hex.match(/[0-9a-f]{2}/gi).map((value) => parseInt(value, 16) / 255)
    .map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return channels.reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
}

test("main text/background combinations exceed a 4.5:1 contrast ratio", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const colors = Object.fromEntries([...css.matchAll(/--([\w-]+): (#[0-9a-f]{6});/g)].map((match) => [match[1], match[2]]));
  for (const [foreground, background] of [
    ["muted", "paper"], ["muted", "paper-deep"], ["muted", "lime"],
    ["ink", "paper"], ["ink", "lime"], ["paper", "red"], ["red", "paper"], ["red", "lime"],
    ["ink", "surface"], ["muted", "surface"], ["red", "paper-deep"],
    ...["morning", "work", "study", "home", "night"].flatMap((category) => [["ink", category], ["muted", category]]),
  ]) {
    const values = [luminance(colors[foreground]), luminance(colors[background])];
    const ratio = (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
    assert.ok(ratio >= 4.5, `${foreground}/${background}: ${ratio}`);
  }
  assert.match(css, /input::placeholder\s*\{[^}]*color: var\(--muted\);[^}]*opacity: 1;/);
});

test("the interface keeps reduced-motion and keyboard focus styles", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /:focus-visible\s*\{[^}]*outline: 3px solid/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /transition: none !important/);
  assert.match(css, /\.hero-preview\s*\{[^}]*isolation: isolate/);
  assert.doesNotMatch(css, /\.hero-preview\s*\{[^}]*display: none/);
});
