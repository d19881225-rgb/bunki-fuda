"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cards, categories, type CategoryKey } from "../lib/cards";
import { filterCards } from "../lib/card-selection";

const searchExamples = ["メール", "片付け", "勉強", "スマホ"];

export function CardLibrary() {
  const [category, setCategory] = useState<CategoryKey | "all">("all");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => filterCards(cards, category, query), [category, query]);
  const acrossCategories = useMemo(() => category === "all" ? filtered : filterCards(cards, "all", query), [category, query, filtered]);
  function reset() { setCategory("all"); setQuery(""); }
  function searchExample(word: string) { setCategory("all"); setQuery(word); }

  return (
    <>
      <div className="library-tools">
        <label htmlFor="library-search">今の状況を言葉で探す</label>
        <div className="search-row">
          <div className="search-control"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
          <input id="library-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="例：メール" autoComplete="off" maxLength={100} aria-describedby="search-hint" />
          </div>
          {(query || category !== "all") && <button type="button" className="text-button" onClick={reset}>絞り込みを解除</button>}
        </div>
        <p className="search-hint" id="search-hint">ひらがな・カタカナどちらでも検索できます。スペースで区切ると、すべての言葉を含む札を探します。</p>
        <div className="search-examples" role="group" aria-label="検索例"><span>言葉に迷ったら</span>{searchExamples.map((word) => <button className="example-chip" type="button" key={word} onClick={() => searchExample(word)}>{word}</button>)}</div>
        <fieldset className="library-filters">
          <legend>カテゴリで絞り込む</legend>
          <div className="filter-row">
            <button type="button" aria-pressed={category === "all"} className={category === "all" ? "filter-chip active" : "filter-chip"} onClick={() => setCategory("all")}>すべて <span>{cards.length}</span></button>
            {categories.map((item) => <button key={item.key} type="button" data-category={item.key} aria-pressed={category === item.key} className={category === item.key ? "filter-chip active" : "filter-chip"} onClick={() => setCategory(item.key)}>{item.label} <span>{cards.filter((card) => card.category === item.key).length}</span></button>)}
          </div>
        </fieldset>
      </div>
      <p className="result-count" role="status">{filtered.length}枚の札{category !== "all" && `・${categories.find((item) => item.key === category)?.label}`}{query.trim() && `・「${query.trim()}」`}</p>
      <noscript><p>検索・絞り込みにはJavaScriptが必要です。下の全{cards.length}枚はそのまま読めます。</p></noscript>
      {filtered.length ? <div className="card-grid" data-count={filtered.length}>
        {filtered.map((card) => <Link className="fuda-card" href={`/fuda/${card.slug}`} key={card.slug} data-category={card.category}>
          <div className="fuda-topline"><span className="category-badge">{categories.find((item) => item.key === card.category)?.label}</span><span>目安 {card.minutes}分</span></div>
          <p>{card.trigger}</p><h3>{card.title}</h3>
          <div className="fuda-footer"><span>3手順を読む</span><span aria-hidden="true">↗</span></div>
        </Link>)}
      </div> : <div className="library-empty"><h3>この条件の札はありません。</h3>{acrossCategories.length > 0 ? <><p>別のカテゴリに{acrossCategories.length}枚見つかりました。検索の言葉はそのまま、範囲を広げられます。</p><button type="button" className="secondary-button" onClick={() => setCategory("all")}>全カテゴリで探す（{acrossCategories.length}枚）</button></> : <p>短い言葉に変えるか、上の検索例を試してください。まだ扱っていない場面もあります。</p>}<button type="button" className="text-button" onClick={reset}>全{cards.length}枚に戻る</button></div>}
    </>
  );
}
