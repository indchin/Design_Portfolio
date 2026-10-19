# NRP Case Study — Living Context

Single source of truth for the Neonatal Resuscitation Program (NRP) case study. Everything shared for NRP is logged here, then folded into the sections below and, finally, into the published content.

- **Published content:** [src/content/case-studies/neonatal-resuscitation-program.ts](../../src/content/case-studies/neonatal-resuscitation-program.ts)
- **Block renderers:** `src/components/case-study/nrp-blocks.tsx`, `src/lib/blocks/definitions/nrp.tsx`
- **Raw materials:** [resources/](resources/) (research, designs, data, docs, quotes)
- **Status:** Page built from S1 at `/work/neonatal-resuscitation-program` (content in `src/content/case-studies/nrp-pediaskills.ts`). Image/text slots waiting on your materials.
- **UX plan:** [NRP-UX-PLAN.md](NRP-UX-PLAN.md)
- **Last updated:** 2026-10-12

## How this file works

1. User shares something (file, link, notes, numbers) → drop files in `resources/<type>/` or paste in chat.
2. I add a row to the **Intake log**, extract facts into the relevant section below, and tag each fact with its source ID (e.g. `[S3]`).
3. Claims in the published case study should trace to a source here. Anything with no source is marked **UNVERIFIED**.
4. Open questions and gaps get updated after every intake.

## Confidentiality rules (AAP is a regulated client)

- Check with Laerdal/AAP what can be public before using screenshots, names, metrics, or learner data.
- No real learner PII, eCard numbers, or internal admin data in screenshots. Redact or recreate with dummy data.
- Mark each source: `public` / `NDA-redact` / `internal-only`. Only `public` and redacted material goes into the site.
- `resources/` is not meant for the public repo. Consider gitignoring `content/nrp/resources/` before committing (not done yet; your `.gitignore` has uncommitted edits).

---

## Intake log

| ID | Date | Type | File / link | Summary | Confidentiality | Used in |
|----|------|------|-------------|---------|-----------------|---------|
| S1 | 2026-10-12 | doc | resources/docs/NRP_Design_Case_Study.md | Structured case-study source from AAP Confluence: 19 sections, asset checklist, [ADD]/[CONFIRM] markers | internal-only until approved | page (all sections) |
| S0 | 2026-10-07 | draft | neonatal-resuscitation-program.ts | Existing draft narrative (role, problem, 4 roles, 7 decisions, ranks, a11y, migration, impact) | public (own writing) | all |

## Conflicts between S0 (old draft) and S1 (Confluence doc)

The page follows S1. Please decide which is right, then I'll align the other.

| Topic | S0 (old draft) | S1 (Confluence) |
|-------|----------------|-----------------|
| Timeline | 2022 – present | 2020 concept → 2026 |
| Role | Lead Interaction Designer | Placeholder ("your exact title") |
| Starting point | Replaced a third-party LMS; 5 years of history migrated | Separate systems; instructors held in HealthStream; MVP built 2021; edition migration 2024 |
| Roles | 4 primary roles | 6 role groups |
| Accessibility | WCAG 2.1 AA conformant | Not mentioned (page makes no claim) |
| Home-page card | Uses S0 wording ([portfolio.ts](../../src/content/portfolio.ts) cs-nrp) | n/a |

## Project facts (verified)

_Only facts backed by a source. Add `[Sx]` after each._

- Client: American Academy of Pediatrics (AAP); delivered by Laerdal with RQI Partners / HealthStream context. `[S1]`
- ~43,000 users log in monthly (Heap, June 2026). `[S1]`
- Tools: Adobe XD (2020–21), Figma (2024+), Confluence, Jira. `[S1]`
- Role: Lead Interaction Designer (shown on page, marked CONFIRM). `[S0]`
- Timeline: 2020 – 2026 (shown on page, marked CONFIRM). `[S1]`
- Team / cadence: SAFe Agile, two-week sprints, design 1–2 sprints ahead. `[S0]`

## Evidence by section

### Problem and context
- Gaps: why AAP left the legacy LMS; contract/timeline drivers; scale (users, institutions, courses).

### Users and research
- Gaps: real research artefacts (interviews, surveys, workshop outputs, ticket analysis). Current quotes in S0 are illustrative and must be replaced with real, attributable ones or removed.

### Domain model (ranks, statuses, rules)
- S0 lists Provider / IC / Instructor / Mentor. Needs checking against actual business-rules doc.

### Design decisions
- S0 has 7. For each, we need: the alternatives considered, the screenshot/flow, and the evidence that drove it.

### Accessibility
- Gap: actual audit results or conformance statement. "WCAG 2.1 AA" claim is unverified.

