// app/phones/finder/data/static-phone-data.ts

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  metaRobots: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  ogSiteName: string;
  ogLocale: string;
  twitterCard: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterSite: string;
  twitterCreator: string;
  faqSchema: FAQItem[];
  reviewSchema: ReviewItem[];
  breadcrumbList: BreadcrumbItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface ReviewItem {
  author: string;
  rating: number;
  reviewBody: string;
  date: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
  position: number;
}

export interface PhoneData {
  _id: string;
  slug: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  category: string[];
  
  // Display
  display: string;
  displaySize: string;
  displayResolution: string;
  displayType: string;
  displayProtection: string;
  displayFeatures: string[];
  refreshRate: string;
  brightness: string;
  aspectRatio: string;
  pixelDensity: string;
  screenToBodyRatio: string;
  
  // Camera
  camera: string;
  cameraDetails: string;
  cameraFeatures: string[];
  videoRecording: string;
  frontCamera: string;
  frontCameraFeatures: string[];
  cameraSensor: string;
  aperture: string;
  opticalZoom: string;
  digitalZoom: string;
  
  // Battery
  battery: string;
  batteryType: string;
  charging: string;
  chargingType: string;
  wirelessCharging: string;
  reverseCharging: string;
  batteryLife: string;
  chargingTime: string;
  
  // Performance
  chipset: string;
  chipsetDetails: string;
  cpu: string;
  cpuCores: string;
  cpuFrequency: string;
  gpu: string;
  gpuDetails: string;
  ram: string;
  ramType: string;
  storage: string;
  storageType: string;
  expandableStorage: string;
  antutuScore: string;
  geekbenchScore: string;
  
  // OS & Software
  os: string;
  osVersion: string;
  uiSkin: string;
  updatePolicy: string;
  securityUpdates: string;
  
  // Physical
  weight: string;
  dimensions: string;
  colors: string[];
  materials: string[];
  waterResistance: string;
  dustResistance: string;
  
  // Connectivity
  sim: string;
  network: string;
  wifi: string;
  bluetooth: string;
  nfc: string;
  usb: string;
  gps: string;
  sensors: string[];
  
  // Audio
  speakers: string;
  audioJack: string;
  audioFeatures: string[];
  
  // Security
  fingerprint: string;
  faceUnlock: string;
  securityFeatures: string[];
  
  // Content
  highlights: string[];
  pros: string[];
  cons: string[];
  author: string;
  authorAvatar: string;
  authorBio: string;
  authorSocial: string[];
  date: string;
  readTime: string;
  customStyles: string;
  contentHtml: string;
  contentPlain: string;
  
  // Flags
  isFeatured: boolean;
  isTrending: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  seo: SEOData;
}

// ============================================
// UNIQUE FAQS FOR EACH PHONE
// ============================================

