import { z } from "zod";
import {
  Accessibility as AccessibilityIcon,
  AlignVerticalSpaceAround,
  FileText,
  Image as ImageIcon,
  Images,
  LayoutTemplate,
  ListChecks,
  ListOrdered,
  Map as MapIcon,
  Quote,
  Sparkles,
  Target,
  Table,
  TrendingUp,
  Users,
  WandSparkles
} from "lucide-react";
import type { BlockDefinition, FieldSchema, ObjectFields } from "../types";
import {
  AccessibilityBlock,
  CaseStudyFooter,
  DecisionTable,
  DesignSolutionBlock,
  EditorialHero,
  Figure,
  FigureGrid,
  FindingList,
  GoalsList,
  ImpactBlock,
  MethodPanel,
  NarrativeBlock,
  PersonaGrid,
  ProblemBlock,
  PullQuote,
  ReflectionList,
  RoadmapTable,
  RoadmapWithProcess,
  SectionShell
} from "@/components/case-study/editorial-blocks";
import type {
  Accessibility,
  AdaptCaseStudy,
  Decision,
  DesignSolution,
  Figure as FigureData,
  Finding,
  PhaseResearch,
  Persona,
  ReflectionItem,
  ResearchArtifact,
  RoadmapItem
} from "@/content/case-studies/adapt-authoring-tool";

const GROUP = "Case study — editorial";

/* ---------------------------------------------------------------- shared figure */

const figureSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional()
});

const figureFields = {
  src: { kind: "asset", label: "Image", resourceType: "image" },
  alt: { kind: "text", label: "Alt text" },
  caption: { kind: "text", label: "Caption", optional: true }
} as const;

const emptyFigure = (): FigureData => ({ src: "", alt: "" });

/* ---------------------------------------------------------------- sectionShell */

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  bordered?: boolean;
};

const sectionShellBlock: BlockDefinition<SectionShellProps> = {
  type: "editorial.sectionShell",
  scope: ["caseStudy"],
  container: true,
  allowedChildren: [
    "editorial.narrative",
    "editorial.pullQuote",
    "editorial.figure",
    "editorial.figureGrid",
    "editorial.problem",
    "editorial.goals",
    "editorial.method",
    "editorial.personas",
    "editorial.findings",
    "editorial.designSolution",
    "editorial.accessibility",
    "editorial.decisions",
    "editorial.roadmap",
    "editorial.roadmapWithProcess",
    "editorial.impact",
    "editorial.reflection"
  ],
  display: {
    label: "Section shell",
    group: GROUP,
    icon: LayoutTemplate,
    description: "Layout container with optional eyebrow, title, and intro; nests child blocks"
  },
  schema: z.object({
    id: z.string().optional(),
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    intro: z.string().optional(),
    bordered: z.boolean().optional()
  }),
  fields: {
    id: { kind: "text", label: "Anchor id", optional: true },
    eyebrow: { kind: "text", label: "Eyebrow", optional: true },
    title: { kind: "text", label: "Title", optional: true },
    intro: { kind: "text", label: "Intro", multiline: true, optional: true },
    bordered: { kind: "boolean", label: "Top border" }
  },
  defaults: () => ({ bordered: true }),
  Renderer: SectionShell as never
};

/* ---------------------------------------------------------------- hero */

type HeroProps = { meta: AdaptCaseStudy["meta"] };

