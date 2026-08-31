import { NextResponse } from "next/server";
import { z } from "zod";
import { portfolio } from "@/content/portfolio";
import { supabaseAdmin } from "@/lib/supabase-admin";

const sectionSchema = z.object({
  id: z.string(),
  type: z.string(),
  title: z.string(),
  body: z.string(),
  bullets: z.array(z.string()).optional()
});

const caseStudySchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  role: z.string(),
  client: z.string(),
  year: z.string(),
  duration: z.string(),
  status: z.enum(["draft", "published"]),
  featured: z.boolean(),
  cover: z.string(),
  accent: z.string(),
  updatedAt: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), detail: z.string() })),
  sections: z.array(sectionSchema)
});

const payloadSchema = z.object({
  studies: z.array(caseStudySchema)
});

export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json({ ok: true, source: "static", studies: portfolio.caseStudies });
  }

  const { data, error } = await supabaseAdmin
    .from("case_studies")
    .select("*, case_study_sections(*)")
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, source: "supabase", studies: data });
}

export async function POST(request: Request) {
  const parsed = payloadSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid case study payload" }, { status: 400 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({
      ok: true,
      source: "preview",
      message: "Saved locally. Add Supabase env vars to persist content in production."
    });
  }

  for (const study of parsed.data.studies) {
    const { data, error } = await supabaseAdmin
      .from("case_studies")
      .upsert(
        {
          title: study.title,
          slug: study.slug,
          excerpt: study.excerpt,
          category: study.category,
          tags: study.tags,
          role: study.role,
          client: study.client,
          year: study.year,
          duration: study.duration,
          status: study.status,
          featured: study.featured,
          cover_url: study.cover,
          accent: study.accent,
          metrics: study.metrics,
          updated_at: new Date().toISOString()
        },
        { onConflict: "slug" }
      )
      .select("id")
      .single();

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    await supabaseAdmin.from("case_study_sections").delete().eq("case_study_id", data.id);
    const sectionRows = study.sections.map((section, index) => ({
      case_study_id: data.id,
      section_type: section.type,
      title: section.title,
      body: section.body,
      bullets: section.bullets ?? [],
      sort_order: index
    }));

    if (sectionRows.length) {
      const { error: sectionError } = await supabaseAdmin.from("case_study_sections").insert(sectionRows);
      if (sectionError) return NextResponse.json({ ok: false, error: sectionError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true, source: "supabase" });
}
