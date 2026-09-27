"use client";

import { useState } from "react";
import { copyLink, copyText, shareLink, type ShareResult } from "../lib/share-actions";
import { formatCardForCopy, type CopyableCard } from "../lib/card-copy";

export function PrintShare({ card, url }: { card: CopyableCard; url: string }) {
  const [message, setMessage] = useState("");
  const [manual, setManual] = useState<{ kind: "url" | "steps"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  function showResult(result: ShareResult) {
    if (result.kind === "copied") {
      setMessage("URLをコピーしました。ブックマークやメモに残せます。");
      setManual(null);
    } else if (result.kind === "manual") {
      setManual({ kind: "url", text: result.url });
      setMessage("下のURLを選択してコピーできます。");
    } else if (result.kind === "shared") {
      setMessage("共有しました。");
      setManual(null);
    } else {
      setMessage("共有を取りやめました。");
      setManual(null);
    }
  }

  async function copyUrl() {
    setBusy(true);
    try { showResult(await copyLink(url, navigator.clipboard?.writeText.bind(navigator.clipboard))); }
    finally { setBusy(false); }
  }

  async function copySteps() {
    setBusy(true);
    try {
      const result = await copyText(formatCardForCopy(card, url), navigator.clipboard?.writeText.bind(navigator.clipboard));
      if (result.kind === "copied") {
        setMessage("3手順と終了条件をコピーしました。自分のメモに貼り付けて使えます。");
        setManual(null);
      } else {
        setMessage("自動コピーが使えません。下の3手順を選択してコピーできます。");
        setManual({ kind: "steps", text: result.text });
      }
    } finally { setBusy(false); }
  }

  async function share() {
    setBusy(true);
    try { showResult(await shareLink(`${card.title}｜分岐札`, url, navigator.share?.bind(navigator), navigator.clipboard?.writeText.bind(navigator.clipboard))); }
    finally { setBusy(false); }
  }

  return (
    <section className="reuse-section" aria-label="この札をまた使う">
      <h2>また使いたいときは。</h2><p>3手順を自分のメモに貼り付けるか、URLや印刷で残せます。コピーは端末内で行い、内容を自動送信しません。</p>
      <div className="detail-actions"><button onClick={copySteps} disabled={busy} type="button">3手順をコピー</button><button onClick={() => window.print()} type="button">印刷する</button><button onClick={copyUrl} disabled={busy} type="button">URLをコピー</button><button onClick={share} disabled={busy} type="button">共有する</button></div>
      <p className="share-status" role="status">{message}</p>
      {manual && (manual.kind === "url" ? <label className="manual-copy">この札のURL<input value={manual.text} readOnly onFocus={(event) => event.target.select()} /></label> : <label className="manual-copy">コピー用の3手順<textarea value={manual.text} readOnly rows={12} onFocus={(event) => event.target.select()} /></label>)}
    </section>
  );
}
