import type { BlogArticle } from "@/lib/blog";
export function ArticleFigure({image,eager=false}:{image:BlogArticle["images"][number];eager?:boolean}){return <figure className="article-figure"><img src={image.src} alt={image.alt} width={image.width} height={image.height} loading={eager?"eager":"lazy"} decoding="async"/><figcaption>{image.caption}</figcaption></figure>}
