import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { supabaseAdmin } from "@/lib/supabase-admin";

const BUCKET = "portfolio-assets";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

// Extension is derived from the declared MIME type, never from the client filename.
const EXT_BY_MIME: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "application/pdf": "pdf"
};

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!supabaseAdmin) {
    return NextResponse.json({ ok: false, error: "Uploads are not available." }, { status: 503 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
  }

  const ext = EXT_BY_MIME[file.type];
  if (!ext) {
    return NextResponse.json({ ok: false, error: "Unsupported file type" }, { status: 415 });
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ ok: false, error: "File too large (max 10 MB)" }, { status: 413 });
  }

  const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  // The bucket must already exist (see supabase/schema.sql); it is no longer created per request.
  const { error } = await supabaseAdmin.storage.from(BUCKET).upload(path, buffer, {
    contentType: file.type,
    upsert: false
  });

  if (error) {
    return NextResponse.json({ ok: false, error: "Upload failed" }, { status: 500 });
  }

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);

  return NextResponse.json({ ok: true, url: data.publicUrl });
}
