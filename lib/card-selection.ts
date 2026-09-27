import type { CategoryKey, Energy, FudaCard } from "./cards";

export function getRecoveryCandidates(collection: FudaCard[], category: CategoryKey, energy: Energy) {
  return collection.filter((card) => card.category === category && (card.energy === energy || card.energy === "any"));
}

export function filterCards(collection: FudaCard[], category: CategoryKey | "all", query: string) {
  const words = query.normalize("NFKC").toLocaleLowerCase("ja").trim().split(/\s+/).filter(Boolean);
  return collection.filter((card) => {
    if (category !== "all" && card.category !== category) return false;
    const text = [card.trigger, card.title, ...card.steps, card.branch, card.stopRule, card.why]
      .join(" ").normalize("NFKC").toLocaleLowerCase("ja");
    return words.every((word) => text.includes(word));
  });
}
