import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── IMAGES ──────────────────────────────────────────────
  images: {
    remotePatterns: [
      // Unsplash
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
        port: "",
        pathname: "/**",
      },
      // Pexels
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pexels.com",
        port: "",
        pathname: "/**",
      },
      // UI Avatars
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        port: "",
        pathname: "/**",
      },
      // Cloudinary
      {
        protocol: "https",
        hostname: "*.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      // GitHub
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      // ImageKit
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/**",
      },
      // Google
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      // Local development
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "",
        pathname: "/**",
      },
      // Vercel deployment
      {
        protocol: "https",
        hostname: "*.vercel.app",
        port: "",
        pathname: "/**",
      },
      // Additional common image hosts
      {
        protocol: "https",
        hostname: "*.imgur.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.fbcdn.net",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // ─── REACT ──────────────────────────────────────────────
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,

  // ─── TYPESCRIPT ─────────────────────────────────────────
  typedRoutes: true,

  // ─── EXPERIMENTAL ──────────────────────────────────────
  experimental: {
    optimizeCss: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // ─── HEADERS ────────────────────────────────────────────
  async headers() {
    return [
      // ─── Sitemap Headers ──────────────────────────────
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/sitemap-compare.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/sitemap-technology.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // ─── Robots.txt ────────────────────────────────────
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // ─── Security Headers ─────────────────────────────
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      // ─── Technology Pages Cache ───────────────────────
      {
        source: '/technology/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/technology',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // ─── Category Pages ────────────────────────────────
      {
        source: '/technology/category/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // ─── Phone Finder Pages ────────────────────────────
      {
        source: '/phone-finder/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // ─── Compare Pages ─────────────────────────────────
      {
        source: '/compare',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },

  // ─── REWRITES ────────────────────────────────────────────
  async rewrites() {
    return [
      // ─── Sitemap Rewrites ─────────────────────────────
      {
        source: '/sitemap-technology.xml',
        destination: '/api/sitemap-technology',
      },
      {
        source: '/sitemap-compare.xml',
        destination: '/api/sitemap-compare',
      },
      // ─── Legacy URL Support ──────────────────────────
      {
        source: '/phone-finder/:slug',
        destination: '/phone-finder/:slug',
      },
      {
        source: '/compare/:path*',
        destination: '/compare/:path*',
      },
    ];
  },

  // ─── REDIRECTS ──────────────────────────────────────────
  async redirects() {
    return [
      // ─── WWW to Non-WWW ──────────────────────────────
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.7pexel.com',
          },
        ],
        destination: 'https://7pexel.com/:path*',
        permanent: true,
      },
      // ─── HTTP to HTTPS ────────────────────────────────
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://7pexel.com/:path*',
        permanent: true,
      },
      // ─── Legacy Phone Routes ──────────────────────────
      {
        source: '/phones/:slug',
        destination: '/phone-finder/:slug',
        permanent: true,
      },
      {
        source: '/phone/:slug',
        destination: '/phone-finder/:slug',
        permanent: true,
      },
      // ─── Legacy Technology Routes ────────────────────
      {
        source: '/tech/:slug',
        destination: '/technology/:slug',
        permanent: true,
      },
      // ─── Trailing Slash Removal ──────────────────────
      {
        source: '/:path*/',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;