"use client";

import { getDefinition } from "./registry";
import type { BlockRow } from "./types";

/**
 * Renders an ordered list of persisted blocks via the registry. Unknown types are
 * skipped (forward-compat); invalid props fall back to raw props rather than crashing.
 * Container blocks receive their nested children via a `children` prop.
 */
export function BlockList({ blocks }: { blocks: BlockRow[] }) {
  const topLevel = blocks
    .filter((b) => b.parentId === null)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      {topLevel.map((block) => (
        <RenderBlock key={block.id} block={block} all={blocks} />
      ))}
    </>
  );
}

function RenderBlock({ block, all }: { block: BlockRow; all: BlockRow[] }) {
  const def = getDefinition(block.type);
  if (!def) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[blocks] unknown block type "${block.type}" — skipped`);
    }
    return null;
  }

  const parsed = def.schema.safeParse(block.props);
  const props = (parsed.success ? parsed.data : block.props) as Record<string, unknown>;

  if (def.container) {
    const children = all
      .filter((b) => b.parentId === block.id)
      .sort((a, b) => a.sortOrder - b.sortOrder);
    const Renderer = def.Renderer as React.ComponentType<Record<string, unknown>>;
    return (
      <Renderer {...props}>
        {children.map((child) => (
          <RenderBlock key={child.id} block={child} all={all} />
        ))}
      </Renderer>
    );
  }

  const Renderer = def.Renderer as React.ComponentType<Record<string, unknown>>;
  return <Renderer {...props} />;
}
