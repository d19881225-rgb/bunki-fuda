"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cards, categories, type CategoryKey, type Energy } from "../lib/cards";
import { getRecoveryCandidates } from "../lib/card-selection";

const energyOptions: { value: Energy; label: string; note: string }[] = [
  { value: "low", label: "ほぼ空", note: "考える力も残っていない" },
  { value: "normal", label: "少しある", note: "短い手順なら動けそう" },
];

export function RecoveryPicker() {
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [energy, setEnergy] = useState<Energy | null>(null);
  const [offset, setOffset] = useState(0);

  const candidates = useMemo(() => category && energy ? getRecoveryCandidates(cards, category, energy) : [], [category, energy]);
  const result = candidates.length ? candidates[offset % candidates.length] : null;

  return (
    <div className="picker">
      <fieldset>
        <legend>
          <span>1</span> 止まった場所
        </legend>
        <div className="choice-row">
          {categories.map((item) => (
            <button
              aria-pressed={category === item.key}
              className={category === item.key ? "choice active" : "choice"}
              key={item.key}
              onClick={() => {
                setCategory(item.key);
                setOffset(0);
              }}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <span>2</span> 残りの気力
        </legend>
        <div className="energy-row">
          {energyOptions.map((item) => (
            <button
              aria-pressed={energy === item.value}
              className={energy === item.value ? "energy-choice active" : "energy-choice"}
              key={item.value}
              onClick={() => {
                setEnergy(item.value);
                setOffset(0);
              }}
              type="button"
            >
              <strong>{item.label}</strong>
              <small>{item.note}</small>
            </button>
          ))}
        </div>
      </fieldset>

      {candidates.length > 0 && <div className="scenario-choice"><label htmlFor="picker-scenario">具体的な状況に合わせる（任意）</label><select id="picker-scenario" value={result?.slug ?? ""} onChange={(event) => setOffset(candidates.findIndex((card) => card.slug === event.target.value))}>{candidates.map((card) => <option value={card.slug} key={card.slug}>{card.trigger}</option>)}</select></div>}
      <div className={result ? "picker-result ready" : "picker-result"} aria-live="polite" aria-atomic="true">
        {result ? (
          <>
            <div className="result-meta">
              <span>今の一枚</span>
              <span>目安 {result.minutes}分</span>
            </div>
            <p>{result.trigger}</p>
            <h3>{result.title}</h3>
            <ol>
              {result.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <div className="result-actions">
              <Link href={`/fuda/${result.slug}`}>この札を開く →</Link>
              <button type="button" disabled={candidates.length < 2} onClick={() => setOffset((value) => value + 1)}>
                別の札
              </button>
            </div>
          </>
        ) : (
          <div className="empty-result">
            <span aria-hidden="true">↳</span>
            <p>
              {category ? "あと一つ、残りの気力を選ぶと、" : energy ? "あと一つ、場面を選ぶと、" : "場面と気力を選ぶと、"}
              <br />
              ここに一枚だけ現れます。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
