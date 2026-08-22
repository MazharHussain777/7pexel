// app/guides/data/guides-data.ts

export interface Guide {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  subCategory: string;
  subCategorySlug: string;
  icon: string;
  image: string;
  gallery: string[];
  author: string;
  authorAvatar: string;
  authorBio: string;
  authorSocial: { platform: string; url: string }[];
  date: string;
  updatedDate: string;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  isFeatured: boolean;
  isTrending: boolean;
  isNew: boolean;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  faqs: FAQ[];
  relatedGuides: string[];
  canonical?: string;
  tableOfContents: { id: string; title: string; }[];
  // ─── COLOR SCHEME ───
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    accent: string;
    accentLight: string;
    bg: string;
    border: string;
    heroBg: string;
    heroText: string;
    heroAccent: string;
  };
}

interface FAQ {
  question: string;
  answer: string;
}

// ============================================
// CATEGORIES DATA
// ============================================

export const GUIDE_CATEGORIES = [
  {
    id: 'buying',
    slug: 'buying',
    name: 'Buying Guides',
    icon: '🛒',
    description: 'Expert advice to help you choose the perfect smartphone for your needs and budget.',
    color: '#063F47',
    gradient: 'from-[#063F47] to-[#0B5A66]',
    count: 1,
    metaTitle: 'Smartphone Buying Guides - Expert Advice & Tips | 7pexel',
    metaDescription: 'Expert smartphone buying guides to help you choose the perfect phone. Budget tips, feature comparisons, and brand recommendations.',
    keywords: ['smartphone buying guide', 'how to buy a phone', 'phone buying tips', 'best phones'],
    subCategories: [
      { slug: 'budget', name: 'By Budget' },
      { slug: 'user-type', name: 'By User Type' },
      { slug: 'feature', name: 'By Feature' },
      { slug: 'brand', name: 'By Brand' },
    ]
  },
  {
    id: 'camera',
    slug: 'camera',
    name: 'Camera Guides',
    icon: '📷',
    description: 'Master mobile photography with expert tips, techniques, and camera settings.',
    color: '#6C3CE1',
    gradient: 'from-[#6C3CE1] to-[#8B5CF6]',
    count: 1,
    metaTitle: 'Phone Camera Guides - Photography Tips & Techniques | 7pexel',
    metaDescription: 'Master phone photography with expert camera guides. Learn composition, lighting, settings, and editing tips.',
    keywords: ['phone camera tips', 'mobile photography', 'camera settings', 'photo editing'],
    subCategories: [
      { slug: 'basics', name: 'Photography Basics' },
      { slug: 'settings', name: 'Camera Settings' },
      { slug: 'photo-types', name: 'Photo Types' },
      { slug: 'video', name: 'Video Tips' },
      { slug: 'editing', name: 'Editing' },
    ]
  },
  {
    id: 'battery',
    slug: 'battery',
    name: 'Battery Guides',
    icon: '🔋',
    description: 'Extend your battery life, charge smarter, and understand battery health.',
    color: '#22C55E',
    gradient: 'from-[#22C55E] to-[#4ADE80]',
    count: 0,
    metaTitle: 'Phone Battery Guides - Tips to Extend Battery Life | 7pexel',
    metaDescription: 'Expert battery guides to extend your phone battery life. Charging tips, battery health, and power saving techniques.',
    keywords: ['phone battery tips', 'extend battery life', 'battery health', 'charging guide'],
    subCategories: [
      { slug: 'basics', name: 'Battery Basics' },
      { slug: 'saving', name: 'Battery Saving Tips' },
      { slug: 'charging', name: 'Charging Guides' },
      { slug: 'troubleshooting', name: 'Troubleshooting' },
    ]
  },
  {
    id: 'performance',
    slug: 'performance',
    name: 'Performance Guides',
    icon: '⚡',
    description: 'Understand and optimize your phone performance, speed, and gaming capabilities.',
    color: '#F59E0B',
    gradient: 'from-[#F59E0B] to-[#FBBF24]',
    count: 0,
    metaTitle: 'Phone Performance Guides - Speed & Gaming Tips | 7pexel',
    metaDescription: 'Optimize your phone performance with expert guides. Speed tips, gaming optimization, and benchmark understanding.',
    keywords: ['phone performance', 'speed up phone', 'gaming phone', 'benchmark scores'],
    subCategories: [
      { slug: 'hardware', name: 'Hardware Basics' },
      { slug: 'benchmark', name: 'Benchmarking' },
      { slug: 'optimization', name: 'Optimization' },
      { slug: 'gaming', name: 'Gaming' },
    ]
  },
  {
    id: 'value',
    slug: 'value',
    name: 'Value Guides',
    icon: '💰',
    description: 'Find the best phones for your budget and get the most value for your money.',
    color: '#14B8A6',
    gradient: 'from-[#14B8A6] to-[#2DD4BF]',
    count: 0,
    metaTitle: 'Best Value Phone Guides - Budget Smartphones | 7pexel',
    metaDescription: 'Find the best value smartphones for your budget. Expert guides on affordable phones, deals, and savings.',
    keywords: ['best value phones', 'budget smartphones', 'affordable phones', 'phone deals'],
    subCategories: [
      { slug: 'budget', name: 'Budget Categories' },
      { slug: 'analysis', name: 'Value Analysis' },
      { slug: 'deals', name: 'Deals & Savings' },
      { slug: 'brand-value', name: 'Brand Value' },
    ]
  },
  {
    id: 'security',
    slug: 'security',
    name: 'Security Guides',
    icon: '🔒',
    description: 'Protect your phone, data, and privacy with expert security tips.',
    color: '#EF4444',
    gradient: 'from-[#EF4444] to-[#F87171]',
    count: 0,
    metaTitle: 'Phone Security Guides - Protect Your Data & Privacy | 7pexel',
    metaDescription: 'Expert phone security guides to protect your data and privacy. Password tips, app security, and online safety.',
    keywords: ['phone security', 'data privacy', 'secure phone', 'privacy tips'],
    subCategories: [
      { slug: 'password', name: 'Password Security' },
      { slug: 'apps', name: 'App Security' },
      { slug: 'privacy', name: 'Data Privacy' },
      { slug: 'online', name: 'Online Safety' },
      { slug: 'device', name: 'Device Security' },
    ]
  },
  {
    id: 'accessories',
    slug: 'accessories',
    name: 'Accessories Guides',
    icon: '🎧',
    description: 'Discover the best accessories to enhance your smartphone experience.',
    color: '#EC4899',
    gradient: 'from-[#EC4899] to-[#F472B6]',
    count: 0,
    metaTitle: 'Best Phone Accessories Guides - Cases, Audio & More | 7pexel',
    metaDescription: 'Discover the best phone accessories with expert guides. Cases, earbuds, chargers, and more.',
    keywords: ['phone accessories', 'best cases', 'wireless earbuds', 'phone chargers'],
    subCategories: [
      { slug: 'protection', name: 'Protection' },
      { slug: 'audio', name: 'Audio' },
      { slug: 'charging', name: 'Charging' },
      { slug: 'photography', name: 'Photography' },
      { slug: 'lifestyle', name: 'Lifestyle' },
    ]
  },
  {
    id: 'tips',
    slug: 'tips',
    name: 'Tips & Tricks',
    icon: '📱',
    description: 'Hidden features, productivity hacks, and smart tips for your phone.',
    color: '#8B5CF6',
    gradient: 'from-[#8B5CF6] to-[#A78BFA]',
    count: 0,
    metaTitle: 'Phone Tips & Tricks - Hidden Features & Hacks | 7pexel',
    metaDescription: 'Discover hidden phone features and productivity hacks. Expert tips for iPhone and Android.',
    keywords: ['phone tips', 'hidden features', 'productivity hacks', 'phone tricks'],
    subCategories: [
      { slug: 'general', name: 'General Tips' },
      { slug: 'iphone', name: 'iPhone Specific' },
      { slug: 'android', name: 'Android Specific' },
      { slug: 'apps', name: 'App Tips' },
      { slug: 'customization', name: 'Customization' },
    ]
  },
  {
    id: 'upgrade',
    slug: 'upgrade',
    name: 'Upgrade & Maintenance',
    icon: '📈',
    description: 'When to upgrade, how to maintain, and troubleshoot your phone.',
    color: '#06B6D4',
    gradient: 'from-[#06B6D4] to-[#22D3EE]',
    count: 0,
    metaTitle: 'Phone Upgrade & Maintenance Guides - Troubleshooting | 7pexel',
    metaDescription: 'Expert guides on when to upgrade your phone, maintenance tips, and troubleshooting common issues.',
    keywords: ['phone upgrade', 'phone maintenance', 'troubleshooting', 'fix phone'],
    subCategories: [
      { slug: 'upgrade', name: 'Upgrade Guides' },
      { slug: 'maintenance', name: 'Maintenance' },
      { slug: 'troubleshooting', name: 'Troubleshooting' },
      { slug: 'data-transfer', name: 'Data Transfer' },
    ]
  },
  {
    id: 'software',
    slug: 'software',
    name: 'Software & Apps',
    icon: '🤖',
    description: 'Master your phone software, OS updates, and best apps.',
    color: '#3B82F6',
    gradient: 'from-[#3B82F6] to-[#60A5FA]',
    count: 0,
    metaTitle: 'Phone Software & Apps Guides - OS & App Tips | 7pexel',
    metaDescription: 'Expert guides on phone software, OS updates, and the best apps for productivity, entertainment, and more.',
    keywords: ['phone software', 'OS updates', 'best apps', 'Android vs iOS'],
    subCategories: [
      { slug: 'os', name: 'Operating Systems' },
      { slug: 'updates', name: 'OS Updates' },
      { slug: 'best-apps', name: 'Best Apps' },
      { slug: 'app-guides', name: 'App Guides' },
    ]
  },
];

