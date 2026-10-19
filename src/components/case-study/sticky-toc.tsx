"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type TocItem = { id: string; label: string };

/** After an anchor jump, move focus to the section heading so keyboard and screen-reader users land there. */
function focusSectionHeading(id: string) {
  requestAnimationFrame(() => {
    const heading = document.getElementById(id)?.querySelector<HTMLElement>("h2");
    if (!heading) return;
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  });
}

export function StickyToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const mobileRef = useRef<HTMLDetailsElement>(null);

  const onLinkClick = (id: string) => {
    setActive(id);
    if (mobileRef.current) mobileRef.current.open = false;
    focusSectionHeading(id);
  };
  const current = items.find((i) => i.id === active)?.label ?? items[0]?.label ?? "";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0% -55% 0%", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(1, scrolled / height) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-40 h-0.5 bg-transparent"
      >
        <div
          className="h-full bg-primary transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Below xl: sticky collapsed list under the fixed header (h-16). */}
      <nav aria-label="Case study sections" className="sticky top-16 z-20 -mx-4 sm:-mx-6 lg:-mx-8 xl:hidden">
        <details ref={mobileRef} className="group border-b border-hairline/10 bg-background/90 backdrop-blur-xl">
          <summary className="focus-ring flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm sm:px-6 lg:px-8 font-medium [&::-webkit-details-marker]:hidden">
            <span className="min-w-0 truncate">
              <span className="text-muted-foreground">On this page: </span>
              {current}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
          </summary>
          <ul className="absolute inset-x-0 top-full max-h-[70vh] overflow-y-auto border-b border-hairline/10 bg-background px-2 py-2 shadow-lg">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => onLinkClick(item.id)}
                  aria-current={active === item.id ? "location" : undefined}
                  className={cn(
                    "focus-ring flex min-h-11 items-center rounded-md px-3 text-sm",
                    active === item.id ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </nav>

      <nav
        aria-label="Case study sections"
        className="hidden xl:block"
      >
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Sections
        </div>
        <ul className="mt-5 space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => onLinkClick(item.id)}
                aria-current={active === item.id ? "location" : undefined}
                className={cn(
                  "focus-ring group flex items-center gap-3 rounded-md py-2 pl-3 pr-2 text-sm transition",
                  active === item.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-px w-4 shrink-0 transition-all duration-300",
                    active === item.id
                      ? "w-8 bg-primary"
                      : "bg-hairline/25 group-hover:bg-hairline/50"
                  )}
                />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
