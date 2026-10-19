"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Portfolio } from "@/types/portfolio";

const proofPoints = [
  "AAP: moved from a third-party LMS to an owned platform",
  "6 product teams on one AI voice platform",
  "17 research participants \u2192 shipped design decisions"
];

export function HeroSection({ portfolio }: { portfolio: Portfolio }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden pt-24">
      <div className="subtle-grid absolute inset-0" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-10 h-[38rem] bg-radial-field opacity-80 blur-2xl"
        animate={{ scale: [1, 1.04, 1], opacity: [0.72, 0.9, 0.72] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container relative flex min-h-[calc(100vh-6rem)] items-center justify-center pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div style={reduceMotion ? undefined : { opacity: fade }}>
            <h1 className="text-balance font-display text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
              {portfolio.owner.name}
            </h1>
            <p className="mt-4 text-balance text-xl text-foreground md:text-2xl">
              Lead UX/UI Designer &middot; AI + healthcare EdTech &middot; Bengaluru
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 md:text-xl">
              I lead UX for clinical training software used by the American Academy of Pediatrics and the WHO Academy: a
              learner-record migration, a shared AI voice platform across six product teams, and the first user research
              on Laerdal&apos;s authoring tool.
            </p>
          </motion.div>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button asChild>
              <a href="#work">
                View work
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href={portfolio.owner.resumeUrl} download="Chinmay-Sharma-UX-Lead-Resume.pdf">
                <Download className="h-4 w-4" aria-hidden="true" />
                Resume (PDF)
              </a>
            </Button>
            <a
              href="#contact"
              className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Contact
            </a>
          </div>
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {proofPoints.map((point) => (
              <div key={point} className="glass rounded-lg p-4 text-left text-sm font-medium leading-6">
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
