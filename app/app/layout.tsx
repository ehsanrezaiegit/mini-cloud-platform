import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CortexWire | AI & Technology Intelligence",
    template: "%s | CortexWire",
  },
  description:
    "CortexWire tracks the AI systems, tools, chips, policy moves, and product shifts shaping the next technology cycle.",
  openGraph: {
    title: "CortexWire | AI & Technology Intelligence",
    description:
      "Sharp AI and technology analysis for builders, operators, and curious technologists.",
    url: "/",
    siteName: "CortexWire",
    images: [{ url: "/covers/agentic-workflows.png", width: 1600, height: 900 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CortexWire",
    description: "AI and technology news for people building what comes next.",
    images: ["/covers/agentic-workflows.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1" data-pagefind-body>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
