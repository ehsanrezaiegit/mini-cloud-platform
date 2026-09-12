import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { MdxRenderer } from "@/components/mdx-renderer";
import { ShareButtons } from "@/components/share-buttons";
import { TableOfContents } from "@/components/table-of-contents";
import { Badge } from "@/components/ui/badge";
import { formatArticleDate, getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { articleJsonLd, siteConfig } from "@/lib/seo";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: `/articles/${article.slug}`,
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: `/articles/${article.slug}/opengraph-image`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [`${siteConfig.url}/articles/${article.slug}/opengraph-image`],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />
      <article>
        <header className="border-b border-white/10">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <Badge>{article.category}</Badge>
              <h1 className="mt-5 text-4xl font-black leading-none tracking-normal text-white sm:text-6xl">
                {article.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
                {article.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
                <span>{article.author}</span>
                <span>•</span>
                <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                <span>•</span>
                <span>{article.readingTime}</span>
              </div>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10">
              <Image
                src={article.coverImage}
                alt=""
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
            </div>
          </div>
        </header>

        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_18rem] lg:px-8">
          <div className="min-w-0">
            <div className="mb-8">
              <ShareButtons title={article.title} />
            </div>
            <MdxRenderer code={article.mdx} />
          </div>
          <TableOfContents headings={article.toc} />
        </div>
      </article>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-secondary">Related</p>
          <h2 className="mt-2 text-3xl font-black tracking-normal text-white">
            Keep reading
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((item) => (
            <ArticleCard key={item.slug} article={item} />
          ))}
        </div>
      </section>
    </>
  );
}
