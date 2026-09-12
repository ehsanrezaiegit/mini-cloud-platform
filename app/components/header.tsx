"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, RadioTower } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const navItems = [
  { href: "/articles", label: "Articles" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/82 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-normal">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-black shadow-[0_0_28px_rgba(255,107,53,0.32)]">
            <RadioTower className="size-4" />
          </span>
          <span>CortexWire</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link href="/newsletter">Newsletter</Link>
          </Button>
        </div>

        <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>CortexWire</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3 pt-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-muted transition hover:border-primary/35 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild>
                <Link href="/newsletter" onClick={() => setIsMenuOpen(false)}>
                  Join newsletter
                </Link>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
