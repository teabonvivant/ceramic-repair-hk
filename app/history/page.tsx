import type { Metadata } from "next";

import { CategoryPage } from "@/components/site/category-page";
import { getPayload, routePages } from "@/lib/legacy";
import { createSiteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createSiteMetadata({
  title: "歷史",
  description: "從時間線與故事理解陶瓷修補的工藝脈絡。",
  path: "/history",
});

export default function HistoryPage() {
  const payload = getPayload();
  return <CategoryPage page={routePages[4]} items={payload.data.timeline} secondaryItems={payload.data.stories} detailPrefix="timeline" />;
}
