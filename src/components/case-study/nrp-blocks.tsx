import { Camera, ShieldCheck, ArrowRight } from "lucide-react";
import type {
  KeyDecision,
  NrpCaseStudy,
  NrpRoleType,
  RankDef,
  ReflectionItem
} from "@/content/case-studies/neonatal-resuscitation-program";

export function VisualPlaceholder({
  label,
  description
}: {
  label: string;
  description?: string;
}) {
  return (
    <figure className="mx-auto mt-6 max-w-3xl overflow-hidden rounded-xl border border-dashed border-white/[0.18] bg-white/[0.02] p-6 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04]">
        <Camera className="h-4 w-4 text-primary/80" aria-hidden="true" />
      </div>
      <figcaption className="mt-4">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/80">
          Visual showcase
        </div>
        <div className="mt-2 font-display text-sm font-semibold text-foreground">{label}</div>
        {description ? (
          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function RoleGrid({ roles }: { roles: NrpRoleType[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {roles.map((role) => (
        <article
          key={role.id}
          className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition hover:border-white/[0.14] hover:bg-white/[0.04]"
        >
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="text-2xl">
              {role.emoji}
            </span>
            <h3 className="font-display text-lg font-semibold tracking-tight">{role.archetype}</h3>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{role.pitch}</p>
          <div className="mt-5 flex-1">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              What they need
            </div>
            <ul className="mt-3 space-y-2">
              {role.needs.map((need) => (
                <li key={need} className="flex gap-2 text-sm leading-6 text-foreground/90">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/80" />
                  {need}
                </li>
              ))}
            </ul>
          </div>
          {role.quote ? (
            <blockquote className="mt-6 border-l-2 border-primary/60 pl-4 text-sm italic leading-6 text-foreground/85">
              &ldquo;{role.quote}&rdquo;
            </blockquote>
          ) : null}
        </article>
      ))}
    </div>
  );
}

export function PillarList({
  intro,
  pillars
}: {
  intro: string;
  pillars: { title: string; body: string }[];
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="mx-auto max-w-2xl text-center text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
        {intro}
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {pillars.map((pillar, i) => (
          <article
            key={pillar.title}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <div className="flex items-center gap-3">
              <span className="font-display text-xl font-semibold leading-none text-primary/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-base font-semibold tracking-tight md:text-lg">
                {pillar.title}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{pillar.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function KeyDecisionList({ decisions }: { decisions: KeyDecision[] }) {
  return (
    <div className="mx-auto grid max-w-4xl gap-10">
      {decisions.map((d) => (
        <article key={d.id} className="grid gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 md:grid-cols-[80px_1fr] md:p-9">
          <div className="font-display text-5xl font-semibold leading-none text-primary/70">
            {d.number}
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{d.title}</h3>
            {d.body.map((p, i) => (
              <p key={i} className="mt-4 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
                {p}
              </p>
            ))}
            <div className="mt-6 rounded-xl border border-primary/15 bg-primary/[0.04] p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">Rationale</div>
              <p className="mt-2 text-sm leading-6 text-foreground/95">{d.rationale}</p>
            </div>
            {d.visualLabel ? (
              <VisualPlaceholder label={d.visualLabel} description={d.visualDescription} />
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

export function RankTable({ ranks }: { ranks: RankDef[] }) {
  return (
    <div className="mx-auto max-w-5xl overflow-x-auto rounded-2xl border border-white/[0.06]">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-white/[0.04]">
          <tr>
            <th className="w-[180px] p-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Rank
            </th>
            <th className="w-[180px] p-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Status
            </th>
            <th className="p-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Business rule
            </th>
          </tr>
        </thead>
        <tbody>
          {ranks.map((r) => (
            <tr key={r.rank} className="border-t border-white/[0.05] align-top">
              <td className="p-5 font-display text-base font-semibold text-foreground">{r.rank}</td>
              <td className="p-5">
                <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/90">
                  {r.status}
                </span>
              </td>
              <td className="p-5 leading-6 text-muted-foreground">{r.rule}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AccessibilityBlock({
  intro,
  items
}: {
  intro: string;
  items: string[];
}) {
  // Nothing documented, nothing claimed: omit the block rather than show a disclaimer-only section.
  if (items.length === 0) return null;
  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.4fr]">
      <div>
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
          <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">
          Accessibility was clinical safety
        </h3>
        <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
          {intro}
        </p>
      </div>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-sm leading-6 text-foreground/90"
          >
            <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MigrationBlock({
  summary,
  items
}: {
  summary: string;
  items: string[];
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="mx-auto max-w-2xl text-center text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
        {summary}
      </p>
      <ol className="mt-10 grid gap-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-sm leading-7 text-muted-foreground"
          >
            <span className="font-display text-xl font-semibold leading-none text-primary/80">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function NrpImpactBlock({ impact }: { impact: NrpCaseStudy["impact"] }) {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
          What this work delivered
        </div>
        <ul className="mt-6 grid gap-5">
          {impact.delivered.map((item, i) => (
            <li key={i} className="flex gap-4 text-sm leading-7 text-muted-foreground">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <aside className="rounded-2xl border border-amber-300/20 bg-amber-400/[0.04] p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200/90">
          Honest framing — what&apos;s not yet measured
        </div>
        <p className="mt-5 text-sm leading-7 text-foreground/90">{impact.unmeasured}</p>
      </aside>
    </div>
  );
}

export function NrpReflectionList({ items }: { items: ReflectionItem[] }) {
  return (
    <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.heading}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7"
        >
          <h3 className="font-display text-lg font-semibold tracking-tight">{item.heading}</h3>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.body}</p>
        </article>
      ))}
    </div>
  );
}
