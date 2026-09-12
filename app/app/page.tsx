import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { ArticleCard } from "@/components/article-card";
import { Hero } from "@/components/hero";
import { NewsletterCTA } from "@/components/newsletter-cta";
import { Button } from "@/components/ui/button";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles();
  const latest = articles.slice(0, 3);
  const trending = articles.slice(1, 5);

  return (
    <>
      <Hero />
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">Latest</p>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-white sm:text-5xl">
              Fresh from the wire
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/articles">
              View all
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <AnimatedSection>
          <div className="grid gap-6 md:grid-cols-3">
            {latest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="overflow-hidden border-y border-white/10 bg-surface/45 py-14">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold text-secondary">Trending</p>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-white">
              What readers are tracking
            </h2>
          </div>
          <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6">
            {trending.map((article) => (
              <ArticleCard key={article.slug} article={article} compact />
            ))}
          </div>
        </div>
      </section>

      <NewsletterCTA />
    </>
  );
}
