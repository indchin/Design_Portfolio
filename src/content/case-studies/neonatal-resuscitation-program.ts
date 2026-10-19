export type NrpRoleType = {
  id: string;
  emoji: string;
  archetype: string;
  pitch: string;
  needs: string[];
  quote?: string;
};

export type KeyDecision = {
  id: string;
  number: string;
  title: string;
  body: string[];
  rationale: string;
  visualLabel?: string;
  visualDescription?: string;
};

export type RankDef = { rank: string; status: string; rule: string };

export type ReflectionItem = { heading: string; body: string };

export type NrpCaseStudy = {
  meta: {
    title: string;
    tagline: string;
    role: string;
    timeline: string;
    platform: string;
    partners: string;
    teamContext: string;
  };
  tension: string[];
  problem: {
    business: string;
    user: string;
    technical: string;
  };
  goals: string[];
  method: {
    discovery: { label: string; value: string }[];
    process: { label: string; value: string }[];
  };
  roles: NrpRoleType[];
  ia: {
    intro: string;
    pillars: { title: string; body: string }[];
  };
  decisions: KeyDecision[];
  ranks: RankDef[];
  accessibility: {
    intro: string;
    items: string[];
  };
  migration: {
    summary: string;
    items: string[];
  };
  impact: {
    delivered: string[];
    unmeasured: string;
  };
  reflection: ReflectionItem[];
  toc: { id: string; label: string }[];
};