const heroBlock: BlockDefinition<HeroProps> = {
  type: "editorial.hero",
  scope: ["caseStudy"],
  display: {
    label: "Editorial hero",
    group: GROUP,
    icon: Sparkles,
    description: "Case-study hero with title, tagline, and metadata grid"
  },
  schema: z.object({
    meta: z.object({
      title: z.string(),
      tagline: z.string(),
      role: z.string(),
      timeline: z.string(),
      platform: z.string(),
      partners: z.string(),
      teamContext: z.string()
    })
  }),
  fields: {
    meta: {
      kind: "object",
      label: "Meta",
      fields: {
        title: { kind: "text", label: "Title" },
        tagline: { kind: "text", label: "Tagline" },
        role: { kind: "text", label: "Role" },
        timeline: { kind: "text", label: "Timeline" },
        platform: { kind: "text", label: "Platform" },
        partners: { kind: "text", label: "Partners", multiline: true },
        teamContext: { kind: "text", label: "Team context", multiline: true }
      }
    }
  },
  defaults: () => ({
    meta: {
      title: "",
      tagline: "",
      role: "",
      timeline: "",
      platform: "",
      partners: "",
      teamContext: ""
    }
  }),
  Renderer: EditorialHero
};

/* ---------------------------------------------------------------- narrative */

type NarrativeProps = { paragraphs: string[] };

const narrativeBlock: BlockDefinition<NarrativeProps> = {
  type: "editorial.narrative",
  scope: ["caseStudy"],
  display: {
    label: "Narrative",
    group: GROUP,
    icon: FileText,
    description: "Prose column of paragraphs with a drop-cap first line"
  },
  schema: z.object({ paragraphs: z.array(z.string()) }),
  fields: {
    paragraphs: {
      kind: "array",
      label: "Paragraphs",
      itemLabel: "Paragraph",
      of: { kind: "text", label: "Paragraph", multiline: true } as FieldSchema
    }
  },
  defaults: () => ({ paragraphs: [] }),
  Renderer: NarrativeBlock
};

/* ---------------------------------------------------------------- problem */

type ProblemProps = { problem: AdaptCaseStudy["problem"] };

const problemBlock: BlockDefinition<ProblemProps> = {
  type: "editorial.problem",
  scope: ["caseStudy"],
  display: {
    label: "Problem",
    group: GROUP,
    icon: Target,
    description: "Three-up grid: business, user, and stakes"
  },
  schema: z.object({
    problem: z.object({
      business: z.string(),
      user: z.string(),
      stakes: z.string()
    })
  }),
  fields: {
    problem: {
      kind: "object",
      label: "Problem",
      fields: {
        business: { kind: "text", label: "Business problem", multiline: true },
        user: { kind: "text", label: "User problem", multiline: true },
        stakes: { kind: "text", label: "Why it mattered", multiline: true }
      }
    }
  },
  defaults: () => ({ problem: { business: "", user: "", stakes: "" } }),
  Renderer: ProblemBlock
};

/* ---------------------------------------------------------------- goals */

type GoalsProps = { goals: string[] };

const goalsBlock: BlockDefinition<GoalsProps> = {
  type: "editorial.goals",
  scope: ["caseStudy"],
  display: {
    label: "Goals",
    group: GROUP,
    icon: ListChecks,
    description: "Numbered list of goals"
  },
  schema: z.object({ goals: z.array(z.string()) }),
  fields: {
    goals: {
      kind: "array",
      label: "Goals",
      itemLabel: "Goal",
      of: { kind: "text", label: "Goal", multiline: true } as FieldSchema
    }
  },
  defaults: () => ({ goals: [] }),
  Renderer: GoalsList
};

/* ---------------------------------------------------------------- method */

type MethodProps = AdaptCaseStudy["method"];

const labelValueFields = {
  label: { kind: "text", label: "Label" },
  value: { kind: "text", label: "Value", multiline: true }
} as const;

const recordingItemSchema = z.object({
  name: z.string(),
  date: z.string(),
  image: z.string()
});

const recordingItemFields = {
  name: { kind: "text", label: "Name" },
  date: { kind: "text", label: "Date / caption" },
  image: { kind: "asset", label: "Thumbnail", resourceType: "image" }
} as const;

const artifactLinkSchema = z.object({
  label: z.string(),
  href: z.string()
});

const artifactLinkFields = {
  label: { kind: "text", label: "Label" },
  href: { kind: "text", label: "Link", placeholder: "https://…" }
} as const;

