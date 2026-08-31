export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { BlockList } from "@/lib/blocks/block-list";
import { getDraftBlocks } from "@/lib/blocks/data";
import { DraftBanner } from "@/components/admin/draft-banner";

type Params = { params: Promise<{ slug: string }> };

export default async function PreviewCaseStudy({ params }: Params) {
  const { slug } = await params;
  const blocks = await getDraftBlocks({ kind: "case_study", slug });

  if (!blocks) notFound();

  return (
    <>
      <DraftBanner href="/admin" />
      <Navigation />
      <main id="main" className="pt-20">
        {blocks.length > 0 ? (
          <BlockList blocks={blocks} />
        ) : (
          <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
            No draft blocks found for &ldquo;{slug}&rdquo;.
          </div>
        )}
      </main>
    </>
  );
}
