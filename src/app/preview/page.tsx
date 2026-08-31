export const dynamic = "force-dynamic";

import { Navigation } from "@/components/navigation";
import { BlockList } from "@/lib/blocks/block-list";
import { getDraftBlocks } from "@/lib/blocks/data";
import { DraftBanner } from "@/components/admin/draft-banner";

export default async function PreviewHome() {
  const blocks = await getDraftBlocks({ kind: "home" });

  return (
    <>
      <DraftBanner href="/admin" />
      <Navigation />
      <main id="main">
        {blocks && blocks.length > 0 ? (
          <BlockList blocks={blocks} />
        ) : (
          <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
            No draft blocks found for the home page.
          </div>
        )}
      </main>
    </>
  );
}
