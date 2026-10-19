import type { MetadataRoute } from "next";
import { portfolio } from "@/content/portfolio";
import { getPublishedPageSlugs } from "@/lib/blocks/data";
import { NRP_READY } from "@/lib/nrp-ready";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  // Prefer DB slugs; fall back to static content slugs if Supabase is unconfigured.
  const dbSlugs = await getPublishedPageSlugs();
  const allSlugs =
    dbSlugs.length > 0
      ? dbSlugs
      : portfolio.caseStudies.map((s) => s.slug);
  // The NRP page is noindex until NRP_READY, so keep it out of the sitemap too.
  const slugs = NRP_READY ? allSlugs : allSlugs.filter((slug) => slug !== "neonatal-resuscitation-program");

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    ...slugs.map((slug) => ({
      url: `${baseUrl}/work/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.82
    }))
  ];
}
