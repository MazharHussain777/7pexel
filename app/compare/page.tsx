// app/compare/page.tsx
import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CompareClient } from "@/components/CompareClient";
import { fetchPhonesFromDB } from "@/lib/phone-data-service";
import { STATIC_PHONES } from "@/app/phones/finder/data/static-phone-data";
import { smartPhoneMatcher } from "@/lib/phone-matcher";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    phone1?: string;
    phone2?: string;
    phones?: string;
  }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q || '';
  const phone1Slug = params.phone1 || '';
  const phone2Slug = params.phone2 || '';

  // Fetch phones
  let phones = [];
  try {
    const result = await fetchPhonesFromDB({ limit: 500 });
    phones = result.data || [];
  } catch (error) {
    phones = STATIC_PHONES;
  }

  let phone1 = phones.find(p => p.slug === phone1Slug);
  let phone2 = phones.find(p => p.slug === phone2Slug);

  // Smart matching from query
  if (query && (!phone1 || !phone2)) {
    const matchResult = smartPhoneMatcher(query, phones);
    if (matchResult.phone1 && matchResult.phone2) {
      phone1 = matchResult.phone1.phone;
      phone2 = matchResult.phone2.phone;
    }
  }

  // Check phones param
  if (!phone1 || !phone2) {
    const phonesParam = params.phones || '';
    if (phonesParam) {
      const slugs = phonesParam.split(',').filter(Boolean);
      if (slugs.length >= 2) {
        phone1 = phones.find(p => p.slug === slugs[0]);
        phone2 = phones.find(p => p.slug === slugs[1]);
      }
    }
  }

  if (phone1 && phone2) {
    const fullName1 = `${phone1.brand} ${phone1.model}`;
    const fullName2 = `${phone2.brand} ${phone2.model}`;
    
    return {
      title: `${fullName1} vs ${fullName2} - Full Comparison | 7pexel`,
      description: `Compare ${fullName1} vs ${fullName2} side by side. Full specs, camera quality, battery life, performance benchmarks, and price comparison. Find out which phone is better.`,
      keywords: `${fullName1} vs ${fullName2}, ${phone1.model} vs ${phone2.model}, ${phone1.brand} vs ${phone2.brand}, phone comparison, compare smartphones, ${phone1.model} comparison, ${phone2.model} review, which phone is better`,
      openGraph: {
        title: `${fullName1} vs ${fullName2} - Side by Side Comparison`,
        description: `See how ${fullName1} and ${fullName2} compare. Full specs, camera, battery, and performance.`,
        url: `/compare/${phone1.slug}-vs-${phone2.slug}`,
        images: [
          {
            url: `/api/og/compare?phone1=${phone1.slug}&phone2=${phone2.slug}`,
            width: 1200,
            height: 630,
            alt: `${fullName1} vs ${fullName2}`
          }
        ]
      }
    };
  }

  return {
    title: "Compare Smartphones Side by Side | 7pexel",
    description: "Compare smartphone specs, prices, cameras, battery life, and performance side by side. Find the best phone for you.",
  };
}

