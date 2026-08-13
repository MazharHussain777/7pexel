// app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Fraunces, Poppins, JetBrains_Mono } from "next/font/google";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { NewsletterProvider } from "@/contexts/NewsletterContext";
import { Footer } from "@/components/Footer";
import "./globals.css";

// Font configurations
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';

// ============================================================
// COMPLETE METADATA WITH FULL SEO OPTIMIZATION
// ============================================================
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  
  title: {
    default: "7pexel — Premium Tech Insights, Reviews & Phone Comparisons",
    template: "%s | 7pexel",
  },
  
  description: "Compare smartphones side by side. Full specifications, camera quality, battery life, performance benchmarks, and pricing. Find the best phone for you with 7pexel.",
  
  keywords: [
    "tech", "technology", "tech news", "technology news",
    "reviews", "phone reviews", "smartphone reviews", "tech reviews",
    "phone comparison", "smartphone comparison", "compare phones", "compare smartphones",
    "phone vs phone", "smartphone battle", "specs comparison",
    "Samsung", "Apple", "Google", "OnePlus", "Xiaomi", "Vivo", "Oppo", "Nothing", "Sony", "Motorola",
    "Galaxy S24", "Galaxy S25", "iPhone 15", "iPhone 16", "Pixel 8", "Pixel 9", "OnePlus 12", "OnePlus 13",
    "camera comparison", "battery comparison", "display comparison", "performance comparison",
    "phone specs", "smartphone specs", "phone features",
    "which phone is better", "which is better", "best smartphone", "best phone 2026",
    "Samsung vs Apple", "Apple vs Google", "Samsung vs Google",
    "AI", "gadgets", "smartphones", "mobile phones",
    "7pexel", "tech blog", "phone finder",
  ].join(", "),
  
  authors: [{ name: "7pexel Team", url: siteUrl }],
  creator: "7pexel",
  publisher: "7pexel",
  generator: "Next.js",
  applicationName: "7pexel",
  referrer: "origin-when-cross-origin",
  
  openGraph: {
    title: "7pexel — Compare Smartphones, Tech Reviews & Insights",
    description: "Compare smartphones side by side. Full specifications, camera, battery, performance. Find the best phone for you.",
    url: siteUrl,
    siteName: "7pexel",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "7pexel - Compare Smartphones & Tech Reviews",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    site: "@7pexel",
    creator: "@7pexel",
    title: "7pexel — Phone Comparisons & Tech Reviews",
    description: "Compare smartphones side by side. Full specs, camera, battery, and performance.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  
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
  
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': siteUrl,
    },
  },
  
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  
  manifest: '/manifest.json',
  category: "Technology",
  classification: "Technology News, Reviews & Phone Comparisons",
  
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
  },
};

// ============================================================
// VIEWPORT CONFIGURATION
// ============================================================
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#7F011F' },
    { media: '(prefers-color-scheme: dark)', color: '#7F011F' },
  ],
  colorScheme: 'light dark',
};

// ============================================================
// ROOT LAYOUT
// ============================================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${poppins.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* ===== FONT AWESOME ===== */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        
        {/* ===== MOBILE META ===== */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* ===== SITEMAP LINKS ===== */}
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <link rel="sitemap" type="application/xml" title="Compare Sitemap" href="/sitemap-compare.xml" />
        
        {/* ===== PRELOAD FONTS ===== */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* ===== STRUCTURED DATA - Organization ===== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "7pexel",
              "url": siteUrl,
              "logo": `${siteUrl}/icon-512.png`,
              "description": "Premium tech insights, phone comparisons, and reviews.",
              "sameAs": [
                "https://twitter.com/7pexel",
                "https://linkedin.com/company/7pexel",
                "https://youtube.com/@7pexel",
                "https://instagram.com/7pexel",
                "https://github.com/7pexel"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "contact@7pexel.com",
                "contactType": "customer support",
                "availableLanguage": ["English"]
              }
            })
          }}
        />
        
        {/* ===== STRUCTURED DATA - Website ===== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": siteUrl,
              "name": "7pexel",
              "description": "Compare smartphones, tech reviews, and insights.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${siteUrl}/phone-finder?search={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        {/* ===== STRUCTURED DATA - Breadcrumb (Site-wide) ===== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": siteUrl
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Phone Finder",
                  "item": `${siteUrl}/phone-finder`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Compare",
                  "item": `${siteUrl}/compare`
                }
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-white antialiased flex flex-col">
        <SubscriptionProvider>
          <NewsletterProvider>
            <div className="flex flex-col min-h-screen">
              {children}
              <Footer />
            </div>
          </NewsletterProvider>
        </SubscriptionProvider>
      </body>
    </html>
  );
}