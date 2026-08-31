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
    title: "Neonatal Resuscitation Program",
    tagline:
      "Designing the platform that replaced HealthStream as AAP's LMS for life-saving neonatal training.",
    role: "Lead Interaction Designer, Laerdal Bangalore",
    timeline: "2022 – Present · Multi-year programme",
    platform:
      "Custom LMS + e-commerce platform — built to replace AAP's HealthStream dependency",
    partners:
      "American Academy of Pediatrics · Laerdal Medical · Institutional health systems",
    teamContext:
      "Embedded design lead within the NRP product team at Laerdal, partnering with AAP product, education, and clinical leadership teams on SAFe Agile cadences"
  },
  tension: [
    "The Neonatal Resuscitation Program is the gold-standard certification for neonatal resuscitation in the United States — the training paediatricians, nurses, and educators rely on when a newborn isn't breathing. Every active provider card carries an expiration date because the skill demands constant currency.",
    "For years, the platform delivering that training wasn't AAP's. It was HealthStream — a third-party LMS that AAP licensed at significant cost, with limited control over the learner experience, and whose contract was approaching its expiration window.",
    "AAP wanted out. The strategic ask was simple to state and very hard to execute: build a custom platform that replaces HealthStream entirely, migrate years of learner history without losing a single certification record, and deliver a learner experience that AAP could finally own end-to-end — for individuals, instructors, and the hundreds of institutional health systems that buy NRP at scale.",
    "I joined as Lead Interaction Designer to own the experience design across that ecosystem."
  ],
  problem: {
    business:
      "AAP was paying significant licensing fees to HealthStream for an LMS they couldn't customise to NRP's specific clinical and educational requirements. The contract was expiring. Without a replacement, AAP risked service disruption to a programme that hospitals across the country depend on for neonatal staff compliance.",
    user:
      "Learners — paediatricians, neonatal nurses, instructors, and institutional administrators — were navigating a generic LMS that wasn't built around NRP's domain. Rank progression, eCard retrieval, instructor renewal checklists, and instructor-led event tracking were all bolt-ons or external workflows. Returning learners had to remember multiple logins. Institutions had no clean way to manage their providers' status at scale.",
    technical:
      "Five years of learner history (user data, ranks, statuses, eCards, CE credits, completed courses, instructor-led teaching records) had to be migrated cleanly from HealthStream into a new platform — without losing a single certification record. Courses and toolkits would be rebuilt from scratch. The new system also had to integrate with institutional LMS platforms via SSO, host an e-commerce engine for individual and institutional sales, and enforce a complex matrix of business rules around rank, status, and expiry."
  },
  goals: [
    "Replace HealthStream as AAP's LMS without breaking the certification chain for any active learner.",
    "Migrate user data and 5 years of learning history without loss, with absolute fidelity for ranks, statuses, eCards, and CE credits.",
    "Design dashboard-first experiences for each of the four primary user roles — Providers, Instructor Candidates, Instructors, and Institutional Admins — so each role's most important actions are one click away.",
    "Build an institutional sales and management surface so contracted health systems can purchase, assign, and track NRP curricula at scale.",
    "Embed accessibility (WCAG 2.1) as a baseline, not a compliance afterthought — given the clinical and regulated nature of the certification.",
    "Establish a re-usable design system extension within Laerdal so future medical-software products can inherit the patterns proven on NRP."
  ],
  method: {
    discovery: [
      {
        label: "Stakeholder workshops",
        value: "Embedded sessions with AAP product, education, and clinical leadership to surface the full domain model — ranks, statuses, business rules, edge cases"
      },
      {
        label: "Domain modelling",
        value:
          "Mapped the rank/status state machine (Provider → IC → Instructor → Mentor) with all transition rules, including RQI institution carry-over and renewal/expiry logic"
      },
      {
        label: "Journey mapping",
        value:
          "Built end-to-end journeys for all four primary user types — first-time learner, returning learner, instructor renewing status, institutional admin onboarding"
      },
      {
        label: "Competitive teardown",
        value:
          "Audited the existing HealthStream experience plus comparable medical LMSes to identify what learners had grown to expect — and what we could surpass"
      }
    ],
    process: [
      { label: "Methodology", value: "SAFe Agile — programme-level coordination across product, design, and engineering" },
      { label: "Cadence", value: "Two-week sprints with design ahead of development by 1–2 sprints" },
      { label: "Artifacts", value: "User flows, wireframes, hi-fi UI in Figma, design system contributions, accessibility review" },
      { label: "Validation", value: "Internal stakeholder reviews, design critiques, accessibility audits — with planned usability testing for high-stakes flows" }
    ]
  },
  roles: [
    {
      id: "individual-provider",
      emoji: "🩺",
      archetype: "The Individual Provider",
      pitch:
        "A paediatrician, neonatal nurse, or NICU clinician renewing or earning their NRP Provider certification on their own schedule.",
      needs: [
        "Self-register with personal data and clinical credentials",
        "Track rank, status, and expiration at a glance",
        "Purchase Provider exam, eSim, and renewal materials",
        "Retrieve their eCard on demand — including expired versions, clearly marked"
      ],
      quote: "I need to know my card is active before my next shift. I shouldn't need a help desk to check."
    },
    {
      id: "instructor",
      emoji: "🎓",
      archetype: "The Instructor",
      pitch:
        "An NRP-certified instructor running Instructor-Led Events for hospital teams — managing their own renewal checklist while also tracking students across events.",
      needs: [
        "A renewal checklist showing what's done vs. what's still required for status renewal",
        "A list of all Instructor-Led Events they've taught in the last 5 years",
        "Search across students within their events",
        "An eCard that reflects their instructor rank with the correct expiry"
      ],
      quote: "I'm teaching the event tomorrow. I need to know which of my requirements are still pending — without scrolling through twelve menus."
    },
    {
      id: "institutional-admin",
      emoji: "🏥",
      archetype: "The Institutional Admin",
      pitch:
        "A learning manager at a hospital or health system buying NRP curricula in bulk, assigning courses to their staff, and tracking compliance across hundreds of providers.",
      needs: [
        "Bulk-purchase NRP curricula on contracted or non-contracted terms",
        "Create and manage user accounts within their institution",
        "View every provider's rank, status, expiry, and eCard",
        "Merge duplicate accounts and reset passwords without escalating to AAP"
      ],
      quote: "I have 400 nurses across three NICUs. I need a single view that tells me who's about to expire."
    },
    {
      id: "aap-admin",
      emoji: "🛡️",
      archetype: "The AAP Administrator",
      pitch:
        "The AAP team responsible for the integrity of the certification programme — handling exceptions, overrides, credential management, and platform-wide governance.",
      needs: [
        "Look-up access across every account, institution, and event in the system",
        "Override authority for edge cases (denied instructor applications, manual expiry adjustments)",
        "Add, edit, and delete credentials, ranks, and email templates",
        "A clear audit trail for every override action"
      ],
      quote: "Every exception we make is documented. The system has to support that — not fight it."
    }
  ],
  ia: {
    intro:
      "The hardest IA problem on NRP wasn't navigation — it was the domain itself. Four user roles, four ranks, two statuses per role, expiration timers, eCards, CE credits, institutional containment, and a separate e-commerce layer all had to coexist in a way each user could mentally hold. The IA was anchored to four pillars.",
    pillars: [
      {
        title: "Dashboard-first architecture",
        body:
          "Every authenticated experience opens to a role-aware dashboard. A provider sees their card, rank, and active enrolments. An instructor sees their renewal checklist and upcoming events. An institutional admin sees their roster and compliance heatmap. The dashboard isn't a landing page — it's the home base each user returns to."
      },
      {
        title: "Identity as the spine",
        body:
          "Every learner gets a 7-digit Universal ID that persists across institutional and individual accounts. Returning users with multiple historical accounts can link them under one identity with SSO, so the dashboard is consistent regardless of entry point."
      },
      {
        title: "Rank and status, always visible",
        body:
          "Rank (Provider / IC / Instructor / Mentor) and status (active / inactive) are surfaced on every relevant screen — never buried in a profile sub-page. Expiration dates use traffic-light treatments based on time remaining. Expired eCards are still retrievable, but watermarked unambiguously."
      },
      {
        title: "Institutional containment",
        body:
          "Institutional admins see only their institution's data, by design. AAP admins see across institutions. Permissions are scoped at the data layer with UI affordances that mirror what's visible — not the inverse."
      }
    ]
  },
  decisions: [
    {
      id: "dashboard-first",
      number: "01",
      title: "Role-aware dashboards as the primary surface",
      body: [
        "Generic dashboards had been part of the HealthStream pain point — they listed everything for every user role and forced learners to find their context manually. We inverted that.",
        "Each of the four primary user roles gets a dashboard composed of role-specific widgets: a provider sees rank + status + eCard + current courseware; an instructor adds a renewal checklist and a list of their Instructor-Led Events; an institutional admin sees their roster and expiring providers; an AAP admin sees system-wide override surfaces."
      ],
      rationale:
        "Reduces cognitive load. The most important next action is one click away. Returning learners — who may not have logged in since their last renewal — re-orient immediately without re-learning the platform.",
      visualLabel: "Provider dashboard",
      visualDescription:
        "Rank badge, eCard preview, expiration countdown, active courseware shelf, recommended next renewal step"
    },
    {
      id: "renewal-checklist",
      number: "02",
      title: "Instructor renewal checklist as a living widget",
      body: [
        "Instructor renewal isn't a single action — it's a multi-requirement workflow (teach a minimum number of Instructor-Led Events, complete certain courses, maintain Provider status, etc.) that updates as time passes.",
        "The checklist surfaces inside the instructor dashboard itself, items resolve in real time as requirements get fulfilled, and a date-aware indicator shows what's still required within the active renewal window."
      ],
      rationale:
        "Instructors told us the existing system buried renewal requirements three clicks deep, and they often discovered missing items only when their status went inactive. Surfacing the checklist on the dashboard turned a reactive workflow into a proactive one.",
      visualLabel: "Instructor renewal checklist",
      visualDescription:
        "Active checklist with completed / pending / not-yet-due indicators, embedded directly in the instructor dashboard"
    },
    {
      id: "ecard-treatment",
      number: "03",
      title: "Active and expired eCard treatment",
      body: [
        "The NRP eCard is the credential — what hospitals check before letting a provider into a NICU. It can't be ambiguous.",
        "Active cards are clean and printable. Expired cards remain retrievable (compliance often requires being able to prove past certification) but are watermarked clearly with EXPIRED across the card body. Users can see the entire eCard history; hospitals checking credentials never have to guess what state a card is in."
      ],
      rationale:
        "Designing the *expired* state with as much care as the active state. Hiding the expired card would have caused support calls; showing it without unambiguous status would have created clinical liability.",
      visualLabel: "eCard — active vs. expired states",
      visualDescription: "Side-by-side: active card (clean) and expired card (with EXPIRED watermark across body)"
    },
    {
      id: "account-linking",
      number: "04",
      title: "Account linking and duplicate handling",
      body: [
        "Returning users often had multiple historical accounts: one created when they were a hospital employee, another when they took a course personally years earlier. Without explicit handling, their certification history would have fragmented across accounts.",
        "We designed a self-service account-linking flow (confirmed via email match + Universal ID) that consolidates dashboards across linked accounts. Admins have an override path for ambiguous merges, with an audit trail. Both individual and institutional admins can initiate merges within their permission scope."
      ],
      rationale:
        "Migration without account consolidation would have created a different problem than the one we set out to solve. Users would have ended up looking at a partial history. The link/merge UX preserves the certification chain even when accounts came from different lifecycles.",
      visualLabel: "Account merge flow",
      visualDescription: "Three-step merge flow with side-by-side account comparison, history preview, and audit confirmation"
    },
    {
      id: "institutional-bulk",
      number: "05",
      title: "Institutional bulk purchase and assignment",
      body: [
        "Institutional buyers — hospital learning departments — work on different time horizons than individuals. They renew a roster of 200 providers at once, on a fiscal calendar, with budget approvals upstream.",
        "We designed bulk purchase flows (contracted and non-contracted), bulk user creation, bulk course assignment, and a compliance dashboard that flags providers approaching expiration so admins can act before status lapses."
      ],
      rationale:
        "Institutions are the strategic revenue layer for AAP's NRP business. Friction at this layer costs both AAP and the institutions in compliance risk. Designing for scale here unlocks bulk renewals as a clean, repeatable workflow.",
      visualLabel: "Institutional admin compliance view",
      visualDescription:
        "Roster table sorted by expiration date, with heatmap markers for the next 90 days and bulk-action toolbar"
    },
    {
      id: "migration-ux",
      number: "06",
      title: "Migration UX — the seamless return",
      body: [
        "The single highest-stakes moment of the entire programme: when a HealthStream learner with five years of history logs into the new NRP platform for the first time.",
        "We designed a guided first-login flow: identity verification (email match plus credential), a one-screen view of all migrated history (eCards, completion records, instructor events), and a clear acknowledgement of what's now in the new system. No \"start from zero\" feeling. The migration is the first impression."
      ],
      rationale:
        "If returning learners felt their history was lost or downgraded during migration, AAP would lose trust at the worst possible moment. Treating the first login as a designed *experience*, not a technical event, was non-negotiable.",
      visualLabel: "First-time migration login experience",
      visualDescription:
        "Welcome screen showing the user's name, migrated rank/status, eCard history timeline, and last five years of completions"
    },
    {
      id: "admin-override",
      number: "07",
      title: "AAP admin override surfaces with audit",
      body: [
        "Healthcare certification doesn't tolerate \"it should have worked\" UX. Admins need to be able to manually adjust expiry dates, approve denied instructor applications with documented reasons, edit credentials, and reset passwords across institutions.",
        "Every override action is paired with a reason field and a non-editable audit log entry. The override surface is intentionally deliberate, not fast — designed to slow admins down just enough that they confirm what they're doing before they commit."
      ],
      rationale:
        "In a regulated programme, the cost of an undocumented override is higher than the cost of one more click. The UX favours traceability over speed where the data has clinical weight.",
      visualLabel: "Admin override modal",
      visualDescription: "Action confirmation with required reason field, before/after diff, and audit trail preview"
    }
  ],
  ranks: [
    {
      rank: "Provider",
      status: "Active / Inactive",
      rule:
        "New accounts have no rank or status by default. Users from an RQI institution with an active provider card are auto-promoted to Active Provider, with a 2-year expiration set to month-end."
    },
    {
      rank: "Instructor Candidate (IC)",
      status: "Active only",
      rule:
        "Active Providers can be promoted to IC under business-rule conditions (mentor sponsorship, completed prerequisite courses)."
    },
    {
      rank: "Instructor",
      status: "Active / Inactive",
      rule:
        "Instructor Candidates promote to Instructor on completion of the IC curriculum. Renewal requires meeting checklist criteria within the active window; failure triggers Inactive status."
    },
    {
      rank: "Instructor Mentor",
      status: "Active only",
      rule:
        "Senior Instructors with mentorship responsibilities — manageable by AAP admins, with specific access to mentor-only surfaces."
    }
  ],
  accessibility: {
    intro:
      "NRP serves clinicians making time-pressured decisions about newborn life. Accessibility wasn't a compliance checkbox — it was clinical safety. WCAG 2.1 AA conformance was the baseline.",
    items: [
      "Semantic HTML and ARIA roles across every interactive surface, validated against screen readers",
      "Keyboard-first navigation including dashboard widgets, modal flows, and the eCard retrieval path",
      "Visible focus states across all custom components, tested with screen reader and keyboard-only workflows",
      "Colour contrast meeting WCAG 2.1 AA across every state — including status indicators, expiration warnings, and the EXPIRED eCard watermark",
      "Reduced-motion support for the entire animation system, respecting user preferences",
      "Captions, transcripts, and reader-mode for all video and rich-media content within the LMS",
      "Form field labelling that survives assistive technology, with error-state announcements"
    ]
  },
  migration: {
    summary:
      "Migrating five years of learner data from HealthStream was the single largest non-design dependency on the project — and the single biggest UX risk. We designed for the migrating user, not just the technical process.",
    items: [
      "Identity matching: existing HealthStream learners are recognised on first login via email + credential confirmation, no manual ticket required",
      "History fidelity: all migrated eCards, course completions, and Instructor-Led Events surface in the dashboard with original dates intact",
      "Transparency: a one-time \"Your migrated record\" screen shows exactly what carried over, with a way to flag discrepancies",
      "Continuity: rank and status carry over unchanged; expiration timers continue from the original certification date",
      "Recovery: any user who can't match identity can recover through an admin-mediated flow without losing place in the queue"
    ]
  },
  impact: {
    delivered: [
      "AAP's strategic independence from HealthStream — the dependency that drove the project was removed.",
      "A single, role-aware platform serving all four primary user types — Providers, Instructor Candidates, Instructors, Institutional Admins — plus AAP administrative surfaces, replacing what had been fragmented workflows.",
      "An identity system with a 7-digit Universal ID and SSO-ready account linking, ending the multi-account fragmentation problem for returning learners.",
      "A WCAG 2.1 AA-conformant LMS for one of the most clinically consequential certification programmes in US neonatal care.",
      "A design system contribution that codified the patterns (rank/status visualisation, eCard treatment, admin override flow, account merge UX) for re-use across future Laerdal medical-software products.",
      "Stronger Laerdal–AAP product partnership: a programme historically delivered through a third-party vendor is now jointly owned end-to-end."
    ],
    unmeasured:
      "Time-to-renewal for instructors after the dashboard checklist shipped, support ticket volume for eCard retrieval (expected significant drop), and institutional admin task completion time on bulk roster operations. A scoped post-launch study will quantify each of these."
  },
  reflection: [
    {
      heading: "Designing for the regulated edge cases",
      body: "Most of the design hours on this programme went into the 20% of flows that the average learner will never see — admin overrides, expired eCard retrieval, account merges, manual expiry adjustments. In a regulated domain, the edge cases are the brand. Get those right and the product feels trustworthy; get them wrong and a single bad story can erode credibility built over years."
    },
    {
      heading: "Identity as a design problem, not an engineering one",
      body: "The 7-digit Universal ID and the account linking flow weren't originally scoped as design work — they were posed as identity engineering. Treating them as UX problems (how does a learner *experience* the consolidation of their history?) is what made the migration feel like an upgrade rather than a forced re-registration."
    },
    {
      heading: "The dashboard is the case study",
      body: "If a panel reviewer takes one screen away from this work, it should be the instructor dashboard with the renewal checklist. It's where the domain model, the role-aware architecture, and the proactive UX philosophy all converge in one surface."
    },
    {
      heading: "What I'd do differently",
      body: "Earlier and more frequent generative research with active instructors. The decisions held up, but a few would have arrived faster (and more confidently) with two more rounds of moderated sessions against a working prototype. Some of that was capacity; some was the constraint of working inside an AAP regulated environment with restricted research access."
    },
    {
      heading: "Where this work goes next",
      body: "Post-launch analytics, a Phase 2 generative research round with active providers and institutional admins, an expansion of the design system into adjacent Laerdal medical-software surfaces, and the next consequential question: how does AI-assisted personalisation extend the platform without compromising the certification trust the programme is built on?"
    }
  ],
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
