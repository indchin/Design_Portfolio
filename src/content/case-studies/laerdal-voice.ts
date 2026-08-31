export type VoicePersona = {
  id: string;
  emoji: string;
  archetype: string;
  pitch: string;
  needs: string[];
  quote?: string;
};

export type ResearchInsight = {
  id: string;
  number: string;
  title: string;
  body: string[];
  quote?: { text: string; attribution?: string };
};

export type DesignPrinciple = { title: string; body: string };

export type ServiceFlowStep = { label: string; description?: string };

export type KeyDecision = {
  id: string;
  number: string;
  title: string;
  body: string[];
  rationale: string;
  visualLabel?: string;
  visualDescription?: string;
};

export type ProviderRow = {
  provider: string;
  primaryUse: string;
  strengths: string;
};

export type VoiceType = {
  id: string;
  name: string;
  label: string;
  cost: string;
  quality: string;
  body: string;
  tag: "free" | "paid";
};

export type MvpEpic = {
  number: string;
  title: string;
  body: string;
  features: string[];
};

export type RequestFlowStep = {
  actor: string;
  action: string;
  note?: string;
};

export type Usp = {
  id: string;
  number: string;
  title: string;
  body: string;
  tag: string;
  visualLabel: string;
  visualDescription: string;
};

export type ReflectionItem = { heading: string; body: string };

export type VoiceCaseStudy = {
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
  personas: VoicePersona[];
  insights: ResearchInsight[];
  vision: {
    shift: { from: string; to: string };
    statement: string;
  };
  principles: DesignPrinciple[];
  serviceFlow: {
    before: ServiceFlowStep[];
    after: ServiceFlowStep[];
    beforeSummary: string;
    afterSummary: string;
  };
  voiceTypes: VoiceType[];
  mvpEpics: MvpEpic[];
  requestFlow: {
    intro: string;
    steps: RequestFlowStep[];
  };
  voiceExpert: VoicePersona;
  usps: Usp[];
  decisions: KeyDecision[];
  providers: ProviderRow[];
  architectureCapabilities: { title: string; body: string }[];
  impact: {
    delivered: string[];
    unmeasured: string;
  };
  reflection: ReflectionItem[];
  toc: { id: string; label: string }[];
};

