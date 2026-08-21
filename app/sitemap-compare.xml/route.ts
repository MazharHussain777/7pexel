// app/sitemap-compare.xml/route.ts
import { NextResponse } from 'next/server';
import { supabaseServer, isSupabaseAvailable } from '@/lib/supabase/server';
import { STATIC_PHONES } from '@/app/phones/finder/data/static-phone-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7pexel.com';
  const currentDate = new Date().toISOString();

  console.log('🚀 Generating compare sitemap...');

  // Fetch phones
  let phones = [];
  if (isSupabaseAvailable && supabaseServer) {
    try {
      const { data, error } = await supabaseServer
        .from('phones')
        .select('slug, brand, model, year')
        .eq('published', true);

      if (!error && data) {
        phones = data;
        console.log(`✅ Fetched ${phones.length} phones for compare sitemap`);
      }
    } catch (error) {
      console.error('Error fetching phones for compare sitemap:', error);
    }
  }

  if (phones.length === 0) {
    phones = STATIC_PHONES.map(p => ({
      slug: p.slug,
      brand: p.brand,
      model: p.model,
      year: p.year
    }));
    console.log(`⚠️ Using ${phones.length} static phones for compare sitemap`);
  }

  // Generate all comparison URLs
  const urls: string[] = [];
  const maxPhones = Math.min(phones.length, 50);

  for (let i = 0; i < maxPhones; i++) {
    for (let j = i + 1; j < Math.min(maxPhones, i + 8); j++) {
      const phone1 = phones[i];
      const phone2 = phones[j];
      
      if (phone1 && phone2 && phone1.slug !== phone2.slug) {
        const url = `${baseUrl}/compare/${phone1.slug}-vs-${phone2.slug}`;
        urls.push(url);
      }
    }
  }

  console.log(`✅ Generated ${urls.length} comparison URLs`);

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${urls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}