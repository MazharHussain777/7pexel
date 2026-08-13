// app/layout.tsx
import type { Metadata } from "next";
import { Fraunces, Poppins, JetBrains_Mono } from "next/font/google";
import { NewsletterProvider } from "@/contexts/NewsletterContext";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "7pexel — Tech & Electronics, Decoded",
  description: "Every device, decoded — before you buy. Specs, reviews and side-by-side comparisons across every category.",
  keywords: "tech reviews, electronics, phones, laptops, auto, comparisons, buying guides",
  authors: [{ name: "7pexel Team" }],
  openGraph: {
    title: "7pexel — Tech & Electronics, Decoded",
    description: "Every device, decoded — before you buy.",
    url: "https://7pexel.com",
    siteName: "7pexel",
    images: [
      {
        url: "https://7pexel.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "7pexel - Tech & Electronics",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "7pexel — Tech & Electronics, Decoded",
    description: "Every device, decoded — before you buy.",
    images: ["https://7pexel.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${poppins.variable} ${jetbrainsMono.variable} antialiased bg-white text-[#12180F] font-poppins overflow-x-hidden`}>
        <NewsletterProvider>
          {children}
        </NewsletterProvider>
      </body>
    </html>
  );
}