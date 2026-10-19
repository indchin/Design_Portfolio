import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, ChevronDown, FileText, MapPin, ScanSearch, Users, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export { PersonaGrid } from "@/components/case-study/persona-grid";
import { ArtifactGallery } from "@/components/case-study/artifact-gallery";
import type {
  Accessibility,
  AdaptCaseStudy,
  Decision,
  DesignSolution,
  Figure as FigureData,
  Finding,
  Persona,
  PhaseResearch,
  ReflectionItem,
  ResearchArtifact,
  RoadmapItem
} from "@/content/case-studies/adapt-authoring-tool";

const proseColumn = "mx-auto max-w-2xl text-base leading-8 text-muted-foreground";

export function SectionShell({
  id,
  eyebrow,
  title,
  intro,
  children,
  bordered = true,
  align = "center"
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: React.ReactNode;
  bordered?: boolean;
  /** "left" is opt-in (NRP page): header shares the left edge of the content, tighter rhythm. Default keeps other studies unchanged. */
  align?: "center" | "left";
}) {
  const left = align === "left";
  return (
    <section
      id={id}
      className={cn(
        left ? "scroll-mt-4 py-14 md:py-20" : "scroll-mt-24 py-16 sm:py-20 md:py-28",
        bordered && "border-t border-hairline/[0.06]"
      )}
    >
      {(eyebrow || title || intro) && (
        <header className={cn(left ? "mb-8 max-w-3xl md:mb-10" : "mx-auto mb-10 max-w-2xl px-4 text-center sm:mb-12 sm:px-0 md:mb-16")}>
          {eyebrow ? (
            <div className={left ? "nrp-label nrp-label-primary mb-3" : "mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-xs"}>
              {eyebrow}
            </div>
          ) : null}
          {title ? (
            <h2
              tabIndex={-1}
              className={cn(
                "text-balance font-display font-semibold tracking-tight focus-visible:outline-none",
                left ? "text-[28px] leading-8 sm:text-[32px] sm:leading-9 md:text-4xl md:leading-10" : "text-2xl sm:text-3xl md:text-4xl"
              )}
            >
              {title}
            </h2>
          ) : null}
          {intro ? (
            <p className={cn("text-muted-foreground", left ? "mt-4 max-w-[65ch] text-base leading-7" : "mt-4 text-sm leading-7 sm:mt-5 sm:text-base sm:leading-8 md:text-lg")}>
              {intro}
            </p>
          ) : null}
        </header>
      )}
      {children}
    </section>
  );
}

export function EditorialHero({ meta }: { meta: AdaptCaseStudy["meta"] }) {
  const partnersShort = meta.partners
    .split(", ")
    .slice(0, 3)
    .map((p) => p.replace(/across.*$/, "").trim())
    .join(" · ");

  return (
    <section className="relative overflow-hidden pb-12 pt-28 md:pb-16 md:pt-40">
      <div className="absolute inset-0 bg-radial-field opacity-60 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hairline/15 to-transparent" aria-hidden="true" />
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
            <Badge>EdTech · User Research</Badge>
          </div>
          <p className="mt-6 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl md:mt-8 md:text-5xl lg:text-6xl">
            {meta.title}
          </p>
          <p className="mt-5 text-balance text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 md:mt-6 md:text-xl">
            {meta.tagline}
          </p>
        </div>

        <dl className="mx-auto mt-12 grid max-w-4xl gap-px overflow-hidden rounded-2xl border border-hairline/[0.06] bg-fill-subtle/[0.02] text-sm sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {[
            { icon: Users, label: "Role", value: meta.role },
            { icon: Calendar, label: "Timeline", value: meta.timeline },
            { icon: MapPin, label: "Platform", value: meta.platform.split(" — ")[0] },
            { icon: Users, label: "Partners", value: partnersShort }
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-background/40 p-5">
              <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {label}
              </dt>
              <dd className="mt-2 text-sm font-medium leading-6 text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function NarrativeBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className={proseColumn}>
      {paragraphs.map((p, i) => (
        <p key={i} className={i === 0 ? "first-letter:font-display first-letter:text-5xl first-letter:font-semibold first-letter:leading-none first-letter:text-foreground first-letter:float-left first-letter:mr-2 first-letter:mt-1" : "mt-6"}>
          {p}
        </p>
      ))}
    </div>
  );
}

