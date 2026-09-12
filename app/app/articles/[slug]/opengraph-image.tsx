import { ImageResponse } from "@vercel/og";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/articles";

export const alt = "CortexWire article image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0B",
          color: "#F5F5F7",
          padding: 72,
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            fontWeight: 700,
            color: "#FF6B35",
          }}
        >
          CortexWire
          <span style={{ color: "#4F9CFF" }}>/</span>
          {article.category}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <h1 style={{ margin: 0, fontSize: 72, lineHeight: 0.95, letterSpacing: 0 }}>
            {article.title}
          </h1>
          <p style={{ margin: 0, maxWidth: 900, color: "#B9B9C1", fontSize: 28 }}>
            {article.description}
          </p>
        </div>
        <div style={{ display: "flex", gap: 18, color: "#9A9AA2", fontSize: 24 }}>
          <span>{article.readingTime}</span>
          <span>•</span>
          <span>{article.author}</span>
        </div>
      </div>
    ),
    size,
  );
}
