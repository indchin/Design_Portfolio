"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Command, Search } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { Input } from "@/components/ui/input";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const items = useMemo(
    () => [
      { label: "About", href: "/#about", meta: "Philosophy, timeline, skills" },
      { label: "Work", href: "/#work", meta: "Case studies and project outcomes" },
      { label: "Contact", href: "/#contact", meta: "Email, calendar, social links" },
      { label: "Admin CMS", href: "/admin", meta: "Edit and preview portfolio content" },
      ...portfolio.caseStudies.map((study) => ({
        label: study.title,
        href: `/work/${study.slug}`,
        meta: study.tags.join(", ")
      }))
    ],
    []
  );

  const filtered = items.filter((item) =>
    `${item.label} ${item.meta}`.toLowerCase().includes(query.toLowerCase())
  );

  if (!open) {
    return (
      <button
        className="focus-ring fixed bottom-5 right-5 z-40 hidden rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-xs text-muted-foreground backdrop-blur md:flex"
        onClick={() => setOpen(true)}
      >
        <Command className="mr-2 h-4 w-4" aria-hidden="true" />
        Command K
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[70] bg-background/[0.72] p-4 backdrop-blur-xl" role="dialog" aria-modal="true">
      <div className="mx-auto mt-24 max-w-xl overflow-hidden rounded-xl border border-white/10 bg-surface-elevated shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border p-4">
          <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search case studies, sections, admin..."
            className="border-0 bg-transparent px-0 focus-visible:ring-0"
          />
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="focus-ring block rounded-lg px-3 py-3 hover:bg-white/[0.06]"
            >
              <span className="block text-sm font-semibold">{item.label}</span>
              <span className="block text-xs text-muted-foreground">{item.meta}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
