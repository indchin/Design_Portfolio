import { z } from "zod";
import {
  ArrowLeftRight,
  GalleryHorizontalEnd,
  Layers,
  Lightbulb,
  ListChecks,
  Mic,
  Quote,
  Route,
  Sparkles,
  Table2,
  Telescope,
  Volume2
} from "lucide-react";
import {
  ArchitectureGrid,
  InsightList,
  MvpEpicsGrid,
  PrincipleGrid,
  ProviderTable,
  RequestFlowBlock,
  ServiceFlowComparison,
  ShowcaseSection,
  UspGrid,
  VisionShift,
  VoiceExpertCard,
  VoiceTypesBlock
} from "@/components/case-study/voice-blocks";
import type { BlockDefinition, FieldSchema, ObjectFields } from "../types";

/**
 * Block registry for the "Laerdal Voice" (Voice Service Platform) case study.
 * Each definition wraps an exported component from
 * `@/components/case-study/voice-blocks` and mirrors its prop signature as a
 * zod schema + editable FieldSchema tree.
 */

const GROUP = "Case study — Laerdal Voice";

/* ------------------------------------------------------------------ */
/* InsightList — { insights: ResearchInsight[] }                      */
/* ------------------------------------------------------------------ */

const insightZod = z.object({
  id: z.string(),
  number: z.string(),
  title: z.string(),
  body: z.array(z.string()),
  quote: z
    .object({ text: z.string(), attribution: z.string().optional() })
    .optional()
});

const insightFields: ObjectFields = {
  id: { kind: "text", label: "ID" },
  number: { kind: "text", label: "Number" },
  title: { kind: "text", label: "Title" },
  body: {
    kind: "array",
    label: "Body paragraphs",
    itemLabel: "Paragraph",
    of: { kind: "text", label: "Paragraph", multiline: true } as FieldSchema
  },
  quote: {
    kind: "object",
    label: "Quote",
    optional: true,
    fields: {
      text: { kind: "text", label: "Text", multiline: true },
      attribution: { kind: "text", label: "Attribution", optional: true }
    }
  }
};

type InsightListProps = { insights: z.infer<typeof insightZod>[] };

const insightListBlock: BlockDefinition<InsightListProps> = {
  type: "voice.insightList",
  scope: ["caseStudy"],
  display: {
    label: "Insight list",
    group: GROUP,
    icon: Lightbulb,
    description: "Numbered research insights with optional pull quotes"
  },
  schema: z.object({ insights: z.array(insightZod) }),
  fields: {
    insights: {
      kind: "array",
      label: "Insights",
      itemLabel: "Insight",
      of: insightFields
    }
  },
  defaults: () => ({ insights: [] }),
  Renderer: InsightList
};

/* ------------------------------------------------------------------ */
/* VisionShift — { shift: {from,to}; statement: string }              */
/* ------------------------------------------------------------------ */

type VisionShiftProps = {
  shift: { from: string; to: string };
  statement: string;
};

const visionShiftBlock: BlockDefinition<VisionShiftProps> = {
  type: "voice.visionShift",
  scope: ["caseStudy"],
  display: {
    label: "Vision shift",
    group: GROUP,
    icon: Telescope,
    description: "From/to reframe with a vision statement"
  },
  schema: z.object({
    shift: z.object({ from: z.string(), to: z.string() }),
    statement: z.string()
  }),
  fields: {
    shift: {
      kind: "object",
      label: "Shift",
      fields: {
        from: { kind: "text", label: "From", multiline: true },
        to: { kind: "text", label: "To", multiline: true }
      }
    },
    statement: { kind: "text", label: "Statement", multiline: true }
  },
  defaults: () => ({ shift: { from: "", to: "" }, statement: "" }),
  Renderer: VisionShift
};

/* ------------------------------------------------------------------ */
/* ServiceFlowComparison                                              */
/* { before, after: ServiceFlowStep[]; beforeSummary, afterSummary }  */
/* ------------------------------------------------------------------ */

const serviceFlowStepZod = z.object({
  label: z.string(),
  description: z.string().optional()
});

const serviceFlowStepFields: ObjectFields = {
  label: { kind: "text", label: "Label" },
  description: { kind: "text", label: "Description", multiline: true, optional: true }
};

