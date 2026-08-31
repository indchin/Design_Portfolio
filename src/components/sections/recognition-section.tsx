"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, Sparkle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Portfolio } from "@/types/portfolio";

export function RecognitionSection({ portfolio }: { portfolio: Portfolio }) {
  const hasAwards = portfolio.awards.length > 0;
  const hasCerts = portfolio.certifications.length > 0;
  if (!hasAwards && !hasCerts) return null;

  const awardsByIssuer = portfolio.awards.reduce<Record<string, typeof portfolio.awards>>(
    (acc, award) => {
      (acc[award.issuer] ??= []).push(award);
      return acc;
    },
    {}
  );
  const issuerOrder = Object.keys(awardsByIssuer);
  const totalRecognition = portfolio.awards.length + portfolio.certifications.length;

  return (
    <section id="recognition" className="border-t border-white/10 py-20 md:py-28">
      <div className="container">
        <div className="mb-12 flex flex-col gap-3 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Badge>Recognition</Badge>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-tight md:text-5xl">
              Acknowledged across a decade of work.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              Recognition earned across two employers — from early-career delivery
              awards at Impelsys to ongoing peer recognition at Laerdal Medical.
            </p>
          </div>
          <dl className="flex gap-6 text-sm md:text-base">
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Awards</dt>
              <dd className="mt-1 font-display text-3xl font-semibold text-primary">
                {portfolio.awards.length}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Certifications</dt>
              <dd className="mt-1 font-display text-3xl font-semibold text-primary">
                {portfolio.certifications.length}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Total</dt>
              <dd className="mt-1 font-display text-3xl font-semibold text-foreground">
                {totalRecognition}
              </dd>
            </div>
          </dl>
        </div>

        {hasAwards ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {issuerOrder.map((issuer) => {
              const items = awardsByIssuer[issuer];
              return (
                <article
                  key={issuer}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 md:p-7"
                >
                  <header className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg border border-primary/30 bg-primary/10">
                        <Award className="h-4 w-4 text-primary" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="font-display text-lg font-semibold tracking-tight">
                          {issuer}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {items.length} {items.length === 1 ? "award" : "awards"}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      {items[items.length - 1].year} – {items[0].year}
                    </div>
                  </header>
                  <ul className="mt-5 grid gap-3">
                    {items.map((award, index) => (
                      <motion.li
                        key={`${award.title}-${award.year}-${index}`}
                        initial={{ opacity: 1, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ delay: index * 0.04 }}
                        className="flex items-center justify-between gap-4 rounded-lg border border-white/[0.06] bg-background/40 p-4 transition hover:border-white/[0.16] hover:bg-background/60"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Sparkle
                            className="h-4 w-4 shrink-0 text-primary/80"
                            aria-hidden="true"
                          />
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium text-foreground">
                              {award.title}
                            </div>
                          </div>
                        </div>
                        <div className="shrink-0 text-xs font-medium text-muted-foreground">
                          {award.year}
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        ) : null}

        {hasCerts ? (
          <div className="mt-10">
            <div className="mb-5 flex items-center gap-3">
              <BadgeCheck className="h-4 w-4 text-primary" aria-hidden="true" />
              <h3 className="font-display text-base font-semibold tracking-tight md:text-lg">
                Certifications
              </h3>
              <span className="text-xs text-muted-foreground">
                · {portfolio.certifications.length} programmes
              </span>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {portfolio.certifications.map((cert, index) => (
                <motion.li
                  key={cert.title}
                  initial={{ opacity: 1, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-white/[0.16] hover:bg-white/[0.04]"
                >
                  <div className="text-sm font-medium leading-6 text-foreground">{cert.title}</div>
                  {cert.issuer ? (
                    <div className="mt-1.5 text-xs text-muted-foreground">{cert.issuer}</div>
                  ) : null}
                </motion.li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
