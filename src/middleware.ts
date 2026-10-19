import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "@/lib/supabase-ssr";
import { getAdminEmails, isAdminEmail } from "@/lib/require-admin";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow the login page and auth routes through without a session check.
  if (pathname.startsWith("/admin/login") || pathname.startsWith("/auth/")) {
    return NextResponse.next();
  }

  const isApi = pathname.startsWith("/api/");
  const res = NextResponse.next();

  const deny = (status: 401 | 403) => {
    if (isApi) {
      return NextResponse.json(
        { ok: false, error: status === 401 ? "Unauthorized" : "Forbidden" },
        { status }
      );
    }
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.search = "";
    if (status === 401) loginUrl.searchParams.set("next", pathname);
    else loginUrl.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(loginUrl);
  };

  // Fail closed: no configured admins means nobody gets in.
  if (getAdminEmails().length === 0) return deny(403);

  const supabase = createSupabaseMiddlewareClient(req, res);
  // getUser() validates the token with Supabase; getSession() only reads the cookie.
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return deny(401);
  if (!isAdminEmail(user.email)) return deny(403);

  return res;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/pages/:path*",
    "/api/assets/:path*",
    "/api/case-studies/:path*",
    "/api/case-studies",
    "/preview/:path*"
  ]
};
