import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function InsightsSection({
  articles
}: {
  articles: Array<{ title: string; excerpt: string; tag: string; readTime: string }>;
}) {
  if (articles.length === 0) return null;
  return (
    <section id="writing" className="border-t border-white/10 py-24">
      <div className="container">
        <Badge>Thought leadership</Badge>
        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-normal md:text-5xl">
            Blog-ready architecture for AI, research, and design systems writing.
          </h2>
          <span className="text-sm text-muted-foreground">MDX-ready. CMS-ready. SEO-ready.</span>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {articles.map((article) => (
            <article key={article.title} className="rounded-lg border border-border bg-surface/70 p-5 transition hover:border-primary/40">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{article.tag}</span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold">{article.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{article.excerpt}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Read note
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
