import { z } from "zod";
import {
  Image,
  Users,
  Columns,
  ListChecks,
  Table,
  ShieldCheck,
  GitMerge,
  TrendingUp,
  Lightbulb
} from "lucide-react";
import {
  VisualPlaceholder,
  RoleGrid,
  PillarList,
  KeyDecisionList,
  RankTable,
  AccessibilityBlock,
  MigrationBlock,
  NrpImpactBlock,
  NrpReflectionList
} from "@/components/case-study/nrp-blocks";
import type { BlockDefinition, FieldSchema } from "../types";

/**
 * NRP case-study blocks — wraps each exported component from
 * src/components/case-study/nrp-blocks.tsx as a BlockDefinition.
 * Props mirror the type definitions in
 * src/content/case-studies/neonatal-resuscitation-program.ts.
 */

/* ── nrp.visualPlaceholder ─────────────────────────────────────────── */

type VisualPlaceholderProps = { label: string; description?: string };

const visualPlaceholderBlock: BlockDefinition<VisualPlaceholderProps> = {
  type: "nrp.visualPlaceholder",
  scope: ["caseStudy"],
  display: {
    label: "Visual placeholder",
    group: "Case study — NRP",
    icon: Image,
    description: "Dashed visual-showcase frame with a label and optional caption"
  },
  schema: z.object({
    label: z.string(),
    description: z.string().optional()
  }),
  fields: {
    label: { kind: "text", label: "Label" },
    description: { kind: "text", label: "Description", multiline: true, optional: true }
  },
  defaults: () => ({ label: "Visual" }),
  Renderer: VisualPlaceholder
};

/* ── nrp.roleGrid ──────────────────────────────────────────────────── */

type NrpRoleType = {
  id: string;
  emoji: string;
  archetype: string;
  pitch: string;
  needs: string[];
  quote?: string;
};

type RoleGridProps = { roles: NrpRoleType[] };

const roleGridBlock: BlockDefinition<RoleGridProps> = {
  type: "nrp.roleGrid",
  scope: ["caseStudy"],
  display: {
    label: "Role grid",
    group: "Case study — NRP",
    icon: Users,
    description: "Grid of user-role archetype cards with needs and an optional quote"
  },
  schema: z.object({
    roles: z.array(
      z.object({
        id: z.string(),
        emoji: z.string(),
        archetype: z.string(),
        pitch: z.string(),
        needs: z.array(z.string()),
        quote: z.string().optional()
      })
    )
  }),
  fields: {
    roles: {
      kind: "array",
      label: "Roles",
      itemLabel: "Role",
      of: {
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
      }
    }
  },
  defaults: () => ({ roles: [] }),
  Renderer: RoleGrid
};

/* ── nrp.pillarList ────────────────────────────────────────────────── */

type PillarListProps = {
  intro: string;
  pillars: { title: string; body: string }[];
};

const pillarListBlock: BlockDefinition<PillarListProps> = {
  type: "nrp.pillarList",
  scope: ["caseStudy"],
  display: {
    label: "Pillar list",
    group: "Case study — NRP",
    icon: Columns,
    description: "Intro paragraph plus a numbered grid of titled pillars"
  },
  schema: z.object({
    intro: z.string(),
    pillars: z.array(
      z.object({
        title: z.string(),
        body: z.string()
      })
    )
  }),
  fields: {
    intro: { kind: "text", label: "Intro", multiline: true },
    pillars: {
      kind: "array",
      label: "Pillars",
      itemLabel: "Pillar",
      of: {
        title: { kind: "text", label: "Title" },
        body: { kind: "text", label: "Body", multiline: true }
      }
    }
  },
  defaults: () => ({ intro: "", pillars: [] }),
  Renderer: PillarList
};

/* ── nrp.keyDecisionList ───────────────────────────────────────────── */

type KeyDecision = {
  id: string;
  number: string;
  title: string;
  body: string[];
  rationale: string;
  visualLabel?: string;
  visualDescription?: string;
};

type KeyDecisionListProps = { decisions: KeyDecision[] };

const keyDecisionListBlock: BlockDefinition<KeyDecisionListProps> = {
  type: "nrp.keyDecisionList",
  scope: ["caseStudy"],
  display: {
    label: "Key decision list",
    group: "Case study — NRP",
    icon: ListChecks,
    description: "Numbered design decisions with body, rationale, and optional visual"
  },
  schema: z.object({
    decisions: z.array(
      z.object({
        id: z.string(),
        number: z.string(),
        title: z.string(),
        body: z.array(z.string()),
        rationale: z.string(),
        visualLabel: z.string().optional(),
        visualDescription: z.string().optional()
      })
    )
  }),
  fields: {
    decisions: {
      kind: "array",
      label: "Decisions",
      itemLabel: "Decision",
      of: {
        id: { kind: "text", label: "ID" },
        number: { kind: "text", label: "Number" },
        title: { kind: "text", label: "Title" },
        body: {
          kind: "array",
          label: "Body paragraphs",
          itemLabel: "Paragraph",
          of: { kind: "text", label: "Paragraph", multiline: true } as FieldSchema
        },
        rationale: { kind: "text", label: "Rationale", multiline: true },
        visualLabel: { kind: "text", label: "Visual label", optional: true },
        visualDescription: {
          kind: "text",
          label: "Visual description",
          multiline: true,
          optional: true
        }
      }
    }
  },
  defaults: () => ({ decisions: [] }),
  Renderer: KeyDecisionList
};

