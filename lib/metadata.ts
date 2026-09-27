import type { Metadata } from "next";

const SITE_NAME = "瓷器修補知識庫";
const SOCIAL_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "瓷器修補知識庫：修補前先判斷用途、風險與來源",
};

type SiteMetadataOptions = {
  title: string;
  description: string;
  path: string;
  type?: "article" | "website";
  image?: { url: string; alt?: string; width?: number; height?: number };
};

export function createSiteMetadata({
  title,
  description,
  path,
  type = "website",
  image = SOCIAL_IMAGE,
}: SiteMetadataOptions): Metadata {
  const socialTitle = `${title} | ${SITE_NAME}`;
  const socialImage = { ...SOCIAL_IMAGE, ...image };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "zh_HK",
      type,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage.url],
    },
  };
}
