import type { Metadata } from "next";
import { ArticlesBrowser } from "@/components/articles-browser";
import { getAllArticles, getCategories } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Read CortexWire analysis on AI models, developer tools, chips, regulation, and emerging technology markets.",
  openGraph: {
    title: "Articles | CortexWire",
    description: "AI and technology analysis from CortexWire.",
    images: ["/covers/chiplet-cloud.png"],
  },
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold text-primary">Articles</p>
        <h1 className="mt-2 text-4xl font-black tracking-normal text-white sm:text-6xl">
          The CortexWire archive
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Search and filter field notes, product analysis, market explainers,
          and practical briefings for technology teams.
        </p>
      </div>
      <ArticlesBrowser
        articles={getAllArticles()}
        categories={getCategories()}
        initialQuery={params.q || ""}
      />
    </section>
  );
}