type ServiceFlowComparisonProps = {
  before: z.infer<typeof serviceFlowStepZod>[];
  after: z.infer<typeof serviceFlowStepZod>[];
  beforeSummary: string;
  afterSummary: string;
};

const serviceFlowComparisonBlock: BlockDefinition<ServiceFlowComparisonProps> = {
  type: "voice.serviceFlowComparison",
  scope: ["caseStudy"],
  display: {
    label: "Service flow comparison",
    group: GROUP,
    icon: ArrowLeftRight,
    description: "Before/after service flow panels with summaries"
  },
  schema: z.object({
    before: z.array(serviceFlowStepZod),
    after: z.array(serviceFlowStepZod),
    beforeSummary: z.string(),
    afterSummary: z.string()
  }),
  fields: {
    beforeSummary: { kind: "text", label: "Before summary", multiline: true },
    before: {
      kind: "array",
      label: "Before steps",
      itemLabel: "Step",
      of: serviceFlowStepFields
    },
    afterSummary: { kind: "text", label: "After summary", multiline: true },
    after: {
      kind: "array",
      label: "After steps",
      itemLabel: "Step",
      of: serviceFlowStepFields
    }
  },
  defaults: () => ({ before: [], after: [], beforeSummary: "", afterSummary: "" }),
  Renderer: ServiceFlowComparison
};

/* ------------------------------------------------------------------ */
/* ProviderTable — { providers: ProviderRow[] }                       */
/* ------------------------------------------------------------------ */

const providerZod = z.object({
  provider: z.string(),
  primaryUse: z.string(),
  strengths: z.string()
});

const providerFields: ObjectFields = {
  provider: { kind: "text", label: "Provider" },
  primaryUse: { kind: "text", label: "Primary use", multiline: true },
  strengths: { kind: "text", label: "Strengths", multiline: true }
};

type ProviderTableProps = { providers: z.infer<typeof providerZod>[] };

const providerTableBlock: BlockDefinition<ProviderTableProps> = {
  type: "voice.providerTable",
  scope: ["caseStudy"],
  display: {
    label: "Provider table",
    group: GROUP,
    icon: Table2,
    description: "TTS provider comparison table"
  },
  schema: z.object({ providers: z.array(providerZod) }),
  fields: {
    providers: {
      kind: "array",
      label: "Providers",
      itemLabel: "Provider",
      of: providerFields
    }
  },
  defaults: () => ({ providers: [] }),
  Renderer: ProviderTable
};

/* ------------------------------------------------------------------ */
/* ArchitectureGrid — { capabilities: {title,body}[] }                */
/* ------------------------------------------------------------------ */

const titleBodyZod = z.object({ title: z.string(), body: z.string() });

const titleBodyFields: ObjectFields = {
  title: { kind: "text", label: "Title" },
  body: { kind: "text", label: "Body", multiline: true }
};

type ArchitectureGridProps = { capabilities: z.infer<typeof titleBodyZod>[] };

const architectureGridBlock: BlockDefinition<ArchitectureGridProps> = {
  type: "voice.architectureGrid",
  scope: ["caseStudy"],
  display: {
    label: "Architecture grid",
    group: GROUP,
    icon: Layers,
    description: "Grid of architecture capability cards"
  },
  schema: z.object({ capabilities: z.array(titleBodyZod) }),
  fields: {
    capabilities: {
      kind: "array",
      label: "Capabilities",
      itemLabel: "Capability",
      of: titleBodyFields
    }
  },
  defaults: () => ({ capabilities: [] }),
  Renderer: ArchitectureGrid
};

/* ------------------------------------------------------------------ */
/* PrincipleGrid — { principles: {title,body}[] }                     */
/* ------------------------------------------------------------------ */

type PrincipleGridProps = { principles: z.infer<typeof titleBodyZod>[] };

const principleGridBlock: BlockDefinition<PrincipleGridProps> = {
  type: "voice.principleGrid",
  scope: ["caseStudy"],
  display: {
    label: "Principle grid",
    group: GROUP,
    icon: ListChecks,
    description: "Numbered grid of design principles"
  },
  schema: z.object({ principles: z.array(titleBodyZod) }),
  fields: {
    principles: {
      kind: "array",
      label: "Principles",
      itemLabel: "Principle",
      of: titleBodyFields
    }
  },
  defaults: () => ({ principles: [] }),
  Renderer: PrincipleGrid
};

