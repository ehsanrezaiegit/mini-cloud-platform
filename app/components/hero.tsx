import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import { HeroVisual } from "@/components/hero-visual";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Hero() {
  return (
    <section className="dot-grid relative overflow-hidden border-b border-white/10">
      <HeroVisual />
      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-7xl content-center gap-8 px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-muted">
            <Sparkles className="size-3.5 text-primary" />
            AI systems, chips, tools, policy, and product intelligence
          </div>
          <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-7xl">
            Track the technology moves that compound into tomorrow.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
            CortexWire turns fast-moving AI and technology news into concise,
            builder-focused analysis with context you can actually use.
          </p>
        </div>

        <form
          action="/articles"
          className="grid max-w-2xl gap-3 rounded-full border border-white/12 bg-background/70 p-2 backdrop-blur sm:grid-cols-[1fr_auto]"
        >
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <Input
              name="q"
              aria-label="Search articles"
              placeholder="Search agents, chips, regulation..."
              className="border-transparent bg-transparent pl-10 focus:border-transparent"
            />
          </div>
          <Button type="submit" size="lg">
            Search
          </Button>
        </form>

        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/articles">Browse latest</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/tools">Explore AI tools</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
