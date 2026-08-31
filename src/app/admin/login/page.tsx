import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign in — Admin",
  robots: { index: false, follow: false }
};

type Props = { searchParams: Promise<{ error?: string; next?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const { error, next } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-2 text-2xl font-semibold">Portfolio Admin</div>
          <p className="text-sm text-muted-foreground">Sign in with your email to continue</p>
        </div>
        {error === "unauthorized" && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            This account is not authorized to access the admin.
          </div>
        )}
        {error === "auth" && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            Authentication failed. Please try again.
          </div>
        )}
        <LoginForm next={next} />
      </div>
    </main>
  );
}
