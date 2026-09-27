import records from "@/data/blog.json";
export type BlogArticle = {
  slug: string; title: string; category: string; description: string;
  sections: { title: string; paragraphs: string[] }[];
  images: { src: string; alt: string; caption: string; width: number; height: number }[];
  sources: { href: string; label: string }[]; related: string[];
};
export const blogArticles = records as BlogArticle[];
export const blogCategories = [...new Set(blogArticles.map((article) => article.category))];
export function getBlog(slug: string) { return blogArticles.find((article) => article.slug === slug); }
export function readingMinutes(article: BlogArticle) { return Math.max(3, Math.ceil(article.sections.flatMap((section) => section.paragraphs).join("").length / 320)); }
