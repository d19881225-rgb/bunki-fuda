export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://d19881225-rgb.github.io/bunki-fuda").replace(/\/$/, "");
export const siteTitle = "分岐札｜2〜5分で、次の一手。";
export const siteDescription = "寝坊、白紙の資料、たまった洗い物。朝・仕事・学び・家事・夜の20場面から、作業を再開する小さな3手順を探せます。無料・登録不要。";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description, alternates: { canonical: `${siteUrl}${path}` },
    openGraph: { type: "website", locale: "ja_JP", title: `${title}｜分岐札`, description, url: `${siteUrl}${path}`, images: [{ url: `${siteUrl}/social-preview.png`, width: 1200, height: 630, alt: "分岐札：失敗した日の、次の一手。" }] },
    twitter: { card: "summary_large_image", title: `${title}｜分岐札`, description, images: [`${siteUrl}/social-preview.png`] },
  };
}
import type { Metadata } from "next";
