"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Grid2X2, List, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/types/portfolio";

export function CaseStudyBrowser({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");

  const tags = useMemo(() => ["All", ...Array.from(new Set(caseStudies.flatMap((study) => study.tags)))], [caseStudies]);
  const filtered = caseStudies.filter((study) => {
    const matchesTag = activeTag === "All" || study.tags.includes(activeTag);
    const matchesQuery = `${study.title} ${study.excerpt} ${study.category} ${study.tags.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase());
    return study.status === "published" && matchesTag && matchesQuery;
  });

  return (
    <section id="work" className="relative border-t border-white/10 py-24">
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge>Selected work</Badge>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-normal md:text-5xl">
              Case studies built around evidence, systems, and measurable outcomes.
            </h2>
          </div>
          <div className="flex gap-2">
            <Button variant={view === "grid" ? "default" : "secondary"} size="icon" onClick={() => setView("grid")} aria-label="Grid view">
              <Grid2X2 className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button variant={view === "list" ? "default" : "secondary"} size="icon" onClick={() => setView("list")} aria-label="List view">
              <List className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="relative block">
            <span className="sr-only">Search case studies</span>
            <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by domain, method, outcome..." className="pl-10" />
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <SlidersHorizontal className="hidden h-4 w-4 text-muted-foreground sm:block" aria-hidden="true" />
            {tags.map((tag) => (
              <button
                key={tag}
                className={cn(
                  "focus-ring whitespace-nowrap rounded-full border px-3 py-2 text-xs font-medium transition",
                  activeTag === tag
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className={cn("mt-10 grid gap-5", view === "grid" ? "lg:grid-cols-3" : "grid-cols-1")}>
          <AnimatePresence mode="popLayout">
            {filtered.map((study) => (
              <motion.article
                layout
                key={study.id}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className={cn("group overflow-hidden rounded-lg border border-border bg-surface/70", view === "list" && "grid md:grid-cols-[22rem_1fr]")}
              >
                <Link href={`/work/${study.slug}`} className="focus-ring block">
                  <div className={cn("relative aspect-[1.25] overflow-hidden", view === "list" && "md:aspect-auto md:h-full")}>
                    <Image
                      src={study.cover}
                      alt={`${study.title} cover`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">
                      {study.category}
                    </span>
                    <span aria-hidden="true" className="text-muted-foreground/60">·</span>
                    {study.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{study.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{study.excerpt}</p>
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {study.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-lg border border-border bg-background/50 p-3">
                        <div className="text-lg font-semibold" style={{ color: study.accent }}>
                          {metric.value}
                        </div>
                        <div className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
