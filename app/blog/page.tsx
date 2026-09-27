import type { Metadata } from "next";import { createSiteMetadata } from "@/lib/metadata";import { blogArticles } from "@/lib/blog";import { BlogLibrary } from "@/components/site/blog-library";
export const metadata:Metadata=createSiteMetadata({title:"器物誌",description:"一百篇關於瓷器修補、金繼、材料、保存與日常記憶的文章。",path:"/blog"});
export default function BlogPage(){return <section className="section-tight journal-page"><div className="container"><div className="category-intro journal-heading"><h1 className="display-serif">器物誌</h1><p>一條裂痕，可以通向材料、工藝，也可以通向一張久違的飯桌。在修補與日常之間，細讀器物留下的時間。</p></div><BlogLibrary items={blogArticles.map(({slug,title,category,description,images})=>({slug,title,category,description,images}))}/></div></section>}

