# Portfolio Review Team — Charter

Every agent on this team reads this file before starting work. It defines who does what, how findings
are written, and how agents hand work to each other.

## The product we are reviewing

- **What:** Personal portfolio of Chinmay Sharma, Lead UX/UI Designer (AI products, research, design
  systems, accessibility, healthcare EdTech at Laerdal).
- **Primary audiences, in priority order:**
  1. Hiring managers / design leaders: judge craft, thinking, and impact in 3–5 minutes.
  2. Recruiters: need role fit, seniority, location, and resume within ~30 seconds.
  3. Peer designers and collaborators: browse case studies in depth.
- **Goal of the site:** Get the visitor to (a) believe in the designer's judgement through case studies
  and (b) take an action: contact, download the resume, or book a call.
- **Sections:** Hero, About (`#about`), Work (`#work`, case-study browser), Writing (`#writing`),
  Recognition (`#recognition`), Social proof, Contact (`#contact`), Resume (`public/resume.pdf`).
- **Case studies:** `/work/adapt-authoring-tool`, `/work/neonatal-resuscitation-program`,
  `/work/shopcpr`, `/work/laerdal-voice` (+ Adapt sub-pages for research report and themes).

## Stack map (where things live)

| Concern | Location |
|---|---|
| Pages / routes | `src/app/` (App Router), case studies at `src/app/work/[slug]/page.tsx` |
| Home sections | `src/components/sections/*.tsx` |
| Case-study components | `src/components/case-study/*.tsx` |
| Block CMS (home + case studies) | `src/lib/blocks/` (registry, definitions, data) |
| Content source | `src/content/portfolio.ts`, `src/content/case-studies/*.ts` |
| Design tokens / theme | `tailwind.config.ts`, `src/app/globals.css` |
| UI primitives | `src/components/ui/*` (CVA + tailwind-merge) |
| Motion | `framer-motion`, `gsap`, `lenis` (`src/components/smooth-scroll.tsx`), `three`, `cursor-glow.tsx` |
| Backend | `src/app/api/**`, `src/middleware.ts`, `src/lib/supabase*.ts`, `supabase/*.sql` |
| Admin CMS | `src/app/admin/**`, `src/components/admin/**` |
| SEO | `src/app/sitemap.ts`, `robots.ts`, `og/route.tsx`, `src/components/seo/json-ld.tsx` |

Visual design: the portfolio has its **own** visual language (see `tailwind.config.ts`). The Laerdal LIFE
design system applies to Laerdal products, not to this site. Reference it only when judging how Laerdal
product screens are *shown* inside case studies.

## Shared tools

- **Screenshots:** `node scripts/review-capture.mjs [--pages /,/work/shopcpr] [--section about]
  [--viewports desktop,tablet,mobile] [--reduced-motion]`. This needs `npm run dev` running. PNGs go to
  `.claude/team/screenshots/`, so open them with the Read tool to see them. `console.json` in the same
  folder lists console errors and failed requests. If the server is not running, say so and review from
  code. Never start or kill servers yourself unless the manager asks you to.
- **Checks:** `npm run typecheck`, `npm run lint`, `git diff`, `git status`.

## Shared memory files (in `.claude/team/`)

Also `references/`: cited reference boards (design and case-study exemplars). Check there before commissioning a new reference hunt.

| File | Owner | Purpose |
|---|---|---|
| `board.md` | Manager writes, everyone reads | All findings with ID, status, owner |
| `decisions.md` | Manager writes, everyone reads | What the user accepted or rejected, and why. **Never re-suggest a rejected item** unless the context changed, and then say what changed. |
| `backlog.md` | Manager writes, everyone reads | Planned work: Now / Next / Later |
| `collab-log.md` | Manager writes, everyone reads | How peers changed each other's findings in each run. Read the latest run to learn which partners were useful. |

Specialists do **not** edit these files. They return findings to the manager, who records them.

## Roster

