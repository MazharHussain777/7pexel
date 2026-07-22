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
    chipset: { type: String },
    cpu: { type: String },
    gpu: { type: String },
    neuralEngine: { type: String },
    ram: { type: String },
    ramType: { type: String },
    storage: { type: String },
    storageType: { type: String },
    camera: { type: String },
    cameraWide: { type: String },
    cameraUltraWide: { type: String },
    cameraTelephoto: { type: String },
    cameraFeatures: { type: String },
    videoRecording: { type: String },
    frontCamera: { type: String },
    frontFeatures: { type: String },
    dimensions: { type: String },
    weight: { type: String },
    build: { type: String },
    colors: { type: [String] },
    colorFinish: { type: String },
    waterResistance: { type: String },
    battery: { type: String },
    batteryType: { type: String },
    wiredCharging: { type: String },
    wirelessCharging: { type: String },
    batteryTechnology: { type: String },
    videoPlayback: { type: String },
    audioPlayback: { type: String },
    standbyTime: { type: String },
    os: { type: String },
    osUpdates: { type: String },
    audio: { type: String },
    headphoneJack: { type: String },
    audioRecording: { type: String },
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
    security: { type: String },
    sensors: { type: String },
    applePay: { type: String },
    magSafe: { type: String },
    emergencySOS: { type: String },
    boxContents: { type: String },
    models: { type: [String] },
    pricing: { type: [String] },
  },
  
  benchmarks: {
    antutu: { type: Number },
    geekbench6Single: { type: Number },
    geekbench6Multi: { type: Number },
    wildLifeExtreme: { type: String },
  },
  
  stats: {
    views: { type: String },
    favorites: { type: String },
    shares: { type: String },
    reviews: { type: String },
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
PhoneSchema.index({ slug: 1 });
PhoneSchema.index({ brand: 1 });
PhoneSchema.index({ year: -1 });
PhoneSchema.index({ rating: -1 });
PhoneSchema.index({ tags: 1 });
PhoneSchema.index({ isFlagship: 1 });
PhoneSchema.index({ isEditorChoice: 1 });

export const Phone = mongoose.models.Phone || mongoose.model("Phone", PhoneSchema);