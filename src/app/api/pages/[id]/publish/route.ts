import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { revalidatePage } from "@/lib/revalidate";

type Params = { params: Promise<{ id: string }> };

export async function POST(_req: NextRequest, { params }: Params) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const { isSupabaseAdminConfigured, supabaseAdmin } = await import("@/lib/supabase-admin");

  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  // Fetch page metadata so we know kind + slug for revalidation
  const { data: page, error: pageError } = await supabaseAdmin
    .from("pages")
    .select("id, kind, slug")
    .eq("id", id)
    .single();

  if (pageError || !page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  // Run the atomic publish RPC (delete published rows → copy draft → set status=published)
  const { error: rpcError } = await supabaseAdmin.rpc("publish_page", {
    target_page_id: id
  });

  if (rpcError) {
    return NextResponse.json({ error: rpcError.message }, { status: 500 });
  }

  // On-demand ISR revalidation
  revalidatePage(page.kind as "home" | "case_study", page.slug ?? null);

  return NextResponse.json({ ok: true, kind: page.kind, slug: page.slug });
}
