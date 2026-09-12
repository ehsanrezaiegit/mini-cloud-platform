import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { aiTools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description: "A curated directory of AI tools for builders, researchers, and teams.",
  openGraph: {
    title: "AI Tools Directory | CortexWire",
    description: "Explore practical AI tools tracked by CortexWire.",
    images: ["/covers/model-routing.png"],
  },
};

export default function ToolsPage() {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold text-primary">Tools</p>
        <h1 className="mt-2 text-4xl font-black tracking-normal text-white sm:text-6xl">
          AI tools worth watching
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          A field guide to the products, frameworks, and model platforms shaping
          modern AI workflows.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {aiTools.map((tool) => (
          <Card
            key={tool.name}
            className="hover:-translate-y-1 hover:border-secondary/40 hover:shadow-[0_24px_80px_rgba(79,156,255,0.12)]"
          >
            <CardContent className="grid h-full gap-5 p-5">
              <div className="flex items-start justify-between gap-4">
                <Image
                  src={tool.logo}
                  alt=""
                  width={52}
                  height={52}
                  className="rounded-xl border border-white/10"
                />
                <Badge variant="secondary">{tool.category}</Badge>
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-normal text-white">{tool.name}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{tool.description}</p>
              </div>
              <Button asChild variant="outline" className="mt-auto">
                <a href={tool.url} target="_blank" rel="noreferrer">
                  Visit
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