const researchArtifactSchema = z.object({
  label: z.string(),
  description: z.string(),
  href: z.string().optional(),
  items: z.array(recordingItemSchema).optional(),
  links: z.array(artifactLinkSchema).optional()
});

const researchArtifactFields = {
  label: { kind: "text", label: "Label" },
  description: { kind: "text", label: "Description", multiline: true },
  href: { kind: "text", label: "Link", placeholder: "https://…", optional: true }
} as const;

const artifactFieldsWithItems = {
  ...researchArtifactFields,
  items: { kind: "array", label: "Gallery thumbnails", itemLabel: "Item", of: recordingItemFields }
} as const;

const artifactFieldsWithLinks = {
  label: { kind: "text", label: "Label" },
  description: { kind: "text", label: "Description", multiline: true },
  href: { kind: "text", label: "Link", placeholder: "https://…", optional: true },
  links: { kind: "array", label: "Documents", itemLabel: "Document", of: artifactLinkFields }
} as const;

const phaseResearchSchema = z.object({
  recordings: researchArtifactSchema,
  analysis: researchArtifactSchema,
  report: researchArtifactSchema
});

const phaseResearchFields = {
  recordings: { kind: "object", label: "Recordings", fields: artifactFieldsWithItems },
  analysis: { kind: "object", label: "Analysis", fields: artifactFieldsWithItems },
  report: { kind: "object", label: "Report", fields: artifactFieldsWithLinks }
} as const;

const emptyResearchArtifact = (label: string): ResearchArtifact => ({ label, description: "" });
const emptyPhaseResearch = (): PhaseResearch => ({
  recordings: emptyResearchArtifact("Recordings"),
  analysis: emptyResearchArtifact("Analysis"),
  report: emptyResearchArtifact("Report")
});

const methodBlock: BlockDefinition<MethodProps> = {
  type: "editorial.method",
  scope: ["caseStudy"],
  display: {
    label: "Method",
    group: GROUP,
    icon: ListOrdered,
    description: "Two-phase panel of discovery and usability rows, each with linked research artifacts"
  },
  schema: z.object({
    discovery: z.array(z.object({ label: z.string(), value: z.string() })),
    usability: z.array(z.object({ label: z.string(), value: z.string() })),
    discoveryResearch: phaseResearchSchema,
    usabilityResearch: phaseResearchSchema
  }),
  fields: {
    discovery: {
      kind: "array",
      label: "Discovery",
      itemLabel: "Row",
      of: labelValueFields
    },
    usability: {
      kind: "array",
      label: "Usability",
      itemLabel: "Row",
      of: labelValueFields
    },
    discoveryResearch: {
      kind: "object",
      label: "Discovery research artifacts",
      fields: phaseResearchFields
    },
    usabilityResearch: {
      kind: "object",
      label: "Usability research artifacts",
      fields: phaseResearchFields
    }
  },
  defaults: () => ({
    discovery: [],
    usability: [],
    discoveryResearch: emptyPhaseResearch(),
    usabilityResearch: emptyPhaseResearch()
  }),
  Renderer: MethodPanel
};

/* ---------------------------------------------------------------- personas */

type PersonasProps = { personas: Persona[] };

const personasBlock: BlockDefinition<PersonasProps> = {
  type: "editorial.personas",
  scope: ["caseStudy"],
  display: {
    label: "Personas",
    group: GROUP,
    icon: Users,
    description: "Grid of persona cards"
  },
  schema: z.object({
    personas: z.array(
      z.object({
        id: z.string(),
        emoji: z.string(),
        archetype: z.string(),
        pitch: z.string(),
        experience: z.string(),
        needs: z.array(z.string()),
        quote: z.string()
      })
    )
  }),
  fields: {
    personas: {
      kind: "array",
      label: "Personas",
      itemLabel: "Persona",
      of: {
        id: { kind: "text", label: "Id" },
        emoji: { kind: "text", label: "Emoji" },
        archetype: { kind: "text", label: "Archetype" },
        pitch: { kind: "text", label: "Pitch", multiline: true },
        experience: { kind: "text", label: "Experience" },
        needs: {
          kind: "array",
          label: "Needs",
          itemLabel: "Need",
          of: { kind: "text", label: "Need" } as FieldSchema
        },
        quote: { kind: "text", label: "Quote", multiline: true }
      }
    }
  },
  defaults: () => ({ personas: [] }),
  Renderer: PersonaGrid
};

