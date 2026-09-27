import Link from "next/link";
import { SiteHeader, SiteFooter } from "./site-chrome";

export default function NotFound() {
  return <><SiteHeader /><main className="plain-page" id="main-content"><p className="section-number">404 / NOT FOUND</p><h1>この札は見つかりませんでした。</h1><p>URLを確認するか、全20枚から近い状況を探せます。</p><Link className="primary-link" href="/#library">全20枚を探す →</Link></main><SiteFooter /></>;
}
