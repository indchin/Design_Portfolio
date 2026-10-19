import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CommandPalette } from "@/components/command-palette";
import { CursorGlow } from "@/components/cursor-glow";
import { MotionProvider } from "@/components/motion-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { portfolio } from "@/content/portfolio";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });

export const viewport: Viewport = {
  themeColor: "#05070d",
  colorScheme: "dark light"
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${portfolio.owner.name} — ${portfolio.owner.title}`,
    template: `%s | ${portfolio.owner.name}`
  },
  description: portfolio.owner.statement,
  keywords: [
    "Chinmay Sharma",
    "Lead UX Designer",
    "UX Designer Bengaluru",
    "Healthcare UX",
    "Medical software design",
    "EdTech UX",
    "AI product design",
    "Design systems",
    "User research",
    "Usability testing",
    "Accessibility WCAG 2.1",
    "Laerdal Medical"
  ],
  authors: [{ name: portfolio.owner.name }],
  openGraph: {
    title: `${portfolio.owner.name} — ${portfolio.owner.title}`,
    description: portfolio.owner.statement,
    url: "/",
    siteName: portfolio.owner.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: `${portfolio.owner.name} — ${portfolio.owner.title}`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolio.owner.name} — ${portfolio.owner.title}`,
    description: portfolio.owner.statement,
    images: ["/og"]
  },
  alternates: { canonical: "/" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="focus-ring fixed left-4 top-4 z-[80] -translate-y-20 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SmoothScroll />
          <CursorGlow />
          {children}
          <CommandPalette />
        </MotionProvider>
      </body>
    </html>
  );
}
