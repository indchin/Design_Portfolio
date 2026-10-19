"use client";

import { MotionConfig } from "framer-motion";

/** App-level framer-motion config: honour the OS reduced-motion preference. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
