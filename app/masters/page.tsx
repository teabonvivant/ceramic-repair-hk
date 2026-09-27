import type { Metadata } from "next";

import { CategoryPage } from "@/components/site/category-page";
import { getPayload, routePages } from "@/lib/legacy";
import { createSiteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createSiteMetadata({
  title: "人物",
  description: "認識陶瓷修復、保存研究與漆藝創作中的人物及其工作。",
  path: "/masters",
});

export default function MastersPage() {
  const payload = getPayload();
  return <CategoryPage page={routePages[5]} items={payload.data.masters} secondaryItems={payload.searchIndex} detailPrefix="master" />;
}
