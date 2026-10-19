# NRP case study page — UX plan

Source: `NRP_Design_Case_Study.md` (from the AAP Confluence space). Logged as S1 in [NRP-CONTEXT.md](NRP-CONTEXT.md).

## 1. Who reads this and what they need

| Reader | Time | Needs | Page must give |
|--------|------|-------|----------------|
| Recruiter | 30–60 s | Scope, seniority, credibility | Hero + metadata strip + 3 stat cards in the first screen |
| Hiring manager / design lead | 5–10 min | Judgement, rigour, collaboration | Problem, constraints, 4–7 decisions with rationale, validation, honest limits |
| Design peer | Deep read | Craft | Journeys, wireframes, final screens in a zoomable gallery |

## 2. Story arc (19 source sections → 14 page sections)

Setup → Problem → Approach → Evidence → Solution → Proof → Reflection.

| # | Page section | Merges source § | Layout |
|---|--------------|-----------------|--------|
| 1 | Overview | Hero, 1 | Hero image, metadata strip, 3 stat cards |
| 2 | Context and problem | 2, 3, 8 | Problem statement + 4 challenge cards + constraint chips |
| 3 | Goals | 4 | Goal / success-criteria table |
| 4 | Role and process | 5 | Role text slot + 7-step stepper + process diagram |
| 5 | Users | 6 | 6 role cards, persona slots, learning-path map |
| 6 | Research | 7 | Rule insight cards, research and competitive slots |
| 7 | Journeys and structure | 9, 10 | Journey gallery, sitemap, sketches, mock-ups |
| 8 | Key decisions | 11 | Alternating rows, one image slot each |
| 9 | Final design | 12 | Tabbed gallery (7 areas) with lightbox, prototype button |
| 10 | Visual design | 13 | Style guide + before/after |
| 11 | Validation | 14 | Feedback → change cards |
| 12 | Evolution | 15 | Expandable timeline (4 cards) |
| 13 | Outcomes | 16 | Stat cards, MVP scope, quote slot |
| 14 | Reflection and next | 17–19 | Reflection, roadmap chips, credits |

## 3. Interaction and layout decisions

- **Skim first:** every section opens with a one-line takeaway; detail sits below it.
- **Sticky TOC + progress bar** on wide screens (reuses the Adapt pattern).
- **Gallery with lightbox:** screenshots are small on the page, zoomable on click, keyboard accessible (arrows, Esc).
- **Tabs for final design:** seven product areas would otherwise be a long scroll. Tabs follow the ARIA tab pattern.
- **Timeline cards are expandable** and the first is open by default, so nothing is hidden from a skimmer.
- **Honesty over polish:** research is shown as workshops and demo feedback, personas as proto-personas. No invented metrics.

## 4. Where you add things (drop-in slots)

Every image slot has an ID. Save a file as `public/case-studies/nrp/<slot-id>.<png|jpg|webp|svg>` and it appears with no code change.

- Multiple images for one slot: `<slot-id>-1`, `<slot-id>-2`, `<slot-id>-3`.
- Empty slots show as dashed "ADD" boxes in dev only. In production, empty slots and empty tabs are hidden, so the live page never shows placeholders.
- Set `NEXT_PUBLIC_SHOW_PLACEHOLDERS=1` to show them in a production build.
- Text, stat and link slots live in `src/content/case-studies/nrp-pediaskills.ts`. Values left empty render as dev-only prompts.
- Full slot list with source tool and location: see the asset checklist in [NRP-CONTEXT.md](NRP-CONTEXT.md).

## 5. Accessibility

Heading order, landmark per section, alt text from slot labels, tabs with arrow-key support, `aria-expanded` on timeline cards, focus-visible rings, reduced-motion respected (no new motion added), contrast from existing tokens.

## 6. Risks to resolve before publishing

1. Confidentiality: AAP/Laerdal sign-off on screenshots, names, the Heap figure.
2. Conflicts with the older draft (see context file): role, timeline start, "replaced a third-party LMS", WCAG claim.
3. Home-page card text for NRP still uses the older draft's claims.