// ============================================
// COLOR SCHEMES FOR EACH ARTICLE
// ============================================

export const COLOR_SCHEMES = {
  // ─── BUYING GUIDE (TEAL + GOLD) ───
  buying: {
    primary: '#063F47',
    primaryLight: '#0B5A66',
    primaryDark: '#042A30',
    accent: '#E8A33D',
    accentLight: '#F5D79A',
    bg: '#F3F2ED',
    border: 'rgba(6,63,71,0.14)',
    heroBg: 'linear-gradient(135deg, #063F47, #0B5A66, #042A30)',
    heroText: '#FFFFFF',
    heroAccent: '#E8A33D',
  },
  // ─── CAMERA GUIDE (PURPLE + GOLD) ───
  camera: {
    primary: '#6C3CE1',
    primaryLight: '#8B5CF6',
    primaryDark: '#4A1FA0',
    accent: '#F59E0B',
    accentLight: '#FCD34D',
    bg: '#F5F0FF',
    border: 'rgba(108,60,225,0.14)',
    heroBg: 'linear-gradient(135deg, #4A1FA0, #6C3CE1, #8B5CF6)',
    heroText: '#FFFFFF',
    heroAccent: '#F59E0B',
  },
  // ─── BATTERY GUIDE (GREEN + YELLOW) ───
  battery: {
    primary: '#22C55E',
    primaryLight: '#4ADE80',
    primaryDark: '#16A34A',
    accent: '#F59E0B',
    accentLight: '#FCD34D',
    bg: '#F0FDF4',
    border: 'rgba(34,197,94,0.14)',
    heroBg: 'linear-gradient(135deg, #16A34A, #22C55E, #4ADE80)',
    heroText: '#FFFFFF',
    heroAccent: '#F59E0B',
  },
  // ─── PERFORMANCE GUIDE (ORANGE + RED) ───
  performance: {
    primary: '#F59E0B',
    primaryLight: '#FBBF24',
    primaryDark: '#D97706',
    accent: '#EF4444',
    accentLight: '#FCA5A5',
    bg: '#FFFBEB',
    border: 'rgba(245,158,11,0.14)',
    heroBg: 'linear-gradient(135deg, #D97706, #F59E0B, #FBBF24)',
    heroText: '#FFFFFF',
    heroAccent: '#EF4444',
  },
  // ─── VALUE GUIDE (TEAL + GOLD) ───
  value: {
    primary: '#14B8A6',
    primaryLight: '#2DD4BF',
    primaryDark: '#0D9488',
    accent: '#F59E0B',
    accentLight: '#FCD34D',
    bg: '#F0FDFA',
    border: 'rgba(20,184,166,0.14)',
    heroBg: 'linear-gradient(135deg, #0D9488, #14B8A6, #2DD4BF)',
    heroText: '#FFFFFF',
    heroAccent: '#F59E0B',
  },
  // ─── SECURITY GUIDE (RED + YELLOW) ───
  security: {
    primary: '#EF4444',
    primaryLight: '#F87171',
    primaryDark: '#DC2626',
    accent: '#F59E0B',
    accentLight: '#FCD34D',
    bg: '#FEF2F2',
    border: 'rgba(239,68,68,0.14)',
    heroBg: 'linear-gradient(135deg, #DC2626, #EF4444, #F87171)',
    heroText: '#FFFFFF',
    heroAccent: '#F59E0B',
  },
  // ─── ACCESSORIES GUIDE (PINK + GOLD) ───
  accessories: {
    primary: '#EC4899',
    primaryLight: '#F472B6',
    primaryDark: '#BE185D',
    accent: '#F59E0B',
    accentLight: '#FCD34D',
    bg: '#FDF2F8',
    border: 'rgba(236,72,153,0.14)',
    heroBg: 'linear-gradient(135deg, #BE185D, #EC4899, #F472B6)',
    heroText: '#FFFFFF',
    heroAccent: '#F59E0B',
  },
  // ─── TIPS GUIDE (PURPLE + YELLOW) ───
  tips: {
    primary: '#8B5CF6',
    primaryLight: '#A78BFA',
    primaryDark: '#7C3AED',
    accent: '#F59E0B',
    accentLight: '#FCD34D',
    bg: '#F5F3FF',
    border: 'rgba(139,92,246,0.14)',
    heroBg: 'linear-gradient(135deg, #7C3AED, #8B5CF6, #A78BFA)',
    heroText: '#FFFFFF',
    heroAccent: '#F59E0B',
  },
  // ─── UPGRADE GUIDE (CYAN + YELLOW) ───
  upgrade: {
    primary: '#06B6D4',
    primaryLight: '#22D3EE',
    primaryDark: '#0891B2',
    accent: '#F59E0B',
    accentLight: '#FCD34D',
    bg: '#ECFEFF',
    border: 'rgba(6,182,212,0.14)',
    heroBg: 'linear-gradient(135deg, #0891B2, #06B6D4, #22D3EE)',
    heroText: '#FFFFFF',
    heroAccent: '#F59E0B',
  },
  // ─── SOFTWARE GUIDE (BLUE + YELLOW) ───
  software: {
    primary: '#3B82F6',
    primaryLight: '#60A5FA',
    primaryDark: '#2563EB',
    accent: '#F59E0B',
    accentLight: '#FCD34D',
    bg: '#EFF6FF',
    border: 'rgba(59,130,246,0.14)',
    heroBg: 'linear-gradient(135deg, #2563EB, #3B82F6, #60A5FA)',
    heroText: '#FFFFFF',
    heroAccent: '#F59E0B',
  },
};

// ============================================
// ARTICLE 1: BUYING GUIDE (TEAL + GOLD)
// ============================================

