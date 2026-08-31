import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, Scale, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { StickyToc } from "@/components/case-study/sticky-toc";
import { adaptDiscoveryResearchReport } from "@/content/case-studies/adapt-discovery-research-report";

export const metadata: Metadata = {
  title: adaptDiscoveryResearchReport.title
};

const confidenceStyles = {
  Strong: "border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-300",
  Moderate: "border-amber-400/30 bg-amber-400/[0.08] text-amber-300"
} as const;

export default function DiscoveryResearchReportPage() {
  const doc = adaptDiscoveryResearchReport;

  const toc = [
    { id: "overview", label: "Overview" },
    ...doc.sections.map((s) => ({ id: `section-${s.number}`, label: `${s.number}. ${s.title}` })),
    { id: "recommendations", label: "Key Recommendations" },
    { id: "appendix", label: "Appendix: Participants" }
  ];

  return (
    <>
      <Navigation />
      <main id="main" className="pt-20">
        <section id="overview" className="relative overflow-hidden border-b border-white/10 py-16 scroll-mt-24">
          <div className="absolute inset-0 bg-radial-field opacity-70 blur-2xl" aria-hidden="true" />
          <div className="container relative">
            <Button asChild variant="ghost" className="mb-8">
              <Link href="/work/adapt-authoring-tool#method">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to case study
              </Link>
            </Button>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/80 sm:text-xs">
              Phase 1 — Discovery interviews report
            </div>
            <h1 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">{doc.title}</h1>

            <dl className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Project</dt>
                <dd className="mt-2 text-sm leading-6 text-foreground/90">{doc.meta.project}</dd>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Participants</dt>
                <dd className="mt-2 text-sm leading-6 text-foreground/90">{doc.meta.participants}</dd>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Roles represented</dt>
                <dd className="mt-2 text-sm leading-6 text-foreground/90">{doc.meta.roles}</dd>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Research objective</dt>
                <dd className="mt-2 text-sm leading-6 text-foreground/90">{doc.meta.objective}</dd>
              </div>
            </dl>
          </div>
        </section>

        <div className="container py-8 xl:grid xl:grid-cols-[260px_1fr] xl:gap-12 xl:items-start">
          <div className="xl:sticky xl:top-28 xl:self-start">
            <StickyToc items={toc} />
          </div>

          <div className="min-w-0">
            <div className="mx-auto grid max-w-3xl gap-10">
              {doc.sections.map((section) => (
                <article
                  key={section.number}
                  id={`section-${section.number}`}
                  className="scroll-mt-24 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-3xl font-semibold leading-none text-primary/70">
                        {section.number}
                      </span>
                      <h2 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                        {section.title}
                      </h2>
                    </div>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${confidenceStyles[section.confidence]}`}
                    >
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      Confidence: {section.confidence}
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                    {section.intro}
                  </p>

                  <div className="mt-6 space-y-4">
                    {section.quotes.map((quote, i) => (
                      <blockquote
                        key={i}
                        className="border-l-2 border-primary/50 pl-4 text-sm leading-7 text-foreground/85 sm:text-[15px]"
                      >
                        {quote}
                      </blockquote>
                    ))}
                  </div>

                  {section.relatedTags && section.relatedTags.length > 0 && (
                    <div className="mt-6">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Related tags
                      </div>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {section.relatedTags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/70"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.counterEvidence && (
                    <div className="mt-6 flex gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
                      <Scale className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          Counter-evidence
                        </div>
                        <p className="mt-2 text-sm leading-6 text-foreground/80">{section.counterEvidence}</p>
                      </div>
                    </div>
                  )}
                </article>
              ))}

              <article id="recommendations" className="scroll-mt-24 rounded-2xl border border-primary/15 bg-primary/[0.04] p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  Key Recommendations
                </h2>
                <ol className="mt-6 space-y-5">
                  {doc.recommendations.map((rec, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/[0.08] text-xs font-semibold text-primary">
                        {i + 1}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-foreground/95 sm:text-base">{rec.lead}</div>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{rec.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>

              <article id="appendix" className="scroll-mt-24">
                <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  Appendix: Participants & Roles
                </h2>
                <div className="mt-6 overflow-x-auto rounded-2xl border border-white/[0.06]">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <thead className="bg-white/[0.04]">
                      <tr>
                        <th scope="col" className="p-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          Participant
                        </th>
                        <th scope="col" className="p-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          Role
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {doc.participants.map((p) => (
                        <tr key={p.name} className="border-t border-white/[0.05] align-top">
                          <td className="p-4 font-medium leading-6 text-foreground">{p.name}</td>
                          <td className="p-4 text-sm leading-6 text-muted-foreground">{p.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
          </div>
        </div>
      </main>
    </>
  );
}
