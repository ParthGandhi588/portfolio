import type { Metadata, Viewport } from "next";
import { Geist_Mono, JetBrains_Mono, Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#040507",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://parthgandhi-portfolio.vercel.app"),
  title: "Parth Gandhi — AI Systems Engineer | Generative AI & Applied ML",
  description:
    "AI/ML Developer building Generative AI, agent-based systems, RAG pipelines, applied ML, and AI backend systems. Focused on connecting models to real software.",
  keywords: [
    "Parth Gandhi",
    "AI Developer",
    "AI Systems Engineer",
    "Generative AI",
    "Agentic AI",
    "RAG",
    "CodeBase RAG",
    "FastAPI",
    "vLLM",
    "pgvector",
    "Applied Machine Learning",
    "Enterprise AI",
  ],
  authors: [{ name: "Parth Gandhi", url: "https://github.com/ParthGandhi588" }],
  creator: "Parth Gandhi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parthgandhi-portfolio.vercel.app",
    title: "Parth Gandhi — AI Systems Engineer | Generative AI & AI Systems",
    description:
      "I build AI systems that turn complex workflows into intelligent software. Generative AI, agent-based systems, RAG, and production backend engineering.",
    siteName: "Parth Gandhi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parth Gandhi — AI Systems Engineer | Generative AI & AI Systems",
    description:
      "I build AI systems that turn complex workflows into intelligent software.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { CustomCursor } from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SoundProvider } from "@/components/SoundProvider";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${newsreader.variable} ${geistMono.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('pg_portfolio_theme');
                var isDark = saved === 'dark' || ((!saved || saved === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans antialiased selection:bg-[#2563eb]/25 selection:text-[#93c5fd]"
      >
        <ThemeProvider>
          <SoundProvider>
            <CustomCursor />
            {children}
          </SoundProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
