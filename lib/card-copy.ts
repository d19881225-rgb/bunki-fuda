import type { FudaCard } from "./cards";

export type CopyableCard = Pick<FudaCard, "title" | "trigger" | "minutes" | "steps" | "branch" | "stopRule">;

export function formatCardForCopy(card: CopyableCard, url: string) {
  return [
    `${card.title}｜分岐札`,
    `状況：${card.trigger}`,
    `目安：${card.minutes}分`,
    "",
    ...card.steps.map((step, index) => `${index + 1}. ${step}`),
    "",
    `それも重いなら：${card.branch}`,
    `ここで終えてよい目安：${card.stopRule}`,
    "",
    "一つだけでも、終了条件に届いたら止めて大丈夫です。",
    `出典：${url}`,
  ].join("\n");
}
