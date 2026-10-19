"use client";

import { useId, useState, type FormEvent } from "react";
import { Calendar, ExternalLink, Mail, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Portfolio } from "@/types/portfolio";

export function ContactSection({ portfolio }: { portfolio: Portfolio }) {
  const uid = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [sentName, setSentName] = useState("");
  const [errors, setErrors] = useState<Partial<Record<"name" | "email" | "message", string>>>({});
  const email = portfolio.owner.email;
  const mailto = `mailto:${email}`;
  const linkedInUrl = portfolio.owner.socials.find((s) => s.label === "LinkedIn")?.href;
  const calendlyUrl = portfolio.owner.calendlyUrl;
  const hasCalendly =
    typeof calendlyUrl === "string" &&
    calendlyUrl.length > 0 &&
    !calendlyUrl.includes("your-name");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const next: typeof errors = {};
    if (value("name").length < 2) next.name = "Enter your name (at least 2 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email"))) next.email = "Enter a valid email address.";
    if (value("message").length < 10) next.message = "Add a little more detail (at least 10 characters).";
    setErrors(next);

    const firstInvalid = (["name", "email", "message"] as const).find((key) => next[key]);
    if (firstInvalid) {
      const field = form.elements.namedItem(firstInvalid);
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value("name"),
          email: value("email"),
          company: value("company") || undefined,
          message: value("message"),
          website: value("website")
        })
      });
      if (!response.ok) throw new Error("Request failed");
      setSentName(value("name"));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="border-t border-white/10 py-20 md:py-24">
      <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Badge>Contact</Badge>
          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            For healthcare, ed-tech, and AI-driven product work.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
            Open to lead UX roles, advisory engagements, research partnerships, and
            mentorship. Based in Bengaluru, working with partners worldwide.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href={`mailto:${portfolio.owner.email}`}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email
              </a>
            </Button>
            {hasCalendly ? (
              <Button asChild variant="secondary">
                <a href={calendlyUrl}>
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  Book a call
                </a>
              </Button>
            ) : null}
            {linkedInUrl ? (
              <Button asChild variant="outline">
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </Button>
            ) : null}
          </div>
        </div>
        <form
          className="glass relative rounded-lg p-5 md:p-6"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Contact form"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${uid}-name`} className="mb-1.5 block text-sm font-medium">
                Name
              </label>
              <Input
                id={`${uid}-name`}
                name="name"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? `${uid}-name-error` : undefined}
              />
              {errors.name ? (
                <p id={`${uid}-name-error`} className="mt-1.5 text-sm text-red-400 [.light_&]:text-red-700">
                  {errors.name}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor={`${uid}-email`} className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <Input
                id={`${uid}-email`}
                type="email"
                name="email"
                required
                maxLength={254}
                autoComplete="email"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? `${uid}-email-error` : undefined}
              />
              {errors.email ? (
                <p id={`${uid}-email-error`} className="mt-1.5 text-sm text-red-400 [.light_&]:text-red-700">
                  {errors.email}
                </p>
              ) : null}
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor={`${uid}-company`} className="mb-1.5 block text-sm font-medium">
              Company or project <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <Input id={`${uid}-company`} name="company" maxLength={200} autoComplete="organization" />
          </div>
          <div className="mt-4">
            <label htmlFor={`${uid}-message`} className="mb-1.5 block text-sm font-medium">
              Message
            </label>
            <Textarea
              id={`${uid}-message`}
              className="min-h-40"
              name="message"
              required
              minLength={10}
              maxLength={5000}
              placeholder="What are you hiring for or working on?"
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? `${uid}-message-error` : undefined}
            />
            {errors.message ? (
              <p id={`${uid}-message-error`} className="mt-1.5 text-sm text-red-400 [.light_&]:text-red-700">
                {errors.message}
              </p>
            ) : null}
          </div>
          {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div className="mt-5 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
              {status === "success" ? (
                `Thanks, ${sentName}. I'll reply within 2 working days.`
              ) : status === "error" ? (
                <>
                  Couldn&apos;t send that. Please email me directly at{" "}
                  <a href={mailto} className="focus-ring rounded text-foreground underline underline-offset-4">
                    {email}
                  </a>
                  .
                </>
              ) : (
                <>
                  Replies within 2 working days. Prefer email?{" "}
                  <a href={mailto} className="focus-ring rounded text-foreground underline underline-offset-4">
                    {email}
                  </a>
                </>
              )}
            </p>
            <Button type="submit" disabled={status === "sending"}>
              <Send className="h-4 w-4" aria-hidden="true" />
              {status === "sending" ? "Sending..." : "Send message"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
