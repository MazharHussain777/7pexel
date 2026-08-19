// lib/seo-generator.ts
export function generateSEOData(phone: any) {
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
    ogImage: phone.image || `${siteUrl}/images/default-phone.jpg`,
    ogUrl: pageUrl,
    ogType: 'article',
    ogSiteName: '7pexel',
    ogLocale: 'en_US',
    twitterCard: 'summary_large_image',
    twitterTitle: `${fullName} Review – Full Specs, Camera & Performance (${phone.year})`,
    twitterDescription: `Is ${fullName} worth buying? Read our full review with camera test, battery life, gaming performance, and benchmark scores.`,
    twitterImage: phone.image || `${siteUrl}/images/default-phone.jpg`,
    twitterSite: '@7pexel',
    twitterCreator: '@7pexel',
    faqSchema: [
      {
        question: `What is the price of ${fullName} in ${phone.year}?`,
        answer: `The ${fullName} is priced at $${phone.price} in ${phone.year}. It comes in ${phone.storage}GB storage variants with ${phone.ram}GB RAM. Available in ${phone.colors?.join(', ') || 'multiple'} colors.`,
        category: '💰 Price'
      },
      {
        question: `What is the camera quality of ${fullName}?`,
        answer: `The ${fullName} features a ${phone.camera} ${phone.cameraDetails} camera system. It offers ${phone.opticalZoom || 'digital'} zoom, ${phone.camera_features?.join(', ') || 'advanced features'}. Supports ${phone.videoRecording}.`,
        category: '📷 Camera'
      },
      {
        question: `What is the battery life of ${fullName}?`,
        answer: `The ${fullName} has a ${phone.battery}mAh battery that offers ${phone.batteryLife || 'excellent battery life'}. It supports ${phone.charging}W wired charging and ${phone.wireless_charging || 'wireless charging'}.`,
        category: '🔋 Battery'
      },
      {
        question: `Is ${fullName} good for gaming?`,
        answer: `Yes, the ${fullName} is excellent for gaming with its ${phone.chipsetDetails} chipset and ${phone.ram}GB RAM. The ${phone.displaySize} display with ${phone.refreshRate} refresh rate provides smooth gameplay.`,
        category: '🎮 Gaming'
      },
      {
        question: `What are the main features of ${fullName}?`,
        answer: `Key features include the ${phone.chipsetDetails} processor, ${phone.cameraDetails} camera system, ${phone.displaySize} ${phone.displayType} display, ${phone.battery}mAh battery, and ${phone.os} ${phone.osVersion} operating system.`,
        category: '✨ Features'
      }
    ],
    reviewSchema: [
      {
        author: phone.author || '7pexel Team',
        rating: phone.rating || 4.5,
        reviewBody: `The ${fullName} is an impressive smartphone that delivers exceptional performance. The ${phone.cameraDetails} camera produces stunning photos, and the ${phone.battery}mAh battery ensures all-day usage. Highly recommended for anyone looking for a great smartphone.`,
        date: phone.date || new Date().toISOString()
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