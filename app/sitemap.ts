import type { MetadataRoute } from "next";
import { blogArticles } from "@/lib/blog";

import { getDetailPages } from "@/lib/legacy";
import { allRoutePages, SITE_URL } from "@/lib/site-map";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/details", ...allRoutePages.map((page) => page.href)];
  const detailRoutes = getDetailPages().map((page) => `/details/${page.slug}`);

  return [...staticRoutes, ...detailRoutes, ...blogArticles.map(article=>"/blog/"+article.slug)].map((pathname) => ({
    url: `${SITE_URL}${pathname}`,
    changeFrequency: pathname.startsWith("/details/") ? "monthly" : "weekly",
    priority: pathname === "" ? 1 : pathname === "/details" ? 0.9 : 0.7,
  }));
}
