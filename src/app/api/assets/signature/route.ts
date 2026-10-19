import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";

const FOLDER = "portfolio-assets";
const ALLOWED_FORMATS = "png,jpg,webp,gif,pdf";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ ok: false, error: "Uploads are not available." }, { status: 503 });
  }

  const timestamp = Math.round(Date.now() / 1000);
  // Signed params, sorted alphabetically per Cloudinary rules.
  const toSign = {
    allowed_formats: ALLOWED_FORMATS,
    folder: FOLDER,
    max_file_size: String(MAX_FILE_SIZE),
    timestamp: String(timestamp)
  };
  const signature = crypto
    .createHash("sha1")
    .update(
      Object.entries(toSign)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}=${v}`)
        .join("&") + apiSecret
    )
    .digest("hex");

  return NextResponse.json({
    ok: true,
    cloudName,
    apiKey,
    timestamp,
    folder: FOLDER,
    allowedFormats: ALLOWED_FORMATS,
    maxFileSize: MAX_FILE_SIZE,
    signature
  });
}
