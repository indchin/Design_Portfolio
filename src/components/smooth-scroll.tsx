"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let frame = 0;

    const raf = (time: number) => {
      lenis?.raf(time);
      frame = requestAnimationFrame(raf);
    };

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({
        duration: 1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        // Matches scroll-padding-top in globals.css (6rem) so anchors clear the fixed nav.
        anchors: { offset: -96 }
      });
      frame = requestAnimationFrame(raf);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
    };

    const onPreferenceChange = () => (query.matches ? stop() : start());

    // Pause the loop while the tab is hidden.
    const onVisibility = () => {
      if (!lenis) return;
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(raf);
    };

    if (!query.matches) start();
    query.addEventListener("change", onPreferenceChange);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      query.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
    };
  }, []);

  return null;
}
