import Link from "next/link";

export const metadata = { title: "プライバシー", description: "分岐札のプライバシー方針。" };

export default function PrivacyPage() {
  return (
    <>
      <header className="site-header"><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true" />分岐札</Link></header>
      <main className="plain-page">
        <Link className="crumb" href="/">← ホームへ戻る</Link>
        <p className="section-number">PRIVACY / 2026.07.29</p>
        <h1>入力を、集めない。</h1>
        <p>分岐札の診断機能はブラウザ内で完結し、選択内容をサーバーへ送信・保存しません。</p>
        <section className="plain-section">
          <h2>現在のデータ取扱い</h2>
          <p>アカウント作成、フォーム送信、コメント、問い合わせ受付はありません。端末内の選択状態もページを閉じると消えます。配信基盤がセキュリティや障害対応のために通常のアクセス記録を一時処理する場合があります。</p>
        </section>
        <section className="plain-section">
          <h2>広告を掲載する場合</h2>
          <p>将来、Google AdSense等の第三者広告を有効にした場合、広告配信事業者がCookieや類似技術を使用することがあります。有効化時は、同意表示と必要な開示を追加し、各地域の法令・広告配信事業者のポリシーに従います。</p>
        </section>
        <section className="plain-section">
          <h2>免責</h2>
          <p>掲載内容は日常の作業再開を補助する一般情報です。医療、心理、法律、金融、安全上の専門助言ではありません。緊急性や個別事情がある場合は、適切な専門機関の案内を優先してください。</p>
        </section>
      </main>
    </>
  );
}
