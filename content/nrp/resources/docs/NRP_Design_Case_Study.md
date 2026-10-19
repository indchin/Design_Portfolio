---
type: design-case-study-draft
project: NRP Learning Platform -> PediaSkills (AAP Neonatal Resuscitation Program)
source: AAP NRP Confluence space (laerdal.atlassian.net/wiki/spaces/AAP)
instructions-for-claude: Use this as the structured source to build a design case study web page. Each H2 = one page section; "Web block" lines give layout intent; blockquotes starting [ADD ...] are placeholders for screenshots/links/stats the user will supply; [CONFIRM] = unverified inference. Do not invent metrics. Confidential - check Laerdal/AAP approval before publishing.
---

**DESIGN CASE STUDY**

# NRP Learning Platform → PediaSkills

Designing a single learning, certification and instructor platform for the American Academy of Pediatrics Neonatal Resuscitation Program (2020–2026)

*How to use this document: each section maps to a section of the case study web page. Black text is drawn from the AAP NRP Confluence space. Orange dashed boxes mark where you add screenshots, Figma/XD links, quotes or metrics. Items marked [CONFIRM] are my inferences and need your check. Remove the italic guidance and "Web block" lines before publishing.*

|                      |                                                                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Client / product** | American Academy of Pediatrics (AAP) – Neonatal Resuscitation Program (NRP) learning platform, delivered by Laerdal with RQI Partners / HealthStream context |
| **My role**          | [ADD: your exact title and scope, e.g. UX/UI designer]                                                                                                     |
| **Team**             | Product/BA, UX and visual design, front-end, back-end, QA, AAP and RQI stakeholders [CONFIRM names/roles to show]                                          |
| **Timeline**         | 2020 concept → 2021 MVP → 2024 9th-edition migration → 2026 PediaSkills rebrand [CONFIRM your involvement per phase]                                       |
| **Platforms**        | Web (desktop-first; mobile visuals were work-in-progress)                                                                                                    |
| **Tools**            | Adobe XD (2020–21 flows and visuals), Figma (2024+ specs), Confluence, Jira                                                                                  |
| **Deliverables**     | User journeys, mock-ups, visual design, dashboard structure, admin and learner flows, edition-migration specs, rebrand designs                               |

> **[ADD SCREENSHOT] Hero image**
>
> Wide, high-quality screenshot of the learner dashboard (final PediaSkills version if possible). Add 1–2 device frames if you have them.
>
> **Source:** Figma / XD dashboard file

**Web block:** Hero: title, one-line summary, hero image, metadata strip (role, timeline, tools).

## 1. Overview

The NRP is the standard training programme for neonatal resuscitation in the US. The platform had to take learners from sign-up to certified provider, let instructors run events and mentor candidates, and give AAP administrators control of catalogue, orders, notifications and reports, all in one place.

Over six years the product grew from an MVP (identity, curriculum enrolment, instructor-led events, eCommerce, certificates) to a multi-programme platform supporting new course editions, NICU and PEPP programmes, and a rebrand to PediaSkills.

> **[ADD STAT / QUOTE] Headline outcome**
>
> Add 2–3 headline results (e.g. adoption, completion, support-ticket reduction). Known figure: about 43,000 users log in monthly (Heap, June 2026). Add your own before/after numbers if available.

**Web block:** Summary block with 3 stat cards.

## 2. Background and context

Before this platform, NRP learning, instructor management and certification ran across separate systems, with active instructors held in HealthStream [CONFIRM]. The programme brief called for one platform with a global NRP identity (Global ID), integrated adaptive learning (Rhapsode), an exam engine, feedback surveys, eCards and certificates.

The work was shaped by close collaboration between AAP, Laerdal, RQI Partners and HealthStream, tracked in weekly status reports and requirements workshops from September 2020.

> **[ADD LINK] Project initiation / proposal documents**
>
> Optional: link or screenshot of the high-level proposal slide (only if shareable externally).
>
> **Source:** Confluence: High-level Requirements

## 3. The problem

Neonatal resuscitation certification has strict rules, many roles and long, multi-step journeys. The design had to make that complexity feel simple and safe to users who are often busy clinicians.

  - **Many roles, one product:** guests, learners, Essentials and Advanced Providers, Instructor Candidates, Instructors, Instructor Mentors, AAP admins and eCommerce admins, each with different journeys.

  - **Rule-heavy learning paths:** curriculum steps locked in sequence, time windows (30 days to start an Instructor Candidate bundle after approval; 120 days between online Part 1 and the instructor-led event), and eCard expiry/renewal logic.

  - **Blended learning:** online courses and exams combined with instructor-led events (ILEs) that need rosters, grading and mentor ratios.

  - **Identity and migration:** one Global ID per person, existing instructors imported from HealthStream, and later migrations between course editions.

