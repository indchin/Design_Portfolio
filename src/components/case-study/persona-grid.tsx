"use client";

import { useId, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog } from "@/components/ui/dialog";
import type { Persona } from "@/content/case-studies/adapt-authoring-tool";

/* ---------------------------------------------------------------- modal */

function PersonaModal({
  persona,
  onClose
}: {
  persona: Persona;
  onClose: () => void;
}) {
  const titleId = useId();

  return (
    <Dialog
      onClose={onClose}
      labelledBy={titleId}
      overlayClassName="bg-black/70 p-4 backdrop-blur-sm sm:p-8"
      className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-2xl"
    >
        {/* header */}
        <div className="flex items-start justify-between gap-4 border-b border-border p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <span aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-white/[0.03] text-3xl">
              {persona.emoji}
            </span>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                Persona
              </div>
              <h2 id={titleId} className="mt-0.5 font-display text-xl font-semibold tracking-tight">
                {persona.archetype}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="mt-0.5 rounded-lg p-1.5 text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* scrollable body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* pitch + experience */}
          <p className="text-sm leading-7 text-muted-foreground">{persona.pitch}</p>
          <div className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-primary/80">
            {persona.experience}
          </div>

          {/* context */}
          {persona.context && (
            <div className="mt-6">
              <SectionLabel>Context</SectionLabel>
              <p className="mt-3 text-sm leading-7 text-foreground/80">{persona.context}</p>
            </div>
          )}

          {/* goals + frustrations */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {persona.goals && persona.goals.length > 0 && (
              <div className="rounded-xl border border-border bg-white/[0.02] p-5">
                <SectionLabel>Goals</SectionLabel>
                <ul className="mt-3 space-y-2.5">
                  {persona.goals.map((g) => (
                    <li key={g} className="flex gap-2.5 text-sm leading-6 text-foreground/85">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/80" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {persona.frustrations && persona.frustrations.length > 0 && (
              <div className="rounded-xl border border-border bg-white/[0.02] p-5">
                <SectionLabel>Frustrations</SectionLabel>
                <ul className="mt-3 space-y-2.5">
                  {persona.frustrations.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm leading-6 text-foreground/85">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400/80" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* what they need */}
          <div className="mt-5 rounded-xl border border-border bg-white/[0.02] p-5">
            <SectionLabel>What they need</SectionLabel>
            <ul className="mt-3 flex flex-wrap gap-2">
              {persona.needs.map((need) => (
                <li
                  key={need}
                  className="rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1 text-xs font-medium text-primary/90"
                >
                  {need}
                </li>
              ))}
            </ul>
          </div>

          {/* tools */}
          {persona.tools && persona.tools.length > 0 && (
            <div className="mt-5 rounded-xl border border-border bg-white/[0.02] p-5">
              <SectionLabel>Tools they use</SectionLabel>
              <ul className="mt-3 flex flex-wrap gap-2">
                {persona.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/70"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* quote */}
          <blockquote className="mt-6 border-l-2 border-primary/60 pl-4 text-sm italic leading-7 text-foreground/85">
            &ldquo;{persona.quote}&rdquo;
          </blockquote>
        </div>
    </Dialog>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- grid */

export function PersonaGrid({ personas }: { personas: Persona[] }) {
  const [active, setActive] = useState<Persona | null>(null);

  return (
    <>
      <div className="mx-auto max-w-5xl grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {personas.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p)}
            className={cn(
              "group flex w-full flex-col rounded-2xl border border-border bg-white/[0.02] p-7 text-left",
              "transition hover:border-foreground/30 hover:bg-white/[0.04]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            )}
            aria-label={`Open ${p.archetype} persona`}
          >
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="text-2xl">{p.emoji}</span>
              <h3 className="font-display text-lg font-semibold tracking-tight">{p.archetype}</h3>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{p.pitch}</p>
            <div className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-primary/80">
              {p.experience}
            </div>
            <div className="mt-4 flex-1">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                What they need
              </div>
              <ul className="mt-3 space-y-2">
                {p.needs.map((need) => (
                  <li key={need} className="flex gap-2 text-sm leading-6 text-foreground/90">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/80" />
                    {need}
                  </li>
                ))}
              </ul>
            </div>
            <blockquote className="mt-6 border-l-2 border-primary/60 pl-4 text-sm italic leading-6 text-foreground/85">
              &ldquo;{p.quote}&rdquo;
            </blockquote>
            <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/60 transition group-hover:text-primary/90">
              View full persona →
            </div>
          </button>
        ))}
      </div>

      {active && <PersonaModal persona={active} onClose={() => setActive(null)} />}
    </>
  );
}
