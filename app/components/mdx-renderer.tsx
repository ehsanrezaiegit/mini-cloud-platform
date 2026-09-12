"use client";

import { useMDXComponent } from "@content-collections/mdx/react";

function createHeading(level: 2 | 3) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    const text = String(children);
    const id = text
      .toLowerCase()
      .replace(/`/g, "")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    const Tag = `h${level}` as "h2" | "h3";

    return <Tag id={id}>{children}</Tag>;
  };

  return Heading;
}

export function MdxRenderer({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <div className="article-prose">
      <Component
        components={{
          h2: createHeading(2),
          h3: createHeading(3),
        }}
      />
    </div>
  );
}
