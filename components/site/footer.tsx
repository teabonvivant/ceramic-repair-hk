import Link from "next/link";
import { navigationGroups } from "@/components/site/navigation-groups";
export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-grid">
    <div className="footer-intro"><Link href="/" className="brand-link"><strong>瓷器修補知識庫</strong></Link><p>從材料、工藝與保存出發，細讀每件器物留下的時間。</p><Link href="/details" className="text-link">搜尋全部內容</Link></div>
    <nav className="footer-nav" aria-label="頁尾導覽">{navigationGroups.map(group => <div key={group.title}><h2>{group.title}</h2>{group.links.map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}</div>)}</nav>
  </div><div className="container footer-meta"><p>瓷器修補知識庫</p><Link href="/verification">參考資料與延伸閱讀</Link></div></footer>;
}
