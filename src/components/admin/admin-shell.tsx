"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, Home, LogOut, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PageMeta } from "@/lib/blocks/data";
import { BlockCanvas } from "./block-canvas";
import type { User } from "@supabase/supabase-js";

type Props = {
  user: User | null;
  pages: PageMeta[];
};

export function AdminShell({ user, pages }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(pages[0]?.id ?? null);
  const [pageStatuses, setPageStatuses] = useState<Record<string, PageMeta["status"]>>(
    () => Object.fromEntries(pages.map((p) => [p.id, p.status]))
  );
  const [publishing, setPublishing] = useState(false);
  const [publishMsg, setPublishMsg] = useState<string | null>(null);

  const selected = pages.find((p) => p.id === selectedId) ?? null;
  const selectedStatus = selected ? (pageStatuses[selected.id] ?? selected.status) : null;

  const homePages = pages.filter((p) => p.kind === "home");
  const caseStudyPages = pages.filter((p) => p.kind === "case_study");

  async function handlePublish() {
    if (!selected) return;
    setPublishing(true);
    setPublishMsg(null);
    try {
      const res = await fetch(`/api/pages/${selected.id}/publish`, { method: "POST" });
      if (!res.ok) {
        const { error } = await res.json() as { error: string };
        setPublishMsg(`Error: ${error}`);
      } else {
        setPageStatuses((prev) => ({ ...prev, [selected.id]: "published" }));
        setPublishMsg("Published");
        setTimeout(() => setPublishMsg(null), 3000);
      }
    } catch {
      setPublishMsg("Publish failed");
    } finally {
      setPublishing(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-background/80 backdrop-blur-2xl">
        <div className="flex h-14 items-center justify-between gap-4 px-4">
          <span className="text-sm font-semibold">Portfolio Admin</span>
          <div className="flex items-center gap-2">
            {publishMsg && (
              <span className={cn(
                "text-xs",
                publishMsg.startsWith("Error") ? "text-red-400" : "text-green-400"
              )}>
                {publishMsg}
              </span>
            )}
            {selected && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  asChild
                >
                  <Link
                    href={selected.kind === "home" ? "/preview" : `/preview/work/${selected.slug}`}
                    target="_blank"
                  >
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    Preview draft
                  </Link>
                </Button>
                <Button
                  size="sm"
                  onClick={handlePublish}
                  disabled={publishing}
                  className={cn(selectedStatus === "published" && "opacity-80")}
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  {publishing ? "Publishing…" : "Publish"}
                </Button>
              </>
            )}
            <form action="/api/auth/signout" method="POST">
              <Button variant="ghost" size="sm" type="submit">
                <LogOut className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline ml-1">{user?.email}</span>
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Page list sidebar */}
        <aside className="w-64 shrink-0 border-r border-border overflow-y-auto">
          <div className="p-3">
            {homePages.length > 0 && (
              <div className="mb-4">
                <div className="mb-1.5 flex items-center gap-1.5 px-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  <Home className="h-3 w-3" aria-hidden="true" />
                  Homepage
                </div>
                {homePages.map((page) => (
                  <PageListItem
                    key={page.id}
                    page={page}
                    status={pageStatuses[page.id] ?? page.status}
                    selected={selectedId === page.id}
                    onSelect={setSelectedId}
                  />
                ))}
              </div>
            )}

            {caseStudyPages.length > 0 && (
              <div>
                <div className="mb-1.5 px-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Case studies
                </div>
                {caseStudyPages.map((page) => (
                  <PageListItem
                    key={page.id}
                    page={page}
                    status={pageStatuses[page.id] ?? page.status}
                    selected={selectedId === page.id}
                    onSelect={setSelectedId}
                  />
                ))}
              </div>
            )}

            {pages.length === 0 && (
              <p className="px-1 text-xs text-muted-foreground">
                No pages found. Run <code className="font-mono">npm run seed</code> to populate.
              </p>
            )}
          </div>
        </aside>

        {/* Block canvas */}
        <div className="flex-1 overflow-y-auto">
          {selected ? (
            <BlockCanvas page={selected} />
          ) : (
            <div className="grid h-full place-items-center text-muted-foreground">
              Select a page to start editing
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function PageListItem({
  page,
  status,
  selected,
  onSelect
}: {
  page: PageMeta;
  status: PageMeta["status"];
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(page.id)}
      className={cn(
        "w-full rounded-md px-2 py-2 text-left text-sm transition",
        selected
          ? "bg-primary/10 text-foreground"
          : "text-muted-foreground hover:bg-white/[0.05] hover:text-foreground"
      )}
    >
      <span className="block truncate font-medium">{page.title}</span>
      <Badge
        className={cn(
          "mt-0.5 text-[10px]",
          status === "published" ? "text-green-400" : "text-amber-400"
        )}
      >
        {status}
      </Badge>
    </button>
  );
}
