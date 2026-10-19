"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/*
 * Shared modal dialog built on the native <dialog> element + showModal().
 * The browser provides: focus moved into the dialog, focus trap, inert background,
 * and Escape routed to the topmost modal only (so a lightbox over a modal closes alone).
 * We add: focus restore on unmount, ref-counted body scroll lock, and backdrop click.
 *
 * Mount it conditionally ({open && <Dialog ... />}); unmounting closes it.
 * Provide either `labelledBy` (id of the heading) or `label`.
 */

let scrollLocks = 0;

function lockScroll() {
  if (scrollLocks++ === 0) document.body.style.overflow = "hidden";
}

function unlockScroll() {
  if (--scrollLocks === 0) document.body.style.overflow = "";
}

type DialogProps = {
  onClose: () => void;
  labelledBy?: string;
  label?: string;
  /** Classes for the full-screen flex wrapper (padding, alignment, dim colour). */
  overlayClassName?: string;
  /** Classes for the content panel. */
  className?: string;
  children: React.ReactNode;
};

export function Dialog({ onClose, labelledBy, label, overlayClassName, className, children }: DialogProps) {
  const ref = React.useRef<HTMLDialogElement>(null);
  const onCloseRef = React.useRef(onClose);

  React.useEffect(() => {
    onCloseRef.current = onClose;
  });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    if (!el.open) el.showModal();
    lockScroll();

    return () => {
      unlockScroll();
      if (el.open) el.close();
      if (trigger && trigger.isConnected) trigger.focus();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
      data-lenis-prevent
      onCancel={(event) => {
        event.preventDefault();
        onCloseRef.current();
      }}
      onClose={() => onCloseRef.current()}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-foreground backdrop:bg-transparent"
    >
      <div
        className={cn("flex h-full w-full items-center justify-center", overlayClassName)}
        onClick={(event) => {
          if (event.target === event.currentTarget) onCloseRef.current();
        }}
      >
        <div className={className}>{children}</div>
      </div>
    </dialog>
  );
}
