/**
 * Seed script — populates Supabase with the current portfolio.ts + bespoke case study data.
 * Idempotent: upserts pages by slug / kind, replaces all blocks for each page.
 *
 * Run: npx tsx scripts/seed.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local (or env).
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";
import { portfolio } from "../src/content/portfolio";
import { adaptCaseStudy } from "../src/content/case-studies/adapt-authoring-tool";
import { nrpCaseStudy } from "../src/content/case-studies/neonatal-resuscitation-program";
import { voiceCaseStudy } from "../src/content/case-studies/laerdal-voice";

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const sb = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type BlockInsert = {
  page_id: string;
  parent_id: string | null;
  type: string;
  props: Record<string, unknown>;
  sort_order: number;
  version: "draft" | "published";
};

async function upsertPage(opts: {
  kind: "home" | "case_study";
  slug: string | null;
  title: string;
}): Promise<string> {
  const match = opts.kind === "home"
    ? { kind: "home" }
    : { kind: "case_study", slug: opts.slug };

  const { data: existing } = await sb
    .from("pages")
    .select("id")
    .match(match)
    .limit(1)
    .single();

  if (existing?.id) {
    await sb.from("pages").update({ title: opts.title, updated_at: new Date().toISOString() }).eq("id", existing.id);
    return existing.id;
  }

  const { data, error } = await sb
    .from("pages")
    .insert({ kind: opts.kind, slug: opts.slug, title: opts.title, status: "published", published_at: new Date().toISOString() })
    .select("id")
    .single();

  if (error || !data) throw new Error(`Failed to upsert page ${opts.slug ?? opts.kind}: ${error?.message}`);
  return data.id;
}

async function replaceBlocks(pageId: string, blocks: Omit<BlockInsert, "page_id">[]) {
  // Delete existing blocks for both versions
  await sb.from("page_blocks").delete().eq("page_id", pageId);

  if (blocks.length === 0) return;

  const rows: BlockInsert[] = blocks.map((b) => ({ ...b, page_id: pageId }));

  const { error } = await sb.from("page_blocks").insert(rows);
  if (error) throw new Error(`Failed to insert blocks for page ${pageId}: ${error.message}`);
}

/** Build both draft and published rows from a single block list. */
function bothVersions(blocks: Omit<BlockInsert, "version" | "page_id">[]): Omit<BlockInsert, "page_id">[] {
  return [
    ...blocks.map((b) => ({ ...b, version: "draft" as const })),
    ...blocks.map((b) => ({ ...b, version: "published" as const }))
  ];
}

// ---------------------------------------------------------------------------
// Home page blocks
// ---------------------------------------------------------------------------

async function seedHome() {
  console.log("  Seeding home page…");
  const pageId = await upsertPage({ kind: "home", slug: null, title: "Home" });

  const blocks: Omit<BlockInsert, "version" | "page_id">[] = [
    { parent_id: null, type: "home.hero", props: { owner: portfolio.owner, experience: portfolio.owner.experience }, sort_order: 0 },
    { parent_id: null, type: "home.about", props: { owner: portfolio.owner, principles: portfolio.principles, timeline: portfolio.timeline, skills: portfolio.skills, tools: portfolio.tools }, sort_order: 1 },
    { parent_id: null, type: "home.caseStudyBrowser", props: { caseStudies: portfolio.caseStudies }, sort_order: 2 },
    { parent_id: null, type: "home.insights", props: { articles: portfolio.articles }, sort_order: 3 },
    { parent_id: null, type: "home.recognition", props: { awards: portfolio.awards, certifications: portfolio.certifications }, sort_order: 4 },
    { parent_id: null, type: "home.socialProof", props: { testimonials: portfolio.testimonials, talks: portfolio.talks }, sort_order: 5 },
    { parent_id: null, type: "home.contact", props: { owner: portfolio.owner }, sort_order: 6 }
  ];

  await replaceBlocks(pageId, bothVersions(blocks));
  console.log("  ✓ Home");
}

// ---------------------------------------------------------------------------
// Generic data-driven case studies
// ---------------------------------------------------------------------------

