/*
 * NRP Learning Platform → PediaSkills — case study content.
 * Source: content/nrp/NRP_Design_Case_Study.md (AAP Confluence space). See content/nrp/NRP-CONTEXT.md.
 * Do not add metrics that are not backed by a source. Image slots resolve from public/case-studies/nrp/<id>.*
 */

export type Slot = {
  /** File name stem in public/case-studies/nrp/ (add -1, -2, -3 for more images). */
  id: string;
  label: string;
  caption?: string;
  /**
   * Alt text for the image(s). Describe what a viewer should notice (1-2 sentences), do not repeat the caption.
   * Falls back to `label` when absent. Write it once the real asset exists.
   */
  alt?: string;
  /** Where to export it from. Shown in dev placeholders only. */
  source?: string;
  aspect?: string;
  /** Set true when the artifact cannot be shown for client confidentiality: renders a designed "redacted frame". */
  withheld?: boolean;
};

export const nrp = {
  slug: "neonatal-resuscitation-program",
  meta: {
    title: "NRP Learning Platform → PediaSkills",
    tagline:
      "Designing a single learning, certification and instructor platform for the American Academy of Pediatrics Neonatal Resuscitation Program, with design work from the 2020 MVP through the 2026 PediaSkills rebrand.",
    role: "Lead Interaction Designer",
    timeline: "2020 – 2026",
    client: "American Academy of Pediatrics · Laerdal · RQI Partners",
    platform: "Web, desktop-first",
    tools: "Adobe XD, Figma, Confluence, Jira",
    /** One-line problem for the at-a-glance strip (paraphrase of problem.intro). */
    problemLine: "Certifying busy clinicians and instructors through rule-heavy journeys, without making them learn the rules.",
    /** Draft only: ownership claims the author has not confirmed. */
    scopeDraft:
      "Journeys, mock-ups and visual design for learner, instructor and admin roles, MVP through the 2026 PediaSkills rebrand. [NEEDS FROM CHINMAY: confirm scope; what you owned vs the team; team size.]",
    team: "Product/BA, UX and visual design, front-end, back-end, QA, AAP and RQI stakeholders"
  },
  hero: {
    id: "hero",
    label: "Learner dashboard",
    caption: "Learner dashboard, PediaSkills version.",
    source: "Figma / XD dashboard file (final PediaSkills version if possible)",
    aspect: "16/9"
  } satisfies Slot,

  overview: {
    summary: [
      "The NRP is the standard training programme for neonatal resuscitation in the US. The platform had to take learners from sign-up to certified provider, let instructors run events and mentor candidates, and give AAP administrators control of catalogue, orders, notifications and reports, all in one place.",
      "Over six years (2020 to 2026) the product grew from an MVP (identity, curriculum enrolment, instructor-led events, eCommerce, certificates) and the design work then covered new course editions, programme additions and a rebrand to PediaSkills."
    ],
    /** Reach figure (the only metric). Same source and period as before; label corrected, not a measure of effect. */
    reach: {
      value: "~43,000",
      label: "people log in each month (Heap, June 2026)",
      note: "Reach, not effectiveness."
    }
  },

  problem: {
    intro:
      "Neonatal resuscitation certification has strict rules, many roles and long, multi-step journeys. The design had to make that complexity feel simple and safe for users who are often busy clinicians.",
    background:
      "Before this platform, NRP learning, instructor management and certification ran across separate systems, with active instructors held in a legacy instructor-management system. The brief called for one platform with a global NRP identity (Global ID), integrated adaptive learning (Rhapsode), an exam engine, feedback surveys, eCards and certificates. AAP, Laerdal and RQI Partners shaped the work through weekly status reports and requirements workshops from September 2020.",
    statement:
      "How might we let clinicians and instructors complete a multi-step, rule-bound certification journey without needing to understand the rules, while giving admins control and visibility?",
    challenges: [
      {
        title: "Many roles, one product",
        body: "Guests, learners, Essentials and Advanced Providers, Instructor Candidates, Instructors, Instructor Mentors, AAP admins and eCommerce admins, each with different journeys."
      },
      {
        title: "Rule-heavy learning paths",
        body: "Curriculum steps locked in sequence, time windows (30 days to start an Instructor Candidate bundle after approval; 120 days between online Part 1 and the instructor-led event) and eCard expiry and renewal logic."
      },
      {
        title: "Blended learning",
        body: "Online courses and exams combined with instructor-led events (ILEs) that need rosters, grading and mentor ratios."
      },
      {
        title: "Identity and migration",
        body: "One Global ID per person, existing instructors imported from the existing instructor database, and later migrations between course editions."
      }
    ],
    constraints: [
      "Regulatory and programme rules: certification, CE credits and eCard expiry set by AAP",
      "Integrations: Rhapsode adaptive courses, exam engine, feedback service, instructor database import",
      "MVP scope: US-only (USD, US tax and phone format), desktop-first, role management initially without UI",
      "Multi-stakeholder approval: designs presented to NRP and approved at each stage"
    ],
    proposal: {
      id: "initiation-doc",
      label: "Project initiation / proposal",
      caption: "High-level proposal slide.",
      source: "Confluence: High-level Requirements (use only if shareable externally)",
      aspect: "16/9"
    } satisfies Slot
  },

  goals: [
    { goal: "Unified experience", success: "Registration, learning, certificates, events and orders in one account with a Global ID" },
    { goal: "Clear progression", success: "Learners always know the next step in their curriculum and rank" },
    { goal: "Instructor enablement", success: "Candidates, instructors and mentors can find events, co-teach and renew without manual back-office help" },
    { goal: "Admin control", success: "Catalogue, pricing, notifications, bulk purchase and reports manageable by AAP admins" },
    { goal: "Scale and brand", success: "Support new editions and programmes (NICU, PEPP) and the PediaSkills brand without rebuilds" }
  ],

  process: {
    steps: [
      "Requirements workshops",
      "User journeys",
      "Mock-ups (Adobe XD)",
      "Visual design",
      "Presentation to NRP / AAP",
      "Approval, then iteration after demo feedback",
      "Handoff via Jira epics"
    ],
    diagram: {
      id: "process-diagram",
      label: "Process diagram",
      caption: "Workshop, whiteboard or journey-map photo showing how the work ran.",
      source: "Your files",
      aspect: "16/9"
    } satisfies Slot
  },

  users: {
    intro:
      "The role model defines a progression ladder and a back-office group (AAP admin, eCom admin, org admin, L2 support). The role profiles are proto-personas derived from that model, not interview-based personas.",
    roles: [
      {
        role: "Guest / first-time user",
        need: "Understand the courses and register quickly",
        journeys: "Non-logged-in flow, registration and Global ID, forgot password"
      },
      {
        role: "Learner → Provider (Essentials / Advanced)",
        need: "Complete the online part, book an ILE, get an eCard",
        journeys: "Learner to Provider, My Learnings and Certificates"
      },
      {
        role: "Instructor Candidate → Instructor",
        need: "Complete the IC bundle and co-teach events",
        journeys: "Instructor Candidate to Instructor, Instructor application"
      },
      {
        role: "Instructor / Instructor Mentor",
        need: "Create and run events, grade, mentor candidates, renew",
        journeys: "Add and Manage Events, Renewal, Mentor flows"
      },
      {
        role: "AAP admin / eCom admin",
        need: "Manage applications, catalogue, pricing, notifications, reports",
        journeys: "Admin login and multiple roles, Manage Applications"
      },
      {
        role: "Org admin / L2 support",
        need: "Assign licences, bulk purchase, resolve account issues",
        journeys: "Licence management, bulk purchase, L2 support portal"
      }
    ],
    /**
     * The progression ladder from the role model. `state` is an ILLUSTRATIVE example (a learner partway up),
     * shown to explain how the design signals progress; it is not data about a real account.
     */
    ladder: [
      { name: "Guest", state: "done", note: "Non-logged-in flow, registration and Global ID" },
      { name: "Learner", state: "done", note: "Online courses and exams" },
      { name: "Provider", state: "pending", note: "Essentials or Advanced", rule: "120 days between the online part and the ILE" },
      { name: "Instructor Candidate", state: "locked", note: "IC bundle and co-teach events", rule: "30 days to start the bundle after approval" },
      { name: "Instructor", state: "locked", note: "Run events, grade, renew" },
      { name: "Instructor Mentor", state: "locked", note: "Mentor candidates", rule: "1:1 instructor-to-mentor ratio" }
    ] as { name: string; state: "done" | "pending" | "locked"; note: string; rule?: string }[],
    backOffice: ["AAP admin", "eCom admin", "Org admin", "L2 support"],
    personas: {
      id: "personas",
      label: "Role profiles (proto-personas derived from the role model, not interviews)",
      caption: "Role profiles (proto-personas derived from the role model, not interviews).",
      source: "Your research. Add 1-3 images (personas-1, -2, -3). Role profiles (proto-personas): role, goals, frustrations. No quote, no name.",
      aspect: "16/10"
    } satisfies Slot,
    learningPaths: {
      id: "learning-paths",
      label: "Learning paths map",
      caption: "The learner journey across courses and ranks.",
      source: "Figma: NRP SYSTEM FLOWS (Confluence: Learning Paths in NRP Platform)",
      aspect: "16/9"
    } satisfies Slot
  },

  research: {
    intro:
      "The work was driven by stakeholder requirements workshops and demo reviews rather than documented user interviews.",
    evidence:
      "This work was driven by business rules confirmed in a March 2021 workshop with AAP, Laerdal and RQI stakeholders, and refined through stakeholder demos (May 2021). There were no user interviews, no usability tests and no baseline metrics. The personas are proto-personas drawn from the role model, not from research.",
    /** Draft only. Forward-looking line in the author's voice. */
    testFirstDraft:
      "What I would test first: [NEEDS FROM CHINMAY: one sentence, e.g. which rule-heavy step you would put in front of five learners first.]",
    workshopIntro:
      "A March 2021 session with AAP, Laerdal and RQI stakeholders confirmed business rules that directly shaped the UX.",
    rules: [
      {
        title: "Learner starts the clock",
        body: "Launching an Instructor Candidate bundle within 30 days of application approval triggers the rank change. No auto-start, so learners stay in control."
      },
      {
        title: "120-day window",
        body: "Provider learners have 120 days between finishing the online part and completing the instructor-led event, so reminders must nudge them."
      },
      {
        title: "Ordered unlocking",
        body: "Course activities unlock in order: instructor course, adaptive course, exams, survey, co-teach events."
      },
      {
        title: "Feedback without answers",
        body: "Failed exams show the questions missed and where to read, never the correct answers. Passed exams reveal nothing about misses."
      },
      {
        title: "1:1 mentor ratio",
        body: "Instructor-to-mentor ratio is 1:1, so only events with mentors registered are listed for candidates."
      }
    ],
    artefact: {
      id: "workshop-artefact",
      label: "Workshop / requirements artefact",
      caption: "Requirements table, affinity map or notes.",
      source: "Confluence: NRP AAP Requirements gathering (strip names before publishing)",
      aspect: "16/10"
    } satisfies Slot
  },

  journeys: {
    intro:
      "Journeys were designed per role, then stitched into a dashboard structure. About a dozen were produced for learners and admins: non-logged-in, learner to provider, instructor candidate to instructor, instructor renewal, instructor to mentor, ILE management, reports, exams, My Account and My Learnings and Certificates.",
    maps: [
      {
        id: "journey-learner-provider",
        label: "Learner to Provider",
        caption: "Start, key steps, decisions and pain points.",
        source: "Confluence: Learner to Provider - UJ (XD link, PDF attachment)",
        aspect: "16/10"
      },
      {
        id: "journey-ic-instructor",
        label: "Instructor Candidate to Instructor",
        caption: "Highlighting the 30-day and co-teach steps.",
        source: "Confluence: Instructor Candidate to Instructor - UJ",
        aspect: "16/10"
      },
      {
        id: "sitemap-dashboard",
        label: "Dashboard structure",
        caption: "End user dashboard structure and sitemap.",
        source: "Confluence: End User Dashboard Design Structure",
        aspect: "16/10"
      }
    ] satisfies Slot[],
    ideation: {
      id: "sketches",
      label: "Early sketches and low-fidelity wireframes",
      caption: "Exploration and rejected options.",
      source: "Your files / XD (2-4 images)",
      aspect: "16/10"
    } satisfies Slot,
    mockups: {
      id: "mockups",
      label: "Mid-fidelity mock-ups",
      caption: "Learner to Provider enrolled flow, registration and Global ID, My Account.",
      source: "XD: Learner to Provider - MU/VD; Global ID Workflow & User Registration",
      aspect: "16/10"
    } satisfies Slot
  },

  /** Three lead decisions get in-depth cards; the rest are compact "rules designed around". `draft` fields are author-only. */
  decisions: [
    {
      id: "decision-01",
      lead: true,
      title: "Learner stays in control of starting courses",
      kind: "Rule",
      rule: "Launching an Instructor Candidate bundle within 30 days of application approval triggers the rank change.",
      source: "Business rule confirmed in the March 2021 requirements workshop (AAP, Laerdal, RQI)",
      chosen: "No auto-start of bundles after purchase, so the learner, not the system, starts the 30-day clock.",
      draft: {
        options:
          "(a) auto-start on purchase, (b) learner-started with reminders, (c) admin-started. [NEEDS FROM CHINMAY: confirm these were real options; who ruled out auto-start; was it the March 2021 workshop?]",
        tradeoff: "[NEEDS FROM CHINMAY: what did learner-started cost, e.g. learners who never start before the window ends?]",
        result: "[NEEDS FROM CHINMAY: any observed result, or leave out.]"
      }
    },
    {
      id: "decision-05",
      lead: true,
      title: "Banner success messages",
      kind: "Feedback",
      rule: "Success messages sat below the fold, so users had to scroll to see confirmation.",
      source: "Stakeholder demo feedback, May 2021",
      chosen: "Replaced section-level success messages with a banner so confirmation is visible without scrolling.",
      draft: {
        options: "[NEEDS FROM CHINMAY: rejected option (e.g. inline message kept, toast); which screen shows it; the role (not name) of who gave the feedback.]",
        tradeoff: "[NEEDS FROM CHINMAY: trade-off, if any.]",
        result: "[NEEDS FROM CHINMAY: any observed result, or leave out.]"
      }
    },
    {
      id: "decision-07",
      lead: true,
      title: "Reversible consent",
      kind: "Feedback",
      rule: "The registration T&C popup had no way to decline.",
      source: "Stakeholder demo feedback, May 2021",
      chosen: "Added a \"Disagree\" option to the registration T&C popup.",
      draft: {
        options: "[NEEDS FROM CHINMAY: rejected option; which screen shows it; the role (not name) of who gave the feedback.]",
        tradeoff: "[NEEDS FROM CHINMAY: trade-off, if any, e.g. what happens after Disagree.]",
        result: "[NEEDS FROM CHINMAY: any observed result, or leave out.]"
      }
    },
    {
      id: "decision-02",
      lead: false,
      title: "Locked, ordered curriculum",
      rule: "Course activities unlock in order: instructor course, adaptive course, exams, survey, co-teach events.",
      legible: "Each activity unlocks when the previous one is complete, so learners follow the required sequence."
    },
    {
      id: "decision-03",
      lead: false,
      title: "Exam feedback without answers",
      rule: "Failed exams never show the correct answers; passed exams reveal nothing about misses.",
      legible: "Fail: show missed questions plus where to read. Pass: no breakdown."
    },
    {
      id: "decision-04",
      lead: false,
      title: "Time-limit nudges",
      rule: "Provider learners have 120 days between finishing the online part and completing the instructor-led event.",
      legible: "Reminders during the window."
    },
    {
      id: "decision-06",
      lead: false,
      title: "Smart defaults in My Account",
      rule: "MVP is US-only, so phone numbers use the US format.",
      legible: "Time zone and name fixes came from the May 2021 demo feedback (see the feedback table).",
      chip: "US phone format (MVP constraint)"
    }
  ],

  finalDesign: [
    {
      id: "final-registration",
      label: "Registration and login",
      caption: "Registration, Global ID and login.",
      source: "XD: Global ID Workflow & User Registration; Forgot Password and User Name"
    },
    {
      id: "final-dashboard",
      label: "Learner dashboard",
      caption: "Learner dashboard and My Learnings.",
      source: "XD: End User Dashboard; My Learnings & My Certificates"
    },
    {
      id: "final-commerce",
      label: "Catalogue and licences",
      caption: "Catalogue, purchase and licence management.",
      source: "Figma / XD: eCommerce, License management"
    },
    {
      id: "final-instructor",
      label: "Instructor",
      caption: "Add and manage events, rosters, grading.",
      source: "XD: Instructor - Add & Manage Events"
    },
    {
      id: "final-admin",
      label: "Admin",
      caption: "Manage applications, bulk purchase, add licences, delete unregistered users.",
      source: "Confluence 2024 Figma specs"
    },
    {
      id: "final-certificates",
      label: "Certificates and eCards",
      caption: "Certificate and eCard templates.",
      source: "XD: Certificate templates"
    },
    {
      id: "final-mobile",
      label: "Mobile",
      caption: "Mobile screens.",
      source: "Your files (add only if completed; they were WIP in the records)"
    }
  ] satisfies Slot[],
  prototypeUrl: "" as string,

  visual: {
    body: "Visual design was produced in Adobe XD after mock-up approval, then evolved in 2026 with the updated AAP identity, course-level logos and theme colours, and a global blue header.",
    styleGuide: {
      id: "style-guide",
      label: "Style guide and components",
      caption: "Colours, typography, buttons, cards, form fields, states.",
      source: "Design system file",
      aspect: "16/10"
    } satisfies Slot,
    beforeAfter: {
      id: "visual-before-after",
      label: "Before vs after visual language",
      caption: "2021 visual design next to the 2026 PediaSkills look.",
      source: "XD (2021) vs Figma (2026)",
      aspect: "16/10"
    } satisfies Slot
  },

  validation: {
    intro:
      "Designs were presented at demos and reviewed by stakeholders. The May 2021 demo feedback led to concrete changes.",
    limits: "Validation ran through stakeholder demos; no formal usability testing is documented.",
    changes: [
      { feedback: "Registration T&C popup had no way to decline", change: "Added a \"Disagree\" option" },
      { feedback: "Names were truncated in My Account", change: "Stopped truncating names in view mode" },
      { feedback: "Time zone had to be set by hand", change: "Derived from the registration address, still editable" },
      { feedback: "Success messages sat below the fold", change: "Moved to a banner so confirmation is visible without scrolling" },
      { feedback: "Resend-email timer only enforced in the UI", change: "Validated on the server too; change-password rules rethought" }
    ],
    beforeAfter: {
      id: "feedback-change",
      label: "Feedback → change",
      caption: "One feedback item with the before and after screen.",
      source: "Confluence: Demo Feedback",
      aspect: "16/10"
    } satisfies Slot
  },

  evolution: [
    {
      id: "evo-edition",
      year: "2024",
      title: "8th to 9th edition migration",
      body: "When NRP moved from the 8th to the 9th edition, learners needed to understand the change without losing credit. The designs added a dashboard popup announcing the course version update, a popup on Licence Management announcing the licence version update, and access for learners with an active 8th-edition eCard to review 9th-edition content.",
      slot: {
        id: "evo-version-popups",
        label: "Version update popups and review access",
        caption: "Dashboard popup, licence popup, review-content state.",
        source: "Figma: 8th to 9th Edition requirements",
        aspect: "16/10"
      } satisfies Slot
    },
    {
      id: "evo-admin",
      year: "2024–25",
      title: "New admin capabilities",
      body: "Specs for adding licences or products to learner and distributor accounts (with transaction history), deleting unregistered users (partial registrations), bulk purchase with refunds, and an assignment change log for org admins.",
      slot: {
        id: "evo-admin-flows",
        label: "Admin flows",
        caption: "Add licence, delete unregistered users, bulk purchase.",
        source: "Figma specs (Confluence pages)",
        aspect: "16/10"
      } satisfies Slot
    },
    {
      id: "evo-rebrand",
      year: "2026",
      title: "PediaSkills rebrand (designs)",
      body: "The designs moved the platform from NRP Learning Platform to PediaSkills, with updated AAP identity, course-level logos and theme colours across Catalog, Bulk Purchase, Dashboard, My Learnings, Licence Management, Instructor Toolkit and notifications. Product ordering was defined (NRP, PEPP, NICU, NEPP, Cardiac, with international products last). Certificates and eCards keep their existing templates. The planned domain is pediaskills.com.",
      slot: {
        id: "evo-rebrand-before-after",
        label: "Before / after rebrand",
        caption: "Login, dashboard, catalogue and notification email, old vs new.",
        source: "Figma / design files",
        aspect: "16/10"
      } satisfies Slot
    },
    {
      id: "evo-chatbot",
      /** Draft only until a source for the phases is logged in NRP-CONTEXT.md. */
      draftOnly: true,
      year: "2026",
      title: "In-product help chatbot (exploration)",
      body: "A phased chatbot: Phase 1 answers questions from the help centre; Phase 2 lets admins and retail users create Salesforce cases; Phase 3 prompts for a screenshot and system logs.",
      slot: {
        id: "evo-chatbot-ui",
        label: "Chatbot UI concept",
        caption: "Entry point, conversation states, escalation to case creation.",
        source: "Your designs (not yet in Confluence)",
        aspect: "16/10"
      } satisfies Slot
    }
  ],

  outcomes: {
    headline: "Reach is measured. Effect is not documented.",
    measured: "About 43,000 people log in each month (Heap, June 2026). This shows reach, not effectiveness.",
    observedLead: "Delivered MVP scope:",
    mvp: [
      "identity management",
      "curriculum enrolment",
      "Rhapsode and exam integrations",
      "eCards and certificates",
      "instructor import and ILE management",
      "account management",
      "eCommerce and admin",
      "notifications and basic reports"
    ],
    /** Draft only: not evidenced as shipped. */
    observedDraft:
      "The design was extended to the 8th to 9th edition migration (2024) and the PediaSkills rebrand (2026) on the same product structure. [NEEDS FROM CHINMAY: did both ship?]",
    notMeasured:
      "No completion-rate, support-ticket or task-time baseline is documented, so I cannot claim the design improved them. Next time I would instrument those before launch.",
    // Add measured results here only with a source and period (completion, conversion, support tickets, task time, NPS/CSAT).
    metrics: [] as { value: string; label: string; detail: string }[],
    // Optional stakeholder quote.
    quote: null as null | { text: string; attribution: string }
  },

  /** Draft only (reflection is not approved for writing). */
  reflectionDraft: [
    "Designing around rules I did not own: claim the design layer, not the rule. [NEEDS FROM CHINMAY: confirm]",
    "Stakeholder approval was my only validation loop, so I would ask for even five user sessions earlier. [NEEDS FROM CHINMAY: confirm]",
    "Keeping one design language across editions and a rebrand taught me to design tokens before screens. [NEEDS FROM CHINMAY: confirm]"
  ],
  roleDraft:
    "I led the interaction design for the platform: role-based user journeys, mock-ups and the visual design. I worked with product and business analysts, front-end and back-end engineers, and QA, and presented each stage to AAP for approval. I ran demo reviews with AAP and RQI stakeholders and turned their feedback into changes. [NEEDS FROM CHINMAY: confirm each claim; did you mentor, own a component library, run workshops?]",

  next: ["PEPP first release", "Further programmes (NICU, NEPP)", "e-ALS / e-BLS eLearning", "Chatbot phases 2 and 3"],

  toc: [
    { id: "problem", label: "Problem and stakes" },
    { id: "role", label: "My role" },
    { id: "decisions", label: "Three decisions" },
    { id: "rules", label: "Rules, roles and feedback" },
    { id: "evolution", label: "Six years of change" },
    { id: "outcome", label: "Outcome and limits" },
    { id: "reflection", label: "Reflection" }
  ]
};