export const voiceCaseStudy: VoiceCaseStudy = {
  meta: {
    title: "Laerdal Voice Service Platform",
    tagline:
      "Designing a shared AI voice infrastructure for clinical simulation across six Laerdal product teams.",
    role: "Lead UX Designer & Design Researcher, Laerdal Bangalore",
    timeline: "2024 – Present · Multi-team programme",
    platform:
      "Voice Service Platform (VSP) — centralised TTS infrastructure with multi-provider AI voice support",
    partners:
      "Educational Services · vSim · VR Clinicals · QCPR · Stokes · Adapt · Scenario Cloud",
    teamContext:
      "Embedded design lead within a cross-functional team — Product Owner, Engineering Lead, Backend Engineers, AI/TTS Engineers, Education Specialists, and Clinical Subject Matter Experts from across the Laerdal product portfolio"
  },
  tension: [
    "Voice isn't a feature inside a clinical simulation. It's the experience. A simulated patient who sounds wrong — wrong pronunciation, wrong emotion, wrong latency — breaks the suspension of disbelief that makes simulation work as learning. For Laerdal, voice is strategic infrastructure for products that train millions of clinicians.",
    "But voice didn't have an owner. Six different product teams — vSim, VR Clinicals, QCPR, Stokes, Adapt, Scenario Cloud — were each independently sourcing, managing, and integrating TTS voices. Same problem solved six different ways. Same voices often re-created. The same medical pronunciation issues debated in six separate threads.",
    "The cost curve was climbing — Azure endpoint fees, engineering bottlenecks, slow onboarding for every new product. And the strategic prize — AI-driven conversational simulation across the entire portfolio — was locked behind that fragmentation.",
    "I joined as Lead UX Designer & Design Researcher to lead the experience and service design of what became the Voice Service Platform (VSP) — Laerdal's centralised voice ecosystem."
  ],
  problem: {
    business:
      "Six product teams independently sourcing, configuring, and managing voices created duplicated effort and rising operational cost. Engineering became a bottleneck for every voice request. Onboarding a new product meant rebuilding voice infrastructure from scratch. Leadership had no visibility into which voices existed, where they were used, or what the total spend was across providers.",
    user:
      "Education Specialists — the clinical SMEs who care most about voice quality — could not find existing voices, verify medical pronunciation, request modifications, or deploy a voice without filing an engineering ticket. Product teams couldn't onboard quickly. Product Owners had no visibility into adoption or cost.",
    technical:
      "Azure Custom Voice endpoint costs were climbing with usage. Real-time simulations were sensitive to latency, especially for emotional and conversational moments. Some products (notably QCPR) required offline-capable voice. And voice quality drifted across products because each team integrated providers differently."
  },
  goals: [
    "Establish a shared voice infrastructure that any Laerdal clinical simulation product can adopt without rebuilding their own.",
    "Enable Education Specialists and Product Teams to discover, customise, preview, and deploy voices self-service — without filing engineering tickets.",
    "Guarantee clinical accuracy of medical pronunciation through a validation workflow, shared lexicon, and pronunciation testing tools.",
    "Optimise costs through caching, asset reuse, and a multi-provider strategy that lets Laerdal pick the right provider per voice — not per platform.",
    "Support offline-capable voice for high-fidelity training environments like QCPR where connectivity isn't guaranteed.",
    "Create the foundation for future AI-driven conversational simulation across the portfolio — a strategic capability the fragmented system couldn't have unlocked."
  ],
  method: {
    discovery: [
      {
        label: "Stakeholder interviews",
        value:
          "Across Educational Services, vSim, VR Clinicals, QCPR, Adapt, and Scenario Cloud teams — plus Product Owners, Developers, and Voice Service Engineers — mapping current workflows, pain points, and dependencies"
      },
      {
        label: "Service blueprint workshops",
        value:
          "Mapped the full voice request lifecycle: approval processes, technical dependencies, integration touchpoints, and the silent handoffs that were slowing onboarding"
      },
      {
        label: "Product ecosystem analysis",
        value:
          "Audited how each product was actually using voice — vSim, VR Clinicals, Stokes, QCPR, Adapt, Scenario Cloud — to surface duplication, gaps, and divergent needs"
      },
      {
        label: "Future-state visioning",
        value:
          "Co-created with product and engineering leads a vision of the platform as a strategic capability — not just a shared utility — to align stakeholders before any UI work began"
      }
    ],
    process: [
      { label: "Cadence", value: "Sprint-based delivery with design ahead of engineering by 1–2 sprints" },
      { label: "Artifacts", value: "Service blueprints, journey maps, IA diagrams, hi-fi UI in Figma, design tokens, accessibility specs" },
      { label: "Collaboration", value: "Continuous partnership with AI/TTS engineers on provider abstraction and latency budgets" },
      { label: "Validation", value: "Stakeholder reviews per sprint, internal usability sessions with Education Specialists" }
    ]
  },
  personas: [
    {
      id: "education-specialist",
      emoji: "🩺",
      archetype: "The Education Specialist",
      pitch:
        "Clinical SME (often a paediatric or critical-care educator) responsible for the learning value of every simulation — the person who notices when a patient voice pronounces a drug wrong.",
      needs: [
        "Find existing voices that match the clinical context",
        "Verify and test medical pronunciation before deployment",
        "Request voice modifications without engineering involvement",
        "Support multi-language and accent variants for global learner cohorts"
      ],
      quote:
        "We didn't know another team had already created a similar patient voice."
    },
    {
      id: "product-team",
      emoji: "🛠️",
      archetype: "The Product Team",
      pitch:
        "Engineers and designers integrating voice into vSim, VR Clinicals, QCPR, and the rest — they need to ship features, not maintain TTS infrastructure.",
      needs: [
        "Onboard a voice into a product in hours, not weeks",
        "Reliable APIs with sane latency budgets and clear fallback behaviour",
        "Offline-capable voice for connectivity-constrained training contexts",
        "Confidence the platform won't become a moving target underneath them"
      ]
    },
    {
      id: "product-owner",
      emoji: "📊",
      archetype: "The Product Owner / Director",
      pitch:
        "Senior leaders accountable for portfolio cost, adoption, and the strategic direction of clinical simulation at Laerdal.",
      needs: [
        "Visibility into voice adoption across products and teams",
        "Cost-per-voice and cost-per-product trends across providers",
        "Confidence in the platform's scalability — providers, languages, AI experiences",
        "A foundation that supports future AI-driven conversational simulation"
      ]
    }
  ],
  voiceTypes: [
    {
      id: "azure-standard",
      name: "Azure Voices",
      label: "Standard (Microsoft Azure)",
      cost: "Free of charge",
      quality: "Less natural — synthetic-sounding",
      body:
        "Azure Standard Voices are the inbuilt TTS voices provided by Microsoft Azure at no cost. They cover a wide range of languages and accents but produce output that sounds noticeably synthetic. Suitable for low-stakes narration or utility contexts where cost is a constraint.",
      tag: "free"
    },
    {
      id: "azure-custom",
      name: "Custom Voices",
      label: "Custom AI Voice (Microsoft Azure)",
      cost: "$4 per hour per active endpoint — charged regardless of actual usage",
      quality: "High — closely resembles a human voice",
      body:
        "Custom Voices are AI-generated neural voices built and hosted on Azure. They deliver significantly higher naturalness and clinical credibility — critical for simulation. However, they are expensive: Azure charges $4 per active endpoint URL per hour. This means an open endpoint costs money even when no one is using it. Creating a new Custom Voice is also a tedious, time-consuming process. VSP was designed specifically to manage this cost exposure by centralising endpoint activation and enabling reuse.",
      tag: "paid"
    }
  ],
  voiceExpert: {
    id: "voice-expert",
    emoji: "🎙️",
    archetype: "The Voice Expert (VE)",
    pitch:
      "A specialised internal role responsible for voice quality, medical pronunciation, and the approval of voice configuration requests. The gatekeeper between Education Specialists' requests and the platform's voice assets.",
    needs: [
      "A request dashboard showing all pending modulation and activation requests",
      "Approve or reject requests with a reason — with notifications sent to the requester",
      "Configure voices (pitch, speaking rate) on behalf of requesters",
      "Activate or suspend Custom Voice endpoints — with full awareness of cost implications",
      "Manage the shared pronunciation lexicon and validate medical terminology"
    ],
    quote:
      "Every custom endpoint I leave open is costing the organisation money. I need to see exactly which ones are active and be able to shut them down when they're idle."
  },
  mvpEpics: [
    {
      number: "01",
      title: "User Management",
      body: "Creation of user profiles and authorisation. Only authorised users can log in to VSP, with access added or revoked by an admin.",
      features: ["User profile creation", "Role assignment", "Access revocation by admin"]
    },
    {
      number: "02",
      title: "User Log In / Log Out",
      body: "SSO integration, standard sign-in, password reset, and secure sign-out. Users can authenticate via SSO or conventional credentials.",
      features: ["Single sign-on (SSO)", "Standard sign-in", "Password reset", "Secure sign-out"]
    },
    {
      number: "03",
      title: "Role Management",
      body: "Role-based access privileges for each persona. Admins manage users and voices; VSP Users request and browse.",
      features: [
        "Admin: manage users, approve/reject requests, activate/suspend voices",
        "VSP User: initiate modulation or activation requests, search, play/pause samples"
      ]
    },
    {
      number: "04",
      title: "Voice Library",
      body: "The full catalogue of cached Azure and Custom voices — browsable and previewable on the dashboard.",
      features: ["Full voice list", "Play / pause audio controls", "Pagination", "Custom audio suspension"]
    },
    {
      number: "05",
      title: "Search & Filter",
      body: "Users find appropriate voices using dropdown filters, manual text input, and dynamic personalised filters.",
      features: ["Filter by language, gender, accent, type", "Manual text search", "Sort controls", "Reset filters"]
    },
    {
      number: "06",
      title: "Voice Configuration",
      body: "Adjustable pitch and speaking rate without creating a new Custom Voice — saving Azure endpoint costs by creating versions of existing voices.",
      features: [
        "Pitch adjustment",
        "Speaking rate adjustment",
        "Configured voice listed in library",
        "Admin/VE approval workflow for modulation requests"
      ]
    },
    {
      number: "07",
      title: "Request Management",
      body: "Request dashboard for each persona. Modulation and activation requests flow from VSP Users to Admin/VE for approval or rejection.",
      features: [
        "Request dashboard (Admin view + VSP User view)",
        "Approval and rejection with reason",
        "Request status tracking"
      ]
    },
    {
      number: "08",
      title: "Notifications",
      body: "Email notifications for registration, request approval, and request rejection. User registration is completed via email.",
      features: [
        "Registration email",
        "Request approved email",
        "Request rejected email (with reason)"
      ]
    }
  ],
  requestFlow: {
    intro:
      "Voice modification and activation requests flow from VSP Users through the Voice Expert (VE) or Admin before reaching the voice library. This gatekeeping controls both quality and endpoint cost — no new Custom Voice endpoint is ever activated without an authorised review.",
    steps: [
      { actor: "VSP User", action: "Initiates a modulation or activation request via the platform", note: "Can be an Education Specialist or Product Team member" },
      { actor: "Platform", action: "Routes request to the Request Dashboard", note: "Both Admin and Voice Expert can see pending requests" },
      { actor: "Voice Expert / Admin", action: "Reviews the request — checks pronunciation, cost implications, duplication", note: "Endpoint activation triggers $4/hr Azure cost" },
      { actor: "Voice Expert / Admin", action: "Approves or rejects with a mandatory reason field" },
      { actor: "Platform", action: "Sends email notification to the requester (approved or rejected with reason)" },
      { actor: "Platform", action: "Approved: voice appears in library (modulation) or endpoint activated (Custom Voice)", note: "Endpoints can be suspended by Admin/VE when idle to control cost" }
    ]
  },
  usps: [
    {
      id: "usp-modulation",
      number: "01",
      title: "Voice Modulation",
      tag: "Cost saving",
      body: "The voice of any voice actor can be modulated by tweaking pitch and speaking rate. The modulated audio is configured and treated as a new version of that voice actor's voice — without activating a new Custom Voice endpoint. This means multiple versions of a voice can exist and be reused, dramatically reducing the frequency of new endpoint activations and the $4/hr cost that comes with them.",
      visualLabel: "Voice modulation UI",
      visualDescription: "Pitch and speaking rate sliders with real-time audio preview, before/after comparison, and the configuration request submission form"
    },
    {
      id: "usp-accessible",
      number: "02",
      title: "Accessible to All Laerdal Users",
      tag: "Inclusivity",
      body: "VSP is designed for any Laerdal user — not just technical teams. A user can approach the platform with a plain requirement even if they don't know specific voice parameters (provider, endpoint, SSML). The platform guides them through discovery and request capture. This lowers the barrier to entry for Education Specialists, Instructional Designers, and Product Owners who previously had to go through engineering for any voice work.",
      visualLabel: "Onboarding and request capture UI",
      visualDescription: "Non-technical user flow: browsing the library → selecting a voice → describing a requirement in plain language → attaching a sample file → submitting without knowing any technical parameters"
    },
    {
      id: "usp-tts-trial",
      number: "03",
      title: "Text-to-Speech Trial for Azure Voices",
      tag: "Self-service",
      body: "Users can type text directly into the platform and generate audio using any available Azure voice — including pitch and rate fine-tuning — before committing to a configuration request. This \"try before you request\" pattern reduces wasted modulation cycles. To prevent unintended cost, TTS input is capped at 500,000 characters per month (Neural TTS limit), which is surfaced clearly in the UI with a live usage counter.",
      visualLabel: "TTS trial feature",
      visualDescription: "Text input area with character counter (500K/month limit shown), voice selector, pitch/rate controls, and an instant audio-generate button"
    },
    {
      id: "usp-download",
      number: "04",
      title: "Download Sample Audio",
      tag: "Self-service",
      body: "Standard Azure voices can be downloaded directly — no request or approval required. The TTS feature also allows users to fine-tune the audio for a given text, then download the final file for immediate use in a module. This eliminates the roundtrip for simple narration needs where a Custom Voice isn't required.",
      visualLabel: "Audio download flow",
      visualDescription: "Voice card with a direct download action for standard Azure voices; TTS output panel with fine-tune controls and a download button for the generated file"
    },
    {
      id: "usp-requirements",
      number: "05",
      title: "Reduces Manual Conversations for Requirements",
      tag: "Efficiency",
      body: "Before VSP, every voice request started with a back-and-forth between the requester and engineering to establish what was actually needed. VSP captures structured requirements upfront through the request form — voice type, use case, language, pitch/rate preferences, and a sample attachment for reference. This means the Voice Expert or Admin receives a complete brief on day one, minimising clarification loops and accelerating turnaround.",
      visualLabel: "Structured request form",
      visualDescription: "Request form with voice parameters, use-case context field, preferred language selector, and a sample audio file upload — all captured before the request reaches the VE queue"
    },
    {
      id: "usp-reusability",
      number: "06",
      title: "Reusability of Existing Voices",
      tag: "Cost saving",
      body: "The Voice Library gives every user a full browse view of all available audio files at a glance, enabling them to discover and choose existing files instead of requesting new activations. The search feature — with filters for language, gender, accent, provider, and clinical use case — makes finding the right voice fast. Reusability indicators on each card surface existing usage across products, popular voices, and platform recommendations, making the default action discovery rather than creation.",
      visualLabel: "Voice Library — reusability indicators",
      visualDescription: "Voice catalogue cards showing: which products currently use this voice, a 'Popular' badge for high-reuse voices, and a 'Recommended' indicator for platform suggestions"
    }
  ],
  insights: [
    {
      id: "insight-duplication",
      number: "01",
      title: "Teams were recreating voices that already existed elsewhere",
      body: [
        "The same patient voice — adult male in distress, paediatric calm narration, instructor neutral — was being re-created across multiple product teams because there was no shared catalogue. No one could see what already existed."
      ],
      quote: {
        text: "We didn't know another team had already created a similar patient voice.",
        attribution: "Education Specialist, vSim team"
      }
    },
    {
      id: "insight-engineering-bottleneck",
      number: "02",
      title: "Voice onboarding required engineering involvement at every step",
      body: [
        "Every new voice request — from sourcing the right provider to configuring the endpoint to integrating it into the product — flowed through engineering. Turnaround times ranged from several days to several weeks, with no self-service path for Education Specialists or Product Teams."
      ]
    },
    {
      id: "insight-pronunciation",
      number: "03",
      title: "Medical pronunciation consistency was critical — and fragile",
      body: [
        "Even small pronunciation errors — a drug name misread, an anatomical term stressed wrong — measurably reduced simulation credibility and learner trust. Each product was solving this independently, with no shared lexicon, no validation workflow, and no way to test pronunciation before deployment."
      ]
    },
    {
      id: "insight-divergent-needs",
      number: "04",
      title: "Different products had radically different voice requirements",
      body: [
        "There is no single \"best voice\" for clinical simulation. vSim needed accurate medical narration; VR Clinicals needed emotional realism; QCPR needed offline feedback; Stokes needed standardised TTS delivery. A one-size-fits-all platform would have failed. The platform had to support divergent needs through flexibility, not uniformity."
      ]
    }
  ],
  vision: {
    shift: {
      from: "How do we create more voices?",
      to: "How do we create a reusable voice ecosystem?"
    },
    statement:
      "A centralised voice platform that enables teams to discover, reuse, customise, and deploy voices independently — and becomes the default voice layer powering every Laerdal clinical simulation product."
  },
  principles: [
    {
      title: "Self-service first",
      body:
        "Reduce dependency on engineering teams. Every common workflow — search, preview, configure, deploy — should be doable by an Education Specialist or Product Team without filing a ticket."
    },
    {
      title: "Reuse before create",
      body:
        "Surface existing voices, popular voices, and recommended voices before any new-voice creation flow. The default action is discovery, not generation."
    },
    {
      title: "Clinical accuracy matters",
      body:
        "Medical pronunciation isn't a polish item — it's the difference between a credible simulation and one learners discount. The platform has to make pronunciation validation a first-class workflow."
    },
    {
      title: "Platform over project",
      body:
        "Every design decision is made for the ecosystem, not for any single product team's immediate request. Where local needs conflict with platform needs, platform wins."
    },
    {
      title: "Scalability by default",
      body:
        "Design for the future state — multiple providers, multiple languages, AI-driven conversational experiences — not just today's known voices. Abstract the provider so the experience never has to change as the providers evolve."
    }
  ],
  serviceFlow: {
    beforeSummary:
      "Voice requests required multiple handoffs across teams, with engineering as the gatekeeper at every step. Turnaround time: days to weeks.",
    before: [
      { label: "Voice request", description: "Education Specialist files a ticket" },
      { label: "Engineering team", description: "Triages, scopes, schedules the work" },
      { label: "Provider setup", description: "Engineers configure the TTS endpoint" },
      { label: "Testing", description: "Manual validation cycles, often with another handoff" },
      { label: "Deployment", description: "Engineering deploys into the product integration" }
    ],
    afterSummary:
      "Self-service workflow with the platform owning the heavy lifting. Education Specialists and Product Teams move directly from discovery to deployment. Turnaround time: minutes to hours.",
    after: [
      { label: "Discover voice", description: "Search the catalogue, preview samples" },
      { label: "Configure", description: "Adjust pronunciation, language, or accent inline" },
      { label: "Preview", description: "Hear the final voice before deploying" },
      { label: "Deploy", description: "One-click deployment to the target product" }
    ]
  },
  decisions: [
    {
      id: "voice-library",
      number: "01",
      title: "The Voice Library — search-first, reuse-first discovery",
      body: [
        "The single most-used surface in the platform. Designed as a searchable catalogue with filters across language, gender, age, accent, provider, and clinical use case — plus an instant audio-preview pattern so users can hear a sample without committing to a configuration flow.",
        "Reusability indicators surface existing usage, popular voices, and platform recommendations directly in the catalogue. The default action is reuse, not create."
      ],
      rationale:
        "Insight 1 — teams were recreating voices because they couldn't see what existed. The library is the structural answer: make existing voices visible, comparable, and instantly auditionable.",
      visualLabel: "Voice Library catalogue",
      visualDescription:
        "Searchable grid of voices with filters (language / gender / age / accent / provider / use case), audio-preview button on each card, and reusability indicators (used by N products, popular, recommended)"
    },
    {
      id: "clinical-pronunciation",
      number: "02",
      title: "Clinical pronunciation as a first-class workflow",
      body: [
        "A dedicated workflow for medical terminology validation: shared lexicon of clinical terms, pronunciation testing per voice, in-context audio comparison, and a way for Education Specialists to submit and confirm pronunciation corrections without engineering involvement.",
        "Pronunciation entries are shared across the platform — when one team verifies a drug name, every product benefits."
      ],
      rationale:
        "Insight 3 — pronunciation was the highest-stakes detail and the most fragile point in the simulation. Making it self-service and shared turned an engineering escalation into a platform feature.",
      visualLabel: "Medical pronunciation validation",
      visualDescription:
        "Side-by-side comparison: original voice rendering vs. corrected pronunciation, with the lexicon entry, the test phrase, and the confirmation flow"
    },
    {
      id: "dashboard",
      number: "03",
      title: "The Dashboard — visibility as a design principle",
      body: [
        "A platform owner's dashboard surfacing voice usage, product adoption, provider utilisation, translation request volume, endpoint usage, and cost trends.",
        "The dashboard isn't just operational reporting — it's the surface that turned VSP from a utility into a measurable business platform that leadership engages with."
      ],
      rationale:
        "Adoption and cost weren't visible before VSP — leadership had no surface to engage with the platform strategically. The dashboard makes adoption legible and creates the conditions for portfolio-level decisions.",
      visualLabel: "Platform dashboard",
      visualDescription:
        "Top-line KPIs (active voices, products using VSP, monthly cost, cache hit rate) with drill-down panels for provider utilisation, language coverage, and adoption trends per product"
    },
    {
      id: "multi-provider",
      number: "04",
      title: "Multi-provider strategy with a single experience layer",
      body: [
        "VSP integrates Azure Cognitive Services for enterprise reliability and language coverage, ElevenLabs for emotional realism, and Kokoro-82M for self-hosted offline-capable voice. Users never have to know which provider serves which voice — they search by clinical need and the platform routes to the right provider underneath.",
        "The provider abstraction means Laerdal can pick the right provider per voice — not per platform — and swap providers without changing the product integration."
      ],
      rationale:
        "Insight 4 — divergent product needs would have broken a single-provider platform. The abstraction is the platform's defining strategic asset: it lets the product evolve through provider evolution.",
      visualLabel: "Provider abstraction architecture",
      visualDescription:
        "Diagram showing the Voice Library, the provider routing layer, and the three underlying providers (Azure / ElevenLabs / Kokoro) with example voice → provider mappings"
    },
    {
      id: "cache-first",
      number: "05",
      title: "Cache-first experience — fast feels designed, not technical",
      body: [
        "Common voice phrases are cached at the edge so they return instantly. The user experience is designed around the cache hit — instant playback feels like a designed interaction, not a backend optimisation.",
        "When a phrase isn't cached, a designed in-between state plays — never a blank-screen wait — and the result is cached for the next user."
      ],
      rationale:
        "Latency on real-time voice during simulations is an experience problem before it's a backend problem. Designing the cache hit and the cache miss as two designed states makes the entire system feel responsive even when the underlying provider is slow.",
      visualLabel: "Cache-first interaction",
      visualDescription: "State diagram: cache hit (instant), cache miss (designed in-between state), and subsequent cache population"
    },
    {
      id: "offline-qcpr",
      number: "06",
      title: "Offline-capable voice for QCPR",
      body: [
        "QCPR — quality CPR training — runs in environments where connectivity isn't guaranteed. The voice feedback is also one of the most consequential moments in the training (real-time feedback during chest compressions).",
        "VSP supports offline-capable voice models (Kokoro-82M) deployed locally to the training device. The same voice abstraction handles online and offline — the product integration doesn't change."
      ],
      rationale:
        "Insight 4 — QCPR's offline requirement would have forced a separate voice stack without the platform. Designing offline as a first-class path inside the same platform kept QCPR on VSP and let the offline learning improve every other product over time.",
      visualLabel: "Offline voice deployment flow",
      visualDescription: "Flow showing how an offline voice is selected, packaged, and deployed locally to a QCPR training device"
    }
  ],
  providers: [
    {
      provider: "Azure Cognitive Services",
      primaryUse: "Enterprise-scale TTS, broad language coverage",
      strengths: "Reliability, language breadth, integration with Microsoft cloud"
    },
    {
      provider: "ElevenLabs",
      primaryUse: "Emotionally expressive voices, character realism",
      strengths: "Voice quality, expressive range, custom voice creation"
    },
    {
      provider: "Kokoro-82M",
      primaryUse: "Self-hosted, offline-capable voice",
      strengths: "Cost control, offline deployment, no per-request cloud fees"
    }
  ],
  architectureCapabilities: [
    {
      title: "Provider abstraction",
      body:
        "A single voice request from a product never specifies which provider should serve it. The platform routes based on voice characteristics, latency budget, cost target, and offline availability."
    },
    {
      title: "Cache-first delivery",
      body:
        "Hot phrases — clinical narrations, common instructor lines, recurring patient utterances — are cached aggressively. Cache hit rate is a platform-level KPI surfaced in the dashboard."
    },
    {
      title: "Offline-capable deployment",
      body:
        "Voices marked offline-capable can be packaged and deployed locally — critical for QCPR and field training environments where connectivity isn't guaranteed."
    },
    {
      title: "Shared clinical lexicon",
      body:
        "Pronunciation entries (drug names, anatomical terms, condition vocabulary) are platform-shared. A correction made by one Education Specialist benefits every product."
    }
  ],
  impact: {
    delivered: [
      "A shared voice infrastructure adopted across vSim, VR Clinicals, QCPR, Stokes, Adapt, and Scenario Cloud — six product teams replaced six fragmented voice stacks with one platform.",
      "Self-service workflow — Education Specialists and Product Teams now discover, configure, preview, and deploy voices without filing engineering tickets. Onboarding time dropped from weeks to hours.",
      "Reduced operational overhead — duplicate voice creation effort eliminated, engineering bottlenecks removed, Azure endpoint management consolidated.",
      "Cost optimisation through caching and provider abstraction — Laerdal can now pick the right provider per voice (Azure / ElevenLabs / Kokoro) instead of the right provider per platform.",
      "Clinical credibility — shared pronunciation lexicon and validation workflow give every Laerdal product the same baseline of medical accuracy.",
      "Strategic foundation — VSP is the substrate the next generation of AI-driven conversational simulation will run on. The platform unblocked work that the fragmented system would have stalled indefinitely."
    ],
    unmeasured:
      "Cache hit rate improvements at scale, total cost-per-voice trend lines across providers, adoption-velocity benchmarks per product team, and learner-side credibility gains from improved pronunciation consistency. A Phase 2 measurement framework is in preparation."
  },
  reflection: [
    {
      heading: "The hardest UX problem was the org chart, not the screens",
      body:
        "Six product teams with six different ways of working. The platform succeeds or fails on whether teams adopt it — and adoption is an experience problem, not a technical one. A lot of the design hours went into making integration feel like a gift rather than a tax."
    },
    {
      heading: "Caching is an experience pattern, not a backend pattern",
      body:
        "Designing the cache hit as a designed instantaneous interaction — and the cache miss as a designed in-between state instead of a blank wait — made the platform feel responsive even when the underlying provider was slow. The cache became part of the UX, not just an optimisation."
    },
    {
      heading: "Multi-provider abstraction was the most consequential decision",
      body:
        "Locking the platform to a single provider would have made the build simpler and the future smaller. The abstraction is what lets VSP support QCPR's offline needs, vSim's medical narration needs, and VR Clinicals' emotional realism needs from the same surface."
    },
    {
      heading: "The dashboard turned this from a utility into a business platform",
      body:
        "Before VSP, voice was an engineering line item no one tracked at the leadership level. The dashboard made cost, adoption, and provider utilisation legible — and that legibility is what funded the platform's continued investment."
    },
    {
      heading: "What I'd do differently",
      body:
        "More generative research with end learners — not just internal stakeholders — earlier in the project. The internal cross-team alignment was the urgent problem, but the long-term success of the platform depends on learner-perceived voice quality, and I'd want sharper baselines on that earlier."
    },
    {
      heading: "Where this work goes next",
      body:
        "AI-driven conversational simulation — voice that responds to learners in context, not just plays pre-scripted lines — is the next strategic question. VSP is the substrate that makes that question answerable. The next design work is figuring out how conversational AI extends the platform without compromising the clinical accuracy and trust that VSP is built on."
    }
  ],
  toc: [
    { id: "tension", label: "The tension" },
    { id: "problem", label: "Problem" },
    { id: "voice-types", label: "Voice types" },
    { id: "goals", label: "Goals" },
    { id: "method", label: "Method" },
    { id: "personas", label: "User groups" },
    { id: "insights", label: "Insights" },
    { id: "vision", label: "Vision" },
    { id: "service", label: "Service design" },
    { id: "mvp", label: "MVP scope" },
    { id: "request-flow", label: "Request flow" },
    { id: "usps", label: "Differentiators" },
    { id: "decisions", label: "Decisions" },
    { id: "architecture", label: "Architecture" },
    { id: "showcase", label: "Design showcase" },
    { id: "impact", label: "Impact" },
    { id: "reflection", label: "Reflection" }
  ]
};
