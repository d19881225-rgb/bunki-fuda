import Link from "next/link";
import { getCard } from "../lib/cards";

export function FudaPreview() {
  const card = getCard("sink-pile");
  if (!card) return null;

  return (
    <aside className="hero-preview" aria-labelledby="preview-intro">
      <p className="preview-caption" id="preview-intro">たとえば、こんな一枚。</p>
      <Link className="preview-card" href={`/fuda/${card.slug}`} data-preview-card={card.slug}>
        <div className="preview-meta"><span className="category-badge" data-category={card.category}>家事の札</span><span>目安 {card.minutes}分</span></div>
        <p className="preview-trigger">{card.trigger}</p>
        <h2>{card.title}</h2>
        <ol>{card.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        <p className="preview-stop"><span>ここで終えてよい目安</span>{card.stopRule}</p>
        <div className="preview-open"><span>この札を開く</span><span aria-hidden="true">↗</span></div>
      </Link>
      <p className="preview-note">一枚の中に、3手順と「終えていい目安」。</p>
    </aside>
  );
}
