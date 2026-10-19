export type Persona = {
  id: string;
  emoji: string;
  archetype: string;
  pitch: string;
  experience: string;
  needs: string[];
  quote: string;
  // extended modal fields
  goals?: string[];
  frustrations?: string[];
  context?: string;
  tools?: string[];
};

export type Finding = {
  id: string;
  number: string;
  title: string;
  body: string[];
  implication: string;
  evidence?: string;
};

export type Decision = {
  decision: string;
  rationale: string;
  evidence: string;
};

export type Figure = {
  src: string;
  alt: string;
  caption?: string;
};

export type DesignSolution = {
  intro: string;
  comparison: {
    problemStatement: string;
    figures?: Figure[];
    options: {
      label: string;
      name: string;
      description: string;
      verdict: "rejected" | "chosen";
      verdictNote: string;
    }[];
  };
  moves: {
    title: string;
    before: string;
    after: string;
    drivenBy: string;
    figure?: Figure;
  }[];
  beyondPadding: {
    title: string;
    body: string;
    figure?: Figure;
  };
};

export type Accessibility = {
  intro: string;
  considerations: {
    title: string;
    body: string;
  }[];
  gap: string;
};

export type RoadmapItem = {
  feature: string;
  status: "Completed" | "On-going" | "Foundational";
  body: string;
  designSolution?: string;
  designSolutionLink?: string;
  designSolutionLinks?: { label: string; href: string }[];
  decision?: string;
  impact?: string;
};

export type ReflectionItem = {
  heading: string;
  body: string;
};

export type RecordingItem = {
  name: string;
  date: string;
  image: string;
};

export type ArtifactLink = {
  label: string;
  href: string;
};

export type ResearchArtifact = {
  label: string;
  description: string;
  href?: string;
  items?: RecordingItem[];
  links?: ArtifactLink[];
};

export type PhaseResearch = {
  recordings: ResearchArtifact;
  analysis: ResearchArtifact;
  report: ResearchArtifact;
};

export type AdaptCaseStudy = {
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
    stakes: string;
  };
  goals: string[];
  method: {
    discovery: { label: string; value: string }[];
    usability: { label: string; value: string }[];
    discoveryResearch: PhaseResearch;
    usabilityResearch: PhaseResearch;
  };
  personas: Persona[];
  findings: Finding[];
  designSolution: DesignSolution;
  decisions: Decision[];
  roadmap: RoadmapItem[];
  impact: {
    delivered: string[];
    unmeasured: string;
  };
  reflection: ReflectionItem[];
  toc: { id: string; label: string }[];
};

