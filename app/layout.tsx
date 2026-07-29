import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "分岐札｜失敗した日の、3分復帰。", template: "%s｜分岐札" },
  description: "朝、仕事、勉強、家事、夜。止まった瞬間から3分で戻るための、無料の分岐手順ライブラリ。",
  applicationName: "分岐札",
  keywords: ["習慣", "先延ばし", "リセット", "ルーティン", "集中", "再開"],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    title: "分岐札｜失敗した日の、3分復帰。",
    description: "止まった瞬間から3分で戻る、失敗ファーストの小さな手順書。",
    images: [{ url: `${siteUrl}/og.png`, width: 1536, height: 1024, alt: "分岐札" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "分岐札｜失敗した日の、3分復帰。",
    description: "止まった瞬間から3分で戻る、失敗ファーストの小さな手順書。",
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  return (
    <html lang="ja">
      <body>{children}</body>
      {adsenseClient ? (
        <Script
          async
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          strategy="afterInteractive"
        />
      ) : null}
    </html>
  );
}
