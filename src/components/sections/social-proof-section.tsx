import { Mic2, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Portfolio } from "@/types/portfolio";

// Awards are now rendered by RecognitionSection. This section is reserved for
// testimonials and speaking engagements once you have them.
export function SocialProofSection({ portfolio }: { portfolio: Portfolio }) {
  const hasTestimonials = portfolio.testimonials.length > 0;
  const hasTalks = portfolio.talks.length > 0;
  if (!hasTestimonials && !hasTalks) return null;

  return (
    <section className="border-t border-white/10 py-20 md:py-24">
      <div className={`container grid gap-6 ${hasTestimonials && hasTalks ? "lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
        {hasTestimonials ? (
          <div>
            <Badge>Signals</Badge>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight md:text-5xl">
              Trusted for high-ambiguity product work.
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {portfolio.testimonials.map((testimonial) => (
                <figure key={testimonial.name} className="glass rounded-lg p-5">
                  <Quote className="h-5 w-5 text-primary" aria-hidden="true" />
                  <blockquote className="mt-5 text-sm leading-7 text-muted-foreground">{testimonial.quote}</blockquote>
                  <figcaption className="mt-5 text-sm font-semibold">
                    {testimonial.name}
                    <span className="block text-xs font-normal text-muted-foreground">{testimonial.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ) : null}
        {hasTalks ? (
          <div className="rounded-lg border border-border bg-surface/70 p-5">
            <div className="flex items-center gap-2 font-semibold">
              <Mic2 className="h-5 w-5 text-primary" aria-hidden="true" />
              Speaking and workshops
            </div>
            <div className="mt-5 grid gap-3">
              {portfolio.talks.map((talk) => (
                <div key={talk.title} className="rounded-lg border border-border bg-background/50 p-4">
                  <div className="text-sm font-semibold">{talk.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {talk.context} - {talk.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