export const nrpCaseStudy: NrpCaseStudy = {
  meta: {
    title: "NRP Learning Platform → PediaSkills",
    tagline:
      "Designing a single learning, certification and instructor platform for the American Academy of Pediatrics Neonatal Resuscitation Program, with design work from the 2020 MVP through the 2026 PediaSkills rebrand.",
    role: "Lead Interaction Designer",
    timeline: "2020 – 2026",
    platform: "Web, desktop-first learning, certification and eCommerce platform",
    partners: "American Academy of Pediatrics · Laerdal · RQI Partners",
    teamContext: "Product/BA, UX and visual design, front-end, back-end, QA, AAP and RQI stakeholders"
  },
/*
 * Legacy narrative, trimmed to what src/content/case-studies/nrp-pediaskills.ts and content/nrp/NRP-CONTEXT.md support.
 * Claims about audits, usability tests, migration UX, design-system contribution, account merging and metrics were removed.
 * The live page renders from nrp-pediaskills.ts; this file only feeds nrp-blocks.tsx and scripts/seed.ts.
 */
  tension: [
    "The Neonatal Resuscitation Program is the standard training programme for neonatal resuscitation in the US. The platform had to take learners from sign-up to certified provider, let instructors run events and mentor candidates, and give AAP administrators control of catalogue, orders, notifications and reports.",
    "Before this platform, NRP learning, instructor management and certification ran across separate systems, with active instructors held in a legacy instructor-management system.",
    "The brief called for one platform: a global NRP identity (Global ID), integrated adaptive learning, an exam engine, eCards and certificates, instructor events and eCommerce, all in one place."
  ],
  problem: {
    business:
      "NRP learning, instructor management and certification ran across separate systems. The brief called for one platform that brings them together under a single Global ID.",
    user:
      "Learners, instructors and administrators moved between separate systems for learning, instructor events and certification. The goal was that learners always know the next step in their curriculum and rank.",
    technical:
      "Existing instructors had to be imported from the existing instructor database. The platform also had to integrate adaptive courses (Rhapsode), an exam engine and a feedback service, and support eCommerce, within AAP programme rules for certification, CE credits and eCard expiry."
  },
  goals: [
    "Unified experience: registration, learning, certificates, events and orders in one account with a Global ID.",
    "Clear progression: learners always know the next step in their curriculum and rank.",
    "Instructor enablement: candidates, instructors and mentors can find events, co-teach and renew without manual back-office help.",
    "Admin control: catalogue, pricing, notifications, bulk purchase and reports manageable by AAP admins.",
    "Scale and brand: support new editions and programmes (NICU, PEPP) and the PediaSkills brand without rebuilds."
  ],
  method: {
    discovery: [
      {
        label: "Requirements workshops",
        value: "A March 2021 session with AAP, Laerdal and RQI stakeholders confirmed the business rules that shaped the UX"
      },
      {
        label: "Role model",
        value:
          "Six role groups, from guests and learners to instructors, mentors and admins, with proto-personas drawn from the role model, not from interviews"
      },
      {
        label: "Journey mapping",
        value:
          "Role-based journeys across the six role groups, from non-logged-in registration to admin management, stitched into a dashboard structure"
      },
      {
        label: "Demo reviews",
        value: "Designs presented to AAP and RQI stakeholders; the May 2021 demo feedback led to concrete changes"
      }
    ],
    process: [
      { label: "Artifacts", value: "User journeys, mock-ups and visual design in Adobe XD (Figma from 2024), handed off via Jira epics" },
      { label: "Validation", value: "Stakeholder demo reviews; no formal usability testing is documented" }
    ]
  },
  roles: [
    {
      id: "guest",
      emoji: "👋",
      archetype: "Guest / first-time user",
      pitch: "Someone who has not signed in yet.",
      needs: ["Understand the courses and register quickly", "Non-logged-in flow, registration and Global ID, forgot password"]
    },
    {
      id: "learner-provider",
      emoji: "🩺",
      archetype: "Learner → Provider (Essentials / Advanced)",
      pitch: "A learner working towards provider certification.",
      needs: ["Complete the online part, book an ILE, get an eCard", "Learner to Provider, My Learnings and Certificates"]
    },
    {
      id: "candidate-instructor",
      emoji: "🎓",
      archetype: "Instructor Candidate → Instructor",
      pitch: "A provider working towards becoming an instructor.",
      needs: ["Complete the IC bundle and co-teach events", "Instructor Candidate to Instructor, Instructor application"]
    },
    {
      id: "instructor-mentor",
      emoji: "🧑‍🏫",
      archetype: "Instructor / Instructor Mentor",
      pitch: "Instructors run events; mentors work with candidates.",
      needs: ["Create and run events, grade, mentor candidates, renew", "Add and Manage Events, Renewal, Mentor flows"]
    },
    {
      id: "aap-admin",
      emoji: "🛡️",
      archetype: "AAP admin / eCom admin",
      pitch: "The administrators of the programme and its catalogue.",
      needs: ["Manage applications, catalogue, pricing, notifications, reports", "Admin login and multiple roles, Manage Applications"]
    },
    {
      id: "org-admin",
      emoji: "🏥",
      archetype: "Org admin / L2 support",
      pitch: "Organisation administrators and second-line support.",
      needs: ["Assign licences, bulk purchase, resolve account issues", "Licence management, bulk purchase, L2 support portal"]
    }
  ],
  ia: {
    intro:
      "The hardest IA problem on NRP was the domain itself. Six role groups, a progression ladder, time windows, eCards, CE credits and an eCommerce layer all had to coexist in a way each user could hold in their head. The IA was anchored to four ideas.",
    pillars: [
      {
        title: "Dashboard structure",
        body: "Journeys were designed per role, then stitched into an end-user dashboard structure."
      },
      {
        title: "One Global ID",
        body: "One Global ID per person across registration, learning, events and orders."
      },
      {
        title: "A visible next step",
        body: "The goal was that learners always know the next step in their curriculum and rank, within rules such as the 30-day and 120-day windows."
      },
      {
        title: "Admin groups",
        body: "AAP admins, eCommerce admins and org admins manage applications, catalogue, licences and bulk purchase."
      }
    ]
  },
  decisions: [
    {
      id: "learner-control",
      number: "01",
      title: "Learner stays in control of starting courses",
      body: [
        "No auto-start of bundles after purchase, so the learner, not the system, starts the 30-day clock."
      ],
      rationale: "Launching an Instructor Candidate bundle within 30 days of application approval triggers the rank change, so the learner starts the clock.",
      visualLabel: "Bundle launch"
    },
    {
      id: "ordered-curriculum",
      number: "02",
      title: "Locked, ordered curriculum",
      body: ["Each activity unlocks when the previous one is complete, so learners follow the required sequence."],
      rationale: "Course activities unlock in order: instructor course, adaptive course, exams, survey, co-teach events.",
      visualLabel: "Curriculum steps"
    },
    {
      id: "exam-feedback",
      number: "03",
      title: "Exam feedback without answers",
      body: ["Fail: show missed questions plus where to read. Pass: no breakdown. Supports learning without leaking answers."],
      rationale: "Failed exams show the questions missed and where to read, never the correct answers. Passed exams reveal nothing about misses.",
      visualLabel: "Exam result"
    },
    {
      id: "time-nudges",
      number: "04",
      title: "Time-limit nudges",
      body: ["Reminders during the 120-day window between Part 1 and the ILE."],
      rationale: "Provider learners have 120 days between finishing the online part and completing the instructor-led event, so reminders must nudge them.",
      visualLabel: "Reminder"
    },
    {
      id: "banner-success",
      number: "05",
      title: "Banner success messages",
      body: ["Replaced section-level success messages with a banner so users do not need to scroll to see confirmation (May 2021 demo feedback)."],
      rationale: "Success messages sat below the fold in the demo.",
      visualLabel: "Success banner"
    },
    {
      id: "smart-defaults",
      number: "06",
      title: "Smart defaults in My Account",
      body: ["Time zone derived from the address given at registration but editable; US phone format; names not truncated in view mode."],
      rationale: "Names and time zone changes came from the May 2021 demo feedback; the US phone format is an MVP constraint.",
      visualLabel: "My Account"
    },
    {
      id: "reversible-consent",
      number: "07",
      title: "Reversible consent",
      body: ["Added a \"Disagree\" option to the registration T&C popup (May 2021 demo feedback)."],
      rationale: "The popup had no way to decline.",
      visualLabel: "Registration T&C"
    }
  ],
  ranks: [
    {
      rank: "Provider",
      status: "Essentials / Advanced",
      rule: "Provider learners have 120 days between finishing the online part and completing the instructor-led event."
    },
    {
      rank: "Instructor Candidate (IC)",
      status: "From the role model",
      rule: "Launching an IC bundle within 30 days of application approval triggers the rank change. Activities unlock in order, ending with co-teach events."
    },
    {
      rank: "Instructor",
      status: "From the role model",
      rule: "Instructors create and run events, grade, mentor candidates and renew."
    },
    {
      rank: "Instructor Mentor",
      status: "From the role model",
      rule: "Instructor-to-mentor ratio is 1:1, so only events with mentors registered are listed for candidates."
    }
  ],
  accessibility: {
    // Intentionally empty: no accessibility audit or conformance result is documented, so the block renders nothing.
    intro: "",
    items: []
  },
  migration: {
    summary:
      "Existing instructors were imported from the existing instructor database, and the 2024 designs covered the move between course editions.",
    items: [
      "Instructor import: existing instructors imported from the existing instructor database",
      "Edition change (2024 designs): a dashboard popup announcing the course version update and a popup on Licence Management announcing the licence version update",
      "Review access: learners with an active 8th-edition eCard can review 9th-edition content"
    ]
  },
  impact: {
    delivered: [
      "MVP scope delivered: identity management, curriculum enrolment, course launch with Rhapsode and exam integrations, eCards and certificates, instructor import and ILE management, account management, eCommerce and admin, notifications and basic reports.",
      "About 43,000 people log in each month (Heap, June 2026). This shows reach, not effectiveness."
    ],
    unmeasured:
      "No completion-rate, support-ticket or task-time baseline was captured, so no claim is made that the design improved them."
  },
  // Intentionally empty: the reflection is not written yet (needs the author's own words).
  reflection: [],
  toc: [
    { id: "tension", label: "The tension" },
    { id: "problem", label: "Problem" },
    { id: "goals", label: "Goals" },
    { id: "method", label: "Method" },
    { id: "roles", label: "User roles" },
    { id: "ia", label: "Architecture" },
    { id: "decisions", label: "Decisions" },
    { id: "ranks", label: "Rank & status" },
    { id: "accessibility", label: "Accessibility" },
    { id: "migration", label: "Migration" },
    { id: "impact", label: "Impact" },
    { id: "reflection", label: "Reflection" }
  ]
};
