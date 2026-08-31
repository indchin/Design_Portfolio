"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MAX_HISTORY = 50;

export function useUndoRedo<T>(initial: T) {
  // past[0] is oldest, past[last] is the state just before present
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState<T>(initial);
  const [future, setFuture] = useState<T[]>([]);

  // Track whether the initial value has been set (after async load)
  const initialised = useRef(false);

  /** Replace present without pushing to history — use after initial load. */
  const reset = useCallback((value: T) => {
    initialised.current = true;
    setPast([]);
    setPresent(value);
    setFuture([]);
  }, []);

  /** Push a new state onto the history stack. */
  const push = useCallback((value: T) => {
    if (!initialised.current) return;
    setPast((p) => [...p.slice(-MAX_HISTORY + 1), present]);
    setPresent(value);
    setFuture([]);
  }, [present]);

  const undo = useCallback(() => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    setPast((p) => p.slice(0, -1));
    setFuture((f) => [present, ...f]);
    setPresent(previous);
  }, [past, present]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture((f) => f.slice(1));
    setPast((p) => [...p, present]);
    setPresent(next);
  }, [future, present]);

  return {
    value: present,
    push,
    reset,
    undo,
    redo,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
  };
}
