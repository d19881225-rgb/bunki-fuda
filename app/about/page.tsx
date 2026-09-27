import Link from "next/link";
import { SiteHeader, SiteFooter } from "../site-chrome";
import { pageMetadata } from "../../lib/site";

export const metadata = pageMetadata("運営・編集原則", "分岐札の編集方針、AIの使い方、無料・登録不要の運営方法。", "/about/");

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="plain-page" id="main-content">
        <Link className="crumb" href="/">← ホームへ戻る</Link>
        <p className="section-number">ABOUT / EDITORIAL POLICY</p>
        <h1>失敗の後だけを、設計する。</h1>
        <p>分岐札は、崩れた習慣・止まった作業・散らかった生活に「再開点」を置くための短い手順ライブラリです。成功法ではなく、失敗後の接続方法を集めています。</p>
        <section className="plain-section">
          <h2>編集原則</h2>
          <ul>
            <li>2〜5分を目安に試せる小さな手順であること</li><li>新しい道具の購入を前提にしないこと</li>
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
          <p>全20枚を無料で公開しています。会員登録、個別相談、受託制作は行いません。札の選択、検索、手順チェックは閲覧中のブラウザ内で動き、外部AIへ入力を送る機能はありません。所要時間は目安で、効果や作業の完了を保証するものではありません。</p>
        </section>
        <section className="plain-section">
          <h2>今回の更新</h2><p>2026年9月28日：全20枚の検索・カテゴリ絞り込み、状況の選び直し、手順チェックを追加しました。印刷・URLコピー・関連札から繰り返し使えます。</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
