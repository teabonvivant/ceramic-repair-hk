import type { Metadata } from "next";

import { CategoryPage } from "@/components/site/category-page";
import { getPayload, routePages } from "@/lib/legacy";
import { createSiteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createSiteMetadata({
  title: "修補方法",
  description: "比較陶瓷修補方法、適用情況與安全限制。",
  path: "/methods",
});

export default function MethodsPage() {
  const payload = getPayload();
  return <CategoryPage page={routePages[0]} items={payload.data.methods} secondaryItems={payload.caseStudies} detailPrefix="method" />;
}
