import type { MetadataRoute } from "next";
import { portfolio } from "@/content/portfolio";
import { getPublishedPageSlugs } from "@/lib/blocks/data";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  // Prefer DB slugs; fall back to static content slugs if Supabase is unconfigured.
  const dbSlugs = await getPublishedPageSlugs();
  const slugs =
    dbSlugs.length > 0
      ? dbSlugs
      : portfolio.caseStudies.map((s) => s.slug);

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
