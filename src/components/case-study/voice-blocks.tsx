import { ArrowRight, CheckCircle2, Layers, MoveRight, Sparkles, Volume2 } from "lucide-react";
import type {
  MvpEpic,
  ProviderRow,
  RequestFlowStep,
  ResearchInsight,
  ServiceFlowStep,
  Usp,
  VoiceCaseStudy,
  VoicePersona,
  VoiceType
} from "@/content/case-studies/laerdal-voice";
import { VisualPlaceholder } from "@/components/case-study/nrp-blocks";

export function InsightList({ insights }: { insights: ResearchInsight[] }) {
  return (
    <div className="mx-auto grid max-w-4xl gap-6">
      {insights.map((i) => (
        <article
          key={i.id}
          className="grid gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 md:grid-cols-[64px_1fr] md:p-9"
        >
          <div className="font-display text-4xl font-semibold leading-none text-primary/70 md:text-5xl">
            {i.number}
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold tracking-tight md:text-xl">
              {i.title}
            </h3>
            {i.body.map((p, idx) => (
              <p
                key={idx}
                className="mt-3 text-sm leading-7 text-muted-foreground md:text-[15px] md:leading-7"
              >
                {p}
              </p>
            ))}
            {i.quote ? (
              <blockquote className="mt-5 border-l-2 border-primary/60 pl-4 text-sm italic leading-6 text-foreground/90">
                &ldquo;{i.quote.text}&rdquo;
                {i.quote.attribution ? (
                  <footer className="mt-2 text-[10px] not-italic uppercase tracking-[0.16em] text-muted-foreground">
                    — {i.quote.attribution}
                  </footer>
                ) : null}
              </blockquote>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

export function VisionShift({
  shift,
  statement
}: {
  shift: { from: string; to: string };
  statement: string;
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:grid-cols-[1fr_auto_1fr] md:p-8">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            From
          </div>
          <blockquote className="mt-3 font-display text-lg leading-tight tracking-tight text-muted-foreground line-through decoration-rose-400/40 md:text-xl">
            &ldquo;{shift.from}&rdquo;
          </blockquote>
        </div>
        <MoveRight
          className="hidden h-5 w-5 text-primary md:block"
          aria-hidden="true"
        />
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/90">
            To
          </div>
          <blockquote className="mt-3 font-display text-lg leading-tight tracking-tight text-foreground md:text-xl">
            &ldquo;{shift.to}&rdquo;
          </blockquote>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
        {statement}
      </p>
    </div>
  );
}

export function ServiceFlowComparison({
  before,
  after,
  beforeSummary,
  afterSummary
}: {
  before: ServiceFlowStep[];
  after: ServiceFlowStep[];
  beforeSummary: string;
  afterSummary: string;
}) {
  const panels = [
    {
      tag: "Before VSP",
      summary: beforeSummary,
      steps: before,
      tone: "rose"
    },
    {
      tag: "After VSP",
      summary: afterSummary,
      steps: after,
      tone: "primary"
    }
  ] as const;

  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
      {panels.map((panel) => (
        <article
          key={panel.tag}
          className={`overflow-hidden rounded-2xl border ${
            panel.tone === "primary"
              ? "border-primary/30 bg-primary/[0.04]"
              : "border-rose-300/20 bg-rose-400/[0.03]"
          }`}
        >
          <header
            className={`border-b p-6 ${
              panel.tone === "primary"
                ? "border-primary/15"
                : "border-rose-300/15"
            }`}
          >
            <div
              className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
                panel.tone === "primary"
                  ? "text-primary/90"
                  : "text-rose-300/90"
              }`}
            >
              {panel.tag}
            </div>
            <p className="mt-3 text-sm leading-6 text-foreground/90">{panel.summary}</p>
          </header>
          <ol className="grid divide-y divide-white/[0.05]">
            {panel.steps.map((step, i) => (
              <li
                key={`${panel.tag}-${i}`}
                className="grid grid-cols-[40px_1fr] items-start gap-3 p-5"
              >
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold ${
                    panel.tone === "primary"
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-rose-300/30 bg-rose-400/10 text-rose-300"
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  <div className="text-sm font-semibold text-foreground">{step.label}</div>
                  {step.description ? (
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {step.description}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </article>
      ))}
    </div>
  );
}

export function ProviderTable({ providers }: { providers: ProviderRow[] }) {
  return (
    <div className="mx-auto max-w-5xl overflow-x-auto rounded-2xl border border-white/[0.06]">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-white/[0.04]">
          <tr>
            <th className="w-[220px] p-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Provider
            </th>
            <th className="w-[260px] p-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Primary use
            </th>
            <th className="p-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Strengths
            </th>
          </tr>
        </thead>
        <tbody>
          {providers.map((p) => (
            <tr key={p.provider} className="border-t border-white/[0.05] align-top">
              <td className="p-5 font-display text-base font-semibold text-foreground">
                {p.provider}
              </td>
              <td className="p-5 leading-6 text-foreground/90">{p.primaryUse}</td>
              <td className="p-5 leading-6 text-muted-foreground">{p.strengths}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ArchitectureGrid({
  capabilities
}: {
  capabilities: VoiceCaseStudy["architectureCapabilities"];
}) {
  return (
    <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
      {capabilities.map((c) => (
        <article
          key={c.title}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-primary/30 bg-primary/10">
              <Layers className="h-4 w-4 text-primary" aria-hidden="true" />
            </span>
            <h3 className="font-display text-base font-semibold tracking-tight md:text-lg">
              {c.title}
            </h3>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{c.body}</p>
        </article>
      ))}
    </div>
  );
}

export function PrincipleGrid({ principles }: { principles: { title: string; body: string }[] }) {
  return (
    <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3">
      {principles.map((p, i) => (
        <article
          key={p.title}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
        >
          <div className="flex items-center gap-3">
            <span className="font-display text-xl font-semibold leading-none text-primary/70">
              {String(i + 1).padStart(2, "0")}
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-primary/80" aria-hidden="true" />
          </div>
          <h3 className="mt-4 font-display text-base font-semibold tracking-tight md:text-lg">
            {p.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{p.body}</p>
        </article>
      ))}
    </div>
  );
}

export function VoiceTypesBlock({ voiceTypes }: { voiceTypes: VoiceType[] }) {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
      {voiceTypes.map((v) => (
        <article
          key={v.id}
          className={`overflow-hidden rounded-2xl border ${
            v.tag === "paid"
              ? "border-amber-300/25 bg-amber-400/[0.04]"
              : "border-white/[0.08] bg-white/[0.02]"
          }`}
        >
          <header
            className={`flex items-center justify-between gap-4 border-b p-6 ${
              v.tag === "paid" ? "border-amber-300/15" : "border-white/[0.06]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`grid h-9 w-9 place-items-center rounded-lg border ${
                  v.tag === "paid"
                    ? "border-amber-300/30 bg-amber-400/10"
                    : "border-primary/30 bg-primary/10"
                }`}
              >
                <Volume2
                  className={`h-4 w-4 ${v.tag === "paid" ? "text-amber-200" : "text-primary"}`}
                  aria-hidden="true"
                />
              </span>
              <div>
                <div className="font-display text-lg font-semibold tracking-tight">{v.name}</div>
                <div className="text-xs text-muted-foreground">{v.label}</div>
              </div>
            </div>
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                v.tag === "paid"
                  ? "border-amber-300/30 bg-amber-400/10 text-amber-200"
                  : "border-primary/25 bg-primary/10 text-primary"
              }`}
            >
              {v.tag === "paid" ? "Charged" : "Free"}
            </span>
          </header>
          <div className="grid gap-3 p-6">
            <dl className="grid gap-3">
              <div className="grid grid-cols-[90px_1fr] gap-2 text-sm">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Cost
                </dt>
                <dd
                  className={`leading-5 ${
                    v.tag === "paid" ? "font-semibold text-amber-200" : "text-foreground"
                  }`}
                >
                  {v.cost}
                </dd>
              </div>
              <div className="grid grid-cols-[90px_1fr] gap-2 text-sm">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Quality
                </dt>
                <dd className="leading-5 text-foreground/90">{v.quality}</dd>
              </div>
            </dl>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{v.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function VoiceExpertCard({ persona }: { persona: VoicePersona }) {
  return (
    <div className="mx-auto max-w-4xl">
      <article className="overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.04]">
        {/* Header */}
        <div className="flex flex-wrap items-start gap-4 border-b border-primary/10 p-6 md:p-8">
          <span aria-hidden="true" className="text-3xl leading-none">{persona.emoji}</span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-display text-xl font-semibold tracking-tight">{persona.archetype}</h3>
              <span className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                New role introduced by VSP
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{persona.pitch}</p>
          </div>
        </div>

        {/* What they need */}
        <div className="p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
            What they need
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {persona.needs.map((need) => (
              <li key={need} className="flex gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-sm leading-6 text-foreground/90">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {need}
              </li>
            ))}
          </ul>
        </div>

        {/* Quote */}
        {persona.quote ? (
          <div className="border-t border-primary/10 px-6 py-5 md:px-8">
            <blockquote className="border-l-2 border-primary/60 pl-4 text-sm italic leading-7 text-foreground/90">
              &ldquo;{persona.quote}&rdquo;
            </blockquote>
          </div>
        ) : null}
      </article>
    </div>
  );
}

export function MvpEpicsGrid({ epics }: { epics: MvpEpic[] }) {
  return (
    <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
      {epics.map((epic) => (
        <article
          key={epic.number}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
        >
          <div className="flex items-start gap-4">
            <span className="font-display text-3xl font-semibold leading-none text-primary/70">
              {epic.number}
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-base font-semibold tracking-tight md:text-lg">
                {epic.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{epic.body}</p>
            </div>
          </div>
          <ul className="mt-5 grid gap-2 border-t border-white/[0.05] pt-4">
            {epic.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs leading-5 text-foreground/80">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/70" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function RequestFlowBlock({
  intro,
  steps
}: {
  intro: string;
  steps: RequestFlowStep[];
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="mx-auto max-w-2xl text-center text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
        {intro}
      </p>
      <ol className="relative mt-10 grid gap-3">
        <div
          aria-hidden="true"
          className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-white/10 to-transparent"
        />
        {steps.map((step, i) => (
          <li
            key={i}
            className="relative grid gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 pl-12 transition hover:border-white/[0.14] hover:bg-white/[0.04]"
          >
            <span
              aria-hidden="true"
              className="absolute left-[7px] top-7 grid h-7 w-7 place-items-center rounded-full border border-primary/40 bg-primary/10 text-xs font-semibold text-primary"
            >
              {i + 1}
            </span>
            <div>
              <div className="inline-flex rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {step.actor}
              </div>
              <div className="mt-2 text-sm font-medium leading-6 text-foreground">{step.action}</div>
              {step.note ? (
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{step.note}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ShowcaseSection() {
  const showcaseItems = [
    {
      label: "Voice Library — Dashboard",
      description: "Full catalogue view with search filters (language, gender, accent, type, provider), audio preview per card, reuse indicators, and pagination"
    },
    {
      label: "Voice Library — Search & Filter",
      description: "Dropdown filters + manual text input + dynamic personalised filters. Reset state and sort controls"
    },
    {
      label: "Voice Configuration — Modulation UI",
      description: "Pitch and speaking rate sliders, live audio preview, before/after comparison, and submission form for the modulation request"
    },
    {
      label: "Request Management — Admin / VE Dashboard",
      description: "Pending requests queue, request details panel, approve/reject with mandatory reason field, and status tracking across all requests"
    },
    {
      label: "Request Management — VSP User View",
      description: "User's own request history, status indicators (pending / approved / rejected), and rejection reason display"
    },
    {
      label: "Voice Expert (VE) — Endpoint Management",
      description: "Active endpoint list with per-endpoint cost indicator ($4/hr), activate/suspend controls, and usage timestamp"
    },
    {
      label: "User Flow — Voice Request Journey",
      description: "End-to-end user flow from voice discovery → configuration request → VE approval → deployment to product"
    },
    {
      label: "User Flow — Onboarding & SSO",
      description: "New user registration via email invite, SSO login path, and role assignment confirmation"
    },
    {
      label: "Wireframes — Voice Library (Low-fi)",
      description: "Early-stage lo-fi wireframes showing layout exploration for the voice catalogue and search pattern"
    },
    {
      label: "High-Fidelity Screens — Voice Library",
      description: "Final UI: voice card grid, filter panel, audio preview interaction state, and reuse badge system"
    },
    {
      label: "High-Fidelity Screens — Dashboard",
      description: "Platform overview metrics: active voices, endpoint cost, adoption per product, cache hit rate"
    },
    {
      label: "Notification Emails — Templates",
      description: "Email designs for: registration invite, request approved, request rejected (with reason), and endpoint warning"
    }
  ];

  return (
    <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {showcaseItems.map((item) => (
        <figure
          key={item.label}
          className="group cursor-pointer overflow-hidden rounded-2xl border border-dashed border-white/[0.18] bg-white/[0.02] p-6 text-center transition hover:border-primary/40 hover:bg-primary/[0.03]"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.10] bg-white/[0.04] transition group-hover:border-primary/30 group-hover:bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary/70 transition group-hover:text-primary" aria-hidden="true" />
          </div>
          <figcaption className="mt-4 text-left">
            <div className="font-display text-sm font-semibold leading-5 text-foreground">{item.label}</div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.description}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

const tagColor: Record<string, string> = {
  "Cost saving": "border-green-300/30 bg-green-400/10 text-green-200",
  "Inclusivity":  "border-primary/30 bg-primary/10 text-primary",
  "Self-service": "border-cyan-300/30 bg-cyan-400/10 text-cyan-200",
  "Efficiency":   "border-amber-300/30 bg-amber-400/10 text-amber-200"
};

export function UspGrid({ usps }: { usps: Usp[] }) {
  return (
    <div className="mx-auto grid max-w-5xl gap-8">
      {usps.map((usp) => (
        <article
          key={usp.id}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 md:p-9"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-display text-4xl font-semibold leading-none text-primary/70">
              {usp.number}
            </span>
            <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
              {usp.title}
            </h3>
            <span
              className={`ml-auto inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                tagColor[usp.tag] ?? "border-white/15 bg-white/[0.06] text-muted-foreground"
              }`}
            >
              {usp.tag}
            </span>
          </div>
          <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
            {usp.body}
          </p>
          <VisualPlaceholder
            label={usp.visualLabel}
            description={usp.visualDescription}
          />
        </article>
      ))}
    </div>
  );
}
