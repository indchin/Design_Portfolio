"use client";

import { useMemo, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Portfolio } from "@/types/portfolio";

export function PortfolioAssistant({ portfolio }: { portfolio: Portfolio }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    {
      role: "assistant",
      text: "Ask about Chinmay's AI UX, research, accessibility, design systems, or case study outcomes."
    }
  ]);

  const knowledge = useMemo(
    () =>
      [
        portfolio.owner.statement,
        ...portfolio.principles.map((item) => `${item.title}: ${item.body}`),
        ...portfolio.caseStudies.map(
          (study) =>
            `${study.title}: ${study.excerpt}. Tags: ${study.tags.join(", ")}. Outcomes: ${study.metrics
              .map((metric) => `${metric.value} ${metric.label}`)
              .join(", ")}.`
        )
      ].join("\n"),
    [portfolio]
  );

  function answer(question: string) {
    const normalized = question.toLowerCase();
    if (normalized.includes("ai")) {
      return "Chinmay treats AI as a transparent collaborator: useful for synthesis, exploration, adaptive recommendations, and prototyping, while preserving user agency and explainability.";
    }
    if (normalized.includes("research")) {
      return "The portfolio emphasizes mixed-method research: interviews, diary studies, usability testing, analytics, support-ticket clustering, and validation loops.";
    }
    if (normalized.includes("access")) {
      return "Accessibility is built into the design process through WCAG contrast, keyboard navigation, semantic states, reduced motion support, captions, and inclusive governance.";
    }
    if (normalized.includes("system")) {
      return "Chinmay has led design systems covering tokens, compact enterprise components, contribution workflows, documentation, accessibility rules, and engineering handoff.";
    }
    const matchingStudy = portfolio.caseStudies.find((study) => normalized.includes(study.title.toLowerCase().split(" ")[0]));
    if (matchingStudy) {
      return `${matchingStudy.title} focused on ${matchingStudy.excerpt} Key outcomes included ${matchingStudy.metrics
        .map((metric) => `${metric.value} ${metric.label.toLowerCase()}`)
        .join(", ")}.`;
    }
    return `A good starting point: ${knowledge.split("\n")[0]}`;
  }

  function submit() {
    if (!input.trim()) return;
    const question = input.trim();
    setMessages((current) => [...current, { role: "user", text: question }, { role: "assistant", text: answer(question) }]);
    setInput("");
  }

  return (
    <div className="fixed bottom-5 left-5 z-40">
      {open ? (
        <div className="w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-white/10 bg-surface-elevated shadow-2xl">
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Bot className="h-4 w-4 text-primary" aria-hidden="true" />
              Portfolio Assistant
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close assistant">
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <div className="max-h-80 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-lg px-3 py-2 text-sm leading-6 ${
                  message.role === "assistant" ? "bg-white/[0.06] text-muted-foreground" : "bg-primary text-primary-foreground"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <form
            className="flex gap-2 border-t border-border p-3"
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            <Input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask a portfolio question" />
            <Button size="icon" type="submit" aria-label="Ask">
              <Send className="h-4 w-4" aria-hidden="true" />
            </Button>
          </form>
        </div>
      ) : (
        <Button variant="secondary" onClick={() => setOpen(true)}>
          <Bot className="h-4 w-4" aria-hidden="true" />
          Ask AI
        </Button>
      )}
    </div>
  );
}
