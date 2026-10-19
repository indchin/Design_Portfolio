"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/* ── Zoomable image group ───────────────────────────────────────────── */

function Lightbox({
  srcs,
  index,
  label,
  alt,
  caption,
  onIndexChange,
  onClose
}: {
  srcs: string[];
  index: number;
  label: string;
  alt: string;
  caption?: string;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onIndexChange((index + 1) % srcs.length);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + srcs.length) % srcs.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, srcs.length, onIndexChange]);

  const navBtn =
    "absolute top-1/2 z-10 -translate-y-1/2 rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  return (
    <Dialog
      onClose={onClose}
      label={`${label}, image ${index + 1} of ${srcs.length}`}
      overlayClassName="bg-black/90 backdrop-blur-sm"
      className="relative flex h-full w-full items-center justify-center p-4 sm:p-10"
    >
      <button onClick={onClose} aria-label="Close" className={cn(navBtn, "right-4 top-4 translate-y-0 sm:right-8 sm:top-8")}>
        <X className="h-6 w-6" aria-hidden="true" />
      </button>
      {srcs.length > 1 && (
        <>
          <button onClick={() => onIndexChange((index - 1 + srcs.length) % srcs.length)} aria-label="Previous image" className={cn(navBtn, "left-2 sm:left-4")}>
            <ChevronLeft className="h-7 w-7" aria-hidden="true" />
          </button>
          <button onClick={() => onIndexChange((index + 1) % srcs.length)} aria-label="Next image" className={cn(navBtn, "right-2 sm:right-4")}>
            <ChevronRight className="h-7 w-7" aria-hidden="true" />
          </button>
        </>
      )}
      <figure className="flex max-w-[90vw] flex-col items-center">
        <Image
          src={srcs[index]}
          alt={alt}
          width={1800}
          height={1200}
          sizes="90vw"
          unoptimized={srcs[index].endsWith(".svg")}
          className={cn("w-auto max-w-[90vw] rounded-lg object-contain", caption ? "max-h-[78vh]" : "max-h-[85vh]")}
        />
        {caption ? <figcaption className="mt-3 max-w-2xl text-center text-sm leading-6 text-white/80">{caption}</figcaption> : null}
      </figure>
    </Dialog>
  );
}

/** `alt` should describe what to notice in the image (1-2 sentences), not repeat the caption. Falls back to `label`. */
export function AssetViewer({ srcs, label, alt, caption, aspect }: { srcs: string[]; label: string; alt?: string; caption?: string; aspect?: string }) {
  const name = alt || label;
  const [open, setOpen] = useState<number | null>(null);
  const cols = srcs.length === 1 ? "" : srcs.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <figure className="w-full">
      <div className={cn("grid gap-3", cols)}>
        {srcs.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Enlarge image: ${name}${srcs.length > 1 ? `, ${i + 1} of ${srcs.length}` : ""}`}
            className="focus-ring group relative overflow-hidden rounded-xl border border-hairline/10 bg-surface shadow-sm [.light_&]:shadow-[0_1px_2px_rgba(15,23,42,0.06),0_8px_24px_-12px_rgba(15,23,42,0.18)]"
            style={aspect ? { aspectRatio: aspect } : undefined}
          >
            <Image
              src={src}
              alt="" /* the button's aria-label is the accessible name; avoids a duplicate announcement */
              width={1600}
              height={1000}
              sizes={srcs.length === 1 ? "(max-width: 1280px) 100vw, 900px" : "(max-width: 640px) 100vw, 450px"}
              unoptimized={src.endsWith(".svg")}
              className={aspect ? "h-full w-full object-contain" : "h-auto w-full"}
            />
            <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-background/80 p-1.5 text-foreground transition group-hover:bg-background group-focus-visible:bg-background">
              <ZoomIn className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
      {caption ? <figcaption className="mt-3 text-sm leading-5 text-muted-foreground">{caption}</figcaption> : null}
      {open !== null && (
        <Lightbox srcs={srcs} index={open} label={label} alt={name} caption={caption} onIndexChange={setOpen} onClose={() => setOpen(null)} />
      )}
    </figure>
  );
}

/* ── Tabs (ARIA tab pattern) ────────────────────────────────────────── */

export type TabItem = { id: string; label: string; panel: React.ReactNode };

export function Tabs({ tabs, label }: { tabs: TabItem[]; label: string }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  // Fade cue at whichever edge of the tab list has more tabs scrolled out of view.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const update = () =>
      setEdges({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const move = (to: number) => {
    const next = (to + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div className="relative">
      <div ref={listRef} role="tablist" aria-label={label} className="flex gap-1 overflow-x-auto border-b border-hairline/10 pb-px">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${base}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") { e.preventDefault(); move(i + 1); }
              if (e.key === "ArrowLeft") { e.preventDefault(); move(i - 1); }
              if (e.key === "Home") { e.preventDefault(); move(0); }
              if (e.key === "End") { e.preventDefault(); move(tabs.length - 1); }
            }}
            className={cn(
              "focus-ring -mb-px shrink-0 whitespace-nowrap rounded-t-md border-b-2 px-4 py-3 text-sm font-medium transition",
              active === i ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div aria-hidden="true" className={cn("pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent transition-opacity", edges.left ? "opacity-100" : "opacity-0")} />
      <div aria-hidden="true" className={cn("pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent transition-opacity", edges.right ? "opacity-100" : "opacity-0")} />
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${base}-panel-${i}`}
          aria-labelledby={`${base}-tab-${i}`}
          hidden={active !== i}
          className="pt-6"
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}

/* ── Expandable timeline ────────────────────────────────────────────── */

export type TimelineItem = { id: string; year: string; title: string; body: string; panel: React.ReactNode };

export function Timeline({ items }: { items: TimelineItem[] }) {
  const [open, setOpen] = useState<Set<string>>(() => new Set(items[0] ? [items[0].id] : []));
  const base = useId();
  const allOpen = open.size === items.length;
  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  return (
    <div className="max-w-4xl">
    <div className="mb-4 flex justify-end">
      <button
        type="button"
        onClick={() => setOpen(allOpen ? new Set() : new Set(items.map((i) => i.id)))}
        className="focus-ring min-h-11 rounded-md px-3 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        {allOpen ? "Collapse all" : "Expand all"}
      </button>
    </div>
    <ol className="relative space-y-4 border-l border-hairline/10 pl-6 md:pl-8">
      {items.map((item) => {
        const isOpen = open.has(item.id);
        return (
          <li key={item.id} className="relative">
            <span aria-hidden="true" className={cn("absolute -left-[31px] top-6 h-3 w-3 rounded-full border-2 md:-left-[39px]", isOpen ? "border-primary bg-primary" : "border-hairline/45 bg-background")} />
            <div className="rounded-2xl border border-hairline/15 bg-fill-subtle/[0.02]">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${base}-${item.id}`}
                  onClick={() => toggle(item.id)}
                  className="focus-ring flex w-full items-center justify-between gap-4 rounded-2xl p-5 text-left md:p-6"
                >
                  <span>
                    <span className="nrp-label nrp-label-primary block">{item.year}</span>
                    <span className="mt-1 block font-display text-lg font-semibold tracking-tight md:text-xl">{item.title}</span>
                  </span>
                  <ChevronDown className={cn("h-5 w-5 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")} aria-hidden="true" />
                </button>
              </h3>
              <div id={`${base}-${item.id}`} hidden={!isOpen} className="space-y-5 px-5 pb-6 md:px-6">
                <p className="text-sm leading-7 text-muted-foreground md:text-base md:leading-8">{item.body}</p>
                {item.panel}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
    </div>
  );
}
