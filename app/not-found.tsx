import Link from "next/link";
import { SiteHeader, SiteFooter } from "./site-chrome";
import { cards } from "../lib/cards";

export default function NotFound() {
  return <><SiteHeader /><main className="plain-page" id="main-content"><p className="section-number">404 / NOT FOUND</p><h1>この札は見つかりませんでした。</h1><p>URLを確認するか、全{cards.length}枚から近い状況を探せます。</p><Link className="primary-link" href="/#library">全{cards.length}枚を探す →</Link></main><SiteFooter /></>;
}
