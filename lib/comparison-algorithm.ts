// lib/comparison-algorithm.ts
export interface ComparisonScore {
  phone: any;
  scores: {
    [key: string]: number;
  };
  total: number;
  ranking: number;
}

export function comparePhones(phones: any[]): ComparisonScore[] {
  const categories = {
    performance: ['chipset', 'ram', 'storage', 'antutu_score', 'geekbench_score'],
    camera: ['camera', 'camera_details', 'video_recording', 'front_camera'],
    display: ['display_size', 'display_resolution', 'refresh_rate', 'brightness'],
    battery: ['battery', 'charging', 'wireless_charging'],
    value: ['price'],
    features: ['water_resistance', 'nfc', 'speakers'],
  };

  const scored = phones.map(phone => {
    const scores: { [key: string]: number } = {};
    let total = 0;

    // Performance score
    let perfScore = 0;
    if (phone.chipset) perfScore += 10;
    if (phone.ram) perfScore += parseInt(phone.ram) * 2 || 0;
    if (phone.storage) perfScore += parseInt(phone.storage) * 1.5 || 0;
    scores.performance = Math.min(perfScore / 100, 10);

    // Camera score
    let camScore = 0;
    if (phone.camera) camScore += 5;
    if (phone.camera_details) camScore += 5;
    if (phone.video_recording) camScore += 3;
    if (phone.front_camera) camScore += 2;
    scores.camera = Math.min(camScore / 15, 10);

    // Display score
    let dispScore = 0;
    if (phone.display_size) dispScore += 2;
    if (phone.display_resolution) dispScore += 3;
    if (phone.refresh_rate) {
      const rate = parseInt(phone.refresh_rate);
      dispScore += rate > 120 ? 5 : rate > 90 ? 4 : rate > 60 ? 3 : 2;
    }
    scores.display = Math.min(dispScore / 10, 10);

    // Battery score
    let batScore = 0;
    if (phone.battery) {
      const batt = parseInt(phone.battery);
      batScore += batt > 5000 ? 5 : batt > 4000 ? 4 : batt > 3000 ? 3 : 2;
    }
    if (phone.charging) batScore += 2;
    if (phone.wireless_charging && phone.wireless_charging !== 'No') batScore += 2;
    scores.battery = Math.min(batScore / 9, 10);

    // Value score (price to features ratio)
    let valScore = 0;
    if (phone.price) {
      const price = parseInt(phone.price);
      const featureCount = Object.values(categories).flat().filter(k => phone[k]).length;
      valScore = Math.min((featureCount / price) * 100, 10);
    }
    scores.value = Math.min(valScore, 10);

    // Features score
    let featScore = 0;
    if (phone.water_resistance && phone.water_resistance !== 'No') featScore += 3;
    if (phone.nfc && phone.nfc !== 'No') featScore += 2;
    if (phone.speakers) featScore += 2;
    if (phone.audio_jack && phone.audio_jack !== 'No') featScore += 2;
    if (phone.fingerprint) featScore += 1;
    scores.features = Math.min(featScore / 10, 10);

    // Calculate total
    total = Object.values(scores).reduce((a, b) => a + b, 0);
    total = Math.round((total / Object.keys(scores).length) * 10) / 10;

    return { phone, scores, total };
  });

  // Sort by total score
  scored.sort((a, b) => b.total - a.total);
  
  // Add ranking
  scored.forEach((item, index) => {
    item.ranking = index + 1;
  });

  return scored;
}

// Generate best comparison pairs for SEO
export function generateComparePairs(phones: any[], maxPairs: number = 50) {
  const pairs: { phone1: any; phone2: any; score: number }[] = [];
  
  for (let i = 0; i < phones.length && pairs.length < maxPairs; i++) {
    for (let j = i + 1; j < phones.length && pairs.length < maxPairs; j++) {
      const phone1 = phones[i];
      const phone2 = phones[j];
      
      // Calculate similarity score (lower means more interesting comparison)
      let similarity = 0;
      if (phone1.brand === phone2.brand) similarity += 2;
      if (phone1.year === phone2.year) similarity += 1;
      if (phone1.category?.some((c: string) => phone2.category?.includes(c))) similarity += 1;
      
      // Price difference (more interesting if similar price)
      const priceDiff = Math.abs(parseInt(phone1.price) - parseInt(phone2.price));
      if (priceDiff < 100) similarity += 2;
      
      // Rating difference (interesting if similar rating)
      const ratingDiff = Math.abs((phone1.rating || 0) - (phone2.rating || 0));
      if (ratingDiff < 0.5) similarity += 1;
      
      pairs.push({
        phone1,
        phone2,
        score: similarity,
      });
    }
  }
  
  // Sort by similarity (higher similarity first - more relevant comparisons)
  pairs.sort((a, b) => b.score - a.score);
  
  return pairs.slice(0, maxPairs);
}