"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Command, Search } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputId = useId();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const items = useMemo(
    () => [
      { label: "About", href: "/#about", meta: "Philosophy, timeline, skills" },
      { label: "Work", href: "/#work", meta: "Case studies and project outcomes" },
      { label: "Contact", href: "/#contact", meta: "Email, calendar, social links" },
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

  const listRef = useRef<HTMLDivElement>(null);

  // Plain links stay tabbable; arrow keys are a shortcut that moves focus between input and results.
  function onNavKey(event: React.KeyboardEvent) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const links = Array.from(listRef.current?.querySelectorAll<HTMLElement>("a") ?? []);
    if (links.length === 0) return;
    event.preventDefault();
    const current = links.indexOf(document.activeElement as HTMLElement);
    const next = event.key === "ArrowDown" ? current + 1 : current - 1;
    if (next < 0) {
      document.getElementById(inputId)?.focus();
    } else {
      links[Math.min(next, links.length - 1)].focus();
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label="Open command menu"
        className="focus-ring fixed bottom-5 right-5 z-40 hidden items-center rounded-lg border border-border bg-surface-elevated/80 px-3 py-2 text-xs text-muted-foreground backdrop-blur md:flex"
        onClick={() => setOpen(true)}
      >
        <Command className="mr-2 h-4 w-4" aria-hidden="true" />
        Command menu
        <kbd className="ml-2 hidden font-sans lg:inline" aria-hidden="true">
          &#8984;K
        </kbd>
      </button>

      {open && (
        <Dialog
          label="Search the portfolio"
          onClose={() => {
            setOpen(false);
            setQuery("");
          }}
          overlayClassName="items-start bg-background/[0.72] p-4 pt-24 backdrop-blur-xl"
          className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-2xl"
        >
          <div onKeyDown={onNavKey}>
            <div className="flex items-center gap-3 border-b border-border p-4">
              <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input
                id={inputId}
                aria-label="Search the portfolio"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search case studies and sections..."
                className="border-0 bg-transparent px-0 focus-visible:ring-0"
              />
            </div>
            <p role="status" aria-live="polite" className="sr-only">
              {filtered.length === 0 ? "No results" : `${filtered.length} ${filtered.length === 1 ? "result" : "results"}`}
            </p>
            <div ref={listRef} className="max-h-80 overflow-y-auto p-2">
              {filtered.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring block rounded-lg px-3 py-3 hover:bg-muted"
                >
                  <span className="block text-sm font-semibold">{item.label}</span>
                  <span className="block text-xs text-muted-foreground">{item.meta}</span>
                </Link>
              ))}
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}
