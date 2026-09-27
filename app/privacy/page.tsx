import Link from "next/link";
import { SiteHeader, SiteFooter } from "../site-chrome";
import { pageMetadata } from "../../lib/site";

export const metadata = pageMetadata("プライバシー", "分岐札の検索・選択・チェック内容と、配信時のデータの取扱い。", "/privacy/");

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="plain-page" id="main-content">
        <Link className="crumb" href="/">← ホームへ戻る</Link>
        <p className="section-number">PRIVACY / 2026.09.28</p>
        <h1>入力を、集めない。</h1>
        <p>札の選択、キーワード検索、手順チェックはブラウザ内で動きます。これらの入力内容をサーバーへ送信・保存する機能はありません。</p>
        <section className="plain-section">
          <h2>現在のデータ取扱い</h2>
          <p>アカウント作成、フォーム送信、コメント、問い合わせ受付はありません。選択・検索・チェックの状態はページを離れると消えます。Cookieや端末内ストレージを利用する独自の保存機能、アクセス解析、第三者広告は設けていません。GitHub Pagesなどの配信基盤は、ページの配信やセキュリティのためにIPアドレス等の通常のアクセス情報を処理することがあります。</p>
          <p>URLコピーは現在の札のURLを端末のクリップボードへ書き込みます。「共有する」は端末の共有機能を開き、送信先は利用者が選びます。</p>
          <p>配信基盤の詳しい取扱いは、<a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection">GitHub Pagesのデータ収集について</a>をご覧ください。</p>
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
      <SiteFooter />
    </>
  );
}
