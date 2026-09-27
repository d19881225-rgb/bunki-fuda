"use client";

import { useState } from "react";

export function ProtocolChecklist({ steps, stopRule }: { steps: [string, string, string]; stopRule: string }) {
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const count = checked.filter(Boolean).length;
  return (
    <section className="protocol-section" aria-labelledby="protocol-heading">
      <div className="protocol-heading"><h2 id="protocol-heading">できそうな一手から。</h2><span role="status">{count} / 3 手順</span></div>
      <p className="protocol-hint">チェックは任意です。一つだけでも、下の終了条件に届いたら止めて大丈夫。</p>
      <ol className="protocol">
        {steps.map((step, index) => <li key={step} className={checked[index] ? "step-done" : ""}><label className="protocol-step"><input type="checkbox" checked={checked[index]} onChange={(event) => setChecked((current) => current.map((value, item) => item === index ? event.target.checked : value))} /><strong>{step}</strong></label></li>)}
      </ol>
      <div className="stop-rule"><span>ここで終えてよい目安</span><p>{stopRule}</p></div>
      <div className="protocol-status" aria-live="polite">{count === 3 ? "3手順にチェックが付きました。ここで一区切りにしましょう。" : "チェック内容は保存されません。ページを離れると消えます。"}</div>
      <button type="button" className="text-button reset-checks" disabled={count === 0} onClick={() => setChecked([false, false, false])}>チェックをやり直す</button>
      <noscript><p>チェックを付けるにはJavaScriptが必要です。手順と終了条件はそのまま読めます。</p></noscript>
    </section>
  );
}
