import type { Metadata } from "next";
import { Cpu, Radar, Workflow } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about CortexWire's AI and technology editorial mission.",
};

const principles = [
  {
    icon: Radar,
    title: "Signal over spectacle",
    copy: "We explain what changed, who it affects, and why it matters beyond launch-day theater.",
  },
  {
    icon: Cpu,
    title: "Technical but readable",
    copy: "Our pieces are written for builders and operators who want detail without ritual complexity.",
  },
  {
    icon: Workflow,
    title: "Useful context",
    copy: "Every briefing connects news to workflows, markets, policy, infrastructure, or product strategy.",
  },
];

export default function AboutPage() {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-4xl">
        <p className="text-sm font-semibold text-primary">About</p>
        <h1 className="mt-2 text-4xl font-black leading-none tracking-normal text-white sm:text-6xl">
          CortexWire is a newsroom for the AI acceleration layer.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          The platform is designed for readers who need a crisp read on model
          releases, infrastructure shifts, AI-native tools, and the policy
          pressure forming around them.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {principles.map((item) => (
          <Card key={item.title}>
            <CardContent className="p-6">
              <item.icon className="mb-5 size-7 text-primary" />
              <h2 className="text-xl font-bold tracking-normal text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{item.copy}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
