# Findings Board

Maintained by `portfolio-manager`. Statuses: `proposed` → `approved` → `in-progress` → `done` →
`verified`, or `rejected` / `deferred`.

Next ID: F-063

Run 1 = full review, 2026-10-07 (9 reviewers, 1 cross-review round). Reviewed from code plus shared screenshots (desktop and mobile). Light theme and live keyboard or screen-reader passes were NOT done. A production build was NOT run.

| ID | Title | Lens | Sev | Effort | Status | Where | Run |
|---|---|---|---|---|---|---|---|
| F-001 | Contact form shows success but sends nothing | ux, content, backend, a11y | P0 | M | verified | contact-section.tsx, api/contact | 1 |
| F-002 | Unauthenticated read/write on /api/case-studies (service role) | backend | P0 | S | verified | api/case-studies/route.ts | 1 |
| F-003 | Admin auth fails open (empty allowlist, open signup, public email var, RLS) | backend | P0 | M | done | middleware.ts, login-form.tsx | 1 |
| F-004 | Upload and signature endpoints unscoped, no type or size limits | backend | P0 | M | done | api/assets/* | 1 |
| F-005 | Modals have no focus trap or focus restore | a11y | P0 | M | verified | command-palette, persona-grid, artifact-gallery | 1 |
| F-006 | Nav "Book" CTA points to placeholder Calendly URL | ux, perf, research | P0 | S | verified | navigation.tsx, portfolio.ts:13 | 1 |
| F-007 | Open redirect in auth callback | backend | P1 | S | verified | auth/callback/route.ts | 1 |
| F-008 | No mobile menu, nav anchors dead on /work/*, resume hidden on mobile | ux, a11y | P1 | M | done | navigation.tsx | 1 |
| F-009 | Admin link and "Admin CMS" exposed in public nav and palette | ux, perf, backend | P1 | S | verified | navigation.tsx, command-palette.tsx | 1 |
| F-010 | Non-Adapt case-study body flush to viewport edge | design, research | P1 | S | verified | work/[slug]/page.tsx:120-130 | 1 |
| F-011 | ShopCPR is a featured "coming soon" stub | design, content, research, ux | P1 | L | done | portfolio.ts:159-207 | 1 |
| F-012 | NRP and Voice show dashed "Visual showcase" placeholders | content | P1 | L | proposed | nrp-blocks.tsx, case-study content | 1 |
| F-013 | Hero lacks role, location and proof (name stays H1; role line beneath) | design, ux, content | P1 | S | done | hero-section.tsx | 1 |
| F-014 | Adapt participant counts contradict each other; "clear winner" overstated | research, content | P1 | S | proposed | adapt-*.ts | 1 |
| F-015 | Named participants, recordings and client commercial detail public | content, research | P1 | S | done | adapt-*.ts, laerdal-voice.ts | 1 |
| F-016 | Impact claims exceed evidence; title, tenure and date mismatches | content, research | P1 | M | proposed | portfolio.ts, case-study content | 1 |
| F-017 | No favicon (the console 404) | perf, a11y | P1 | S | done | src/app | 1 |
| F-018 | /og uncached, free-text params, no font | perf, backend | P1 | S | proposed | og/route.tsx | 1 |
| F-019 | Light theme fails contrast; decide keep or drop | a11y, design | P1 | M | done | globals.css, tailwind.config.ts | 1 |
| F-020 | 20 deps pinned to "latest"; unused three, gsap, mdx, cloudinary | frontend, perf, motion | P1 | S | done | package.json | 1 |
| F-021 | BlockList is a client component, shipping admin schemas to visitors | frontend | P1 | M | proposed | lib/blocks/block-list.tsx | 1 |
| F-022 | Block schemas are z.any; invalid props are saved and rendered | frontend, backend | P1 | M | proposed | lib/blocks, api/pages/*/blocks | 1 |
| F-023 | Lenis plus native smooth scroll conflict; reduced motion partial | motion, a11y | P1 | S | verified | smooth-scroll.tsx, globals.css | 1 |
| F-024 | Case studies lack at-a-glance, next/prev, outcome up top | ux, content | P1 | M | proposed | work/[slug]/page.tsx | 1 |
| F-025 | Work grid orphan card, inconsistent covers, over-built filters | design, ux | P1 | M | proposed | case-study-browser.tsx | 1 |
| F-026 | RLS grants all authenticated users full access; security-definer fn | backend | P1 | M | proposed | supabase/*.sql | 1 |
| F-027 | /api/reports serves any bucket object, immutable cache | backend | P1 | S | proposed | api/reports | 1 |
| F-028 | Duplicate h1 on case-study pages | a11y | P1 | S | verified | page.tsx:74, editorial-blocks.tsx:91 | 1 |
| F-029 | No security headers (static set; strict CSP only on admin and preview) | backend, perf | P2 | S | proposed | next.config.mjs | 1 |
| F-030 | Lint fails: block-canvas hook warning, N parallel undo saves | frontend | P2 | S | done | block-canvas.tsx | 1 |
| F-031 | Command palette and assistant: semantics, overpromise, discoverability | ux, a11y | P2 | S | proposed | command-palette.tsx, portfolio-assistant.tsx | 1 |
| F-032 | Hero scroll fade, cursor glow re-renders, ad hoc motion timings | motion, a11y, perf | P2 | M | proposed | hero-section.tsx, cursor-glow.tsx | 1 |
| F-033 | Type scale and hardcoded colour sprawl (10px labels, #0e0e12) | design, frontend, a11y | P2 | M | proposed | components/** | 1 |
| F-034 | Form field borders 1.33:1 (fails 1.4.11) | a11y | P2 | S | verified | ui/input, textarea | 1 |
| F-035 | Missing aria state: theme toggle, filters, assistant log, form errors | a11y | P2 | S | proposed | navigation, browser, assistant, contact | 1 |
| F-036 | SEO gaps: robots, sitemap, JSON-LD, DB-only metadata, lastmod | perf, frontend | P2 | M | proposed | robots.ts, sitemap.ts, page.tsx | 1 |
| F-037 | Recognition, About and Writing copy and proof | content | P2 | M | proposed | portfolio.ts, sections | 1 |
| F-038 | Resume PDF title, download name, uncommitted | a11y, perf | P2 | S | done | public/resume.pdf | 1 |
| F-039 | Repo hygiene: tsbuildinfo tracked, .DS_Store, key in project folder | frontend | P2 | S | done | .gitignore | 1 |
| F-040 | No analytics or visitor testing | research | P2 | M | proposed | layout.tsx | 1 |
| F-041 | Personas and NRP/Voice quotes lack provenance; Voice lacks AI evaluation story | research, content | P2 | M | proposed | case-study content | 1 |
| F-042 | Home content has two sources of truth (DB blocks vs portfolio.ts) | frontend | P2 | M | proposed | page.tsx, blocks | 1 |
| F-043 | Fixed header and floating widgets can obscure focus; no scroll-padding | a11y | P2 | S | proposed | globals.css, navigation | 1 |
| F-044 | next/font not wired; --font-sans undefined | perf | P2 | S | proposed | layout.tsx | 1 |
| F-045 | AI authoring (Adapt Studio) case study | research | P3 | L | proposed | new content | 1 |
| F-046 | NRP page in production is a text-only shell: no role, screens or outcome; draft-instruction intros are public; empty sections stay in TOC | ux, content, design, research | P0 | L | done | nrp-sections.tsx:310,333, nrp-assets.ts:19 | 2 |
| F-047 | NRP lacks at-a-glance (Problem / What I owned / Result) and a first-person "My role" above the fold | ux, content, research | P1 | M | done | nrp-sections.tsx:107-151, :237 | 2 |
| F-048 | NRP decisions list rules, not trade-offs: cut to 3 in depth (Rule / Options / Chosen / Trade-off / Result), collapse 02/03/04/06 | content, research, design, designdir | P1 | M | done | nrp-pediaskills.ts:246-282 | 2 |
| F-049 | NRP stats and outcomes show effort and reach, not impact: use Measured / Observed / Not measured | content, research | P1 | S | done | nrp-pediaskills.ts:43-47,422-439 | 2 |
| F-050 | "Research" and "Validation" headings overstate stakeholder workshops and demos; add an Evidence and limits box | research, content | P1 | S | done | nrp-sections.tsx:277,361 | 2 |
| F-051 | 14 sections / ~26,000px: restructure to 8 sections with decisions as the spine (Direction A) | designdir, content, ux, research, design | P1 | L | done | nrp-pediaskills.ts:443, nrp-sections.tsx | 2 |
| F-052 | No section navigation below 1280px; TOC jumps do not move focus | ux, a11y, design | P1 | M | done | sticky-toc.tsx, nrp-sections.tsx:153 | 2 |
| F-053 | NRP confidentiality and consistency: HealthStream still named, legacy file has invented quotes and WCAG claim, home card contradicts page, clearance unconfirmed (extends F-015, F-016, F-041) | research, content, ux | P1 | S | done | nrp-pediaskills.ts:54,72,77; neonatal-resuscitation-program.ts; portfolio.ts:129-160 | 2 |
| F-054 | Artifact alt text is just the slot label, and the button aria-label hides it | a11y, content | P1 | M | done | nrp-client.tsx:58,81-92 | 2 |
| F-055 | NRP light theme: eyebrows text-primary/80 are 4.10:1; Badge, TOC and timeline use white/x borders (part of F-019) | a11y | P1 | S | done | editorial-blocks.tsx:47, nrp-client.tsx:183, sticky-toc.tsx:63 | 2 |
| F-056 | Generic end-of-page footer: add next-case-study card, resume and contact (part of F-024) | ux, content | P1 | S | done | editorial-blocks.tsx:803 | 2 |
| F-057 | Placeholder system needs draft and public modes; amber fails on light (extends F-012) | designdir, design, a11y | P2 | M | done | nrp-sections.tsx:15-67 | 2 |
| F-058 | Layout polish: left-align headers to one edge, card tiers, 12px eyebrow class, 16px mobile prose (extends F-033, F-025) | design, designdir | P2 | M | done | nrp-sections.tsx, editorial-blocks.tsx:24-60 | 2 |
| F-059 | Rank ladder shown as stepper with text status chips instead of six identical cards | designdir | P2 | M | done | nrp-sections.tsx:255-274 | 2 |
| F-060 | Reflection section is empty; write three reflections and hold unconfirmed roadmap pills | content, research | P2 | M | proposed | nrp-sections.tsx:419-436 | 2 |
| F-061 | NRP page title and description: no keywords, brand names and arrow glyph | content | P2 | S | done | page.tsx:7-28 | 2 |
| F-062 | Interaction affordances: zoom badge, Expand all, tab scroll cue, lightbox caption, extra tabpanel tab stop | ux, a11y | P3 | S | done | nrp-client.tsx:93,111,153-174 | 2 |

## Details

Full finding text lives in the run-1 specialist reports. Key cross-review outcomes:

- **F-013:** design amended. Name stays H1 (larger, `text-5xl md:text-7xl`), a role, seniority and location line sits directly beneath it, then content's proof lede. Badge and role line merge into one element.
- **F-029:** perf amended. Static headers only (HSTS, nosniff, Referrer-Policy, Permissions-Policy, frame-ancestors). Report-only CSP on public pages. Strict nonce CSP only on /admin and /preview, so ISR is kept. Confirm /og still fetches for crawlers.
- **F-032:** a11y amended. A scroll fade at opacity 0.4 fails contrast on the statement text (2.36:1). Keep the floor at 0.7 or fade the h1 only. Gate the 10s infinite background loop on reduced motion.
- **F-033/F-034:** a11y amended. `border-border` is fine for decorative cards but not for form fields (needs about 3:1).
- **F-019:** a11y recommends dropping the toggle. If it stays: primary about `193 95% 26%` (re-verify), token-based surfaces, persisted state, aria-pressed, light screenshots.
- **F-001/F-003/F-004:** group as one security batch behind a shared `requireAdmin()`.
- **Open question for the user (F-015, F-016):** consent for named participants, AAP and WHO naming, vendor pricing, Figma links.

### Run 1 implementation and verification notes (2026-10-07)

- **Verified:** F-001 (form wired; returns 503 until Supabase storage or Resend is configured, so mail is not delivered yet), F-002, F-006 (nav shows "Contact" until a real Calendly URL is set), F-007, F-009, F-010.
- **F-003 partly:** fails closed, but still needs (a) `ADMIN_EMAILS` set and `NEXT_PUBLIC_ADMIN_EMAIL` unset on the host, (b) Supabase public signups disabled, (c) F-026 RLS policies tightened (only `publish_page` is hardened so far).
- **F-004 regression:** `createBucket` was removed and no SQL creates `portfolio-assets`; uploads 500 on a fresh project. Add a `storage.buckets` insert. Confirm Cloudinary accepts `max_file_size` as a signed param.
- **F-008 partly:** mobile menu works; resume label lacks "PDF". At 390px the header holds logo, theme toggle, Contact and menu button; needs a screenshot check.
- **F-013 partly:** hierarchy resolved. Floating "Ask AI" and "Command menu" chips still overlap content; aurora and noise layers still heavy; `portfolio.owner.statement` and the "10 years" field are unchanged.
- **F-011 and F-015 reopened (in-progress):** source is fixed, but the LIVE site still serves the old text and names because home and case-study pages are read from the published Supabase blocks. A check of `/work/adapt-authoring-tool` still shows Cathrine, Hilde, Rashmi and Purnima; `/work/shopcpr` still shows "coming soon". Needs a re-publish from /admin (or a reseed) to take effect. Also still open for F-015: HealthStream named 14 times, Dovetail tag-board images, Figma links.
- **F-019 partly:** tokens and light primary done; `white/[x]` borders remain in Badge and about 15 other files, 42 `text-[10px]` remain, light mode not yet captured.
- **Regression to check:** Cmd+K can open the palette under another open modal.
- **A11y verification:** F-005, F-028, F-034, F-023 verified. F-019 stays `done` but partly: `case-study-browser.tsx:110` still uses `style={{ color: study.accent }}` (1.17-2.30:1 on light); `text-primary/80` eyebrows are 4.1:1 on light; `white/[x]` sweep pending. Hero 10s opacity pulse not stopped by reduced motion (P3). No-flash theme script missing (P3).
- **F-015 follow-up (done 2026-10-07):** HealthStream genericised (15 mentions), Dovetail tag-board images removed (6), Figma URLs removed (8 refs), seed.ts `$4/hr` and a named pull-quote fixed, voice-blocks.tsx `$4/hr` removed. DB backed up (5 pages, 220 blocks, 4 case studies) to the session scratchpad, then `npm run seed` ran for all 5 pages. After seed: 0 of 220 DB blocks contain old names/text, live pages show none, shopcpr featured=false. Still open: F-015 consent for any remaining identifying detail is the user's call; F-011 layout half (Earlier work row) not done; Adapt participant counts unreconciled (need Dovetail numbers).

### Run 2: NRP case study, 2026-10-12

Scoped review by case-study-editor (lead), research-analyst, design-critic, design-director, ux-flow-reviewer, accessibility-auditor. Reviewed from code, rendered HTML and desktop and mobile screenshots (dark theme only). `/work/nrp-pediaskills` is a 404 by design; `nrp-pediaskills.ts` is the content source of `/work/neonatal-resuscitation-program`. The apparent duplicate hero in the desktop capture was checked: the served HTML has one h1 and one main, so it is a capture artefact. No production build was run.

- **Scorecard (case-study-editor):** 12 criteria, strongest are problem framing (3) and healthcare context (3); weakest are reflection (0), craft and artifacts in production (0), role (1), outcome (1), audience fit (1). Verdict: fails a hiring manager's 3-minute test as built, passes after F-046 to F-049.
- **Chosen direction pending:** Direction A "Decisions first" (8 sections, three decisions in depth) recommended by design-director and agreed by case-study-editor; Direction B "Four chapters" is the cheaper stopgap.
- **Facts only the user can supply:** exact title and dates (page 2020-2026, home card 2022-Present), "I versus we" contribution, team size, why AAP wanted one platform, options and decision owner for each lead decision, any post-launch data, whether the platform is live, three reflections, redacted screenshots.
- **Confidentiality open:** AAP, Rhapsode, RQI Partners and Salesforce naming, the Heap 43,000 figure, roadmap items (PEPP, NICU, NEPP, chatbot), the AAP business rules, and all screenshots. HealthStream is still named on this page despite F-015.
- **Accessibility numbers agreed (light theme):** placeholder #8A5A00 on #FFF8E6 5.59:1; Done #166534 on #DCFCE7 6.49:1; Pending #8A5A00 on #FFF3D1 5.36:1; Locked #475569 on #E2E8F0 6.15:1; muted-foreground 12px on cards 6.54:1 light, 9.35:1 dark; control borders need about 45% ink (3.02:1). Dark chip pairs still outstanding.
- **Not duplicated:** F-012 (placeholders), F-016 (impact and date mismatches), F-019 (light theme), F-024 (at-a-glance, next/prev), F-025 (covers), F-033 (type scale), F-041 (provenance). Cover re-export to 1600x1280 (5:4) is tracked under F-025.
- **Correction applied (case-study-editor, after report):** the draft outcome "Observed" line must read "the design was extended to the 8th to 9th edition migration (2024) and the PediaSkills rebrand (2026) on the same product structure. [NEEDS FROM CHINMAY: did both ship?]". "Without a rebuild" is a goal, not a result. Remove "survived an edition change and a rebrand" from the at-a-glance outcome line. Applies to F-047 and F-049.
- **Open disagreement on F-048 (which three decisions lead):** case-study-editor and research-analyst pick 01 (learner-started clock), 05 (banner) and 07 (reversible consent), because those have the traceable feedback-to-change trail; 02/03/04 are AAP programme rules. design-director's final report picks 01, 03 and 02 as the depth cards and moves 05 to 07 into the feedback table. User to choose.

### Run 2 implementation notes: batches 1 and 2 (2026-10-12)
- **Done, reviewer-checked in code (no production build, no live keyboard pass, mobile screenshot not opened):** F-046 (draft intros, empty sections and TOC entries hidden in production; `NRP_READY = false` sets noindex in page.tsx; Reflection always hidden in production), F-052 (below-xl `<details>` TOC, focus to h2, Back to top), F-054 (`Slot.alt` plumbing only, no alt text authored), F-055 (eyebrows, Badge, TOC marker, timeline dot, amber), F-056 (`next` prop on CaseStudyFooter, NRP only), F-062 (zoom badge, Expand all, tab fades, lightbox caption, tabpanel tabIndex removed). ux verified F-046, F-052, F-056 in code; a11y verified F-054, F-055, F-062 in code and F-052 partly (the below-xl disclosure itself unverified); casestudy verified wording.
- **F-053 done, with follow-ups:** HealthStream gone from all NRP files (manager grep). Home card aligned to the page. Legacy file `neonatal-resuscitation-program.ts` is still imported by scripts/seed.ts and nrp-blocks.tsx, so it was cleaned, not deleted; it still holds unsupported narrative (migration UX decision, five years of history, "four user roles" in IA intro and decisions, competitive teardown). Do not reseed before that is retired or rewritten. Published Supabase blocks may still serve old text; republish from /admin or approve a reseed.
- **Manager corrections queued for batch 3+4:** remove "about 43,000 monthly logins" from the home card (user decision: no added prominence; casestudy agreed); card metrics must not say "4 user roles"; check footer wording "First structured user research" is supported by the Adapt source, else drop "First"; sitemap lists the NRP page while it is noindex.
- **a11y residual (other case studies, not NRP):** `text-primary/80` at 12px in editorial-blocks.tsx lines ~142 and ~301.
- **Pending the user's clearance, left as shown:** AAP name, Heap 43,000 figure, Rhapsode, RQI Partners, Salesforce naming, and roadmap items (hidden in production only).

### Run 2 implementation notes: batches 3 and 4 (2026-10-12)
- **Done, manager-checked:** typecheck and lint pass; `/`, the NRP page, Adapt, Voice, ShopCPR and `/sitemap.xml` return 200; the sitemap excludes the NRP slug while `NRP_READY` (src/lib/nrp-ready.ts) is false; served HTML carries noindex. The first run was cut off by an API error and left the repo broken (typecheck errors, NRP page 500); the resumed run repaired it (the legacy file's `nrpCaseStudy` export and tuple typing).
- **Delivered:** Direction A with 7 sections (5 public TOC items, 7 in draft), at-a-glance strip, three decision cards (01, 05, 07), three native disclosures (rules designed around, six roles and rank ladder, final design by area), three-tier outcome block, retitled sections with an Evidence and limits box, rank-ladder stepper with text status chips, slim draft placeholders plus a single draft checklist panel, left-aligned section headers (opt-in `align="left"`, other case studies unchanged), card tiers, `.nrp-label` 12px, new title and description, `Slot.withheld` plus `RedactedFrame`. A real mobile overflow in the decision cards (501px at 390px) was found and fixed by the implementer.
- **Legacy file cleaned:** all seven decisions, roles, IA, accessibility, migration, impact and reflection rewritten to what the page states (reflection emptied). Research-analyst and design-critic re-verification requested (pending).
- **Not publishable yet (implementer and manager agree):** zero images, no author-written role or reflection, noindex on. Production mode was never rendered (no build approved).
- **Blocked on the user:** title confirmation, what the user owned, team size, scope sentence; options, trade-off, result and decider role for decisions 01, 05, 07; whether the 2024 migration and 2026 rebrand shipped; post-launch data; the "what I would test first" line; reflections; screenshots (hero and decision-01, -05, -07 first); clearance for AAP name, Heap 43,000, Rhapsode, RQI Partners, Salesforce.
- **Risks to surface:** `scripts/seed.ts` still has hard-coded legacy titles that a reseed would republish ("A platform AAP couldn't fully own", "WCAG 2.1 AA — the clinical-safety baseline", "Five years of history, designed as an experience", "The mental model — anchored to four pillars", "The business-rule layer, visualised", and Voice "Four user roles" titles); do not reseed until these are rewritten. `nrp-blocks.tsx` (legacy CMS renderer) still has `text-[10px]`, `text-primary/80` and amber classes. The 43,000 figure now appears at 36px in the at-a-glance strip: confirm that is not added prominence.
- **Open small items:** a disclosure on the Adapt page has no focus ring (editorial-blocks.tsx ~698, outside NRP). `Escape` does not close the below-xl `<details>` (minor). Cover re-export 5:4 stays under F-025.