**Problem statement (draft):** How might we let clinicians and instructors complete a multi-step, rule-bound certification journey without needing to understand the rules, while giving admins control and visibility? [CONFIRM / rewrite in your voice]

**Web block:** Two-column: problem statement + 3–4 challenge cards.

## 4. Goals and success criteria

|                       |                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------- |
| **Goal**              | **What success looked like**                                                                            |
| Unified experience    | Registration, learning, certificates, events and orders in one account with a Global ID                 |
| Clear progression     | Learners always know the next step in their curriculum and rank                                         |
| Instructor enablement | Candidates, instructors and mentors can find events, co-teach and renew without manual back-office help |
| Admin control         | Catalogue, pricing, notifications, bulk purchase and reports manageable by AAP admins                   |
| Scale and brand       | Support new editions and programmes (NICU, PEPP) and the PediaSkills brand without rebuilds             |

*Add your own measurable targets here if they exist (e.g. task completion, drop-off in registration).*

## 5. My role and process

[ADD 3–5 sentences: what you owned (e.g. user journeys, mock-ups, visual design, design QA), who you worked with, and how you ran reviews with AAP.]

Process followed, as seen in the design records: requirements workshops → user journeys → mock-ups (Adobe XD) → visual design → presentation to NRP/AAP → approval → iteration after demo feedback → handoff via Jira epics.

> **[ADD SCREENSHOT] Process diagram**
>
> A simple diagram or photo of your workflow (workshop, whiteboard, journey map).
>
> **Source:** Your files

**Web block:** Timeline or horizontal stepper.

## 6. Users

The Confluence role model defines a progression ladder and two admin groups. Use it to build personas; the persona pages themselves are empty, so the details below need your input.

|                                            |                                                                 |                                                                 |
| ------------------------------------------ | --------------------------------------------------------------- | --------------------------------------------------------------- |
| **Role**                                   | **Primary need (inferred) [CONFIRM]**                         | **Key journeys**                                                |
| Guest / First-time user                    | Understand the courses and register quickly                     | Non-logged-in flow, registration and Global ID, forgot password |
| Learner → Provider (Essentials / Advanced) | Complete the online part, book an ILE, get an eCard             | Learner to Provider, My Learnings and Certificates              |
| Instructor Candidate → Instructor          | Complete the IC bundle and co-teach events                      | Instructor Candidate to Instructor, Instructor application      |
| Instructor / Instructor Mentor             | Create and run events, grade, mentor candidates, renew          | Add and Manage Events, Renewal, Mentor flows                    |
| AAP admin / eCom admin                     | Manage applications, catalogue, pricing, notifications, reports | Admin login and multiple roles, Manage Applications             |
| Org admin / L2 support                     | Assign licences, bulk purchase, resolve account issues          | License management, bulk purchase, L2 support portal            |

> **[ADD SCREENSHOT] Persona cards (1–3)**
>
> Add persona illustrations: name, role, goals, frustrations, quote. Use real research if available; otherwise label as proto-personas.
>
> **Source:** Your research

> **[ADD SCREENSHOT] Learning paths map**
>
> Screenshot of the learner journey across courses and ranks.
>
> **Source:** Figma: NRP SYSTEM FLOWS (Confluence: Learning Paths in NRP Platform)

**Web block:** Persona cards in a 3-up grid, then the learning-path image full-width.

## 7. Research and discovery

Discovery was driven by stakeholder requirements workshops and demo reviews rather than documented user interviews. State this plainly and add any research you ran.

### 7.1 Stakeholder requirements workshops

A March 2021 session with AAP, Laerdal and RQI stakeholders confirmed business rules that directly shaped the UX. Examples:

  - Starting (launching) an Instructor Candidate bundle within 30 days of application approval triggers the rank change; no auto-start, so learners stay in control.

  - Provider learners have 120 days between finishing the online part and completing the instructor-led event; reminders must nudge them.

  - Course activities unlock in order: instructor course → adaptive course → exams → survey → co-teach events.

  - Failed exams show the questions missed and where to read, but never the correct answers; passed exams reveal nothing about misses.

  - Instructor-to-mentor ratio of 1:1, so only events with mentors registered are listed for candidates.

### 7.2 Competitive / reference review

[ADD if done: comparable learning, certification or eCommerce platforms you reviewed and what you learned.]

### 7.3 Your research

