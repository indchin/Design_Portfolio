import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUp, ArrowUpRight, Calendar, Camera, ChevronDown, Layers, Lock, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionShell, CaseStudyFooter } from "@/components/case-study/editorial-blocks";
import { StickyToc } from "@/components/case-study/sticky-toc";
import { AssetViewer, Tabs, Timeline } from "@/components/case-study/nrp-client";
import { resolveAssets, showPlaceholders } from "@/lib/nrp-assets";
import { cn } from "@/lib/utils";
import { nrp, type Slot } from "@/content/case-studies/nrp-pediaskills";

/* ── Card tiers ─────────────────────────────────────────────────────── */
// flat: top rule only (challenges, rules, constraints). standard: process. featured: decisions, outcome.
const flat = "border-t border-hairline/20 pt-4";
const standard = "rounded-2xl border border-hairline/[0.06] bg-fill-subtle/[0.02] p-6";
const featured = "rounded-2xl border border-hairline/15 bg-fill-subtle/[0.06] p-6 md:p-8";
const prose = "max-w-[65ch] text-base leading-7 text-muted-foreground";
const h3 = "font-display text-lg font-semibold tracking-tight md:text-xl";
const wrap = "max-w-5xl";

/* ── Artifacts: present / pending (draft only) / withheld ───────────── */

function RedactedFrame({ slot, aspect, className }: { slot: Slot; aspect: string; className?: string }) {
  return (
    <figure className={className}>
      <div
        className="flex flex-col items-center justify-center gap-3 rounded-xl border border-hairline/10 bg-surface p-6 text-center"
        style={{ aspectRatio: aspect }}
      >
        <Lock className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <p className="max-w-sm text-sm leading-5 text-muted-foreground">Screens withheld for client confidentiality. Walkthrough on request.</p>
      </div>
      <figcaption className="sr-only">{slot.label}</figcaption>
    </figure>
  );
}

function Asset({ slot, className, aspect }: { slot: Slot; className?: string; aspect?: string }) {
  const ratio = aspect ?? slot.aspect ?? "16/10";
  if (slot.withheld) return <RedactedFrame slot={slot} aspect={ratio} className={className} />;
  const srcs = resolveAssets(slot.id);
  if (srcs.length) {
    return (
      <div className={className}>
        <AssetViewer srcs={srcs} label={slot.label} alt={slot.alt} caption={slot.caption} aspect={ratio} />
      </div>
    );
  }
  if (!showPlaceholders) return null;
  return (
    <div className={className}>
      <div className="flex h-14 items-center gap-3 rounded-lg border border-dashed border-draft-border bg-draft-bg px-4 text-sm text-draft-fg">
        <Camera className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="min-w-0 truncate font-medium">Screenshot: {slot.label}</span>
        <code className="ml-auto hidden shrink-0 text-xs sm:inline">{slot.id}.png</code>
      </div>
    </div>
  );
}

/* ── Draft checklist (dev only) ─────────────────────────────────────── */

type DraftItem = { title: string; text: string; href: string };

