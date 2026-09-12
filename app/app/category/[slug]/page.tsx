import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { getAllArticles, getCategories } from "@/lib/articles";

export function generateStaticParams() {
  return getCategories().map((category) => ({
    slug: category.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategories().find(
    (item) => item.toLowerCase().replace(/\s+/g, "-") === slug,
  );

  return {
    title: category ? `${category} Articles` : "Category",
    description: category
      ? `Read CortexWire articles filed under ${category}.`
      : "CortexWire category archive.",
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategories().find(
    (item) => item.toLowerCase().replace(/\s+/g, "-") === slug,
  );

  if (!category) notFound();

  const articles = getAllArticles().filter((article) => article.category === category);

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-semibold text-primary">Category</p>
        <h1 className="mt-2 text-4xl font-black tracking-normal text-white sm:text-6xl">
          {category}
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
