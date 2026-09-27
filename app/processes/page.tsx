import type { Metadata } from "next";import { createSiteMetadata } from "@/lib/metadata";
import { CategoryPage } from "@/components/site/category-page";
import { getPayload } from "@/lib/legacy";
import { extraPages } from "@/lib/site-map";
export const metadata:Metadata=createSiteMetadata({title:"修護流程",description:"由接收、攝影、乾拼到交付，認識陶瓷修護的十二個環節。",path:"/processes"});
export default function ProcessesPage(){return <CategoryPage page={extraPages[2]} items={getPayload().data.processes} detailPrefix="process"/>}
