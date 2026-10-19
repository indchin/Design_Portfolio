import { NextResponse } from "next/server";

/**
 * Admin allowlist. Reads server-only ADMIN_EMAILS (comma-separated).
 * NEXT_PUBLIC_ADMIN_EMAIL is a deprecated fallback, used only when ADMIN_EMAILS is unset.
 * An empty list means NO ONE is an admin (fail closed).
 */
export function getAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS ?? process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  const list = getAdminEmails();
  if (list.length === 0 || !email) return false;
  return list.includes(email.toLowerCase());
}

/**
 * Route-handler guard. Returns a 401/403 JSON response when the caller is not an
 * allowlisted admin, or null when the request may proceed.
 * Verifies the session with auth.getUser() (server round-trip), never getSession().
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  if (getAdminEmails().length === 0) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const { cookies } = await import("next/headers");
  const { createSupabaseServerClient } = await import("@/lib/supabase-ssr");
  const supabase = createSupabaseServerClient(await cookies());
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!isAdminEmail(user.email)) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }
  return null;
}
