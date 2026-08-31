import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10)
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid contact payload" }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    message: "Contact payload validated. Connect Resend, Postmark, or Supabase Edge Functions for delivery.",
    data: parsed.data
  });
}
