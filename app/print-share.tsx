"use client";

import { useState } from "react";

export function PrintShare({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    if (navigator.share) {
      await navigator.share({ title: `${title}｜分岐札`, url: window.location.href });
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="detail-actions">
      <button onClick={() => window.print()} type="button">印刷する</button>
      <button onClick={share} type="button">{copied ? "URLをコピーしました" : "この札を共有"}</button>
    </div>
  );
}
