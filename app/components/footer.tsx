import Link from "next/link";
import { RadioTower } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface/40">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-2 font-bold">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-black">
              <RadioTower className="size-4" />
            </span>
            CortexWire
          </div>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            Signal-rich AI and technology reporting for teams tracking models,
            infrastructure, products, and policy.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-muted">
          <Link className="transition hover:text-white" href="/articles">
            Articles
          </Link>
          <Link className="transition hover:text-white" href="/tools">
            Tools
          </Link>
          <Link className="transition hover:text-white" href="/about">
            About
          </Link>
          <Link className="transition hover:text-white" href="/newsletter">
            Newsletter
          </Link>
        </div>
      </div>
    </footer>
  );
}
