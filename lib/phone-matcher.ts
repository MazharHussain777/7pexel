// lib/phone-matcher.ts

export interface PhoneMatch {
  phone: any;
  confidence: number;
  matchedTerms: string[];
  matchType: 'exact' | 'partial' | 'fuzzy' | 'brand-model' | 'model-only';
}

export interface SearchResult {
  phone1: PhoneMatch | null;
  phone2: PhoneMatch | null;
  query: string;
  confidence: number;
  matchedQuery: string;
}

// Generate variations for any phone
export function generatePhoneVariations(phones: any[]): Map<string, string[]> {
  const variations = new Map<string, string[]>();
  
  for (const phone of phones) {
    const slug = phone.slug;
    const brand = phone.brand.toLowerCase();
    const model = phone.model.toLowerCase();
    const fullName = `${brand} ${model}`;
    
    const variants: string[] = [
      fullName,
      `${brand} ${model}`,
      `${model} ${brand}`,
      model,
      model.replace(/\s+/g, ''),
      model.replace(/-/g, ''),
      `${brand}${model}`,
      `${brand}-${model}`,
      model.split(' ').join(''),
      model.split('-').join(''),
      brand,
      brand.substring(0, 3),
      ...extractModelNumbers(model),
      ...generateBrandSpecificVariations(brand, model),
    ];
    
    const uniqueVariants = [...new Set(variants.filter(v => v.length > 0))];
    variations.set(slug, uniqueVariants);
  }
  
  return variations;
}

function extractModelNumbers(model: string): string[] {
  const numbers = model.match(/\d+/g);
  if (!numbers) return [];
  
  const results: string[] = [];
  for (const num of numbers) {
    results.push(num);
    // Add common prefixes
    results.push(`s${num}`);
    results.push(`galaxy${num}`);
    results.push(`iphone${num}`);
    results.push(`pixel${num}`);
    results.push(`oneplus${num}`);
    results.push(`p${num}`);
    results.push(`i${num}`);
  }
  return results;
}

function generateBrandSpecificVariations(brand: string, model: string): string[] {
  const results: string[] = [];
  const modelParts = model.split(' ');
  const num = model.match(/\d+/)?.[0] || '';
  const variant = model.includes('ultra') ? 'ultra' : 
                  model.includes('plus') ? 'plus' : 
                  model.includes('pro') ? 'pro' :
                  model.includes('max') ? 'max' : '';
  
  // Samsung Galaxy variations
  if (brand.includes('samsung') || model.includes('galaxy')) {
    if (num) {
      results.push(`s${num}`);
      results.push(`s${num}${variant}`);
      results.push(`s${num} ${variant}`);
      results.push(`galaxy s${num}`);
      results.push(`galaxy s${num} ${variant}`);
      results.push(`samsung s${num}`);
      results.push(`samsung s${num} ${variant}`);
      results.push(`s${num}u`); // Ultra shorthand
      results.push(`s${num}p`); // Plus shorthand
    }
  }
  
  // iPhone variations
  if (brand.includes('apple') || model.includes('iphone')) {
    if (num) {
      results.push(`iphone ${num}`);
      results.push(`iphone${num}`);
      results.push(`i${num}`);
      results.push(`iphone ${num} ${variant}`);
      results.push(`apple iphone ${num}`);
      results.push(`i${num}${variant}`);
    }
  }
  
  // Pixel variations
  if (brand.includes('google') || model.includes('pixel')) {
    if (num) {
      results.push(`pixel ${num}`);
      results.push(`pixel${num}`);
      results.push(`p${num}`);
      results.push(`google pixel ${num}`);
      results.push(`pixel ${num} ${variant}`);
      results.push(`p${num}${variant}`);
    }
  }
  
  // OnePlus variations
  if (brand.includes('oneplus') || model.includes('oneplus')) {
    if (num) {
      results.push(`oneplus ${num}`);
      results.push(`oneplus${num}`);
      results.push(`op${num}`);
      results.push(`1+${num}`);
      results.push(`oneplus ${num} ${variant}`);
    }
  }
  
  return results;
}