/* ---------------------------------------------------------------- findings */

type FindingsProps = { findings: Finding[] };

const findingsBlock: BlockDefinition<FindingsProps> = {
  type: "editorial.findings",
  scope: ["caseStudy"],
  display: {
    label: "Findings",
    group: GROUP,
    icon: ListChecks,
    description: "Numbered research findings with design implications"
  },
  schema: z.object({
    findings: z.array(
      z.object({
        id: z.string(),
        number: z.string(),
        title: z.string(),
        body: z.array(z.string()),
        implication: z.string(),
        evidence: z.string().optional()
      })
    )
  }),
  fields: {
    findings: {
      kind: "array",
      label: "Findings",
      itemLabel: "Finding",
      of: {
        id: { kind: "text", label: "Id" },
        number: { kind: "text", label: "Number" },
        title: { kind: "text", label: "Title" },
        body: {
          kind: "array",
          label: "Body",
          itemLabel: "Paragraph",
          of: { kind: "text", label: "Paragraph", multiline: true } as FieldSchema
        },
        implication: { kind: "text", label: "Design implication", multiline: true },
        evidence: { kind: "text", label: "Evidence", optional: true }
      }
    }
  },
  defaults: () => ({ findings: [] }),
  Renderer: FindingList
};

/* ---------------------------------------------------------------- figure */

type FigureProps = { figure: FigureData };

const figureBlock: BlockDefinition<FigureProps> = {
  type: "editorial.figure",
  scope: ["caseStudy"],
  display: {
    label: "Figure",
    group: GROUP,
    icon: ImageIcon,
    description: "Single captioned image"
  },
  schema: z.object({ figure: figureSchema }),
  fields: {
    figure: { kind: "object", label: "Figure", fields: figureFields }
  },
  defaults: () => ({ figure: emptyFigure() }),
  Renderer: Figure
};

/* ---------------------------------------------------------------- figureGrid */

type FigureGridProps = { figures: FigureData[] };

const figureGridBlock: BlockDefinition<FigureGridProps> = {
  type: "editorial.figureGrid",
  scope: ["caseStudy"],
  display: {
    label: "Figure grid",
    group: GROUP,
    icon: Images,
    description: "Grid of captioned images"
  },
  schema: z.object({ figures: z.array(figureSchema) }),
  fields: {
    figures: {
      kind: "array",
      label: "Figures",
      itemLabel: "Figure",
      of: figureFields
    }
  },
  defaults: () => ({ figures: [] }),
  Renderer: FigureGrid
};

/* ---------------------------------------------------------------- designSolution */

type DesignSolutionProps = { solution: DesignSolution };

const designSolutionValueSchema = z.object({
  intro: z.string(),
  comparison: z.object({
    problemStatement: z.string(),
    figures: z.array(figureSchema).optional(),
    options: z.array(
      z.object({
        label: z.string(),
        name: z.string(),
        description: z.string(),
        verdict: z.enum(["rejected", "chosen"]),
        verdictNote: z.string()
      })
    )
  }),
  moves: z.array(
    z.object({
      title: z.string(),
      before: z.string(),
      after: z.string(),
      drivenBy: z.string(),
      figure: figureSchema.optional()
    })
  ),
  beyondPadding: z.object({
    title: z.string(),
    body: z.string(),
    figure: figureSchema.optional()
  })
});

