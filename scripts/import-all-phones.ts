// scripts/import-all-phones.ts
import { createClient } from '@supabase/supabase-js';
import { STATIC_PHONES } from '@/app/phones/finder/data/static-phone-data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Map static data to Supabase schema
function mapPhoneData(phone: any) {
  const { _id, ...data } = phone;
  
  return {
    slug: data.slug,
    brand: data.brand,
    model: data.model,
    year: data.year,
    price: data.price,
    image: data.image,
    gallery: data.gallery || [],
    rating: data.rating || 0,
    review_count: data.reviewCount || 0,
    category: data.category || [],
    display: data.display || 'medium',
    display_size: data.displaySize,
    display_resolution: data.displayResolution,
    display_type: data.displayType,
    display_protection: data.displayProtection,
    display_features: data.displayFeatures || [],
    refresh_rate: data.refreshRate || '120Hz',
    brightness: data.brightness,
    aspect_ratio: data.aspectRatio || '20:9',
    pixel_density: data.pixelDensity,
    screen_to_body_ratio: data.screenToBodyRatio,
    camera: data.camera,
    camera_details: data.cameraDetails,
    camera_features: data.cameraFeatures || [],
    video_recording: data.videoRecording,
    front_camera: data.frontCamera,
    front_camera_features: data.frontCameraFeatures || [],
    camera_sensor: data.cameraSensor,
    aperture: data.aperture,
    optical_zoom: data.opticalZoom || 'No',
    digital_zoom: data.digitalZoom,
    battery: data.battery,
    battery_type: data.batteryType || 'Lithium-Ion',
    charging: data.charging,
    charging_type: data.chargingType,
    wireless_charging: data.wirelessCharging || 'No',
    reverse_charging: data.reverseCharging || 'No',
    battery_life: data.batteryLife,
    charging_time: data.chargingTime,
    chipset: data.chipset,
    chipset_details: data.chipsetDetails,
    cpu: data.cpu,
    cpu_cores: data.cpuCores,
    cpu_frequency: data.cpuFrequency,
    gpu: data.gpu,
    gpu_details: data.gpuDetails,
    ram: data.ram,
    ram_type: data.ramType,
    storage: data.storage,
    storage_type: data.storageType,
    expandable_storage: data.expandableStorage || 'No',
    antutu_score: data.antutuScore,
    geekbench_score: data.geekbenchScore,
    os: data.os,
    os_version: data.osVersion,
    ui_skin: data.uiSkin,
    update_policy: data.updatePolicy,
    security_updates: data.securityUpdates,
    weight: data.weight,
    dimensions: data.dimensions,
    colors: data.colors || [],
    materials: data.materials || [],
    water_resistance: data.waterResistance || 'No',
    dust_resistance: data.dustResistance || 'No',
    sim: data.sim,
    network: data.network,
    wifi: data.wifi,
    bluetooth: data.bluetooth,
    nfc: data.nfc || 'No',
    usb: data.usb,
    gps: data.gps,
    sensors: data.sensors || [],
    speakers: data.speakers,
    audio_jack: data.audioJack || 'No',
    audio_features: data.audioFeatures || [],
    fingerprint: data.fingerprint,
    face_unlock: data.faceUnlock,
    security_features: data.securityFeatures || [],
    highlights: data.highlights || [],
    pros: data.pros || [],
    cons: data.cons || [],
    author: data.author,
    author_avatar: data.authorAvatar,
    author_bio: data.authorBio,
    author_social: data.authorSocial || [],
    date: data.date,
    read_time: data.readTime,
    custom_styles: data.customStyles || '',
    content_html: data.contentHtml,
    content_plain: data.contentPlain,
    is_featured: data.isFeatured || false,
    is_trending: data.isTrending || false,
    is_new: data.isNew || false,
    is_best_seller: data.isBestSeller || false,
    published: data.published !== undefined ? data.published : true,
  };
}

async function importAllPhones() {
  console.log('🚀 Starting import...');
  let success = 0, errors = 0;

  for (const phone of STATIC_PHONES) {
    try {
      const mapped = mapPhoneData(phone);
      
      const { error } = await supabase
        .from('phones')
        .upsert(mapped, { onConflict: 'slug' });
      
      if (error) throw error;
      success++;
      console.log(`✅ ${phone.brand} ${phone.model}`);
    } catch (error: any) {
      errors++;
      console.error(`❌ ${phone.brand} ${phone.model}:`, error.message);
    }
  }

  console.log(`\n✅ Imported: ${success}, ❌ Errors: ${errors}`);
}

importAllPhones();