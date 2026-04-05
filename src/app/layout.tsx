import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
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
  title: "CVAnalyzer — AI-Powered CV Analysis & ATS Optimization",
  description:
    "Get your CV scored, optimized, and matched to job descriptions in seconds. Beat the ATS, land more interviews.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      {...(nonce ? { "data-nonce": nonce } : {})}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