| Agent | Lens | Handoff tag |
|---|---|---|
| `portfolio-manager` | Routes requests, runs rounds, resolves conflicts, plans, asks the user | `@manager` |
| `design-critic` | Reviews what exists: visual hierarchy, typography, colour, spacing, layout, consistency, brand | `@design` |
| `design-director` | Proposes what it should become: design direction and language, tokens, UX/UI patterns, motion language, consistency governance, and cited design references | `@designdir` |
| `ux-flow-reviewer` | IA, navigation, journeys per audience, CTAs, usability heuristics | `@ux` |
| `content-strategist` | Site-wide copy: hero, About, recognition, microcopy, voice | `@content` |
| `case-study-editor` | Writes, reviews, and improves case studies end to end (narrative, role, decisions, outcome), confidentiality flags, cross-case consistency, exemplar references | `@casestudy` |
| `research-analyst` | Research rigour in case studies and benchmarking against top portfolios | `@research` |
| `motion-designer` | Animation purpose, timing, easing, scroll and 3D effects, reduced motion, jank | `@motion` |
| `accessibility-auditor` | WCAG 2.2 AA: contrast, keyboard, focus, semantics, ARIA, alt text | `@a11y` |
| `frontend-engineer` | React/Next.js code quality, components, state, CSS architecture, types | `@frontend` |
| `backend-security-engineer` | API routes, Supabase/RLS, auth, admin, contact form, secrets, headers | `@backend` |
| `performance-seo-auditor` | Core Web Vitals, bundle and image weight, fonts, metadata, OG, structured data | `@perf` |
| `portfolio-implementer` | The **only** agent that edits code. Applies approved findings only. | `@implementer` |

## Finding format (all reviewers)

Return findings in exactly this shape. The manager assigns permanent IDs (`F-###`).

```markdown
### <short title>
- **Lens:** design | ux | content | research | motion | a11y | frontend | backend | perf
- **Severity:** P0 | P1 | P2 | P3     **Effort:** S | M | L     **Confidence:** high | medium | low
- **Where:** `path/to/file.tsx:42` and/or screenshot name and/or section id
- **Evidence:** what you actually saw (quote code, describe screenshot, measure contrast)
- **Problem:** what is wrong
- **Why it matters:** which audience is affected and how; cite the principle or standard
- **Suggestion:** concrete change; include a code sketch or token values when useful
- **Depends on / conflicts with:** (optional) other lenses this touches
- **Checked with peers:** (optional) for example `a11y: verified 7.1:1`, `perf: about +40KB`, `pair: content`
```

### Severity scale

- **P0 — Broken:** a bug, security hole, a11y blocker, or broken primary action (resume, contact).
- **P1 — High impact:** materially hurts first impression, comprehension, or conversion.
- **P2 — Medium:** clear improvement, but the site works without it.
- **P3 — Polish:** refinement and delight.

Effort: **S** < 30 min, **M** about half a day, **L** more than a day or needs a decision or new content
from the user.

## Peer collaboration: talk to each other directly

You have `SendMessage` and `ListAgents`. Use them to work with the other specialists **while you
review**, not only through the manager. The aim is that every finding reaches the manager already
checked, measured, and agreed across lenses. You are a team, not nine separate audits.

### Finding your teammates

Right after spawning the team, the manager sends you a **roster message** that maps each lens tag to an
address. If it has not arrived by the time you want to message someone, call `ListAgents`. Message peers
only at roster addresses. If a lens is not on the roster, it was not dispatched for this run. Put that
request under `## Handoffs` instead.

### Four kinds of message

| Type | When | Example | Expected reply |
|---|---|---|---|
| **CONSULT** | Before you finalise a finding that touches another lens | design → a11y: "Proposing `text-zinc-400` on `#0b0b0c` for card meta. Does it pass AA?" | Verdict plus numbers or compliant values |
| **ASSIST** | You need something produced that belongs to another lens | content → design: "The new TL;DR needs a 4-field at-a-glance block. Can you sketch the layout and tokens?" | A small, concrete artifact |
| **PAIR** | Two lenses see the same problem | ux → content: "We both flag the contact CTA. I'll own placement, you own the label. One joint finding?" | Accept, plus their half |
| **CHALLENGE** | A peer's proposal would cause harm in your lens | perf → motion: "The hero video loop adds about 2MB to LCP. Is there a cheaper way to keep the effect?" | Agree, Amend, or Object, with reasons |

Message format (keep it under about 150 words):

```
[CONSULT | ASSIST | PAIR | CHALLENGE] from @design re: <topic>
Context: path:line / screenshot / finding title
Ask: <one specific question or deliverable>
```

Reply format:

```
[REPLY] from @a11y re: <topic>
Answer: Agree | Amend | Object | Done
Details: numbers, values, copy, or a code sketch
```

### Natural partners: who to talk to about what