/* ── nrp.rankTable ─────────────────────────────────────────────────── */

type RankDef = { rank: string; status: string; rule: string };

type RankTableProps = { ranks: RankDef[] };

const rankTableBlock: BlockDefinition<RankTableProps> = {
  type: "nrp.rankTable",
  scope: ["caseStudy"],
  display: {
    label: "Rank table",
    group: "Case study — NRP",
    icon: Table,
    description: "Table of ranks, statuses, and business rules"
  },
  schema: z.object({
    ranks: z.array(
      z.object({
        rank: z.string(),
        status: z.string(),
        rule: z.string()
      })
    )
  }),
  fields: {
    ranks: {
      kind: "array",
      label: "Ranks",
      itemLabel: "Rank",
      of: {
        rank: { kind: "text", label: "Rank" },
        status: { kind: "text", label: "Status" },
        rule: { kind: "text", label: "Business rule", multiline: true }
      }
    }
  },
  defaults: () => ({ ranks: [] }),
  Renderer: RankTable
};

/* ── nrp.accessibility ─────────────────────────────────────────────── */

type AccessibilityBlockProps = { intro: string; items: string[] };

const accessibilityBlock: BlockDefinition<AccessibilityBlockProps> = {
  type: "nrp.accessibility",
  scope: ["caseStudy"],
  display: {
    label: "Accessibility block",
    group: "Case study — NRP",
    icon: ShieldCheck,
    description: "Accessibility-as-clinical-safety intro with a checklist of items"
  },
  schema: z.object({
    intro: z.string(),
    items: z.array(z.string())
  }),
  fields: {
    intro: { kind: "text", label: "Intro", multiline: true },
    items: {
      kind: "array",
      label: "Items",
      itemLabel: "Item",
      of: { kind: "text", label: "Item", multiline: true } as FieldSchema
    }
  },
  defaults: () => ({ intro: "", items: [] }),
  Renderer: AccessibilityBlock
};

/* ── nrp.migration ─────────────────────────────────────────────────── */

type MigrationBlockProps = { summary: string; items: string[] };

const migrationBlock: BlockDefinition<MigrationBlockProps> = {
  type: "nrp.migration",
  scope: ["caseStudy"],
  display: {
    label: "Migration block",
    group: "Case study — NRP",
    icon: GitMerge,
    description: "Summary paragraph plus a numbered list of migration steps"
  },
  schema: z.object({
    summary: z.string(),
    items: z.array(z.string())
  }),
  fields: {
    summary: { kind: "text", label: "Summary", multiline: true },
    items: {
      kind: "array",
      label: "Items",
      itemLabel: "Item",
      of: { kind: "text", label: "Item", multiline: true } as FieldSchema
    }
  },
  defaults: () => ({ summary: "", items: [] }),
  Renderer: MigrationBlock
};

/* ── nrp.impact ────────────────────────────────────────────────────── */

type NrpImpactBlockProps = {
  impact: {
    delivered: string[];
    unmeasured: string;
  };
};

const nrpImpactBlock: BlockDefinition<NrpImpactBlockProps> = {
  type: "nrp.impact",
  scope: ["caseStudy"],
  display: {
    label: "Impact block",
    group: "Case study — NRP",
    icon: TrendingUp,
    description: "What the work delivered plus an honest \"not yet measured\" framing"
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
  Renderer: NrpImpactBlock
};

/* ── nrp.reflectionList ────────────────────────────────────────────── */

type ReflectionItem = { heading: string; body: string };

type NrpReflectionListProps = { items: ReflectionItem[] };

const nrpReflectionListBlock: BlockDefinition<NrpReflectionListProps> = {
  type: "nrp.reflectionList",
  scope: ["caseStudy"],
  display: {
    label: "Reflection list",
    group: "Case study — NRP",
    icon: Lightbulb,
    description: "Grid of reflection cards, each with a heading and body"
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
      itemLabel: "Reflection",
      of: {
        heading: { kind: "text", label: "Heading" },
        body: { kind: "text", label: "Body", multiline: true }
      }
    }
  },
  defaults: () => ({ items: [] }),
  Renderer: NrpReflectionList
};

export const nrpBlocks: BlockDefinition<never>[] = [
  visualPlaceholderBlock,
  roleGridBlock,
  pillarListBlock,
  keyDecisionListBlock,
  rankTableBlock,
  accessibilityBlock,
  migrationBlock,
  nrpImpactBlock,
  nrpReflectionListBlock
] as unknown as BlockDefinition<never>[];