const buyingGuideContent = `
  <div class="guide-content">
    <!-- ─── INTRO ─── -->
    <p style="font-size:1.15rem;font-weight:500;color:#063F47;max-width:100%;margin-bottom:1rem;line-height:1.8;">
      Every year the spec sheet gets longer and the decision gets harder. In 2026, the gap between a $300 phone and a $1,000 phone has actually narrowed in daily use — but a handful of differences still decide whether you'll be happy with your phone in eighteen months.
    </p>
    <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:2rem;line-height:1.8;">
      This guide skips the marketing language and walks through the five things worth spending your attention on: chipset and longevity, cameras, battery and charging, displays, and where foldables now fit.
    </p>

    <!-- ─── TABLE OF CONTENTS ─── -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(6,63,71,0.14);border:1px solid rgba(6,63,71,0.14);border-radius:14px;overflow:hidden;margin-bottom:3rem;">
      <a href="#at-a-glance" style="background:white;padding:22px 20px;text-decoration:none;color:#063F47;font-family:'Poppins',sans-serif;font-size:13px;letter-spacing:0.02em;display:flex;flex-direction:column;gap:6px;transition:background 0.15s ease;">
        <span style="color:#E8A33D;font-weight:500;">00</span>At a glance table
      </a>
      <a href="#chipsets" style="background:white;padding:22px 20px;text-decoration:none;color:#063F47;font-family:'Poppins',sans-serif;font-size:13px;letter-spacing:0.02em;display:flex;flex-direction:column;gap:6px;transition:background 0.15s ease;">
        <span style="color:#E8A33D;font-weight:500;">01</span>Chipsets &amp; software support
      </a>
      <a href="#cameras" style="background:white;padding:22px 20px;text-decoration:none;color:#063F47;font-family:'Poppins',sans-serif;font-size:13px;letter-spacing:0.02em;display:flex;flex-direction:column;gap:6px;transition:background 0.15s ease;">
        <span style="color:#E8A33D;font-weight:500;">02</span>Cameras that matter
      </a>
      <a href="#battery" style="background:white;padding:22px 20px;text-decoration:none;color:#063F47;font-family:'Poppins',sans-serif;font-size:13px;letter-spacing:0.02em;display:flex;flex-direction:column;gap:6px;transition:background 0.15s ease;">
        <span style="color:#E8A33D;font-weight:500;">03</span>Battery &amp; charging
      </a>
      <a href="#foldables" style="background:white;padding:22px 20px;text-decoration:none;color:#063F47;font-family:'Poppins',sans-serif;font-size:13px;letter-spacing:0.02em;display:flex;flex-direction:column;gap:6px;transition:background 0.15s ease;">
        <span style="color:#E8A33D;font-weight:500;">04</span>Foldables in 2026
      </a>
      <a href="#checklist" style="background:white;padding:22px 20px;text-decoration:none;color:#063F47;font-family:'Poppins',sans-serif;font-size:13px;letter-spacing:0.02em;display:flex;flex-direction:column;gap:6px;transition:background 0.15s ease;">
        <span style="color:#E8A33D;font-weight:500;">05</span>Buying checklist
      </a>
    </div>

    <!-- ─── AT A GLANCE TABLE ─── -->
    <h2 id="at-a-glance" style="font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(1.4rem,2.6vw,1.9rem);color:#063F47;margin-top:2.5rem;margin-bottom:0.5rem;border-bottom:1px solid rgba(6,63,71,0.14);padding-bottom:0.5rem;scroll-margin-top:80px;">
      At a glance: budget vs mid-range vs flagship
    </h2>
    <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#54655F;text-transform:uppercase;letter-spacing:0.08em;display:inline-block;margin-bottom:1rem;">quick compare</span>

    <div style="border:1px solid rgba(6,63,71,0.14);border-radius:14px;overflow:hidden;overflow-x:auto;margin-bottom:2rem;">
      <table style="width:100%;border-collapse:collapse;font-family:'Poppins',sans-serif;min-width:560px;">
        <thead>
          <tr>
            <th style="background:#063F47;color:white;text-align:left;font-weight:600;font-size:0.9rem;padding:18px 20px;white-space:nowrap;">Spec</th>
            <th style="background:#063F47;color:white;text-align:left;font-weight:600;font-size:0.9rem;padding:18px 20px;white-space:nowrap;">Budget <span style="display:block;font-weight:400;font-size:0.72rem;color:#AEDAD8;margin-top:3px;">under $250</span></th>
            <th style="background:#08262B;color:white;text-align:left;font-weight:600;font-size:0.9rem;padding:18px 20px;white-space:nowrap;position:relative;">Mid-range <span style="display:block;font-weight:400;font-size:0.72rem;color:#AEDAD8;margin-top:3px;">$250–$600</span></th>
            <th style="background:#063F47;color:white;text-align:left;font-weight:600;font-size:0.9rem;padding:18px 20px;white-space:nowrap;">Flagship <span style="display:block;font-weight:400;font-size:0.72rem;color:#AEDAD8;margin-top:3px;">$600+</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:16px 20px;font-size:0.86rem;color:#22322F;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;font-weight:600;background:#F3F2ED;white-space:nowrap;">Chipset tier</td>
            <td style="padding:16px 20px;font-size:0.86rem;color:#22322F;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;">Entry Snapdragon / Dimensity</td>
            <td style="padding:16px 20px;font-size:0.86rem;color:#063F47;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;background:rgba(232,163,61,0.08);font-weight:500;border-left:2px solid #E8A33D;border-right:2px solid #E8A33D;">Snapdragon 7 series</td>
            <td style="padding:16px 20px;font-size:0.86rem;color:#22322F;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;">Snapdragon 8 Gen 5</td>
          </tr>
          <tr>
            <td style="padding:16px 20px;font-size:0.86rem;color:#22322F;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;font-weight:600;background:#F3F2ED;white-space:nowrap;">Main camera</td>
            <td style="padding:16px 20px;font-size:0.86rem;color:#22322F;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;">50MP, basic night mode</td>
            <td style="padding:16px 20px;font-size:0.86rem;color:#063F47;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;background:rgba(232,163,61,0.08);font-weight:500;border-left:2px solid #E8A33D;border-right:2px solid #E8A33D;">50–108MP, solid low-light</td>
            <td style="padding:16px 20px;font-size:0.86rem;color:#22322F;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;">50–200MP, best-in-class night mode</td>
          </tr>
          <tr>
            <td style="padding:16px 20px;font-size:0.86rem;color:#22322F;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;font-weight:600;background:#F3F2ED;white-space:nowrap;">Battery</td>
            <td style="padding:16px 20px;font-size:0.86rem;color:#22322F;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;">5,000mAh, 18–25W charging</td>
            <td style="padding:16px 20px;font-size:0.86rem;color:#063F47;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;background:rgba(232,163,61,0.08);font-weight:500;border-left:2px solid #E8A33D;border-right:2px solid #E8A33D;">5,000mAh+, 45W charging</td>
            <td style="padding:16px 20px;font-size:0.86rem;color:#22322F;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;">5,000–5,500mAh, 65W+ charging</td>
          </tr>
          <tr>
            <td style="padding:16px 20px;font-size:0.86rem;color:#22322F;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;font-weight:600;background:#F3F2ED;white-space:nowrap;">Build</td>
            <td style="padding:16px 20px;font-size:0.86rem;color:#22322F;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;">Plastic frame, splash resistant</td>
            <td style="padding:16px 20px;font-size:0.86rem;color:#063F47;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;background:rgba(232,163,61,0.08);font-weight:500;border-left:2px solid #E8A33D;border-right:2px solid #E8A33D;">Aluminum frame, IP54–IP65</td>
            <td style="padding:16px 20px;font-size:0.86rem;color:#22322F;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;">Glass & metal, IP68</td>
          </tr>
          <tr>
            <td style="padding:16px 20px;font-size:0.86rem;color:#22322F;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;font-weight:600;background:#F3F2ED;white-space:nowrap;">Update promise</td>
            <td style="padding:16px 20px;font-size:0.86rem;color:#22322F;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;">2 years OS / 3 years security</td>
            <td style="padding:16px 20px;font-size:0.86rem;color:#063F47;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;background:rgba(232,163,61,0.08);font-weight:500;border-left:2px solid #E8A33D;border-right:2px solid #E8A33D;">3 years OS / 4 years security</td>
            <td style="padding:16px 20px;font-size:0.86rem;color:#22322F;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;">4–7 years OS & security</td>
          </tr>
          <tr>
            <td style="padding:16px 20px;font-size:0.86rem;color:#22322F;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;font-weight:600;background:#F3F2ED;white-space:nowrap;">Best for</td>
            <td style="padding:16px 20px;font-size:0.86rem;color:#22322F;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;">Calls, messaging, light use</td>
            <td style="padding:16px 20px;font-size:0.86rem;color:#063F47;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;background:rgba(232,163,61,0.08);font-weight:500;border-left:2px solid #E8A33D;border-right:2px solid #E8A33D;">Most people, best value</td>
            <td style="padding:16px 20px;font-size:0.86rem;color:#22322F;border-top:1px solid rgba(6,63,71,0.14);vertical-align:top;">Gaming, photography, longevity</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ─── CHIPSETS ─── -->
    <h2 id="chipsets" style="font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(1.4rem,2.6vw,1.9rem);color:#063F47;margin-top:2.5rem;margin-bottom:0.5rem;border-bottom:1px solid rgba(6,63,71,0.14);padding-bottom:0.5rem;scroll-margin-top:80px;">
      Chipset and software support decide the phone's lifespan
    </h2>
    <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#54655F;text-transform:uppercase;letter-spacing:0.08em;display:inline-block;margin-bottom:1rem;">01 / performance</span>
    <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:1.5rem;line-height:1.8;">
      Raw benchmark scores stopped being the interesting number a while ago. What separates a phone you'll still enjoy in three years from one that feels sluggish by year two is <strong style="color:#063F47;">sustained performance under thermal load</strong> and how long the manufacturer commits to updates.
    </p>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:8px;margin-bottom:2rem;">
      <div style="background:#F3F2ED;border:1px solid rgba(6,63,71,0.14);border-radius:14px;padding:28px 24px;">
        <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#E8A33D;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;display:block;">Flagship tier</span>
        <h3 style="font-family:'Poppins',sans-serif;font-size:1.05rem;margin:0 0 10px 0;color:#063F47;">Snapdragon 8 Gen 5 / Dimensity 9500</h3>
        <p style="font-size:0.86rem;color:#22322F;margin-bottom:0;line-height:1.8;">Console-adjacent gaming performance, on-device AI features that actually run locally, and the headroom to stay fast for years.</p>
      </div>
      <div style="background:#F3F2ED;border:1px solid rgba(6,63,71,0.14);border-radius:14px;padding:28px 24px;">
        <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#E8A33D;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;display:block;">Mid-range tier</span>
        <h3 style="font-family:'Poppins',sans-serif;font-size:1.05rem;margin:0 0 10px 0;color:#063F47;">Snapdragon 7 Gen 4 / Dimensity 8400</h3>
        <p style="font-size:0.86rem;color:#22322F;margin-bottom:0;line-height:1.8;">This is where the value sits in 2026 — smooth day-to-day use and solid gaming, at roughly half the flagship price.</p>
      </div>
      <div style="background:#F3F2ED;border:1px solid rgba(6,63,71,0.14);border-radius:14px;padding:28px 24px;">
        <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#E8A33D;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;display:block;">Software promise</span>
        <h3 style="font-family:'Poppins',sans-serif;font-size:1.05rem;margin:0 0 10px 0;color:#063F47;">Update commitment</h3>
        <p style="font-size:0.86rem;color:#22322F;margin-bottom:0;line-height:1.8;">A phone with 4 years of OS updates and 5 of security patches will outlast one with better specs but a 2-year promise.</p>
      </div>
    </div>

    <!-- ─── CAMERAS ─── -->
    <h2 id="cameras" style="font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(1.4rem,2.6vw,1.9rem);color:#063F47;margin-top:2.5rem;margin-bottom:0.5rem;border-bottom:1px solid rgba(6,63,71,0.14);padding-bottom:0.5rem;scroll-margin-top:80px;">
      Camera hardware has plateaued — processing hasn't
    </h2>
    <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#54655F;text-transform:uppercase;letter-spacing:0.08em;display:inline-block;margin-bottom:1rem;">02 / cameras</span>

    <div style="margin-bottom:2rem;">
      <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:1rem;line-height:1.8;">
        Sensor megapixels stopped being a meaningful differentiator once 50MP and 200MP sensors became common past the $400 mark. The real difference between phones now is computational: how well the phone handles motion in low light, how natural skin tones look without heavy smoothing, and whether the 3x-5x zoom stays usable past daylight.
      </p>
      <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:0;line-height:1.8;">
        If photography matters to you, look past the megapixel count on the spec sheet and toward independent night-mode and zoom comparisons — that's where phones actually separate from each other.
      </p>
    </div>

    <!-- ─── BATTERY ─── -->
    <h2 id="battery" style="font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(1.4rem,2.6vw,1.9rem);color:#063F47;margin-top:2.5rem;margin-bottom:0.5rem;border-bottom:1px solid rgba(6,63,71,0.14);padding-bottom:0.5rem;scroll-margin-top:80px;">
      Battery capacity matters less than charging speed and chemistry
    </h2>
    <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#54655F;text-transform:uppercase;letter-spacing:0.08em;display:inline-block;margin-bottom:1rem;">03 / battery</span>
    <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:1.5rem;line-height:1.8;">
      Silicon-carbon battery chemistry has pushed capacities past 5,500mAh in phones that are no thicker than last year's models. Combined with 45W-plus charging now common outside the ultra-budget segment, <strong style="color:#063F47;">"does it last all day" is a solved problem</strong> on most 2026 phones over $350.
    </p>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:8px;margin-bottom:2rem;">
      <div style="background:#F3F2ED;border:1px solid rgba(6,63,71,0.14);border-radius:14px;padding:28px 24px;">
        <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#E8A33D;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;display:block;">Look for</span>
        <h3 style="font-family:'Poppins',sans-serif;font-size:1.05rem;margin:0 0 10px 0;color:#063F47;">5,000mAh+ with silicon-carbon cells</h3>
        <p style="font-size:0.86rem;color:#22322F;margin-bottom:0;line-height:1.8;">Meaningfully thinner and lighter than older lithium-ion packs at the same capacity.</p>
      </div>
      <div style="background:#F3F2ED;border:1px solid rgba(6,63,71,0.14);border-radius:14px;padding:28px 24px;">
        <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#E8A33D;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;display:block;">Charging speed</span>
        <h3 style="font-family:'Poppins',sans-serif;font-size:1.05rem;margin:0 0 10px 0;color:#063F47;">45W or above</h3>
        <p style="font-size:0.86rem;color:#22322F;margin-bottom:0;line-height:1.8;">Gets most phones from empty to 50% in under 20 minutes — the point past which faster stops mattering day to day.</p>
      </div>
      <div style="background:#F3F2ED;border:1px solid rgba(6,63,71,0.14);border-radius:14px;padding:28px 24px;">
        <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#E8A33D;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;display:block;">Watch out for</span>
        <h3 style="font-family:'Poppins',sans-serif;font-size:1.05rem;margin:0 0 10px 0;color:#063F47;">Sub-25W charging on "flagship" phones</h3>
        <p style="font-size:0.86rem;color:#22322F;margin-bottom:0;line-height:1.8;">Still shows up on a few premium phones that prioritize thinness — a real trade-off if you charge on the go.</p>
      </div>
    </div>

    <!-- ─── FOLDABLES ─── -->
    <h2 id="foldables" style="font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(1.4rem,2.6vw,1.9rem);color:#063F47;margin-top:2.5rem;margin-bottom:0.5rem;border-bottom:1px solid rgba(6,63,71,0.14);padding-bottom:0.5rem;scroll-margin-top:80px;">
      Foldables finally feel like normal phones
    </h2>
    <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#54655F;text-transform:uppercase;letter-spacing:0.08em;display:inline-block;margin-bottom:1rem;">04 / form factor</span>

    <div style="margin-bottom:2rem;">
      <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:1rem;line-height:1.8;">
        For years, foldables asked you to trade durability and pocketability for screen real estate. That trade has mostly closed: hinge mechanisms rated for 400,000+ folds, IP68 water resistance, and inner-screen creases that have gone from obvious to barely visible.
      </p>
      <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:0;line-height:1.8;">
        They're still a premium purchase, and still heavier than a flat phone of the same screen size — but 2026 is the first year we'd recommend one to someone who isn't already a foldable enthusiast.
      </p>
    </div>

    <!-- ─── CHECKLIST ─── -->
    <div id="checklist" style="background:#063F47;color:white;border-radius:14px;padding:44px 40px;margin-top:10px;margin-bottom:2rem;scroll-margin-top:80px;">
      <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#9FC6C4;text-transform:uppercase;letter-spacing:0.08em;display:inline-block;margin-bottom:0.5rem;">05 / before you buy</span>
      <h2 style="font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(1.4rem,2.6vw,1.9rem);color:white;margin:0 0 0.5rem 0;">A ten-minute checklist before you check out</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px 40px;margin-top:26px;">
        <div style="display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid rgba(244,241,232,0.14);">
          <span style="font-family:'Poppins',sans-serif;color:#E8A33D;font-size:13px;flex-shrink:0;padding-top:2px;">01</span>
          <p style="color:#DCEAE9;margin:0;font-size:0.88rem;line-height:1.8;"><strong style="color:white;">Check the update promise</strong> — 4+ years OS, 5+ years security is the current flagship bar.</p>
        </div>
        <div style="display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid rgba(244,241,232,0.14);">
          <span style="font-family:'Poppins',sans-serif;color:#E8A33D;font-size:13px;flex-shrink:0;padding-top:2px;">02</span>
          <p style="color:#DCEAE9;margin:0;font-size:0.88rem;line-height:1.8;"><strong style="color:white;">Match the chipset to your use</strong> — don't pay for gaming-tier silicon if you mostly browse and message.</p>
        </div>
        <div style="display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid rgba(244,241,232,0.14);">
          <span style="font-family:'Poppins',sans-serif;color:#E8A33D;font-size:13px;flex-shrink:0;padding-top:2px;">03</span>
          <p style="color:#DCEAE9;margin:0;font-size:0.88rem;line-height:1.8;"><strong style="color:white;">Confirm real-world charging speed</strong>, not just the wattage printed on the box.</p>
        </div>
        <div style="display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid rgba(244,241,232,0.14);">
          <span style="font-family:'Poppins',sans-serif;color:#E8A33D;font-size:13px;flex-shrink:0;padding-top:2px;">04</span>
          <p style="color:#DCEAE9;margin:0;font-size:0.88rem;line-height:1.8;"><strong style="color:white;">Read a night-mode camera comparison</strong> instead of trusting the megapixel count.</p>
        </div>
        <div style="display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid rgba(244,241,232,0.14);">
          <span style="font-family:'Poppins',sans-serif;color:#E8A33D;font-size:13px;flex-shrink:0;padding-top:2px;">05</span>
          <p style="color:#DCEAE9;margin:0;font-size:0.88rem;line-height:1.8;"><strong style="color:white;">Check IP rating</strong> if you're near water or dust often — it's cheap insurance.</p>
        </div>
        <div style="display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid rgba(244,241,232,0.14);">
          <span style="font-family:'Poppins',sans-serif;color:#E8A33D;font-size:13px;flex-shrink:0;padding-top:2px;">06</span>
          <p style="color:#DCEAE9;margin:0;font-size:0.88rem;line-height:1.8;"><strong style="color:white;">Look at repair and battery-replacement cost</strong> before you buy, not after something breaks.</p>
        </div>
      </div>
    </div>

    <!-- ─── FAQ ─── -->
    <h2 style="font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(1.4rem,2.6vw,1.9rem);color:#063F47;margin-top:2.5rem;margin-bottom:0.5rem;border-bottom:1px solid rgba(6,63,71,0.14);padding-bottom:0.5rem;">
      Frequently asked questions
    </h2>
    <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#54655F;text-transform:uppercase;letter-spacing:0.08em;display:inline-block;margin-bottom:1rem;">06 / faq</span>

    <div style="border-bottom:1px solid rgba(6,63,71,0.14);padding:24px 0;">
      <h4 style="font-family:'Poppins',sans-serif;font-size:1rem;margin:0 0 8px 0;color:#063F47;font-weight:600;">Do I need a flagship phone in 2026?</h4>
      <p style="font-size:0.9rem;color:#22322F;margin:0;line-height:1.8;">Only if you game heavily, shoot a lot of low-light photography, or want the longest possible update runway. For most people, a well-reviewed mid-range phone covers 90% of flagship performance at 50-60% of the price.</p>
    </div>
    <div style="border-bottom:1px solid rgba(6,63,71,0.14);padding:24px 0;">
      <h4 style="font-family:'Poppins',sans-serif;font-size:1rem;margin:0 0 8px 0;color:#063F47;font-weight:600;">Is it worth buying last year's flagship instead?</h4>
      <p style="font-size:0.9rem;color:#22322F;margin:0;line-height:1.8;">Often yes. Year-old flagships typically drop 25-35% in price within months while keeping most of the update runway and nearly identical camera performance.</p>
    </div>
    <div style="border-bottom:1px solid rgba(6,63,71,0.14);padding:24px 0;">
      <h4 style="font-family:'Poppins',sans-serif;font-size:1rem;margin:0 0 8px 0;color:#063F47;font-weight:600;">Are foldables reliable enough for daily use now?</h4>
      <p style="font-size:0.9rem;color:#22322F;margin:0;line-height:1.8;">2026's second and third-generation hinges are rated well past typical multi-year usage, and most major brands now match their foldables' warranty terms to their flat phones — a good sign of underlying confidence.</p>
    </div>
    <div style="border-bottom:1px solid rgba(6,63,71,0.14);padding:24px 0;">
      <h4 style="font-family:'Poppins',sans-serif;font-size:1rem;margin:0 0 8px 0;color:#063F47;font-weight:600;">What's the single spec I should stop ignoring?</h4>
      <p style="font-size:0.9rem;color:#22322F;margin:0;line-height:1.8;">The update commitment. It quietly determines how long the phone stays secure and fast, and it's usually buried lower on the spec sheet than the camera or chipset.</p>
    </div>

    <!-- ─── CTA ─── -->
    <div style="background:linear-gradient(135deg, #042A30, #063F47, #0B5A66);color:white;border-radius:14px;padding:56px 44px;text-align:center;margin:30px 0 0 0;">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(1.4rem,2.6vw,1.9rem);color:#E8A33D;margin-bottom:14px;">Compare phones side by side before you decide</h2>
      <p style="color:#CFE3E2;max-width:52ch;margin:0 auto 28px auto;font-size:0.94rem;line-height:1.8;">Run any two phones from this guide through 7pexel's comparison tool to see chipset, camera, and battery differences laid out clearly.</p>
      <a href="/compare" style="display:inline-block;background:#E8A33D;color:#063F47;font-family:'Poppins',sans-serif;font-weight:600;font-size:0.92rem;padding:12px 26px;border-radius:8px;text-decoration:none;transition:background 0.2s ease;">Compare phones on 7pexel →</a>
    </div>
  </div>
`;

