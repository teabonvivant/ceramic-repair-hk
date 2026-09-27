import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SearchPanel } from "@/components/site/search-panel";
import { StaticImage } from "@/components/site/static-image";
import { getSearchEntries } from "@/lib/legacy";
import { blogArticles } from "@/lib/blog";
const routes=[{href:"/start",title:"第一次面對破損",copy:"先收齊碎片、拍下現況，理解器物與修補目標。"},{href:"/methods",title:"認識修補工藝",copy:"黏接、補配、鋦瓷、金繼，各有材料與結構上的選擇。"},{href:"/care",title:"照顧已修補的器物",copy:"由搬運、清潔到收納，減少下一次損傷的機會。"}];
export default function HomePage(){
 const stories=blogArticles.filter((_,index)=>[0,10,50].includes(index));
 return <>
  <section className="gallery-opening"><div className="container opening-spread">
   <div className="opening-copy"><h1>一件瓷器，值得細讀。</h1><p>從胎釉與裂紋，到金繼、鋦瓷與日常保存。讀懂修補的材料和方法，也讀懂一件器物被珍惜的原因。</p><div className="opening-actions"><Link className="opening-primary" href="/start">從入門開始<ArrowUpRight aria-hidden="true" strokeWidth={1.5}/></Link><Link className="opening-secondary" href="/blog">閱讀器物誌<ArrowRight size={17} aria-hidden="true" strokeWidth={1.5}/></Link></div></div>
   <figure className="opening-photo"><StaticImage src="/media/home-hero-v2.jpg" alt="青花修補瓷碗放在資料冊上，旁邊有一枝細筆" width={1200} height={630} loading="eager" fetchPriority="high"/></figure>
  </div></section>
  <section className="home-paths"><div className="container pathways-layout"><h2 className="pathways-heading">從哪裏開始</h2><div className="editorial-index">{routes.map(route=><Link className="editorial-index-row" href={route.href} key={route.href}><h3>{route.title}</h3><p>{route.copy}</p><ArrowRight size={22} aria-hidden="true" strokeWidth={1.5}/></Link>)}</div></div></section>
  <section className="home-journal surface-line"><div className="container"><div className="blog-feature-heading"><h2>器物誌</h2><Link className="text-link" href="/blog">閱讀全部文章<ArrowUpRight aria-hidden="true" strokeWidth={1.5}/></Link></div><div className="feature-spread">{stories.map(article=><Link className="feature-story" href={"/blog/"+article.slug} key={article.slug}><div className="feature-image"><img src={article.images[0].src} alt={article.images[0].alt} width={article.images[0].width} height={article.images[0].height} loading="lazy"/></div><div><h3>{article.title}</h3><span className="article-meta">{article.category}</span><p>{article.description}</p></div></Link>)}</div></div></section>
  <SearchPanel items={getSearchEntries()}/>
  <section className="home-topics"><div className="container related-reading">{[["/materials","材料與相容性"],["/tools","工具與工作台"],["/history","修補的歷史"],["/masters","人物與研究"],["/world","各地修護"],["/glossary","常用術語"]].map(([href,label])=><Link key={href} href={href}>{label}<ArrowUpRight size={19} aria-hidden="true" strokeWidth={1.5}/></Link>)}</div></section>
 </>;
}

