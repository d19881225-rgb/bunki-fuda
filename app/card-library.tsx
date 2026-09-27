"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cards, categories, type CategoryKey } from "../lib/cards";
import { filterCards } from "../lib/card-selection";

export function CardLibrary() {
  const [category, setCategory] = useState<CategoryKey | "all">("all");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => filterCards(cards, category, query), [category, query]);
  function reset() { setCategory("all"); setQuery(""); }

  return (
    <>
      <div className="library-tools">
        <label htmlFor="library-search">今の状況を言葉で探す</label>
        <div className="search-row">
          <input id="library-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="例：洗い物、資料、スマホ" autoComplete="off" maxLength={100} />
          {(query || category !== "all") && <button type="button" className="text-button" onClick={reset}>絞り込みを解除</button>}
        </div>
        <fieldset className="library-filters">
          <legend>カテゴリで絞り込む</legend>
          <div className="filter-row">
            <button type="button" aria-pressed={category === "all"} className={category === "all" ? "filter-chip active" : "filter-chip"} onClick={() => setCategory("all")}>すべて <span>{cards.length}</span></button>
            {categories.map((item) => <button key={item.key} type="button" aria-pressed={category === item.key} className={category === item.key ? "filter-chip active" : "filter-chip"} onClick={() => setCategory(item.key)}>{item.label} <span>{cards.filter((card) => card.category === item.key).length}</span></button>)}
          </div>
        </fieldset>
      </div>
      <p className="result-count" role="status">{filtered.length}枚の札{category !== "all" && `・${categories.find((item) => item.key === category)?.label}`}{query.trim() && `・「${query.trim()}」`}</p>
      <noscript><p>検索・絞り込みにはJavaScriptが必要です。下の全20枚はそのまま読めます。</p></noscript>
      {filtered.length ? <div className="card-grid">
        {filtered.map((card) => <Link className="fuda-card" href={`/fuda/${card.slug}`} key={card.slug}>
          <div className="fuda-topline"><span>{categories.find((item) => item.key === card.category)?.label}</span><span>目安 {card.minutes}分</span></div>
          <p>{card.trigger}</p><h3>{card.title}</h3>
          <div className="fuda-footer"><span>3手順を読む</span><span aria-hidden="true">↗</span></div>
        </Link>)}
      </div> : <div className="library-empty"><h3>この条件の札はありません。</h3><p>短い言葉に変えるか、絞り込みを解除して探せます。</p><button type="button" className="secondary-button" onClick={reset}>全20枚に戻る</button></div>}
    </>
  );
}
