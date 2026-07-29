import Link from "next/link";
import { RecoveryPicker } from "./recovery-picker";
import { cards, categories } from "../lib/cards";

export default function Home() {
  const featured = cards.slice(0, 8);

  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="分岐札 ホーム">
          <span className="brand-mark" aria-hidden="true" />
          分岐札
        </Link>
        <nav aria-label="メインナビゲーション">
          <a href="#library">札を探す</a>
          <Link href="/about">この場所について</Link>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">FAILURE-FIRST MICRO PROTOCOLS</p>
            <h1>
              失敗した日の、
              <br />
              <span>3分復帰。</span>
            </h1>
            <p className="hero-lead">
              「ちゃんとやる」は、元気な日の作戦。
              <br />
              分岐札は、止まった瞬間からやり直すための小さな手順書です。
            </p>
            <a className="primary-link" href="#picker">
              今の一枚をひく <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="hero-diagram" aria-label="一つの失敗から三つの復帰手順へ分岐する図">
            <div className="diagram-origin">
              <span>失敗</span>
              <strong>した</strong>
            </div>
            <div className="branch branch-one">
              <span>01</span>
              <b>小さくする</b>
            </div>
            <div className="branch branch-two">
              <span>02</span>
              <b>場所を変える</b>
            </div>
            <div className="branch branch-three">
              <span>03</span>
              <b>終わりを決める</b>
            </div>
          </div>
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
            <p>2つ選ぶと、20枚から今の一枚だけを返します。入力内容は送信も保存もしません。</p>
          </div>
          <RecoveryPicker />
        </section>

        <section className="library-section" id="library">
          <div className="section-intro library-heading">
            <div>
              <p className="section-number">02 / LIBRARY</p>
              <h2>復帰札の標本箱</h2>
            </div>
            <p>
              正解ではなく、再開点をつくる。
              <br />
              すべて無料で読めます。
            </p>
          </div>

          <div className="category-index" aria-label="カテゴリ一覧">
            {categories.map((category) => (
              <span key={category.key}>
                {category.label}
                <b>{cards.filter((card) => card.category === category.key).length}</b>
              </span>
            ))}
          </div>

          <div className="card-grid">
            {featured.map((card, index) => (
              <Link className="fuda-card" href={`/fuda/${card.slug}`} key={card.slug}>
                <div className="fuda-topline">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{card.minutes} MIN</span>
                </div>
                <p>{card.trigger}</p>
                <h3>{card.title}</h3>
                <div className="fuda-footer">
                  <span>{categories.find((item) => item.key === card.category)?.label}</span>
                  <span aria-hidden="true">↗</span>
                </div>
              </Link>
            ))}
          </div>

          <details className="all-cards">
            <summary>全20枚を見る</summary>
            <div className="all-card-list">
              {cards.map((card) => (
                <Link href={`/fuda/${card.slug}`} key={card.slug}>
                  <span>{card.trigger}</span>
                  <strong>{card.title}</strong>
                  <small>{card.minutes}分</small>
                </Link>
              ))}
            </div>
          </details>
        </section>

        <section className="manifesto">
          <p className="section-number">03 / WHY</p>
          <blockquote>
            習慣は、続いた日ではなく
            <br />
            <span>戻れた日</span>に強くなる。
          </blockquote>
          <div className="manifesto-copy">
            <p>
              大きな計画は「調子がいい自分」を前提にします。分岐札が設計するのは、その前提が壊れた後。
              だから、一枚は3分前後。達成よりも再接続を目的にしています。
            </p>
            <Link href="/about">編集原則を読む →</Link>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark" aria-hidden="true" />
            分岐札
          </Link>
          <p>失敗を、分岐点に。</p>
        </div>
        <nav aria-label="フッターナビゲーション">
          <Link href="/about">運営・編集原則</Link>
          <Link href="/privacy">プライバシー</Link>
          <a href="#picker">札をひく</a>
        </nav>
        <small>© 2026 BUNKI FUDA</small>
      </footer>
    </>
  );
}
