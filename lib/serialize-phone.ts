// lib/serialize-phone.ts
export function serializePhone(phone: any) {
  if (!phone) return null;
  
  // Get specs object (or empty object if not exists)
  const specs = phone.specs || {};
  
  return {
    // Root level fields
    _id: phone._id?.toString() || phone._id,
    slug: phone.slug || '',
    name: phone.name || '',
    brand: phone.brand || '',
    model: phone.name || '',
    year: String(phone.year || '2026'),
    price: specs.price || '0',
    image: phone.image || '/images/placeholder-phone.jpg',
    gallery: phone.gallery || [],
    rating: phone.rating || 0,
    reviewCount: phone.reviewCount || 0,
    category: phone.tags || [],
    isFlagship: phone.isFlagship || false,
    isEditorChoice: phone.isEditorChoice || false,
    tags: phone.tags || [],
    
    // ===== DISPLAY =====
    display: specs.display || 'medium',
    displaySize: specs.display || '6.1"',
    displayResolution: specs.resolution || '1080 x 2400 pixels',
    displayType: specs.displayType || 'AMOLED',
    displayProtection: specs.protection || 'Gorilla Glass',
    displayFeatures: specs.display ? [specs.display] : ['120Hz Refresh Rate', 'HDR10+'],
    refreshRate: specs.refreshRate || '120Hz',
    brightness: specs.brightness || '1000 nits',
    aspectRatio: '20:9',
    pixelDensity: specs.pixelDensity || '400 ppi',
    screenToBodyRatio: specs.screenToBodyRatio || '90%',
    
    // ===== CAMERA =====
    camera: specs.camera || 'triple',
    cameraDetails: specs.camera || '50MP Main Camera',
    cameraFeatures: specs.cameraFeatures ? specs.cameraFeatures.split(', ') : ['Night Mode', 'Portrait Mode', 'Pro Mode'],
    videoRecording: specs.videoRecording || '4K@60fps',
    frontCamera: specs.frontCamera || '32MP',
    frontCameraFeatures: specs.frontFeatures ? specs.frontFeatures.split(', ') : ['4K Video', 'Portrait Mode'],
    cameraSensor: specs.cameraSensor || 'Sony IMX',
    aperture: specs.aperture || 'f/1.8',
    opticalZoom: specs.opticalZoom || '3x',
    digitalZoom: specs.digitalZoom || '30x',
    
    // ===== BATTERY =====
    battery: specs.battery ? specs.battery.replace('mAh', '') : '4500',
    batteryType: specs.batteryType || 'Lithium-Ion',
    charging: specs.wiredCharging ? specs.wiredCharging.replace('W', '') : '25',
    chargingType: specs.chargingType || 'Fast Charging',
    wirelessCharging: specs.wirelessCharging || '15W',
    reverseCharging: specs.reverseCharging || 'No',
    batteryLife: specs.videoPlayback || 'Up to 18 hours',
    chargingTime: specs.wiredChargingTime || '50% in 30 minutes',
    
    // ===== PERFORMANCE =====
    chipset: specs.chipset || 'snapdragon',
    chipsetDetails: specs.chipset || 'Snapdragon 8 Gen',
    cpu: specs.cpu || 'Octa-core',
    cpuCores: specs.cpu ? '8-core' : '8-core',
    cpuFrequency: specs.cpu || '2.8GHz',
    gpu: specs.gpu || 'Adreno',
    gpuDetails: specs.gpu || 'Adreno 750',
    ram: specs.ram ? specs.ram.replace('GB', '') : '8',
    ramType: specs.ramType || 'LPDDR5X',
    storage: specs.storage ? specs.storage.replace('GB', '') : '128',
    storageType: specs.storageType || 'UFS 3.1',
    expandableStorage: specs.expandableStorage || 'No',
    antutuScore: specs.chipset ? '1,850,000' : '1,200,000',
    geekbenchScore: specs.chipset ? '8,500 (Single), 24,000 (Multi)' : '6,000 (Single), 18,000 (Multi)',
    
    // ===== OS & SOFTWARE =====
    os: specs.os || 'android',
    osVersion: specs.os || 'Android 15',
    uiSkin: specs.ui || 'Stock Android',
    updatePolicy: specs.osUpdates || '3 years',
    securityUpdates: specs.securityUpdates || '4 years',
    
    // ===== PHYSICAL =====
    weight: specs.weight || '200g',
    dimensions: specs.dimensions || '160 x 75 x 8 mm',
    colors: specs.colors || ['Black', 'White'],
    materials: specs.build ? specs.build.split(', ') : ['Glass', 'Aluminum'],
    waterResistance: specs.waterResistance || 'IP68',
    dustResistance: specs.dustResistance || 'IP68',
    
    // ===== CONNECTIVITY =====
    sim: specs.sim || 'Dual Nano-SIM',
    network: specs.networkBands || '5G, 4G LTE',
    wifi: specs.wifi || 'Wi-Fi 6E',
    bluetooth: specs.bluetooth || '5.3',
    nfc: specs.nfc || 'Yes',
    usb: specs.usb || 'USB-C 3.2',
    gps: specs.gps || 'GPS, GLONASS',
    sensors: specs.sensors ? specs.sensors.split(', ') : ['Fingerprint', 'Accelerometer', 'Gyroscope'],
    
    // ===== AUDIO =====
    speakers: specs.audio || 'Dual Stereo Speakers',
    audioJack: specs.headphoneJack || 'No',
    audioFeatures: specs.audioRecording ? specs.audioRecording.split(', ') : ['Dolby Atmos'],
    
    // ===== SECURITY =====
    fingerprint: specs.security || 'Under-Display',
    faceUnlock: specs.security ? 'Yes' : 'Yes',
    securityFeatures: specs.security ? specs.security.split(', ') : ['Fingerprint Sensor', 'Face Unlock'],
    
    // ===== CONTENT =====
    highlights: specs.highlights || ['Great Camera', 'Long Battery Life'],
    pros: specs.pros || ['Good performance', 'Great display'],
    cons: specs.cons || ['No wireless charging', 'No headphone jack'],
    author: specs.author || '7pexel Team',
    authorAvatar: specs.authorAvatar || '/images/authors/7pexel-team.jpg',
    authorBio: specs.authorBio || 'Tech enthusiast and smartphone reviewer.',
    authorSocial: specs.authorSocial || ['https://twitter.com/7pexel'],
    date: specs.date || new Date().toISOString(),
    readTime: specs.readTime || '5 min read',
    customStyles: '',
    contentHtml: specs.contentHtml || '',
    contentPlain: specs.contentPlain || '',
    
    // ===== FLAGS =====
    isFeatured: specs.isFeatured || false,
    isTrending: specs.isTrending || false,
    isNew: specs.isNew || false,
    isBestSeller: specs.isBestSeller || false,
    published: specs.published !== false,
    
    // ===== SEO =====
    seo: specs.seo || {},
    
    // ===== METADATA =====
    createdAt: phone.createdAt || new Date().toISOString(),
    updatedAt: phone.updatedAt || new Date().toISOString(),
  };
}