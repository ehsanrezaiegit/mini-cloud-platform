import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NewsletterCTA() {
  return (
    <section className="border-y border-white/10 bg-surface">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-12 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
            <Mail className="size-4" />
            Weekly briefing
          </div>
          <h2 className="text-3xl font-black tracking-normal text-white sm:text-4xl">
            A sharper AI signal, every Friday.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
            Get the product launches, model updates, funding rounds, and policy
            shifts that matter without refreshing six feeds all day.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/newsletter">
            Join newsletter
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
