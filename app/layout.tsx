// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
  // Add fallback fonts for when Google Fonts is unreachable
  fallback: ["system-ui", "Arial", "sans-serif"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techblog.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "7pexel — Premium Tech Insights, Reviews & News",
    template: "%s | 7pexel",
  },
  description: "Explore the latest in technology, in-depth reviews, and expert insights on gadgets, AI, phones, and more. Stay ahead with 7pexel.",
  keywords: "tech, technology, reviews, gadgets, AI, phones, smartphones, news, 7pexel, tech news, phone reviews, AI news",
  authors: [{ name: "7pexel Team", url: siteUrl }],
  creator: "7pexel",
  publisher: "7pexel",
  generator: "Next.js",
  applicationName: "7pexel",
  referrer: "origin-when-cross-origin",
  
  // Open Graph
  openGraph: {
    title: "7pexel — Premium Tech Insights, Reviews & News",
    description: "Explore the latest in technology, in-depth reviews, and expert insights on gadgets, AI, phones, and more.",
    url: siteUrl,
    siteName: "7pexel",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "7pexel - Premium Tech Insights",
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@7pexel",
    creator: "@7pexel",
    title: "7pexel — Premium Tech Insights",
    description: "Explore the latest in technology, in-depth reviews, and expert insights.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Canonical
  alternates: {
    canonical: siteUrl,
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  
  // Manifest
  manifest: '/manifest.json',
  
  // Other
  category: "Technology",
  classification: "Technology News & Reviews",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#7F011F' },
    { media: '(prefers-color-scheme: dark)', color: '#2d1a1a' },
  ],
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* Font Awesome - Keep this as it's not a Google Font */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha384-HK6tQy/8F4lLf4HJbQHq4cOFZR+oK/xGq4d2AYFTlYYHq6J2mP4gJ5IlOkrP2d2R"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* REMOVED the Google Fonts link tags - Next.js handles this via poppins.variable */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-screen bg-[#fbf8ff] antialiased">
        <SubscriptionProvider>
          {children}
        </SubscriptionProvider>
      </body>
    </html>
  );
}