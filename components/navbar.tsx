"use client";

import Link from "next/link";
import { Menu, Search, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/#cheatsheets", label: "Cheat Sheets" },
  { href: "/#categories", label: "Categories" },
  { href: "/tools", label: "Tools" },
  { href: "/#security", label: "Security" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        window.dispatchEvent(new Event("smartstack:command"));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/70 backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <Link href="/" className="group flex items-center gap-3" aria-label="SmartStack home">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-glow">
            <Sparkles className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-display text-lg font-bold tracking-normal">SmartStack</span>
            <span className="hidden text-xs text-muted-foreground sm:block">Learn Faster. Code Smarter.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Button key={item.href} asChild variant="ghost" size="sm">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            type="button"
            variant="outline"
            className="h-9 min-w-48 justify-between text-muted-foreground"
            onClick={() => window.dispatchEvent(new Event("smartstack:command"))}
          >
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search
            </span>
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">Ctrl K</kbd>
          </Button>
          <ThemeToggle />
        </div>

        <Button className="md:hidden" size="icon" variant="ghost" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      </nav>

      {open ? (
        <div className="fixed inset-0 z-50 bg-background/95 p-4 backdrop-blur-2xl md:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-bold">SmartStack</span>
            <Button size="icon" variant="ghost" aria-label="Close menu" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="mt-8 grid gap-3">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-md border border-border bg-card p-4 text-lg font-medium">
                {item.label}
              </Link>
            ))}
            <Button onClick={() => window.dispatchEvent(new Event("smartstack:command"))} className="mt-2 justify-start">
              <Search className="h-4 w-4" />
              Open command palette
            </Button>
            <ThemeToggle />
          </div>
        </div>
      ) : null}
    </header>
  );
}
