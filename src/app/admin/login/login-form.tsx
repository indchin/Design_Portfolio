"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm({ next }: { next?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const supabase = createSupabaseBrowserClient();
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next ?? "/admin")}`;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo, shouldCreateUser: false }
    });
    setStatus(error ? "error" : "sent");
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-border bg-surface/70 p-6 text-center">
        <div className="mb-2 font-semibold">Check your email</div>
        <p className="text-sm text-muted-foreground">
          We sent a magic link to <strong>{email}</strong>. Click it to sign in.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-surface/70 p-6">
      <div className="mb-4">
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email address
        </label>
        <Input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full"
        />
      </div>
      {status === "error" && (
        <p className="mb-3 text-sm text-red-400">Something went wrong. Please try again.</p>
      )}
      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send magic link"}
      </Button>
    </form>
  );
}
