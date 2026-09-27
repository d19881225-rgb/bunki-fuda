import type { Metadata } from "next";
import "./globals.css";
import { siteUrl, siteTitle, siteDescription } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: "%s｜分岐札" },
  description: siteDescription,
  alternates: { canonical: `${siteUrl}/` },
  applicationName: "分岐札",
  keywords: ["習慣", "先延ばし", "リセット", "ルーティン", "集中", "再開"],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    images: [{ url: `${siteUrl}/social-preview.png`, width: 1200, height: 630, alt: "分岐札：失敗した日の、次の一手。" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [`${siteUrl}/social-preview.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body><a className="skip-link" href="#main-content">本文へ進む</a>{children}</body>
    </html>
  );
}
