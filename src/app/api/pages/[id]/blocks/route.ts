import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { getDefinition } from "@/lib/blocks/registry";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const { isSupabaseAdminConfigured, supabaseAdmin } = await import("@/lib/supabase-admin");

  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ blocks: [] });
  }

  const { data, error } = await supabaseAdmin
    .from("page_blocks")
    .select("id, parent_id, type, props, sort_order")
    .eq("page_id", id)
    .eq("version", "draft")
    .order("sort_order");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const blocks = (data ?? []).map((r) => ({
    id: r.id as string,
    parentId: (r.parent_id as string | null) ?? null,
    type: r.type as string,
    props: (r.props as Record<string, unknown>) ?? {},
    sortOrder: r.sort_order as number
  }));

  return NextResponse.json({ blocks });
}

// Single block upsert or delete
const blockPatchSchema = z.discriminatedUnion("op", [
  z.object({
    op: z.literal("upsert"),
    block: z.object({
      id: z.string().optional(),
      parentId: z.string().nullable().optional(),
      type: z.string(),
      props: z.record(z.string(), z.unknown()),
      sortOrder: z.number()
    })
  }),
  z.object({
    op: z.literal("delete"),
    id: z.string()
  }),
  z.object({
    op: z.literal("reorder"),
    // array of { id, sortOrder } pairs
    order: z.array(z.object({ id: z.string(), sortOrder: z.number() }))
  })
]);

export async function PATCH(req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id: pageId } = await params;
  const { isSupabaseAdminConfigured, supabaseAdmin } = await import("@/lib/supabase-admin");
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const parsed = blockPatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const payload = parsed.data;

  if (payload.op === "delete") {
    const { error } = await supabaseAdmin
      .from("page_blocks")
      .delete()
      .eq("id", payload.id)
      .eq("page_id", pageId)
      .eq("version", "draft");
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  if (payload.op === "reorder") {
    // Batch update sort_order for each block
    const updates = payload.order.map(({ id, sortOrder }) =>
      supabaseAdmin!
        .from("page_blocks")
        .update({ sort_order: sortOrder, updated_at: new Date().toISOString() })
        .eq("id", id)
        .eq("page_id", pageId)
        .eq("version", "draft")
    );
    const results = await Promise.all(updates);
    const failed = results.find((r) => r.error);
    if (failed?.error) return NextResponse.json({ error: failed.error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  // op === "upsert"
  const { block } = payload;

  // Validate props against the block's schema
  const def = getDefinition(block.type);
  if (!def) return NextResponse.json({ error: `Unknown block type: ${block.type}` }, { status: 400 });

  // Validate allowedChildren: if a parentId is given, check the parent allows this block type
  if (block.parentId) {
    const parentBlock = await supabaseAdmin
      .from("page_blocks")
      .select("type")
      .eq("id", block.parentId)
      .eq("page_id", pageId)
      .single();
    const parentDef = parentBlock.data ? getDefinition(parentBlock.data.type as string) : null;
    if (parentDef?.allowedChildren && !parentDef.allowedChildren.includes(block.type)) {
      return NextResponse.json(
        { error: `Block type "${block.type}" is not allowed inside "${parentDef.display.label}"` },
        { status: 422 }
      );
    }
  }
  const propsCheck = def.schema.safeParse(block.props);
  const safeProps = propsCheck.success ? propsCheck.data : block.props;

  const row = {
    page_id: pageId,
    parent_id: block.parentId ?? null,
    type: block.type,
    props: safeProps,
    sort_order: block.sortOrder,
    version: "draft" as const,
    updated_at: new Date().toISOString()
  };

  if (block.id) {
    // Update existing
    const { data, error } = await supabaseAdmin
      .from("page_blocks")
      .update(row)
      .eq("id", block.id)
      .eq("page_id", pageId)
      .eq("version", "draft")
      .select("id")
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ id: data.id });
  } else {
    // Insert new
    const { data, error } = await supabaseAdmin
      .from("page_blocks")
      .insert(row)
      .select("id")
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ id: data.id });
  }
}
