// lib/compare-utils.ts

export function extractPhoneMatches(query: string, phones: any[]) {
  const results = {
    phone1: null as any | null,
    phone2: null as any | null,
    confidence: 0,
    matchedTerms: [] as string[]
  };

  const normalizedQuery = query.toLowerCase().trim();
  
  // Common comparison keywords
  const compareWords = ['vs', 'versus', 'compare', 'comparison', 'against', 'or', 'and', 'better', 'which is better'];
  
  // Split query by comparison keywords
  let parts: string[] = [];
  
  for (const word of compareWords) {
    if (normalizedQuery.includes(` ${word} `) || normalizedQuery.includes(`-${word}-`) || normalizedQuery.includes(` ${word}-`)) {
      parts = normalizedQuery.split(new RegExp(`\\s*${word}\\s*`, 'i'));
      break;
    }
  }
  
  // If no separator found, try to find two phone names
  if (parts.length < 2) {
    parts = extractPhoneNamesFromQuery(normalizedQuery, phones);
  }

  if (parts.length >= 2) {
    const phone1Match = findBestPhoneMatch(parts[0].trim(), phones);
    const phone2Match = findBestPhoneMatch(parts[1].trim(), phones);
    
    if (phone1Match && phone2Match) {
      results.phone1 = phone1Match.phone;
      results.phone2 = phone2Match.phone;
      results.confidence = (phone1Match.confidence + phone2Match.confidence) / 2;
      results.matchedTerms = [phone1Match.term, phone2Match.term];
    }
  }

  return results;
}

export function extractPhoneNamesFromQuery(query: string, phones: any[]): string[] {
  const foundPhones: { phone: any; index: number; term: string; length: number }[] = [];
  
  for (const phone of phones) {
    const brand = phone.brand.toLowerCase();
    const model = phone.model.toLowerCase();
    const fullName = `${brand} ${model}`;
    const slug = phone.slug.toLowerCase();
    
    // Check various patterns
    const patterns = [
      { text: fullName, priority: 10 },
      { text: model, priority: 8 },
      { text: slug, priority: 7 },
      { text: `${brand}${model}`, priority: 6 },
      { text: `${brand}-${model}`, priority: 6 },
      { text: brand, priority: 4 },
    ];
    
    for (const { text, priority } of patterns) {
      if (text && query.includes(text)) {
        const index = query.indexOf(text);
        // Avoid duplicates
        if (!foundPhones.some(f => f.term === text)) {
          foundPhones.push({ phone, index, term: text, length: text.length });
        }
        break;
      }
    }
  }
  
  // Sort by index and length (longer matches first)
  foundPhones.sort((a, b) => {
    if (a.index !== b.index) return a.index - b.index;
    return b.length - a.length;
  });
  
  // Remove overlapping matches
  const uniquePhones: typeof foundPhones = [];
  for (const found of foundPhones) {
    const overlapping = uniquePhones.some(u => 
      Math.abs(u.index - found.index) < Math.min(u.length, found.length)
    );
    if (!overlapping) {
      uniquePhones.push(found);
    }
  }
  
  if (uniquePhones.length >= 2) {
    return uniquePhones.slice(0, 2).map(f => f.term);
  }
  
  return [];
}