async function seedGenericStudies() {
  const generics = portfolio.caseStudies.filter(
    (s) => !["adapt-authoring-tool", "neonatal-resuscitation-program", "laerdal-voice"].includes(s.slug)
  );

  for (const study of generics) {
    console.log(`  Seeding generic study: ${study.slug}…`);

    // Upsert case_studies metadata
    const { error: csErr } = await sb.from("case_studies").upsert(
      {
        title: study.title,
        slug: study.slug,
        excerpt: study.excerpt,
        category: study.category,
        tags: study.tags,
        role: study.role,
        client: study.client,
        year: study.year,
        duration: study.duration,
        status: study.status,
        featured: study.featured,
        cover_url: study.cover,
        accent: study.accent,
        metrics: study.metrics,
        updated_at: new Date().toISOString()
      },
      { onConflict: "slug" }
    );
    if (csErr) throw new Error(`Failed to upsert case study ${study.slug}: ${csErr.message}`);

    const pageId = await upsertPage({ kind: "case_study", slug: study.slug, title: study.title });

    const sectionBlocks = study.sections.map((section, i) => ({
      parent_id: null as string | null,
      type: "cs.section",
      props: { sectionType: section.type, title: section.title, body: section.body, bullets: section.bullets ?? [] },
      sort_order: i
    }));

    await replaceBlocks(pageId, bothVersions(sectionBlocks));
    console.log(`  ✓ ${study.slug}`);
  }
}

// ---------------------------------------------------------------------------
// Bespoke study helpers
// ---------------------------------------------------------------------------

type ShellBlock = {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  bordered?: boolean;
};

let _blockIdCounter = 0;
function nextId() { return `seed-${++_blockIdCounter}`; }

/** Produces a SectionShell container row plus its child rows. sortOrder = top-level position. */
function shell(
  shell: ShellBlock,
  children: { type: string; props: Record<string, unknown> }[],
  sortOrder: number
): Omit<BlockInsert, "version" | "page_id">[] {
  const shellTempId = nextId();
  const parent: Omit<BlockInsert, "version" | "page_id"> = {
    parent_id: null,
    type: "editorial.sectionShell",
    props: {
      id: shell.id,
      eyebrow: shell.eyebrow,
      title: shell.title,
      intro: shell.intro,
      bordered: shell.bordered !== false
    },
    sort_order: sortOrder
  };
  // We can't use the temp ID as parent_id since Supabase needs the real UUID.
  // For seeding, we insert parents first, get IDs, then insert children.
  // To keep the helper simple, we'll do a two-pass approach in the caller.
  // This helper just flattens for now — children use _PARENT_SORT as a marker.
  const childRows = children.map((c, i) => ({
    parent_id: `__SORT_${sortOrder}__` as unknown as string,
    type: c.type,
    props: c.props,
    sort_order: i
  }));
  return [parent, ...childRows];
}

// ---------------------------------------------------------------------------

/** Two-pass block insert that resolves parent_id markers to real DB UUIDs. */
async function replaceBlocksWithNesting(
  pageId: string,
  flatRows: Omit<BlockInsert, "version" | "page_id">[]
) {
  await sb.from("page_blocks").delete().eq("page_id", pageId);

  for (const version of ["draft", "published"] as const) {
    const versionRows = flatRows.map((r) => ({ ...r, version }));

    // Pass 1: insert top-level blocks (parent_id is null or __SORT_ marker)
    const topLevel = versionRows.filter((r) => r.parent_id === null);
    if (topLevel.length === 0) continue;

    const { data: insertedParents, error: pErr } = await sb
      .from("page_blocks")
      .insert(topLevel.map((r) => ({ ...r, page_id: pageId })))
      .select("id, sort_order");
    if (pErr) throw new Error(`Pass1 insert error (${version}): ${pErr.message}`);

    // Build sort_order → real id map
    const sortToId: Record<number, string> = {};
    for (const row of (insertedParents ?? [])) {
      sortToId[row.sort_order as number] = row.id as string;
    }

    // Pass 2: insert child blocks with resolved parent_id
    const children = versionRows.filter((r) => typeof r.parent_id === "string" && (r.parent_id as string).startsWith("__SORT_"));
    if (children.length === 0) continue;

    const resolvedChildren = children.map((r) => {
      const sortMatch = (r.parent_id as string).match(/__SORT_(\d+)__/);
      const parentSort = sortMatch ? Number(sortMatch[1]) : -1;
      return { ...r, page_id: pageId, parent_id: sortToId[parentSort] ?? null };
    });

    const { error: cErr } = await sb.from("page_blocks").insert(resolvedChildren);
    if (cErr) throw new Error(`Pass2 insert error (${version}): ${cErr.message}`);
  }
}

