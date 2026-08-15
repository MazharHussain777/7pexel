// lib/seo/config.ts
export const SITE_CONFIG = {
  name: "7pexel",
  domain: "7pexel.com",
  url: "https://7pexel.com",
  defaultImage: "https://7pexel.com/images/og/default-og.jpg",
  twitterHandle: "@7pexel",
  facebookAppId: process.env.FACEBOOK_APP_ID,
  categories: {
    ai: {
      name: "Artificial Intelligence",
      slug: "ai",
      icon: "🤖",
      description: "AI, Machine Learning, Neural Networks, and Intelligent Systems"
    },
    "generative-ai": {
      name: "Generative AI",
      slug: "generative-ai",
      icon: "✨",
      description: "ChatGPT, Gemini, Claude, DALL-E, Midjourney & More"
    },
    "quantum-computing": {
      name: "Quantum Computing",
      slug: "quantum-computing",
      icon: "⚛️",
      description: "Quantum Processors, Qubits, Quantum Supremacy & Algorithms"
    },
    "ar-vr": {
      name: "AR/VR & Metaverse",
      slug: "ar-vr",
      icon: "🥽",
      description: "Augmented Reality, Virtual Reality, Mixed Reality, Spatial Computing"
    },
    "green-tech": {
      name: "Green Tech & Sustainability",
      slug: "green-tech",
      icon: "🌱",
      description: "Renewable Energy, Carbon Capture, Sustainable Tech Solutions"
    },
    cybersecurity: {
      name: "Cybersecurity",
      slug: "cybersecurity",
      icon: "🔒",
      description: "Cyber Defense, AI Security, Zero Trust, Data Privacy"
    },
    "space-tech": {
      name: "Space Tech",
      slug: "space-tech",
      icon: "🚀",
      description: "Space Exploration, Satellite Tech, Commercial Spaceflight"
    },
    biotech: {
      name: "Biotech & Health Tech",
      slug: "biotech",
      icon: "🧬",
      description: "Gene Editing, Wearable Health Tech, Telemedicine, Bioengineering"
    }
  }
};

export const SEO_DEFAULTS = {
  titleTemplate: "%s | 7pexel Technology",
  defaultTitle: "7pexel Technology - Expert Tech Reviews & Guides",
  defaultDescription: "Expert technology reviews, buying guides, and insights from industry professionals.",
  openGraph: {
    type: "website",
    siteName: "7pexel",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@7pexel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
};