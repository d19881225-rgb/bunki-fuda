import Link from "next/link";
import { RecoveryPicker } from "./recovery-picker";
import { CardLibrary } from "./card-library";
import { SiteHeader, SiteFooter } from "./site-chrome";
import { FudaPreview } from "./fuda-preview";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span aria-hidden="true" />止まった日から始める、20枚の小さな手順書</p>
            <h1>
              失敗した日の、
              <br />
              <span>次の一手。</span>
            </h1>
            <p className="hero-lead">
              寝坊した朝。白紙の資料。たまった洗い物。
              <br />
              今の状況から、2〜5分を目安にできる小さな3手順を選べます。
            </p>
            <div className="hero-actions"><a className="primary-link" href="#picker">今の状況から選ぶ <span aria-hidden="true">↓</span></a><a className="hero-secondary" href="#library">全20枚を探す →</a></div>
            <p className="hero-note">無料・登録不要。全部を取り戻さなくても大丈夫。</p>
          </div>

          <FudaPreview />
        </section>

        <section className="principle-strip" aria-label="分岐札の原則">
          <span>気合い不要</span>
          <span>道具の購入不要</span>
          <span>登録不要</span>
          <span>端末内で完結</span>
        </section>

        <section className="picker-section" id="picker">
          <div className="section-intro">
            <p className="section-number">01 / PICK</p>
            <h2>いま、何が止まった？</h2>
            <p>場面と気力を選ぶと、まず一枚。具体的な状況に合わせて選び直せます。選択内容は送信・保存しません。</p>
          </div>
          <RecoveryPicker />
        </section>

        <section className="library-section" id="library">
          <div className="section-intro library-heading">
            <div>
              <p className="section-number">02 / LIBRARY</p>
              <h2>今に合う札を探す。</h2>
            </div>
            <p>
              5つの場面、全20枚。
              <br />
              状況の言葉やカテゴリから探せます。
            </p>
          </div>

          <CardLibrary />
        </section>

        <section className="howto-section" id="howto" aria-labelledby="howto-heading">
          <div className="section-intro"><p className="section-number">03 / HOW TO</p><h2 id="howto-heading">一枚の使い方。</h2><p>全部を取り戻そうとしなくて大丈夫。再開する入口だけ、つくります。</p></div>
          <ol className="howto-grid">
            <li><span>01</span><h3>今の状況を見つける</h3><p>場面と気力で選ぶか、検索から近い札を開きます。</p></li>
            <li><span>02</span><h3>できる一手から試す</h3><p>手順は3つ。重ければ「それも重いなら」の小さな一手へ。</p></li>
            <li><span>03</span><h3>終了条件で一区切り</h3><p>終えてよい目安に届いたら終了。手順を自分のメモにコピーするか、印刷やURLを残してまた使えます。</p></li>
          </ol>
          <div className="faq"><h3>よくある疑問</h3>
            <details><summary>3手順すべてを終える必要がありますか？</summary><p>ありません。一つだけでも終了条件に届けば一区切りです。気力が足りない場合は、詳細ページの「それも重いなら」を試せます。</p></details>
            <details><summary>入力やチェック内容は保存されますか？</summary><p>保存・送信しません。ページを離れると消えます。同じ札をまた使うには、URLをブックマークするか印刷してください。</p></details>
            <details><summary>お金や登録は必要ですか？</summary><p>すべて無料です。会員登録も、個別相談の申し込みもありません。</p></details>
          </div>
        </section>

        <section className="manifesto">
          <p className="section-number">04 / WHY</p>
          <blockquote>
            止まったところに、
            <br />
            <span>再開点</span>をひとつ。
          </blockquote>
          <div className="manifesto-copy">
            <p>
              大きな計画は「調子がいい自分」を前提にします。分岐札が設計するのは、その前提が壊れた後。
              一枚は2〜5分が目安。作業を全部終えることではなく、もう一度触れられる入口を目的にしています。
            </p>
            <Link href="/about">編集原則を読む →</Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
