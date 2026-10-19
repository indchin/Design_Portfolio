import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock, ExternalLink, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Navigation } from "@/components/navigation";
import { BlockList } from "@/lib/blocks/block-list";
import { StickyToc } from "@/components/case-study/sticky-toc";
import { getPublishedBlocks, getPublishedPageSlugs } from "@/lib/blocks/data";
import { portfolio } from "@/content/portfolio";
import { adaptCaseStudy } from "@/content/case-studies/adapt-authoring-tool";

export const revalidate = 3600;
export const dynamicParams = true;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const dbSlugs = await getPublishedPageSlugs();
  const staticSlugs = portfolio.caseStudies.map((s) => s.slug);
  const all = Array.from(new Set([...dbSlugs, ...staticSlugs]));
  return all.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study =
    portfolio.caseStudies.find((item) => item.slug === slug) ??
    portfolio.caseStudies.find(() => false); // placeholder — slug may be DB-only
  if (!study) return { title: slug };

  const ogUrl = `/og?title=${encodeURIComponent(study.title)}&eyebrow=${encodeURIComponent(
    study.category
  )}&description=${encodeURIComponent(study.excerpt)}`;

  return {
    title: study.title,
    description: study.excerpt,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: study.title,
      description: study.excerpt,
      url: `/work/${study.slug}`,
      type: "article",
      images: [{ url: ogUrl, width: 1200, height: 630, alt: `${study.title} — case study` }]
    },
    twitter: { card: "summary_large_image", title: study.title, description: study.excerpt, images: [ogUrl] }
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = portfolio.caseStudies.find((item) => item.slug === slug);

  // Try Supabase blocks first; fall back to static content if not published.
  const blocks = await getPublishedBlocks({ kind: "case_study", slug });

  if (!blocks && !study) notFound();

  const isAdapt = slug === "adapt-authoring-tool";

  return (
    <>
      <Navigation />
      <main id="main" className="pt-20">
        {study && (
          <>
            <section className="relative overflow-hidden border-b border-hairline/10 py-16">
              <div className="absolute inset-0 bg-radial-field opacity-70 blur-2xl" aria-hidden="true" />
              <div className="container relative">
                <Button asChild variant="ghost" className="mb-8">
                  <Link href="/#work">
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Back to work
                  </Link>
                </Button>
                <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
                  <div>
                    <Badge>{study.category}</Badge>
                    <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-normal md:text-6xl">{study.title}</h1>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{study.excerpt}</p>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="relative aspect-[1.35] overflow-hidden rounded-xl border border-hairline/10 bg-surface shadow-glow">
                    <Image src={study.cover} alt="" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>
                </div>
              </div>
            </section>

            <section className="border-b border-hairline/10 py-8">
              <div className="container grid gap-3 md:grid-cols-4">
                {[
                  { icon: UserRound, label: "Role", value: study.role },
                  { icon: ExternalLink, label: "Client", value: study.client },
                  { icon: Calendar, label: "Year", value: study.year },
                  { icon: Clock, label: "Duration", value: study.duration }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-lg border border-border bg-surface/70 p-4">
                      <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                      <div className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">{item.label}</div>
                      <div className="mt-2 text-sm font-semibold">{item.value}</div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {blocks ? (
          <div className={cn("container py-8", isAdapt && "xl:grid xl:grid-cols-[260px_1fr] xl:gap-12 xl:items-start")}>
            {isAdapt ? (
              <div className="xl:sticky xl:top-28 xl:self-start">
                <StickyToc items={adaptCaseStudy.toc} />
              </div>
            ) : null}
            <div className="min-w-0">
              <BlockList blocks={blocks} />
            </div>
          </div>
        ) : study ? (
          <section className="py-16">
            <div className="container grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
              <aside className="lg:sticky lg:top-24 lg:h-fit">
                <div className="rounded-lg border border-border bg-surface/70 p-5">
                  <h2 className="text-sm font-semibold">Outcomes</h2>
                  <div className="mt-5 grid gap-3">
                    {study.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-lg bg-background/[0.55] p-4">
                        <div
                          className="text-study-accent text-3xl font-semibold"
                          style={{ "--study-accent": study.accent } as React.CSSProperties}
                        >
                          {metric.value}
                        </div>
                        <div className="mt-2 text-sm font-semibold">{metric.label}</div>
                        <div className="mt-1 text-xs leading-5 text-muted-foreground">{metric.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
              <article className="case-content">
                {study.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-24">
                    <h2>{section.title}</h2>
                    <p>{section.body}</p>
                    {section.bullets ? (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </article>
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
