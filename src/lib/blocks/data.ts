import type { BlockRow } from "./types";

/**
 * Fetches blocks for a page from Supabase, or returns null if Supabase is not configured.
 * Used by public server components — imports supabaseAdmin (service-role client).
 */

export type PageKind = "home" | "case_study";

export type PageMeta = {
  id: string;
  slug: string | null;
  kind: PageKind;
  title: string;
  status: "draft" | "published";
  publishedAt: string | null;
};

export type PageRow = PageMeta & { blocks: BlockRow[] };

function mapBlock(row: Record<string, unknown>): BlockRow {
  return {
    id: row.id as string,
    parentId: (row.parent_id as string | null) ?? null,
    type: row.type as string,
    props: (row.props as Record<string, unknown>) ?? {},
    sortOrder: row.sort_order as number
  };
}

export async function getPublishedBlocks(opts: {
  kind: "home";
}): Promise<BlockRow[] | null>;
export async function getPublishedBlocks(opts: {
  kind: "case_study";
  slug: string;
}): Promise<BlockRow[] | null>;
export async function getPublishedBlocks(opts: {
  kind: PageKind;
  slug?: string;
}): Promise<BlockRow[] | null> {
  const { isSupabaseAdminConfigured, supabaseAdmin } = await import(
    "@/lib/supabase-admin"
  );
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return null;

  let pageQuery = supabaseAdmin
    .from("pages")
    .select("id")
    .eq("kind", opts.kind)
    .eq("status", "published");

  if (opts.kind === "case_study" && opts.slug) {
    pageQuery = pageQuery.eq("slug", opts.slug);
  }

  const { data: pages, error: pageError } = await pageQuery.limit(1).single();
  if (pageError || !pages) return null;

  const { data: blocks, error: blocksError } = await supabaseAdmin
    .from("page_blocks")
    .select("*")
    .eq("page_id", pages.id)
    .eq("version", "published")
    .order("sort_order");

  if (blocksError || !blocks) return null;
  return blocks.map(mapBlock);
}

export async function getDraftBlocks(opts: {
  kind: PageKind;
  slug?: string;
}): Promise<BlockRow[] | null> {
  const { isSupabaseAdminConfigured, supabaseAdmin } = await import(
    "@/lib/supabase-admin"
  );
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return null;

  let pageQuery = supabaseAdmin
    .from("pages")
    .select("id")
    .eq("kind", opts.kind);

  if (opts.kind === "case_study" && opts.slug) {
    pageQuery = pageQuery.eq("slug", opts.slug);
  }

  const { data: pages, error: pageError } = await pageQuery.limit(1).single();
  if (pageError || !pages) return null;

  const { data: blocks, error: blocksError } = await supabaseAdmin
    .from("page_blocks")
    .select("*")
    .eq("page_id", pages.id)
    .eq("version", "draft")
    .order("sort_order");

  if (blocksError || !blocks) return null;
  return blocks.map(mapBlock);
}

export async function getPublishedPageSlugs(): Promise<string[]> {
  const { isSupabaseAdminConfigured, supabaseAdmin } = await import(
    "@/lib/supabase-admin"
  );
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return [];

  const { data } = await supabaseAdmin
    .from("pages")
    .select("slug")
    .eq("kind", "case_study")
    .eq("status", "published")
    .not("slug", "is", null);

  return (data ?? []).map((r: { slug: string }) => r.slug).filter(Boolean);
}
