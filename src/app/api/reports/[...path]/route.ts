import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";
import { Readable } from "stream";

function getStorage() {
  if (process.env.GCS_SERVICE_ACCOUNT_JSON) {
    return new Storage({ credentials: JSON.parse(process.env.GCS_SERVICE_ACCOUNT_JSON) });
  }
  return new Storage({ keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS });
}

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const objectPath = path.join("/");

  const bucket = getStorage().bucket(process.env.GCS_BUCKET_NAME!);
  const file = bucket.file(objectPath);

  const [exists] = await file.exists();
  if (!exists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const [metadata] = await file.getMetadata();
  const filename = objectPath.split("/").pop() ?? "download";
  const stream = Readable.toWeb(file.createReadStream()) as ReadableStream;

  return new NextResponse(stream, {
    headers: {
      "Content-Type": metadata.contentType || "application/octet-stream",
      "Content-Disposition": `inline; filename="${filename}"`,
      ...(metadata.size ? { "Content-Length": String(metadata.size) } : {}),
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
