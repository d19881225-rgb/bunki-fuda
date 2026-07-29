import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrintShare } from "../../print-share";
import { cards, categories, getCard } from "../../../lib/cards";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cards.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const card = getCard(slug);
  if (!card) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    title: card.title,
    description: `${card.trigger}ときの${card.minutes}分復帰手順。${card.steps.join("。")}。`,
    alternates: { canonical: `${siteUrl}/fuda/${card.slug}/` },
  };
}

export default async function FudaPage({ params }: PageProps) {
  const { slug } = await params;
  const card = getCard(slug);
  if (!card) notFound();

  const category = categories.find((item) => item.key === card.category);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: card.title,
    description: card.trigger,
    totalTime: `PT${card.minutes}M`,
    step: card.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: step,
    })),
  };

  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true" />分岐札
        </Link>
        <nav><Link href="/#picker">札をひく</Link><Link href="/about">この場所について</Link></nav>
      </header>
      <main className="detail-page">
        <Link className="crumb" href="/#library">← 標本箱へ戻る</Link>
        <div className="detail-kicker">
          <span>{category?.label} / RECOVERY FUDA</span><span>{card.minutes} MIN</span>
        </div>
        <p className="detail-trigger">{card.trigger}</p>
        <h1>{card.title}</h1>
        <ol className="protocol">
          {card.steps.map((step) => <li key={step}><strong>{step}</strong></li>)}
        </ol>
        <div className="branch-box"><span>IF / それも重いなら</span><p>{card.branch}</p></div>
        <div className="stop-rule">終了条件：{card.stopRule}</div>
        <section className="detail-note">
          <h2>この札の設計意図</h2><p>{card.why}</p>
        </section>
        <PrintShare title={card.title} />
      </main>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
    </>
  );
}
