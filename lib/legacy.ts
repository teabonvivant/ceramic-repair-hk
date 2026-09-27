import { blogArticles } from "@/lib/blog";
import legacyBundle from "@/data/legacy-content.json";
import editorialBundle from "@/data/editorial-overrides.json";
import professorBundle from "@/data/professor-enrichment.json";
import { familyName, routePages, type RoutePage } from "@/lib/site-map";

export { familyName, routePages, type RoutePage };

export type LegacyItem = {
  readonly title: string;
  readonly category?: string;
  readonly technique?: string;
  readonly summary?: string;
  readonly risk?: string;
  readonly period?: string;
  readonly region?: string;
  readonly person?: string;
  readonly href?: string;
  readonly tags?: readonly string[];
  readonly [key: string]: unknown;
};

export type LegacyPayload = {
  readonly data: {
    readonly methods: readonly LegacyItem[];
    readonly materials: readonly LegacyItem[];
    readonly tools: readonly LegacyItem[];
    readonly processes: readonly LegacyItem[];
    readonly reasons: readonly LegacyItem[];
    readonly comparisons: readonly LegacyItem[];
    readonly timeline: readonly LegacyItem[];
    readonly stories: readonly LegacyItem[];
    readonly countries: readonly LegacyItem[];
    readonly masters: readonly LegacyItem[];
  };
  readonly caseStudies: readonly LegacyItem[];
  readonly methodLessons: Readonly<Record<string, unknown>>;
  readonly searchIndex: readonly LegacyItem[];
};

export type DetailImage = {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
};

export type DetailSource = {
  readonly href: string;
  readonly label: string;
};

type ProfessorReviewSource = (typeof professorBundle.items)[number];

export type ProfessorReview = Omit<ProfessorReviewSource, "tierLabel" | "learningFocus"> & {
  readonly tierLabel: string;
  readonly learningFocus: string;
};

export type DetailPage = {
  readonly slug: string;
  readonly family: string;
  readonly title: string;
  readonly description: string;
  readonly paragraphs: readonly string[];
  readonly images: readonly DetailImage[];
  readonly sources: readonly DetailSource[];
  readonly professorReview?: ProfessorReview | undefined;
};

export type DetailSummary = {
  readonly slug: string;
  readonly family: string;
  readonly familyLabel: string;
  readonly title: string;
  readonly description: string;
  readonly href?: string;
  readonly imageCount: number;
  readonly sourceCount: number;
  readonly searchText?: string;
  readonly hasProfessorReview: boolean;
};

export type SearchEntry = {
  readonly searchText?: string;
  readonly title: string;
  readonly summary: string;
  readonly category: string;
  readonly family: string;
  readonly href: string;
  readonly sourceCount: number;
};

export type VerificationStatus = "documented" | "limited" | "pending";

export type VerificationEntry = SearchEntry & {
  readonly status: VerificationStatus;
};

export type AdjacentDetailPages = {
  readonly previous: DetailPage | null;
  readonly next: DetailPage | null;
};

const payload: LegacyPayload = legacyBundle.payload;
const detailPages: readonly DetailPage[] = legacyBundle.details;
const detailPagesBySlug = new Map(
  detailPages.map((page) => [page.slug, page] as const),
);
const detailSummaries: readonly DetailSummary[] = detailPages.map((page) => ({
  slug: page.slug,
  family: page.family,
  familyLabel: familyName(page.family),
  title: page.title,
  description: page.description,
  imageCount: page.images.length,
  sourceCount: page.sources.length,
  hasProfessorReview: false,
  searchText: page.paragraphs.join(" "),
}));
const searchEntries: readonly SearchEntry[] = detailPages.map((page) => ({
  searchText:page.paragraphs.join(" "),
  title: page.title,
  summary: page.description,
  category: familyName(page.family),
  family: page.family,
  href: `/details/${page.slug}`,
  sourceCount: page.sources.length,
}));
const verificationEntries: readonly VerificationEntry[] = detailPages.map(
  (page) => ({
    title: page.title,
    summary: page.description,
    category: familyName(page.family),
    family: page.family,
    href: `/details/${page.slug}`,
    sourceCount: page.sources.length,
    status: verificationStatus(page),
  }),
);

function mergeSources(
  primary: readonly DetailSource[],
  supplemental: readonly DetailSource[],
): readonly DetailSource[] {
  return [
    ...new Map(
      [...primary, ...supplemental].map((source) => [source.href, source] as const),
    ).values(),
  ];
}

function verificationStatus(page: DetailPage): VerificationStatus {
  if (page.sources.length === 0) return "pending";
  if (
    page.sources.length < 2 ||
    page.professorReview?.tier === "research-lead"
  ) {
    return "limited";
  }
  return "documented";
}

export function getPayload(): LegacyPayload {
  return payload;
}

export function getDetailPages(): readonly DetailPage[] {
  return detailPages;
}

export function getDetailSummaries(): readonly DetailSummary[] {
  return [...detailSummaries, ...blogArticles.map(article=>({slug:article.slug,family:"blog",familyLabel:"器物誌",searchText:article.sections.flatMap(section=>section.paragraphs).join(" "),title:article.title,description:article.description,href:"/blog/"+article.slug,imageCount:article.images.length,sourceCount:article.sources.length,hasProfessorReview:false}))];
}

export function getDetailPage(slug: string): DetailPage | null {
  return detailPagesBySlug.get(slug) ?? null;
}

export function getSearchEntries(): readonly SearchEntry[] {
  return [...searchEntries, ...blogArticles.map(article=>({title:article.title,summary:article.description,category:article.category,family:"blog",href:"/blog/"+article.slug,sourceCount:article.sources.length,searchText:article.sections.flatMap(section=>section.paragraphs).join(" ")}))];
}

export function getVerificationEntries(): readonly VerificationEntry[] {
  return verificationEntries;
}

export function getAdjacentDetailPages(slug: string): AdjacentDetailPages {
  const index = detailPages.findIndex((page) => page.slug === slug);
  if (index < 0) {
    return { previous: null, next: null };
  }
  return {
    previous: detailPages[index - 1] ?? null,
    next: detailPages[index + 1] ?? null,
  };
}

export function getLegacyStats() {
  return {
    routes: routePages.length + 1,
    details: detailPages.length,
    methods: payload.data.methods.length,
    materials: payload.data.materials.length,
    tools: payload.data.tools.length,
    masters: payload.data.masters.length,
    search: searchEntries.length,
    images: detailPages.reduce((total, page) => total + page.images.length, 0),
    sources: detailPages.reduce((total, page) => total + page.sources.length, 0),
    sourcedDetails: detailPages.filter((page) => page.sources.length > 0).length,
    deepenedDetails: detailPages.filter((page) => page.professorReview).length,
    limitedDetails: verificationEntries.filter((entry) => entry.status === "limited").length,
  };
}