// ---------------------------------------------------------------------------
// Adapt bespoke
// ---------------------------------------------------------------------------

async function seedAdapt() {
  console.log("  Seeding adapt-authoring-tool…");
  const study = adaptCaseStudy;

  await sb.from("case_studies").upsert({
    title: "Adapt Authoring Tool", slug: "adapt-authoring-tool",
    excerpt: study.meta.tagline, category: "EdTech · User Research",
    tags: ["EdTech", "Research", "UX"], role: study.meta.role,
    client: "Laerdal Medical / WHO Academy", year: "2025",
    duration: study.meta.timeline, status: "published", featured: true,
    cover_url: "/adapt-cover.png", accent: "#67e8f9",
    metrics: [], updated_at: new Date().toISOString()
  }, { onConflict: "slug" });

  const pageId = await upsertPage({ kind: "case_study", slug: "adapt-authoring-tool", title: study.meta.title });

  const pullQuote1 = { type: "editorial.pullQuote", props: { text: "The whole idea of using the Adapt authoring tool is to do rapid development — you should be able to create an eLearning within two weeks.", attribution: "A senior EdTech specialist, 8+ years on Adapt" } };
  const pullQuote2 = { type: "editorial.pullQuote", props: { text: "I just hope that we find something more easier to use in the coming days.", attribution: "The Mission-Driven SME" } };

  const flatRows: Omit<BlockInsert, "version" | "page_id">[] = [
    { parent_id: null, type: "editorial.hero", props: { meta: study.meta }, sort_order: 0 },
    ...shell({ id: "tension", eyebrow: "01 — The tension", title: "A mission-critical tool no one had studied", bordered: false }, [{ type: "editorial.narrative", props: { paragraphs: study.tension } }], 1),
    { parent_id: null, type: "editorial.pullQuote", props: pullQuote1.props, sort_order: 2 },
    ...shell({ id: "problem", eyebrow: "02 — Problem", title: "Three problems sitting on top of each other" }, [{ type: "editorial.problem", props: { problem: study.problem } }], 3),
    ...shell({ id: "goals", eyebrow: "03 — Goals", title: "What I set out to do", intro: "Five objectives, with success criteria set up front." }, [{ type: "editorial.goals", props: { goals: study.goals } }], 4),
    ...shell({ id: "method", eyebrow: "04 — Method", title: "Two phases, ten months apart", intro: "Phase 1 was open-ended discovery. Phase 2 was structured validation of a specific design proposal that had emerged." }, [{ type: "editorial.method", props: { discovery: study.method.discovery, usability: study.method.usability, discoveryResearch: study.method.discoveryResearch, usabilityResearch: study.method.usabilityResearch } }], 5),
    ...shell({ id: "personas", eyebrow: "05 — Personas", title: "The people behind the platform", intro: "Five fundamentally different relationships to the tool." }, [{ type: "editorial.personas", props: { personas: study.personas } }], 6),
    { parent_id: null, type: "editorial.pullQuote", props: pullQuote2.props, sort_order: 7 },
    ...shell({ id: "findings", eyebrow: "06 — Findings", title: "What the research surfaced", intro: "Six findings, ordered by strategic weight rather than chronology." }, [{ type: "editorial.findings", props: { findings: study.findings } }], 8),
    ...shell({ id: "roadmap", eyebrow: "07 — Roadmap", title: "From research finding to shipped feature", intro: "Every item traces back to a specific pain point — expand a card for its design solution, the decision that followed, and its impact. Adapt Padding's card goes deeper, with the full A/B comparison." }, [{ type: "editorial.roadmapWithProcess", props: { items: study.roadmap, solution: study.designSolution, decisions: study.decisions, detailFeature: "Adapt Padding" } }], 9),
    ...shell({ id: "impact", eyebrow: "08 — Impact", title: "What this work changed", intro: "The honest framing: this work just landed." }, [{ type: "editorial.impact", props: { impact: study.impact } }], 10),
    ...shell({ id: "reflection", eyebrow: "09 — Reflection", title: "What I'd do differently, and what surprised me" }, [{ type: "editorial.reflection", props: { items: study.reflection } }], 11),
    { parent_id: null, type: "editorial.footer", props: {}, sort_order: 15 }
  ];

  // Fix stray spread objects from pullQuote rows
  const cleaned = flatRows.filter(Boolean);
  await replaceBlocksWithNesting(pageId, cleaned);
  console.log("  ✓ adapt-authoring-tool");
}

