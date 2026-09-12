import { cn } from "@/lib/utils";

export function TableOfContents({
  headings,
}: {
  headings: { id: string; text: string; level: number }[];
}) {
  if (!headings.length) return null;

  return (
    <aside className="sticky top-24 hidden max-h-[calc(100svh-7rem)] overflow-auto rounded-xl border border-white/10 bg-surface/70 p-4 lg:block">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted">
        On this page
      </p>
      <nav className="grid gap-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              "text-sm leading-5 text-muted transition hover:text-primary",
              heading.level === 3 && "pl-4",
            )}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