// ============================================
// ARTICLE 2: CAMERA GUIDE (PURPLE + GOLD)
// ============================================

const cameraGuideContent = `
  <div class="guide-content">
    <!-- ─── INTRO ─── -->
    <p style="font-size:1.15rem;font-weight:500;color:#4A1FA0;max-width:100%;margin-bottom:1rem;line-height:1.8;">
      Smartphone cameras have become the primary reason people upgrade. But with so many sensors, lenses, and AI features, it's easy to get lost in marketing jargon.
    </p>
    <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:2rem;line-height:1.8;">
      This guide strips away the noise and focuses on what actually makes a phone camera good — not megapixels, but the things that matter in your everyday photos.
    </p>

    <!-- ─── TABLE OF CONTENTS ─── -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(108,60,225,0.14);border:1px solid rgba(108,60,225,0.14);border-radius:14px;overflow:hidden;margin-bottom:3rem;">
      <a href="#sensor" style="background:white;padding:22px 20px;text-decoration:none;color:#4A1FA0;font-family:'Poppins',sans-serif;font-size:13px;letter-spacing:0.02em;display:flex;flex-direction:column;gap:6px;transition:background 0.15s ease;">
        <span style="color:#F59E0B;font-weight:500;">00</span>Sensor size matters more than megapixels
      </a>
      <a href="#lowlight" style="background:white;padding:22px 20px;text-decoration:none;color:#4A1FA0;font-family:'Poppins',sans-serif;font-size:13px;letter-spacing:0.02em;display:flex;flex-direction:column;gap:6px;transition:background 0.15s ease;">
        <span style="color:#F59E0B;font-weight:500;">01</span>Low light performance
      </a>
      <a href="#zoom" style="background:white;padding:22px 20px;text-decoration:none;color:#4A1FA0;font-family:'Poppins',sans-serif;font-size:13px;letter-spacing:0.02em;display:flex;flex-direction:column;gap:6px;transition:background 0.15s ease;">
        <span style="color:#F59E0B;font-weight:500;">02</span>Zoom — optical vs digital
      </a>
      <a href="#processing" style="background:white;padding:22px 20px;text-decoration:none;color:#4A1FA0;font-family:'Poppins',sans-serif;font-size:13px;letter-spacing:0.02em;display:flex;flex-direction:column;gap:6px;transition:background 0.15s ease;">
        <span style="color:#F59E0B;font-weight:500;">03</span>Processing and AI
      </a>
      <a href="#video" style="background:white;padding:22px 20px;text-decoration:none;color:#4A1FA0;font-family:'Poppins',sans-serif;font-size:13px;letter-spacing:0.02em;display:flex;flex-direction:column;gap:6px;transition:background 0.15s ease;">
        <span style="color:#F59E0B;font-weight:500;">04</span>Video recording capability
      </a>
      <a href="#front" style="background:white;padding:22px 20px;text-decoration:none;color:#4A1FA0;font-family:'Poppins',sans-serif;font-size:13px;letter-spacing:0.02em;display:flex;flex-direction:column;gap:6px;transition:background 0.15s ease;">
        <span style="color:#F59E0B;font-weight:500;">05</span>Front camera matters too
      </a>
    </div>

    <!-- ─── SENSOR SIZE ─── -->
    <h2 id="sensor" style="font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(1.4rem,2.6vw,1.9rem);color:#4A1FA0;margin-top:2.5rem;margin-bottom:0.5rem;border-bottom:1px solid rgba(108,60,225,0.14);padding-bottom:0.5rem;scroll-margin-top:80px;">
      Sensor size matters more than megapixels
    </h2>
    <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#6C3CE1;text-transform:uppercase;letter-spacing:0.08em;display:inline-block;margin-bottom:1rem;">00 / sensor</span>
    <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:1.5rem;line-height:1.8;">
      A 200MP sensor sounds impressive, but what actually determines image quality is the <strong style="color:#4A1FA0;">physical size of the sensor</strong>. Larger sensors capture more light, which means better dynamic range, less noise, and more detail in shadows.
    </p>
    <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:1.5rem;line-height:1.8;">
      In 2026, flagship phones have sensors around 1-inch (type 1/1.3"), while mid-range phones typically use smaller sensors around 1/1.7". The difference in low-light performance is noticeable — especially in challenging conditions.
    </p>

    <!-- ─── LOW LIGHT ─── -->
    <h2 id="lowlight" style="font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(1.4rem,2.6vw,1.9rem);color:#4A1FA0;margin-top:2.5rem;margin-bottom:0.5rem;border-bottom:1px solid rgba(108,60,225,0.14);padding-bottom:0.5rem;scroll-margin-top:80px;">
      Low light performance separates good from great
    </h2>
    <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#6C3CE1;text-transform:uppercase;letter-spacing:0.08em;display:inline-block;margin-bottom:1rem;">01 / low light</span>
    <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:1.5rem;line-height:1.8;">
      The real test of a phone camera isn't a sunny day — it's a dimly lit room. This is where computational photography (the AI processing behind the scenes) earns its keep. Phones with better night modes can capture usable images in near-darkness.
    </p>
    <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:1.5rem;line-height:1.8;">
      Look for phones that offer <strong style="color:#4A1FA0;">multi-frame noise reduction</strong> and <strong style="color:#4A1FA0;">optical image stabilization (OIS)</strong>. OIS is especially important in low light, as it allows the camera to keep the shutter open longer without blurring from hand shake.
    </p>

    <!-- ─── ZOOM ─── -->
    <h2 id="zoom" style="font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(1.4rem,2.6vw,1.9rem);color:#4A1FA0;margin-top:2.5rem;margin-bottom:0.5rem;border-bottom:1px solid rgba(108,60,225,0.14);padding-bottom:0.5rem;scroll-margin-top:80px;">
      Optical zoom vs digital zoom — know the difference
    </h2>
    <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#6C3CE1;text-transform:uppercase;letter-spacing:0.08em;display:inline-block;margin-bottom:1rem;">02 / zoom</span>
    <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:1.5rem;line-height:1.8;">
      <strong style="color:#4A1FA0;">Optical zoom</strong> uses physical lenses to magnify the subject — it preserves image quality. <strong style="color:#4A1FA0;">Digital zoom</strong> simply crops and stretches the image, which reduces quality.
    </p>
    <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:1.5rem;line-height:1.8;">
      In 2026, flagship phones offer 3x to 5x optical zoom, while some premium models go up to 10x. For most people, 3x optical zoom is sufficient for everyday photography. Anything beyond that is a nice-to-have, not a must-have.
    </p>

    <!-- ─── PROCESSING ─── -->
    <h2 id="processing" style="font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(1.4rem,2.6vw,1.9rem);color:#4A1FA0;margin-top:2.5rem;margin-bottom:0.5rem;border-bottom:1px solid rgba(108,60,225,0.14);padding-bottom:0.5rem;scroll-margin-top:80px;">
      Processing and AI make the final image
    </h2>
    <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#6C3CE1;text-transform:uppercase;letter-spacing:0.08em;display:inline-block;margin-bottom:1rem;">03 / processing</span>
    <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:1.5rem;line-height:1.8;">
      The hardware captures the light, but the <strong style="color:#4A1FA0;">image signal processor (ISP)</strong> and <strong style="color:#4A1FA0;">AI algorithms</strong> turn it into a photo you'd want to share. This is where brands like Google (Pixel) and Apple (iPhone) consistently excel.
    </p>
    <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:1.5rem;line-height:1.8;">
      Look for features like <strong style="color:#4A1FA0;">HDR</strong> (High Dynamic Range), which balances bright and dark areas, and <strong style="color:#4A1FA0;">Deep Fusion</strong> or similar technologies that enhance detail and texture. AI-driven scene optimization can also help by automatically adjusting settings based on what you're photographing.
    </p>

    <!-- ─── VIDEO ─── -->
    <h2 id="video" style="font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(1.4rem,2.6vw,1.9rem);color:#4A1FA0;margin-top:2.5rem;margin-bottom:0.5rem;border-bottom:1px solid rgba(108,60,225,0.14);padding-bottom:0.5rem;scroll-margin-top:80px;">
      Video recording capability
    </h2>
    <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#6C3CE1;text-transform:uppercase;letter-spacing:0.08em;display:inline-block;margin-bottom:1rem;">04 / video</span>
    <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:1.5rem;line-height:1.8;">
      If you shoot video, pay attention to <strong style="color:#4A1FA0;">stabilization</strong> and <strong style="color:#4A1FA0;">frame rates</strong>. Most phones now support 4K at 60fps, but flagship phones can do 8K at 30fps.
    </p>
    <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:1.5rem;line-height:1.8;">
      <strong style="color:#4A1FA0;">Action mode</strong> (or similar) is a feature worth looking for — it uses the ultrawide camera to stabilize footage of fast-moving subjects. Also consider whether the phone supports <strong style="color:#4A1FA0;">Dolby Vision HDR</strong> or <strong style="color:#4A1FA0;">Log recording</strong> for professional-grade color grading.
    </p>

    <!-- ─── FRONT CAMERA ─── -->
    <h2 id="front" style="font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(1.4rem,2.6vw,1.9rem);color:#4A1FA0;margin-top:2.5rem;margin-bottom:0.5rem;border-bottom:1px solid rgba(108,60,225,0.14);padding-bottom:0.5rem;scroll-margin-top:80px;">
      Front camera matters too
    </h2>
    <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#6C3CE1;text-transform:uppercase;letter-spacing:0.08em;display:inline-block;margin-bottom:1rem;">05 / front camera</span>
    <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:1.5rem;line-height:1.8;">
      The front-facing camera is often overlooked, but it's crucial for video calls and selfies. In 2026, most phones have 32MP to 50MP front cameras with autofocus — a significant upgrade from the fixed-focus cameras of years past.
    </p>
    <p style="font-size:0.94rem;color:#22322F;max-width:100%;margin-bottom:1.5rem;line-height:1.8;">
      Look for <strong style="color:#4A1FA0;">autofocus</strong> on the front camera — it makes a huge difference in sharpness. Also consider the <strong style="color:#4A1FA0;">field of view</strong> — a wider lens lets you fit more people or background into the frame.
    </p>

    <!-- ─── CHECKLIST ─── -->
    <div id="checklist" style="background:#4A1FA0;color:white;border-radius:14px;padding:44px 40px;margin-top:10px;margin-bottom:2rem;scroll-margin-top:80px;">
      <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#C4B5FD;text-transform:uppercase;letter-spacing:0.08em;display:inline-block;margin-bottom:0.5rem;">06 / camera checklist</span>
      <h2 style="font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(1.4rem,2.6vw,1.9rem);color:white;margin:0 0 0.5rem 0;">Camera checklist before you buy</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px 40px;margin-top:26px;">
        <div style="display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.14);">
          <span style="font-family:'Poppins',sans-serif;color:#F59E0B;font-size:13px;flex-shrink:0;padding-top:2px;">01</span>
          <p style="color:#DDD6FE;margin:0;font-size:0.88rem;line-height:1.8;"><strong style="color:white;">Check sensor size</strong> — larger sensors = better low light.</p>
        </div>
        <div style="display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.14);">
          <span style="font-family:'Poppins',sans-serif;color:#F59E0B;font-size:13px;flex-shrink:0;padding-top:2px;">02</span>
          <p style="color:#DDD6FE;margin:0;font-size:0.88rem;line-height:1.8;"><strong style="color:white;">Look for OIS</strong> — optical stabilization reduces blur in low light.</p>
        </div>
        <div style="display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.14);">
          <span style="font-family:'Poppins',sans-serif;color:#F59E0B;font-size:13px;flex-shrink:0;padding-top:2px;">03</span>
          <p style="color:#DDD6FE;margin:0;font-size:0.88rem;line-height:1.8;"><strong style="color:white;">Test night mode</strong> — read reviews for low-light performance.</p>
        </div>
        <div style="display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.14);">
          <span style="font-family:'Poppins',sans-serif;color:#F59E0B;font-size:13px;flex-shrink:0;padding-top:2px;">04</span>
          <p style="color:#DDD6FE;margin:0;font-size:0.88rem;line-height:1.8;"><strong style="color:white;">Check zoom quality</strong> — optical zoom preserves quality.</p>
        </div>
        <div style="display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.14);">
          <span style="font-family:'Poppins',sans-serif;color:#F59E0B;font-size:13px;flex-shrink:0;padding-top:2px;">05</span>
          <p style="color:#DDD6FE;margin:0;font-size:0.88rem;line-height:1.8;"><strong style="color:white;">Test video stabilization</strong> — action mode is a great feature.</p>
        </div>
        <div style="display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.14);">
          <span style="font-family:'Poppins',sans-serif;color:#F59E0B;font-size:13px;flex-shrink:0;padding-top:2px;">06</span>
          <p style="color:#DDD6FE;margin:0;font-size:0.88rem;line-height:1.8;"><strong style="color:white;">Check front camera autofocus</strong> — it matters for selfies.</p>
        </div>
      </div>
    </div>

    <!-- ─── FAQ ─── -->
    <h2 style="font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(1.4rem,2.6vw,1.9rem);color:#4A1FA0;margin-top:2.5rem;margin-bottom:0.5rem;border-bottom:1px solid rgba(108,60,225,0.14);padding-bottom:0.5rem;">
      Frequently asked questions
    </h2>
    <span style="font-family:'Poppins',sans-serif;font-size:12px;color:#6C3CE1;text-transform:uppercase;letter-spacing:0.08em;display:inline-block;margin-bottom:1rem;">07 / faq</span>

    <div style="border-bottom:1px solid rgba(108,60,225,0.14);padding:24px 0;">
      <h4 style="font-family:'Poppins',sans-serif;font-size:1rem;margin:0 0 8px 0;color:#4A1FA0;font-weight:600;">How many megapixels do I really need?</h4>
      <p style="font-size:0.9rem;color:#22322F;margin:0;line-height:1.8;">For most people, 50MP is more than enough. Higher megapixels only matter if you plan to crop heavily or print large photos.</p>
    </div>
    <div style="border-bottom:1px solid rgba(108,60,225,0.14);padding:24px 0;">
      <h4 style="font-family:'Poppins',sans-serif;font-size:1rem;margin:0 0 8px 0;color:#4A1FA0;font-weight:600;">Is night mode important?</h4>
      <p style="font-size:0.9rem;color:#22322F;margin:0;line-height:1.8;">Yes. If you take photos indoors or at night, a good night mode makes a huge difference.</p>
    </div>
    <div style="border-bottom:1px solid rgba(108,60,225,0.14);padding:24px 0;">
      <h4 style="font-family:'Poppins',sans-serif;font-size:1rem;margin:0 0 8px 0;color:#4A1FA0;font-weight:600;">Do I need a dedicated telephoto lens?</h4>
      <p style="font-size:0.9rem;color:#22322F;margin:0;line-height:1.8;">If you take portraits or photos of distant subjects, yes. A 3x optical telephoto lens is a good balance.</p>
    </div>
    <div style="border-bottom:1px solid rgba(108,60,225,0.14);padding:24px 0;">
      <h4 style="font-family:'Poppins',sans-serif;font-size:1rem;margin:0 0 8px 0;color:#4A1FA0;font-weight:600;">What about video recording?</h4>
      <p style="font-size:0.9rem;color:#22322F;margin:0;line-height:1.8;">Look for 4K at 60fps as a minimum. OIS and good stabilization are also important.</p>
    </div>

    <!-- ─── CTA ─── -->
    <div style="background:linear-gradient(135deg, #4A1FA0, #6C3CE1, #8B5CF6);color:white;border-radius:14px;padding:56px 44px;text-align:center;margin:30px 0 0 0;">
      <h2 style="font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(1.4rem,2.6vw,1.9rem);color:#F59E0B;margin-bottom:14px;">Ready to find the perfect camera phone?</h2>
      <p style="color:#DDD6FE;max-width:52ch;margin:0 auto 28px auto;font-size:0.94rem;line-height:1.8;">Compare the best camera phones side by side and see which one matches your photography needs.</p>
      <a href="/compare" style="display:inline-block;background:#F59E0B;color:#4A1FA0;font-family:'Poppins',sans-serif;font-weight:600;font-size:0.92rem;padding:12px 26px;border-radius:8px;text-decoration:none;transition:background 0.2s ease;">Compare camera phones →</a>
    </div>
  </div>
`;

