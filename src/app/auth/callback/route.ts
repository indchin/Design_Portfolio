import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase-ssr";

const DEFAULT_NEXT = "/admin";

/** Accept only same-site relative paths; anything else falls back to /admin. */
function safeNext(raw: string | null, origin: string): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//") || raw.includes("@") || raw.includes("\\")) {
    return DEFAULT_NEXT;
  }
  try {
    const url = new URL(raw, origin);
    if (url.origin !== origin) return DEFAULT_NEXT;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return DEFAULT_NEXT;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get("code");
  const next = safeNext(searchParams.get("next"), origin);

  if (code) {
    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient(cookieStore);
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, origin));
    }
  }

  return NextResponse.redirect(new URL("/admin/login?error=auth", origin));
}
