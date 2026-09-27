import type { Metadata } from "next";

import { CategoryPage } from "@/components/site/category-page";
import { getPayload, routePages } from "@/lib/legacy";
import { createSiteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createSiteMetadata({
  title: "工具",
  description: "整理陶瓷修補所需的記錄、固定、清潔與展示工具。",
  path: "/tools",
});

export default function ToolsPage() {
  const payload = getPayload();
  return <CategoryPage page={routePages[2]} items={payload.data.tools} secondaryItems={payload.data.processes} detailPrefix="tool" />;
}
