"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Boxes, Loader2, Redo2, Trash2, Undo2, X } from "lucide-react";
import { useUndoRedo } from "@/hooks/use-undo-redo";
import { BlockList } from "@/lib/blocks/block-list";
import { AutoForm } from "./auto-form";
import { AddBlockPicker } from "./add-block-picker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDefinition } from "@/lib/blocks/registry";
import type { BlockRow } from "@/lib/blocks/types";
import type { BlockDefinition, BlockScope } from "@/lib/blocks/types";
import type { PageMeta } from "@/lib/blocks/data";

type Props = { page: PageMeta };

type SaveStatus = "idle" | "saving" | "saved" | "error";

export function BlockCanvas({ page }: Props) {
  const { value: blocks, push: pushBlocks, reset: resetBlocks, undo, redo, canUndo, canRedo } = useUndoRedo<BlockRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const pageId = page.id;
  const scope: BlockScope = page.kind === "home" ? "home" : "caseStudy";

  // Always holds the latest blocks so the autosave callback reads current state.
  const blocksRef = useRef<BlockRow[]>([]);
  useEffect(() => { blocksRef.current = blocks; }, [blocks]);

  // Keyboard shortcuts: Ctrl/Cmd+Z = undo, Ctrl/Cmd+Shift+Z = redo
  const undoRedoFiredRef = useRef(false);
  const handleUndo = useCallback(() => { undoRedoFiredRef.current = true; undo(); }, [undo]);
  const handleRedo = useCallback(() => { undoRedoFiredRef.current = true; redo(); }, [redo]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      if (e.key === "z" && !e.shiftKey) { e.preventDefault(); handleUndo(); }
      if ((e.key === "z" && e.shiftKey) || e.key === "y") { e.preventDefault(); handleRedo(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleUndo, handleRedo]);

  // Reset the "saved" badge after a moment; cleared on unmount.
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleIdle = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setSaveStatus("idle"), 2000);
  }, []);

  // After undo/redo, persist all blocks to server
  const saveAllRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!undoRedoFiredRef.current) return;
    undoRedoFiredRef.current = false;
    if (loading || blocks.length === 0) return;
    if (saveAllRef.current) clearTimeout(saveAllRef.current);
    saveAllRef.current = setTimeout(async () => {
      setSaveStatus("saving");
      try {
        await Promise.all(
          blocks.map((b) =>
            fetch(`/api/pages/${pageId}/blocks`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                op: "upsert",
                block: { id: b.id, parentId: b.parentId, type: b.type, props: b.props, sortOrder: b.sortOrder }
              })
            })
          )
        );
        setSaveStatus("saved");
        scheduleIdle();
      } catch {
        setSaveStatus("error");
      }
    }, 400);
  }, [blocks, loading, pageId, scheduleIdle]);

  useEffect(
    () => () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    },
    []
  );

  // ── Load ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    fetch(`/api/pages/${pageId}/blocks`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<{ blocks: BlockRow[] }>;
      })
      .then(({ blocks: loaded }) => {
        if (cancelled) return;
        resetBlocks(loaded);
        setLoadError(null);
        setSelectedId(null);
        setLoading(false);
      })
      .catch((e: Error) => {
        if (cancelled) return;
        setLoadError(e.message);
        setLoading(false);
      });
    return () => { cancelled = true; setLoading(true); resetBlocks([]); };
  }, [pageId, resetBlocks]);

  // ── Autosave (debounced 800ms) ─────────────────────────────────────────────
  const dirtyRef = useRef<Set<string>>(new Set());
  const pendingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleSave = useCallback(
    (blockId: string, patch: BlockRow) => {
      dirtyRef.current.add(blockId);
      if (pendingTimer.current) clearTimeout(pendingTimer.current);
      pendingTimer.current = setTimeout(async () => {
        const ids = [...dirtyRef.current];
        dirtyRef.current.clear();
        setSaveStatus("saving");
        try {
          await Promise.all(
            ids.map((id) => {
              const b = blocksRef.current.find((x) => x.id === id) ?? patch;
              return fetch(`/api/pages/${pageId}/blocks`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  op: "upsert",
                  block: {
                    id: b.id,
                    parentId: b.parentId,
                    type: b.type,
                    props: b.props,
                    sortOrder: b.sortOrder
                  }
                })
              });
            })
          );
          setSaveStatus("saved");
          scheduleIdle();
        } catch {
          setSaveStatus("error");
        }
      }, 800);
    },
    [pageId, scheduleIdle]
  );

  // ── Block mutations ────────────────────────────────────────────────────────
  function updateBlock(id: string, props: Record<string, unknown>) {
    const next = blocks.map((b) => (b.id === id ? { ...b, props } : b));
    pushBlocks(next);
    const updated = next.find((b) => b.id === id)!;
    scheduleSave(id, updated);
  }

  async function deleteBlock(id: string) {
    // Server-first: wait for confirmation before updating local state so undo
    // history is never ahead of what the server has persisted.
    const res = await fetch(`/api/pages/${pageId}/blocks`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ op: "delete", id })
    });
    if (!res.ok) return; // leave state unchanged on failure
    pushBlocks(blocksRef.current.filter((b) => b.id !== id && b.parentId !== id));
    if (selectedId === id) setSelectedId(null);
  }

  async function addBlock(def: BlockDefinition<never>, parentId: string | null = null) {
    // Use blocksRef (not the render-closure `blocks`) so rapid adds get the correct sortOrder.
    const siblings = blocksRef.current.filter((b) => b.parentId === parentId);
    const sortOrder = siblings.length > 0 ? Math.max(...siblings.map((b) => b.sortOrder)) + 1 : 0;

    const res = await fetch(`/api/pages/${pageId}/blocks`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        op: "upsert",
        block: {
          parentId,
          type: def.type,
          props: def.defaults(),
          sortOrder
        }
      })
    });

    if (res.ok) {
      const { id } = await res.json() as { id: string };
      pushBlocks([
        ...blocksRef.current,
        { id, parentId, type: def.type, props: def.defaults() as Record<string, unknown>, sortOrder }
      ]);
      setSelectedId(id);
    }
  }

  async function moveBlock(id: string, dir: -1 | 1) {
    const block = blocks.find((b) => b.id === id);
    if (!block) return;
    const siblings = blocks
      .filter((b) => b.parentId === block.parentId)
      .sort((a, b) => a.sortOrder - b.sortOrder);
    const idx = siblings.findIndex((b) => b.id === id);
    const target = idx + dir;
    if (target < 0 || target >= siblings.length) return;

    // Swap sort_order values
    const a = siblings[idx];
    const b2 = siblings[target];
    const newOrder = [
      { id: a.id, sortOrder: b2.sortOrder },
      { id: b2.id, sortOrder: a.sortOrder }
    ];

    pushBlocks(
      blocks.map((bl) => {
        const found = newOrder.find((x) => x.id === bl.id);
        return found ? { ...bl, sortOrder: found.sortOrder } : bl;
      })
    );

    await fetch(`/api/pages/${pageId}/blocks`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ op: "reorder", order: newOrder })
    });
  }

  // ── Render ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="ml-2 text-sm">Loading…</span>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-red-400">Failed to load: {loadError}</p>
      </div>
    );
  }

  const selected = blocks.find((b) => b.id === selectedId) ?? null;
  const selectedDef = selected ? getDefinition(selected.type) : null;
  const selectedParent = selected?.parentId ? blocks.find((b) => b.id === selected.parentId) : null;
  const selectedParentDef = selectedParent ? getDefinition(selectedParent.type) : null;

  // Top-level and child blocks for the editable frame layer
  const topLevelBlocks = blocks.filter((b) => b.parentId === null).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="flex h-full">
      {/* Canvas area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 pb-1 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleUndo}
              disabled={!canUndo}
              title="Undo (⌘Z)"
              className="rounded p-1.5 text-muted-foreground hover:bg-fill-subtle/10 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <Undo2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleRedo}
              disabled={!canRedo}
              title="Redo (⌘⇧Z)"
              className="rounded p-1.5 text-muted-foreground hover:bg-fill-subtle/10 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <Redo2 className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className="text-xs text-muted-foreground">
            {saveStatus === "saving" && "Saving…"}
            {saveStatus === "saved" && "Draft saved"}
            {saveStatus === "error" && <span className="text-red-400">Save failed</span>}
          </span>
        </div>

        {/* Editable block frames */}
        <div className="px-4 pb-8 space-y-2">
          {topLevelBlocks.map((block) => (
            <EditableBlockFrame
              key={block.id}
              block={block}
              allBlocks={blocks}
              selected={selectedId === block.id}
              onSelect={setSelectedId}
              onDelete={deleteBlock}
              onMove={moveBlock}
              onAddChild={(def) => addBlock(def, block.id)}
              isContainer={!!getDefinition(block.type)?.container}
              scope={scope}
              selectedId={selectedId}
            />
          ))}

          <AddBlockPicker scope={scope} onAdd={(def) => addBlock(def, null)} />
        </div>
      </div>

      {/* Edit panel */}
      {selected && selectedDef && (
        <aside className="w-80 shrink-0 border-l border-border sticky top-0 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="sticky top-0 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur">
            <div className="min-w-0">
              {selectedParentDef && (
                <div className="mb-0.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Boxes className="h-3 w-3 shrink-0" />
                  <span className="truncate">
                    {(selectedParent?.props as Record<string,unknown> | undefined)?.title
                      ? String((selectedParent?.props as Record<string,unknown>).title)
                      : selectedParentDef.display.label}
                  </span>
                </div>
              )}
              <div className="text-sm font-semibold">{selectedDef.display.label}</div>
              <div className="text-xs text-muted-foreground">{selectedDef.display.group}</div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSelectedId(null)} aria-label="Close panel">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4">
            {Object.keys(selectedDef.fields).length > 0 ? (
              <AutoForm
                fields={selectedDef.fields}
                values={selected.props}
                onChange={(next) => updateBlock(selected.id, next)}
              />
            ) : (
              <p className="text-xs text-muted-foreground">This block has no editable fields.</p>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}

// ── Editable frame around each top-level block ─────────────────────────────

type FrameProps = {
  block: BlockRow;
  allBlocks: BlockRow[];
  selected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, dir: -1 | 1) => void;
  onAddChild: (def: BlockDefinition<never>) => void;
  isContainer: boolean;
  scope: BlockScope;
  selectedId: string | null;
};

function EditableBlockFrame({
  block,
  allBlocks,
  selected,
  onSelect,
  onDelete,
  onMove,
  onAddChild,
  isContainer,
  scope,
  selectedId
}: FrameProps) {
  const def = getDefinition(block.type);
  const label = def?.display.label ?? block.type;

  return (
    <div className="group/frame relative">
      {/* Control bar — shown on hover or when selected */}
      <div
        className={cn(
          "relative flex items-center justify-between gap-2 rounded-t-md border border-b-0 px-3 py-1.5 text-xs transition-opacity",
          selected
            ? "border-primary/60 bg-primary/10 opacity-100"
            : "border-border bg-surface/60 opacity-0 group-hover/frame:opacity-100"
        )}
      >
        <button
          type="button"
          onClick={() => onSelect(block.id)}
          className="font-medium hover:text-primary truncate flex-1 text-left"
        >
          {label}
        </button>
        {isContainer && (
          <span className="flex items-center gap-0.5 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary shrink-0">
            <Boxes className="h-2.5 w-2.5" />
            Section
          </span>
        )}
        <div className="flex items-center gap-0.5 shrink-0">
          <button type="button" onClick={() => onMove(block.id, -1)} className="rounded p-1 hover:bg-fill-subtle/10" aria-label="Move block up">
            <ArrowUp className="h-3 w-3" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => onMove(block.id, 1)} className="rounded p-1 hover:bg-fill-subtle/10" aria-label="Move block down">
            <ArrowDown className="h-3 w-3" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(block.id)}
            className="rounded p-1 text-red-400 hover:bg-red-400/10"
            aria-label="Delete block"
          >
            <Trash2 className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Rendered block — click selects the block for editing */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Select ${label} block`}
        className={cn(
          "relative rounded-b-md border overflow-hidden transition-colors cursor-pointer",
          selected ? "border-primary/60" : "border-transparent group-hover/frame:border-border"
        )}
        onClick={() => onSelect(block.id)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect(block.id); }}
      >
        <div className="pointer-events-none">
          <BlockList blocks={[block, ...allBlocks.filter((b) => b.parentId === block.id)]} />
        </div>

        {/* Child block frames for containers */}
        {isContainer && (
          <div className="pointer-events-auto px-4 pb-4 space-y-2">
            {(() => {
              const children = allBlocks
                .filter((b) => b.parentId === block.id)
                .sort((a, b) => a.sortOrder - b.sortOrder);
              return children.length === 0 ? (
                <div className="rounded-md border border-dashed border-border/40 py-5 text-center">
                  <Boxes className="mx-auto mb-1.5 h-4 w-4 text-muted-foreground/50" />
                  <p className="text-xs text-muted-foreground">No content blocks yet</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground/60">Use &ldquo;Add content block&rdquo; below</p>
                </div>
              ) : (
                children.map((child) => (
                  <ChildBlockFrame
                    key={child.id}
                    block={child}
                    selected={selectedId === child.id}
                    onSelect={onSelect}
                    onDelete={onDelete}
                    onMove={onMove}
                  />
                ))
              );
            })()}
            <AddBlockPicker scope={scope} onAdd={onAddChild} parentId={block.id} containerType={block.type} />
          </div>
        )}
      </div>
    </div>
  );
}

type ChildFrameProps = {
  block: BlockRow;
  selected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, dir: -1 | 1) => void;
};

function ChildBlockFrame({ block, selected, onSelect, onDelete, onMove }: ChildFrameProps) {
  const def = getDefinition(block.type);
  const label = def?.display.label ?? block.type;
  const Icon = def?.display.icon;

  return (
    <div
      className={cn(
        "group/child relative ml-4 rounded-md border transition cursor-pointer",
        selected
          ? "border-primary/60 bg-primary/5"
          : "border-dashed border-border/50 hover:border-border"
      )}
      onClick={() => onSelect(block.id)}
    >
      {/* Header row */}
      <div className="flex items-center justify-between gap-2 px-2 py-1.5 text-xs">
        <div className="flex items-center gap-1.5 min-w-0">
          {Icon && <Icon className={cn("h-3.5 w-3.5 shrink-0", selected ? "text-primary" : "text-muted-foreground")} />}
          <span className={cn("font-medium truncate", selected && "text-primary")}>{label}</span>
        </div>
        {/* Controls — always visible when selected, hover-only otherwise */}
        <div
          className={cn(
            "flex items-center gap-0.5 transition-opacity",
            selected ? "opacity-100" : "opacity-0 group-hover/child:opacity-100"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <button type="button" onClick={() => onMove(block.id, -1)} className="rounded p-0.5 hover:bg-fill-subtle/10" aria-label="Move up">
            <ArrowUp className="h-3 w-3" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => onMove(block.id, 1)} className="rounded p-0.5 hover:bg-fill-subtle/10" aria-label="Move down">
            <ArrowDown className="h-3 w-3" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => onDelete(block.id)} className="rounded p-0.5 text-red-400 hover:bg-red-400/10" aria-label="Delete">
            <Trash2 className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Block description as a visual preview hint */}
      {def?.display.description && (
        <div className="border-t border-border/30 px-2 py-1.5">
          <p className="text-[10px] leading-relaxed text-muted-foreground/70">{def.display.description}</p>
        </div>
      )}
    </div>
  );
}
