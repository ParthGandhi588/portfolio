import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export const viewport: Viewport = {
  themeColor: "#090a0e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://parthgandhi.dev"),
  title: "Parth Gandhi — AI/ML Developer | Generative AI & AI Systems",
  description:
    "AI/ML Developer building Generative AI, agent-based systems, RAG pipelines, applied ML, and AI backend systems. Focused on connecting models to real software.",
  keywords: [
    "Parth Gandhi",
    "AI Developer",
    "ML Developer",
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
    url: "https://parthgandhi.dev",
    title: "Parth Gandhi — AI/ML Developer | Generative AI & AI Systems",
    description:
      "I build AI systems that turn complex workflows into intelligent software. Generative AI, agent-based systems, RAG, and production backend engineering.",
    siteName: "Parth Gandhi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parth Gandhi — AI/ML Developer | Generative AI & AI Systems",
    description:
      "I build AI systems that turn complex workflows into intelligent software.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth dark`}
    >
      <body className="min-h-screen bg-[#090a0e] text-[#f3f4f6] font-sans antialiased selection:bg-cyan-500/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
