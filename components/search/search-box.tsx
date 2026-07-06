"use client";

import Link from "next/link";
import { ArrowRight, Clock, Filter, Search, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { searchIndex } from "@/lib/data";
import { fuzzyScore } from "@/lib/utils";

const filters = ["All", "Cheat Sheet", "Utility", "Category"];

export function SearchBox({ hero = false }: { hero?: boolean }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [recents, setRecents] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("smartstack-recent-searches") ?? "[]") as string[];
  });

  const results = useMemo(() => {
    const scored = searchIndex
      .filter((item) => filter === "All" || item.type === filter)
      .map((item) => ({
        ...item,
        score: fuzzyScore(query, `${item.title} ${item.description} ${item.tags.join(" ")}`),
      }))
      .filter((item) => (query ? item.score > 0 : item.type !== "Category"))
      .sort((a, b) => b.score - a.score)
      .slice(0, 7);
    return scored;
  }, [filter, query]);

  const saveRecent = (value: string) => {
    const next = [value, ...recents.filter((item) => item !== value)].slice(0, 5);
    setRecents(next);
    localStorage.setItem("smartstack-recent-searches", JSON.stringify(next));
  };

  return (
    <div className={hero ? "mx-auto w-full max-w-3xl" : "w-full"}>
      <div className="glass rounded-lg p-2">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search anything..."
            aria-label="Search anything"
            className="h-14 border-0 bg-transparent pl-12 pr-28 text-base focus-visible:ring-0"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            onClick={() => window.dispatchEvent(new Event("smartstack:command"))}
          >
            <Sparkles className="h-4 w-4" />
            AI Search
          </button>
        </label>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            className={`rounded-md border px-3 py-1 text-xs transition ${filter === item ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {(query || recents.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="glass mt-4 overflow-hidden rounded-lg"
          >
            {query ? (
              <div className="divide-y divide-border">
                {results.length ? (
                  results.map((item) => (
                    <Link key={`${item.type}-${item.title}`} href={item.href} onClick={() => saveRecent(item.title)} className="group flex items-center justify-between gap-4 p-4 transition hover:bg-muted/60">
                      <span>
                        <span className="flex items-center gap-2">
                          <Badge>{item.type}</Badge>
                          <strong className="font-display">{item.title}</strong>
                        </span>
                        <span className="mt-1 block text-sm text-muted-foreground">{item.description}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                    </Link>
                  ))
                ) : (
                  <p className="p-4 text-sm text-muted-foreground">No exact match yet. Try a broader term like Linux, SQL, XSS, Docker, or React.</p>
                )}
              </div>
            ) : (
              <div className="p-4">
                <p className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Recent searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {recents.map((item) => (
                    <button key={item} type="button" className="rounded-md border border-border px-3 py-1 text-sm hover:bg-muted" onClick={() => setQuery(item)}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
