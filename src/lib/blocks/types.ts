import type { z } from "zod";
import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";

/**
 * Field-schema: a declarative description of a block's editable props.
 * The admin AutoForm walks this tree to render an editor; renderers ignore it.
 */
export type FieldSchema =
  | { kind: "text"; label: string; placeholder?: string; multiline?: boolean; optional?: boolean }
  | { kind: "number"; label: string; min?: number; max?: number; optional?: boolean }
  | { kind: "boolean"; label: string }
  | { kind: "color"; label: string; optional?: boolean }
  | { kind: "select"; label: string; options: Array<{ value: string; label: string }>; optional?: boolean }
  | { kind: "asset"; label: string; resourceType?: "image" | "video"; optional?: boolean }
  | { kind: "array"; label: string; of: FieldSchema | ObjectFields; itemLabel?: string }
  | { kind: "object"; label: string; fields: ObjectFields; optional?: boolean };

export type ObjectFields = Record<string, FieldSchema>;

/** Which add-block pickers surface this block. */
export type BlockScope = "home" | "caseStudy";

export type BlockDisplay = {
  label: string;
  group: string;
  icon: LucideIcon;
  description: string;
};

/**
 * A single source of truth per block type. The render half (Renderer) ships to the
 * public bundle; the edit half (fields/defaults/display/schema) ships only to /admin.
 */
export type BlockDefinition<P = Record<string, unknown>> = {
  type: string;
  scope: BlockScope[];
  /** True for layout containers (e.g. SectionShell) that nest child blocks. */
  container?: boolean;
  /** Allowlist of block types that may be added as children. Undefined = no restriction. */
  allowedChildren?: string[];
  display: BlockDisplay;
  schema: z.ZodType<P>;
  fields: ObjectFields;
  defaults: () => P;
  Renderer: ComponentType<P>;
};

/** A persisted block row (draft or published) read from page_blocks. */
export type BlockRow = {
  id: string;
  parentId: string | null;
  type: string;
  props: Record<string, unknown>;
  sortOrder: number;
};
