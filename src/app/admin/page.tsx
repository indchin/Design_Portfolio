import { cookies } from "next/headers";
import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";
import type { PageMeta } from "@/lib/blocks/data";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false }
};

async function getPages(): Promise<PageMeta[]> {
  const { isSupabaseAdminConfigured, supabaseAdmin } = await import("@/lib/supabase-admin");
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return [];
  const { data } = await supabaseAdmin
    .from("pages")
    .select("id, kind, slug, title, status, published_at")
    .order("kind")
    .order("title");
  return (data ?? []).map((r) => ({
    id: r.id,
    kind: r.kind,
    slug: r.slug ?? null,
    title: r.title,
    status: r.status,
    publishedAt: r.published_at ?? null
  }));
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();
  const pages = await getPages();

  return <AdminShell user={user} pages={pages} />;
}
