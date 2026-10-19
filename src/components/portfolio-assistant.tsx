"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Portfolio } from "@/types/portfolio";

// Whole-word (or word-prefix) match so "ai" does not hit "email" or "maintain".
function mentions(text: string, term: string, wholeWord = false) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}${wholeWord ? "\\b" : ""}`, "i").test(text);
}

export function PortfolioAssistant({ portfolio }: { portfolio: Portfolio }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const panelId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const hasOpened = useRef(false);

  // Move focus into the input on open and back to the toggle on close (not on first render).
  useEffect(() => {
    if (open) {
      hasOpened.current = true;
      inputRef.current?.focus();
    } else if (hasOpened.current) {
      toggleRef.current?.focus();
    }
  }, [open]);
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
    if (mentions(normalized, "ai", true)) {
      return "Chinmay treats AI as a transparent collaborator: useful for synthesis, exploration, adaptive recommendations, and prototyping, while preserving user agency and explainability.";
    }
    if (mentions(normalized, "research")) {
      return "The portfolio emphasizes mixed-method research: interviews, diary studies, usability testing, analytics, support-ticket clustering, and validation loops.";
    }
    if (mentions(normalized, "access")) {
      return "Accessibility is built into the design process through WCAG contrast, keyboard navigation, semantic states, reduced motion support, captions, and inclusive governance.";
    }
    if (mentions(normalized, "system")) {
      return "Chinmay has led design systems covering tokens, compact enterprise components, contribution workflows, documentation, accessibility rules, and engineering handoff.";
    }
    const matchingStudy = portfolio.caseStudies.find((study) => mentions(normalized, study.title.split(" ")[0]));
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
    <div className="fixed bottom-5 left-5 z-40 flex flex-col items-start gap-3">
      {open && (
        <div
          id={panelId}
          role="region"
          aria-label="Portfolio assistant"
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
          className="w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Bot className="h-4 w-4 text-primary" aria-hidden="true" />
              Portfolio Assistant
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close assistant">
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <div role="log" aria-live="polite" aria-label="Conversation" className="max-h-80 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-lg px-3 py-2 text-sm leading-6 ${
                  message.role === "assistant" ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
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
            <Input
              ref={inputRef}
              aria-label="Ask a portfolio question"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a portfolio question"
            />
            <Button size="icon" type="submit" aria-label="Ask">
              <Send className="h-4 w-4" aria-hidden="true" />
            </Button>
          </form>
        </div>
      )}
      <Button
        ref={toggleRef}
        variant="secondary"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        <Bot className="h-4 w-4" aria-hidden="true" />
        Ask AI
      </Button>
    </div>
  );
}