export const adaptCaseStudy: AdaptCaseStudy = {
  meta: {
    title: "Adapt Authoring Tool",
    tagline: "Designing for the people who build the courses",
    role: "Lead UI/UX Designer, Laerdal Bangalore (solo researcher and designer)",
    timeline: "Discovery: May–Aug 2024 · Usability testing: Jun–Jul 2025",
    platform: "Adapt — open-source eLearning authoring tool, Laerdal-customised instance",
    partners:
      "World Health Organisation, national resuscitation councils, government health ministries, Laerdal services teams across 14 countries",
    teamContext:
      "Embedded within the Adapt product team; collaborated with course creators in India, Norway, and the WHO programme"
  },
  tension: [
    "Adapt is the engine behind hundreds of clinical and public-health eLearning courses Laerdal delivers worldwide — courses that train frontline workers in India, run on WHO Academy, and ship inside paid simulator subscriptions. It is, in effect, mission-critical infrastructure.",
    "It also had never been studied.",
    "In five years of internal adoption, no one had sat down with the people who actually open Adapt every morning and asked them what their day looks like. Decisions about features, updates, and roadmap were being made on assumptions — assumptions that were quietly diverging from reality. Course creators were comparing Adapt unfavourably to Articulate Rise 360. Experienced users kept raising the same issues. Long-time champions of the platform were describing structural problems they had flagged years earlier.",
    "The risk was not abstract. If creators started defecting to Rise 360, Laerdal would lose the open-source flexibility, partner integrations (WHO Academy, Knowledge Hub), and institutional library that Adapt uniquely supported. The whole vision of \"build a course in two weeks\" depended on creators who wanted to be on the platform.",
    "I joined to change that — by replacing assumption with evidence."
  ],
  problem: {
    business:
      "Course creators were spending disproportionate time fighting the tool instead of building content. Delivery timelines were slipping, framework updates were breaking live courses without warning, and informal abandonment signals were appearing — most visibly, repeated unfavourable comparisons to a competitor (Articulate Rise 360) from experienced users.",
    user:
      "The people building these courses came from radically different backgrounds — a designer in Norway, a doctor in India, a project manager coordinating 14 languages — and Adapt was built as if they were one person. The interface assumed daily fluency, the workflow assumed solo creation, and the platform assumed updates would never break anything downstream. None of those assumptions held for any of them.",
    stakes:
      "Adapt is how Laerdal scales its mission. Every hour lost to tooling friction is an hour not spent training a midwife, a paramedic, or a community health worker. The cost of a slow authoring tool is measured in courses that don't ship."
  },
  goals: [
    "Understand who the actual course creators are — beyond job titles, in terms of how they relate to the platform.",
    "Map the end-to-end course creation workflow and find the points where it breaks.",
    "Identify the most critical usability pain points in the authoring interface.",
    "Surface unmet feature needs and prioritise them by evidence, not by who shouted loudest in meetings.",
    "Validate a proposed design solution — the global padding redesign in the Theming interface — with real users before development began."
  ],
  method: {
    discovery: [
      { label: "Format", value: "Semi-structured 45–60 minute qualitative interviews, remote" },
      { label: "Participants", value: "9 course creators across Laerdal India, Norway, and WHO Academy context" },
      { label: "Range", value: "From a 10+ year senior EdTech specialist to an SME who used the tool intensively for two years then went largely inactive" },
      { label: "Recruitment axes", value: "Geography (India, Norway, partner context) · Role (designer, SME, PM, technical lead) · Frequency (daily power user → occasional returner)" },
      { label: "Consent", value: "Participants gave consent for internal research use; names and identifying detail removed for publication." }
    ],
    usability: [
      { label: "Format", value: "Moderated remote usability testing with a Figma prototype" },
      { label: "Task focus", value: "Global padding settings — Approach A (block top + block bottom) vs Approach B (block top + component top)" },
      { label: "Participants", value: "8 course creators including returning Phase 1 voices and fresh perspectives" },
      { label: "Protocol", value: "Think-aloud, screen recording, structured post-task interview" },
      { label: "Consent", value: "Participants gave consent for internal research use; names and identifying detail removed for publication." }
    ],
    discoveryResearch: {
      recordings: {
        label: "Recordings",
        description: "9 semi-structured interview sessions, recorded with consent. Recordings are internal and not published.",
        items: []
      },
      analysis: {
        label: "Analysis",
        description: "Affinity-mapped transcripts, synthesised into 6 evidence-backed findings and 5 personas",
        items: []
      },
      report: {
        label: "Report",
        description: "Discovery research summary shared with the Adapt product team",
        href: "/work/adapt-authoring-tool/discovery-research-report"
      }
    },
    usabilityResearch: {
      recordings: {
        label: "Recordings",
        description: "8 moderated usability sessions, screen and think-aloud audio recorded. Recordings are internal and not published.",
        items: []
      },
      analysis: {
        label: "Analysis",
        description: "Task success, preference split (Approach A vs B), and comprehension issues coded per session",
        items: []
      },
      report: {
        label: "Report",
        description: "Usability findings and design recommendation shared ahead of development",
        href: "/work/adapt-authoring-tool/research-themes"
      }
    }
  },
  personas: [
    {
      id: "visual-storyteller",
      emoji: "🎨",
      archetype: "The Visual Storyteller",
      pitch: "Designer who contributes to course creation. Months-long gaps between sessions.",
      experience: "Infrequent to moderate · Strong in Figma & Premiere, weak in Adapt's back end",
      needs: ["Front-end live editor", "Component inspiration gallery", "Video interactivity inside courses"],
      quote: "It looks old… it looks like it's built in another century. We are so ahead.",
      goals: [
        "Produce visually distinctive courses that reflect the brand without fighting the tool",
        "Move fluidly between Figma and Adapt without losing the design intent",
        "Reduce the preview loop — see the output as she builds, not two screens away"
      ],
      frustrations: [
        "Adapt's back-end structure feels disconnected from the final rendered output",
        "Returning after a months-long gap means re-learning the interface from scratch",
        "No component gallery to draw inspiration from or reuse existing patterns",
        "Video interactivity is unavailable, limiting storytelling options significantly"
      ],
      context: "Works primarily in Figma and Premiere Pro for visual production. Opens Adapt infrequently — often after a project gap — to assemble the content created elsewhere. The mismatch between Adapt's structural authoring interface and her visual-first mindset creates friction every session.",
      tools: ["Figma", "Adobe Premiere Pro", "Adapt Authoring Tool", "CDN preview links"]
    },
    {
      id: "production-architect",
      emoji: "🏗️",
      archetype: "The Production Architect",
      pitch: "Senior power user. 8–10+ years on Adapt. Manages 430 courses in 14 languages.",
      experience: "Daily, deep · Comfortable with naming conventions, CSS, extensions",
      needs: ["Platform performance", "Instance-level governance", "Standardised tagging", "Native review tooling"],
      quote: "The whole idea of using the Adapt authoring tool is to do rapid development… you should be able to create an eLearning within two weeks.",
      goals: [
        "Deliver a complete eLearning course in two weeks — the platform's stated promise",
        "Enforce naming conventions and tagging standards across 430 courses and 14 languages",
        "Control framework updates so they never silently break live courses"
      ],
      frustrations: [
        "Framework updates break courses without warning — auditing 30+ active courses after each update",
        "No instance-level governance tools; naming conventions are enforced manually or not at all",
        "Internal review still runs over email and Excel; no in-platform commenting",
        "Long-standing structural problems remain only partly resolved"
      ],
      context: "The institutional memory of the Adapt platform. Has championed its adoption for years and built the house conventions that keep 430 courses coherent. Uses CSS and extensions fluently. Frustration is proportional to investment — this user believes in the platform and is most affected when it fails to deliver on its promise.",
      tools: ["Adapt Authoring Tool", "CSS overrides", "Excel (review tracking)", "Email", "SmartLink"]
    },
    {
      id: "mission-driven-sme",
      emoji: "🏥",
      archetype: "The Mission-Driven SME",
      pitch: "Subject matter expert, medical doctor. Used Adapt intensively 2020–2022, mostly inactive since.",
      experience: "Low · Depends entirely on a technical colleague for anything beyond content entry",
      needs: ["In-product help with short video guides", "Plain-language error messages", "Robust preview sharing"],
      quote: "I just hope that we find something more easier to use in the coming days.",
      goals: [
        "Enter and structure medical content accurately without needing a technical escort",
        "Share a working preview with clinical colleagues for review without CDN complexity",
        "Understand what went wrong when the tool throws an error — and fix it herself"
      ],
      frustrations: [
        "Error messages are technical and unactionable — 'it does not specify a good error'",
        "Cannot do anything beyond basic content entry without calling a colleague for help",
        "Was a heavy user 2020–2022; the platform's complexity made continued use unsustainable",
        "Preview sharing is fragile — CDN links break or require access she can't grant herself"
      ],
      context: "A medical doctor building training content for frontline health workers in India. Her courses have direct mission impact. She used Adapt intensively during COVID-era training programmes and retreated when the complexity outpaced the support available to her. Now mostly inactive — the highest-risk profile for platform abandonment.",
      tools: ["Adapt Authoring Tool (basic)", "Email (review)", "WhatsApp (quick peer review)", "Word (content drafting)"]
    },
    {
      id: "localisation-orchestrator",
      emoji: "🌍",
      archetype: "The Localisation Orchestrator",
      pitch: "Senior project manager. 20+ years at Laerdal. Coordinates 430 courses across 14 languages.",
      experience: "Medium · Understands the system architecture, not a developer",
      needs: ["Role-scoped reviewer access", "Automated update notifications", "Side-by-side translation review", "SmartLink/BAM integration"],
      quote: "Any automation or simplification, integration is helpful. And having a hotline is also very useful in case it's burning.",
      goals: [
        "Coordinate multilingual course delivery across 14 languages without manual handoffs",
        "Give regional reviewers access to specific courses without exposing the full platform",
        "Automate update notifications so teams aren't surprised by breaking changes"
      ],
      frustrations: [
        "Role-scoped access doesn't exist — reviewers get too much or too little platform access",
        "Side-by-side translation review requires leaving Adapt and working in external tools",
        "No automated notifications when a framework update affects a course in her portfolio",
        "SmartLink and BAM integration requires manual effort that creates synchronisation errors"
      ],
      context: "20+ years at Laerdal. The connective tissue between the platform, the partners, and the regional teams. Understands the system well enough to diagnose problems but not to fix them in code. Every manual process she manages represents a gap in platform capability — and she has built workarounds for all of them.",
      tools: ["Adapt Authoring Tool", "SmartLink", "BAM", "Excel (course registry)", "Email", "SharePoint"]
    },
    {
      id: "structured-services-educator",
      emoji: "🎓",
      archetype: "The Structured Services Educator",
      pitch: "End-to-end course owner. 20+ years Laerdal context. Builds simulator training in 16 languages.",
      experience: "Moderate · Competent with standard components, scouts other platforms for UI ideas",
      needs: ["Video chapter markers", "Confidence self-assessment component", "Discoverable component showcase"],
      quote: "I take courses from the eLearning… I take some screenshots to explore whether can I do something similar in my courses?",
      goals: [
        "Build immersive simulator-linked training that goes beyond static slides",
        "Discover what Adapt is actually capable of — without relying on word of mouth",
        "Add learner confidence self-assessment as a course component, not a workaround"
      ],
      frustrations: [
        "No component showcase or gallery — discovers new capabilities only by accident or peer tip",
        "Video chapter markers don't exist; long videos cannot be navigated or resumed",
        "Confidence self-assessment requires custom workarounds that are fragile across updates",
        "Takes screenshots from competitor courses to get ideas — the platform doesn't surface its own potential"
      ],
      context: "Owns courses end-to-end across 16 languages, from content planning through delivery. Has 20+ years of Laerdal context and a clear mental model of what good training looks like. Motivated and technically capable — her gap is discovery, not skill. She doesn't know what Adapt can do because the platform doesn't show her.",
      tools: ["Adapt Authoring Tool", "Simulator hardware interfaces", "Video editing tools", "Competitor platforms (for reference)"]
    }
  ],
  findings: [
    {
      id: "competency-threshold",
      number: "01",
      title: "The platform has a hidden competency threshold",
      body: [
        "Mastery is only possible through daily use, and it disappears during gaps. A designer returning after six months described it as starting over. A senior team lead described new joiners finding it \"very heavy to learn.\" A doctor was definitive: \"It does not specify a good error.\"",
        "This isn't a complaint. It's a structural property of the tool — and it explains the bottleneck dependency on a small number of internal experts (\"ask the EdTech specialist,\" \"ask the senior designer,\" \"ask the graphic manager\"). The pool of effective users is artificially small."
      ],
      implication:
        "Onboarding and contextual help need fundamental redesign. A front-end editor would lower the threshold most.",
      evidence: "Reported by 7 of 9 interview participants"
    },
    {
      id: "collaboration-email-excel",
      number: "02",
      title: "Collaboration is held together by email and Excel",
      body: [
        "No participant described a working in-platform mechanism for multi-person review. The journey was always the same: build → share CDN link → receive feedback over email or Excel → manually re-enter → repeat. One team was evaluating ZipBoard as an external commenting layer. Another was giving clients direct Adapt access — and watching them accidentally delete components."
      ],
      implication:
        "Inline commenting is the single highest-impact collaboration feature missing from the platform.",
      evidence: "Unanimous — every single interview produced this finding"
    },
    {
      id: "update-regressions",
      number: "03",
      title: "Platform updates are a delivery risk, not just an inconvenience",
      body: [
        "Framework updates broke courses without warning. The WHO Academy instance had been quarantined from general updates specifically because of this. One designer lost a Friday delivery deadline because an update changed fonts hours before her review window. Another had to audit all 30 of her active courses after an update to find what broke."
      ],
      implication:
        "A change-impact preview — \"which courses will this update affect?\" — would directly protect delivery timelines and reduce team stress."
    },
    {
      id: "missing-frontend-editor",
      number: "04",
      title: "The missing front-end editor is the primary usability gap",
      body: [
        "Articulate Rise 360 was raised, unprompted, by four of seven Phase 1 participants. The comparison was always the same: Rise lets you see your output as you build. Adapt makes you work in a back-end structure and click \"preview\" to see what you just did.",
        "Participants described this loop as slow, disorienting, and the single biggest reason returning users feel lost."
      ],
      implication:
        "A front-end editing mode is the most structurally transformative investment the team could make. Short of that, closing the back-end-to-preview cycle time would meaningfully improve the daily experience.",
      evidence: "Articulate Rise comparison raised unprompted by 4 of 7 senior participants"
    },
    {
      id: "scale-management",
      number: "05",
      title: "Scale-management problems are solved only for power users",
      body: [
        "Every team managing 50+ courses had invented its own naming convention, tag system, and asset library. These are self-built workarounds for a platform gap: there is no universal course management system in Adapt. Organisations are carrying invisible information-architecture overhead."
      ],
      implication:
        "A structured course library with search, filtering by language, tag, partner, and status would eliminate organisational debt currently carried by individuals."
    },
    {
      id: "padding-usability-test",
      number: "06",
      title: "Approach B is preferred — but the distinction is invisible from the controls",
      body: [
        "In the padding usability test, participants who understood the difference between Approach A and Approach B preferred B for reducing double-padding. But several couldn't tell the approaches apart from the settings panel alone. The difference was visible in the preview, not in the controls."
      ],
      implication:
        "Approach B is the stronger solution, but it needs better labelling, a live preview panel in the settings view, and clearer hierarchy naming (Page → Article → Block → Component).",
      evidence: "4 of 6 testers preferred B when they understood the distinction"
    }
  ],
  designSolution: {
    intro:
      "The findings pointed at one structural fix the team could validate and ship inside a single release cycle: the global padding system in the Theming interface. It is small on the surface and large underneath — spacing is the most-touched, most-overridden setting in every course, and getting it wrong forces the manual CSS workarounds nearly every power user had built. I treated it as the proving ground for evidence-led design on the Adapt team.",
    comparison: {
      problemStatement:
        "Adapt's spacing model produced \"double-padding\" — the bottom padding of one block stacked on top of the top padding of the next, so creators saw inconsistent gaps they couldn't predict from the controls and had to correct in CSS. I prototyped two ways to model spacing and tested them head-to-head.",
      options: [
        {
          label: "Approach A",
          name: "Block top + block bottom",
          description:
            "Keeps the existing mental model — every block owns padding on both its top and bottom edge. Familiar to existing users, but it is the source of the double-padding problem: two adjacent blocks each contribute a gap, and the combined space is invisible from either block's settings.",
          verdict: "rejected",
          verdictNote: "Preserves the bug the redesign exists to remove."
        },
        {
          label: "Approach B",
          name: "Block top + component top",
          description:
            "Spacing flows in one direction — top-down — following the natural Page → Article → Block → Component hierarchy. Each element controls only the space above it, so gaps never stack unpredictably and the manual CSS overrides disappear.",
          verdict: "chosen",
          verdictNote: "Preferred by 4 of 6 testers who understood the distinction."
        }
      ]
    },
    moves: [
      {
        title: "Live preview inside the settings panel",
        before:
          "Adjust a value → click Preview → wait for render → return to settings → adjust again. Testers repeated this loop in every single session, often 3–5 times for one spacing change.",
        after:
          "A preview pane sits beside the controls and updates as values change — the spacing decision is made where it is set, not two screens away.",
        drivenBy:
          "The single most-observed behaviour in the usability test; the distinction between A and B was only ever visible in the preview, never in the controls."
      },
      {
        title: "Relational labels with pixel tooltips",
        before:
          "Raw pixel inputs that meant little to non-developers and forced power users to remember house conventions.",
        after:
          "Standard / Half / Double / Remove as primary labels, with a pixel value on hover (\"Standard = 24px\"). Plain-language for the SME, precise for the architect.",
        drivenBy:
          "One tester (U8) explicitly asked for a reference table mid-session; the relational labels tested as immediately understood."
      },
      {
        title: "Explicit hierarchy naming",
        before:
          "Controls referred to \"block\" and \"component\" with no visible relationship between them, so testers couldn't tell what a given setting would actually move.",
        after:
          "Settings are labelled against the real structure — Page → Article → Block → Component — so the control names match the thing on screen.",
        drivenBy:
          "Several testers couldn't distinguish the two approaches from the panel alone (Finding 06)."
      },
      {
        title: "Migration safety — new courses only, by default",
        before:
          "A platform-wide spacing change would silently reflow hundreds of live courses already mixing old and new padding.",
        after:
          "The new model applies to new courses by default, with an opt-in migration path for existing ones — no silent breakage of delivered work.",
        drivenBy:
          "Tester U5: \"I might have to redo my old paddings… they already have a lot of this mix of the old way.\""
      }
    ],
    beyondPadding: {
      title: "How this scales to the P0 — the front-end editor",
      body:
        "The padding redesign is deliberately a wedge, not the destination. Its core principle — see the result where you make the change — is the same principle behind the front-end editing mode that four experienced participants raised unprompted as the platform's biggest gap. Validating the in-context preview at the scale of one setting de-risks the argument for it at the scale of the whole editor: it proves the interaction model works for Adapt's users before the team commits to the far larger build. The spacing work is the smallest shippable proof of the direction the platform needs to move."
    }
  },
  decisions: [
    {
      decision: "Adopt Approach B for global padding — remove \"block bottom,\" replace with \"component top\"",
      rationale:
        "Reduces double-padding, aligns with natural top-down hierarchy, eliminates manual CSS overrides currently needed in most courses.",
      evidence: "Preferred by 4 of 6 participants who understood the distinction"
    },
    {
      decision: "Add a live preview panel in the Theming settings view",
      rationale:
        "Kills the apply → preview → return → adjust loop participants demonstrated repeatedly across every session.",
      evidence: "Observed pattern across all 6 usability sessions; principle articulated by a returning Phase 1 participant (U4)"
    },
    {
      decision: "Use relational labels with pixel tooltips (\"Standard = 24px\")",
      rationale:
        "\"Standard / Half / Double / Remove\" is well understood by participants; pixel context bridges abstract → visual intent for power users.",
      evidence: "One tester (U8) explicitly requested a reference table during the session"
    },
    {
      decision: "Apply the new padding system to new courses only by default",
      rationale:
        "Protects legacy work. An opt-in migration path prevents silent breakage of existing courses already mixing old and new spacing.",
      evidence: "Tester U5: \"I might have to redo my old paddings… they already have a lot of this mix of the old way.\""
    }
  ],
  roadmap: [
    {
      feature: "WYSIWYG editing mode",
      status: "Foundational",
      body: "This came from the research findings which later led to Adapt Studio — it was the foundation for building Adapt as Adapt Studio (AI smart authoring tool).",
      designSolution: "Prioritised front-end / WYSIWYG editing as the north-star fix for the back-end-to-preview disconnect surfaced across discovery and usability testing, rather than another incremental patch to the back-end-first editor.",
      decision: "Build the next generation of Adapt around live, in-context editing instead of retrofitting preview onto the existing structure — this became the founding principle of Adapt Studio.",
      impact: "Became the foundation for Adapt Studio, the AI-powered authoring tool now being built around this principle."
    },
    {
      feature: "SSO login",
      status: "Completed",
      body: "The pain point is users have to use different URLs manually to log in to different instances. The SSO login dashboard flow provides a solution to launch instances from a single dashboard.",
      designSolution: "A single SSO login dashboard listing every instance a user has access to, replacing manually-typed, instance-specific URLs.",
      decision: "Centralise authentication behind one dashboard rather than maintaining separate login flows per instance.",
      impact: "Users launch any instance from a single sign-on, removing the manual URL-switching step entirely."
    },
    {
      feature: "Adapt Padding",
      status: "Completed",
      body: "Users had the pain point that they only had the option to set padding for a block — for Page, Article, and Component they had to add CSS for padding. Adding padding functionality to Adapt settings provides an easy way to set global paddings for Page, Article, Block, and Component, which also brings more consistency.",
      designSolution: "Prototyped and usability-tested two padding models — Approach A (block top + block bottom) vs Approach B (block top + component top) — rather than shipping a guess.",
      decision: "Adopted Approach B, with a live preview panel and relational labels, validated by 4 of 6 usability testers.",
      impact: "First design decision shipped through structured validation rather than internal debate — setting a precedent for evidence-led development on the Adapt team."
    },
    {
      feature: "Custom Theme",
      status: "Completed",
      body: "The pain point is the custom theme has a lot of options and there is no live preview after changing or setting up — users have to trigger preview to see the changes. The new custom theme has a lot of automation and fewer options, which reduces not only cognitive load for users but also, with LIVE preview, helps them see how the changes impact the course design.",
      designSolution: "A rebuilt custom theme experience with fewer, more automated options and an always-on live preview pane beside the controls.",
      decision: "Trade raw option-count for automation, and replace the manual preview trigger with a live preview.",
      impact: "Reduced cognitive load for theme setup and lets users see the effect of a change on the course instantly."
    },
    {
      feature: "Adapt Translation",
      status: "Completed",
      body: "Lots of options and a less intuitive UI. The new Translation UI is more intuitive and has a wizard along with AI functionality for translating the course.",
      designSolution: "A wizard-driven translation flow with AI-assisted translation, replacing the dense, options-first UI.",
      decision: "Guide translation step-by-step instead of exposing every setting at once, and let AI handle the first-pass translation.",
      impact: "A more intuitive, faster path to translating a course into additional languages."
    },
    {
      feature: "Course Menu",
      status: "Completed",
      body: "Improved Course menu to improve the usability and intuitiveness.",
      designSolution: "Reworked course menu structure and interactions for clearer wayfinding.",
      decision: "Prioritise usability and intuitiveness over preserving the existing menu layout.",
      impact: "Improved usability and findability when navigating course structure."
    },
    {
      feature: "Adapt Studio",
      status: "On-going",
      body: "Adapt Studio is planned from Tirtile 1 (Jan 2026), bringing a new look and feel with overall improvement in user experience, and updates two flows for course creation — build from scratch and build with AI — with an improved course dashboard and AI assistant.",
      designSolution: "A new look and feel with two course-creation flows — build from scratch and build with AI — plus an improved dashboard and AI assistant, carrying the WYSIWYG foundation into production. Took the initiative to code the design directly in VS Code with Claude, producing a fully functional frontend the dev team can use as-is and integrate straight into the existing backend — cutting the overall turnaround time. Figma Make was used alongside this to produce design prototypes for the product team to validate the direction before it's built.",
      decision: "Consolidate the future authoring experience into a single product, Adapt Studio, launching from Tirtile 1 (Jan 2026) — designed and coded in parallel, with Figma Make prototypes used to validate direction with the product team before dev handoff.",
      impact: "Expected to lift the overall course-creation experience once live. Coding the frontend directly reduces dev turnaround time by handing over functional, integration-ready code instead of static designs — the vehicle bringing the earlier research findings to market."
    }
  ],
  impact: {
    delivered: [
      "First evidence-grounded user picture in five years. The five personas now anchor design reviews, sprint planning, and stakeholder communication on the Adapt product team.",
      "First design decision shipped through structured validation. The global padding redesign was approved for development based on usability evidence rather than internal debate — setting a precedent.",
      "Prioritisation language shift. Discussions about what to build next now reference participants by ID and findings by number. The roadmap above is in active use.",
      "Documented retention risk. The Articulate Rise 360 comparison — raised unprompted by four experienced participants — is now visible to product leadership as a strategic signal, not an offhand grumble."
    ],
    unmeasured:
      "Course delivery cycle time after the front-end editor ships, framework-update-related incident rate after impact-preview ships, informal abandonment signals (Rise 360 mentions) six months from now. A scoped Phase 3 follow-up will close the loop."
  },
  reflection: [
    {
      heading: "What I'd do differently",
      body: "Run a small quantitative pulse survey alongside Phase 1 — a five-question instrument sent to all 30+ course creators across Laerdal, asking about frequency of use, confidence, and likelihood to recommend. The qualitative depth was right for surfacing the problems; the survey would have given a statistical view of how widely each pain point is felt, strengthened prioritisation, and given a baseline to measure against post-changes."
    },
    {
      heading: "What surprised me",
      body: "The Articulate Rise 360 comparison. I went in expecting a feature gripe list; I came out with a competitive retention risk no one on the product team had explicitly named. The same comparison, repeated by four experienced participants in different countries, was the most strategically significant data point in the entire study — and it would not have surfaced in a survey."
    },
    {
      heading: "What I learned about the people, not the tool",
      body: "Every participant cared deeply about the courses they were building. The Visual Storyteller wanted Adapt to be beautiful because she was proud of her work. The Production Architect wanted updates to be safe because they had championed the platform. The Mission-Driven SME wanted simpler help because her courses reached rural India. The friction in the tool was friction between people and their mission. Reframing the work that way — as removing obstacles from a mission, not as fixing a UI — is what I'd bring to the next study."
    },
    {
      heading: "Where this goes next",
      body: "A scoped Phase 3 follow-up six months after the P0 features ship — measuring delivery cycle time, support ticket volume, and Rise 360 mentions — would close the loop and prove (or disprove) the strategic value of this work."
    }
  ],
  toc: [
    { id: "tension", label: "The tension" },
    { id: "problem", label: "Problem" },
    { id: "goals", label: "Goals" },
    { id: "method", label: "Method" },
    { id: "personas", label: "Personas" },
    { id: "findings", label: "Findings" },
    { id: "roadmap", label: "Roadmap" },
    { id: "reflection", label: "Reflection" }
  ]
};
