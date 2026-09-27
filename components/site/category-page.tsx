import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getDetailPages, type LegacyItem, type RoutePage } from "@/lib/legacy";
type CategoryPageProps = { page: RoutePage; items: readonly LegacyItem[]; secondaryItems?: readonly LegacyItem[]; detailPrefix?: string };
export function CategoryPage({ page, items, secondaryItems = [], detailPrefix }: CategoryPageProps) {
  const all = getDetailPages();
  const primary = detailPrefix ? all.filter(record => record.family === detailPrefix) : all.filter(record => items.some(item => item.title === record.title));
  const secondary = secondaryItems.map(item => all.find(record => record.title === item.title)).filter(record => record && !primary.includes(record));
  const featured = primary[0];
  const isMastersPage = page.slug === "masters";
  const indexItems = isMastersPage ? primary.slice(1) : primary;
  const image = featured?.images[0];
  return <>
    <section className="collection-opening"><div className="container">
      <nav className="breadcrumbs" aria-label="麵包屑"><Link href="/">首頁</Link><span>／</span><span>{page.label}</span></nav>
      <header className="collection-heading"><h1>{page.title}</h1><p>{page.description}</p></header>
      {featured && <Link className="collection-feature" href={'/details/' + featured.slug}>
        {image && <figure><img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="eager" decoding="async" /></figure>}
        <div>{isMastersPage && <span className="collection-feature-label">人物選讀</span>}<h2>{featured.title}</h2><p>{featured.description}</p><span className="text-link">閱讀條目<ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" /></span></div>
      </Link>}
    </div></section>
    <section className="collection-index"><div className="container"><div className="collection-index-heading"><h2>{isMastersPage ? "其他人物" : `${page.label}目錄`}</h2><span>{indexItems.length} 篇條目</span></div><div className="collection-grid">
      {indexItems.map(record => <Link href={'/details/' + record.slug} key={record.slug}><h3>{record.title}</h3><p>{record.description}</p><ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" /></Link>)}
    </div></div></section>
    {secondary.length > 0 && <section className="collection-related"><div className="container"><h2 className="display-serif">延伸閱讀</h2><div className="related-reading">{secondary.map(record => record && <Link key={record.slug} href={'/details/' + record.slug}>{record.title}<ArrowUpRight size={18} aria-hidden="true" strokeWidth={1.5} /></Link>)}</div></div></section>}
  </>;
}
