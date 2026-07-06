import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/search/command-palette";
import { ScrollProgress } from "@/components/scroll-progress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://smartstack.dev"),
  title: {
    default: "SmartStack - Learn Faster. Code Smarter.",
    template: "%s | SmartStack",
  },
  description:
    "SmartStack is a premium developer platform with 500+ programming, cybersecurity, Linux, cloud, AI, and DevOps cheat sheets plus local developer utilities.",
  keywords: ["developer cheat sheets", "cybersecurity reference", "programming cheatsheets", "Linux commands", "Nmap", "JSON formatter", "SmartStack"],
  authors: [{ name: "Hemakshi Saxena" }],
  creator: "Hemakshi Saxena",
  openGraph: {
    type: "website",
    url: "https://smartstack.dev",
    title: "SmartStack - Learn Faster. Code Smarter.",
    description: "500+ programming and cybersecurity cheat sheets with AI search, utilities, quizzes, and copyable examples.",
    siteName: "SmartStack",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartStack - Learn Faster. Code Smarter.",
    description: "A premium developer platform for learning, coding, and secure reference workflows.",
  },
  alternates: {
    canonical: "https://smartstack.dev",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#050814" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SmartStack",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description: metadata.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${space.variable} ${mono.variable}`}>
        <Providers>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CommandPalette />
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
