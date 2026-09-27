import type { CategoryKey, Energy, FudaCard } from "./cards";

export function getRecoveryCandidates(collection: FudaCard[], category: CategoryKey, energy: Energy) {
  return collection.filter((card) => card.category === category && (card.energy === energy || card.energy === "any"));
}

export function normalizeSearchText(value: string) {
  return value.normalize("NFKC").toLocaleLowerCase("ja")
    .replace(/[ァ-ヶ]/g, (character) => String.fromCharCode(character.charCodeAt(0) - 0x60));
}

export function filterCards(collection: FudaCard[], category: CategoryKey | "all", query: string) {
  const words = normalizeSearchText(query).trim().split(/\s+/).filter(Boolean);
  return collection.filter((card) => {
    if (category !== "all" && card.category !== category) return false;
    const text = normalizeSearchText([card.trigger, card.title, ...card.steps, card.branch, card.stopRule, card.why, ...card.searchTerms].join(" "));
    return words.every((word) => text.includes(word));
  });
}