export function smartPhoneMatcher(query: string, phones: any[]): SearchResult {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Generate variations for all phones
  const variationsMap = generatePhoneVariations(phones);
  
  // Find phone matches in query
  const foundMatches: { phone: any; slug: string; term: string; confidence: number; index: number }[] = [];
  
  for (const [slug, variants] of variationsMap) {
    const phone = phones.find(p => p.slug === slug);
    if (!phone) continue;
    
    for (const variant of variants) {
      if (normalizedQuery.includes(variant)) {
        const confidence = calculateConfidence(variant, normalizedQuery, phone);
        const index = normalizedQuery.indexOf(variant);
        foundMatches.push({
          phone,
          slug,
          term: variant,
          confidence,
          index
        });
      }
    }
  }
  
  // Sort by confidence and position
  foundMatches.sort((a, b) => {
    if (b.confidence !== a.confidence) return b.confidence - a.confidence;
    return a.index - b.index;
  });
  
  // Remove overlapping matches
  const uniqueMatches: typeof foundMatches = [];
  for (const match of foundMatches) {
    const overlapping = uniqueMatches.some(u => 
      Math.abs(u.index - match.index) < Math.min(u.term.length, match.term.length)
    );
    if (!overlapping && !uniqueMatches.some(u => u.slug === match.slug)) {
      uniqueMatches.push(match);
    }
  }
  
  // Get top 2 matches
  const topMatches = uniqueMatches.slice(0, 2);
  
  let phone1Match: PhoneMatch | null = null;
  let phone2Match: PhoneMatch | null = null;
  
  if (topMatches.length >= 1) {
    const m1 = topMatches[0];
    phone1Match = {
      phone: m1.phone,
      confidence: m1.confidence,
      matchedTerms: [m1.term],
      matchType: getMatchType(m1.term, m1.phone)
    };
  }
  
  if (topMatches.length >= 2) {
    const m2 = topMatches[1];
    phone2Match = {
      phone: m2.phone,
      confidence: m2.confidence,
      matchedTerms: [m2.term],
      matchType: getMatchType(m2.term, m2.phone)
    };
  }
  
  // If only one phone found, try to find second from remaining query
  if (phone1Match && !phone2Match) {
    const remainingQuery = normalizedQuery.replace(phone1Match.matchedTerms[0], '').trim();
    const secondMatch = findPhoneInQuery(remainingQuery, phones, phone1Match.phone.slug);
    if (secondMatch) {
      phone2Match = secondMatch;
    }
  }
  
  // If still no second phone, try to find any two phones from query
  if (!phone1Match || !phone2Match) {
    const matches = findPhonesInQuery(normalizedQuery, phones);
    if (matches.length >= 2) {
      phone1Match = matches[0];
      phone2Match = matches[1];
    }
  }
  
  if (phone1Match && phone2Match) {
    const confidence = (phone1Match.confidence + phone2Match.confidence) / 2;
    return {
      phone1: phone1Match,
      phone2: phone2Match,
      query: normalizedQuery,
      confidence,
      matchedQuery: `${phone1Match.phone.brand} ${phone1Match.phone.model} vs ${phone2Match.phone.brand} ${phone2Match.phone.model}`
    };
  }
  
  return {
    phone1: null,
    phone2: null,
    query: normalizedQuery,
    confidence: 0,
    matchedQuery: ''
  };
}

function calculateConfidence(term: string, query: string, phone: any): number {
  let confidence = 0;
  const fullName = `${phone.brand} ${phone.model}`.toLowerCase();
  const model = phone.model.toLowerCase();
  const brand = phone.brand.toLowerCase();
  
  // Exact match of full name
  if (query.includes(fullName)) {
    confidence = 1.0;
  }
  // Exact match of model
  else if (query.includes(model)) {
    confidence = 0.95;
  }
  // Brand + model combination
  else if (query.includes(`${brand} ${model}`)) {
    confidence = 0.9;
  }
  // Model with slight variation
  else if (term === model || term === model.replace(/\s/g, '')) {
    confidence = 0.85;
  }
  // Partial model match
  else if (model.includes(term) || term.includes(model)) {
    confidence = 0.7;
  }
  // Brand match only
  else if (query.includes(brand)) {
    confidence = 0.5;
  }
  // Model number match
  else {
    const modelNumbers = model.match(/\d+/g) || [];
    const queryNumbers = query.match(/\d+/g) || [];
    if (modelNumbers.some(n => queryNumbers.includes(n))) {
      confidence = 0.6;
    } else {
      confidence = 0.3;
    }
  }
  
  // Boost confidence if term is at start of query
  if (query.startsWith(term)) {
    confidence = Math.min(confidence + 0.1, 1.0);
  }
  
  return confidence;
}

function getMatchType(term: string, phone: any): 'exact' | 'partial' | 'fuzzy' | 'brand-model' | 'model-only' {
  const fullName = `${phone.brand} ${phone.model}`.toLowerCase();
  const model = phone.model.toLowerCase();
  const brand = phone.brand.toLowerCase();
  
  if (term === fullName) return 'exact';
  if (term === model) return 'model-only';
  if (term === brand) return 'brand-model';
  if (fullName.includes(term) || term.includes(fullName)) return 'partial';
  return 'fuzzy';
}

function findPhoneInQuery(query: string, phones: any[], excludeSlug: string): PhoneMatch | null {
  const matches = findPhonesInQuery(query, phones);
  return matches.find(m => m.phone.slug !== excludeSlug) || null;
}

function findPhonesInQuery(query: string, phones: any[]): PhoneMatch[] {
  const results: PhoneMatch[] = [];
  
  for (const phone of phones) {
    const fullName = `${phone.brand} ${phone.model}`.toLowerCase();
    const model = phone.model.toLowerCase();
    const brand = phone.brand.toLowerCase();
    
    const patterns = [
      fullName,
      model,
      brand,
      phone.slug.toLowerCase(),
      model.replace(/\s/g, ''),
      `${brand}${model}`,
      `${brand}-${model}`,
    ];
    
    for (const pattern of patterns) {
      if (query.includes(pattern)) {
        const confidence = calculateConfidence(pattern, query, phone);
        results.push({
          phone,
          confidence,
          matchedTerms: [pattern],
          matchType: getMatchType(pattern, phone)
        });
        break;
      }
    }
  }
  
  results.sort((a, b) => b.confidence - a.confidence);
  
  const unique: PhoneMatch[] = [];
  for (const match of results) {
    if (!unique.some(u => u.phone.slug === match.phone.slug)) {
      unique.push(match);
    }
  }
  
  return unique;
}