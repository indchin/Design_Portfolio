import type { Portfolio } from "@/types/portfolio";

export const portfolio: Portfolio = {
  owner: {
    name: "Chinmay Sharma",
    title: "Lead UX Designer · AI Product Designer",
    experience: "10 years",
    statement:
      "I design research-led, accessible, AI-powered products in healthcare and ed-tech — from early discovery and journey mapping to scalable design systems and validated solutions. My work sits at the intersection of UX, product strategy, and AI execution.",
    location: "Bengaluru, India",
    email: "indchinmay@gmail.com",
    resumeUrl: "/resume.pdf",
    calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/your-name/intro",
    socials: [
      { label: "LinkedIn", href: "https://linkedin.com/in/chinmaysharmadesigner/" },
      { label: "Email", href: "mailto:indchinmay@gmail.com" }
    ]
  },
  principles: [
    {
      title: "Evidence over assumption",
      body: "Qualitative and quantitative research shape direction before interface polish — every design decision should be traceable to a participant, a metric, or a constraint."
    },
    {
      title: "Accessibility is product quality",
      body: "WCAG 2.1 conformance, inclusive interaction patterns, and screen-reader-first thinking are treated as core requirements, not late-stage compliance."
    },
    {
      title: "Systems that scale teams",
      body: "Tokenised foundations, governance models, and contribution workflows let small teams ship consistent, accessible product surfaces at speed."
    },
    {
      title: "AI as a design material",
      body: "AI accelerates research synthesis, prototyping, and adaptive experiences — but human judgement owns the outcome and the user's trust."
    }
  ],
  timeline: [
    {
      year: "2014",
      company: "Janaagraha",
      title: "Graphic Designer",
      body: "Designed brand, print, and digital communications for civic-tech non-profit work — foundations in typography, layout, and visual storytelling."
    },
    {
      year: "2015 – 2018",
      company: "Wheelstreet · Scripbox",
      title: "Graphic Designer → UI Designer",
      body: "Moved from brand work into product UI — first hands-on exposure to product flows, responsive design, and fintech UX patterns."
    },
    {
      year: "2018 – 2020",
      company: "Impelsys",
      title: "Sr. Interaction Designer",
      body: "Led design for an exam engine for educators, and contributed to ShopCPR for the American Heart Association — large-scale medical eLearning surfaces in production."
    },
    {
      year: "2020 – Present",
      company: "Laerdal Medical",
      title: "Lead Interaction Designer",
      body: "End-to-end design for the Neonatal Resuscitation Program (American Academy of Pediatrics), the Adapt Authoring Tool research initiative, Certificate Site, and Laerdal VOICE platform.",
      current: true
    },
    {
      year: "2024 – Now",
      company: "Laerdal Medical · AI focus",
      title: "AI-driven Product Design",
      body: "Designing AI-powered learning experiences, multi-agent workflows, and adaptive content systems — translating LLM capabilities into accessible, human-centred product surfaces.",
      current: true
    }
  ],
  skills: [
    { label: "User Research", value: 94, group: "Research" },
    { label: "Usability Testing", value: 92, group: "Research" },
    { label: "Interaction Design", value: 95, group: "Craft" },
    { label: "Design Systems", value: 92, group: "Craft" },
    { label: "Accessibility (WCAG 2.1)", value: 93, group: "Quality" },
    { label: "AI Product Design", value: 88, group: "Emerging" }
  ],
  tools: [
    { name: "Figma", group: "Design" },
    { name: "Adobe XD", group: "Design" },
    { name: "Balsamiq", group: "Design" },
    { name: "Adobe Illustrator", group: "Design" },
    { name: "Adobe Photoshop", group: "Design" },
    { name: "Mural", group: "Research" },
    { name: "Dovetail", group: "Research" },
    { name: "Confluence", group: "Collaboration" },
    { name: "Jira", group: "Collaboration" },
    { name: "ChatGPT", group: "AI" },
    { name: "Claude", group: "AI" },
    { name: "Codex", group: "AI" },
    { name: "Cursor", group: "AI" },
    { name: "Antigravity", group: "AI" },
    { name: "Visual Studio Code", group: "AI" }
  ],
  caseStudies: [
    {
      id: "cs-adapt-authoring-tool",
      title: "Adapt Authoring Tool — Course Creator Experience",
      slug: "adapt-authoring-tool",
      excerpt:
        "First structured user research on the platform Laerdal uses to ship eLearning for the WHO Academy and global health partners — 9 interviews, 5 personas, an evidence-based roadmap, and a usability-validated design decision.",
      category: "EdTech · User Research",
      tags: ["User Research", "UX Strategy", "EdTech", "Usability Testing"],
      role: "Lead UI/UX Designer (solo researcher)",
      client: "Laerdal Medical — Adapt product team",
      year: "2025",
      duration: "Discovery May–Aug 2024 · Usability Jun–Jul 2025",
      status: "published",
      featured: true,
      cover: "/adapt-cover.png",
      accent: "#67e8f9",
      updatedAt: "2026-05-28",
      metrics: [
        { label: "Participants", value: "17", detail: "9 discovery interviews + 8 usability sessions" },
        { label: "Personas", value: "5", detail: "synthesised from 3 geographies and role types" },
        { label: "Design decisions validated", value: "4", detail: "evidence-backed design decisions adopted by product team" }
      ],
      sections: [
        {
          id: "tension",
          type: "problem",
          title: "The tension",
          body: "Adapt is mission-critical infrastructure for Laerdal's WHO Academy and partner programmes — yet had never been studied. Decisions about features and roadmap were running on assumption while senior voices started comparing the platform unfavourably to Articulate Rise 360."
        }
      ]
    },
    {
      id: "cs-nrp",
      title: "NRP Learning Platform → PediaSkills",
      slug: "neonatal-resuscitation-program",
      excerpt:
        "Lead Interaction Designer on the platform that takes clinicians and instructors from sign-up to certified NRP provider, from the 2020 MVP to the 2026 PediaSkills rebrand.",
      category: "Healthcare · EdTech",
      tags: ["Healthcare", "EdTech", "Design Systems", "Information Architecture"],
      role: "Lead Interaction Designer",
      client: "American Academy of Pediatrics · Laerdal · RQI Partners",
      year: "2020 – 2026",
      duration: "Multi-year programme",
      status: "published",
      featured: true,
      cover: "/nrp-cover.png",
      accent: "#67e8f9",
      updatedAt: "2026-10-12",
      metrics: [
        { label: "Strategic partner", value: "AAP", detail: "American Academy of Pediatrics" },
        { label: "Role", value: "Lead", detail: "Lead Interaction Designer" },
        { label: "Span", value: "2020 – 2026", detail: "MVP to the PediaSkills rebrand" }
      ],
      sections: [
        {
          id: "summary",
          type: "problem",
          title: "Summary",
          body: "The full case study lives at /work/neonatal-resuscitation-program — covering the context and problem, six role groups, research, journeys, design decisions, evolution to the PediaSkills rebrand, and outcomes."
        }
      ]
    },
    {
      id: "cs-shopcpr",
      title: "ShopCPR — American Heart Association",
      slug: "shopcpr",
      excerpt:
        "An online medical eLearning marketplace that let healthcare professionals discover, purchase, and complete AHA-certified courses at scale — designed at Impelsys for the American Heart Association.",
      category: "Healthcare · EdTech",
      tags: ["Healthcare", "EdTech", "Ecommerce"],
      role: "Sr. Interaction Designer",
      client: "American Heart Association · Impelsys",
      year: "2018 – 2020",
      duration: "Multi-year engagement",
      status: "published",
      featured: false,
      cover: "/shopcpr-cover.png",
      accent: "#ff7ab6",
      updatedAt: "2026-05-28",
      metrics: [
        { label: "Partner", value: "AHA", detail: "American Heart Association" },
        { label: "Recognised", value: "2× Excellence", detail: "Impelsys Excellence Awards 2019" },
        { label: "Surface", value: "eCommerce", detail: "Course catalogue + checkout + LMS" }
      ],
      sections: [
        {
          id: "overview",
          type: "problem",
          title: "Overview",
          body: "ShopCPR is the official storefront and learning platform for American Heart Association eLearning. As Senior Interaction Designer, I led the design of catalogue browsing, course discovery, purchase flows, and the integration with the learner experience for medical professionals across hospitals and training centres."
        },
        {
          id: "scope",
          type: "process",
          title: "Scope of work",
          body: "Owned wireframes and high-fidelity UI for the platform's core flows. Recognised twice with the Impelsys Excellence Award in 2019 for the ShopCPR and ecommerce contributions.",
          bullets: [
            "Course discovery and catalogue browsing",
            "Authentication, purchase, and licensing flows",
            "Integration with the AHA learning experience",
            "Responsive design across hospital + mobile contexts"
          ]
        },
        {
          id: "summary",
          type: "lessons",
          title: "At a glance",
          body: "Sr. Interaction Designer on the AHA ShopCPR platform at Impelsys, 2018 – 2020. Work covered catalogue browsing, course discovery, purchase and licensing flows, and responsive UI for hospital and mobile contexts. Recognised with two Impelsys Excellence Awards in 2019."
        }
      ]
    },
    {
      id: "cs-voice",
      title: "Laerdal Voice Service Platform",
      slug: "laerdal-voice",
      excerpt:
        "Designing a shared AI voice infrastructure (VSP) across six Laerdal clinical simulation product teams — multi-provider strategy (Azure · ElevenLabs · Kokoro-82M), self-service voice library, clinical pronunciation workflow, cache-first delivery, and offline support for QCPR.",
      category: "Healthcare · AI Platform",
      tags: ["AI Voice", "Service Design", "Platform", "Healthcare", "Design Systems"],
      role: "Lead UX Designer & Design Researcher",
      client: "Laerdal Medical — Voice Service Platform",
      year: "2024 – Present",
      duration: "Multi-team programme",
      status: "published",
      featured: true,
      cover: "/voice-cover.png",
      accent: "#8bffbe",
      updatedAt: "2026-06-04",
      metrics: [
        { label: "Products unified", value: "6", detail: "vSim, VR Clinicals, QCPR, Stokes, Adapt, Scenario Cloud" },
        { label: "AI providers", value: "3", detail: "Azure · ElevenLabs · Kokoro-82M, behind one abstraction" },
        { label: "Role", value: "Lead", detail: "UX strategy, design research, service design" }
      ],
      sections: [
        {
          id: "summary",
          type: "problem",
          title: "Summary",
          body: "The full case study lives at /work/laerdal-voice — covering the strategic context, research insights, design principles, the service-design before/after, the seven key UX decisions including the multi-provider abstraction and the cache-first experience, and the platform's role as the substrate for future AI-driven conversational simulation."
        }
      ]
    }
  ],
  testimonials: [],
  talks: [],
  awards: [
    { title: "Pat on Back Award", issuer: "Laerdal Medical", year: "Jan 2024" },
    { title: "Pat on Back Award", issuer: "Laerdal Medical", year: "Aug 2023" },
    { title: "Pat on Back Award", issuer: "Laerdal Medical", year: "Jan 2023" },
    { title: "Quality Individual Award", issuer: "Impelsys", year: "2021" },
    { title: "Excellence Award — ShopCPR", issuer: "Impelsys", year: "2019" },
    { title: "Excellence Award — Ecommerce", issuer: "Impelsys", year: "2019" },
    { title: "Best Newcomer Award", issuer: "Impelsys", year: "2018" }
  ],
  certifications: [
    { title: "Agile Methods of UX Design" },
    { title: "Become a UX Designer from Scratch" },
    { title: "RQI Responder Certification", issuer: "Laerdal Medical" }
  ],
  articles: []
};
