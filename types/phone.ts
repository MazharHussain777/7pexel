// types/phone.ts
export interface Phone {
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