### Migration
- Gap: real numbers (records migrated, error rate, edge cases) and what actually shipped vs. was planned.

### Impact and metrics
- S0 says impact is **unmeasured**. Any real post-launch data replaces that.

## Asset checklist (page slots)

Save as `public/case-studies/nrp/<slot-id>.png` (or jpg/webp/svg). For several images use `<slot-id>-1`, `-2`, `-3`. Empty slots are visible in dev only. Status column: update as you share.

| Slot ID | What | Source | Status |
|---------|------|--------|--------|
| hero | Learner dashboard (final PediaSkills) | Figma / XD | todo |
| initiation-doc | High-level proposal slide | Confluence: High-level Requirements | todo (optional) |
| process-diagram | Workflow photo / diagram | Your files | todo |
| personas (-1..-3) | Persona cards | Your research | todo |
| learning-paths | Learning paths map | Figma: NRP SYSTEM FLOWS | todo |
| workshop-artefact | Requirements table / notes | Confluence: Requirements gathering | todo |
| journey-learner-provider | Journey map | Confluence: Learner to Provider - UJ | todo |
| journey-ic-instructor | Journey map | Confluence: IC to Instructor - UJ | todo |
| sitemap-dashboard | Dashboard structure | Confluence: End User Dashboard Design Structure | todo |
| sketches | Sketches / low-fi | Your files / XD | todo |
| mockups | Mid-fi mock-ups | XD: Learner to Provider MU/VD | todo |
| decision-01 … decision-07 | One screen per decision | Your files | todo |
| final-registration | Registration, Global ID, login | XD | todo |
| final-dashboard | Dashboard, My Learnings | XD | todo |
| final-commerce | Catalogue, purchase, licences | Figma / XD | todo |
| final-instructor | Events, rosters, grading | XD | todo |
| final-admin | Applications, bulk purchase, licences | Figma 2024 specs | todo |
| final-certificates | Certificates, eCards | XD templates | todo |
| final-mobile | Mobile (only if completed) | Your files | todo |
| style-guide | Colours, type, components | Design system file | todo |
| visual-before-after | 2021 vs 2026 look | XD vs Figma | todo |
| feedback-change | Demo feedback before/after | Confluence: Demo Feedback | todo |
| evo-version-popups | 8th→9th edition popups | Figma | todo |
| evo-admin-flows | Add licence, delete unregistered, bulk purchase | Figma | todo |
| evo-rebrand-before-after | PediaSkills old vs new | Figma | todo |
| evo-chatbot-ui | Chatbot concept | Your designs | todo |

Text and data slots (edit `nrp-pediaskills.ts`): your role paragraph, ideation paragraph, research findings/quotes, competitive review, visual-design decisions, usability testing, measured results (`outcomes.metrics`), stakeholder quote (`outcomes.quote`), reflections, credits, prototype link (`prototypeUrl`).

## Open questions

1. Is the platform live? Launch date and rollout phases?
2. What can be shown publicly (screens, AAP name, metrics)?
3. Which parts did you personally design vs. the wider team?
4. Any real metrics: users migrated, support tickets, renewal time, adoption?
5. Any real user research or usability tests, and who ran them?
6. Is there an existing Figma file, Jira epics, or PRD to pull from?
7. Which of the 7 decisions are the strongest 3 to lead with?

## Gaps checklist

- [ ] Real research evidence (replace illustrative quotes)
- [ ] Screenshots / flows for each key decision (redacted)
- [ ] Scale numbers (users, institutions, records migrated)
- [ ] Outcome metrics or credible qualitative outcomes
- [ ] Accessibility audit evidence
- [ ] Alternatives considered per decision
- [ ] Your exact contribution vs. team
- [ ] Public-use clearance

## Content plan

| Phase | Goal | Output |
|-------|------|--------|
| 1. Collect | You share materials; I log and extract | Intake log + sections above filled |
| 2. Gap review | Compare evidence to draft claims; flag unsupported ones | Updated gaps list |
| 3. Narrative | Tighten to a story: tension → decisions → outcome. Lead with top 3 decisions | New outline |
| 4. Visuals | Place redacted screens/diagrams into the block layout | Assets in `public/` or Cloudinary |
| 5. Build | Update the `.ts` content + blocks; typecheck and preview | Updated case study page |
| 6. Review | Run portfolio-team review (content, a11y, research) | Approved findings |

## Change log

- 2026-10-12: Logged S1 (NRP_Design_Case_Study.md, copied to resources/docs). Built the page, UX plan and asset checklist. Listed S0/S1 conflicts.
- 2026-10-07: Created file and `resources/` folders; logged existing draft as S0.
