"use client";

import { useState } from "react";
import { Calendar, ExternalLink, Mail, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Portfolio } from "@/types/portfolio";

export function ContactSection({ portfolio }: { portfolio: Portfolio }) {
  const [sent, setSent] = useState(false);
  const linkedInUrl = portfolio.owner.socials.find((s) => s.label === "LinkedIn")?.href;
  const calendlyUrl = portfolio.owner.calendlyUrl;
  const hasCalendly =
    typeof calendlyUrl === "string" &&
    calendlyUrl.length > 0 &&
    !calendlyUrl.includes("your-name");

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
          className="glass rounded-lg p-5 md:p-6"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
          aria-label="Contact form"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="sr-only">Your name</span>
              <Input required name="name" placeholder="Name" autoComplete="name" aria-label="Your name" />
            </label>
            <label className="block">
              <span className="sr-only">Your email</span>
              <Input required type="email" name="email" placeholder="Email" autoComplete="email" aria-label="Your email" />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="sr-only">Company or project</span>
            <Input name="company" placeholder="Company or project" aria-label="Company or project" />
          </label>
          <label className="mt-4 block">
            <span className="sr-only">Message</span>
            <Textarea className="min-h-40" required name="message" placeholder="What should we explore together?" aria-label="Message" />
          </label>
          <div className="mt-5 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
              {sent ? "Thanks — message received in preview mode." : "Keyboard-friendly and accessible by design."}
            </p>
            <Button type="submit">
              <Send className="h-4 w-4" aria-hidden="true" />
              Send
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
