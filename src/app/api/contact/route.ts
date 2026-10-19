import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase-admin";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10).max(5000),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(500).optional()
});

async function sendEmail(data: z.infer<typeof schema>): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return false;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio contact <onboarding@resend.dev>",
        to: [to],
        reply_to: data.email,
        subject: `Portfolio contact from ${data.name.replace(/[\r\n]+/g, " ")}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company ?? "-"}\n\n${data.message}`
      })
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid contact payload" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid contact payload" }, { status: 400 });
  }

  const { website, ...data } = parsed.data;
  if (website) {
    // Bot: pretend success, store nothing.
    return NextResponse.json({ ok: true });
  }

  let stored = false;
  if (supabaseAdmin) {
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      message: data.message
    });
    stored = !error;
  }

  const emailed = await sendEmail({ ...data });

  if (!stored && !emailed) {
    return NextResponse.json({ ok: false, error: "Contact delivery is unavailable" }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