export function ProblemBlock({ problem }: { problem: AdaptCaseStudy["problem"] }) {
  const items = [
    { label: "Business problem", body: problem.business },
    { label: "User problem", body: problem.user },
    { label: "Why it mattered", body: problem.stakes }
  ];
  return (
    <div className="mx-auto grid max-w-5xl gap-px overflow-hidden rounded-2xl border border-hairline/[0.06] bg-fill-subtle/[0.02] md:grid-cols-3">
      {items.map((item) => (
        <article key={item.label} className="bg-background/40 p-7">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {item.label}
          </div>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.body}</p>
        </article>
      ))}
    </div>
  );
}

export function GoalsList({ goals }: { goals: string[] }) {
  return (
    <ol className="mx-auto grid max-w-3xl gap-3">
      {goals.map((goal, i) => (
        <li
          key={i}
          className="flex gap-5 rounded-xl border border-hairline/[0.06] bg-fill-subtle/[0.02] p-5 text-sm leading-7 text-muted-foreground"
        >
          <span className="shrink-0 font-display text-2xl font-semibold leading-none text-primary/80">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{goal}</span>
        </li>
      ))}
    </ol>
  );
}

const researchArtifactIcons = {
  recordings: Video,
  analysis: ScanSearch,
  report: FileText
} as const;

function ResearchArtifactRow({
  kind,
  artifact
}: {
  kind: keyof PhaseResearch;
  artifact: ResearchArtifact;
}) {
  const Icon = researchArtifactIcons[kind];
  const available = Boolean(artifact.href);

  const content = (
    <>
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground/90">{artifact.label}</span>
          {!available && (
            <span className="rounded-full border border-hairline/[0.08] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Coming soon
            </span>
          )}
        </div>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{artifact.description}</p>
      </div>
      {available && (
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 self-start text-primary/70 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      )}
    </>
  );

  if (available) {
    return (
      <Link
        href={artifact.href!}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-3 rounded-lg p-3 transition hover:bg-fill-subtle/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {content}
      </Link>
    );
  }

  return <div className="flex items-start gap-3 p-3 opacity-60">{content}</div>;
}

