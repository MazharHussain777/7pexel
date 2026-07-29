// types/phone.ts
export interface Phone {
  _id: string;
  slug: string;
  name: string;
  brand: string;
  brandLogo: string;
  year: number;
  rating: number;
  reviewCount: number;
  isFlagship: boolean;
  isEditorChoice: boolean;
  tags: string[];
  image: string;
  specs: {
    // 📱 Display
    display: string;
    displayType: string;
    resolution: string;
    pixelDensity: string;
    screenToBodyRatio: string;
    refreshRate: string;
    brightness: string;
    protection: string;
    hdrSupport: string;
    alwaysOnDisplay: string;
    
    // ⚡ Performance
    chipset: string;
    cpu: string;
    gpu: string;
    neuralEngine: string;
    ram: string;
    ramType: string;
    storage: string;
    storageType: string;
    
    // 📷 Main Camera
    camera: string;
    cameraWide: string;
    cameraUltraWide: string;
    cameraTelephoto: string;
    cameraFeatures: string;
    videoRecording: string;
    
    // 🤳 Selfie Camera
    frontCamera: string;
    frontFeatures: string;
    
    // 🏗️ Build & Design
    dimensions: string;
    weight: string;
    build: string;
    colors: string[];
    colorFinish: string;
    waterResistance: string;
    
    // 🔋 Battery
    battery: string;
    batteryType: string;
    wiredCharging: string;
    wirelessCharging: string;
    batteryTechnology: string;
    videoPlayback: string;
    audioPlayback: string;
    standbyTime: string;
    
    // 💻 Software
    os: string;
    osUpdates: string;
    
    // 🔊 Audio
    audio: string;
    headphoneJack: string;
    audioRecording: string;
    
    // 📡 Connectivity
    sim: string;
    networkBands: string;
    wifi: string;
    bluetooth: string;
    nfc: string;
    usb: string;
    gps: string;
    ultraWideband: string;
    satelliteSOS: string;
    crashDetection: string;
    threadSupport: string;
    
    // 🔒 Security
    security: string;
    sensors: string;
    
    // ✨ Additional Features
    applePay: string;
    magSafe: string;
    emergencySOS: string;
    boxContents: string;
    
    // 💰 Pricing & Models
    models: string[];
    pricing: string[];
  };
  
  benchmarks: {
    antutu: number;
    geekbench6Single: number;
    geekbench6Multi: number;
    wildLifeExtreme: string;
  };
  
  stats: {
    views: string;
    favorites: string;
    shares: string;
    reviews: string;
  };
}