const PHONE_FAQS: Record<string, FAQItem[]> = {
  'apple-iphone-16-pro-max': [
    {
      question: 'What is the price of iPhone 16 Pro Max in 2026?',
      answer: 'The iPhone 16 Pro Max is priced at $1,199 in 2026. It comes in 256GB, 512GB, and 1TB storage variants with 8GB RAM. Available in Black Titanium, White Titanium, Natural Titanium, and Desert Titanium colors.',
      category: '💰 Price'
    },
    {
      question: 'What is the camera quality of iPhone 16 Pro Max?',
      answer: 'The iPhone 16 Pro Max features a revolutionary triple 48MP camera system with 48MP Wide, 48MP Ultra Wide, and 48MP Telephoto lenses. It offers 5x optical zoom, sensor-shift OIS, Night Mode, Deep Fusion, and Smart HDR 5. Supports 8K video recording at 30fps.',
      category: '📷 Camera'
    },
    {
      question: 'What is the battery life of iPhone 16 Pro Max?',
      answer: 'The iPhone 16 Pro Max has a 4685mAh battery that offers excellent all-day battery life. It supports 25W wired charging via USB-C PD and can charge up to 50% in 30 minutes. Battery optimization features extend battery life significantly.',
      category: '🔋 Battery'
    },
    {
      question: 'Is iPhone 16 Pro Max good for gaming?',
      answer: 'Yes, the iPhone 16 Pro Max is excellent for gaming with its A18 Pro chip and 8GB RAM. The 6.9-inch Super Retina XDR display with 120Hz ProMotion provides incredibly smooth gameplay. The battery lasts for extended gaming sessions.',
      category: '🎮 Gaming'
    },
    {
      question: 'What are the main features of iPhone 16 Pro Max?',
      answer: 'Key features include the A18 Pro chip with 6-core CPU and 6-core GPU, 6.9-inch Super Retina XDR display with ProMotion, titanium design with USB-C port, triple 48MP camera system, and advanced AI features for photography and productivity.',
      category: '✨ Features'
    }
  ],
  'samsung-galaxy-s26-ultra': [
    {
      question: 'What is the price of Samsung Galaxy S26 Ultra?',
      answer: 'The Samsung Galaxy S26 Ultra is priced at $1,299 in 2026. It comes in 256GB, 512GB, and 1TB storage variants with 12GB RAM. Available in Phantom Black, Cream, Green, and Lavender colors.',
      category: '💰 Price'
    },
    {
      question: 'What is the camera quality of Galaxy S26 Ultra?',
      answer: 'The Galaxy S26 Ultra features a revolutionary 200MP quad camera system with 200MP Wide, 50MP Ultra Wide, 50MP Telephoto, and 10MP Periscope lenses. It offers 100x Space Zoom, dual OIS, Night Mode, and 8K video recording at 30fps.',
      category: '📷 Camera'
    },
    {
      question: 'What is the battery life of Galaxy S26 Ultra?',
      answer: 'The Galaxy S26 Ultra has a 5000mAh battery that offers excellent all-day battery life. It supports 45W wired charging via USB-C PD and can charge up to 70% in 30 minutes. Battery optimization features extend battery life significantly.',
      category: '🔋 Battery'
    },
    {
      question: 'Does Galaxy S26 Ultra have S Pen support?',
      answer: 'Yes, the Galaxy S26 Ultra comes with built-in S Pen support. The S Pen is included in the box and offers precise control for note-taking, drawing, and navigation. It\'s perfect for productivity and creative work.',
      category: '✏️ S Pen'
    },
    {
      question: 'What are the main features of Galaxy S26 Ultra?',
      answer: 'Key features include the Snapdragon 8 Gen 4 processor, 200MP camera with 100x Space Zoom, S Pen support, 5000mAh battery, 6.9-inch Dynamic AMOLED 2X display, and Samsung\'s One UI 6 based on Android 15.',
      category: '✨ Features'
    }
  ],
  'google-pixel-10-pro': [
    {
      question: 'What is the price of Google Pixel 10 Pro?',
      answer: 'The Google Pixel 10 Pro is priced at $999 in 2026. It comes in 128GB and 256GB storage variants with 12GB RAM. Available in Obsidian, Porcelain, Hazel, and Rose colors.',
      category: '💰 Price'
    },
    {
      question: 'What is the camera quality of Pixel 10 Pro?',
      answer: 'The Pixel 10 Pro features a triple 50MP camera system with 50MP Wide, 48MP Ultra Wide, and 48MP Telephoto lenses. It offers Super Res Zoom, OIS, Night Sight, Magic Eraser, and Real Tone technology. Supports 4K video recording at 60fps.',
      category: '📷 Camera'
    },
    {
      question: 'What is the battery life of Pixel 10 Pro?',
      answer: 'The Pixel 10 Pro has a 5050mAh battery that offers excellent battery life. It supports 30W wired charging via USB-C PD and can charge up to 50% in 30 minutes. Battery optimization features extend battery life significantly.',
      category: '🔋 Battery'
    },
    {
      question: 'What are the AI features of Pixel 10 Pro?',
      answer: 'The Pixel 10 Pro features Google\'s Tensor G4 chip with advanced AI capabilities including Magic Eraser, Real Tone, Live Translate, and AI-powered photography features. It offers the best AI experience on any smartphone.',
      category: '🤖 AI'
    },
    {
      question: 'What are the main features of Pixel 10 Pro?',
      answer: 'Key features include the Tensor G4 chip with AI processing, 50MP camera system, 6.7-inch OLED display with 120Hz refresh rate, 5050mAh battery, and pure Android experience with 7 years of software updates.',
      category: '✨ Features'
    }
  ],
  'oneplus-14-pro': [
    {
      question: 'What is the price of OnePlus 14 Pro?',
      answer: 'The OnePlus 14 Pro is priced at $899 in 2026. It comes in 256GB and 512GB storage variants with 12GB RAM. Available in Black, White, and Green colors.',
      category: '💰 Price'
    },
    {
      question: 'What is the camera quality of OnePlus 14 Pro?',
      answer: 'The OnePlus 14 Pro features a triple 50MP camera system with 50MP Wide, 50MP Ultra Wide, and 64MP Telephoto lenses with Hasselblad tuning. It offers OIS, Night Mode, and Pro Mode. Supports 4K video recording at 60fps.',
      category: '📷 Camera'
    },
    {
      question: 'What is the charging speed of OnePlus 14 Pro?',
      answer: 'The OnePlus 14 Pro features 100W Warp Charge fast charging that can charge the 5400mAh battery from 0 to 100% in just 30 minutes. It\'s one of the fastest charging smartphones available.',
      category: '⚡ Charging'
    },
    {
      question: 'Is OnePlus 14 Pro good for gaming?',
      answer: 'Yes, the OnePlus 14 Pro is excellent for gaming with its Snapdragon 8 Gen 4 processor and 12GB RAM. The 6.82-inch Fluid AMOLED display with 120Hz refresh rate provides incredibly smooth gaming performance.',
      category: '🎮 Gaming'
    },
    {
      question: 'What are the main features of OnePlus 14 Pro?',
      answer: 'Key features include the Snapdragon 8 Gen 4 processor, 100W fast charging, 5400mAh battery, 6.82-inch Fluid AMOLED display, Hasselblad camera tuning, and OxygenOS 15 based on Android 15.',
      category: '✨ Features'
    }
  ],
  'xiaomi-15-pro': [
    {
      question: 'What is the price of Xiaomi 15 Pro?',
      answer: 'The Xiaomi 15 Pro is priced at $799 in 2026. It comes in 256GB and 512GB storage variants with 12GB RAM. Available in Black, Silver, and Green colors.',
      category: '💰 Price'
    },
    {
      question: 'What is the camera quality of Xiaomi 15 Pro?',
      answer: 'The Xiaomi 15 Pro features a triple 50MP camera system with 50MP Wide, 50MP Ultra Wide, and 50MP Telephoto lenses with Leica tuning. It offers OIS, Night Mode, and Pro Mode. Supports 4K video recording at 60fps.',
      category: '📷 Camera'
    },
    {
      question: 'What is the battery life of Xiaomi 15 Pro?',
      answer: 'The Xiaomi 15 Pro has a 5300mAh battery with 120W HyperCharge fast charging. It can charge from 0 to 100% in just 25 minutes. The battery easily lasts a full day of heavy use.',
      category: '🔋 Battery'
    },
    {
      question: 'Is Xiaomi 15 Pro good value for money?',
      answer: 'Yes, the Xiaomi 15 Pro offers excellent value for money with its Leica-tuned camera system, Snapdragon 8 Gen 4 processor, 120W fast charging, and 6.73-inch AMOLED display at a competitive price.',
      category: '⭐ Value'
    },
    {
      question: 'What are the main features of Xiaomi 15 Pro?',
      answer: 'Key features include the Snapdragon 8 Gen 4 processor, Leica-tuned 50MP camera system, 120W fast charging, 5300mAh battery, 6.73-inch AMOLED display, and MIUI 15 based on Android 15.',
      category: '✨ Features'
    }
  ],
  'nothing-phone-3': [
    {
      question: 'What is the price of Nothing Phone (3)?',
      answer: 'The Nothing Phone (3) is priced at $699 in 2026. It comes in 128GB and 256GB storage variants with 8GB RAM. Available in Black and White colors with transparent design.',
      category: '💰 Price'
    },
    {
      question: 'What is the Glyph Interface on Nothing Phone (3)?',
      answer: 'The Nothing Phone (3) features the iconic Glyph Interface with customizable LED lights on the back. It provides visual notifications for calls, messages, and app alerts. You can customize the light patterns for different contacts and apps.',
      category: '💡 Glyph'
    },
    {
      question: 'What is the camera quality of Nothing Phone (3)?',
      answer: 'The Nothing Phone (3) features a dual 50MP camera system with 50MP Wide and 50MP Ultra Wide lenses. It offers Night Mode, Portrait Mode, and Pro Mode. Supports 4K video recording at 60fps.',
      category: '📷 Camera'
    },
    {
      question: 'What is the battery life of Nothing Phone (3)?',
      answer: 'The Nothing Phone (3) has a 5000mAh battery with 45W fast charging. It offers excellent battery life that easily lasts a full day of use. The unique Glyph Interface is power-efficient and doesn\'t drain the battery.',
      category: '🔋 Battery'
    },
    {
      question: 'What are the main features of Nothing Phone (3)?',
      answer: 'Key features include the unique transparent design, Glyph Interface with customizable LED lights, Snapdragon 8 Gen 4 processor, 50MP dual camera system, 5000mAh battery, and clean Nothing OS based on Android 15.',
      category: '✨ Features'
    }
  ]
};

// ============================================
// UNIQUE PROS & CONS FOR EACH PHONE
// ============================================