function MultiLinkArtifactRow({
  kind,
  artifact
}: {
  kind: keyof PhaseResearch;
  artifact: ResearchArtifact;
}) {
  const Icon = researchArtifactIcons[kind];
  const links = artifact.links ?? [];

  return (
    <div className="p-3">
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <span className="text-sm font-medium text-foreground/90">{artifact.label}</span>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">{artifact.description}</p>
        </div>
      </div>
      <div className="mt-2 ml-7 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-md py-1.5 pr-2 text-xs text-foreground/80 transition hover:bg-fill-subtle/[0.04] hover:text-foreground"
          >
            <span className="min-w-0 flex-1 truncate">{link.label}</span>
            <ArrowUpRight className="h-3 w-3 shrink-0 text-primary/70 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function PhaseResearchPanel({ research }: { research: PhaseResearch }) {
  return (
    <div className="border-t border-hairline/[0.06] bg-fill-subtle/[0.015] p-3">
      <div className="px-2 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Research artifacts
      </div>
      <div className="divide-y divide-hairline/[0.04]">
        {(Object.keys(researchArtifactIcons) as (keyof PhaseResearch)[]).map((kind) => {
          const artifact = research[kind];
          // Skip artifacts withheld from publication (no items, links or href)
          if (!artifact.href && !artifact.items?.length && !artifact.links?.length) return null;
          if (artifact.items && artifact.items.length > 0) {
            return <ArtifactGallery key={kind} artifact={artifact} icon={researchArtifactIcons[kind]} />;
          }
          if (artifact.links && artifact.links.length > 0) {
            return <MultiLinkArtifactRow key={kind} kind={kind} artifact={artifact} />;
          }
          return <ResearchArtifactRow key={kind} kind={kind} artifact={artifact} />;
        })}
      </div>
    </div>
  );
}

export function MethodPanel({
  discovery,
  usability,
  discoveryResearch,
  usabilityResearch
}: AdaptCaseStudy["method"]) {
  const panels = [
    { tag: "Phase 1", title: "Discovery interviews", subtitle: "May – August 2024", items: discovery, research: discoveryResearch },
    { tag: "Phase 2", title: "Usability testing", subtitle: "June – July 2025", items: usability, research: usabilityResearch }
  ];
  return (
    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
      {panels.map((panel) => (
        <article
          key={panel.title}
          className="overflow-hidden rounded-2xl border border-hairline/[0.06] bg-fill-subtle/[0.02]"
        >
          <header className="border-b border-hairline/[0.06] bg-fill-subtle/[0.02] p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {panel.tag}
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold">{panel.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{panel.subtitle}</p>
          </header>
          <dl className="divide-y divide-hairline/[0.05]">
            {panel.items.map((item) => (
              <div key={item.label} className="grid grid-cols-[110px_1fr] gap-4 p-5">
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="text-sm leading-6 text-foreground/90">{item.value}</dd>
              </div>
            ))}
          </dl>
          {panel.research && <PhaseResearchPanel research={panel.research} />}
        </article>
      ))}
    </div>
  );
}


export function FindingList({ findings }: { findings: Finding[] }) {
  return (
    <div className="mx-auto grid max-w-4xl gap-8">
      {findings.map((f) => (
        <article
          key={f.id}
          className="grid gap-6 rounded-2xl border border-hairline/[0.06] bg-fill-subtle/[0.02] p-7 md:grid-cols-[80px_1fr] md:p-9"
        >
          <div className="font-display text-5xl font-semibold leading-none text-primary/70">
            {f.number}
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
              {f.title}
            </h3>
            {f.body.map((p, i) => (
              <p key={i} className="mt-4 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
                {p}
              </p>
            ))}
            <div className="mt-6 rounded-xl border border-primary/15 bg-primary/[0.04] p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">
                Design implication
              </div>
              <p className="mt-2 text-sm leading-6 text-foreground/95">{f.implication}</p>
            </div>
            {f.evidence ? (
              <div className="mt-4 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground/70">Evidence:</span> {f.evidence}
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

export function Figure({ figure }: { figure: FigureData }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-hairline/[0.06] bg-fill-subtle/[0.02]">
      <div className="relative w-full">
        {figure.src ? (
          <Image
            src={figure.src}
            alt={figure.alt}
            width={1600}
            height={1000}
            sizes="(max-width: 1024px) 100vw, 768px"
            className="h-auto w-full object-contain"
          />
        ) : (
          <div className="flex h-24 w-full items-center justify-center bg-fill-subtle/[0.04] text-xs text-muted-foreground">
            No image — click to edit
          </div>
        )}
      </div>
      {figure.caption ? (
        <figcaption className="border-t border-hairline/[0.06] px-5 py-3 text-xs leading-5 text-muted-foreground">
          {figure.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function FigureGrid({ figures }: { figures: FigureData[] }) {
  if (figures.length === 0) return null;
  return (
    <div className={`grid gap-5 ${figures.length > 1 ? "md:grid-cols-2" : ""}`}>
      {figures.map((fig, i) => (
        <Figure key={fig.src || i} figure={fig} />
      ))}
    </div>
  );
}

export function DesignSolutionBlock({ solution }: { solution: DesignSolution }) {
  return (
    <div className="mx-auto grid max-w-5xl gap-10">
      <p className="mx-auto max-w-2xl text-center text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
        {solution.intro}
      </p>

      {/* A/B comparison */}
      <div>
        <p className="mx-auto mb-7 max-w-3xl rounded-xl border border-hairline/[0.06] bg-fill-subtle/[0.02] p-6 text-sm leading-7 text-muted-foreground">
          {solution.comparison.problemStatement}
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {solution.comparison.options.map((opt) => {
            const chosen = opt.verdict === "chosen";
            return (
              <article
                key={opt.label}
                className={`flex flex-col rounded-2xl border p-7 ${
                  chosen
                    ? "border-emerald-300/30 bg-emerald-400/[0.05]"
                    : "border-hairline/[0.06] bg-fill-subtle/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {opt.label}
                  </div>
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                      chosen
                        ? "border-emerald-300/30 bg-emerald-400/15 text-emerald-200"
                        : "border-hairline/15 bg-fill-subtle/[0.06] text-muted-foreground"
                    }`}
                  >
                    {chosen ? "Chosen" : "Rejected"}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                  {opt.name}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">
                  {opt.description}
                </p>
                <p
                  className={`mt-5 text-xs font-medium leading-5 ${
                    chosen ? "text-emerald-200/90" : "text-muted-foreground"
                  }`}
                >
                  {opt.verdictNote}
                </p>
              </article>
            );
          })}
        </div>
        {solution.comparison.figures && solution.comparison.figures.length > 0 ? (
          <div className="mt-6">
            <FigureGrid figures={solution.comparison.figures} />
          </div>
        ) : null}
      </div>

      {/* Before / after design moves */}
      <div className="grid gap-5">
        {solution.moves.map((move) => (
          <article
            key={move.title}
            className="rounded-2xl border border-hairline/[0.06] bg-fill-subtle/[0.02] p-7"
          >
            <h3 className="font-display text-lg font-semibold tracking-tight md:text-xl">
              {move.title}
            </h3>
            <div className="mt-5 grid gap-px overflow-hidden rounded-xl border border-hairline/[0.06] sm:grid-cols-2">
              <div className="bg-background/40 p-5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Before
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{move.before}</p>
              </div>
              <div className="bg-primary/[0.04] p-5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/90">
                  After
                </div>
                <p className="mt-3 text-sm leading-6 text-foreground/90">{move.after}</p>
              </div>
            </div>
            {move.figure ? (
              <div className="mt-5">
                <Figure figure={move.figure} />
              </div>
            ) : null}
            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              <span className="font-semibold text-foreground/70">Driven by:</span> {move.drivenBy}
            </p>
          </article>
        ))}
      </div>

      {/* Beyond padding — link to the P0 */}
      <aside className="rounded-2xl border border-primary/20 bg-primary/[0.04] p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">
          {solution.beyondPadding.title}
        </div>
        <p className="mt-5 text-sm leading-7 text-foreground/90 md:text-base md:leading-8">
          {solution.beyondPadding.body}
        </p>
        {solution.beyondPadding.figure ? (
          <div className="mt-6">
            <Figure figure={solution.beyondPadding.figure} />
          </div>
        ) : null}
      </aside>
    </div>
  );
}

export function AccessibilityBlock({ accessibility }: { accessibility: Accessibility }) {
  return (
    <div className="mx-auto grid max-w-4xl gap-8">
      <p className="mx-auto max-w-2xl text-center text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
        {accessibility.intro}
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        {accessibility.considerations.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-hairline/[0.06] bg-fill-subtle/[0.02] p-7"
          >
            <h3 className="font-display text-lg font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.body}</p>
          </article>
        ))}
      </div>
      <aside className="rounded-2xl border border-amber-300/20 bg-amber-400/[0.04] p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200/90">
          Honest framing — the accessibility gap
        </div>
        <p className="mt-5 text-sm leading-7 text-foreground/90">{accessibility.gap}</p>
      </aside>
    </div>
  );
}

export function DecisionTable({ decisions }: { decisions: Decision[] }) {
  return (
    <div className="mx-auto max-w-5xl overflow-x-auto rounded-2xl border border-hairline/[0.06]">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-fill-subtle/[0.04]">
          <tr>
            <th scope="col" className="w-[34%] p-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Decision
            </th>
            <th scope="col" className="w-[40%] p-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Rationale
            </th>
            <th scope="col" className="p-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Evidence
            </th>
          </tr>
        </thead>
        <tbody>
          {decisions.map((d, i) => (
            <tr key={i} className="border-t border-hairline/[0.05] bg-fill-subtle/[0.015] align-top">
              <td className="p-5 font-medium leading-6 text-foreground">{d.decision}</td>
              <td className="p-5 leading-6 text-muted-foreground">{d.rationale}</td>
              <td className="p-5 text-xs leading-6 text-muted-foreground">{d.evidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const statusColor: Record<RoadmapItem["status"], string> = {
  Completed: "bg-emerald-400/15 text-emerald-200 border-emerald-300/30",
  "On-going": "bg-amber-400/15 text-amber-200 border-amber-300/30",
  Foundational: "bg-violet-400/15 text-violet-200 border-violet-300/30"
};

export function RoadmapTable({ items }: { items: RoadmapItem[] }) {
  return (
    <div className="mx-auto grid max-w-4xl gap-5">
      {items.map((item, i) => (
        <article
          key={i}
          className="rounded-2xl border border-hairline/[0.06] bg-fill-subtle/[0.02] p-6 sm:p-7"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
              {item.feature}
            </h3>
            <span
              className={`inline-flex shrink-0 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${statusColor[item.status]}`}
            >
              {item.status}
            </span>
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
        </article>
      ))}
    </div>
  );
}

function RoadmapProcessSection({
  id,
  label,
  children
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function RoadmapWithProcess({
  items,
  solution,
  decisions,
  detailFeature
}: {
  items: RoadmapItem[];
  solution: DesignSolution;
  decisions: Decision[];
  detailFeature: string;
}) {
  return (
    <div className="mx-auto grid max-w-4xl gap-5">
      {items.map((item, i) => {
        const isRich = item.feature === detailFeature;
        const base = `roadmap-${i}`;

        return (
          <article
            key={i}
            className="rounded-2xl border border-hairline/[0.06] bg-fill-subtle/[0.02] p-6 sm:p-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                {item.feature}
              </h3>
              <span
                className={`inline-flex shrink-0 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${statusColor[item.status]}`}
              >
                {item.status}
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>

            {(item.decision || item.impact) && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {item.decision && (
                  <RoadmapProcessSection id={`${base}-decision`} label="Decision">
                    <div className="flex h-full gap-3 rounded-xl border border-hairline/[0.08] bg-fill-subtle/[0.03] p-5">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <p className="text-sm leading-7 text-foreground/90">{item.decision}</p>
                    </div>
                  </RoadmapProcessSection>
                )}

                {item.impact && (
                  <RoadmapProcessSection id={`${base}-impact`} label="Impact">
                    <div className="flex h-full gap-3 rounded-xl border border-emerald-300/20 bg-emerald-400/[0.05] p-5">
                      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                      <p className="text-sm leading-7 text-foreground/90">{item.impact}</p>
                    </div>
                  </RoadmapProcessSection>
                )}
              </div>
            )}

            {(item.designSolution || isRich) && (
              <details className="group mt-5 rounded-xl border border-primary/15 bg-primary/[0.03] open:pb-7">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 py-2 text-base font-medium text-primary/90 transition hover:text-primary [&::-webkit-details-marker]:hidden">
                  <span className="inline-flex items-center gap-1">
                    Design solution
                    <span aria-hidden="true" className="inline-flex h-11 w-11 items-center justify-center">
                      <ArrowUpRight className="h-6 w-6" />
                    </span>
                  </span>
                  <span aria-hidden="true" className="inline-flex h-11 w-11 items-center justify-center text-primary/70 transition group-open:rotate-180">
                    <ChevronDown className="h-6 w-6" />
                  </span>
                </summary>

                <div id={`${base}-design-solution`} className="scroll-mt-24 space-y-8 border-t border-primary/10 px-5 pt-6 sm:px-2">
                  {item.designSolution && (
                    <p className="text-sm leading-7 text-muted-foreground">{item.designSolution}</p>
                  )}

                  {(item.designSolutionLink || item.designSolutionLinks) && (
                    <div className="flex flex-wrap gap-2">
                      {item.designSolutionLink && (
                        <Link
                          href={item.designSolutionLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-2.5 text-xs font-medium text-primary/90 transition hover:bg-primary/[0.12]"
                        >
                          View design in Figma
                          <ArrowUpRight className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                        </Link>
                      )}
                      {item.designSolutionLinks?.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-2.5 text-xs font-medium text-primary/90 transition hover:bg-primary/[0.12]"
                        >
                          {link.label}
                          <ArrowUpRight className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {isRich && (
                    <div>
                      <div className="mx-auto mb-5 max-w-5xl text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Full comparison &amp; decisions
                      </div>
                      <div className="space-y-10">
                        <DesignSolutionBlock solution={solution} />
                        <DecisionTable decisions={decisions} />
                      </div>
                    </div>
                  )}
                </div>
              </details>
            )}
          </article>
        );
      })}
    </div>
  );
}

export function ImpactBlock({ impact }: { impact: AdaptCaseStudy["impact"] }) {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-2xl border border-hairline/[0.06] bg-fill-subtle/[0.02] p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          What this work changed
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

export function ReflectionList({ items }: { items: ReflectionItem[] }) {
  return (
    <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.heading}
          className="rounded-2xl border border-hairline/[0.06] bg-fill-subtle/[0.02] p-7"
        >
          <h3 className="font-display text-lg font-semibold tracking-tight">{item.heading}</h3>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.body}</p>
        </article>
      ))}
    </div>
  );
}

export function PullQuote({ children, attribution }: { children: React.ReactNode; attribution?: string }) {
  return (
    <figure className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-0 sm:py-12">
      <blockquote className="text-balance font-display text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl md:text-3xl md:leading-tight">
        &ldquo;{children}&rdquo;
      </blockquote>
      {attribution ? (
        <figcaption className="mt-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:mt-5 sm:text-xs">
          — {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Optional next-case-study block (used by the NRP page). Other case studies keep the generic footer. */
export type NextStudy = {
  title: string;
  description: string;
  href: string;
  resume: { href: string; label: string };
};

export function CaseStudyFooter({ next }: { next?: NextStudy }) {
  if (next) {
    return (
      <section className="border-t border-hairline/[0.06] py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Next: {next.title}</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{next.description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link href={next.href}>
                  Read the next case study
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <a href={next.resume.href} download>
                  {next.resume.label}
                </a>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/#contact">Get in touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="border-t border-hairline/[0.06] py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Want to see the rest of the work?
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            More case studies on user research, design systems, and AI-assisted product design — or get in touch.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/#work">See more work</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/#contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
