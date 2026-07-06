"use client";

import Link from "next/link";
import { Bot, CornerDownLeft, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { searchIndex } from "@/lib/data";
import { fuzzyScore } from "@/lib/utils";

function explain(query: string) {
  const subject = query || "developer workflow";
  return [
    `SmartStack AI summary for "${subject}": start with the safest minimal command or syntax, read the flags, and test in a disposable environment when behavior affects files, networks, or production data.`,
    "Best practice: copy the smallest working example, adapt one variable at a time, and keep notes on errors so the next search becomes faster.",
    "Security tip: never paste secrets, tokens, private URLs, or untrusted payloads into public tools. SmartStack utilities run locally in the browser.",
  ];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const openPalette = () => setOpen(true);
    window.addEventListener("smartstack:command", openPalette);
    return () => window.removeEventListener("smartstack:command", openPalette);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    return searchIndex
      .map((item) => ({ ...item, score: fuzzyScore(query, `${item.title} ${item.description} ${item.tags.join(" ")}`) }))
      .filter((item) => (query ? item.score > 0 : true))
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [query]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[90] bg-background/70 p-4 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            className="glass mx-auto mt-10 max-h-[82vh] max-w-3xl overflow-hidden rounded-lg"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 border-b border-border p-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search commands, tools, topics, or ask AI..." className="border-0 bg-transparent text-base focus-visible:ring-0" />
              <Button size="icon" variant="ghost" aria-label="Close command palette" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="grid max-h-[68vh] overflow-auto md:grid-cols-[1.2fr_.8fr]">
              <div className="divide-y divide-border">
                {results.map((item) => (
                  <Link key={`${item.type}-${item.title}`} href={item.href} onClick={() => setOpen(false)} className="group flex items-center justify-between gap-4 p-4 transition hover:bg-muted/60">
                    <span>
                      <span className="flex items-center gap-2">
                        <Badge>{item.type}</Badge>
                        <strong>{item.title}</strong>
                      </span>
                      <span className="mt-1 block text-sm text-muted-foreground">{item.description}</span>
                    </span>
                    <CornerDownLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  </Link>
                ))}
              </div>
              <aside className="border-t border-border bg-muted/30 p-4 md:border-l md:border-t-0">
                <div className="mb-3 flex items-center gap-2 font-display font-semibold">
                  <Bot className="h-5 w-5 text-primary" />
                  AI Assistant
                </div>
                <div className="space-y-3 text-sm leading-6 text-muted-foreground">
                  {explain(query).map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </aside>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
