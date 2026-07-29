// lib/models/Phone.ts
import mongoose from "mongoose";

const PhoneSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  brandLogo: { type: String },
  year: { type: Number, required: true },
  rating: { type: Number, default: 4.0 },
  reviewCount: { type: Number, default: 0 },
  isFlagship: { type: Boolean, default: false },
  isEditorChoice: { type: Boolean, default: false },
  tags: { type: [String], default: [] },
  image: { type: String },
  
  specs: {
    // ========== DISPLAY (15 fields) ==========
    display: { type: String },
    displayType: { type: String },
    resolution: { type: String },
    pixelDensity: { type: String },
    screenToBodyRatio: { type: String },
    refreshRate: { type: String },
    brightness: { type: String },
    protection: { type: String },
    hdrSupport: { type: String },
    alwaysOnDisplay: { type: String },
    displayColorDepth: { type: String, default: '1B colors' },
    displayAspectRatio: { type: String, default: '20:9' },
    displayColorGamut: { type: String, default: 'DCI-P3 100%' },
    
    // ========== PERFORMANCE (18 fields) ==========
    chipset: { type: String },
    cpu: { type: String },
    gpu: { type: String },
    neuralEngine: { type: String },
    ram: { type: String },
    ramType: { type: String },
    storage: { type: String },
    storageType: { type: String },
    cpuArchitecture: { type: String, default: 'ARMv9' },
    cpuCache: { type: String, default: '8MB L3' },
    gpuCores: { type: String, default: '6-core' },
    gpuClockSpeed: { type: String, default: '900MHz' },
    npuPerformance: { type: String, default: '45 TOPS' },
    manufacturingProcess: { type: String, default: '4nm' },
    ramFrequency: { type: String, default: '8533MHz' },
    storageSpeed: { type: String, default: '4200MB/s' },
    expandableStorage: { type: String, default: 'No' },
    
    // ========== MAIN CAMERA (20 fields) ==========
    camera: { type: String },
    cameraWide: { type: String },
    cameraUltraWide: { type: String },
    cameraTelephoto: { type: String },
    cameraFeatures: { type: String },
    videoRecording: { type: String },
    wideSensorSize: { type: String, default: '1/1.3"' },
    widePixelSize: { type: String, default: '1.2µm' },
    wideAperture: { type: String, default: 'f/1.8' },
    ultraWideFOV: { type: String, default: '120°' },
    ultraWideAperture: { type: String, default: 'f/2.0' },
    telephotoZoom: { type: String, default: '5x' },
    telephotoAperture: { type: String, default: 'f/2.4' },
    periscopeZoom: { type: String, default: 'No' },
    laserAF: { type: String, default: 'Yes' },
    ois: { type: String, default: 'Yes' },
    slowMotionVideo: { type: String, default: '720p@960fps' },
    videoStabilization: { type: String, default: 'OIS + EIS' },
    flashType: { type: String, default: 'Dual-LED' },
    hdrVideo: { type: String, default: 'Yes' },
    
    // ========== FRONT CAMERA (8 fields) ==========
    frontCamera: { type: String },
    frontFeatures: { type: String },
    frontPixelSize: { type: String, default: '0.8µm' },
    frontSensor: { type: String, default: 'Sony IMX709' },
    frontVideo: { type: String, default: '4K@60fps' },
    frontFlash: { type: String, default: 'Yes (screen flash)' },
    
    // ========== BATTERY & CHARGING (15 fields) ==========
    battery: { type: String },
    batteryType: { type: String },
    wiredCharging: { type: String },
    wirelessCharging: { type: String },
    batteryTechnology: { type: String },
    videoPlayback: { type: String },
    audioPlayback: { type: String },
    standbyTime: { type: String },
    batteryVoltage: { type: String, default: '3.87V' },
    batteryCells: { type: String, default: 'Single-cell' },
    wiredChargingTime: { type: String, default: '0-100% in 45 min' },
    wirelessChargingTime: { type: String, default: '0-100% in 90 min' },
    reverseCharging: { type: String, default: '10W' },
    chargingType: { type: String, default: 'USB-C PD 3.0' },
    batteryHealth: { type: String, default: '80% after 800 cycles' },
    
    // ========== BUILD & DESIGN (12 fields) ==========
    dimensions: { type: String },
    weight: { type: String },
    build: { type: String },
    colors: { type: [String] },
    colorFinish: { type: String },
    waterResistance: { type: String },
    height: { type: String, default: '162.8 mm' },
    width: { type: String, default: '76.6 mm' },
    thickness: { type: String, default: '8.2 mm' },
    frameMaterial: { type: String, default: 'Titanium' },
    backMaterial: { type: String, default: 'Glass' },
    dustResistance: { type: String, default: 'IP68' },
    dropProtection: { type: String, default: 'Gorilla Glass' },
    
    // ========== SOFTWARE (10 fields) ==========
    os: { type: String },
    osUpdates: { type: String },
    osVersion: { type: String, default: '15.0' },
    securityUpdates: { type: String, default: '5 years' },
    ui: { type: String, default: 'One UI 6' },
    uiVersion: { type: String, default: '6.1' },
    googlePlayServices: { type: String, default: 'Yes' },
    customization: { type: String, default: 'Yes' },
    bloatware: { type: String, default: 'Minimal' },
    updateFrequency: { type: String, default: 'Monthly' },
    
    // ========== AUDIO (10 fields) ==========
    audio: { type: String },
    headphoneJack: { type: String },
    audioRecording: { type: String },
    speakerOutput: { type: String, default: 'Stereo 24-bit/96kHz' },
    audioCodec: { type: String, default: 'Dolby Atmos' },
    microphones: { type: String, default: '3 microphones' },
    noiseCancellation: { type: String, default: 'Yes' },
    audioZoom: { type: String, default: 'Yes' },
    hiResAudio: { type: String, default: 'Yes' },
    bluetoothAudio: { type: String, default: 'LDAC' },
    
    // ========== CONNECTIVITY (20 fields) ==========
    sim: { type: String },
    networkBands: { type: String },
    wifi: { type: String },
    bluetooth: { type: String },
    nfc: { type: String },
    usb: { type: String },
    gps: { type: String },
    ultraWideband: { type: String },
    satelliteSOS: { type: String },
    crashDetection: { type: String },
    threadSupport: { type: String },
    simSlots: { type: String, default: 'Dual' },
    networkTechnology: { type: String, default: '5G' },
    bands5G: { type: String, default: 'n1,n2,n3,n5,n7,n8,n12,n20' },
    bands4G: { type: String, default: 'B1,B2,B3,B4,B5,B7,B8' },
    wifiBands: { type: String, default: '2.4GHz/5GHz/6GHz' },
    wifiFeatures: { type: String, default: 'MIMO/MU-MIMO' },
    bluetoothProfiles: { type: String, default: 'A2DP, LE, aptX, LDAC' },
    usbFeatures: { type: String, default: 'OTG/DisplayPort' },
    networkSpeed: { type: String, default: '10Gbps' },
    carrierAggregation: { type: String, default: 'Yes' },
    
    // ========== SECURITY & SENSORS (14 fields) ==========
    security: { type: String },
    sensors: { type: String },
    fingerprintType: { type: String, default: 'Ultrasonic' },
    fingerprintLocation: { type: String, default: 'In-display' },
    faceUnlockType: { type: String, default: '3D Face ID' },
    irisScanner: { type: String, default: 'No' },
    accelerometer: { type: String, default: 'Yes' },
    gyroscope: { type: String, default: 'Yes' },
    proximitySensor: { type: String, default: 'Yes' },
    barometer: { type: String, default: 'Yes' },
    compass: { type: String, default: 'Yes' },
    ambientLightSensor: { type: String, default: 'Yes' },
    hallSensor: { type: String, default: 'Yes' },
    heartRateSensor: { type: String, default: 'Yes' },
    spO2Sensor: { type: String, default: 'Yes' },
    temperatureSensor: { type: String, default: 'Yes' },
    
    // ========== ADDITIONAL FEATURES (12 fields) ==========
    applePay: { type: String },
    magSafe: { type: String },
    emergencySOS: { type: String },
    boxContents: { type: String },
    models: { type: [String] },
    pricing: { type: [String] },
    googlePay: { type: String, default: 'Yes' },
    quickStartGuide: { type: String, default: 'Yes' },
    simEjectorTool: { type: String, default: 'Yes' },
    warrantyCard: { type: String, default: 'Yes' },
    stylusSupport: { type: String, default: 'No' },
    accessoriesIncluded: { type: String, default: 'Yes' },
    
    // ========== PRICING & AVAILABILITY (10 fields) ==========
    modelVariations: { type: [String], default: ['256GB', '512GB', '1TB'] },
    price256GB: { type: String, default: '$1,299' },
    price512GB: { type: String, default: '$1,499' },
    price1TB: { type: String, default: '$1,799' },
    releaseDate: { type: String, default: 'January 2026' },
    availability: { type: String, default: 'In Stock' },
    regions: { type: String, default: 'Global' },
    carriers: { type: String, default: 'AT&T, Verizon, T-Mobile' },
  },
  
  benchmarks: {
    antutu: { type: Number },
    geekbench6Single: { type: Number },
    geekbench6Multi: { type: Number },
    wildLifeExtreme: { type: String },
    antutuV10: { type: Number, default: 0 },
    geekbench5Single: { type: Number, default: 0 },
    geekbench5Multi: { type: Number, default: 0 },
    gfxBenchManh1440p: { type: Number, default: 0 },
  },
  
  stats: {
    views: { type: String },
    shares: { type: String },
    reviews: { type: String },
  },
}, {
  timestamps: true,
});

// Indexes
PhoneSchema.index({ slug: 1 });
PhoneSchema.index({ brand: 1 });
PhoneSchema.index({ year: -1 });
PhoneSchema.index({ 'specs.thickness': 1 });
PhoneSchema.index({ 'specs.height': 1 });
PhoneSchema.index({ 'specs.width': 1 });
PhoneSchema.index({ 'specs.weight': 1 });

export const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);