const PHONE_PROS_CONS: Record<string, { pros: string[]; cons: string[] }> = {
  'apple-iphone-16-pro-max': {
    pros: [
      'Best-in-class 48MP triple camera system with 5x optical zoom',
      'A18 Pro chip delivers exceptional performance',
      '6.9-inch Super Retina XDR display with 120Hz ProMotion',
      'Premium titanium design with USB-C port',
      'Excellent battery life with optimization',
      'Long-term software support (6+ years)',
      'Advanced AI features for photography',
      'Ecosystem integration with Apple devices'
    ],
    cons: [
      'Very expensive at $1,199+',
      'Heavy weight at 226g',
      'Slow 25W charging compared to Android competitors',
      'No charger included in the box',
      'Limited customization options',
      'No expandable storage'
    ]
  },
  'samsung-galaxy-s26-ultra': {
    pros: [
      'Revolutionary 200MP camera with 100x zoom',
      'Snapdragon 8 Gen 4 processor for top performance',
      'S Pen support included in the box',
      '6.9-inch Dynamic AMOLED 2X display',
      '5000mAh battery with 45W charging',
      'Premium design with Armor Aluminum',
      'One UI 6 with advanced features',
      'Excellent multitasking capabilities'
    ],
    cons: [
      'Extremely expensive at $1,299+',
      'Bulkier design at 233g',
      'One UI learning curve',
      'Pre-installed bloatware',
      'Slow 45W charging for the battery size',
      'No charger included'
    ]
  },
  'google-pixel-10-pro': {
    pros: [
      'Best AI features on any smartphone',
      'Tensor G4 chip with advanced processing',
      '50MP camera with Super Res Zoom',
      'Pure Android experience with no bloatware',
      '7 years of software updates',
      '6.7-inch OLED display with 120Hz',
      'Great value at $999',
      'Magic Eraser and Real Tone technology'
    ],
    cons: [
      'Average battery life',
      'No dedicated telephoto zoom',
      'Slow 30W charging',
      'Limited availability in some regions',
      'No official water resistance rating',
      'No expandable storage'
    ]
  },
  'oneplus-14-pro': {
    pros: [
      'Lightning-fast 100W Warp Charge',
      'Snapdragon 8 Gen 4 processor',
      '6.82-inch Fluid AMOLED display',
      '5400mAh battery with long life',
      'Hasselblad camera tuning',
      'Clean OxygenOS 15 experience',
      'Great value at $899',
      'Premium build quality'
    ],
    cons: [
      'No wireless charging',
      'Average camera compared to competitors',
      'No official IP rating',
      'Limited availability of accessories',
      'No headphone jack',
      'No expandable storage'
    ]
  },
  'xiaomi-15-pro': {
    pros: [
      'Excellent Leica-tuned camera',
      '120W HyperCharge fast charging',
      'Snapdragon 8 Gen 4 processor',
      '6.73-inch AMOLED display',
      'Great value at $799',
      '5300mAh battery with long life',
      'Premium design with Gorilla Glass',
      'AI-enhanced photography features'
    ],
    cons: [
      'MIUI software with bloatware',
      'No official IP68 rating',
      'Limited availability in some markets',
      'Ads in the UI',
      'No wireless charging',
      'No expandable storage'
    ]
  },
  'nothing-phone-3': {
    pros: [
      'Unique transparent design',
      'Iconic Glyph Interface with customization',
      'Clean Nothing OS experience',
      'Snapdragon 8 Gen 4 processor',
      'Great value at $699',
      '5000mAh battery with 45W charging',
      'Dual 50MP camera system',
      'Distinctive LED notifications'
    ],
    cons: [
      'Average camera quality',
      'No headphone jack',
      'No official water resistance',
      'Limited accessory ecosystem',
      'Glyph Interface is a novelty feature',
      'No expandable storage'
    ]
  }
};

// ============================================
// COMPLETE PHONES DATA WITH ALL FIELDS
// ============================================

