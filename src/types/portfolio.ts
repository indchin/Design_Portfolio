export type CaseStudyStatus = "draft" | "published";

export type CaseStudySection = {
  id: string;
  type:
    | "problem"
    | "research"
    | "personas"
    | "journey"
    | "ia"
    | "process"
    | "wireframes"
    | "ui"
    | "system"
    | "accessibility"
    | "ai"
    | "metrics"
    | "lessons"
    | "media"
    | "comparison";
  title: string;
  body: string;
  bullets?: string[];
};

export type CaseStudy = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  role: string;
  client: string;
  year: string;
  duration: string;
  status: CaseStudyStatus;
  featured: boolean;
  cover: string;
  accent: string;
  updatedAt: string;
  metrics: Array<{ label: string; value: string; detail: string }>;
  sections: CaseStudySection[];
};

export type Portfolio = {
  owner: {
    name: string;
    title: string;
    experience: string;
    statement: string;
    location: string;
    email: string;
    resumeUrl: string;
    calendlyUrl: string;
    socials: Array<{ label: string; href: string }>;
  };
  principles: Array<{ title: string; body: string }>;
  timeline: Array<{
    year: string;
    company?: string;
    title: string;
    body: string;
    current?: boolean;
  }>;
  skills: Array<{ label: string; value: number; group: string }>;
  tools: Array<{ name: string; group: "Design" | "Research" | "Collaboration" | "AI" }>;
  caseStudies: CaseStudy[];
  testimonials: Array<{ quote: string; name: string; role: string }>;
  talks: Array<{ title: string; context: string; year: string }>;
  awards: Array<{ title: string; issuer: string; year: string }>;
  certifications: Array<{ title: string; issuer?: string; year?: string }>;
  articles: Array<{ title: string; excerpt: string; tag: string; readTime: string }>;
};
