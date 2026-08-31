/**
 * Restores the deleted "tension" section shell + narrative block
 * for the Adapt Authoring Tool case study.
 *
 * Run: npx tsx scripts/restore-adapt-tension.ts
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";
import { adaptCaseStudy } from "../src/content/case-studies/adapt-authoring-tool";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } }
);

async function main() {
  // 1. Find the Adapt page
  const { data: page, error: pageErr } = await sb
    .from("pages")
    .select("id")
    .eq("kind", "case_study")
    .eq("slug", "adapt-authoring-tool")
    .single();

  if (pageErr || !page) {
    console.error("❌ Could not find adapt-authoring-tool page:", pageErr?.message);
    process.exit(1);
  }

  const pageId = page.id as string;
  console.log(`Found page: ${pageId}`);

  // 2. Check whether the tension shell already exists
  const { data: existing } = await sb
    .from("page_blocks")
    .select("id")
    .eq("page_id", pageId)
    .eq("type", "editorial.sectionShell")
    .contains("props", { id: "tension" })
    .limit(1);

  if (existing && existing.length > 0) {
    console.log("⚠️  Tension shell already exists — nothing to do.");
    process.exit(0);
  }

  // 3. Find the current sort_order of the block that should come after (pullQuote at sort_order 2)
  //    We'll shift any blocks with sort_order >= 1 up by 2 to make room, then insert at 1.
  const { data: allBlocks } = await sb
    .from("page_blocks")
    .select("id, sort_order, version")
    .eq("page_id", pageId)
    .is("parent_id", null)
    .gte("sort_order", 1);

  if (allBlocks && allBlocks.length > 0) {
    console.log(`Shifting ${allBlocks.length} blocks up by 2…`);
    for (const b of allBlocks) {
      await sb
        .from("page_blocks")
        .update({ sort_order: (b.sort_order as number) + 2 })
        .eq("id", b.id);
    }
  }

  // 4. Insert the shell + narrative for both draft and published versions
  const shellProps = {
    id: "tension",
    eyebrow: "01 — The tension",
    title: "A mission-critical tool no one had studied",
    intro: null,
    bordered: false,
  };
  const narrativeProps = { paragraphs: adaptCaseStudy.tension };

  for (const version of ["draft", "published"] as const) {
    // Insert shell
    const { data: shell, error: shellErr } = await sb
      .from("page_blocks")
      .insert({
        page_id: pageId,
        parent_id: null,
        type: "editorial.sectionShell",
        props: shellProps,
        sort_order: 1,
        version,
      })
      .select("id")
      .single();

    if (shellErr || !shell) {
      console.error(`❌ Failed to insert shell (${version}):`, shellErr?.message);
      process.exit(1);
    }

    // Insert narrative as child
    const { error: narErr } = await sb.from("page_blocks").insert({
      page_id: pageId,
      parent_id: shell.id,
      type: "editorial.narrative",
      props: narrativeProps,
      sort_order: 0,
      version,
    });

    if (narErr) {
      console.error(`❌ Failed to insert narrative (${version}):`, narErr.message);
      process.exit(1);
    }

    console.log(`  ✓ ${version}`);
  }

  console.log("\n✅ Tension section restored.");
}

main().catch((err) => {
  console.error("❌ Script failed:", err);
  process.exit(1);
});
