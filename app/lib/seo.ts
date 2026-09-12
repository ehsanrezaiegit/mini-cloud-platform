import type { Article } from "content-collections";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cortexwire.netlify.app";

export const siteConfig = {
  name: "CortexWire",
  url: SITE_URL,
  description:
    "AI and technology intelligence for builders, operators, and curious technologists.",
};

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [`${siteConfig.url}${article.coverImage}`],
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/tools/cortexwire.png`,
      },
    },
    mainEntityOfPage: `${siteConfig.url}/articles/${article.slug}`,
  };
}