// ---------------------------------------------------------------------------
// NRP bespoke
// ---------------------------------------------------------------------------

async function seedNrp() {
  console.log("  Seeding neonatal-resuscitation-program…");
  const study = nrpCaseStudy;

  await sb.from("case_studies").upsert({
    title: "Neonatal Resuscitation Program", slug: "neonatal-resuscitation-program",
    excerpt: study.meta.tagline, category: "Healthcare LMS",
    tags: ["Healthcare", "LMS", "Accessibility"], role: study.meta.role,
    client: "American Academy of Pediatrics", year: study.meta.timeline,
    duration: study.meta.timeline, status: "published", featured: true,
    cover_url: "/nrp-cover.png", accent: "#67e8f9",
    metrics: [], updated_at: new Date().toISOString()
  }, { onConflict: "slug" });

  const pageId = await upsertPage({ kind: "case_study", slug: "neonatal-resuscitation-program", title: study.meta.title });

  const flatRows: Omit<BlockInsert, "version" | "page_id">[] = [
    { parent_id: null, type: "editorial.hero", props: { meta: study.meta }, sort_order: 0 },
    ...shell({ id: "tension", eyebrow: "01 — The tension", title: "A platform AAP couldn't fully own", bordered: false }, [{ type: "editorial.narrative", props: { paragraphs: study.tension } }], 1),
    { parent_id: null, type: "editorial.pullQuote", props: { text: "I have 400 nurses across three NICUs. I need a single view that tells me who's about to expire.", attribution: "An Institutional Admin" }, sort_order: 2 },
    ...shell({ id: "problem", eyebrow: "02 — Problem", title: "Three problems stacked on top of each other" }, [{ type: "editorial.problem", props: { problem: { business: study.problem.business, user: study.problem.user, stakes: study.problem.technical } } }], 3),
    ...shell({ id: "goals", eyebrow: "03 — Goals", title: "What success looked like", intro: "Six objectives — each tied to a specific stakeholder, a measurable outcome, or a compliance constraint." }, [{ type: "editorial.goals", props: { goals: study.goals } }], 4),
    ...shell({ id: "method", eyebrow: "04 — Method", title: "Discovery and design process", intro: "A hybrid approach — stakeholder-driven discovery for the complex domain, SAFe Agile for delivery." }, [{ type: "editorial.method", props: { discovery: study.method.discovery, usability: study.method.process } }], 5),
    ...shell({ id: "roles", eyebrow: "05 — User roles", title: "The four primary user roles", intro: "Each role has a distinct mental model of the platform." }, [{ type: "nrp.roleGrid", props: { roles: study.roles } }], 6),
    { parent_id: null, type: "editorial.pullQuote", props: { text: "I'm teaching the event tomorrow. I need to know which of my requirements are still pending — without scrolling through twelve menus.", attribution: "The Instructor" }, sort_order: 7 },
    ...shell({ id: "ia", eyebrow: "06 — Architecture", title: "The mental model — anchored to four pillars" }, [{ type: "nrp.pillarList", props: { intro: study.ia.intro, pillars: study.ia.pillars } }], 8),
    ...shell({ id: "decisions", eyebrow: "07 — Decisions", title: "Seven design decisions that shaped the platform", intro: "Each call is paired with the rationale that drove it." }, [{ type: "nrp.keyDecisionList", props: { decisions: study.decisions } }], 9),
    ...shell({ id: "ranks", eyebrow: "08 — Rank & status", title: "The business-rule layer, visualised", intro: "The rank and status system is the spine of the certification programme." }, [{ type: "nrp.rankTable", props: { ranks: study.ranks } }, { type: "nrp.visualPlaceholder", props: { label: "Rank progression diagram", description: "State machine showing Provider → Instructor Candidate → Instructor → Instructor Mentor" } }], 10),
    ...shell({ id: "accessibility", eyebrow: "09 — Accessibility", title: "WCAG 2.1 AA — the clinical-safety baseline" }, [{ type: "nrp.accessibility", props: { intro: study.accessibility.intro, items: study.accessibility.items } }], 11),
    ...shell({ id: "migration", eyebrow: "10 — Migration", title: "Five years of history, designed as an experience" }, [{ type: "nrp.migration", props: { summary: study.migration.summary, items: study.migration.items } }, { type: "nrp.visualPlaceholder", props: { label: "First-login migration screen", description: "What a returning learner from the legacy platform sees on their first login" } }], 12),
    ...shell({ id: "impact", eyebrow: "11 — Impact", title: "What this work changed", intro: "A multi-year programme — these are the outcomes the work has delivered to date." }, [{ type: "nrp.impact", props: { impact: study.impact } }], 13),
    ...shell({ id: "reflection", eyebrow: "12 — Reflection", title: "What I learned and what's next" }, [{ type: "nrp.reflectionList", props: { items: study.reflection } }], 14),
    { parent_id: null, type: "editorial.footer", props: {}, sort_order: 15 }
  ];

  await replaceBlocksWithNesting(pageId, flatRows.filter(Boolean));
  console.log("  ✓ neonatal-resuscitation-program");
}

