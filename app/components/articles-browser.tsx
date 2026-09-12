"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Article } from "content-collections";
import { Search } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PagefindResult = {
  id: string;
  data: () => Promise<{ url: string }>;
};

type Pagefind = {
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
};

const PAGE_SIZE = 6;
const PAGEFIND_MODULE_PATH = "/pagefind/pagefind.js";

export function ArticlesBrowser({
  articles,
  categories,
  initialQuery = "",
}: {
  articles: Article[];
  categories: string[];
  initialQuery?: string;
}) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);
  const [pagefindMatches, setPagefindMatches] = useState<string[] | null>(null);
  const pagefindRef = useRef<Pagefind | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function runPagefind() {
      if (!query.trim()) {
        setPagefindMatches(null);
        return;
      }

      try {
        if (!pagefindRef.current) {
          pagefindRef.current = (await import(
            /* webpackIgnore: true */ PAGEFIND_MODULE_PATH
          )) as Pagefind;
        }

        const search = await pagefindRef.current.search(query);
        const urls = await Promise.all(
          search.results.slice(0, 30).map((result) => result.data()),
        );

        if (!cancelled) {
          setPagefindMatches(urls.map((item) => item.url.replace(/\/$/, "")));
        }
      } catch {
        if (!cancelled) {
          setPagefindMatches(null);
        }
      }
    }

    runPagefind();
    return () => {
      cancelled = true;
    };
  }, [query]);

  useEffect(() => {
    setPage(1);
  }, [category, query]);

  const filtered = useMemo(() => {
    const lowerQuery = query.toLowerCase().trim();

    return articles.filter((article) => {
      const matchesCategory = category === "All" || article.category === category;
      const localMatch =
        !lowerQuery ||
        [article.title, article.description, article.category, ...article.tags]
          .join(" ")
          .toLowerCase()
          .includes(lowerQuery);
      const pagefindMatch =
        !pagefindMatches ||
        pagefindMatches.includes(`/articles/${article.slug}`) ||
        pagefindMatches.includes(`/articles/${article.slug}.html`);

      return matchesCategory && localMatch && pagefindMatch;
    });
  }, [articles, category, pagefindMatches, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice(0, page * PAGE_SIZE);

  return (
    <div className="grid gap-8">
      <div className="grid gap-4 rounded-xl border border-white/10 bg-surface/70 p-4 md:grid-cols-[1fr_auto] md:items-center">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the CortexWire archive"
            className="pl-10"
            aria-label="Search articles"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn(
                "rounded-full border px-3 py-2 text-xs font-semibold transition",
                category === item
                  ? "border-primary/45 bg-primary/15 text-primary"
                  : "border-white/12 bg-white/[0.03] text-muted hover:text-white",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Badge variant="outline">{filtered.length} articles</Badge>
        <span className="text-sm text-muted">Page {Math.min(page, pageCount)} of {pageCount}</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {visible.length < filtered.length ? (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => setPage((value) => value + 1)}>
            Load more
          </Button>
        </div>
      ) : null}
    </div>
  );
}
