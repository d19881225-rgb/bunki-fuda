import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrintShare } from "../../print-share";
import { cards, categories, getCard } from "../../../lib/cards";
import { ProtocolChecklist } from "../../protocol-checklist";
import { SiteHeader, SiteFooter } from "../../site-chrome";
import { siteUrl } from "../../../lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cards.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const card = getCard(slug);
  if (!card) return {};
  const description = `${card.trigger}ときに、再開の入口をつくる3手順。目安${card.minutes}分。${card.steps[0]}から試せます。`;
  const url = `${siteUrl}/fuda/${card.slug}/`;
  return {
    title: card.title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", locale: "ja_JP", title: `${card.title}｜分岐札`, description, url, images: [{ url: `${siteUrl}/social-preview.png`, width: 1200, height: 630, alt: "分岐札：失敗した日の、次の一手。" }] },
    twitter: { card: "summary_large_image", title: `${card.title}｜分岐札`, description, images: [`${siteUrl}/social-preview.png`] },
  };
}

export default async function FudaPage({ params }: PageProps) {
  const { slug } = await params;
  const card = getCard(slug);
  if (!card) notFound();

  const category = categories.find((item) => item.key === card.category);
  const related = cards.filter((item) => item.category === card.category && item.slug !== card.slug);
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
      <SiteHeader />
      <main className="detail-page" id="main-content">
        <Link className="crumb" href="/#library">← 全20枚へ戻る</Link>
        <div className="detail-kicker">
          <span>{category?.label}の札</span><span>目安 {card.minutes}分</span>
        </div>
        <p className="detail-trigger">{card.trigger}</p>
        <h1>{card.title}</h1>
        <ProtocolChecklist key={card.slug} steps={card.steps} stopRule={card.stopRule} />
        <div className="branch-box"><span>IF / それも重いなら</span><p>{card.branch}</p></div>
        <section className="detail-note">
          <h2>この札の設計意図</h2><p>{card.why}</p>
        </section>
        <PrintShare key={card.slug} title={card.title} />
        <section className="related-section" aria-labelledby="related-heading"><h2 id="related-heading">同じ場面の、別の札。</h2><div className="related-list">{related.map((item) => <Link key={item.slug} href={`/fuda/${item.slug}`}><span>{item.trigger}</span><strong>{item.title}</strong><small>目安 {item.minutes}分 →</small></Link>)}</div></section>
      </main>
      <SiteFooter />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />
    </>
  );
}
