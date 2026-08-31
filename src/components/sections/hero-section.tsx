"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Calendar, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Portfolio } from "@/types/portfolio";

export function HeroSection({ portfolio }: { portfolio: Portfolio }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.35], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.2]);

  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      <div className="subtle-grid absolute inset-0" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-10 h-[38rem] bg-radial-field opacity-80 blur-2xl"
        animate={{ scale: [1, 1.04, 1], opacity: [0.72, 0.9, 0.72] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container relative flex min-h-[calc(100vh-6rem)] items-center justify-center pb-24">
        <motion.div style={{ y, opacity }} className="mx-auto max-w-4xl text-center">
          <Badge className="mb-6 border-primary/30 text-primary">
            <Sparkles className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
            {portfolio.owner.experience} designing healthcare, ed-tech, and AI-powered experiences
          </Badge>
          <h1 className="text-balance font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {portfolio.owner.name}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 md:text-xl">
            {portfolio.owner.statement}
          </p>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button asChild>
              <a href="#work">
                View Work
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href={portfolio.owner.resumeUrl} download>
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="#contact">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Contact Me
              </a>
            </Button>
          </div>
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              ["Healthcare UX", "Mission-critical medical software for global partners"],
              ["AI Product Design", "Multi-agent workflows and adaptive learning systems"],
              ["Accessibility", "WCAG 2.1 conformance as a baseline, not a stretch"]
            ].map(([label, body]) => (
              <div key={label} className="glass rounded-lg p-4 text-left">
                <div className="text-sm font-semibold">{label}</div>
                <div className="mt-2 text-xs leading-5 text-muted-foreground">{body}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