// ============================================
// GUIDES ARRAY WITH DYNAMIC COLORS
// ============================================

export const GUIDES: Guide[] = [
  // ==========================================
  // ARTICLE 1: BUYING GUIDE (TEAL + GOLD)
  // ==========================================
  {
    id: 'buying-1',
    slug: 'smartphone-buying-guide',
    title: 'The Ultimate Smartphone Buying Guide 2026',
    excerpt: 'Chipsets, cameras, batteries and folding screens have all moved this year. Here\'s what actually matters when you\'re choosing between a flagship, a mid-ranger, and a budget phone that punches above its price.',
    content: buyingGuideContent,
    category: 'Buying Guides',
    categorySlug: 'buying',
    subCategory: 'Budget',
    subCategorySlug: 'budget',
    icon: '🛒',
    image: '',
    gallery: [],
    author: '7pexel Team',
    authorAvatar: 'https://ui-avatars.com/api/?name=7pexel+Team&background=063F47&color=fff&size=56',
    authorBio: 'Tech enthusiast and smartphone reviewer with 10+ years of experience.',
    authorSocial: [
      { platform: 'twitter', url: 'https://twitter.com/7pexel' },
      { platform: 'linkedin', url: 'https://linkedin.com/company/7pexel' },
    ],
    date: '2026-08-20',
    updatedDate: '2026-08-22',
    readTime: '10 min read',
    difficulty: 'Beginner',
    tags: ['smartphone', 'buying', 'guide', '2026', 'flagship', 'mid-range', 'budget', 'chipset', 'camera', 'battery', 'foldable'],
    isFeatured: true,
    isTrending: true,
    isNew: true,
    views: 1250,
    likes: 89,
    comments: 23,
    shares: 45,
    seoTitle: 'The Ultimate Smartphone Buying Guide 2026 | 7pexel',
    seoDescription: 'Chipsets, cameras, batteries and folding screens explained. What actually matters when choosing between a flagship, mid-ranger, and budget phone.',
    seoKeywords: ['smartphone buying guide', 'best phone 2026', 'flagship vs mid-range', 'phone buying tips', 'smartphone comparison'],
    faqs: [
      { question: 'Do I need a flagship phone in 2026?', answer: 'Only if you game heavily, shoot a lot of low-light photography, or want the longest possible update runway. For most people, a well-reviewed mid-range phone covers 90% of flagship performance at 50-60% of the price.' },
      { question: 'Is it worth buying last year\'s flagship instead?', answer: 'Often yes. Year-old flagships typically drop 25-35% in price within months while keeping most of the update runway and nearly identical camera performance.' },
      { question: 'Are foldables reliable enough for daily use now?', answer: '2026\'s second and third-generation hinges are rated well past typical multi-year usage, and most major brands now match their foldables\' warranty terms to their flat phones.' },
      { question: 'What\'s the single spec I should stop ignoring?', answer: 'The update commitment. It quietly determines how long the phone stays secure and fast, and it\'s usually buried lower on the spec sheet.' },
    ],
    relatedGuides: ['phone-camera-guide'],
    canonical: 'https://7pexel.com/guides/smartphone-buying-guide',
    tableOfContents: [
      { id: 'at-a-glance', title: 'At a glance table' },
      { id: 'chipsets', title: 'Chipsets & software support' },
      { id: 'cameras', title: 'Cameras that matter' },
      { id: 'battery', title: 'Battery & charging' },
      { id: 'foldables', title: 'Foldables in 2026' },
      { id: 'checklist', title: 'Buying checklist' },
    ],
    // ─── DYNAMIC COLOR SCHEME ───
    colors: COLOR_SCHEMES.buying,
  },

  // ==========================================
  // ARTICLE 2: CAMERA GUIDE (PURPLE + GOLD)
  // ==========================================
  {
    id: 'camera-1',
    slug: 'phone-camera-guide',
    title: 'Phone Camera Guide: What Actually Matters',
    excerpt: 'Stop chasing megapixels. Learn what really makes a phone camera good — sensor size, low light performance, optical zoom, and processing.',
    content: cameraGuideContent,
    category: 'Camera Guides',
    categorySlug: 'camera',
    subCategory: 'Basics',
    subCategorySlug: 'basics',
    icon: '📷',
    image: '',
    gallery: [],
    author: '7pexel Team',
    authorAvatar: 'https://ui-avatars.com/api/?name=7pexel+Team&background=6C3CE1&color=fff&size=56',
    authorBio: 'Tech enthusiast and photography expert with 10+ years of experience.',
    authorSocial: [
      { platform: 'twitter', url: 'https://twitter.com/7pexel' },
      { platform: 'instagram', url: 'https://instagram.com/7pexel' },
    ],
    date: '2026-08-22',
    updatedDate: '2026-08-22',
    readTime: '8 min read',
    difficulty: 'Beginner',
    tags: ['camera', 'photography', 'phone camera', 'sensor', 'low light', 'zoom', 'video', 'selfie'],
    isFeatured: true,
    isTrending: true,
    isNew: true,
    views: 850,
    likes: 56,
    comments: 12,
    shares: 28,
    seoTitle: 'Phone Camera Guide: What Actually Matters in 2026 | 7pexel',
    seoDescription: 'Stop chasing megapixels. Learn what really makes a phone camera good — sensor size, low light performance, optical zoom, and processing.',
    seoKeywords: ['phone camera guide', 'what matters in camera', 'sensor size', 'low light photography', 'optical zoom', 'phone photography'],
    faqs: [
      { question: 'How many megapixels do I really need?', answer: 'For most people, 50MP is more than enough. Higher megapixels only matter if you plan to crop heavily or print large photos.' },
      { question: 'Is night mode important?', answer: 'Yes. If you take photos indoors or at night, a good night mode makes a huge difference.' },
      { question: 'Do I need a dedicated telephoto lens?', answer: 'If you take portraits or photos of distant subjects, yes. A 3x optical telephoto lens is a good balance.' },
      { question: 'What about video recording?', answer: 'Look for 4K at 60fps as a minimum. OIS and good stabilization are also important.' },
    ],
    relatedGuides: ['smartphone-buying-guide'],
    canonical: 'https://7pexel.com/guides/phone-camera-guide',
    tableOfContents: [
      { id: 'sensor', title: 'Sensor size matters more than megapixels' },
      { id: 'lowlight', title: 'Low light performance' },
      { id: 'zoom', title: 'Zoom — optical vs digital' },
      { id: 'processing', title: 'Processing and AI' },
      { id: 'video', title: 'Video recording capability' },
      { id: 'front', title: 'Front camera matters too' },
    ],
    // ─── DYNAMIC COLOR SCHEME ───
    colors: COLOR_SCHEMES.camera,
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find(guide => guide.slug === slug);
}

export function getGuidesByCategory(categorySlug: string): Guide[] {
  return GUIDES.filter(guide => guide.categorySlug === categorySlug);
}

export function getFeaturedGuides(limit: number = 6): Guide[] {
  return GUIDES.filter(guide => guide.isFeatured).slice(0, limit);
}

export function getTrendingGuides(limit: number = 4): Guide[] {
  return GUIDES.filter(guide => guide.isTrending).slice(0, limit);
}

export function getNewGuides(limit: number = 4): Guide[] {
  return GUIDES.filter(guide => guide.isNew).slice(0, limit);
}

export function getRelatedGuides(slug: string, limit: number = 4): Guide[] {
  const guide = getGuideBySlug(slug);
  if (!guide) return [];
  
  return GUIDES
    .filter(g => g.id !== guide.id && g.categorySlug === guide.categorySlug)
    .slice(0, limit);
}

export function getGuideTags(): string[] {
  const tags = new Set<string>();
  GUIDES.forEach(guide => guide.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags);
}

export function getGuideCategories() {
  return GUIDE_CATEGORIES;
}

export function getCategoryBySlug(slug: string) {
  return GUIDE_CATEGORIES.find(cat => cat.slug === slug);
}

export function getCategoryCount(slug: string): number {
  return GUIDES.filter(guide => guide.categorySlug === slug).length;
}

// ============================================
// GENERATE SITEMAP DATA
// ============================================

export function generateGuideSitemap() {
  const baseUrl = 'https://7pexel.com';
  const guides = GUIDES.map(guide => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: guide.updatedDate || guide.date,
    changeFrequency: 'weekly' as const,
    priority: guide.isFeatured ? 0.9 : 0.85,
  }));

  const categories = GUIDE_CATEGORIES.map(cat => ({
    url: `${baseUrl}/guides/category/${cat.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return {
    guides,
    categories,
    total: guides.length + categories.length + 1,
  };
}