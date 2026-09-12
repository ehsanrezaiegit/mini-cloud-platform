import { allArticles, type Article } from "content-collections";

export function getAllArticles() {
  return [...allArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getArticleBySlug(slug: string) {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getCategories() {
  return Array.from(new Set(getAllArticles().map((article) => article.category))).sort();
}

export function getRelatedArticles(article: Article, limit = 3) {
  return getAllArticles()
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => ({
      article: candidate,
      score:
        (candidate.category === article.category ? 3 : 0) +
        candidate.tags.filter((tag) => article.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.article);
}

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
