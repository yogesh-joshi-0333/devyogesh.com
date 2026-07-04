import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Providers } from "@/components/theme/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Spotlight } from "@/components/fx/Spotlight";
import { PaletteLoader } from "@/components/palette/PaletteLoader";
import { getProjects } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.shortTitle,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const paletteProjects = getProjects().map((p) => ({ slug: p.slug, title: p.title }));
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <Providers>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Spotlight />
          <PaletteLoader projects={paletteProjects} />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
