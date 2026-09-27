import type { Metadata } from "next";

import { CategoryPage } from "@/components/site/category-page";
import { getPayload, routePages } from "@/lib/legacy";
import { createSiteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createSiteMetadata({
  title: "材料",
  description: "比較修補材料的相容性、可再處理性、老化情況與安全風險。",
  path: "/materials",
});

export default function MaterialsPage() {
  const payload = getPayload();
  return <CategoryPage page={routePages[1]} items={payload.data.materials} secondaryItems={payload.data.methods} detailPrefix="material" />;
}
