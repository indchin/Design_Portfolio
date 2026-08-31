import { revalidatePath } from "next/cache";

/**
 * On-demand revalidation after a page is published.
 * Must be called from a Server Action or Route Handler (never from a Client Component).
 */
export function revalidatePage(kind: "home" | "case_study", slug?: string | null) {
  if (kind === "home") {
    revalidatePath("/");
  } else if (slug) {
    revalidatePath(`/work/${slug}`);
  }
  // Always bust the sitemap
  revalidatePath("/sitemap.xml");
}
