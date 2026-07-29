import Link from "next/link";

export const metadata = { title: "運営・編集原則", description: "分岐札が何を作り、何を作らないか。" };

export default function AboutPage() {
  return (
    <>
      <header className="site-header"><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true" />分岐札</Link></header>
      <main className="plain-page">
        <Link className="crumb" href="/">← ホームへ戻る</Link>
        <p className="section-number">ABOUT / EDITORIAL POLICY</p>
        <h1>失敗の後だけを、設計する。</h1>
        <p>分岐札は、崩れた習慣・止まった作業・散らかった生活に「再開点」を置くための短い手順ライブラリです。成功法ではなく、失敗後の接続方法を集めています。</p>
        <section className="plain-section">
          <h2>編集原則</h2>
          <ul>
            <li>3〜5分で入口が作れること</li><li>新しい道具の購入を前提にしないこと</li>
            <li>気合い・性格・自己責任で説明しないこと</li><li>終了条件を必ず書くこと</li>
            <li>医療・法律・金融など、専門判断の代わりをしないこと</li>
          </ul>
        </section>
        <section className="plain-section">
          <h2>AIとの関係</h2>
          <p>AIは、失敗場面の分解、手順候補の発散、重複表現の検査に使います。公開する札は、危険な助言がないか、道具を買わせる構造になっていないか、終了条件があるかを編集基準で確認します。</p>
        </section>
        <section className="plain-section">
          <h2>運営方法</h2>
          <p>会員登録、個別相談、受託制作は行いません。サイトは静的に配信され、診断は閲覧中の端末内だけで動きます。将来広告を掲載する場合も、広告の有無で札の内容や順位を変えません。</p>
        </section>
      </main>
    </>
  );
}