export const STATIC_PHONES: PhoneData[] = [
  // ==========================================
  // 1. APPLE IPHONE 16 PRO MAX
  // ==========================================
  {
    _id: '1',
    slug: 'apple-iphone-16-pro-max',
    brand: 'Apple',
    model: 'iPhone 16 Pro Max',
    year: '2026',
    price: '1199',
    image: '/images/phones/apple/iphone-16-pro-max.jpg',
    gallery: [
      '/images/phones/apple/iphone-16-pro-max-1.jpg',
      '/images/phones/apple/iphone-16-pro-max-2.jpg',
      '/images/phones/apple/iphone-16-pro-max-3.jpg'
    ],
    rating: 4.9,
    reviewCount: 256,
    category: ['flagship', 'premium', 'apple'],
    
    // Display
    display: 'large',
    displaySize: '6.9"',
    displayResolution: '1440 x 3200 pixels',
    displayType: 'Super Retina XDR OLED',
    displayProtection: 'Ceramic Shield Glass',
    displayFeatures: ['120Hz ProMotion', 'HDR10+', 'Always-On Display', '2000 nits brightness'],
    refreshRate: '120Hz',
    brightness: '2000 nits',
    aspectRatio: '20:9',
    pixelDensity: '460 ppi',
    screenToBodyRatio: '92.5%',
    
    // Camera
    camera: 'triple',
    cameraDetails: '48MP Wide + 48MP Ultra Wide + 48MP Telephoto',
    cameraFeatures: ['5x Optical Zoom', 'Sensor-Shift OIS', 'Night Mode', 'Deep Fusion', 'Smart HDR 5', 'ProRAW', 'ProRes'],
    videoRecording: '8K@30fps, 4K@120fps, 1080p@240fps',
    frontCamera: '12MP TrueDepth',
    frontCameraFeatures: ['Portrait Mode', 'Night Mode', '4K Video', 'Face ID'],
    cameraSensor: 'Sony IMX803',
    aperture: 'f/1.78 Wide, f/2.2 Ultra Wide, f/2.8 Telephoto',
    opticalZoom: '5x',
    digitalZoom: '25x',
    
    // Battery
    battery: '4685',
    batteryType: 'Lithium-Ion',
    charging: '25W',
    chargingType: 'USB-C PD Fast Charging',
    wirelessCharging: '15W MagSafe',
    reverseCharging: 'No',
    batteryLife: 'Up to 20 hours video playback',
    chargingTime: '50% in 30 minutes',
    
    // Performance
    chipset: 'apple',
    chipsetDetails: 'A18 Pro',
    cpu: 'Hexa-core',
    cpuCores: '6-core',
    cpuFrequency: '2x3.78GHz + 4x2.11GHz',
    gpu: 'Apple GPU',
    gpuDetails: '6-core',
    ram: '8',
    ramType: 'LPDDR5X',
    storage: '256',
    storageType: 'NVMe',
    expandableStorage: 'No',
    antutuScore: '1,850,000',
    geekbenchScore: '8,500 (Single), 24,000 (Multi)',
    
    // OS & Software
    os: 'ios',
    osVersion: 'iOS 18',
    uiSkin: 'iOS',
    updatePolicy: '6 years',
    securityUpdates: '6 years',
    
    // Physical
    weight: '226g',
    dimensions: '160.9 x 77.8 x 8.3 mm',
    colors: ['Black Titanium', 'White Titanium', 'Natural Titanium', 'Desert Titanium'],
    materials: ['Titanium Frame', 'Ceramic Shield Glass', 'Matte Glass Back'],
    waterResistance: 'IP68',
    dustResistance: 'IP68',
    
    // Connectivity
    sim: 'Dual eSIM',
    network: '5G, 4G LTE, 3G, 2G',
    wifi: 'Wi-Fi 6E (802.11ax)',
    bluetooth: '5.3',
    nfc: 'Yes (Apple Pay)',
    usb: 'USB-C 3.2 Gen 2',
    gps: 'GPS, GLONASS, Galileo, QZSS',
    sensors: ['Face ID', 'LiDAR Scanner', 'Barometer', 'Gyroscope', 'Accelerometer', 'Proximity', 'Ambient Light'],
    
    // Audio
    speakers: 'Dual Stereo Speakers',
    audioJack: 'No',
    audioFeatures: ['Spatial Audio', 'Dolby Atmos', 'Lossless Audio'],
    
    // Security
    fingerprint: 'No',
    faceUnlock: 'Yes (Face ID)',
    securityFeatures: ['Face ID', 'Secure Enclave', 'Privacy Features'],
    
    // Content
    highlights: ['A18 Pro Chip', '6.9" Super Retina XDR', 'Titanium Design', 'USB-C', 'Camera Control'],
    pros: PHONE_PROS_CONS['apple-iphone-16-pro-max'].pros,
    cons: PHONE_PROS_CONS['apple-iphone-16-pro-max'].cons,
    author: '7pexel Team',
    authorAvatar: '/images/authors/7pexel-team.jpg',
    authorBio: 'Tech enthusiast and smartphone reviewer with 10+ years of experience.',
    authorSocial: ['https://twitter.com/7pexel', 'https://linkedin.com/company/7pexel'],
    date: '2026-01-15',
    readTime: '8 min read',
    customStyles: '',
    contentHtml: `<h2>Complete Review of iPhone 16 Pro Max (2026)</h2><p>The iPhone 16 Pro Max represents Apple's latest flagship smartphone, featuring the powerful A18 Pro chip and an advanced camera system.</p><h3>Key Features</h3><ul><li>A18 Pro chip with 6-core CPU and 6-core GPU</li><li>6.9-inch Super Retina XDR display with 120Hz ProMotion</li><li>Triple 48MP camera system with 5x optical zoom</li><li>4685mAh battery with 25W wired charging</li><li>Titanium design with USB-C port</li></ul>`,
    contentPlain: 'Complete review of iPhone 16 Pro Max (2026) with A18 Pro chip, 6.9-inch Super Retina XDR display, triple 48MP camera system, and titanium design.',
    isFeatured: true,
    isTrending: true,
    isNew: true,
    isBestSeller: true,
    published: true,
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
    seo: {} as SEOData
  },

  // ==========================================
  // 2. SAMSUNG GALAXY S26 ULTRA
  // ==========================================
  {
    _id: '2',
    slug: 'samsung-galaxy-s26-ultra',
    brand: 'Samsung',
    model: 'Galaxy S26 Ultra',
    year: '2026',
    price: '1299',
    image: '/images/phones/samsung/galaxy-s26-ultra.jpg',
    gallery: [
      '/images/phones/samsung/galaxy-s26-ultra-1.jpg',
      '/images/phones/samsung/galaxy-s26-ultra-2.jpg',
      '/images/phones/samsung/galaxy-s26-ultra-3.jpg'
    ],
    rating: 4.8,
    reviewCount: 189,
    category: ['flagship', 'premium', 'samsung'],
    
    // Display
    display: 'large',
    displaySize: '6.9"',
    displayResolution: '1440 x 3200 pixels',
    displayType: 'Dynamic AMOLED 2X',
    displayProtection: 'Gorilla Glass Victus 2',
    displayFeatures: ['120Hz Refresh Rate', 'HDR10+', 'Always-On Display', '2600 nits brightness', 'Vision Booster'],
    refreshRate: '120Hz',
    brightness: '2600 nits',
    aspectRatio: '20:9',
    pixelDensity: '498 ppi',
    screenToBodyRatio: '91.8%',
    
    // Camera
    camera: 'quad',
    cameraDetails: '200MP Wide + 50MP Ultra Wide + 50MP Telephoto + 10MP Periscope',
    cameraFeatures: ['100x Space Zoom', 'Dual OIS', 'Night Mode', '8K Video', 'Pro Mode', 'Expert RAW'],
    videoRecording: '8K@30fps, 4K@120fps, 1080p@960fps',
    frontCamera: '12MP',
    frontCameraFeatures: ['4K Video', 'Portrait Mode', 'Night Mode', 'HDR10+ Video'],
    cameraSensor: 'Samsung ISOCELL HP2',
    aperture: 'f/1.7 Wide, f/2.2 Ultra Wide, f/2.4 Telephoto, f/4.9 Periscope',
    opticalZoom: '10x',
    digitalZoom: '100x',
    
    // Battery
    battery: '5000',
    batteryType: 'Lithium-Ion',
    charging: '45W',
    chargingType: 'USB-C PD Fast Charging',
    wirelessCharging: '15W Fast Wireless',
    reverseCharging: '4.5W Wireless PowerShare',
    batteryLife: 'Up to 22 hours video playback',
    chargingTime: '70% in 30 minutes',
    
    // Performance
    chipset: 'snapdragon',
    chipsetDetails: 'Snapdragon 8 Gen 4',
    cpu: 'Octa-core',
    cpuCores: '8-core',
    cpuFrequency: '1x3.36GHz + 5x2.8GHz + 2x2.0GHz',
    gpu: 'Adreno 750',
    gpuDetails: 'Adreno 750',
    ram: '12',
    ramType: 'LPDDR5X',
    storage: '256',
    storageType: 'UFS 4.0',
    expandableStorage: 'No',
    antutuScore: '1,920,000',
    geekbenchScore: '7,800 (Single), 22,500 (Multi)',
    
    // OS & Software
    os: 'android',
    osVersion: 'Android 15',
    uiSkin: 'One UI 6',
    updatePolicy: '4 years',
    securityUpdates: '5 years',
    
    // Physical
    weight: '233g',
    dimensions: '162.6 x 78.1 x 8.9 mm',
    colors: ['Phantom Black', 'Cream', 'Green', 'Lavender'],
    materials: ['Armor Aluminum Frame', 'Gorilla Glass Victus 2', 'Glass Back'],
    waterResistance: 'IP68',
    dustResistance: 'IP68',
    
    // Connectivity
    sim: 'Dual SIM (Nano-SIM + eSIM)',
    network: '5G, 4G LTE, 3G, 2G',
    wifi: 'Wi-Fi 7 (802.11be)',
    bluetooth: '5.4',
    nfc: 'Yes (Samsung Pay)',
    usb: 'USB-C 3.2 Gen 2',
    gps: 'GPS, GLONASS, Galileo, BeiDou',
    sensors: ['Ultrasonic Fingerprint', 'Barometer', 'Gyroscope', 'Accelerometer', 'Proximity', 'Compass', 'Heart Rate'],
    
    // Audio
    speakers: 'Dual Stereo Speakers (AKG Tuned)',
    audioJack: 'No',
    audioFeatures: ['Dolby Atmos', '360 Audio', 'Hi-Res Audio'],
    
    // Security
    fingerprint: 'Ultrasonic In-Display',
    faceUnlock: 'Yes (2D Face Unlock)',
    securityFeatures: ['Samsung Knox', 'Secure Folder', 'Biometric Authentication'],
    
    // Content
    highlights: ['200MP Camera', 'S Pen Support', '5000mAh Battery', 'Snapdragon 8 Gen 4', '100x Zoom'],
    pros: PHONE_PROS_CONS['samsung-galaxy-s26-ultra'].pros,
    cons: PHONE_PROS_CONS['samsung-galaxy-s26-ultra'].cons,
    author: '7pexel Team',
    authorAvatar: '/images/authors/7pexel-team.jpg',
    authorBio: 'Tech reviewer specializing in Android devices and smartphone photography.',
    authorSocial: ['https://twitter.com/7pexel', 'https://youtube.com/7pexel'],
    date: '2026-01-12',
    readTime: '9 min read',
    customStyles: '',
    contentHtml: `<h2>Galaxy S26 Ultra Review - The Ultimate Android Flagship</h2><p>The Samsung Galaxy S26 Ultra pushes the boundaries of smartphone photography with its revolutionary 200MP camera system and 100x Space Zoom.</p><h3>Main Features</h3><ul><li>200MP Quad Camera System with 100x Space Zoom</li><li>Snapdragon 8 Gen 4 processor</li><li>6.9-inch Dynamic AMOLED 2X display</li><li>5000mAh battery with 45W fast charging</li><li>S Pen support built-in</li></ul>`,
    contentPlain: 'Galaxy S26 Ultra review with 200MP quad camera system, 100x Space Zoom, Snapdragon 8 Gen 4 processor, and S Pen support.',
    isFeatured: true,
    isTrending: true,
    isNew: true,
    isBestSeller: false,
    published: true,
    createdAt: '2026-01-12T10:00:00Z',
    updatedAt: '2026-01-12T10:00:00Z',
    seo: {} as SEOData
  },

  // ==========================================
  // 3. GOOGLE PIXEL 10 PRO
  // ==========================================
  {
    _id: '3',
    slug: 'google-pixel-10-pro',
    brand: 'Google',
    model: 'Pixel 10 Pro',
    year: '2026',
    price: '999',
    image: '/images/phones/google/pixel-10-pro.jpg',
    gallery: [
      '/images/phones/google/pixel-10-pro-1.jpg',
      '/images/phones/google/pixel-10-pro-2.jpg'
    ],
    rating: 4.7,
    reviewCount: 143,
    category: ['flagship', 'google'],
    
    // Display
    display: 'large',
    displaySize: '6.7"',
    displayResolution: '1344 x 2992 pixels',
    displayType: 'LTPO OLED',
    displayProtection: 'Gorilla Glass Victus 2',
    displayFeatures: ['120Hz Refresh Rate', 'HDR10+', 'Always-On Display', '1600 nits brightness'],
    refreshRate: '120Hz',
    brightness: '1600 nits',
    aspectRatio: '20:9',
    pixelDensity: '489 ppi',
    screenToBodyRatio: '89.5%',
    
    // Camera
    camera: 'triple',
    cameraDetails: '50MP Wide + 48MP Ultra Wide + 48MP Telephoto',
    cameraFeatures: ['Super Res Zoom', 'OIS', 'Night Sight', 'Magic Eraser', 'Real Tone', 'Astrophotography'],
    videoRecording: '4K@60fps, 1080p@240fps',
    frontCamera: '10.5MP',
    frontCameraFeatures: ['4K Video', 'Portrait Mode', 'Night Mode', 'Face Unlock'],
    cameraSensor: 'Samsung GN1',
    aperture: 'f/1.85 Wide, f/2.2 Ultra Wide, f/2.0 Telephoto',
    opticalZoom: '5x',
    digitalZoom: '30x',
    
    // Battery
    battery: '5050',
    batteryType: 'Lithium-Ion',
    charging: '30W',
    chargingType: 'USB-C PD Fast Charging',
    wirelessCharging: '23W Qi Wireless',
    reverseCharging: '12W Battery Share',
    batteryLife: 'Up to 18 hours video playback',
    chargingTime: '50% in 30 minutes',
    
    // Performance
    chipset: 'tensor',
    chipsetDetails: 'Tensor G4',
    cpu: 'Octa-core',
    cpuCores: '9-core',
    cpuFrequency: '1x3.0GHz + 4x2.4GHz + 3x1.8GHz',
    gpu: 'Mali-G710',
    gpuDetails: 'Mali-G710 MP7',
    ram: '12',
    ramType: 'LPDDR5',
    storage: '128',
    storageType: 'UFS 3.1',
    expandableStorage: 'No',
    antutuScore: '1,200,000',
    geekbenchScore: '6,200 (Single), 18,000 (Multi)',
    
    // OS & Software
    os: 'android',
    osVersion: 'Android 15',
    uiSkin: 'Pixel UI',
    updatePolicy: '7 years',
    securityUpdates: '7 years',
    
    // Physical
    weight: '210g',
    dimensions: '162.6 x 75.8 x 8.8 mm',
    colors: ['Obsidian', 'Porcelain', 'Hazel', 'Rose'],
    materials: ['Aluminum Frame', 'Gorilla Glass Victus 2', 'Glass Back'],
    waterResistance: 'IP68',
    dustResistance: 'IP68',
    
    // Connectivity
    sim: 'Dual SIM (Nano-SIM + eSIM)',
    network: '5G, 4G LTE, 3G, 2G',
    wifi: 'Wi-Fi 6E (802.11ax)',
    bluetooth: '5.3',
    nfc: 'Yes (Google Pay)',
    usb: 'USB-C 3.2 Gen 2',
    gps: 'GPS, GLONASS, Galileo, BeiDou',
    sensors: ['Under-Display Fingerprint', 'Barometer', 'Gyroscope', 'Accelerometer', 'Proximity', 'Compass'],
    
    // Audio
    speakers: 'Dual Stereo Speakers',
    audioJack: 'No',
    audioFeatures: ['Spatial Audio', 'Noise Cancellation'],
    
    // Security
    fingerprint: 'Under-Display Optical',
    faceUnlock: 'Yes (Face Unlock)',
    securityFeatures: ['Titan M2 Chip', 'Face Unlock', 'Fingerprint Sensor'],
    
    // Content
    highlights: ['Tensor G4 Chip', 'AI Features', 'Great Camera', 'Pure Android', '7 Years Updates'],
    pros: PHONE_PROS_CONS['google-pixel-10-pro'].pros,
    cons: PHONE_PROS_CONS['google-pixel-10-pro'].cons,
    author: '7pexel Team',
    authorAvatar: '/images/authors/7pexel-team.jpg',
    authorBio: 'Tech writer focusing on AI-powered devices and Google ecosystem.',
    authorSocial: ['https://twitter.com/7pexel'],
    date: '2026-01-10',
    readTime: '7 min read',
    customStyles: '',
    contentHtml: `<h2>Google Pixel 10 Pro - The AI-Powered Smartphone</h2><p>The Pixel 10 Pro showcases Google's AI capabilities with the new Tensor G4 chip and advanced camera features.</p><h3>Key Highlights</h3><ul><li>Tensor G4 with enhanced AI processing</li><li>Triple 50MP camera system with Super Res Zoom</li><li>6.7-inch OLED display with 120Hz refresh rate</li><li>5050mAh battery with 30W fast charging</li><li>Pure Android experience with 7 years of updates</li></ul>`,
    contentPlain: 'Google Pixel 10 Pro review with Tensor G4 chip, triple 50MP camera system, 6.7-inch OLED display, and 7 years of software updates.',
    isFeatured: true,
    isTrending: false,
    isNew: false,
    isBestSeller: false,
    published: true,
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
    seo: {} as SEOData
  },

  // ==========================================
  // 4. ONEPLUS 14 PRO
  // ==========================================
  {
    _id: '4',
    slug: 'oneplus-14-pro',
    brand: 'OnePlus',
    model: '14 Pro',
    year: '2026',
    price: '899',
    image: '/images/phones/oneplus/14-pro.jpg',
    gallery: [
      '/images/phones/oneplus/14-pro-1.jpg',
      '/images/phones/oneplus/14-pro-2.jpg'
    ],
    rating: 4.6,
    reviewCount: 112,
    category: ['flagship', 'oneplus'],
    
    // Display
    display: 'large',
    displaySize: '6.82"',
    displayResolution: '1440 x 3216 pixels',
    displayType: 'LTPO AMOLED',
    displayProtection: 'Gorilla Glass Victus 2',
    displayFeatures: ['120Hz Refresh Rate', 'HDR10+', '1800 nits brightness'],
    refreshRate: '120Hz',
    brightness: '1800 nits',
    aspectRatio: '20:9',
    pixelDensity: '514 ppi',
    screenToBodyRatio: '93.2%',
    
    // Camera
    camera: 'triple',
    cameraDetails: '50MP Wide + 50MP Ultra Wide + 64MP Telephoto',
    cameraFeatures: ['Hasselblad Tuning', 'OIS', 'Night Mode', 'Pro Mode', 'RAW Capture'],
    videoRecording: '4K@60fps, 1080p@240fps',
    frontCamera: '32MP',
    frontCameraFeatures: ['4K Video', 'Portrait Mode', 'Night Mode'],
    cameraSensor: 'Sony IMX789',
    aperture: 'f/1.8 Wide, f/2.2 Ultra Wide, f/2.0 Telephoto',
    opticalZoom: '3.3x',
    digitalZoom: '20x',
    
    // Battery
    battery: '5400',
    batteryType: 'Lithium-Ion',
    charging: '100W',
    chargingType: 'Warp Charge Fast Charging',
    wirelessCharging: 'No',
    reverseCharging: 'No',
    batteryLife: 'Up to 21 hours video playback',
    chargingTime: '0-100% in 30 minutes',
    
    // Performance
    chipset: 'snapdragon',
    chipsetDetails: 'Snapdragon 8 Gen 4',
    cpu: 'Octa-core',
    cpuCores: '8-core',
    cpuFrequency: '1x3.36GHz + 5x2.8GHz + 2x2.0GHz',
    gpu: 'Adreno 750',
    gpuDetails: 'Adreno 750',
    ram: '12',
    ramType: 'LPDDR5X',
    storage: '256',
    storageType: 'UFS 4.0',
    expandableStorage: 'No',
    antutuScore: '1,850,000',
    geekbenchScore: '7,500 (Single), 21,000 (Multi)',
    
    // OS & Software
    os: 'android',
    osVersion: 'Android 15',
    uiSkin: 'OxygenOS 15',
    updatePolicy: '4 years',
    securityUpdates: '5 years',
    
    // Physical
    weight: '220g',
    dimensions: '164.3 x 76.3 x 8.9 mm',
    colors: ['Black', 'White', 'Green'],
    materials: ['Aluminum Frame', 'Gorilla Glass Victus 2', 'Glass Back'],
    waterResistance: 'IP65',
    dustResistance: 'IP65',
    
    // Connectivity
    sim: 'Dual Nano-SIM',
    network: '5G, 4G LTE, 3G, 2G',
    wifi: 'Wi-Fi 7 (802.11be)',
    bluetooth: '5.4',
    nfc: 'Yes (Google Pay)',
    usb: 'USB-C 3.2 Gen 2',
    gps: 'GPS, GLONASS, Galileo, BeiDou',
    sensors: ['Under-Display Fingerprint', 'Gyroscope', 'Accelerometer', 'Proximity', 'Compass'],
    
    // Audio
    speakers: 'Dual Stereo Speakers',
    audioJack: 'No',
    audioFeatures: ['Dolby Atmos', 'Noise Cancellation'],
    
    // Security
    fingerprint: 'Under-Display Optical',
    faceUnlock: 'Yes (2D Face Unlock)',
    securityFeatures: ['Fingerprint Sensor', 'Face Unlock'],
    
    // Content
    highlights: ['Snapdragon 8 Gen 4', '100W Fast Charging', 'Great Display', 'Hasselblad Camera'],
    pros: PHONE_PROS_CONS['oneplus-14-pro'].pros,
    cons: PHONE_PROS_CONS['oneplus-14-pro'].cons,
    author: '7pexel Team',
    authorAvatar: '/images/authors/7pexel-team.jpg',
    authorBio: 'Tech reviewer specializing in performance and charging technology.',
    authorSocial: ['https://twitter.com/7pexel'],
    date: '2026-01-08',
    readTime: '6 min read',
    customStyles: '',
    contentHtml: `<h2>OnePlus 14 Pro Review - Speed Meets Innovation</h2><p>The OnePlus 14 Pro combines Snapdragon 8 Gen 4 performance with lightning-fast 100W charging technology.</p><h3>Main Features</h3><ul><li>Snapdragon 8 Gen 4 processor</li><li>Triple 50MP Hasselblad camera system</li><li>6.82-inch Fluid AMOLED display</li><li>5400mAh battery with 100W fast charging</li><li>OxygenOS 15 with smooth performance</li></ul>`,
    contentPlain: 'OnePlus 14 Pro review with Snapdragon 8 Gen 4, 100W fast charging, triple 50MP Hasselblad camera, and Fluid AMOLED display.',
    isFeatured: false,
    isTrending: true,
    isNew: false,
    isBestSeller: false,
    published: true,
    createdAt: '2026-01-08T10:00:00Z',
    updatedAt: '2026-01-08T10:00:00Z',
    seo: {} as SEOData
  },

  // ==========================================
  // 5. XIAOMI 15 PRO
  // ==========================================
  {
    _id: '5',
    slug: 'xiaomi-15-pro',
    brand: 'Xiaomi',
    model: '15 Pro',
    year: '2026',
    price: '799',
    image: '/images/phones/xiaomi/15-pro.jpg',
    gallery: [
      '/images/phones/xiaomi/15-pro-1.jpg',
      '/images/phones/xiaomi/15-pro-2.jpg'
    ],
    rating: 4.5,
    reviewCount: 98,
    category: ['flagship', 'xiaomi'],
    
    // Display
    display: 'large',
    displaySize: '6.73"',
    displayResolution: '1440 x 3200 pixels',
    displayType: 'LTPO AMOLED',
    displayProtection: 'Gorilla Glass Victus 2',
    displayFeatures: ['120Hz Refresh Rate', 'HDR10+', '1800 nits brightness', 'Dolby Vision'],
    refreshRate: '120Hz',
    brightness: '1800 nits',
    aspectRatio: '20:9',
    pixelDensity: '522 ppi',
    screenToBodyRatio: '92.8%',
    
    // Camera
    camera: 'triple',
    cameraDetails: '50MP Wide + 50MP Ultra Wide + 50MP Telephoto',
    cameraFeatures: ['Leica Tuning', 'OIS', 'Night Mode', 'Pro Mode', 'Ultra RAW'],
    videoRecording: '8K@24fps, 4K@60fps, 1080p@240fps',
    frontCamera: '32MP',
    frontCameraFeatures: ['4K Video', 'Portrait Mode', 'Night Mode'],
    cameraSensor: 'Sony IMX989',
    aperture: 'f/1.9 Wide, f/2.2 Ultra Wide, f/2.0 Telephoto',
    opticalZoom: '3x',
    digitalZoom: '50x',
    
    // Battery
    battery: '5300',
    batteryType: 'Lithium-Ion',
    charging: '120W',
    chargingType: 'HyperCharge Fast Charging',
    wirelessCharging: '50W Fast Wireless',
    reverseCharging: '10W Reverse Wireless',
    batteryLife: 'Up to 19 hours video playback',
    chargingTime: '0-100% in 25 minutes',
    
    // Performance
    chipset: 'snapdragon',
    chipsetDetails: 'Snapdragon 8 Gen 4',
    cpu: 'Octa-core',
    cpuCores: '8-core',
    cpuFrequency: '1x3.36GHz + 5x2.8GHz + 2x2.0GHz',
    gpu: 'Adreno 750',
    gpuDetails: 'Adreno 750',
    ram: '12',
    ramType: 'LPDDR5X',
    storage: '256',
    storageType: 'UFS 4.0',
    expandableStorage: 'No',
    antutuScore: '1,880,000',
    geekbenchScore: '7,600 (Single), 22,000 (Multi)',
    
    // OS & Software
    os: 'android',
    osVersion: 'Android 15',
    uiSkin: 'MIUI 15',
    updatePolicy: '3 years',
    securityUpdates: '4 years',
    
    // Physical
    weight: '215g',
    dimensions: '163.8 x 76.3 x 8.9 mm',
    colors: ['Black', 'Silver', 'Green'],
    materials: ['Aluminum Frame', 'Gorilla Glass Victus 2', 'Glass Back'],
    waterResistance: 'IP68',
    dustResistance: 'IP68',
    
    // Connectivity
    sim: 'Dual Nano-SIM',
    network: '5G, 4G LTE, 3G, 2G',
    wifi: 'Wi-Fi 7 (802.11be)',
    bluetooth: '5.4',
    nfc: 'Yes (Google Pay)',
    usb: 'USB-C 3.2 Gen 2',
    gps: 'GPS, GLONASS, Galileo, BeiDou',
    sensors: ['Under-Display Fingerprint', 'Barometer', 'Gyroscope', 'Accelerometer', 'Proximity', 'Compass'],
    
    // Audio
    speakers: 'Dual Stereo Speakers',
    audioJack: 'No',
    audioFeatures: ['Dolby Atmos', 'Hi-Res Audio', 'Noise Cancellation'],
    
    // Security
    fingerprint: 'Under-Display Optical',
    faceUnlock: 'Yes (2D Face Unlock)',
    securityFeatures: ['Fingerprint Sensor', 'Face Unlock', 'Privacy Features'],
    
    // Content
    highlights: ['Leica Camera', 'Great Display', '120W Fast Charging', 'Good Value'],
    pros: PHONE_PROS_CONS['xiaomi-15-pro'].pros,
    cons: PHONE_PROS_CONS['xiaomi-15-pro'].cons,
    author: '7pexel Team',
    authorAvatar: '/images/authors/7pexel-team.jpg',
    authorBio: 'Tech writer focusing on value-for-money devices and camera technology.',
    authorSocial: ['https://twitter.com/7pexel'],
    date: '2026-01-05',
    readTime: '6 min read',
    customStyles: '',
    contentHtml: `<h2>Xiaomi 15 Pro - Flagship Killer with Leica Camera</h2><p>The Xiaomi 15 Pro delivers flagship-level performance and Leica-tuned camera at a competitive price.</p><h3>Key Features</h3><ul><li>Snapdragon 8 Gen 4 processor</li><li>Leica-tuned 50MP triple camera system</li><li>6.73-inch AMOLED display with 120Hz</li><li>5300mAh battery with 120W fast charging</li><li>MIUI 15 with advanced features</li></ul>`,
    contentPlain: 'Xiaomi 15 Pro review with Leica-tuned 50MP triple camera, Snapdragon 8 Gen 4, 120W fast charging, and AMOLED display.',
    isFeatured: false,
    isTrending: false,
    isNew: false,
    isBestSeller: false,
    published: true,
    createdAt: '2026-01-05T10:00:00Z',
    updatedAt: '2026-01-05T10:00:00Z',
    seo: {} as SEOData
  },

  // ==========================================
  // 6. NOTHING PHONE (3)
  // ==========================================
  {
    _id: '6',
    slug: 'nothing-phone-3',
    brand: 'Nothing',
    model: 'Phone (3)',
    year: '2026',
    price: '699',
    image: '/images/phones/nothing/phone-3.jpg',
    gallery: [
      '/images/phones/nothing/phone-3-1.jpg'
    ],
    rating: 4.4,
    reviewCount: 76,
    category: ['mid-range', 'nothing'],
    
    // Display
    display: 'medium',
    displaySize: '6.7"',
    displayResolution: '1080 x 2400 pixels',
    displayType: 'LTPO OLED',
    displayProtection: 'Gorilla Glass 5',
    displayFeatures: ['120Hz Refresh Rate', 'HDR10+', '1000 nits brightness'],
    refreshRate: '120Hz',
    brightness: '1000 nits',
    aspectRatio: '20:9',
    pixelDensity: '395 ppi',
    screenToBodyRatio: '87.5%',
    
    // Camera
    camera: 'dual',
    cameraDetails: '50MP Wide + 50MP Ultra Wide',
    cameraFeatures: ['Night Mode', 'Portrait Mode', 'Pro Mode', 'Action Mode'],
    videoRecording: '4K@60fps, 1080p@240fps',
    frontCamera: '32MP',
    frontCameraFeatures: ['1080p Video', 'Portrait Mode', 'Night Mode'],
    cameraSensor: 'Sony IMX890',
    aperture: 'f/1.88 Wide, f/2.2 Ultra Wide',
    opticalZoom: 'No',
    digitalZoom: '10x',
    
    // Battery
    battery: '5000',
    batteryType: 'Lithium-Ion',
    charging: '45W',
    chargingType: 'USB-C PD Fast Charging',
    wirelessCharging: '15W Qi Wireless',
    reverseCharging: '5W Reverse Wireless',
    batteryLife: 'Up to 18 hours video playback',
    chargingTime: '50% in 30 minutes',
    
    // Performance
    chipset: 'snapdragon',
    chipsetDetails: 'Snapdragon 8 Gen 4',
    cpu: 'Octa-core',
    cpuCores: '8-core',
    cpuFrequency: '1x3.0GHz + 4x2.4GHz + 3x1.8GHz',
    gpu: 'Adreno 750',
    gpuDetails: 'Adreno 750',
    ram: '8',
    ramType: 'LPDDR5',
    storage: '128',
    storageType: 'UFS 3.1',
    expandableStorage: 'No',
    antutuScore: '1,200,000',
    geekbenchScore: '6,000 (Single), 17,000 (Multi)',
    
    // OS & Software
    os: 'android',
    osVersion: 'Android 15',
    uiSkin: 'Nothing OS',
    updatePolicy: '3 years',
    securityUpdates: '4 years',
    
    // Physical
    weight: '200g',
    dimensions: '162.8 x 76.4 x 8.6 mm',
    colors: ['Black', 'White'],
    materials: ['Aluminum Frame', 'Gorilla Glass 5', 'Transparent Glass Back'],
    waterResistance: 'No',
    dustResistance: 'No',
    
    // Connectivity
    sim: 'Dual Nano-SIM',
    network: '5G, 4G LTE, 3G, 2G',
    wifi: 'Wi-Fi 6E (802.11ax)',
    bluetooth: '5.3',
    nfc: 'Yes (Google Pay)',
    usb: 'USB-C 3.2 Gen 2',
    gps: 'GPS, GLONASS, Galileo, BeiDou',
    sensors: ['Under-Display Fingerprint', 'Gyroscope', 'Accelerometer', 'Proximity', 'Compass'],
    
    // Audio
    speakers: 'Dual Stereo Speakers',
    audioJack: 'No',
    audioFeatures: ['Nothing Audio', 'Noise Cancellation'],
    
    // Security
    fingerprint: 'Under-Display Optical',
    faceUnlock: 'Yes (2D Face Unlock)',
    securityFeatures: ['Fingerprint Sensor', 'Face Unlock'],
    
    // Content
    highlights: ['Glyph Interface', 'Clean Design', 'Good Value', 'Transparent Back'],
    pros: PHONE_PROS_CONS['nothing-phone-3'].pros,
    cons: PHONE_PROS_CONS['nothing-phone-3'].cons,
    author: '7pexel Team',
    authorAvatar: '/images/authors/7pexel-team.jpg',
    authorBio: 'Tech reviewer focusing on design and user experience.',
    authorSocial: ['https://twitter.com/7pexel'],
    date: '2026-01-03',
    readTime: '5 min read',
    customStyles: '',
    contentHtml: `<h2>Nothing Phone (3) - The Most Transparent Phone</h2><p>The Nothing Phone (3) stands out with its unique transparent design and Glyph interface system.</p><h3>Main Features</h3><ul><li>Snapdragon 8 Gen 4 processor</li><li>Dual 50MP camera system</li><li>6.7-inch OLED display with 120Hz</li><li>5000mAh battery with 45W charging</li><li>Glyph Interface with customizable lights</li></ul>`,
    contentPlain: 'Nothing Phone (3) review with unique transparent design, Glyph interface, Snapdragon 8 Gen 4, and 50MP dual camera.',
    isFeatured: false,
    isTrending: false,
    isNew: false,
    isBestSeller: false,
    published: true,
    createdAt: '2026-01-03T10:00:00Z',
    updatedAt: '2026-01-03T10:00:00Z',
    seo: {} as SEOData
  }
];

