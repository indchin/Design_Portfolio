"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { definitionsForScope, definitionsForContainer } from "@/lib/blocks/registry";
import type { BlockDefinition, BlockScope } from "@/lib/blocks/types";

type Props = {
  scope: BlockScope;
  onAdd: (def: BlockDefinition<never>) => void;
  parentId?: string | null;
  /** Block type of the container — used to filter allowedChildren. */
  containerType?: string;
};

export function AddBlockPicker({ scope, onAdd, parentId, containerType }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const defs = containerType
    ? definitionsForContainer(containerType, scope)
    : definitionsForScope(scope);

  const filtered = defs.filter((d) =>
    `${d.display.label} ${d.display.group} ${d.display.description}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, BlockDefinition<never>[]>>((acc, def) => {
    (acc[def.display.group] ??= []).push(def);
    return acc;
  }, {});

  const isChild = parentId != null;

  if (!open) {
    return (
      <Button
        size="sm"
        variant="secondary"
        onClick={() => setOpen(true)}
        className={cn("w-full border-dashed", isChild && "ml-8 w-[calc(100%-2rem)]")}
      >
        <Plus className="h-3.5 w-3.5" />
        {isChild ? "Add content block" : "Add block"}
      </Button>
    );
  }

  return (
    <div className={cn("flex max-h-[min(480px,60vh)] flex-col rounded-lg border border-border bg-surface/90 p-3", isChild && "ml-8")}>
      <div className="mb-3 flex shrink-0 items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isChild ? "Search content blocks…" : "Search blocks…"}
            className="pl-8 text-xs"
            autoFocus
          />
        </div>
        <Button size="sm" variant="ghost" onClick={() => { setOpen(false); setQuery(""); }}>
          Cancel
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {Object.entries(grouped).map(([group, items]) => (
          <div key={group} className="mb-3 last:mb-0">
            <div className="mb-1.5 px-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              {group}
            </div>
            <div className="grid gap-1">
              {items.map((def) => {
                const Icon = def.display.icon;
                return (
                  <button
                    key={def.type}
                    onClick={() => { onAdd(def); setOpen(false); setQuery(""); }}
                    className="flex items-start gap-2.5 rounded-md px-2 py-2 text-left hover:bg-white/[0.07] transition"
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <div className="text-sm font-medium">{def.display.label}</div>
                      <div className="text-xs text-muted-foreground">{def.display.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-4 text-center text-xs text-muted-foreground">No blocks match &ldquo;{query}&rdquo;</p>
        )}
      </div>
    </div>
  );
}
