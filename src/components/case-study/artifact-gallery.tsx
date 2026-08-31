"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, type LucideIcon } from "lucide-react";
import type { ResearchArtifact, RecordingItem } from "@/content/case-studies/adapt-authoring-tool";

function Lightbox({
  items,
  index,
  onIndexChange,
  onClose
}: {
  items: RecordingItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const item = items[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndexChange((index + 1) % items.length);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onIndexChange, index, items.length]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-10"
      aria-modal="true"
      role="dialog"
      aria-label={item.name}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" aria-hidden="true" />

      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-8 sm:top-8"
      >
        <X className="h-6 w-6" />
      </button>

      {items.length > 1 && (
        <>
          <button
            onClick={() => onIndexChange((index - 1 + items.length) % items.length)}
            aria-label="Previous"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:left-4"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            onClick={() => onIndexChange((index + 1) % items.length)}
            aria-label="Next"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-4"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </>
      )}

      <div className="relative z-0 flex max-h-full max-w-full flex-col items-center gap-4">
        <div className="relative max-h-[80vh] max-w-[90vw]">
          <Image
            src={item.image}
            alt={item.name}
            width={1600}
            height={1000}
            className="max-h-[80vh] w-auto max-w-[90vw] rounded-lg object-contain"
            sizes="90vw"
          />
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-white">{item.name}</div>
          {item.date && <div className="mt-0.5 text-xs text-white/60">{item.date}</div>}
        </div>
      </div>
    </div>
  );
}

function ArtifactModal({
  artifact,
  onClose
}: {
  artifact: ResearchArtifact;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const items = artifact.items ?? [];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || lightboxIndex !== null) return;
      onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, lightboxIndex]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      aria-modal="true"
      role="dialog"
      aria-label={artifact.label}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0e0e12] shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] p-6 sm:p-8">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/80">
              Research artifact
            </div>
            <h2 className="mt-0.5 font-display text-xl font-semibold tracking-tight">
              {artifact.label}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{artifact.description}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="mt-0.5 shrink-0 rounded-lg p-1.5 text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {items.map((item, i) => (
              <button
                key={item.name}
                onClick={() => setLightboxIndex(i)}
                className="group overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] text-left transition hover:border-white/[0.16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="relative aspect-video w-full bg-black/40">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                    <ZoomIn className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-sm font-medium text-foreground/90">{item.name}</div>
                  {item.date && <div className="mt-0.5 text-xs text-muted-foreground">{item.date}</div>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

export function ArtifactGallery({ artifact, icon: Icon }: { artifact: ResearchArtifact; icon: LucideIcon }) {
  const [open, setOpen] = useState(false);
  const count = artifact.items?.length ?? 0;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex w-full items-start gap-3 rounded-lg p-3 text-left transition hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground/90">{artifact.label}</span>
            <span className="rounded-full border border-primary/20 bg-primary/[0.06] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-primary/90">
              {count}
            </span>
          </div>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">{artifact.description}</p>
        </div>
      </button>

      {open && <ArtifactModal artifact={artifact} onClose={() => setOpen(false)} />}
    </>
  );
}