/* ------------------------------------------------------------------ */
/* VoiceTypesBlock — { voiceTypes: VoiceType[] }                      */
/* ------------------------------------------------------------------ */

const voiceTypeZod = z.object({
  id: z.string(),
  name: z.string(),
  label: z.string(),
  cost: z.string(),
  quality: z.string(),
  body: z.string(),
  tag: z.enum(["free", "paid"])
});

const voiceTypeFields: ObjectFields = {
  id: { kind: "text", label: "ID" },
  name: { kind: "text", label: "Name" },
  label: { kind: "text", label: "Label" },
  cost: { kind: "text", label: "Cost", multiline: true },
  quality: { kind: "text", label: "Quality" },
  body: { kind: "text", label: "Body", multiline: true },
  tag: {
    kind: "select",
    label: "Tag",
    options: [
      { value: "free", label: "Free" },
      { value: "paid", label: "Paid" }
    ]
  }
};

type VoiceTypesBlockProps = { voiceTypes: z.infer<typeof voiceTypeZod>[] };

const voiceTypesBlock: BlockDefinition<VoiceTypesBlockProps> = {
  type: "voice.voiceTypes",
  scope: ["caseStudy"],
  display: {
    label: "Voice types",
    group: GROUP,
    icon: Volume2,
    description: "Free vs paid voice type comparison cards"
  },
  schema: z.object({ voiceTypes: z.array(voiceTypeZod) }),
  fields: {
    voiceTypes: {
      kind: "array",
      label: "Voice types",
      itemLabel: "Voice type",
      of: voiceTypeFields
    }
  },
  defaults: () => ({ voiceTypes: [] }),
  Renderer: VoiceTypesBlock
};

/* ------------------------------------------------------------------ */
/* VoiceExpertCard — { persona: VoicePersona }                        */
/* ------------------------------------------------------------------ */

const personaZod = z.object({
  id: z.string(),
  emoji: z.string(),
  archetype: z.string(),
  pitch: z.string(),
  needs: z.array(z.string()),
  quote: z.string().optional()
});

const personaFields: ObjectFields = {
  id: { kind: "text", label: "ID" },
  emoji: { kind: "text", label: "Emoji" },
  archetype: { kind: "text", label: "Archetype" },
  pitch: { kind: "text", label: "Pitch", multiline: true },
  needs: {
    kind: "array",
    label: "Needs",
    itemLabel: "Need",
    of: { kind: "text", label: "Need" } as FieldSchema
  },
  quote: { kind: "text", label: "Quote", multiline: true, optional: true }
};

type VoiceExpertCardProps = { persona: z.infer<typeof personaZod> };

const voiceExpertCardBlock: BlockDefinition<VoiceExpertCardProps> = {
  type: "voice.voiceExpertCard",
  scope: ["caseStudy"],
  display: {
    label: "Voice expert card",
    group: GROUP,
    icon: Mic,
    description: "Persona card for the Voice Expert role"
  },
  schema: z.object({ persona: personaZod }),
  fields: {
    persona: { kind: "object", label: "Persona", fields: personaFields }
  },
  defaults: () => ({
    persona: { id: "", emoji: "", archetype: "", pitch: "", needs: [] }
  }),
  Renderer: VoiceExpertCard
};

/* ------------------------------------------------------------------ */
/* MvpEpicsGrid — { epics: MvpEpic[] }                                */
/* ------------------------------------------------------------------ */

const mvpEpicZod = z.object({
  number: z.string(),
  title: z.string(),
  body: z.string(),
  features: z.array(z.string())
});

const mvpEpicFields: ObjectFields = {
  number: { kind: "text", label: "Number" },
  title: { kind: "text", label: "Title" },
  body: { kind: "text", label: "Body", multiline: true },
  features: {
    kind: "array",
    label: "Features",
    itemLabel: "Feature",
    of: { kind: "text", label: "Feature" } as FieldSchema
  }
};

type MvpEpicsGridProps = { epics: z.infer<typeof mvpEpicZod>[] };

const mvpEpicsGridBlock: BlockDefinition<MvpEpicsGridProps> = {
  type: "voice.mvpEpicsGrid",
  scope: ["caseStudy"],
  display: {
    label: "MVP epics grid",
    group: GROUP,
    icon: ListChecks,
    description: "Grid of MVP epics with feature checklists"
  },
  schema: z.object({ epics: z.array(mvpEpicZod) }),
  fields: {
    epics: {
      kind: "array",
      label: "Epics",
      itemLabel: "Epic",
      of: mvpEpicFields
    }
  },
  defaults: () => ({ epics: [] }),
  Renderer: MvpEpicsGrid
};

