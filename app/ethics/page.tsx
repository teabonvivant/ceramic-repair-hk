import type { Metadata } from "next";

import { CategoryPage } from "@/components/site/category-page";
import { getPayload, routePages } from "@/lib/legacy";
import { createSiteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createSiteMetadata({
  title: "倫理",
  description: "整理可再處理、最少介入、清楚標示與修護誠信等原則。",
  path: "/ethics",
});

export default function EthicsPage() {
  const payload = getPayload();
  return <CategoryPage page={routePages[3]} items={payload.data.reasons} secondaryItems={payload.data.processes} detailPrefix="reason" />;
}
