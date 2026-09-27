"use client";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { SearchEntry } from "@/lib/legacy";
export function SearchPanel({items}:{items:readonly SearchEntry[]}) {
 const [query,setQuery]=useState("");const [limit,setLimit]=useState(12);const normalized=query.trim().toLowerCase();
 const featured=useMemo(()=>{const first=items.find(item=>item.href==="/details/method-01");return first?[first,...items.filter(item=>item!==first)]:items},[items]);
 const results=useMemo(()=>normalized?items.filter(item=>[item.title,item.summary,item.category,item.searchText??""].join(" ").toLowerCase().includes(normalized)):featured.slice(0,6),[items,featured,normalized]);
 return <section id="search" aria-labelledby="search-title"><div className="container search-layout">
  <div className="search-intro"><h2 id="search-title">找一個問題，開始閱讀</h2><p>輸入材料、方法、人物或地域名稱，便可直接查到相關知識條目與器物誌文章。</p><Link href="/details" className="text-link">瀏覽全部 {items.length} 個條目<ArrowRight aria-hidden="true" strokeWidth={1.5}/></Link></div>
  <div><label htmlFor="site-search" className="search-label">搜尋關鍵字</label><div className="search-input-shell"><Search className="pointer-events-none absolute left-0 top-1/2 size-5 -translate-y-1/2 text-indigo-ink" strokeWidth={1.5} aria-hidden="true"/><input id="site-search" name="site-search" autoComplete="off" placeholder="例如：金繼、B-72、裂痕、包裝" value={query} onChange={event=>{setQuery(event.target.value);setLimit(12)}} className="min-h-[56px] w-full border-0 border-b border-indigo-ink bg-transparent pl-9 pr-12 text-base"/>{query&&<button type="button" className="search-clear" aria-label="清除搜尋" onClick={()=>setQuery("")}><X size={19} aria-hidden="true"/></button>}</div>
  <p className="search-status" aria-live="polite">{normalized?'找到 '+results.length+' 個相符條目':'常用條目 · 可搜尋 '+items.length+' 個'}</p>
  <div>{results.length?results.slice(0,limit).map(item=><Link className="search-result" key={item.href} href={item.href}><strong>{item.title}</strong><span className="search-result-meta"><span>{item.category}</span><span>{item.family==='blog'?'文章':'知識條目'}</span></span><span className="search-result-copy">{item.summary}</span></Link>):<div className="empty-state"><strong>找不到相符條目</strong><p>可縮短關鍵字，或搜尋材料名、方法名、人物及地域。</p></div>}</div>
  {results.length>limit&&<button type="button" className="text-link mt-5" onClick={()=>setLimit(limit+12)}>顯示更多結果<ArrowRight aria-hidden="true"/></button>}</div>
 </div></section>;
}

