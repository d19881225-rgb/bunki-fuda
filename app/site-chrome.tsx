import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="分岐札 ホーム"><span className="brand-mark" aria-hidden="true" />分岐札</Link>
      <nav aria-label="メインナビゲーション">
        <Link href="/#picker">札を選ぶ</Link>
        <Link href="/#library">札を探す</Link>
        <Link href="/#howto">使い方</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div><Link className="brand footer-brand" href="/"><span className="brand-mark" aria-hidden="true" />分岐札</Link><p>失敗を、分岐点に。</p></div>
      <nav aria-label="フッターナビゲーション">
        <Link href="/about">運営・編集原則</Link><Link href="/privacy">プライバシー</Link><Link href="/#library">全20枚を探す</Link>
      </nav>
      <small>© 2026 BUNKI FUDA<br />更新：2026.09.28</small>
    </footer>
  );
}
