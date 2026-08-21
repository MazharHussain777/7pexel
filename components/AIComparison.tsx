// components/AIComparison.tsx
"use client";

import { useState, useEffect } from 'react';
import { Phone } from '@/types/phone';

interface AIComparisonResult {
  winner: string;
  summary: string;
  scores: { [key: string]: number };
  recommendations: string[];
  prosCons: {
    [phoneSlug: string]: {
      pros: string[];
      cons: string[];
    };
  };
  bestFor: {
    [phoneSlug: string]: string[];
  };
  overallScore: {
    [phoneSlug: string]: number;
  };
  detailedAnalysis: string;
}

interface AIComparisonProps {
  phones: Phone[];
  selectedPhones: Phone[];
}

export function AIComparison({ phones, selectedPhones }: AIComparisonProps) {
  const [aiResult, setAiResult] = useState<AIComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateAIComparison = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Local AI analysis
      const result = await generateLocalAI(selectedPhones);
      setAiResult(result);
    } catch (err) {
      setError('Failed to generate AI analysis');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPhones.length >= 2) {
      generateAIComparison();
    }
  }, [selectedPhones]);

  // Local AI analysis without API
  const generateLocalAI = async (phones: Phone[]): Promise<AIComparisonResult> => {
    // Analyze each phone
    const analyzedPhones = phones.map(phone => analyzePhone(phone));
    
    // Calculate scores
    const scores = calculateScores(analyzedPhones);
    
    // Determine winner
    const winner = determineWinner(scores);
    
    // Generate recommendations
    const recommendations = generateRecommendations(analyzedPhones);
    
    // Generate pros and cons
    const prosCons = generateProsCons(analyzedPhones);
    
    // Best for categories
    const bestFor = generateBestFor(analyzedPhones);
    
    // Overall scores
    const overallScore = calculateOverallScore(analyzedPhones);
    
    // Detailed analysis
    const detailedAnalysis = generateDetailedAnalysis(analyzedPhones);
    
    // Summary
    const summary = generateSummary(analyzedPhones, winner);

    return {
      winner,
      summary,
      scores,
      recommendations,
      prosCons,
      bestFor,
      overallScore,
      detailedAnalysis
    };
  };

  const analyzePhone = (phone: Phone) => {
    const specs = {
      display: {
        size: parseFloat(phone.display_size) || 0,
        resolution: phone.display_resolution,
        refreshRate: parseInt(phone.refresh_rate) || 60,
        brightness: parseInt(phone.brightness) || 0,
        type: phone.display_type,
      },
      camera: {
        main: phone.camera,
        details: phone.camera_details,
        video: phone.video_recording,
        front: phone.front_camera,
        zoom: parseInt(phone.optical_zoom) || 0,
      },
      performance: {
        chipset: phone.chipset,
        ram: parseInt(phone.ram) || 0,
        storage: parseInt(phone.storage) || 0,
        antutu: parseInt(phone.antutu_score) || 0,
        geekbench: parseInt(phone.geekbench_score) || 0,
      },
      battery: {
        capacity: parseInt(phone.battery) || 0,
        charging: parseInt(phone.charging) || 0,
        wireless: phone.wireless_charging !== 'No',
      },
      features: {
        waterResistance: phone.water_resistance !== 'No',
        nfc: phone.nfc !== 'No',
        audioJack: phone.audio_jack !== 'No',
        fingerprint: phone.fingerprint !== 'No',
        faceUnlock: phone.face_unlock !== 'No',
      },
      price: parseInt(phone.price) || 0,
      brand: phone.brand,
      model: phone.model,
      year: parseInt(phone.year) || 2024,
    };

    return { ...phone, specs };
  };

  const calculateScores = (phones: any[]) => {
    const scores: { [key: string]: number } = {};
    
    phones.forEach(phone => {
      let score = 0;
      const s = phone.specs;
      
      // Display score (max 20)
      let displayScore = 0;
      if (s.display.size > 6.5) displayScore += 5;
      if (s.display.size > 6) displayScore += 3;
      if (s.display.refreshRate >= 120) displayScore += 7;
      if (s.display.refreshRate >= 90) displayScore += 4;
      if (s.display.brightness > 1500) displayScore += 5;
      if (s.display.brightness > 1000) displayScore += 3;
      score += Math.min(displayScore, 20);
      
      // Camera score (max 20)
      let cameraScore = 0;
      if (s.camera.details.includes('108MP') || s.camera.details.includes('50MP')) cameraScore += 8;
      if (s.camera.details.includes('200MP')) cameraScore += 10;
      if (s.camera.zoom > 5) cameraScore += 5;
      if (s.camera.zoom > 3) cameraScore += 3;
      if (s.camera.video.includes('8K') || s.camera.video.includes('4K')) cameraScore += 5;
      score += Math.min(cameraScore, 20);
      
      // Performance score (max 25)
      let perfScore = 0;
      if (s.performance.antutu > 1500000) perfScore += 10;
      if (s.performance.antutu > 1200000) perfScore += 7;
      if (s.performance.geekbench > 7000) perfScore += 8;
      if (s.performance.geekbench > 5000) perfScore += 5;
      if (s.performance.ram >= 12) perfScore += 5;
      if (s.performance.ram >= 8) perfScore += 3;
      if (s.performance.storage >= 256) perfScore += 2;
      score += Math.min(perfScore, 25);
      
      // Battery score (max 15)
      let batteryScore = 0;
      if (s.battery.capacity > 5000) batteryScore += 8;
      if (s.battery.capacity > 4500) batteryScore += 5;
      if (s.battery.charging > 45) batteryScore += 4;
      if (s.battery.charging > 25) batteryScore += 2;
      if (s.battery.wireless) batteryScore += 3;
      score += Math.min(batteryScore, 15);
      
      // Features score (max 10)
      let featuresScore = 0;
      if (s.features.waterResistance) featuresScore += 3;
      if (s.features.nfc) featuresScore += 2;
      if (s.features.fingerprint) featuresScore += 2;
      if (s.features.faceUnlock) featuresScore += 2;
      if (s.features.audioJack) featuresScore += 1;
      score += Math.min(featuresScore, 10);
      
      // Value score (price vs features) (max 10)
      let valueScore = 0;
      const featureCount = Object.values(s.features).filter(Boolean).length;
      const pricePerFeature = s.price / (featureCount + 1);
      if (pricePerFeature < 100) valueScore = 10;
      else if (pricePerFeature < 200) valueScore = 8;
      else if (pricePerFeature < 300) valueScore = 6;
      else if (pricePerFeature < 400) valueScore = 4;
      else valueScore = 2;
      score += valueScore;
      
      scores[phone.slug] = Math.round(score);
    });
    
    return scores;
  };

  const determineWinner = (scores: { [key: string]: number }) => {
    let maxScore = 0;
    let winner = '';
    
    for (const [slug, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        winner = slug;
      }
    }
    
    return winner;
  };

  const generateRecommendations = (phones: any[]) => {
    const recommendations: string[] = [];
    
    phones.forEach(phone => {
      const s = phone.specs;
      let rec = `The ${phone.brand} ${phone.model} is `;
      
      if (s.camera.details.includes('108MP') || s.camera.details.includes('200MP')) {
        rec += 'excellent for photography, ';
      }
      
      if (s.performance.antutu > 1500000) {
        rec += 'great for gaming, ';
      }
      
      if (s.battery.capacity > 5000) {
        rec += 'has outstanding battery life, ';
      }
      
      if (s.display.refreshRate >= 120) {
        rec += 'features a smooth display, ';
      }
      
      if (s.price < 700) {
        rec += 'offers great value for money, ';
      }
      
      rec += `and is perfect for ${determineBestUse(phone)}.`;
      recommendations.push(rec);
    });
    
    return recommendations;
  };

  const determineBestUse = (phone: any): string => {
    const s = phone.specs;
    const strengths: string[] = [];
    
    if (s.camera.details.includes('108MP') || s.camera.details.includes('200MP')) {
      strengths.push('photography enthusiasts');
    }
    
    if (s.performance.antutu > 1500000) {
      strengths.push('hardcore gamers');
    }
    
    if (s.battery.capacity > 5000) {
      strengths.push('heavy users who need long battery life');
    }
    
    if (s.display.refreshRate >= 120) {
      strengths.push('users who love smooth scrolling and gaming');
    }
    
    if (s.price < 600) {
      strengths.push('budget-conscious buyers');
    }
    
    if (s.display.size > 6.7) {
      strengths.push('users who prefer large screens');
    }
    
    if (strengths.length === 0) {
      strengths.push('everyday users looking for a reliable phone');
    }
    
    return strengths.join(' and ');
  };

  const generateProsCons = (phones: any[]) => {
    const result: { [key: string]: { pros: string[]; cons: string[] } } = {};
    
    phones.forEach(phone => {
      const pros: string[] = [];
      const cons: string[] = [];
      const s = phone.specs;
      
      // Pros
      if (s.display.refreshRate >= 120) pros.push(`✅ ${s.display.refreshRate}Hz smooth display`);
      if (s.display.brightness > 1500) pros.push(`✅ Ultra bright ${s.display.brightness} nits display`);
      if (s.camera.details.includes('200MP')) pros.push(`✅ 200MP main camera for stunning photos`);
      else if (s.camera.details.includes('108MP')) pros.push(`✅ 108MP high-resolution camera`);
      if (s.performance.antutu > 1500000) pros.push(`✅ Top-tier performance (${s.performance.antutu} Antutu score)`);
      if (s.performance.ram >= 12) pros.push(`✅ ${s.performance.ram}GB RAM for smooth multitasking`);
      if (s.battery.capacity > 5000) pros.push(`✅ Massive ${s.battery.capacity}mAh battery`);
      if (s.battery.charging > 45) pros.push(`✅ Super fast ${s.battery.charging}W charging`);
      if (s.features.waterResistance) pros.push(`✅ IP68 water and dust resistant`);
      if (s.features.nfc) pros.push(`✅ NFC for contactless payments`);
      if (s.features.faceUnlock) pros.push(`✅ Secure face unlock`);
      
      // Cons
      if (s.price > 1000) cons.push(`❌ Premium price at $${s.price}`);
      if (!s.features.waterResistance) cons.push(`❌ No water resistance rating`);
      if (!s.features.audioJack) cons.push(`❌ No 3.5mm headphone jack`);
      if (s.battery.capacity < 4000) cons.push(`❌ Smaller battery capacity (${s.battery.capacity}mAh)`);
      if (s.performance.ram < 8) cons.push(`❌ Only ${s.performance.ram}GB RAM`);
      if (s.display.refreshRate < 90) cons.push(`❌ Standard ${s.display.refreshRate}Hz display`);
      if (s.performance.storage < 128) cons.push(`❌ Limited ${s.performance.storage}GB storage`);
      
      if (pros.length < 2) pros.push(`✅ Reliable ${phone.brand} build quality`);
      if (cons.length < 2) cons.push(`❌ No major cons identified`);
      
      result[phone.slug] = {
        pros: pros.slice(0, 6),
        cons: cons.slice(0, 6)
      };
    });
    
    return result;
  };

  const generateBestFor = (phones: any[]) => {
    const result: { [key: string]: string[] } = {};
    
    phones.forEach(phone => {
      const categories: string[] = [];
      const s = phone.specs;
      
      if (s.camera.details.includes('108MP') || s.camera.details.includes('200MP')) {
        categories.push('📸 Photography');
      }
      if (s.performance.antutu > 1500000) {
        categories.push('🎮 Gaming');
      }
      if (s.battery.capacity > 5000) {
        categories.push('🔋 Battery Life');
      }
      if (s.display.refreshRate >= 120) {
        categories.push('🎥 Media Consumption');
      }
      if (s.price < 600) {
        categories.push('💰 Budget');
      }
      if (s.display.size > 6.7) {
        categories.push('📱 Productivity');
      }
      if (s.features.waterResistance) {
        categories.push('🏊‍♂️ Outdoor Use');
      }
      
      if (categories.length === 0) {
        categories.push('📱 Everyday Use');
      }
      
      result[phone.slug] = categories.slice(0, 4);
    });
    
    return result;
  };

  const calculateOverallScore = (phones: any[]) => {
    const result: { [key: string]: number } = {};
    
    phones.forEach(phone => {
      const s = phone.specs;
      let score = 0;
      
      // Display (15%)
      score += (s.display.size / 10) * 2;
      score += (s.display.refreshRate / 120) * 5;
      score += (s.display.brightness / 2000) * 5;
      
      // Camera (20%)
      const mp = parseInt(s.camera.details) || 0;
      score += Math.min(mp / 200, 10);
      score += Math.min(s.camera.zoom / 10, 5);
      
      // Performance (25%)
      score += Math.min(s.performance.antutu / 200000, 10);
      score += Math.min(s.performance.geekbench / 1000, 5);
      score += Math.min(s.performance.ram / 16, 5);
      
      // Battery (20%)
      score += Math.min(s.battery.capacity / 1000, 7);
      score += Math.min(s.battery.charging / 50, 5);
      score += s.battery.wireless ? 3 : 0;
      
      // Features (10%)
      const features = Object.values(s.features).filter(Boolean).length;
      score += Math.min(features, 7);
      
      // Value (10%)
      const priceScore = Math.max(0, 10 - (s.price / 200));
      score += priceScore;
      
      result[phone.slug] = Math.round((score / 10) * 10) / 10;
    });
    
    return result;
  };

  const generateDetailedAnalysis = (phones: any[]) => {
    let analysis = '';
    
    phones.forEach((phone, index) => {
      const s = phone.specs;
      analysis += `\n\n📱 ${phone.brand} ${phone.model}:\n`;
      analysis += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      analysis += `📺 Display: ${s.display.size} inches ${s.display.type} with ${s.display.refreshRate}Hz refresh rate\n`;
      analysis += `📸 Camera: ${s.camera.main} (${s.camera.details})\n`;
      analysis += `🎥 Video: ${s.camera.video}\n`;
      analysis += `⚡ Chipset: ${s.performance.chipset}\n`;
      analysis += `💾 RAM: ${s.performance.ram}GB | Storage: ${s.performance.storage}GB\n`;
      analysis += `🔋 Battery: ${s.battery.capacity}mAh with ${s.battery.charging}W charging\n`;
      analysis += `📱 OS: ${phone.os} ${phone.os_version}\n`;
      analysis += `💲 Price: $${s.price}\n`;
      analysis += `⭐ Key Features: ${getKeyFeatures(phone).join(', ')}\n`;
    });
    
    return analysis;
  };

  const getKeyFeatures = (phone: any): string[] => {
    const features: string[] = [];
    const s = phone.specs;
    
    if (s.features.waterResistance) features.push('Water Resistant');
    if (s.features.nfc) features.push('NFC');
    if (s.features.fingerprint) features.push('Fingerprint Sensor');
    if (s.features.faceUnlock) features.push('Face Unlock');
    if (s.display.refreshRate >= 120) features.push(`${s.display.refreshRate}Hz Display`);
    if (s.camera.details.includes('200MP')) features.push('200MP Camera');
    else if (s.camera.details.includes('108MP')) features.push('108MP Camera');
    if (s.battery.charging > 45) features.push(`${s.battery.charging}W Fast Charging`);
    if (s.battery.wireless) features.push('Wireless Charging');
    
    return features.slice(0, 5);
  };

  const generateSummary = (phones: any[], winnerSlug: string) => {
    const winner = phones.find(p => p.slug === winnerSlug);
    if (!winner) return 'Comparison analysis complete.';
    
    const s = winner.specs;
    const otherPhones = phones.filter(p => p.slug !== winnerSlug);
    
    let summary = `🏆 The ${winner.brand} ${winner.model} emerges as the winner in this comparison!\n\n`;
    summary += `✨ Why it wins:\n`;
    summary += `• ${s.camera.details} camera system with ${s.camera.zoom}x zoom\n`;
    summary += `• ${s.performance.chipset} chipset with ${s.performance.antutu} Antutu score\n`;
    summary += `• ${s.battery.capacity}mAh battery with ${s.battery.charging}W charging\n`;
    summary += `• ${s.display.size} inch ${s.display.refreshRate}Hz display\n`;
    
    if (otherPhones.length > 0) {
      summary += `\n📊 Compared to ${otherPhones.map(p => `${p.brand} ${p.model}`).join(' and ')}:\n`;
      otherPhones.forEach(phone => {
        const phoneScore = s.performance.antutu - (phone.specs.performance.antutu || 0);
        if (phoneScore > 0) {
          summary += `• +${phoneScore} points higher Antutu score\n`;
        }
      });
    }
    
    summary += `\n💡 Recommendation: The ${winner.brand} ${winner.model} is the best choice for most users.`;
    
    return summary;
  };

  if (selectedPhones.length < 2) {
    return null;
  }

  return (
    <div className="p-6">
      {isLoading ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#6d4a4a]">AI is analyzing your phones...</p>
          <p className="text-xs text-[#6d4a4a] mt-1">This may take a few seconds</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">
          <p>❌ {error}</p>
          <button
            onClick={generateAIComparison}
            className="mt-4 text-sm text-purple-600 hover:text-purple-800 transition-colors"
          >
            🔄 Try Again
          </button>
        </div>
      ) : aiResult ? (
        <div className="space-y-6">
          {/* Winner */}
          <div className="p-6 bg-gradient-to-r from-green-50 to-green-100/50 rounded-2xl border border-green-200">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <p className="text-sm text-green-600 font-medium">AI RECOMMENDED</p>
                <p className="text-xl font-bold text-green-800">
                  {selectedPhones.find(p => p.slug === aiResult.winner)?.brand}{' '}
                  {selectedPhones.find(p => p.slug === aiResult.winner)?.model}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-2xl font-bold text-green-800">
                  {aiResult.overallScore[aiResult.winner]}/10
                </p>
                <p className="text-xs text-green-600">Overall Score</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 bg-[#fbf8ff] rounded-xl border border-[var(--color-line)]">
            <h4 className="font-semibold text-sm mb-2">📊 Analysis Summary</h4>
            <p className="text-sm text-[#1a1a1a] whitespace-pre-wrap">{aiResult.summary}</p>
          </div>

          {/* Scores */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {selectedPhones.map(phone => {
              const score = aiResult.scores[phone.slug] || 0;
              const isWinner = phone.slug === aiResult.winner;
              return (
                <div
                  key={phone.slug}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    isWinner
                      ? 'border-green-500 bg-green-50'
                      : 'border-[var(--color-line)] bg-white'
                  }`}
                >
                  <p className="text-xs font-medium text-[#6d4a4a] truncate">
                    {phone.brand} {phone.model}
                  </p>
                  <p className={`text-2xl font-bold ${isWinner ? 'text-green-700' : 'text-[#1a1a1a]'}`}>
                    {score}
                  </p>
                  <p className="text-[10px] text-[#6d4a4a]">Total Score</p>
                  {isWinner && (
                    <span className="text-[10px] font-bold text-green-600">⭐ Winner</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedPhones.map(phone => {
              const pc = aiResult.prosCons[phone.slug];
              if (!pc) return null;
              return (
                <div key={phone.slug} className="p-4 bg-white rounded-xl border border-[var(--color-line)]">
                  <h4 className="font-semibold text-sm mb-2">
                    {phone.brand} {phone.model}
                  </h4>
                  <div className="space-y-1">
                    {pc.pros.slice(0, 3).map((pro, idx) => (
                      <p key={idx} className="text-xs text-green-600">{pro}</p>
                    ))}
                    {pc.cons.slice(0, 3).map((con, idx) => (
                      <p key={idx} className="text-xs text-red-500">{con}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Best For */}
          <div className="p-4 bg-[#fbf8ff] rounded-xl border border-[var(--color-line)]">
            <h4 className="font-semibold text-sm mb-2">🎯 Best For</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedPhones.map(phone => {
                const bestFor = aiResult.bestFor[phone.slug];
                if (!bestFor) return null;
                return (
                  <div key={phone.slug}>
                    <p className="text-xs font-medium text-[#1a1a1a]">
                      {phone.brand} {phone.model}
                    </p>
                    <p className="text-xs text-[#6d4a4a]">{bestFor.join(' • ')}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-sm text-blue-800 mb-2">💡 Recommendations</h4>
            {aiResult.recommendations.map((rec, idx) => (
              <p key={idx} className="text-sm text-blue-700 mb-1">{rec}</p>
            ))}
          </div>

          {/* Detailed Analysis */}
          <div className="p-4 bg-[#fbf8ff] rounded-xl border border-[var(--color-line)]">
            <h4 className="font-semibold text-sm mb-2">📋 Detailed Specs Analysis</h4>
            <pre className="text-xs text-[#1a1a1a] whitespace-pre-wrap font-mono bg-white p-4 rounded-xl border border-[var(--color-line)] max-h-96 overflow-y-auto">
              {aiResult.detailedAnalysis}
            </pre>
          </div>

          {/* Regenerate Button */}
          <button
            onClick={generateAIComparison}
            className="w-full py-2 text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
          >
            🔄 Regenerate AI Analysis
          </button>
        </div>
      ) : (
        <div className="text-center py-8 text-[#6d4a4a]">
          <p>Click "Regenerate" to analyze your phones</p>
        </div>
      )}
    </div>
  );
}