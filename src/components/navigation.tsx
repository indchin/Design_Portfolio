"use client";

import Link from "next/link";
import { Briefcase, Calendar, Download, Moon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolio } from "@/content/portfolio";

export function Navigation() {
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
          {[
            ["About", "#about"],
            ["Work", "#work"],
            ["Recognition", "#recognition"],
            ["Contact", "#contact"]
          ].map(([label, href]) => (
            <a key={label} href={href} className="focus-ring rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" aria-label="Toggle theme" onClick={() => document.documentElement.classList.toggle("light")}>
            <Moon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="View admin">
            <Link href="/admin">
              <Briefcase className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="secondary" className="hidden sm:inline-flex">
            <a href={portfolio.owner.resumeUrl} download>
              <Download className="h-4 w-4" aria-hidden="true" />
              Resume
            </a>
          </Button>
          <Button asChild>
            <a href={portfolio.owner.calendlyUrl}>
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Book
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
