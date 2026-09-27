import { allRoutePages } from "@/lib/site-map";
const groups = [
  { title: "開始與照護", routes: ["start", "care", "processes"] },
  { title: "修補與材料", routes: ["methods", "materials", "tools", "glossary"] },
  { title: "工藝與文化", routes: ["blog", "history", "masters", "world", "ethics", "verification", "about"] },
];
export const navigationGroups = groups.map(group => ({ title: group.title, links: group.routes.flatMap(slug => {
  const page = allRoutePages.find(item => item.slug === slug);
  return page ? [{ href: page.href, label: page.label }] : [];
}) }));