export default async function ComparePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const phone1Slug = params.phone1 || '';
  const phone2Slug = params.phone2 || '';
  const phonesParam = params.phones || '';

  // Fetch all phones from database
  let phones = [];
  let dbAvailable = true;
  
  try {
    const result = await fetchPhonesFromDB({ limit: 500 });
    phones = result.data || [];
    dbAvailable = true;
    console.log(`✅ Fetched ${phones.length} phones from database`);
  } catch (error) {
    console.error("Error fetching phones:", error);
    dbAvailable = false;
  }

  // Fallback to static data
  if (!dbAvailable || phones.length === 0) {
    console.log("⚠️ Using static phone data as fallback");
    phones = STATIC_PHONES.map(p => ({
      ...p,
      _id: p._id || p.id,
      display_features: p.displayFeatures || [],
      camera_features: p.cameraFeatures || [],
      front_camera_features: p.frontCameraFeatures || [],
      audio_features: p.audioFeatures || [],
      security_features: p.securityFeatures || [],
      author_social: p.authorSocial || [],
      review_count: p.reviewCount || 0,
      display: p.display || 'medium',
      display_protection: p.displayProtection || 'Gorilla Glass',
      refresh_rate: p.refreshRate || '120Hz',
      brightness: p.brightness || '1000 nits',
      aspect_ratio: p.aspectRatio || '20:9',
      pixel_density: p.pixelDensity || '400 ppi',
      screen_to_body_ratio: p.screenToBodyRatio || '90%',
      camera_sensor: p.cameraSensor || 'Sony',
      aperture: p.aperture || 'f/1.8',
      optical_zoom: p.opticalZoom || 'No',
      digital_zoom: p.digitalZoom || '10x',
      battery_type: p.batteryType || 'Lithium-Ion',
      charging_type: p.chargingType || 'USB-C',
      wireless_charging: p.wirelessCharging || 'No',
      reverse_charging: p.reverseCharging || 'No',
      battery_life: p.batteryLife || 'All day',
      charging_time: p.chargingTime || '1 hour',
      chipset_details: p.chipsetDetails || p.chipset,
      cpu_cores: p.cpuCores || '8 cores',
      cpu_frequency: p.cpuFrequency || '2.8 GHz',
      gpu_details: p.gpuDetails || p.gpu,
      ram_type: p.ramType || 'LPDDR5',
      storage_type: p.storageType || 'UFS 3.1',
      expandable_storage: p.expandableStorage || 'No',
      antutu_score: p.antutuScore || 'N/A',
      geekbench_score: p.geekbenchScore || 'N/A',
      os_version: p.osVersion || '',
      ui_skin: p.uiSkin || 'Stock',
      update_policy: p.updatePolicy || '3 years',
      security_updates: p.securityUpdates || 'Monthly',
      materials: p.materials || [],
      water_resistance: p.waterResistance || 'No',
      dust_resistance: p.dustResistance || 'No',
      is_featured: p.isFeatured || false,
      is_trending: p.isTrending || false,
      is_new: p.isNew || false,
      is_best_seller: p.isBestSeller || false,
    }));
  }

  // Determine which phones to compare using smart matching
  let phone1: any = null;
  let phone2: any = null;
  let preSelectedPhones: any[] = [];
  let matchedQuery = '';

  // 1. Check phones param
  if (phonesParam) {
    const slugs = phonesParam.split(',').filter(Boolean);
    if (slugs.length >= 2) {
      phone1 = phones.find(p => p.slug === slugs[0]);
      phone2 = phones.find(p => p.slug === slugs[1]);
    }
  }

  // 2. Check individual phone params
  if (!phone1 || !phone2) {
    if (phone1Slug) phone1 = phones.find(p => p.slug === phone1Slug);
    if (phone2Slug) phone2 = phones.find(p => p.slug === phone2Slug);
  }

  // 3. Smart matching from query
  if ((!phone1 || !phone2) && query) {
    console.log(`🔍 Smart matching query: "${query}"`);
    const matchResult = smartPhoneMatcher(query, phones);
    console.log(`📱 Match result:`, matchResult);
    
    if (matchResult.phone1 && matchResult.phone2) {
      phone1 = matchResult.phone1.phone;
      phone2 = matchResult.phone2.phone;
      matchedQuery = matchResult.matchedQuery;
      console.log(`✅ Matched: ${phone1.brand} ${phone1.model} vs ${phone2.brand} ${phone2.model}`);
      console.log(`📊 Confidence: ${matchResult.confidence}`);
    }
  }

  // 4. If phones found, pre-select them
  if (phone1 && phone2) {
    preSelectedPhones = [phone1, phone2];
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#fbf8ff]">
        <CompareClient 
          initialPhones={phones}
          preSelectedPhones={preSelectedPhones}
          searchQuery={query}
          matchedQuery={matchedQuery}
        />
      </main>
      <Footer />
    </>
  );
}