const designSolutionBlock: BlockDefinition<DesignSolutionProps> = {
  type: "editorial.designSolution",
  scope: ["caseStudy"],
  display: {
    label: "Design solution",
    group: GROUP,
    icon: WandSparkles,
    description: "A/B comparison, before/after moves, and the wedge-to-P0 narrative"
  },
  schema: z.object({
    solution: designSolutionValueSchema
  }),
  fields: {
    solution: {
      kind: "object",
      label: "Solution",
      fields: {
        intro: { kind: "text", label: "Intro", multiline: true },
        comparison: {
          kind: "object",
          label: "Comparison",
          fields: {
            problemStatement: { kind: "text", label: "Problem statement", multiline: true },
            figures: {
              kind: "array",
              label: "Figures",
              itemLabel: "Figure",
              of: figureFields
            },
            options: {
              kind: "array",
              label: "Options",
              itemLabel: "Option",
              of: {
                label: { kind: "text", label: "Label" },
                name: { kind: "text", label: "Name" },
                description: { kind: "text", label: "Description", multiline: true },
                verdict: {
                  kind: "select",
                  label: "Verdict",
                  options: [
                    { value: "rejected", label: "Rejected" },
                    { value: "chosen", label: "Chosen" }
                  ]
                },
                verdictNote: { kind: "text", label: "Verdict note", multiline: true }
              }
            }
          }
        },
        moves: {
          kind: "array",
          label: "Moves",
          itemLabel: "Move",
          of: {
            title: { kind: "text", label: "Title" },
            before: { kind: "text", label: "Before", multiline: true },
            after: { kind: "text", label: "After", multiline: true },
            drivenBy: { kind: "text", label: "Driven by", multiline: true },
            figure: { kind: "object", label: "Figure", fields: figureFields, optional: true }
          }
        },
        beyondPadding: {
          kind: "object",
          label: "Beyond padding",
          fields: {
            title: { kind: "text", label: "Title" },
            body: { kind: "text", label: "Body", multiline: true },
            figure: { kind: "object", label: "Figure", fields: figureFields, optional: true }
          }
        }
      }
    }
  },
  defaults: () => ({
    solution: {
      intro: "",
      comparison: { problemStatement: "", options: [] },
      moves: [],
      beyondPadding: { title: "", body: "" }
    }
  }),
  Renderer: DesignSolutionBlock
};

/* ---------------------------------------------------------------- accessibility */

type AccessibilityProps = { accessibility: Accessibility };

const accessibilityBlock: BlockDefinition<AccessibilityProps> = {
  type: "editorial.accessibility",
  scope: ["caseStudy"],
  display: {
    label: "Accessibility",
    group: GROUP,
    icon: AccessibilityIcon,
    description: "Intro, considerations grid, and an honest gap callout"
  },
  schema: z.object({
    accessibility: z.object({
      intro: z.string(),
      considerations: z.array(
        z.object({
          title: z.string(),
          body: z.string()
        })
      ),
      gap: z.string()
    })
  }),
  fields: {
    accessibility: {
      kind: "object",
      label: "Accessibility",
      fields: {
        intro: { kind: "text", label: "Intro", multiline: true },
        considerations: {
          kind: "array",
          label: "Considerations",
          itemLabel: "Consideration",
          of: {
            title: { kind: "text", label: "Title" },
            body: { kind: "text", label: "Body", multiline: true }
          }
        },
        gap: { kind: "text", label: "Gap", multiline: true }
      }
    }
  },
  defaults: () => ({ accessibility: { intro: "", considerations: [], gap: "" } }),
  Renderer: AccessibilityBlock
};

/* ---------------------------------------------------------------- decisions */

type DecisionsProps = { decisions: Decision[] };

const decisionSchema = z.object({
  decision: z.string(),
  rationale: z.string(),
  evidence: z.string()
});

const decisionItemFields: ObjectFields = {
  decision: { kind: "text", label: "Decision", multiline: true },
  rationale: { kind: "text", label: "Rationale", multiline: true },
  evidence: { kind: "text", label: "Evidence", multiline: true }
};