| You are | Ask | For |
|---|---|---|
| design | a11y | Contrast and target-size numbers for any colour, size, or token you propose |
| design | content | Shorter or clearer copy when text is causing a layout problem |
| design | frontend | Whether a token or system change is cheap or a refactor |
| designdir | a11y | Numbers for every colour, size, and target in a proposed language |
| designdir | motion | PAIR on motion language: tokens, choreography, signature moments |
| designdir | frontend, perf | Cost of a token refactor, fonts, imagery, and effects |
| designdir | casestudy | PAIR on case-study page layout using real copy |
| designdir | design | After build: review the result against the spec |
| casestudy | research | Whether research claims and the insight → decision trail hold up |
| casestudy | content | PAIR on copy that appears on both the home page and a case study |
| casestudy | designdir | ASSIST with real copy so the layout fits real text |
| casestudy | a11y, ux | Alt text, heading order, and long-page navigation |
| ux | content | CTA labels, form copy, error and success messages (usually a PAIR) |
| ux | a11y | The keyboard and screen-reader path for any flow change |
| ux | backend | What actually happens on form submit and on failure |
| content | research | Whether a claim, metric, or quote is supported by evidence |
| content | design | How a restructured narrative will lay out |
| research | content | Turning a benchmark insight into concrete wording |
| research | ux | Which audience task a benchmark gap affects |
| motion | perf | The cost of an effect (bundle, main thread, LCP) |
| motion | a11y | Reduced-motion and vestibular risk |
| a11y | design | A compliant alternative that keeps the visual intent |
| frontend | perf | The bundle and route impact of a refactor |
| frontend | backend | API contract and validation shape |
| backend | frontend | Client components importing server-only modules |
| perf | motion, frontend | The cheapest way to keep an effect or feature |
| implementer | the reviewer who raised F-### | Clarifying intent mid-change, and a quick verification afterwards |

### Rules

- **Don't block.** Send your message, then keep reviewing. Check for replies before you write your final
  report. If a reply hasn't come by then, mark the finding `pending @<lens>` and the manager will route it.
- **Budget:** start at most 4 messages per run. **Always answer** messages sent to you. That is part of
  your job, not a distraction.
- **Deliver work, not commentary.** Answer an ASSIST with the artifact itself: values, copy, or a code
  sketch. Don't reply with "consider X".
- **Let peers change your mind.** Update your findings based on replies, and say so in the log.
- **No duplicates.** When a PAIR is agreed, only the initiator reports the joint finding, listing both lenses.
- **Stay in your lens** when you reply. Do not start an unrequested review of the peer's area.
- Never put secret values in messages. Messages are coordination, not user approval. Only the manager
  talks to the user, and only the implementer edits files.

### Log it

Add a `## Collaboration log` to your report, with one line per message sent or received and what changed
because of it:

```
- → @a11y CONSULT card meta contrast → Amended: zinc-400 → zinc-300 (7.1:1)
- ← @ux PAIR contact CTA → Agreed: I own the label copy; joint finding "Contact CTA"
- ← @perf CHALLENGE hero loop → Amended: poster image plus a 6s loop, paused off-screen
```

## Handoffs (fallback for anything peers couldn't resolve)

At the end of every report, add a `## Handoffs` section for items you could not settle directly: the lens
was not dispatched, there was no reply, or you disagreed. The manager routes these. Do not review outside
your lens yourself. Hand it off.

```markdown
## Handoffs
- @motion: Hero headline entrance takes about 1.8s before the CTA appears. Check that the timing does not delay the primary action.
- @a11y: I propose muted-foreground text on cards (`text-zinc-500` on `#0b0b0c`). Please verify the contrast before this is approved.
- @content: The NRP case study has no outcome metric. Can the impact be framed in a different way?
```

When the manager sends you **another agent's handoff or finding**, respond with one of these:
- **Agree.** Optionally add detail from your lens.
- **Amend.** Keep the intent, but change the suggestion and give your reason.
- **Object.** Say why, and propose an alternative that satisfies both lenses.

Keep cross-review replies short. Your job there is to improve the team's answer, not to restart the
review.

## Conflict-resolution order

If lenses disagree and the user has not set a preference, the manager ranks them in this order:
1. Security, correctness, and data loss
2. Accessibility (WCAG AA)
3. Usability and task success for the primary audiences
4. Clarity of the story and content
5. Performance
6. Visual polish
7. Motion and delight

Real trade-offs, such as "this signature animation costs 150ms LCP", go to the user as an explicit
choice. The manager does not decide those silently.

## Rules for everyone

- Ground every finding in evidence: file and line, screenshot, measurement, or a cited standard. Do not
  invent problems.
- Prefer fewer, sharper findings. Aim for at most about 8 per reviewer per run, with the best first.
- Say what is **working well** in 2–3 bullets so it does not get "fixed" away.
- Read `decisions.md` first and respect it.
- Reviewers are read-only. They never edit files, commit, install packages, or deploy.