export function findBestPhoneMatch(term: string, phones: any[]): { phone: any; confidence: number; term: string } | null {
  const normalizedTerm = term.toLowerCase().trim();
  
  // Remove common words
  const cleanTerm = normalizedTerm
    .replace(/the|phone|smartphone|model|series|edition|pro|plus|ultra|max|mini|lite|se/g, '')
    .trim();
  
  // Exact match first
  for (const phone of phones) {
    const fullName = `${phone.brand} ${phone.model}`.toLowerCase();
    const slug = phone.slug.toLowerCase();
    const model = phone.model.toLowerCase();
    const brand = phone.brand.toLowerCase();
    
    if (fullName === cleanTerm || slug === cleanTerm || model === cleanTerm) {
      return { phone, confidence: 1.0, term: cleanTerm };
    }
    
    if (fullName.includes(cleanTerm) || cleanTerm.includes(fullName)) {
      return { phone, confidence: 0.95, term: cleanTerm };
    }
  }
  
  // Partial match with confidence scoring
  let bestMatch: any = null;
  let bestConfidence = 0;
  let bestTerm = '';
  
  for (const phone of phones) {
    const fullName = `${phone.brand} ${phone.model}`.toLowerCase();
    const model = phone.model.toLowerCase();
    const brand = phone.brand.toLowerCase();
    const slug = phone.slug.toLowerCase();
    
    const variations = [
      { text: fullName, weight: 1.0 },
      { text: model, weight: 0.9 },
      { text: slug, weight: 0.85 },
      { text: brand, weight: 0.7 }
    ];
    
    for (const { text, weight } of variations) {
      if (text.includes(cleanTerm) || cleanTerm.includes(text)) {
        let confidence = weight * 0.8;
        
        if (cleanTerm.includes(text) && text.length > 3) {
          confidence = weight * 0.95;
        }
        
        if (text.match(/\d+/) && cleanTerm.match(/\d+/)) {
          confidence = Math.min(confidence + 0.1, 1.0);
        }
        
        if (confidence > bestConfidence) {
          bestMatch = phone;
          bestConfidence = confidence;
          bestTerm = text;
        }
      }
    }
  }
  
  if (bestMatch && bestConfidence > 0.5) {
    return { phone: bestMatch, confidence: bestConfidence, term: bestTerm };
  }
  
  return null;
}

export function generateComparisonPairs(phones: any[], maxPairs: number = 100) {
  const pairs: { phone1: any; phone2: any; slug: string }[] = [];
  
  // Prioritize same brand comparisons
  const brands = new Map<string, any[]>();
  phones.forEach(phone => {
    if (!brands.has(phone.brand)) {
      brands.set(phone.brand, []);
    }
    brands.get(phone.brand)!.push(phone);
  });
  
  // Same brand comparisons
  for (const [brand, brandPhones] of brands) {
    // Sort by year for meaningful comparisons
    brandPhones.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    
    for (let i = 0; i < brandPhones.length && pairs.length < maxPairs; i++) {
      for (let j = i + 1; j < brandPhones.length && pairs.length < maxPairs; j++) {
        // Only compare phones that are close in year (max 3 years apart)
        const yearDiff = Math.abs(parseInt(brandPhones[i].year) - parseInt(brandPhones[j].year));
        if (yearDiff <= 3) {
          pairs.push({
            phone1: brandPhones[i],
            phone2: brandPhones[j],
            slug: `${brandPhones[i].slug}-vs-${brandPhones[j].slug}`
          });
        }
      }
    }
  }
  
  // Cross brand comparisons - flagship vs flagship
  if (pairs.length < maxPairs) {
    const flagships = phones
      .filter(p => parseInt(p.year) >= 2023)
      .sort((a, b) => parseFloat(b.price || '0') - parseFloat(a.price || '0'))
      .slice(0, 10);
    
    for (let i = 0; i < flagships.length && pairs.length < maxPairs; i++) {
      for (let j = i + 1; j < flagships.length && pairs.length < maxPairs; j++) {
        if (flagships[i].brand !== flagships[j].brand) {
          const exists = pairs.some(p => 
            (p.phone1.slug === flagships[i].slug && p.phone2.slug === flagships[j].slug) ||
            (p.phone1.slug === flagships[j].slug && p.phone2.slug === flagships[i].slug)
          );
          if (!exists) {
            pairs.push({
              phone1: flagships[i],
              phone2: flagships[j],
              slug: `${flagships[i].slug}-vs-${flagships[j].slug}`
            });
          }
        }
      }
    }
  }
  
  return pairs;
}