// ============================================
// GENERATE SEO DATA FOR EACH PHONE
// ============================================

function generateSEOData(phone: PhoneData): SEOData {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
  const fullName = `${phone.brand} ${phone.model}`;
  const pageUrl = `${siteUrl}/phones/finder/${phone.slug}`;
  
  return {
    metaTitle: `${fullName} (${phone.year}) – Complete Review, Specs, Camera & Price | 7pexel`,
    metaDescription: `Read our expert ${fullName} review. ${phone.ram}GB RAM, ${phone.storage}GB storage, ${phone.battery}mAh battery, ${phone.chipset} chipset. ${phone.cameraDetails} camera. Find out if ${fullName} is the best smartphone of ${phone.year}.`,
    metaKeywords: [
      `${fullName} review`,
      `${fullName} specs`,
      `${phone.brand} ${phone.model}`,
      `${phone.model} ${phone.year}`,
      `${phone.brand} smartphone`,
      `${phone.model} price`,
      `${phone.model} camera`,
      `${phone.model} battery`
    ],
    metaRobots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    canonicalUrl: pageUrl,
    ogTitle: `${fullName} (${phone.year}) – In-Depth Review & Complete Specifications | 7pexel`,
    ogDescription: `Read our expert review of the ${fullName}. Discover its powerful ${phone.cameraDetails} camera, impressive ${phone.battery}mAh battery life, ${phone.chipset} performance, and stunning ${phone.displaySize} display. Is it worth buying in ${phone.year}?`,
    ogImage: phone.image,
    ogUrl: pageUrl,
    ogType: 'article',
    ogSiteName: '7pexel',
    ogLocale: 'en_US',
    twitterCard: 'summary_large_image',
    twitterTitle: `${fullName} Review – Full Specs, Camera & Performance (${phone.year})`,
    twitterDescription: `Is ${fullName} worth buying? Read our full review with camera test, battery life, gaming performance, and benchmark scores.`,
    twitterImage: phone.image,
    twitterSite: '@7pexel',
    twitterCreator: '@7pexel',
    faqSchema: PHONE_FAQS[phone.slug] || PHONE_FAQS['apple-iphone-16-pro-max'],
    reviewSchema: [
      {
        author: '7pexel Team',
        rating: phone.rating || 4.5,
        reviewBody: `The ${fullName} is an impressive smartphone that delivers exceptional performance. The ${phone.cameraDetails} camera produces stunning photos, and the ${phone.battery}mAh battery ensures all-day usage. Highly recommended for anyone looking for a great smartphone.`,
        date: new Date().toISOString()
      }
    ],
    breadcrumbList: [
      { name: 'Home', url: siteUrl, position: 1 },
      { name: 'Phones', url: `${siteUrl}/phones`, position: 2 },
      { name: 'Phone Finder', url: `${siteUrl}/phones/finder`, position: 3 },
      { name: fullName, url: pageUrl, position: 4 }
    ]
  };
}

