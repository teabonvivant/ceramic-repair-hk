import type { Metadata } from "next";
import Link from "next/link";

import { DetailLibrary } from "@/components/site/detail-library";
import { createSiteMetadata } from "@/lib/metadata";

import { Button } from "@/components/ui/button";
import { getDetailSummaries, getLegacyStats } from "@/lib/legacy";

export const metadata: Metadata = createSiteMetadata({
  title: "全部內容",
  description: "搜尋陶瓷修補知識與器物誌文章，按主題尋找材料、方法、保存與文化資料。",
  path: "/details",
});

export default function DetailsIndexPage() {
  const items = getDetailSummaries();
  const stats = getLegacyStats();
  const indexStats = [
    { value: stats.details, label: "篇知識條目" },
    { value: items.length - stats.details, label: "篇器物誌" },
    { value: 26, label: "幅主題插圖" },
  ] as const;

  return (
    <>
      <section className="section library-opening">
        <div className="container library-introduction">
          <div>
            
            <h1 className="display-serif hero-title mt-5 max-w-4xl text-ink">全部內容，一處查閱</h1>
            <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-ink-soft">
              可按標題、內容或分類搜尋。每個結果都會連到相應條目，連結相關材料、方法與延伸閱讀。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild><a href="#library">開始搜尋</a></Button>
              <Button variant="secondary" asChild><Link href="/verification">看參考資料</Link></Button>
            </div>
          </div>
          <div className="library-overview" aria-label="詳情索引資料一覽">
            
            {indexStats.map(({ value, label }) => (
              <div key={label}>
                
                <p><strong>{value}</strong><span>{label}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="library" className="section surface-line bg-white/50 scroll-mt-24">
        <div className="container">
          <DetailLibrary items={items} />
        </div>
      </section>
    </>
  );
}