> **[ADD STAT / QUOTE] Research findings / quotes**
>
> Add interview, survey, support-ticket or analytics findings. If none, remove this block and keep 7.1.

> **[ADD SCREENSHOT] Workshop / requirements artefacts**
>
> Photo or screenshot of the requirements table, affinity map or notes (strip names).
>
> **Source:** Confluence: NRP AAP Requirements gathering

**Web block:** Insight cards (one rule/insight each) with an icon; quote carousel if you have quotes.

## 8. Constraints

  - **Regulatory and programme rules:** certification, CE credits and eCard expiry logic set by AAP.

  - **Integrations:** Rhapsode adaptive courses, exam engine, feedback service, HealthStream data import.

  - **MVP scope:** US-only (USD pricing, US tax and phone format), desktop-first; role management initially without UI.

  - **Multi-stakeholder approval:** designs were presented to NRP and sent for approval at each stage.

**Web block:** Compact list or chips.

## 9. Information architecture and user journeys

Journeys were designed per role, then stitched into a dashboard structure. About a dozen journeys were produced for learners and admins, including non-logged-in, learner to provider, instructor candidate to instructor, instructor renewal, instructor to mentor, ILE management, reports, exams, My Account and My Learnings and Certificates.

> **[ADD SCREENSHOT] User journey map – Learner to Provider**
>
> Export the journey (PDF/PNG). Show start, key steps, decisions and pain points.
>
> **Source:** Confluence: Learner to Provider - UJ (XD link and PDF attachment)

> **[ADD SCREENSHOT] User journey map – Instructor Candidate to Instructor**
>
> Export the journey, highlighting the 30-day and co-teach steps.
>
> **Source:** Confluence: Instructor Candidate to Instructor - UJ

> **[ADD SCREENSHOT] Site map / dashboard structure**
>
> Add the End User Dashboard structure and any sitemap.
>
> **Source:** Confluence: End User Dashboard Design Structure

> **[ADD LINK] Journey prototype / PDF**
>
> Paste the XD or PDF link for each journey you want visitors to open.
>
> **Source:** Confluence UJ pages

**Web block:** Image gallery with captions; tabs per journey.

## 10. Ideation and wireframes

[ADD 2–4 sentences on the options you explored, e.g. dashboard layouts, how to show curriculum progress and locked steps, how instructors browse and register for events.]

> **[ADD SCREENSHOT] Early sketches / low-fidelity wireframes**
>
> Add 2–4 images showing exploration and rejected options.
>
> **Source:** Your files / XD

> **[ADD SCREENSHOT] Mid-fidelity mock-ups**
>
> Add the mock-up flows: Learner to Provider enrolled flow, registration and Global ID workflow, My Account.
>
> **Source:** XD: Learner to Provider - MU/VD; Global ID Workflow &amp; User Registration

**Web block:** Before/after slider or 2-up image row.

## 11. Key design decisions

Choose the 4–6 decisions that best show your thinking. This starter set is drawn from the records; add your rationale and alternatives.

|                                              |                                                                                                                          |                                  |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| **Decision**                                 | **What and why (from the records)**                                                                                      | **Add: alternatives / evidence** |
| Learner stays in control of starting courses | No auto-start of bundles after purchase, because a running 30-day timer without the learner's control was not acceptable | [ADD]                          |
| Locked, ordered curriculum                   | Each activity unlocks when the previous is complete, so learners follow the required sequence                            | [ADD]                          |
| Exam feedback without answers                | Fail: show missed questions plus where to read; pass: no breakdown. Supports learning without leaking answers            | [ADD]                          |
| Time-limit nudges                            | Reminders during the 120-day window between Part 1 and the ILE                                                           | [ADD]                          |
| Banner success messages                      | Replace section-level success messages with a banner so users do not need to scroll to see confirmation (demo feedback)  | [ADD]                          |
| Smart defaults in My Account                 | Time zone derived from the address given at registration but editable; US phone format; names not truncated in view mode | [ADD]                          |
| Reversible consent                           | Add a "Disagree" option to the registration T\&C popup (demo feedback)                                                   | [ADD]                          |

**Web block:** Accordion or alternating image/text rows, one per decision.

## 12. Final design

Show the finished experience by area. Use annotated screenshots and short captions on what each does for the user.

> **[ADD SCREENSHOT] Registration, Global ID and login**
>
> Add 1–3 screenshots and a one-line caption.
>
> **Source:** XD: Global ID Workflow &amp; User Registration; Forgot Password and User Name

> **[ADD SCREENSHOT] Learner dashboard and My Learnings**
>
> Add 1–3 screenshots and a one-line caption.
>
> **Source:** XD: End User Dashboard; My Learnings &amp; My Certificates

