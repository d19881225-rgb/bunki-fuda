"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cards, categories, type CategoryKey, type Energy } from "../lib/cards";

const energyOptions: { value: Energy; label: string; note: string }[] = [
  { value: "low", label: "ほぼ空", note: "考える力も残っていない" },
  { value: "normal", label: "少しある", note: "短い手順なら動けそう" },
];

export function RecoveryPicker() {
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [energy, setEnergy] = useState<Energy | null>(null);
  const [offset, setOffset] = useState(0);

  const result = useMemo(() => {
    if (!category || !energy) return null;
    const matching = cards.filter(
      (card) => card.category === category && (card.energy === energy || card.energy === "any"),
    );
    return matching[offset % matching.length] ?? cards.find((card) => card.category === category) ?? null;
  }, [category, energy, offset]);

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

      <div className={result ? "picker-result ready" : "picker-result"} aria-live="polite">
        {result ? (
          <>
            <div className="result-meta">
              <span>YOUR FUDA</span>
              <span>{result.minutes} MIN</span>
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
              <button type="button" onClick={() => setOffset((value) => value + 1)}>
                別の札
              </button>
            </div>
          </>
        ) : (
          <div className="empty-result">
            <span aria-hidden="true">↳</span>
            <p>
              ふたつ選ぶと、
              <br />
              ここに一枚だけ現れます。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