// ---------------------------------------------------------------------------
// Voice bespoke
// ---------------------------------------------------------------------------

async function seedVoice() {
  console.log("  Seeding laerdal-voice…");
  const study = voiceCaseStudy;

  await sb.from("case_studies").upsert({
    title: "Laerdal Voice Service Platform", slug: "laerdal-voice",
    excerpt: study.meta.tagline, category: "AI Voice Platform",
    tags: ["AI", "Service Design", "Voice"], role: study.meta.role,
    client: "Laerdal Medical", year: study.meta.timeline,
    duration: study.meta.timeline, status: "published", featured: true,
    cover_url: "/voice-cover.png", accent: "#8bffbe",
    metrics: [], updated_at: new Date().toISOString()
  }, { onConflict: "slug" });

  const pageId = await upsertPage({ kind: "case_study", slug: "laerdal-voice", title: study.meta.title });

  const flatRows: Omit<BlockInsert, "version" | "page_id">[] = [
    { parent_id: null, type: "editorial.hero", props: { meta: study.meta }, sort_order: 0 },
    ...shell({ id: "tension", eyebrow: "01 — The tension", title: "Voice was strategic infrastructure that nobody owned", bordered: false }, [{ type: "editorial.narrative", props: { paragraphs: study.tension } }], 1),
    { parent_id: null, type: "editorial.pullQuote", props: { text: "We didn't know another team had already created a similar patient voice.", attribution: "Education Specialist, vSim team" }, sort_order: 2 },
    ...shell({ id: "problem", eyebrow: "02 — Problem", title: "Business, user, and technical problems all rolled into one" }, [{ type: "editorial.problem", props: { problem: { business: study.problem.business, user: study.problem.user, stakes: study.problem.technical } } }], 3),
    ...shell({ id: "voice-types", eyebrow: "03 — Voice types", title: "Two types of voice — and a very different cost structure", intro: "Understanding the difference between Azure Standard Voices and Custom Voices is fundamental to understanding why VSP was built." }, [{ type: "voice.voiceTypes", props: { voiceTypes: study.voiceTypes } }, { type: "nrp.visualPlaceholder", props: { label: "Azure endpoint cost visualisation", description: "Diagram showing the cost exposure of leaving multiple custom voice endpoints active vs. the VSP-managed approach" } }], 4),
    ...shell({ id: "goals", eyebrow: "04 — Goals", title: "What success looked like", intro: "Six objectives — operational, experiential, and strategic — the platform had to deliver against." }, [{ type: "editorial.goals", props: { goals: study.goals } }], 5),
    ...shell({ id: "method", eyebrow: "05 — Method", title: "Discovery and process", intro: "Cross-team research before any UI work — the hardest UX problem was the org chart, not the screens." }, [{ type: "editorial.method", props: { discovery: study.method.discovery, usability: study.method.process } }], 6),
    ...shell({ id: "personas", eyebrow: "06 — User groups", title: "Four user roles — three existing, one new", intro: "Education Specialists, Product Teams, and Product Owners were the known users. The Voice Expert was a new role VSP introduced." }, [{ type: "nrp.roleGrid", props: { roles: study.personas } }, { type: "voice.voiceExpertCard", props: { persona: study.voiceExpert } }, { type: "nrp.visualPlaceholder", props: { label: "Service blueprint workshop output", description: "Affinity map of pain points and dependencies across all user groups" } }], 7),
    ...shell({ id: "insights", eyebrow: "07 — Insights", title: "Four research findings that shaped the platform", intro: "Each finding came directly from stakeholder interviews and service-blueprint workshops across the six product teams." }, [{ type: "voice.insightList", props: { insights: study.insights } }], 8),
    ...shell({ id: "vision", eyebrow: "08 — Vision", title: "A reframe — from voice creation to voice ecosystem", intro: "The most important design moment on this programme wasn't a screen." }, [{ type: "voice.visionShift", props: { shift: study.vision.shift, statement: study.vision.statement } }, { type: "voice.principleGrid", props: { principles: study.principles } }], 9),
    ...shell({ id: "service", eyebrow: "09 — Service design", title: "From multi-handoff to self-service", intro: "The platform's defining UX shift: collapsing a multi-week, engineering-gated workflow into a self-service path." }, [{ type: "voice.serviceFlowComparison", props: { before: study.serviceFlow.before, after: study.serviceFlow.after, beforeSummary: study.serviceFlow.beforeSummary, afterSummary: study.serviceFlow.afterSummary } }, { type: "nrp.visualPlaceholder", props: { label: "Service blueprint — before / after", description: "Side-by-side blueprint" } }], 10),
    { parent_id: null, type: "editorial.pullQuote", props: { text: "The platform turned voice from an engineering line item into a portfolio capability we can actually plan around.", attribution: "Product Owner, vSim" }, sort_order: 11 },
    ...shell({ id: "mvp", eyebrow: "10 — MVP scope", title: "Eight epics defined the initial product", intro: "The MVP scope was defined through collaborative workshops." }, [{ type: "voice.mvpEpicsGrid", props: { epics: study.mvpEpics } }, { type: "nrp.visualPlaceholder", props: { label: "User story mapping board", description: "Story map showing epics, user stories, and MVP cut line" } }], 12),
    ...shell({ id: "request-flow", eyebrow: "11 — Request flow", title: "Voice modification and activation — governed, not gated", intro: "Every custom voice endpoint activation carries ongoing, usage-based cost." }, [{ type: "voice.requestFlow", props: { intro: study.requestFlow.intro, steps: study.requestFlow.steps } }, { type: "nrp.visualPlaceholder", props: { label: "Request Management — Admin view", description: "Pending requests queue, request details panel" } }, { type: "nrp.visualPlaceholder", props: { label: "Request Management — VSP User view", description: "User's own request history, real-time status badges" } }], 13),
    ...shell({ id: "usps", eyebrow: "12 — Platform differentiators", title: "Six things VSP does that nothing else at Laerdal does", intro: "Each USP directly addresses a pain point from research." }, [{ type: "voice.uspGrid", props: { usps: study.usps } }], 14),
    ...shell({ id: "decisions", eyebrow: "13 — Decisions", title: "Six design decisions that shaped the platform", intro: "Each decision is paired with its rationale." }, [{ type: "nrp.keyDecisionList", props: { decisions: study.decisions } }], 15),
    ...shell({ id: "architecture", eyebrow: "14 — Architecture", title: "Multi-provider strategy with one experience layer", intro: "VSP integrates three voice providers under a single abstraction." }, [{ type: "voice.providerTable", props: { providers: study.providers } }, { type: "voice.architectureGrid", props: { capabilities: study.architectureCapabilities } }, { type: "nrp.visualPlaceholder", props: { label: "Provider routing diagram", description: "System view: how a voice request flows through VSP" } }], 16),
    ...shell({ id: "showcase", eyebrow: "15 — Design showcase", title: "User flows, wireframes, and high-fidelity screens", intro: "Twelve visual areas covering every key surface." }, [{ type: "voice.showcaseSection", props: {} }], 17),
    ...shell({ id: "impact", eyebrow: "16 — Impact", title: "What this work delivered", intro: "A multi-team programme — outcomes delivered so far." }, [{ type: "nrp.impact", props: { impact: study.impact } }], 18),
    ...shell({ id: "reflection", eyebrow: "17 — Reflection", title: "What I learned and what's next" }, [{ type: "nrp.reflectionList", props: { items: study.reflection } }], 19),
    { parent_id: null, type: "editorial.footer", props: {}, sort_order: 20 }
  ];

  await replaceBlocksWithNesting(pageId, flatRows.filter(Boolean));
  console.log("  ✓ laerdal-voice");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("🌱 Seeding Supabase…\n");

  await seedHome();
  await seedGenericStudies();
  await seedAdapt();
  await seedNrp();
  await seedVoice();

  console.log("\n✅ Seed complete.");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