// Premium Color Themes - Crimson, Green, Orange, Blue, Maroon, Tomato, Gold
export const PHONE_COLOR_THEMES = [
  // 1. Crimson Red - Bold, vibrant red
  { 
    id: 'crimson', 
    name: 'Crimson Red', 
    primary: '#DC143C', 
    secondary: '#FF1744', 
    light: '#FFF0F0', 
    accent: '#FF6B81', 
    dark: '#8B0000',
    gradient: 'from-[#DC143C] to-[#FF1744]',
    badge: 'text-white bg-[#DC143C]',
    shadow: 'rgba(220,20,60,0.5)',
    glow: 'rgba(255,23,68,0.4)',
    bg: 'bg-[#DC143C]',
    text: 'text-[#DC143C]',
    border: 'border-[#DC143C]/30'
  },
  // 2. Emerald Green - Fresh, vibrant green
  { 
    id: 'emerald', 
    name: 'Emerald Green', 
    primary: '#00C853', 
    secondary: '#00E676', 
    light: '#F0FFF5', 
    accent: '#4CAF50', 
    dark: '#008B2E',
    gradient: 'from-[#00C853] to-[#00E676]',
    badge: 'text-white bg-[#00C853]',
    shadow: 'rgba(0,200,83,0.5)',
    glow: 'rgba(0,230,118,0.4)',
    bg: 'bg-[#00C853]',
    text: 'text-[#00C853]',
    border: 'border-[#00C853]/30'
  },
  // 3. Burnt Orange - Warm, vibrant orange
  { 
    id: 'burnt-orange', 
    name: 'Burnt Orange', 
    primary: '#FF6D00', 
    secondary: '#FF9100', 
    light: '#FFF5F0', 
    accent: '#FFAB40', 
    dark: '#CC5500',
    gradient: 'from-[#FF6D00] to-[#FF9100]',
    badge: 'text-white bg-[#FF6D00]',
    shadow: 'rgba(255,109,0,0.5)',
    glow: 'rgba(255,145,0,0.4)',
    bg: 'bg-[#FF6D00]',
    text: 'text-[#FF6D00]',
    border: 'border-[#FF6D00]/30'
  },
  // 4. Royal Blue - Deep, vibrant blue
  { 
    id: 'royal-blue', 
    name: 'Royal Blue', 
    primary: '#0066FF', 
    secondary: '#0088FF', 
    light: '#F0F5FF', 
    accent: '#4DA6FF', 
    dark: '#0033AA',
    gradient: 'from-[#0066FF] to-[#0088FF]',
    badge: 'text-white bg-[#0066FF]',
    shadow: 'rgba(0,102,255,0.5)',
    glow: 'rgba(0,136,255,0.4)',
    bg: 'bg-[#0066FF]',
    text: 'text-[#0066FF]',
    border: 'border-[#0066FF]/30'
  },
  // 5. Maroon - Rich, deep maroon
  { 
    id: 'maroon', 
    name: 'Maroon', 
    primary: '#800020', 
    secondary: '#A8002A', 
    light: '#FFF0F2', 
    accent: '#D44A6A', 
    dark: '#4A0012',
    gradient: 'from-[#800020] to-[#A8002A]',
    badge: 'text-white bg-[#800020]',
    shadow: 'rgba(128,0,32,0.5)',
    glow: 'rgba(168,0,42,0.4)',
    bg: 'bg-[#800020]',
    text: 'text-[#800020]',
    border: 'border-[#800020]/30'
  },
  // 6. Tomato - Bright, juicy tomato red
  { 
    id: 'tomato', 
    name: 'Tomato Red', 
    primary: '#FF6347', 
    secondary: '#FF7A5A', 
    light: '#FFF5F0', 
    accent: '#FF9A7A', 
    dark: '#CC3A2A',
    gradient: 'from-[#FF6347] to-[#FF7A5A]',
    badge: 'text-white bg-[#FF6347]',
    shadow: 'rgba(255,99,71,0.5)',
    glow: 'rgba(255,122,90,0.4)',
    bg: 'bg-[#FF6347]',
    text: 'text-[#FF6347]',
    border: 'border-[#FF6347]/30'
  },
  // 7. Golden Yellow - Bright, warm gold
  { 
    id: 'golden', 
    name: 'Golden Yellow', 
    primary: '#FFC107', 
    secondary: '#FFD54F', 
    light: '#FFFDF0', 
    accent: '#FFE082', 
    dark: '#F57F17',
    gradient: 'from-[#FFC107] to-[#FFD54F]',
    badge: 'text-black bg-[#FFC107]',
    shadow: 'rgba(255,193,7,0.5)',
    glow: 'rgba(255,213,79,0.4)',
    bg: 'bg-[#FFC107]',
    text: 'text-[#FFC107]',
    border: 'border-[#FFC107]/30'
  },
  // 8. Crimson Dark - Darker crimson
  { 
    id: 'crimson-dark', 
    name: 'Crimson Dark', 
    primary: '#8B0000', 
    secondary: '#B22222', 
    light: '#FFF0F0', 
    accent: '#DC143C', 
    dark: '#4A0000',
    gradient: 'from-[#8B0000] to-[#B22222]',
    badge: 'text-white bg-[#8B0000]',
    shadow: 'rgba(139,0,0,0.5)',
    glow: 'rgba(178,34,34,0.4)',
    bg: 'bg-[#8B0000]',
    text: 'text-[#8B0000]',
    border: 'border-[#8B0000]/30'
  },
  // 9. Forest Green - Deep forest green
  { 
    id: 'forest-green', 
    name: 'Forest Green', 
    primary: '#0D5C3E', 
    secondary: '#1A7A52', 
    light: '#F0FAF5', 
    accent: '#3AA87A', 
    dark: '#062A1A',
    gradient: 'from-[#0D5C3E] to-[#1A7A52]',
    badge: 'text-white bg-[#0D5C3E]',
    shadow: 'rgba(13,92,62,0.5)',
    glow: 'rgba(26,122,82,0.4)',
    bg: 'bg-[#0D5C3E]',
    text: 'text-[#0D5C3E]',
    border: 'border-[#0D5C3E]/30'
  },
  // 10. Tangerine - Bright tangerine orange
  { 
    id: 'tangerine', 
    name: 'Tangerine', 
    primary: '#FF8C00', 
    secondary: '#FFA500', 
    light: '#FFF8F0', 
    accent: '#FFC04A', 
    dark: '#CC6600',
    gradient: 'from-[#FF8C00] to-[#FFA500]',
    badge: 'text-white bg-[#FF8C00]',
    shadow: 'rgba(255,140,0,0.5)',
    glow: 'rgba(255,165,0,0.4)',
    bg: 'bg-[#FF8C00]',
    text: 'text-[#FF8C00]',
    border: 'border-[#FF8C00]/30'
  },
  // 11. Navy Blue - Deep navy blue
  { 
    id: 'navy-blue', 
    name: 'Navy Blue', 
    primary: '#0A2463', 
    secondary: '#1A3A8A', 
    light: '#F0F4FF', 
    accent: '#4A7AD4', 
    dark: '#041A3A',
    gradient: 'from-[#0A2463] to-[#1A3A8A]',
    badge: 'text-white bg-[#0A2463]',
    shadow: 'rgba(10,36,99,0.5)',
    glow: 'rgba(26,58,138,0.4)',
    bg: 'bg-[#0A2463]',
    text: 'text-[#0A2463]',
    border: 'border-[#0A2463]/30'
  },
];

// Function to get theme based on slug
export const getPhoneTheme = (slug: string): typeof PHONE_COLOR_THEMES[0] => {
  if (!slug) return PHONE_COLOR_THEMES[0];
  // Use slug to deterministically pick a theme
  const index = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % PHONE_COLOR_THEMES.length;
  return PHONE_COLOR_THEMES[index];
};

// Get theme by id
export const getPhoneThemeById = (id: string): typeof PHONE_COLOR_THEMES[0] => {
  const theme = PHONE_COLOR_THEMES.find(t => t.id === id);
  return theme || PHONE_COLOR_THEMES[0];
};

// Get random theme (for fallback)
export const getRandomTheme = (): typeof PHONE_COLOR_THEMES[0] => {
  const index = Math.floor(Math.random() * PHONE_COLOR_THEMES.length);
  return PHONE_COLOR_THEMES[index];
};