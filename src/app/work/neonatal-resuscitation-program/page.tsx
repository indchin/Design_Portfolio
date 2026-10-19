import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { NrpPageBody } from "@/components/case-study/nrp-sections";
import { nrp } from "@/content/case-studies/nrp-pediaskills";
import { NRP_READY } from "@/lib/nrp-ready";

export const revalidate = 3600;

const title = "Designing PediaSkills: one certification platform for the AAP Neonatal Resuscitation Program";
const description =
  "Lead Interaction Designer on the platform that takes clinicians from sign-up to certified NRP provider, 2020 to 2026.";

export const metadata: Metadata = {
  title,
  description,
  robots: NRP_READY ? undefined : { index: false, follow: false },
  alternates: { canonical: `/work/${nrp.slug}` },
  openGraph: {
    title,
    description,
    url: `/work/${nrp.slug}`,
    type: "article",
    images: [
      {
        url: `/og?title=${encodeURIComponent(title)}&eyebrow=${encodeURIComponent("Healthcare · EdTech")}&description=${encodeURIComponent(description)}`,
        width: 1200,
        height: 630,
        alt: `${title} — case study`
      }
    ]
  }
};

export default function NrpCaseStudyPage() {
  return (
    <>
      <Navigation />
      <main id="main">
        <NrpPageBody />
      </main>
    </>
  );
}
