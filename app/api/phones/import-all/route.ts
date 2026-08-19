// app/api/phones/import-all/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { STATIC_PHONES } from '@/app/phones/finder/data/static-phone-data';
import { generateSEOData } from '@/lib/seo-generator';

export async function POST(request: NextRequest) {
  try {
    const results = [];
    const errors = [];

    for (const phone of STATIC_PHONES) {
      try {
        // Generate SEO data
        const seoData = generateSEOData(phone);
        
        // Remove _id
        const { _id, ...phoneData } = phone;
        
        // Format all fields including SEO
        const formattedPhone = {
          slug: phoneData.slug,
          brand: phoneData.brand,
          model: phoneData.model,
          year: phoneData.year,
          price: phoneData.price,
          image: phoneData.image,
          gallery: phoneData.gallery || [],
          rating: phoneData.rating || 0,
          review_count: phoneData.reviewCount || 0,
          category: phoneData.category || [],
          
          // Display
          display: phoneData.display || 'medium',
          display_size: phoneData.displaySize,
          display_resolution: phoneData.displayResolution,
          display_type: phoneData.displayType,
          display_protection: phoneData.displayProtection,
          display_features: phoneData.displayFeatures || [],
          refresh_rate: phoneData.refreshRate || '120Hz',
          brightness: phoneData.brightness,
          aspect_ratio: phoneData.aspectRatio || '20:9',
          pixel_density: phoneData.pixelDensity,
          screen_to_body_ratio: phoneData.screenToBodyRatio,
          
          // Camera
          camera: phoneData.camera,
          camera_details: phoneData.cameraDetails,
          camera_features: phoneData.cameraFeatures || [],
          video_recording: phoneData.videoRecording,
          front_camera: phoneData.frontCamera,
          front_camera_features: phoneData.frontCameraFeatures || [],
          camera_sensor: phoneData.cameraSensor,
          aperture: phoneData.aperture,
          optical_zoom: phoneData.opticalZoom || 'No',
          digital_zoom: phoneData.digitalZoom,
          
          // Battery
          battery: phoneData.battery,
          battery_type: phoneData.batteryType || 'Lithium-Ion',
          charging: phoneData.charging,
          charging_type: phoneData.chargingType,
          wireless_charging: phoneData.wirelessCharging || 'No',
          reverse_charging: phoneData.reverseCharging || 'No',
          battery_life: phoneData.batteryLife,
          charging_time: phoneData.chargingTime,
          
          // Performance
          chipset: phoneData.chipset,
          chipset_details: phoneData.chipsetDetails,
          cpu: phoneData.cpu,
          cpu_cores: phoneData.cpuCores,
          cpu_frequency: phoneData.cpuFrequency,
          gpu: phoneData.gpu,
          gpu_details: phoneData.gpuDetails,
          ram: phoneData.ram,
          ram_type: phoneData.ramType,
          storage: phoneData.storage,
          storage_type: phoneData.storageType,
          expandable_storage: phoneData.expandableStorage || 'No',
          antutu_score: phoneData.antutuScore,
          geekbench_score: phoneData.geekbenchScore,
          
          // OS & Software
          os: phoneData.os,
          os_version: phoneData.osVersion,
          ui_skin: phoneData.uiSkin,
          update_policy: phoneData.updatePolicy,
          security_updates: phoneData.securityUpdates,
          
          // Physical
          weight: phoneData.weight,
          dimensions: phoneData.dimensions,
          colors: phoneData.colors || [],
          materials: phoneData.materials || [],
          water_resistance: phoneData.waterResistance || 'No',
          dust_resistance: phoneData.dustResistance || 'No',
          
          // Connectivity
          sim: phoneData.sim,
          network: phoneData.network,
          wifi: phoneData.wifi,
          bluetooth: phoneData.bluetooth,
          nfc: phoneData.nfc || 'No',
          usb: phoneData.usb,
          gps: phoneData.gps,
          sensors: phoneData.sensors || [],
          
          // Audio
          speakers: phoneData.speakers,
          audio_jack: phoneData.audioJack || 'No',
          audio_features: phoneData.audioFeatures || [],
          
          // Security
          fingerprint: phoneData.fingerprint,
          face_unlock: phoneData.faceUnlock,
          security_features: phoneData.securityFeatures || [],
          
          // Content
          highlights: phoneData.highlights || [],
          pros: phoneData.pros || [],
          cons: phoneData.cons || [],
          author: phoneData.author,
          author_avatar: phoneData.authorAvatar,
          author_bio: phoneData.authorBio,
          author_social: phoneData.authorSocial || [],
          date: phoneData.date,
          read_time: phoneData.readTime,
          custom_styles: phoneData.customStyles || '',
          content_html: phoneData.contentHtml,
          content_plain: phoneData.contentPlain,
          
          // Flags
          is_featured: phoneData.isFeatured || false,
          is_trending: phoneData.isTrending || false,
          is_new: phoneData.isNew || false,
          is_best_seller: phoneData.isBestSeller || false,
          published: phoneData.published !== undefined ? phoneData.published : true,
          
          // SEO (all 18+ fields in one JSONB column)
          seo: seoData
        };

        // Use upsert to avoid duplicates
        const { data, error } = await supabaseServer
          .from('phones')
          .upsert(formattedPhone, { onConflict: 'slug' })
          .select()
          .single();

        if (error) throw error;
        results.push(data);
        console.log(`✅ Added: ${phone.brand} ${phone.model}`);
        
      } catch (error: any) {
        errors.push({ slug: phone.slug, error: error.message });
        console.error(`❌ Error with ${phone.brand} ${phone.model}:`, error.message);
      }
    }

    return NextResponse.json({
      success: true,
      added: results.length,
      errors: errors.length,
      data: results,
      errorDetails: errors,
      totalFields: 114,
      message: `Imported ${results.length} phones with all 114+ fields including SEO`
    });
  } catch (error: any) {
    console.error('Import error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to import phones'
    }, { status: 500 });
  }
}