const decisionsBlock: BlockDefinition<DecisionsProps> = {
  type: "editorial.decisions",
  scope: ["caseStudy"],
  display: {
    label: "Decisions",
    group: GROUP,
    icon: Table,
    description: "Decision / rationale / evidence table"
  },
  schema: z.object({
    decisions: z.array(decisionSchema)
  }),
  fields: {
    decisions: {
      kind: "array",
      label: "Decisions",
      itemLabel: "Decision",
      of: decisionItemFields
    }
  },
  defaults: () => ({ decisions: [] }),
  Renderer: DecisionTable
};

/* ---------------------------------------------------------------- roadmap */

type RoadmapProps = { items: RoadmapItem[] };

const roadmapItemSchema = z.object({
  feature: z.string(),
  status: z.enum(["Completed", "On-going", "Foundational"]),
  body: z.string(),
  designSolution: z.string().optional(),
  designSolutionLink: z.string().optional(),
  designSolutionLinks: z.array(z.object({ label: z.string(), href: z.string() })).optional(),
  decision: z.string().optional(),
  impact: z.string().optional()
});

const roadmapItemFields: ObjectFields = {
  feature: { kind: "text", label: "Feature" },
  status: {
    kind: "select",
    label: "Status",
    options: [
      { value: "Completed", label: "Completed" },
      { value: "On-going", label: "On-going" },
      { value: "Foundational", label: "Foundational" }
    ]
  },
  body: { kind: "text", label: "Pain point & solution", multiline: true },
  designSolution: { kind: "text", label: "Design solution", multiline: true, optional: true },
  designSolutionLink: { kind: "text", label: "Design solution link (Figma, etc.)", placeholder: "https://…", optional: true },
  designSolutionLinks: {
    kind: "array",
    label: "Design solution links (multiple)",
    itemLabel: "Link",
    of: {
      label: { kind: "text", label: "Label" },
      href: { kind: "text", label: "Link", placeholder: "https://…" }
    }
  },
  decision: { kind: "text", label: "Decision", multiline: true, optional: true },
  impact: { kind: "text", label: "Impact", multiline: true, optional: true }
};

const roadmapBlock: BlockDefinition<RoadmapProps> = {
  type: "editorial.roadmap",
  scope: ["caseStudy"],
  display: {
    label: "Roadmap",
    group: GROUP,
    icon: MapIcon,
    description: "Feature / status / research-origin cards"
  },
  schema: z.object({
    items: z.array(roadmapItemSchema)
  }),
  fields: {
    items: {
      kind: "array",
      label: "Items",
      itemLabel: "Item",
      of: roadmapItemFields
    }
  },
  defaults: () => ({ items: [] }),
  Renderer: RoadmapTable
};

/* ---------------------------------------------------------------- roadmap with process */

type RoadmapWithProcessProps = {
  items: RoadmapItem[];
  solution: DesignSolution;
  decisions: Decision[];
  detailFeature: string;
};

const roadmapWithProcessBlock: BlockDefinition<RoadmapWithProcessProps> = {
  type: "editorial.roadmapWithProcess",
  scope: ["caseStudy"],
  display: {
    label: "Roadmap + design process",
    group: GROUP,
    icon: MapIcon,
    description: "Roadmap cards with the design solution and decisions nested under one featured item"
  },
  schema: z.object({
    items: z.array(roadmapItemSchema),
    solution: designSolutionValueSchema,
    decisions: z.array(decisionSchema),
    detailFeature: z.string()
  }),
  fields: {
    items: { kind: "array", label: "Items", itemLabel: "Item", of: roadmapItemFields },
    solution: designSolutionBlock.fields.solution,
    decisions: { kind: "array", label: "Decisions", itemLabel: "Decision", of: decisionItemFields },
    detailFeature: { kind: "text", label: "Feature to expand (must match an item's Feature name)" }
  },
  defaults: () => ({
    items: [],
    solution: {
      intro: "",
      comparison: { problemStatement: "", options: [] },
      moves: [],
      beyondPadding: { title: "", body: "" }
    },
    decisions: [],
    detailFeature: ""
  }),
  Renderer: RoadmapWithProcess
};

