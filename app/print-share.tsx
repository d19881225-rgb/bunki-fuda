"use client";

import { useState } from "react";
import { copyLink, shareLink, type ShareResult } from "../lib/share-actions";

export function PrintShare({ title }: { title: string }) {
  const [message, setMessage] = useState("");
  const [manualUrl, setManualUrl] = useState("");

  function showResult(result: ShareResult) {
    if (result.kind === "copied") {
      setMessage("URLをコピーしました。ブックマークやメモに残せます。");
      setManualUrl("");
    } else if (result.kind === "manual") {
      setManualUrl(result.url);
      setMessage("下のURLを選択してコピーできます。");
    } else if (result.kind === "shared") {
      setMessage("共有しました。");
      setManualUrl("");
    }
  }

  async function copyUrl() {
    showResult(await copyLink(window.location.href, navigator.clipboard?.writeText.bind(navigator.clipboard)));
  }

  async function share() {
    showResult(await shareLink(`${title}｜分岐札`, window.location.href, navigator.share?.bind(navigator), navigator.clipboard?.writeText.bind(navigator.clipboard)));
  }

  return (
    <section className="reuse-section" aria-label="この札をまた使う">
      <h2>また使いたいときは。</h2><p>URLを残すか、紙に印刷できます。</p>
      <div className="detail-actions"><button onClick={() => window.print()} type="button">印刷する</button><button onClick={copyUrl} type="button">URLをコピー</button><button onClick={share} type="button">共有する</button></div>
      <p className="share-status" role="status">{message}</p>
      {manualUrl && <label className="manual-copy">この札のURL<input value={manualUrl} readOnly onFocus={(event) => event.target.select()} aria-label="この札のURL" /></label>}
    </section>
  );
}
