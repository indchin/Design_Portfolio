# Portfolio Backlog

Maintained by `portfolio-manager`. Items link to board findings (`F-###`) when they come from a review,
or to a plan when they are new work.

## Now
- **NRP batches 1+2 (in progress):** safe code (F-046, F-052, F-054, F-055, F-056, F-062) and confidentiality (F-053).
- **NRP batches 3+4 (after 1+2, same file):** structure and copy skeleton (F-047 to F-051, F-061; F-060 reflection waits for your own words) and design polish (F-057, F-058, F-059).

## Next
- **Security batch** (F-002, F-003, F-004, F-007, F-026, F-027): shared `requireAdmin()`, fail-closed allowlist, upload limits, redirect fix, RLS tightening. Agents: backend, implementer. Needs: which host (Vercel or Netlify), and Supabase signups disabled.
- **Conversion path** (F-001, F-006, F-008, F-009): working contact form, real Calendly or "Contact" button, mobile menu with resume, remove admin from public nav. Agents: ux, backend, a11y.
- **Quick wins** (F-010, F-017, F-020, F-023, F-028, F-030, F-034, F-038, F-039): small, independent, low risk.
- **A11y dialogs** (F-005, F-031, F-035): one shared accessible Dialog primitive.
- **Hero** (F-013): name H1, role and location line, proof lede.
- **Research honesty pass** (F-014, F-016): reconcile Adapt counts and impact wording.

## NRP case study (run 2, awaiting user choice)
- **Safe code-only batch:** F-046 (gate scaffolding, hide empty sections, noindex until content exists), F-054, F-055, F-052, F-056, F-062. Agents: implementer, a11y, ux.
- **Copy and structure batch (needs the user's facts):** F-047, F-048, F-049, F-050, F-051, F-060, F-061. Agents: case-study-editor, research, designdir.
- **Design polish batch:** F-057, F-058, F-059. Agents: designdir, design, a11y.
- **Confidentiality and consistency:** F-053 with F-015, F-016, F-041.
- **Later ideas:** a 3-5 person design-leader read-through of the NRP page; instrument scroll depth to Outcomes, resume and contact clicks (F-040); targeted hunt for a named design-leader healthcare or learning case study (reference gap).

## Later
- F-021, F-022, F-042: block architecture cleanup (server BlockList, real schemas, one source of truth). Needs a production build for before/after bundle numbers.
- F-024, F-025: case-study at-a-glance and next/prev; work grid and cover system.
- F-029, F-036, F-018, F-044: headers, SEO, share card, fonts.
- F-032, F-033, F-037, F-040, F-041: motion tokens, type scale, copy, analytics, persona provenance.
- F-045: Adapt Studio / AI authoring case study.

## Waiting on the user
- **NRP facts:** exact title and dates, I-versus-we, team size, options and owner per lead decision, post-launch data, live status, reflections, redacted screens, and clearance for AAP, Heap 43,000, vendor names and roadmap items (F-047 to F-053).
- **ShopCPR:** write it up (needs an outcome and 2 screens), demote it, or unfeature it (F-011).
- **Placeholders:** approved, redacted screens for NRP and Voice (F-012).
- **Consent and confidentiality:** participant names and recordings, AAP and WHO naming, vendor pricing, Figma links (F-015).
- **Facts:** real Calendly URL, one hard metric per study, current Adapt Studio status, which quotes are verbatim, real n from Dovetail, title and dates vs resume and LinkedIn (F-006, F-014, F-016).
- **Light theme:** keep or drop (F-019).
- **Deploy target:** Vercel or Netlify, and whether `NEXT_PUBLIC_SITE_URL` is set in production.
- **Production build:** approval to run `npm run build` for real bundle numbers.
