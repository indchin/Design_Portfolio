import { z } from "zod";
import { FileText } from "lucide-react";
import type { BlockDefinition } from "../types";

/**
 * Generic case-study section — mirrors the original CaseStudySection shape
 * ({ type, title, body, bullets }) used by the data-driven case studies.
 * Renders the same markup the legacy work/[slug] page used.
 */

const SECTION_TYPES = [
  "problem", "research", "personas", "journey", "ia", "process", "wireframes",
  "ui", "system", "accessibility", "ai", "metrics", "lessons", "media", "comparison"
] as const;

type GenericSectionProps = {
  sectionType: string;
  title: string;
  body: string;
  bullets?: string[];
};

function GenericSection({ sectionType, title, body, bullets }: GenericSectionProps) {
  const anchor = `${sectionType}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <section id={anchor} className="scroll-mt-24 case-content">
      <h2>{title}</h2>
      <p>{body}</p>
      {bullets && bullets.length > 0 ? (
        <ul>
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

const genericSectionBlock: BlockDefinition<GenericSectionProps> = {
  type: "cs.section",
  scope: ["caseStudy"],
  display: {
    label: "Text section",
    group: "Case study — generic",
    icon: FileText,
    description: "Heading, prose, and optional bullet list"
  },
  schema: z.object({
    sectionType: z.string(),
    title: z.string(),
    body: z.string(),
    bullets: z.array(z.string()).optional()
  }),
  fields: {
    sectionType: {
      kind: "select",
      label: "Section type",
      options: SECTION_TYPES.map((t) => ({ value: t, label: t }))
    },
    title: { kind: "text", label: "Title" },
    body: { kind: "text", label: "Body", multiline: true },
    bullets: { kind: "array", label: "Bullets", itemLabel: "Bullet", of: { kind: "text", label: "Bullet" } as never }
  },
  defaults: () => ({ sectionType: "process", title: "New section", body: "" }),
  Renderer: GenericSection
};

export const caseStudyGenericBlocks: BlockDefinition<never>[] = [
  genericSectionBlock
] as unknown as BlockDefinition<never>[];