/* ---------------------------------------------------------------- impact */

type ImpactProps = { impact: AdaptCaseStudy["impact"] };

const impactBlock: BlockDefinition<ImpactProps> = {
  type: "editorial.impact",
  scope: ["caseStudy"],
  display: {
    label: "Impact",
    group: GROUP,
    icon: TrendingUp,
    description: "What shipped, plus an honest unmeasured-outcomes callout"
  },
  schema: z.object({
    impact: z.object({
      delivered: z.array(z.string()),
      unmeasured: z.string()
    })
  }),
  fields: {
    impact: {
      kind: "object",
      label: "Impact",
      fields: {
        delivered: {
          kind: "array",
          label: "Delivered",
          itemLabel: "Item",
          of: { kind: "text", label: "Item", multiline: true } as FieldSchema
        },
        unmeasured: { kind: "text", label: "Unmeasured", multiline: true }
      }
    }
  },
  defaults: () => ({ impact: { delivered: [], unmeasured: "" } }),
  Renderer: ImpactBlock
};

/* ---------------------------------------------------------------- reflection */

type ReflectionProps = { items: ReflectionItem[] };

const reflectionBlock: BlockDefinition<ReflectionProps> = {
  type: "editorial.reflection",
  scope: ["caseStudy"],
  display: {
    label: "Reflection",
    group: GROUP,
    icon: FileText,
    description: "Grid of heading/body reflection cards"
  },
  schema: z.object({
    items: z.array(
      z.object({
        heading: z.string(),
        body: z.string()
      })
    )
  }),
  fields: {
    items: {
      kind: "array",
      label: "Items",
      itemLabel: "Item",
      of: {
        heading: { kind: "text", label: "Heading" },
        body: { kind: "text", label: "Body", multiline: true }
      }
    }
  },
  defaults: () => ({ items: [] }),
  Renderer: ReflectionList
};

/* ---------------------------------------------------------------- pullQuote */

type PullQuoteProps = { text: string; attribution?: string };

const pullQuoteBlock: BlockDefinition<PullQuoteProps> = {
  type: "editorial.pullQuote",
  scope: ["caseStudy"],
  display: {
    label: "Pull quote",
    group: GROUP,
    icon: Quote,
    description: "Centered display quote with optional attribution"
  },
  schema: z.object({
    text: z.string(),
    attribution: z.string().optional()
  }),
  fields: {
    text: { kind: "text", label: "Quote", multiline: true },
    attribution: { kind: "text", label: "Attribution", optional: true }
  },
  defaults: () => ({ text: "" }),
  Renderer: ({ text, attribution }: PullQuoteProps) =>
    PullQuote({ children: text, attribution })
};

/* ---------------------------------------------------------------- footer */

type FooterProps = Record<string, never>;

const footerBlock: BlockDefinition<FooterProps> = {
  type: "editorial.footer",
  scope: ["caseStudy"],
  display: {
    label: "Footer",
    group: GROUP,
    icon: AlignVerticalSpaceAround,
    description: "Closing call-to-action footer"
  },
  schema: z.object({}) as unknown as z.ZodType<FooterProps>,
  fields: {},
  defaults: () => ({} as FooterProps),
  Renderer: CaseStudyFooter as never
};

/* ---------------------------------------------------------------- export */

export const editorialBlocks: BlockDefinition<never>[] = [
  sectionShellBlock,
  heroBlock,
  narrativeBlock,
  problemBlock,
  goalsBlock,
  methodBlock,
  personasBlock,
  findingsBlock,
  figureBlock,
  figureGridBlock,
  designSolutionBlock,
  accessibilityBlock,
  decisionsBlock,
  roadmapBlock,
  roadmapWithProcessBlock,
  impactBlock,
  reflectionBlock,
  pullQuoteBlock,
  footerBlock
] as unknown as BlockDefinition<never>[];