function DraftChecklist({ items, slots }: { items: DraftItem[]; slots: { section: string; slot: Slot }[] }) {
  if (!showPlaceholders) return null;
  const count = items.length + slots.length;
  return (
    <div className="fixed right-4 top-[7.5rem] z-10 w-[min(24rem,calc(100vw-2rem))] rounded-xl bg-background shadow-lg xl:top-24">
      <details className="group rounded-xl border border-draft-border bg-draft-bg text-draft-fg">
        <summary className="focus-ring flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
          Draft: {count} items pending
          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
        </summary>
        <div className="max-h-[60vh] space-y-4 overflow-y-auto border-t border-draft-border px-4 py-4 text-xs leading-5">
          <p>Author-only. This panel does not render in production.</p>
          <ul className="space-y-3">
            {items.map((i) => (
              <li key={i.title}>
                <a href={i.href} className="focus-ring font-semibold underline underline-offset-2">{i.title}</a>
                <p className="mt-1">{i.text}</p>
              </li>
            ))}
          </ul>
          <div>
            <div className="font-semibold">Screenshots pending ({slots.length})</div>
            <ul className="mt-2 space-y-1">
              {slots.map(({ section, slot }) => (
                <li key={slot.id}>
                  <a href={section} className="focus-ring underline underline-offset-2">{slot.label}</a>{" "}
                  <code>{slot.id}.png</code>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </details>
    </div>
  );
}

/** Used only where a section has no public content yet (hidden in production). */
function DraftNote({ children }: { children: React.ReactNode }) {
  if (!showPlaceholders) return null;
  return <div className="max-w-[65ch] rounded-lg border border-dashed border-draft-border bg-draft-bg p-4 text-sm leading-6 text-draft-fg">{children}</div>;
}

/* ── Disclosure (native details; one level only) ────────────────────── */

function Disclosure({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <details className="group mt-10 rounded-2xl border border-hairline/15 bg-fill-subtle/[0.02]">
      <summary className="focus-ring flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-5 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block font-display text-lg font-semibold tracking-tight">{title}</span>
          <span className="mt-1 block text-sm text-muted-foreground">{hint}</span>
        </span>
        <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
      </summary>
      <div className="space-y-10 border-t border-hairline/10 p-5 md:p-8">{children}</div>
    </details>
  );
}

/* ── Rank ladder ────────────────────────────────────────────────────── */

const chipStyle = {
  done: { text: "Done", cls: "bg-chip-done-bg text-chip-done-fg" },
  pending: { text: "Pending", cls: "bg-chip-pending-bg text-chip-pending-fg" },
  locked: { text: "Locked", cls: "bg-chip-locked-bg text-chip-locked-fg" }
} as const;

function RankLadder() {
  const { ladder, backOffice } = nrp.users;
  return (
    <div>
      <h3 className={h3}>The rank ladder</h3>
      <p className="mt-2 max-w-[65ch] text-sm leading-6 text-muted-foreground">
        Six rungs from guest to mentor, with the rule that governs each step. States are an illustration of how progress reads for a learner partway up, not a real account. Locked means unavailable until the earlier step is complete.
      </p>
      <ol aria-label="Progression ladder, six rungs" className="mt-6 lg:grid lg:grid-cols-6 lg:gap-4">
        {ladder.map((r) => {
          const chip = chipStyle[r.state];
          return (
            <li key={r.name} className="relative pb-6 pl-8 last:pb-0 lg:pb-0 lg:pl-0 lg:pt-8 [&:last-child>span:first-child]:hidden">
              <span aria-hidden="true" className="absolute left-[7px] top-4 h-full w-px bg-hairline/20 lg:left-2 lg:top-[7px] lg:h-px lg:w-[calc(100%+1rem)]" />
              <span aria-hidden="true" className={cn("absolute left-0 top-1 h-4 w-4 rounded-full border-2 bg-background lg:top-0", r.state === "done" ? "border-primary bg-primary" : "border-hairline/45")} />
              <div className="font-display text-base font-semibold leading-6">{r.name}</div>
              <span className={cn("mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold", chip.cls)}>
                <span className="sr-only">Status: </span>
                {chip.text}
              </span>
              <p className="mt-2 text-sm leading-5 text-muted-foreground">{r.note}</p>
              {r.rule ? <p className="mt-2 inline-block rounded-md border border-hairline/20 px-2 py-1 text-xs leading-4 text-foreground/90">{r.rule}</p> : null}
            </li>
          );
        })}
      </ol>
      <div className="mt-8 border-t border-hairline/20 pt-4">
        <h4 className="nrp-label">Back office</h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {backOffice.map((b) => (
            <li key={b} className="rounded-md border border-hairline/20 px-2.5 py-1 text-sm">{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Decisions ──────────────────────────────────────────────────────── */

type Decision = (typeof nrp.decisions)[number];

function DecisionCard({ d }: { d: Decision }) {
  if (!("draft" in d)) return null;
  const hasArt = showPlaceholders || resolveAssets(d.id).length > 0;
  const num = d.id.replace("decision-", "");
  return (
    <article id={d.id} className={cn(featured, "scroll-mt-4 grid grid-cols-1 gap-6", hasArt && "md:grid-cols-12 md:gap-8")}>
      <div className={cn("min-w-0", hasArt && "md:col-span-7")}>
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">Decision {num}</span>
        <h3 className="mt-3 font-display text-xl font-semibold leading-7 tracking-tight">{d.title}</h3>
        <dl className="mt-5 space-y-4">
          <div>
            <dt className="nrp-label">{d.kind === "Rule" ? "Rule" : "Feedback"}</dt>
            <dd className="mt-1 text-base leading-7">{d.rule}</dd>
            <dd className="mt-1 text-sm leading-5 text-muted-foreground">Source: {d.source}</dd>
          </div>
          <div>
            <dt className="nrp-label">Chosen</dt>
            <dd className="mt-1 text-base leading-7">{d.chosen}</dd>
          </div>
        </dl>
      </div>
      {hasArt ? (
        <div className="min-w-0 md:col-span-5">
          <Asset slot={{ id: d.id, label: d.title, aspect: "4/3" }} aspect="4/3" />
        </div>
      ) : null}
    </article>
  );
}

/* ── Page ───────────────────────────────────────────────────────────── */

export function NrpPageBody() {
  const { meta } = nrp;
  const decisionNum = (id: string) => id.replace("decision-", "");

  const finalTabs = nrp.finalDesign
    .filter((s) => showPlaceholders || resolveAssets(s.id).length > 0)
    .map((s) => ({
      id: s.id,
      label: s.label,
      panel: <Asset slot={s} aspect="16/10" />
    }));

  // Production hides sections or blocks that have no supported content.
  const hasArt = (...slots: Slot[]) => slots.some((s) => resolveAssets(s.id).length > 0);
  const show = {
    journeys: showPlaceholders || hasArt(...nrp.journeys.maps, nrp.journeys.ideation, nrp.journeys.mockups),
    finalDesign: showPlaceholders || finalTabs.length > 0 || Boolean(nrp.prototypeUrl),
    visual: showPlaceholders || hasArt(nrp.visual.styleGuide, nrp.visual.beforeAfter),
    // Ownership and reflection text is unconfirmed: draft only, section dropped from production and the TOC.
    role: showPlaceholders,
    reflection: showPlaceholders
  };
  const toc = nrp.toc.filter((t) => (t.id === "role" ? show.role : t.id === "reflection" ? show.reflection : true));

  const timelineItems = nrp.evolution
    .filter((e) => showPlaceholders || !("draftOnly" in e))
    .map((e) => ({
    id: e.id,
    year: e.year,
    title: e.title,
    body: e.body,
    panel: <Asset slot={e.slot} aspect="16/10" />
  }));

  const leads = nrp.decisions.filter((d) => d.lead);
  const small = nrp.decisions.filter((d) => !d.lead);

  /* Draft checklist content (never reaches production). */
  const draftItems: DraftItem[] = showPlaceholders
    ? [
        { title: "Hero: scope, team size, what I owned", text: meta.scopeDraft, href: "#main" },
        { title: "Hero: confirm exact job title", text: `Shown as "${meta.role}". [NEEDS FROM CHINMAY: confirm the exact title.]`, href: "#main" },
        { title: "Problem statement wording", text: "[NEEDS FROM CHINMAY: confirm the how-might-we statement is your framing.]", href: "#problem" },
        { title: "My role (section hidden in production)", text: nrp.roleDraft, href: "#role" },
        ...leads.map((d) => {
          const dd = "draft" in d ? d.draft : null;
          return {
            title: `Decision ${decisionNum(d.id)}: options, trade-off, result, who decided`,
            text: dd ? `Options considered: ${dd.options} Trade-off: ${dd.tradeoff} Result: ${dd.result} Who made the call: [NEEDS FROM CHINMAY: role, not name.]` : "",
            href: `#${d.id}`
          };
        }),
        { title: "Requirements: what I would test first", text: nrp.research.testFirstDraft, href: "#rules" },
        { title: "Users: primary-need wording", text: "[NEEDS FROM CHINMAY: confirm the per-role needs match the role model.]", href: "#rules" },
        { title: "Competitive or reference review; usability tests", text: "[NEEDS FROM CHINMAY: only if done; otherwise leave out. No research findings or quotes exist yet.]", href: "#rules" },
        { title: "Outcome: observed extension", text: nrp.outcomes.observedDraft, href: "#outcome" },
        { title: "Outcome: measured results and stakeholder quote", text: "[NEEDS FROM CHINMAY: completion, conversion, support tickets, task time, each with source and period; optional quote.]", href: "#outcome" },
        { title: "Evolution: chatbot item (draft only)", text: "[NEEDS FROM CHINMAY: log a source for the three chatbot phases, or drop the item.]", href: "#evolution" },
        { title: "Process: confirm cadence", text: "[NEEDS FROM CHINMAY: SAFe Agile, two-week sprints, design 1-2 sprints ahead are from the old draft only; confirm before publishing.]", href: "#rules" },
        { title: "Evolution: did the 2024 migration and 2026 rebrand ship?", text: "[NEEDS FROM CHINMAY: the timeline describes designs and specs; confirm which shipped before it is read as delivered.]", href: "#evolution" },
        { title: "Journeys: prototype/PDF links and ideation text", text: "[NEEDS FROM CHINMAY: links per journey if shareable; 2-4 sentences on options explored.]", href: "#rules" },
        { title: "Final design: prototype link; visual decisions", text: "[NEEDS FROM CHINMAY: set prototypeUrl if shareable; type, colour, component decisions.]", href: "#decisions" },
        { title: "Reflection (section hidden in production)", text: nrp.reflectionDraft.join(" | "), href: "#reflection" },
        { title: "Reflection: roadmap and credits", text: `Roadmap (unconfirmed): ${nrp.next.join("; ")}. [NEEDS FROM CHINMAY: confirm each, and which collaborators you may name.]`, href: "#reflection" }
      ]
    : [];
  const decisionSlot = (d: Decision): Slot => ({ id: d.id, label: d.title, aspect: "4/3" });
  const slotGroups: { section: string; slots: Slot[] }[] = [
    { section: "#main", slots: [nrp.hero] },
    { section: "#problem", slots: [nrp.problem.proposal] },
    { section: "#decisions", slots: [...leads.map(decisionSlot), ...nrp.finalDesign, nrp.visual.styleGuide, nrp.visual.beforeAfter] },
    {
      section: "#rules",
      slots: [nrp.research.artefact, nrp.process.diagram, nrp.users.personas, nrp.users.learningPaths, ...nrp.journeys.maps, nrp.journeys.ideation, nrp.journeys.mockups, nrp.validation.beforeAfter]
    },
    { section: "#evolution", slots: nrp.evolution.map((e) => e.slot) }
  ];
  const pendingSlots = showPlaceholders
    ? slotGroups.flatMap((g) => g.slots.filter((s) => resolveAssets(s.id).length === 0).map((slot) => ({ section: g.section, slot })))
    : [];

  return (
    <>
      <DraftChecklist items={draftItems} slots={pendingSlots} />

      {/* Hero + at a glance */}
      <section className="relative overflow-hidden pb-10 pt-24 md:pb-14 md:pt-28">
        <div className="absolute inset-0 bg-radial-field opacity-60 blur-3xl" aria-hidden="true" />
        <div className="container relative">
          <Button asChild variant="ghost" className="mb-8 md:mb-10">
            <Link href="/#work">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to work
            </Link>
          </Button>
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex flex-wrap justify-center gap-2">
              <Badge>Case Study</Badge>
              <Badge>Healthcare · EdTech</Badge>
            </div>
            <h1 className="mt-6 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl md:mt-8 md:text-5xl lg:text-6xl">
              {meta.title}
            </h1>
            <p className="mt-5 text-balance text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 md:mt-6 md:text-xl">
              {meta.tagline}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Button asChild variant="secondary">
                <a href="#decisions">
                  Jump to decisions
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href="#outcome">
                  Jump to outcome
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          {/* At a glance: only supported facts are visible in production (scope and team size are draft-checklist items). */}
          <div className="mx-auto mt-8 grid max-w-5xl gap-px overflow-hidden rounded-2xl border border-hairline/15 bg-fill-subtle/[0.06] sm:grid-cols-2">
            <div className="bg-background/40 p-5">
              <div className="nrp-label">The problem</div>
              <p className="mt-2 line-clamp-2 text-base font-medium leading-6">{meta.problemLine}</p>
            </div>
            <div className="bg-background/40 p-5">
              <div className="nrp-label">Reach</div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-display text-4xl font-semibold tracking-tight text-primary">{nrp.overview.reach.value}</span>
                <span className="text-base font-medium leading-6">{nrp.overview.reach.label}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{nrp.overview.reach.note}</p>
            </div>
          </div>

          <dl className="mx-auto mt-4 grid max-w-5xl gap-px overflow-hidden rounded-2xl border border-hairline/[0.06] bg-fill-subtle/[0.02] text-sm sm:grid-cols-3">
            {[
              { icon: UserRound, label: "Role", value: meta.role },
              { icon: Calendar, label: "Timeline", value: `${meta.timeline} (six years)` },
              { icon: Layers, label: "Client", value: meta.client }
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-background/40 p-5">
                <dt className="nrp-label flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="mt-2 text-base font-medium leading-6">{value}</dd>
              </div>
            ))}
          </dl>

          <Asset slot={nrp.hero} aspect="16/9" className="mx-auto mt-10 max-w-5xl" />
        </div>
      </section>

      <div className="container py-4 xl:grid xl:grid-cols-[220px_1fr] xl:items-start xl:gap-12">
        {/* contents below xl so the mobile TOC can stick across the whole content column */}
        <div className="contents xl:sticky xl:top-28 xl:block xl:self-start">
          <StickyToc items={toc} />
        </div>

        <div className="min-w-0">
          {/* 2 Problem and stakes */}
          <SectionShell align="left" id="problem" eyebrow="Problem and stakes" title="Complex rules, simple journeys" intro={nrp.problem.intro} bordered={false}>
            <div className={wrap}>
              {nrp.overview.summary.map((p) => (
                <p key={p} className={cn(prose, "mb-4")}>{p}</p>
              ))}
              <p className={prose}>{nrp.problem.background}</p>
              <blockquote className="mt-10 max-w-3xl border-l-2 border-primary/60 pl-6">
                <div className="nrp-label nrp-label-primary">Problem statement</div>
                <p className="mt-3 text-balance font-display text-xl font-medium leading-8 md:text-2xl md:leading-9">{nrp.problem.statement}</p>
              </blockquote>
              <div className="mt-12 grid gap-x-8 gap-y-6 md:grid-cols-2">
                {nrp.problem.challenges.map((c, i) => (
                  <article key={c.title} className={flat}>
                    <div className="nrp-label nrp-label-primary">Challenge {String(i + 1).padStart(2, "0")}</div>
                    <h3 className="mt-2 font-display text-base font-semibold tracking-tight md:text-lg">{c.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{c.body}</p>
                  </article>
                ))}
              </div>
              <div className="mt-12">
                <h3 className="nrp-label">Constraints</h3>
                <ul className="mt-4 grid gap-x-8 gap-y-3 md:grid-cols-2">
                  {nrp.problem.constraints.map((c) => (
                    <li key={c} className={cn(flat, "text-sm leading-6 text-foreground/90")}>{c}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-12">
                <h3 className={h3}>Goals</h3>
                <div className="mt-4 overflow-hidden rounded-2xl border border-hairline/[0.06]">
                  <table className="w-full text-left text-sm">
                    <caption className="sr-only">Project goals and success criteria</caption>
                    <thead className="bg-fill-subtle/[0.04]">
                      <tr className="nrp-label">
                        <th scope="col" className="w-1/3 px-5 py-3 font-semibold">Goal</th>
                        <th scope="col" className="px-5 py-3 font-semibold">Success criteria</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nrp.goals.map((g) => (
                        <tr key={g.goal} className="border-t border-hairline/[0.06] align-top">
                          <th scope="row" className="px-5 py-4 font-display font-semibold">{g.goal}</th>
                          <td className="px-5 py-4 leading-6 text-muted-foreground">{g.success}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <Asset slot={nrp.problem.proposal} className="mt-10 max-w-3xl" />
            </div>
          </SectionShell>

          {/* 3 My role (draft only) */}
          {show.role ? (
            <SectionShell align="left" id="role" eyebrow="My role" title="What I did">
              <div className={wrap}>
                <DraftNote>{nrp.roleDraft}</DraftNote>
                <p className="mt-4 max-w-[65ch] text-sm leading-6 text-draft-fg">Team composition (from the notes): {meta.team}.</p>
              </div>
            </SectionShell>
          ) : null}

          {/* 4 Three decisions */}
          <SectionShell align="left" id="decisions" eyebrow="Decisions" title="Three decisions with the clearest trail" intro="Each comes from a confirmed business rule or stakeholder feedback. The smaller rules and the final screens are one click away.">
            <div className={cn(wrap, "grid grid-cols-1 gap-6")}>
              {leads.map((d) => (
                <DecisionCard key={d.id} d={d} />
              ))}
            </div>
            <div className={wrap}>
              <Disclosure title="Rules I designed around" hint="Smaller decisions 02, 03, 04 and 06: the rule, and how the design makes it legible · about 1 min">
                <ul className="divide-y divide-hairline/10">
                  {small.map((d) => (
                    <li key={d.id} className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[1fr_2fr] md:gap-8">
                      <div>
                        <div className="nrp-label">Decision {decisionNum(d.id)}</div>
                        <h4 className="mt-1 font-display text-base font-semibold leading-6 tracking-tight">{d.title}</h4>
                      </div>
                      {"legible" in d ? (
                        <dl className="space-y-2 text-sm leading-6">
                          <div>
                            <dt className="nrp-label">The rule</dt>
                            <dd className="mt-0.5">{d.rule}</dd>
                          </div>
                          <div>
                            <dt className="nrp-label">How it is made legible</dt>
                            <dd className="mt-0.5 text-muted-foreground">{d.legible}</dd>
                          </div>
                          {"chip" in d && d.chip ? <div className="inline-block rounded-md border border-hairline/20 px-2 py-1 text-xs">{d.chip}</div> : null}
                        </dl>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </Disclosure>
              {show.finalDesign || show.visual ? (
                <Disclosure title="Final design by area" hint="Final screens by area and the visual language · about 2 min">
                  {finalTabs.length ? <Tabs tabs={finalTabs} label="Final design areas" /> : null}
                  {nrp.prototypeUrl ? (
                    <Button asChild>
                      <a href={nrp.prototypeUrl} target="_blank" rel="noopener noreferrer">
                        Open interactive prototype
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </Button>
                  ) : null}
                  {show.visual ? (
                    <div className="space-y-6">
                      <h3 className={h3}>Visual design</h3>
                      <p className={prose}>{nrp.visual.body}</p>
                      <Asset slot={nrp.visual.styleGuide} aspect="16/10" />
                      <Asset slot={nrp.visual.beforeAfter} aspect="16/10" />
                    </div>
                  ) : null}
                </Disclosure>
              ) : null}
            </div>
          </SectionShell>

          {/* 5 Rules, roles and demo feedback */}
          <SectionShell align="left" id="rules" eyebrow="Rules, roles and feedback" title="Rules, roles and demo feedback">
            <div className={wrap}>
              <h3 className={h3}>Requirements and business rules</h3>
              <p className={cn(prose, "mt-3")}>{nrp.research.intro}</p>
              <p className={cn(prose, "mt-3")}>{nrp.research.workshopIntro}</p>
              <aside className={cn(featured, "mt-8 max-w-3xl")} aria-labelledby="evidence-limits">
                <h4 id="evidence-limits" className="nrp-label nrp-label-primary">Evidence and limits</h4>
                <p className="mt-2 text-base leading-7">{nrp.research.evidence}</p>
              </aside>
              <div className="mt-10 grid gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
                {nrp.research.rules.map((r) => (
                  <article key={r.title} className={flat}>
                    <h4 className="font-display text-base font-semibold tracking-tight">{r.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{r.body}</p>
                  </article>
                ))}
              </div>
              <Asset slot={nrp.research.artefact} aspect="16/10" className="mt-10 max-w-3xl" />

              <h3 className={cn(h3, "mt-14")}>How the work ran</h3>
              <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {nrp.process.steps.map((s, i) => (
                  <li key={s} className={cn(standard, "p-4")}>
                    <span className="nrp-label nrp-label-primary">Step {i + 1}</span>
                    <p className="mt-1 text-sm leading-6">{s}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Tools: {meta.tools}.</p>
              <Asset slot={nrp.process.diagram} aspect="16/9" className="mt-8 max-w-4xl" />

              <Disclosure title="Six roles and the rank ladder" hint="Six role groups, the progression ladder with its 30-day, 120-day and 1:1 rules, and journeys · about 3 min">
                <div>
                  <p className={prose}>{nrp.users.intro}</p>
                  <ul className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-2">
                    {nrp.users.roles.map((r) => (
                      <li key={r.role} className={flat}>
                        <h4 className="font-display text-base font-semibold tracking-tight">{r.role}</h4>
                        <p className="mt-2 text-sm leading-6">{r.need}</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">Key journeys: {r.journeys}</p>
                      </li>
                    ))}
                  </ul>
                  <Asset slot={nrp.users.personas} aspect="16/10" className="mt-8" />
                </div>
                <RankLadder />
                <Asset slot={nrp.users.learningPaths} aspect="16/9" />
                {show.journeys ? (
                  <div className="space-y-6">
                    <h3 className={h3}>From role journeys to a dashboard</h3>
                    <p className={prose}>{nrp.journeys.intro}</p>
                    {nrp.journeys.maps.map((m) => (
                      <Asset key={m.id} slot={m} aspect="16/10" />
                    ))}
                    <Asset slot={nrp.journeys.ideation} aspect="16/10" />
                    <Asset slot={nrp.journeys.mockups} aspect="16/10" />
                  </div>
                ) : null}
              </Disclosure>

              <h3 className={cn(h3, "mt-14")}>Stakeholder demo feedback</h3>
              <p className={cn(prose, "mt-3")}>{nrp.validation.intro}</p>
              <ul className="mt-6 grid gap-3">
                {nrp.validation.changes.map((c) => (
                  <li key={c.feedback} className={cn(standard, "grid gap-2 p-5 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6")}>
                    <div>
                      <div className="nrp-label">Feedback</div>
                      <p className="mt-1 text-sm leading-6">{c.feedback}</p>
                    </div>
                    <ArrowUpRight className="hidden h-4 w-4 text-primary md:block" aria-hidden="true" />
                    <div>
                      <div className="nrp-label nrp-label-primary">Change</div>
                      <p className="mt-1 text-sm leading-6">{c.change}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className={cn(prose, "mt-6")}>{nrp.validation.limits}</p>
              <Asset slot={nrp.validation.beforeAfter} aspect="16/10" className="mt-8 max-w-4xl" />
            </div>
          </SectionShell>

          {/* 6 Evolution */}
          <SectionShell align="left" id="evolution" eyebrow="Evolution" title="Six years of change" intro={showPlaceholders ? "After the MVP, the design work covered new editions, new admin tools, a rebrand and a help-assistant exploration." : "After the MVP, the design work covered new editions, new admin tools and a rebrand."}>
            <Timeline items={timelineItems} />
          </SectionShell>

          {/* 7 Outcome and honest limits */}
          <SectionShell align="left" id="outcome" eyebrow="Outcome and limits" title={nrp.outcomes.headline}>
            <div className={cn(wrap, featured, "grid gap-8 md:grid-cols-3 md:gap-8")}>
              <div>
                <h3 className="nrp-label nrp-label-primary">Measured</h3>
                <p className="mt-3 text-base leading-7">{nrp.outcomes.measured}</p>
              </div>
              <div>
                <h3 className="nrp-label nrp-label-primary">Delivered</h3>
                <p className="mt-3 text-base leading-7">
                  {nrp.outcomes.observedLead} {nrp.outcomes.mvp.join(", ")}.
                </p>
              </div>
              <div>
                <h3 className="nrp-label nrp-label-primary">Not measured</h3>
                <p className="mt-3 text-base leading-7">{nrp.outcomes.notMeasured}</p>
              </div>
            </div>
            {nrp.outcomes.quote ? (
              <figure className="mt-10 max-w-2xl">
                <blockquote className="font-display text-xl leading-8">&ldquo;{nrp.outcomes.quote.text}&rdquo;</blockquote>
                <figcaption className="nrp-label mt-3">— {nrp.outcomes.quote.attribution}</figcaption>
              </figure>
            ) : null}
          </SectionShell>

          {/* 8 Reflection (draft only) */}
          {show.reflection ? (
            <SectionShell align="left" id="reflection" eyebrow="Reflection" title="What I learned">
              <div className={cn(wrap, "space-y-3")}>
                {nrp.reflectionDraft.map((r) => (
                  <DraftNote key={r}>{r}</DraftNote>
                ))}
              </div>
            </SectionShell>
          ) : null}
        </div>
      </div>

      <div className="container pb-4 text-center">
        <Button asChild variant="ghost">
          <a href="#main">
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            Back to top
          </a>
        </Button>
      </div>

      <CaseStudyFooter
        next={{
          title: "Adapt authoring tool",
          description: "First structured user research on Laerdal's eLearning authoring platform.",
          href: "/work/adapt-authoring-tool",
          resume: { href: "/resume.pdf", label: "Download resume (PDF, 100 KB)" }
        }}
      />
    </>
  );
}
