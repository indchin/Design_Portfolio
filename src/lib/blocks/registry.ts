import type { BlockDefinition, BlockScope } from "./types";
import { homeBlocks } from "./definitions/home";
import { caseStudyGenericBlocks } from "./definitions/case-study";
import { editorialBlocks } from "./definitions/editorial";
import { nrpBlocks } from "./definitions/nrp";
import { voiceBlocks } from "./definitions/voice";

/**
 * The complete block registry — the single source of truth mapping a `type` string
 * to its schema, editor field-schema, defaults, display metadata, and Renderer.
 *
 * Both homepage sections and case-study blocks live here; they differ only by `scope`.
 */
const allDefinitions: BlockDefinition<never>[] = [
  ...homeBlocks,
  ...caseStudyGenericBlocks,
  ...editorialBlocks,
  ...nrpBlocks,
  ...voiceBlocks
] as BlockDefinition<never>[];

export const registry: Record<string, BlockDefinition<never>> = Object.fromEntries(
  allDefinitions.map((def) => [def.type, def])
);

export function getDefinition(type: string): BlockDefinition<never> | undefined {
  return registry[type];
}

/** Definitions a given page surface (home / caseStudy) can add, for the add-block picker. */
export function definitionsForScope(scope: BlockScope): BlockDefinition<never>[] {
  return allDefinitions.filter((def) => def.scope.includes(scope));
}

/** Definitions valid as children of a given container block type. */
export function definitionsForContainer(containerType: string, scope: BlockScope): BlockDefinition<never>[] {
  const containerDef = registry[containerType];
  if (!containerDef?.allowedChildren) return definitionsForScope(scope);
  return containerDef.allowedChildren
    .map((t) => registry[t])
    .filter((d): d is BlockDefinition<never> => !!d && d.scope.includes(scope));
}
