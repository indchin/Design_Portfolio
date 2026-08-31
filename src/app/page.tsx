import { Navigation } from "@/components/navigation";
import { PortfolioAssistant } from "@/components/portfolio-assistant";
import { JsonLd } from "@/components/seo/json-ld";
import { BlockList } from "@/lib/blocks/block-list";
import { getPublishedBlocks } from "@/lib/blocks/data";
import { portfolio } from "@/content/portfolio";

// Static fallback blocks built from portfolio.ts — used when Supabase is not
// configured or the home page has not been published yet.
import { AboutSection } from "@/components/sections/about-section";
import { CaseStudyBrowser } from "@/components/sections/case-study-browser";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { InsightsSection } from "@/components/sections/insights-section";
import { RecognitionSection } from "@/components/sections/recognition-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";

export const revalidate = 3600;

export default async function Home() {
  const blocks = await getPublishedBlocks({ kind: "home" });

  return (
    <>
      <JsonLd />
      <Navigation />
      <main id="main">
        {blocks ? (
          <BlockList blocks={blocks} />
        ) : (
          <>
            <HeroSection portfolio={portfolio} />
            <AboutSection portfolio={portfolio} />
            <CaseStudyBrowser caseStudies={portfolio.caseStudies} />
            <InsightsSection articles={portfolio.articles} />
            <RecognitionSection portfolio={portfolio} />
            <SocialProofSection portfolio={portfolio} />
            <ContactSection portfolio={portfolio} />
          </>
        )}
      </main>
      <PortfolioAssistant portfolio={portfolio} />
    </>
  );
}
