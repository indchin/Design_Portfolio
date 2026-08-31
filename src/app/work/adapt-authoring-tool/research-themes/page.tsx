import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { adaptUsabilityResearchThemes } from "@/content/case-studies/adapt-research-themes";

export const metadata: Metadata = {
  title: adaptUsabilityResearchThemes.title
};

export default function ResearchThemesPage() {
  const doc = adaptUsabilityResearchThemes;

  return (
    <>
      <Navigation />
      <main id="main" className="pt-20">
        <section className="relative overflow-hidden border-b border-white/10 py-16">
          <div className="absolute inset-0 bg-radial-field opacity-70 blur-2xl" aria-hidden="true" />
          <div className="container relative">
            <Button asChild variant="ghost" className="mb-8">
              <Link href="/work/adapt-authoring-tool#method">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to case study
              </Link>
            </Button>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/80 sm:text-xs">
              Phase 2 — Usability testing report
            </div>
            <h1 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">{doc.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">{doc.overview}</p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-3xl gap-8 px-4 sm:px-0">
            {doc.themes.map((theme) => (
              <article
                key={theme.title}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8"
              >
                <h2 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                  {theme.title}
                </h2>
                <p className="mt-3 text-xs leading-6 text-primary/80">
                  <span className="font-semibold uppercase tracking-[0.1em]">Tags: </span>
                  {theme.tags}
                </p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  {theme.body}
                </p>
              </article>
            ))}

            <article className="rounded-2xl border border-primary/15 bg-primary/[0.04] p-6 sm:p-8">
              <h2 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                Sentiment Tags
              </h2>
              <p className="mt-3 text-xs leading-6 text-primary/80">
                <span className="font-semibold uppercase tracking-[0.1em]">Tags: </span>
                {doc.sentimentTags.tags}
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                {doc.sentimentTags.body}
              </p>
            </article>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>
                Source:{" "}
                <a
                  href={doc.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/20 underline-offset-4 hover:text-foreground"
                >
                  {doc.source}
                </a>
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
