"use client";

import { motion } from "framer-motion";
import {
  Accessibility,
  Bot,
  FlaskConical,
  Globe2,
  HeartPulse,
  PenTool,
  Sparkles,
  Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Portfolio } from "@/types/portfolio";

type SkillGroupKey = "Research" | "Craft" | "Quality" | "Emerging";
const skillGroupMeta: Record<
  SkillGroupKey,
  { icon: React.ComponentType<{ className?: string }>; label: string; description: string }
> = {
  Research: {
    icon: FlaskConical,
    label: "Research",
    description: "Discovery, synthesis, and validation"
  },
  Craft: {
    icon: PenTool,
    label: "Craft",
    description: "Interaction and systems thinking"
  },
  Quality: {
    icon: Accessibility,
    label: "Quality",
    description: "Accessibility and inclusive design"
  },
  Emerging: {
    icon: Sparkles,
    label: "Emerging",
    description: "AI-native product design"
  }
};

type ToolGroupKey = "Design" | "Research" | "Collaboration" | "AI";
const toolGroupOrder: ToolGroupKey[] = ["Design", "Research", "Collaboration", "AI"];
const toolGroupMeta: Record<ToolGroupKey, { icon: React.ComponentType<{ className?: string }> }> = {
  Design: { icon: PenTool },
  Research: { icon: FlaskConical },
  Collaboration: { icon: Users },
  AI: { icon: Bot }
};

export function AboutSection({ portfolio }: { portfolio: Portfolio }) {
  const skillsByGroup = portfolio.skills.reduce<Record<string, typeof portfolio.skills>>(
    (acc, skill) => {
      (acc[skill.group] ??= []).push(skill);
      return acc;
    },
    {}
  );

  const toolsByGroup = portfolio.tools.reduce<Record<ToolGroupKey, typeof portfolio.tools>>(
    (acc, tool) => {
      (acc[tool.group] ??= []).push(tool);
      return acc;
    },
    {} as Record<ToolGroupKey, typeof portfolio.tools>
  );

  return (
    <section id="about" className="relative border-t border-white/10 py-20 md:py-28">
      <div className="container space-y-20 md:space-y-28">
        {/* Band 1 — Intro + principles */}
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <Badge>About</Badge>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold tracking-tight md:text-5xl">
              Designing for healthcare, ed-tech, and the systems that scale them.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              Lead UX Designer at Laerdal Medical, designing mission-critical medical
              software for partners like the American Academy of Pediatrics and the WHO
              Academy. My work spans early discovery, journey mapping, scalable design
              systems, and AI-powered learning platforms — anchored in WCAG 2.1
              accessibility and evidence-based decisions.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { icon: HeartPulse, label: "Healthcare & medical software" },
                { icon: Globe2, label: "Ed-tech at global scale" },
                { icon: Accessibility, label: "WCAG 2.1 accessibility" },
                { icon: Bot, label: "AI-powered learning systems" }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-lg border border-border bg-surface/60 p-4"
                  >
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <div className="mt-3 text-sm font-semibold leading-5">{item.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              How I work
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {portfolio.principles.map((principle, index) => (
                <motion.article
                  key={principle.title}
                  initial={{ opacity: 1, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-6 transition hover:border-white/[0.16] hover:bg-white/[0.04]"
                >
                  <h3 className="font-display text-base font-semibold tracking-tight md:text-lg">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{principle.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        {/* Band 2 — Experience timeline */}
        <div>
          <div className="mb-10 flex flex-col gap-2 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                Experience
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                A decade across visual design, product UI, and AI-driven systems.
              </h3>
            </div>
            <div className="text-sm text-muted-foreground">
              {portfolio.timeline.length} chapters · Bengaluru, India
            </div>
          </div>

          <ol className="relative grid gap-3">
            <div
              aria-hidden="true"
              className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-white/10 to-transparent md:left-[15px]"
            />
            {portfolio.timeline.map((item, index) => (
              <motion.li
                key={`${item.year}-${item.title}`}
                initial={{ opacity: 1, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.06 }}
                className="relative grid gap-4 rounded-xl border border-white/[0.08] bg-white/[0.025] p-5 pl-12 transition hover:border-white/[0.18] hover:bg-white/[0.04] md:grid-cols-[120px_1fr] md:gap-8 md:p-6 md:pl-16"
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-[7px] top-7 h-3 w-3 rounded-full border-2 ${
                    item.current
                      ? "border-primary bg-primary shadow-[0_0_0_4px_rgba(103,232,249,0.18)]"
                      : "border-white/30 bg-background"
                  } md:left-[11px]`}
                />
                <div className="flex flex-col gap-2 md:items-start">
                  <div className="font-display text-sm font-semibold tracking-tight text-foreground md:text-base">
                    {item.year}
                  </div>
                  {item.current ? (
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                      <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                      Now
                    </span>
                  ) : null}
                </div>
                <div>
                  <div className="font-display text-base font-semibold tracking-tight md:text-lg">
                    {item.title}
                  </div>
                  {item.company ? (
                    <div className="mt-1 text-sm font-medium text-primary/90">{item.company}</div>
                  ) : null}
                  <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-[15px] md:leading-7">
                    {item.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Band 3 — Capabilities (Skills + Tools) */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
              Capabilities
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              What I bring to a product team.
            </h3>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {Object.keys(skillGroupMeta).map((groupKey) => {
                const group = skillGroupMeta[groupKey as SkillGroupKey];
                const skills = skillsByGroup[groupKey] ?? [];
                if (skills.length === 0) return null;
                const Icon = group.icon;
                return (
                  <article
                    key={groupKey}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-md border border-white/10 bg-white/[0.04]">
                        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold leading-tight">{group.label}</div>
                        <div className="text-[11px] text-muted-foreground">{group.description}</div>
                      </div>
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {skills.map((skill) => (
                        <li
                          key={skill.label}
                          className="rounded-md border border-white/[0.08] bg-background/40 px-2.5 py-1 text-xs text-foreground/90"
                        >
                          {skill.label}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
              Tool stack
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              The tools I reach for daily.
            </h3>
            <div className="mt-8 grid gap-4">
              {toolGroupOrder.map((groupKey) => {
                const tools = toolsByGroup[groupKey] ?? [];
                if (tools.length === 0) return null;
                const Icon = toolGroupMeta[groupKey].icon;
                return (
                  <article
                    key={groupKey}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-5"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                      <div className="text-sm font-semibold">{groupKey}</div>
                      <div className="ml-auto text-[11px] text-muted-foreground">
                        {tools.length} {tools.length === 1 ? "tool" : "tools"}
                      </div>
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {tools.map((tool) => (
                        <li key={tool.name}>
                          <Badge>{tool.name}</Badge>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
