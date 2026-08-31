import { createServerClient } from "@supabase/ssr";
import { createBrowserClient } from "@supabase/ssr";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { NextRequest, NextResponse } from "next/server";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** Server component / Route handler client — pass the result of `await cookies()`. */
export function createSupabaseServerClient(cookieStore: ReadonlyRequestCookies) {
  return createServerClient(url, anonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (pairs) => {
        try {
          pairs.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
          );
        } catch {
          // In Server Components the cookie store is read-only — ignore.
        }
      }
    }
  });
}

/** Middleware client — reads and writes cookies directly on req/res. */
export function createSupabaseMiddlewareClient(req: NextRequest, res: NextResponse) {
  return createServerClient(url, anonKey, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (pairs) => {
        pairs.forEach(({ name, value, options }) => {
          req.cookies.set(name, value);
          res.cookies.set(name, value, options);
        });
      }
    }
  });
}

/** Browser client — safe to call in Client Components. */
export function createSupabaseBrowserClient() {
  return createBrowserClient(url, anonKey);
}
