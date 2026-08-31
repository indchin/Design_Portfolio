import { portfolio } from "@/content/portfolio";

export function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.owner.name,
    jobTitle: portfolio.owner.title,
    url: baseUrl,
    email: portfolio.owner.email,
    sameAs: portfolio.owner.socials.map((social) => social.href),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressCountry: "IN"
    },
    knowsAbout: [
      "UX Design",
      "Interaction Design",
      "User Research",
      "Usability Testing",
      "Design Systems",
      "Accessibility (WCAG 2.1)",
      "Healthcare Software",
      "Medical eLearning",
      "EdTech",
      "AI Product Design"
    ],
    worksFor: {
      "@type": "Organization",
      name: "Laerdal Medical",
      url: "https://laerdal.com"
    },
    hasCredential: portfolio.awards.map((award) => ({
      "@type": "EducationalOccupationalCredential",
      name: award.title,
      recognizedBy: award.issuer
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
    />
  );
}
