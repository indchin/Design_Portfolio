import fs from "node:fs";
import path from "node:path";

/*
 * Drop-in asset resolution for the NRP case study.
 * Save a file as public/case-studies/nrp/<slot-id>.<ext> (or <slot-id>-1, -2, -3…)
 * and the matching slot renders it automatically.
 */

const DIR = path.join(process.cwd(), "public", "case-studies", "nrp");
const EXTENSIONS = ["webp", "png", "jpg", "jpeg", "avif", "svg", "gif"];

export const ASSET_BASE = "public/case-studies/nrp";

/** Empty slots render as dashed "ADD" prompts in dev; hidden in production unless opted in. */
export const showPlaceholders =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "1";

export function resolveAssets(id: string): string[] {
  const names = [id, ...[1, 2, 3, 4].map((n) => `${id}-${n}`)];
  const found: string[] = [];
  for (const name of names) {
    const ext = EXTENSIONS.find((e) => fs.existsSync(path.join(DIR, `${name}.${e}`)));
    if (ext) found.push(`/case-studies/nrp/${name}.${ext}`);
  }
  return found;
}
