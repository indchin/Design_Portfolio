"use client";

import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";

export function DraftBanner({ href }: { href: string }) {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="font-medium">Draft preview</span>
        <span className="text-amber-400/70">— changes here are not live yet</span>
      </div>
      <Link
        href={href}
        className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs hover:bg-amber-500/20 transition"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Back to editor
      </Link>
    </div>
  );
}
