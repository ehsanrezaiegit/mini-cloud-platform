import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import readingTime from "reading-time";
import { z } from "zod";

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractHeadings(content: string) {
  return content
    .split("\n")
    .map((line) => {
      const match = /^(##|###)\s+(.+)$/.exec(line);
      if (!match) return null;

      return {
        id: slugifyHeading(match[2]),
        text: match[2],
        level: match[1].length,
      };
    })
    .filter((heading): heading is { id: string; text: string; level: number } =>
      Boolean(heading),
    );
}

const articles = defineCollection({
  name: "articles",
  directory: "content/articles",
  include: "*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    coverImage: z.string(),
    readingTime: z.string(),
    author: z.string().default("CortexWire Desk"),
    content: z.string(),
  }),
  transform: async (article, context) => {
    const mdx = await compileMDX(context, article);
    const measured = readingTime(article.content);

    return {
      ...article,
      slug: article._meta.path,
      mdx,
      toc: extractHeadings(article.content),
      readingTime: article.readingTime || measured.text,
      wordCount: measured.words,
    };
  },
});

export default defineConfig({
  content: [articles],
});