> **[ADD SCREENSHOT] Catalogue, purchase and licence management**
>
> Add 1–3 screenshots and a one-line caption.
>
> **Source:** Figma / XD: eCommerce, License management

> **[ADD SCREENSHOT] Instructor: add and manage events, rosters, grading**
>
> Add 1–3 screenshots and a one-line caption.
>
> **Source:** XD: Instructor - Add &amp; Manage Events

> **[ADD SCREENSHOT] Admin: manage applications, bulk purchase, add licences, delete unregistered users**
>
> Add 1–3 screenshots and a one-line caption.
>
> **Source:** Confluence 2024 Figma specs

> **[ADD SCREENSHOT] Certificates and eCards**
>
> Add 1–3 screenshots and a one-line caption.
>
> **Source:** XD: Certificate templates

> **[ADD SCREENSHOT] Mobile (if designed)**
>
> Add 1–3 screenshots and a one-line caption.
>
> **Source:** Mobile visuals were WIP in the records – add only if completed

> **[ADD LINK] Interactive prototype**
>
> Link a clickable prototype (Figma/XD) if you are allowed to share it publicly.

**Web block:** Tabbed gallery by area with lightbox; prototype button.

## 13. Visual design and design system

Visual design was produced in Adobe XD after mock-up approval, then evolved in 2026 with updated AAP identity, course-level logos and theme colours, and a global blue header. [ADD: type, colour, component and grid decisions; link or screenshot of the component library if one exists.]

> **[ADD SCREENSHOT] Style guide / components**
>
> Colours, typography, buttons, cards, form fields, states.
>
> **Source:** Design system file

> **[ADD SCREENSHOT] Before vs after visual language**
>
> Side-by-side of the 2021 visual design and the 2026 PediaSkills look.
>
> **Source:** XD (2021) vs Figma (2026)

**Web block:** Palette swatches + type specimens; before/after slider.

## 14. Validation and iteration

Designs were presented at demos and reviewed by stakeholders. The May 2021 demo feedback led to concrete changes, such as:

  - Add a "Disagree" option on the T\&C popup during registration.

  - Stop truncating names in My Account view mode.

  - Derive time zone from the registration address, still editable.

  - Use a banner success message to avoid scrolling to confirmations.

  - Validate the resend-email timer on the server as well as in the UI, and rethink the change-password rules.

> **[ADD STAT / QUOTE] Usability testing**
>
> If you ran usability tests, add method, participants, key issues found and fixes made. Otherwise state that validation was via stakeholder demos.

> **[ADD SCREENSHOT] Feedback → change**
>
> Pair one feedback item with the before and after screen.
>
> **Source:** Confluence: Demo Feedback

**Web block:** Feedback-to-change cards with before/after images.

## 15. Evolution: keeping the platform current

### 15.1 8th to 9th edition migration (2024)

When NRP moved from the 8th to the 9th edition, learners needed to understand the change without losing credit. The designs added a dashboard popup announcing the course version update, a popup on License Management announcing the licence version update, and access for learners with an active 8th-edition eCard to review 9th-edition content.

> **[ADD SCREENSHOT] Version update popups and review access**
>
> Dashboard popup, licence popup, review-content state.
>
> **Source:** Figma: 8th to 9th Edition requirements

### 15.2 New admin capabilities (2024–25)

Specs for adding licences or products to learner and distributor accounts (with transaction history), deleting unregistered users (partial registrations), bulk purchase with refunds, and an assignment change log for org admins.

> **[ADD SCREENSHOT] Admin flows**
>
> Add licence flow, delete unregistered users, bulk purchase.
>
> **Source:** Figma specs (Confluence pages)

### 15.3 PediaSkills rebrand (2026)

The platform moved from NRP Learning Platform to PediaSkills with updated AAP identity, course-level logos and theme colours across Catalog, Bulk Purchase, Dashboard, My Learnings, Licence Management, Instructor Toolkit and notifications. Product ordering was defined (NRP, PEPP, NICU, NEPP, Cardiac, with international products last). Certificates and eCards keep their existing templates. The domain moves to pediaskills.com.

> **[ADD SCREENSHOT] Before / after rebrand**
>
> Login, dashboard, catalogue and notification email, old vs new.
>
> **Source:** Figma / design files

### 15.4 In-product help chatbot (2026, exploration)

A phased chatbot: Phase 1 answers questions from the help centre; Phase 2 lets admins and retail users create Salesforce cases; Phase 3 prompts for a screenshot and system logs. The current record covers architecture and cost only, so add the UX (entry point, conversation design, escalation) if you designed it.

