import Image from "next/image";
import Link from "next/link";
import type { Article } from "content-collections";
import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatArticleDate } from "@/lib/articles";
import { cn } from "@/lib/utils";

export function ArticleCard({
  article,
  compact = false,
}: {
  article: Article;
  compact?: boolean;
}) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block h-full">
      <Card
        className={cn(
          "h-full overflow-hidden hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_80px_rgba(255,107,53,0.13)]",
          compact && "min-w-[18rem] sm:min-w-[22rem]",
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4">
            <Badge>{article.category}</Badge>
          </div>
        </div>
        <CardContent className="grid gap-4 p-5">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
            <span>{formatArticleDate(article.date)}</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {article.readingTime}
            </span>
          </div>
          <div className="grid gap-2">
            <h3 className="text-xl font-bold leading-tight tracking-normal text-white">
              {article.title}
            </h3>
            <p className="line-clamp-3 text-sm leading-6 text-muted">
              {article.description}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Read analysis
            <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
