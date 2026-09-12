import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { NewsletterForm } from "./newsletter-form";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Subscribe to the CortexWire weekly AI and technology briefing.",
};

export default function NewsletterPage() {
  return (
    <section className="dot-grid min-h-[calc(100svh-8rem)] border-b border-white/10">
      <div className="mx-auto grid w-full max-w-3xl gap-8 px-4 py-20 sm:px-6 lg:px-8">
        <div>
          <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-primary text-black">
            <Mail className="size-5" />
          </div>
          <p className="text-sm font-semibold text-primary">Newsletter</p>
          <h1 className="mt-2 text-4xl font-black leading-none tracking-normal text-white sm:text-6xl">
            Subscribe to the CortexWire briefing.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            One weekly email with the AI and technology shifts that deserve your
            attention.
          </p>
        </div>
        <NewsletterForm />
      </div>
    </section>
  );
}
