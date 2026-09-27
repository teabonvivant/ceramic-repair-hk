import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section not-found-section">
      <div className="container">
        <div className="not-found-panel">
          <div className="not-found-mark" aria-hidden="true">缺</div>
          <p className="rule-label">404 · 路徑未找到</p>
          <h1 className="display-serif">找不到這個資料頁</h1>
          <p>連結可能已更新，或條目名稱有所改動。你可以到全部內容索引，按名稱或分類搜尋。</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild><Link href="/details"><Search className="size-4" aria-hidden="true" />返回全部條目</Link></Button>
            <Button variant="secondary" asChild><Link href="/"><ArrowLeft className="size-4" aria-hidden="true" />回到首頁</Link></Button>
          </div>
        </div>
      </div>
    </section>
  );
}
