"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Download, Mail, Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolio } from "@/content/portfolio";

const links = [
  ["About", "/#about"],
  ["Work", "/#work"],
  ["Recognition", "/#recognition"],
  ["Contact", "/#contact"]
] as const;

const resumeFileName = "Chinmay-Sharma-UX-Lead-Resume.pdf";
const THEME_KEY = "theme";

export function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [light, setLight] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const calendlyUrl = portfolio.owner.calendlyUrl;
  const hasCalendly = typeof calendlyUrl === "string" && calendlyUrl.length > 0 && !calendlyUrl.includes("your-name");

  // Initialise theme from localStorage, then prefers-color-scheme.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_KEY);
    } catch {
      // Storage unavailable (private mode): fall through to system preference.
    }
    const isLight = stored ? stored === "light" : window.matchMedia("(prefers-color-scheme: light)").matches;
    document.documentElement.classList.toggle("light", isLight);
    // One-time sync from an external store (localStorage / media query) after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLight(isLight);
  }, []);

  function toggleTheme() {
    const next = !light;
    document.documentElement.classList.toggle("light", next);
    setLight(next);
    try {
      localStorage.setItem(THEME_KEY, next ? "light" : "dark");
    } catch {
      // Ignore: the choice still applies for this visit.
    }
  }

  // Mark the section in view (home page only).
  useEffect(() => {
    if (!isHome) return;
    const sections = links
      .map(([, href]) => document.getElementById(href.replace("/#", "")))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  // Escape closes the menu and returns focus to its button.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }

  const linkClass = "focus-ring rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground";

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-background/70 backdrop-blur-2xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-lg">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.06]">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
          </span>
          <span className="hidden text-sm font-semibold tracking-normal sm:block">{portfolio.owner.name}</span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              aria-current={isHome && activeId === href.replace("/#", "") ? "location" : undefined}
              className={`${linkClass} aria-[current=location]:text-foreground`}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" aria-label="Light theme" aria-pressed={light} onClick={toggleTheme}>
            {light ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
          </Button>
          <Button asChild variant="secondary" className="hidden md:inline-flex">
            <a href={portfolio.owner.resumeUrl} download={resumeFileName}>
              <Download className="h-4 w-4" aria-hidden="true" />
              Resume
            </a>
          </Button>
          <Button asChild>
            {hasCalendly ? (
              <a href={calendlyUrl}>
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Book a call
              </a>
            ) : (
              <Link href="/#contact">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Contact
              </Link>
            )}
          </Button>
          <Button
            ref={menuButtonRef}
            size="icon"
            variant="ghost"
            className="md:hidden"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          </Button>
        </div>
      </div>
      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        className="border-t border-white/10 md:hidden"
      >
        <div className="container flex flex-col gap-1 py-3">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={closeMenu}
              aria-current={isHome && activeId === href.replace("/#", "") ? "location" : undefined}
              className={`${linkClass} py-3 text-base aria-[current=location]:text-foreground`}
            >
              {label}
            </a>
          ))}
          <a href={portfolio.owner.resumeUrl} download={resumeFileName} onClick={closeMenu} className={`${linkClass} py-3 text-base`}>
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
