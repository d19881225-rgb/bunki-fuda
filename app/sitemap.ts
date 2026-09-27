import type { MetadataRoute } from "next";
import { cards } from "../lib/cards";
import { siteUrl } from "../lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteUrl;
  return [
    { url: `${origin}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${origin}/about/`, changeFrequency: "monthly", priority: .5 },
    { url: `${origin}/privacy/`, changeFrequency: "yearly", priority: .3 },
    ...cards.map((card) => ({ url: `${origin}/fuda/${card.slug}/`, changeFrequency: "monthly" as const, priority: .8 })),
  ];
}
