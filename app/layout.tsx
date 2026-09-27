import type { Metadata, Viewport } from "next";

import { DevTools } from "@/components/site/dev-tools";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/site-header";
import { SITE_URL } from "@/lib/site-map";
import "./globals.css";

const description = "瓷器修補、金繼、鋦瓷與日常保存的中文知識庫，收錄材料工具、工藝文化與器物誌文章。";

export const metadata: Metadata = {
  title: {
    default: "瓷器修補知識庫",
    template: "%s | 瓷器修補知識庫",
  },
  description,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  applicationName: "瓷器修補知識庫",
  authors: [{ name: "瓷器修補知識庫" }],
  creator: "瓷器修補知識庫",
  category: "陶瓷修復與保育",
  keywords: ["瓷器修補", "陶瓷修復", "金繼", "鋦瓷", "文物保育", "陶瓷黏接"],
  openGraph: {
    title: "瓷器修補知識庫",
    description,
    url: "/",
    siteName: "瓷器修補知識庫",
    locale: "zh_HK",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "瓷器修補知識庫：修補前先判斷用途、風險與來源" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "瓷器修補知識庫",
    description,
    images: ["/og.png"],
  },
  icons: { icon: "/icon.svg" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#354b40",
  colorScheme: "light",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "瓷器修補知識庫",
  url: SITE_URL,
  inLanguage: "zh-Hant-HK",
  description,
};
const safeWebsiteSchema = JSON.stringify(websiteSchema)
  .replaceAll("<", "\\u003c")
  .replaceAll(">", "\\u003e")
  .replaceAll("&", "\\u0026");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant-HK">
      <head><link rel="preload" href="/fonts/noto-serif-tc-00.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head>
      <body>
        <a href="#main-content" className="skip-link">跳到主要內容</a>
        <div className="page-shell">
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </div>
        <DevTools />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeWebsiteSchema }} />
      </body>
    </html>
  );
}

