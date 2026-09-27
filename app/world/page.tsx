import type { Metadata } from "next";

import { CategoryPage } from "@/components/site/category-page";
import { getPayload, routePages } from "@/lib/legacy";
import { createSiteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createSiteMetadata({
  title: "各地修護",
  description: "按地域整理陶瓷修補傳統與可查資料。",
  path: "/world",
});

export default function WorldPage() {
  const payload = getPayload();
  return <CategoryPage page={routePages[6]} items={payload.data.countries} secondaryItems={payload.data.methods} detailPrefix="country" />;
}