> **[ADD SCREENSHOT] Chatbot UI concept**
>
> Entry point, conversation states, escalation to case creation.
>
> **Source:** Your designs (not yet in Confluence)

**Web block:** Timeline with four expandable cards.

## 16. Outcomes and impact

Delivered scope at MVP: identity management, curriculum enrolment, course launch with Rhapsode and exam integrations, eCards and certificates, instructor import and ILE management, account management, eCommerce and admin, notifications and basic reports. The platform has since expanded to multiple programmes and editions, with about 43,000 monthly users (Heap, June 2026).

> **[ADD STAT / QUOTE] Metrics**
>
> Add measured results: completion rates, registration conversion, support-ticket volume, time to complete a task, NPS/CSAT. Mark each with source and period. Remove anything you cannot back up.

> **[ADD STAT / QUOTE] Stakeholder quote**
>
> Optional: a short quote from AAP, product or a user.

**Web block:** Stat cards plus quote.

## 17. Learnings and reflection

[ADD 3–4 reflections in your voice. Prompts based on the records: designing for rule-heavy journeys, balancing learner control against compliance deadlines, keeping a design system consistent across editions and programmes, managing approvals across many stakeholders, what you would test or measure earlier.]

## 18. Next steps

[ADD: roadmap items you can share. From the records: PEPP first release, further programmes (NICU, NEPP), e-ALS/e-BLS eLearning, chatbot phases 2 and 3.]

## 19. Credits

[ADD: collaborators and roles you are allowed to name. The Confluence pages list several designers and BAs; check permission before publishing names.]

## Appendix A. Asset checklist

Everything referenced in the Confluence space, with where to export from. Check each item for confidentiality before publishing.

|                                                  |                 |                                                               |
| ------------------------------------------------ | --------------- | ------------------------------------------------------------- |
| **Asset**                                        | **Tool**        | **Where to find it**                                          |
| Learner to Provider journey (PDF + XD)           | Adobe XD        | Confluence: Learner to Provider - UJ (attachment)             |
| All other user journeys (End Users, Admin Users) | Adobe XD        | Confluence: End Users - UJ, Admin Users - UJ                  |
| Learning paths map                               | Figma           | Confluence: Learning Paths in NRP Platform (NRP SYSTEM FLOWS) |
| Learner to Provider mock-up and visual design    | Adobe XD        | Confluence: Learner to Provider - MU/VD                       |
| Registration and Global ID workflow              | Adobe XD        | Confluence: Global ID Workflow & User Registration            |
| End user dashboard (desktop; mobile WIP)         | Adobe XD        | Confluence: End User Dashboard Design Structure               |
| 8th to 9th edition migration                     | Figma + XD      | Confluence: 8th to 9th Edition Migration requirements         |
| Add licences to learner/distributor accounts     | Figma           | Confluence: Ability to add licenses/products…                 |
| Delete unregistered users                        | Figma           | Confluence: Ability to delete unregistered Users              |
| PediaSkills rebrand designs                      | Figma (confirm) | Branding Enhancements Summary / your files                    |
| Chatbot UI                                       | [ADD]         | Not in Confluence                                             |

## Appendix B. Web page build notes

|                                |                                         |                                   |
| ------------------------------ | --------------------------------------- | --------------------------------- |
| **Section**                    | **Suggested layout**                    | **Assets needed**                 |
| Hero                           | Full-width image, title, metadata strip | 1 hero image                      |
| Overview + outcome             | Summary text with 3 stat cards          | 3 metrics                         |
| Problem, goals                 | Two columns; challenge cards            | None                              |
| Users                          | Persona cards, learning-path image      | 3 personas, 1 map                 |
| Research                       | Insight cards, quote carousel           | Workshop artefact, quotes         |
| Journeys, wireframes, mock-ups | Gallery with captions and lightbox      | 6–10 images                       |
| Design decisions               | Accordion or alternating rows           | 1 image per decision              |
| Final design                   | Tabbed gallery, prototype button        | 10–15 screenshots, prototype link |
| Evolution                      | Timeline with expandable cards          | 4–6 images                        |
| Outcomes, learnings            | Stat cards, reflection text             | Metrics, quote                    |

*Sources: AAP NRP Confluence space (laerdal.atlassian.net/wiki/spaces/AAP) – Requirements gathering (Mar 2021), MVP features, Demo Feedback, UJ and MU/VD pages, 8th to 9th Edition Migration requirements, Branding Enhancements Summary, Chatbot Design. Confidential: check Laerdal/AAP approval before publishing.*