/* ------------------------------------------------------------------ */
/* RequestFlowBlock — { intro: string; steps: RequestFlowStep[] }     */
/* ------------------------------------------------------------------ */

const requestFlowStepZod = z.object({
  actor: z.string(),
  action: z.string(),
  note: z.string().optional()
});

const requestFlowStepFields: ObjectFields = {
  actor: { kind: "text", label: "Actor" },
  action: { kind: "text", label: "Action", multiline: true },
  note: { kind: "text", label: "Note", multiline: true, optional: true }
};

type RequestFlowBlockProps = {
  intro: string;
  steps: z.infer<typeof requestFlowStepZod>[];
};

const requestFlowBlock: BlockDefinition<RequestFlowBlockProps> = {
  type: "voice.requestFlow",
  scope: ["caseStudy"],
  display: {
    label: "Request flow",
    group: GROUP,
    icon: Route,
    description: "Stepped request lifecycle with intro"
  },
  schema: z.object({
    intro: z.string(),
    steps: z.array(requestFlowStepZod)
  }),
  fields: {
    intro: { kind: "text", label: "Intro", multiline: true },
    steps: {
      kind: "array",
      label: "Steps",
      itemLabel: "Step",
      of: requestFlowStepFields
    }
  },
  defaults: () => ({ intro: "", steps: [] }),
  Renderer: RequestFlowBlock
};

/* ------------------------------------------------------------------ */
/* ShowcaseSection — no props                                         */
/* ------------------------------------------------------------------ */

type ShowcaseSectionProps = Record<string, never>;

const showcaseSectionBlock: BlockDefinition<ShowcaseSectionProps> = {
  type: "voice.showcaseSection",
  scope: ["caseStudy"],
  display: {
    label: "Showcase section",
    group: GROUP,
    icon: GalleryHorizontalEnd,
    description: "Design showcase gallery of platform screens"
  },
  schema: z.object({}) as unknown as z.ZodType<ShowcaseSectionProps>,
  fields: {},
  defaults: () => ({} as ShowcaseSectionProps),
  Renderer: ShowcaseSection
};

/* ------------------------------------------------------------------ */
/* UspGrid — { usps: Usp[] }                                          */
/* ------------------------------------------------------------------ */

const uspZod = z.object({
  id: z.string(),
  number: z.string(),
  title: z.string(),
  body: z.string(),
  tag: z.string(),
  visualLabel: z.string(),
  visualDescription: z.string()
});

const uspFields: ObjectFields = {
  id: { kind: "text", label: "ID" },
  number: { kind: "text", label: "Number" },
  title: { kind: "text", label: "Title" },
  body: { kind: "text", label: "Body", multiline: true },
  tag: { kind: "text", label: "Tag" },
  visualLabel: { kind: "text", label: "Visual label" },
  visualDescription: { kind: "text", label: "Visual description", multiline: true }
};

type UspGridProps = { usps: z.infer<typeof uspZod>[] };

const uspGridBlock: BlockDefinition<UspGridProps> = {
  type: "voice.uspGrid",
  scope: ["caseStudy"],
  display: {
    label: "USP grid",
    group: GROUP,
    icon: Sparkles,
    description: "Unique selling points with visual placeholders"
  },
  schema: z.object({ usps: z.array(uspZod) }),
  fields: {
    usps: {
      kind: "array",
      label: "USPs",
      itemLabel: "USP",
      of: uspFields
    }
  },
  defaults: () => ({ usps: [] }),
  Renderer: UspGrid
};

/* ------------------------------------------------------------------ */
/* Registry                                                           */
/* ------------------------------------------------------------------ */

export const voiceBlocks: BlockDefinition<never>[] = [
  insightListBlock,
  visionShiftBlock,
  serviceFlowComparisonBlock,
  providerTableBlock,
  architectureGridBlock,
  principleGridBlock,
  voiceTypesBlock,
  voiceExpertCardBlock,
  mvpEpicsGridBlock,
  requestFlowBlock,
  showcaseSectionBlock,
  uspGridBlock
] as unknown as BlockDefinition<never>[];
