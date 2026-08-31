import { z } from "zod";
import {
  Home as HomeIcon,
  User,
  FolderGit2,
  Newspaper,
  Award,
  Quote,
  Mail
} from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { CaseStudyBrowser } from "@/components/sections/case-study-browser";
import { InsightsSection } from "@/components/sections/insights-section";
import { RecognitionSection } from "@/components/sections/recognition-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { ContactSection } from "@/components/sections/contact-section";
import type { Portfolio, CaseStudy } from "@/types/portfolio";
import type { BlockDefinition } from "../types";

/**
 * Homepage section blocks. The existing section components consume slices of the
 * `Portfolio` object directly, so each block carries the slice it needs as props and
 * the Renderer reconstructs the minimal shape the component expects. This keeps the
 * section components unchanged in Phase 0.
 */

const HOME_SCOPE = ["home"] as const;
const portfolioGroup = "Homepage";

// --- Hero -------------------------------------------------------------------
type HeroProps = { owner: Portfolio["owner"]; experience: string };

const heroBlock: BlockDefinition<HeroProps> = {
  type: "home.hero",
  scope: [...HOME_SCOPE],
  display: { label: "Hero", group: portfolioGroup, icon: HomeIcon, description: "Name, statement, and primary CTAs" },
  schema: z.object({
    owner: z.any(),
    experience: z.string()
  }) as unknown as z.ZodType<HeroProps>,
  fields: {
    experience: { kind: "text", label: "Experience eyebrow" }
  },
  defaults: () => ({ owner: {} as Portfolio["owner"], experience: "" }),
  Renderer: ({ owner, experience }: HeroProps) =>
    HeroSection({ portfolio: { owner: { ...owner, experience } } as Portfolio })
};

// --- About ------------------------------------------------------------------
type AboutProps = Pick<Portfolio, "owner" | "principles" | "timeline" | "skills" | "tools">;

const aboutBlock: BlockDefinition<AboutProps> = {
  type: "home.about",
  scope: [...HOME_SCOPE],
  display: { label: "About", group: portfolioGroup, icon: User, description: "Principles, timeline, skills, tools" },
  schema: z.object({
    owner: z.any(),
    principles: z.array(z.any()),
    timeline: z.array(z.any()),
    skills: z.array(z.any()),
    tools: z.array(z.any())
  }) as unknown as z.ZodType<AboutProps>,
  fields: {
    principles: {
      kind: "array",
      label: "Principles",
      itemLabel: "Principle",
      of: { title: { kind: "text", label: "Title" }, body: { kind: "text", label: "Body", multiline: true } }
    }
  },
  defaults: () => ({
    owner: {} as Portfolio["owner"],
    principles: [],
    timeline: [],
    skills: [],
    tools: []
  }),
  Renderer: (props: AboutProps) => AboutSection({ portfolio: props as Portfolio })
};

// --- Case study browser -----------------------------------------------------
type WorkProps = { caseStudies: CaseStudy[] };

const caseStudyBrowserBlock: BlockDefinition<WorkProps> = {
  type: "home.caseStudyBrowser",
  scope: [...HOME_SCOPE],
  display: { label: "Work / Case studies", group: portfolioGroup, icon: FolderGit2, description: "Searchable grid of case studies" },
  schema: z.object({ caseStudies: z.array(z.any()) }) as unknown as z.ZodType<WorkProps>,
  fields: {},
  defaults: () => ({ caseStudies: [] }),
  Renderer: ({ caseStudies }: WorkProps) => CaseStudyBrowser({ caseStudies })
};

// --- Insights ---------------------------------------------------------------
type InsightsProps = { articles: Portfolio["articles"] };

const insightsBlock: BlockDefinition<InsightsProps> = {
  type: "home.insights",
  scope: [...HOME_SCOPE],
  display: { label: "Insights / Articles", group: portfolioGroup, icon: Newspaper, description: "Article cards (hidden if empty)" },
  schema: z.object({ articles: z.array(z.any()) }) as unknown as z.ZodType<InsightsProps>,
  fields: {
    articles: {
      kind: "array",
      label: "Articles",
      itemLabel: "Article",
      of: {
        title: { kind: "text", label: "Title" },
        excerpt: { kind: "text", label: "Excerpt", multiline: true },
        tag: { kind: "text", label: "Tag" },
        readTime: { kind: "text", label: "Read time" }
      }
    }
  },
  defaults: () => ({ articles: [] }),
  Renderer: ({ articles }: InsightsProps) => InsightsSection({ articles })
};

// --- Recognition ------------------------------------------------------------
type RecognitionProps = Pick<Portfolio, "awards" | "certifications">;

const recognitionBlock: BlockDefinition<RecognitionProps> = {
  type: "home.recognition",
  scope: [...HOME_SCOPE],
  display: { label: "Recognition", group: portfolioGroup, icon: Award, description: "Awards and certifications" },
  schema: z.object({ awards: z.array(z.any()), certifications: z.array(z.any()) }) as unknown as z.ZodType<RecognitionProps>,
  fields: {},
  defaults: () => ({ awards: [], certifications: [] }),
  Renderer: (props: RecognitionProps) => RecognitionSection({ portfolio: props as Portfolio })
};

// --- Social proof -----------------------------------------------------------
type SocialProps = Pick<Portfolio, "testimonials" | "talks">;

const socialProofBlock: BlockDefinition<SocialProps> = {
  type: "home.socialProof",
  scope: [...HOME_SCOPE],
  display: { label: "Social proof", group: portfolioGroup, icon: Quote, description: "Testimonials and talks (hidden if empty)" },
  schema: z.object({ testimonials: z.array(z.any()), talks: z.array(z.any()) }) as unknown as z.ZodType<SocialProps>,
  fields: {},
  defaults: () => ({ testimonials: [], talks: [] }),
  Renderer: (props: SocialProps) => SocialProofSection({ portfolio: props as Portfolio })
};

// --- Contact ----------------------------------------------------------------
type ContactProps = { owner: Portfolio["owner"] };

const contactBlock: BlockDefinition<ContactProps> = {
  type: "home.contact",
  scope: [...HOME_SCOPE],
  display: { label: "Contact", group: portfolioGroup, icon: Mail, description: "Contact form and CTAs" },
  schema: z.object({ owner: z.any() }) as unknown as z.ZodType<ContactProps>,
  fields: {},
  defaults: () => ({ owner: {} as Portfolio["owner"] }),
  Renderer: (props: ContactProps) => ContactSection({ portfolio: props as Portfolio })
};

export const homeBlocks: BlockDefinition<never>[] = [
  heroBlock,
  aboutBlock,
  caseStudyBrowserBlock,
  insightsBlock,
  recognitionBlock,
  socialProofBlock,
  contactBlock
] as unknown as BlockDefinition<never>[];