// Generate SEO for all phones
STATIC_PHONES.forEach(phone => {
  phone.seo = generateSEOData(phone);
});

// ============================================
// EXPORT HELPERS
// ============================================

export const getStaticBrands = (): string[] => {
  const brands = STATIC_PHONES.map(phone => phone.brand);
  return [...new Set(brands)].sort();
};

export const getStaticCategories = (): string[] => {
  const categories = STATIC_PHONES.flatMap(phone => phone.category || []);
  return [...new Set(categories)].sort();
};

export const getStaticYears = (): string[] => {
  const years = STATIC_PHONES.map(phone => phone.year);
  return [...new Set(years)].sort((a, b) => parseInt(b) - parseInt(a));
};

export const getStaticPhoneBySlug = (slug: string): PhoneData | null => {
  return STATIC_PHONES.find(phone => phone.slug === slug) || null;
};

export const getStaticRelatedPhones = (slug: string, limit: number = 4): PhoneData[] => {
  const phone = getStaticPhoneBySlug(slug);
  if (!phone) return [];
  
  return STATIC_PHONES
    .filter(p => p.slug !== slug && (p.brand === phone.brand || p.category?.some(c => phone.category?.includes(c))))
    .slice(0, limit);
};

export const getStaticAllPhones = (options: {
  search?: string;
  brand?: string;
  category?: string;
  year?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  trending?: boolean;
  page?: number;
  limit?: number;
  sort?: 'rating' | 'year' | 'price' | 'newest';
}) => {
  let result = [...STATIC_PHONES];

  if (options.search) {
    const searchLower = options.search.toLowerCase();
    result = result.filter(p => 
      p.brand.toLowerCase().includes(searchLower) ||
      p.model.toLowerCase().includes(searchLower) ||
      p.chipset?.toLowerCase().includes(searchLower) ||
      p.category?.some(c => c.toLowerCase().includes(searchLower))
    );
  }

  if (options.brand) {
    result = result.filter(p => p.brand.toLowerCase() === options.brand?.toLowerCase());
  }

  if (options.category) {
    result = result.filter(p => p.category?.some(c => c.toLowerCase() === options.category?.toLowerCase()));
  }

  if (options.year) {
    result = result.filter(p => p.year === options.year);
  }

  if (options.minPrice) {
    result = result.filter(p => parseInt(p.price) >= options.minPrice!);
  }

  if (options.maxPrice) {
    result = result.filter(p => parseInt(p.price) <= options.maxPrice!);
  }

  if (options.featured) {
    result = result.filter(p => p.isFeatured);
  }

  if (options.trending) {
    result = result.filter(p => p.isTrending);
  }

  if (options.sort) {
    switch (options.sort) {
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'year':
        result.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        break;
      case 'price':
        result.sort((a, b) => parseInt(a.price) - parseInt(b.price));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
  }

  const total = result.length;
  const page = options.page || 1;
  const limit = options.limit || 100;
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: result.slice(start, end),
    total,
    totalPages: Math.ceil(total / limit)
  };
};

export const getStaticPhoneStats = () => {
  const brands = getStaticBrands();
  const categories = getStaticCategories();
  
  return {
    total: STATIC_PHONES.length,
    published: STATIC_PHONES.filter(p => p.published).length,
    featured: STATIC_PHONES.filter(p => p.isFeatured).length,
    trending: STATIC_PHONES.filter(p => p.isTrending).length,
    brands: brands.length,
    categories
  };
};