// lib/newsData.ts
export interface NewsArticle {
  id: number;
  category: "Breaking" | "Technology" | "Business" | "AI" | "Gadgets" | "Reviews" | "Startups" | "Science" | "Security" | "Gaming";
  title: string;
  headline: string;
  author: string;
  authorBio?: string;
  authorImage?: string;
  date: string;
  updatedDate?: string;
  image: string;
  imageAlt?: string;
  imageCaption?: string;
  excerpt: string;
  content: string;
  isBreaking: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  isSponsored: boolean;
  source: string;
  sourceUrl: string;
  tags: string[];
  comments: number;
  shares: number;
  views: number;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
}

// Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Initial articles data
const initialArticles: NewsArticle[] = [
  {
    id: 1,
    category: "Breaking",
    title: "OpenAI Unveils GPT-5: A New Era of Artificial Intelligence",
    headline: "Revolutionary AI model surpasses human-level reasoning in multiple domains",
    author: "Maya Chen",
    authorBio: "Senior AI Journalist with 8 years of experience covering artificial intelligence and machine learning advancements.",
    authorImage: "https://ui-avatars.com/api/?name=Maya+Chen&background=7F011F&color=fff&size=100",
    date: "July 13, 2026",
    updatedDate: "July 14, 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    imageAlt: "OpenAI GPT-5 AI technology visualization",
    imageCaption: "OpenAI's latest AI model represents a quantum leap in artificial intelligence capabilities.",
    excerpt: "OpenAI has released GPT-5, marking a significant leap forward in artificial intelligence capabilities. The new model demonstrates unprecedented reasoning abilities across scientific, mathematical, and creative tasks.",
    content: `
      <p>OpenAI today announced the release of GPT-5, the latest iteration of its groundbreaking language model. The new system achieves remarkable performance across a wide range of benchmarks, outperforming human experts in fields ranging from quantum physics to creative writing.</p>
      
      <h2>Key Capabilities of GPT-5</h2>
      <ul>
        <li><strong>Advanced Reasoning:</strong> GPT-5 can solve complex mathematical problems and generate scientific hypotheses with 98% accuracy</li>
        <li><strong>Multimodal Understanding:</strong> The model can process and generate text, images, audio, and video seamlessly</li>
        <li><strong>Code Generation:</strong> Improved programming capabilities with support for 50+ programming languages</li>
        <li><strong>Real-time Learning:</strong> Ability to adapt and learn from new information dynamically</li>
        <li><strong>Context Window:</strong> 1 million tokens for massive document processing</li>
      </ul>
      
      <div class="bg-[#f5ebd0]/30 p-6 rounded-2xl my-6 border-l-4 border-[#7F011F]">
        <p class="font-semibold text-[#7F011F]">💡 Industry Impact</p>
        <p class="text-sm text-[#2d1a1a]">This breakthrough is expected to accelerate AI adoption across industries, from healthcare to finance, and could reshape how we approach complex problem-solving. Industry experts predict a 40% increase in AI adoption within the next 12 months.</p>
      </div>
      
      <h2>What This Means for the Future</h2>
      <p>The release of GPT-5 signals a new chapter in AI development. With capabilities that rival human experts, the technology promises to transform education, research, and creative industries. Key sectors expected to benefit include:</p>
      
      <ul>
        <li><strong>Healthcare:</strong> Drug discovery and medical diagnosis</li>
        <li><strong>Education:</strong> Personalized learning experiences</li>
        <li><strong>Finance:</strong> Advanced risk analysis and fraud detection</li>
        <li><strong>Creative Arts:</strong> AI-assisted content creation</li>
      </ul>
      
      <h3>Expert Analysis</h3>
      <p>According to leading AI researchers, GPT-5 represents a fundamental shift in how we interact with technology. The model's ability to understand context and generate human-like responses has reached unprecedented levels. Dr. Sarah Chen, AI Researcher at Stanford, comments:</p>
      
      <blockquote class="border-l-4 border-[#7F011F] pl-4 my-4 italic text-[#4a2a2a]">
        "GPT-5 is not just an incremental improvement; it's a paradigm shift in artificial intelligence. We're seeing capabilities that were thought to be decades away."
      </blockquote>
      
      <h3>What's Next</h3>
      <p>OpenAI has already announced plans for GPT-6, which is expected to focus on emotional intelligence and creative collaboration. The company is also working on making the technology more accessible to developers worldwide through improved APIs and documentation.</p>
      
      <div class="bg-white rounded-2xl p-6 my-6 border border-[rgba(127,1,31,0.06)] shadow-sm">
        <p class="font-semibold text-[#2d1a1a]">📊 Key Statistics</p>
        <ul class="mt-2 text-sm text-[#6d4a4a]">
          <li>• 98.7% accuracy on reasoning tasks</li>
          <li>• 1 million token context window</li>
          <li>• Support for 95+ languages</li>
          <li>• 40% faster inference than GPT-4</li>
        </ul>
      </div>
    `,
    isBreaking: true,
    isFeatured: true,
    isTrending: true,
    isSponsored: false,
    source: "TechWire",
    sourceUrl: "https://techwire.com",
    tags: ["AI", "OpenAI", "GPT-5", "Technology", "Innovation", "Machine Learning"],
    comments: 1247,
    shares: 3421,
    views: 45678,
    slug: "openai-unveils-gpt-5-new-era-artificial-intelligence",
    metaTitle: "OpenAI GPT-5: Revolutionary AI Model Released | Tech News",
    metaDescription: "OpenAI unveils GPT-5 with unprecedented reasoning abilities. Learn how this breakthrough AI model is transforming technology and reshaping industries.",
    metaKeywords: "OpenAI, GPT-5, AI, artificial intelligence, machine learning, technology news, AI breakthrough",
  },
 
  {
  "id": 2,
  "category": "Technology",
  "title": "Apple Vision Pro 2: The Future of Spatial Computing",
  "headline": "Next-gen AR/VR headset delivers unprecedented immersion and productivity",
  "author": "Alex Rivera",
  "authorBio": "Tech reviewer and AR/VR specialist with a focus on immersive technologies and future computing.",
  "authorImage": "https://ui-avatars.com/api/?name=Alex+Rivera&background=7F011F&color=fff&size=100",
  "date": "July 12, 2026",
  "updatedDate": "July 12, 2026",
  "image": "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&q=80",
  "imageAlt": "Apple Vision Pro 2 AR/VR headset in use",
  "imageCaption": "The new Vision Pro 2 features improved optics, lighter design, and advanced AI-powered interactions.",
  "excerpt": "Apple's second-generation Vision Pro headset pushes the boundaries of mixed reality with advanced eye-tracking, spatial audio, and a revolutionary new interface.",
  "content": `
 
    <p class="text-lg leading-relaxed text-[#2d1a1a]">Apple has unveiled the <strong>Vision Pro 2</strong>, a significant upgrade to its spatial computing platform. The new device features improved optics, a lighter design, and groundbreaking AI-powered interactions that redefine what's possible in mixed reality.</p>

    <div class="bg-gradient-to-r from-[#7F011F] to-[#a80a30] text-white p-6 rounded-2xl my-8 shadow-lg">
      <div class="flex items-center gap-3 mb-2">
        <span class="text-2xl">🚀</span>
        <h3 class="text-xl font-bold">Breaking: Vision Pro 2 Launch Details</h3>
      </div>
      <p class="text-sm opacity-95">Apple CEO Tim Cook called this "the most ambitious project in Apple's history." Pre-orders begin July 20, 2026, with shipping starting August 15, 2026.</p>
    </div>

    <h2 class="text-2xl font-bold text-[#2d1a1a] mt-8 mb-4 flex items-center gap-2">
      <span class="text-[#7F011F]">✦</span> Key Features of Vision Pro 2
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div class="bg-white p-5 rounded-xl shadow-sm border border-[rgba(127,1,31,0.08)] hover:shadow-md transition-shadow">
        <div class="text-2xl mb-2">👁️</div>
        <h4 class="font-bold text-[#2d1a1a]">Enhanced Optics</h4>
        <p class="text-sm text-[#6d4a4a]">Higher resolution displays with 4K per eye for crystal-clear visuals</p>
      </div>
      <div class="bg-white p-5 rounded-xl shadow-sm border border-[rgba(127,1,31,0.08)] hover:shadow-md transition-shadow">
        <div class="text-2xl mb-2">⚖️</div>
        <h4 class="font-bold text-[#2d1a1a]">Lighter Design</h4>
        <p class="text-sm text-[#6d4a4a]">30% lighter than the original Vision Pro at just 450g</p>
      </div>
      <div class="bg-white p-5 rounded-xl shadow-sm border border-[rgba(127,1,31,0.08)] hover:shadow-md transition-shadow">
        <div class="text-2xl mb-2">🧠</div>
        <h4 class="font-bold text-[#2d1a1a]">AI Integration</h4>
        <p class="text-sm text-[#6d4a4a]">Intelligent eye-tracking and gesture recognition</p>
      </div>
      <div class="bg-white p-5 rounded-xl shadow-sm border border-[rgba(127,1,31,0.08)] hover:shadow-md transition-shadow">
        <div class="text-2xl mb-2">🔋</div>
        <h4 class="font-bold text-[#2d1a1a]">Extended Battery Life</h4>
        <p class="text-sm text-[#6d4a4a]">Up to 4 hours of continuous use</p>
      </div>
    </div>

    <div class="bg-[#f5ebd0]/30 p-6 rounded-2xl my-8 border-l-4 border-[#7F011F]">
      <p class="font-semibold text-[#7F011F] flex items-center gap-2">
        <span>💡</span> Developer Ecosystem
      </p>
      <p class="text-sm text-[#2d1a1a] mt-1">Apple has announced a new developer kit and SDK, making it easier for creators to build immersive experiences for the Vision Pro platform. Over 10,000 developers are already signed up.</p>
    </div>

    <h2 class="text-2xl font-bold text-[#2d1a1a] mt-8 mb-4 flex items-center gap-2">
      <span class="text-[#7F011F]">✦</span> Performance and Specifications
    </h2>

    <p class="text-[#2d1a1a] mb-4">The Vision Pro 2 is powered by Apple's new R2 chip, designed specifically for spatial computing. Here are the complete specifications:</p>

    <div class="overflow-x-auto my-6 rounded-xl shadow-lg border border-[rgba(127,1,31,0.08)]">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-[#7F011F] text-white">
            <th class="px-4 py-3 text-left font-semibold">Component</th>
            <th class="px-4 py-3 text-left font-semibold">Specification</th>
            <th class="px-4 py-3 text-left font-semibold">Details</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[rgba(127,1,31,0.06)]">
          <tr class="hover:bg-[#f5ebd0]/20 transition-colors">
            <td class="px-4 py-3 font-medium text-[#2d1a1a]">Processor</td>
            <td class="px-4 py-3 text-[#4a2a2a]">Apple R2 Chip</td>
            <td class="px-4 py-3 text-[#4a2a2a]">8-core CPU, 16-core Neural Engine</td>
          </tr>
          <tr class="hover:bg-[#f5ebd0]/20 transition-colors">
            <td class="px-4 py-3 font-medium text-[#2d1a1a]">Memory</td>
            <td class="px-4 py-3 text-[#4a2a2a]">16GB</td>
            <td class="px-4 py-3 text-[#4a2a2a]">Unified memory</td>
          </tr>
          <tr class="hover:bg-[#f5ebd0]/20 transition-colors">
            <td class="px-4 py-3 font-medium text-[#2d1a1a]">Storage</td>
            <td class="px-4 py-3 text-[#4a2a2a]">512GB / 1TB</td>
            <td class="px-4 py-3 text-[#4a2a2a]">NVMe SSD</td>
          </tr>
          <tr class="hover:bg-[#f5ebd0]/20 transition-colors">
            <td class="px-4 py-3 font-medium text-[#2d1a1a]">Display</td>
            <td class="px-4 py-3 text-[#4a2a2a]">Dual 4K OLED</td>
            <td class="px-4 py-3 text-[#4a2a2a]">120Hz refresh rate, HDR support</td>
          </tr>
          <tr class="hover:bg-[#f5ebd0]/20 transition-colors">
            <td class="px-4 py-3 font-medium text-[#2d1a1a]">Sensors</td>
            <td class="px-4 py-3 text-[#4a2a2a]">12 Cameras</td>
            <td class="px-4 py-3 text-[#4a2a2a]">5 sensors, 6 microphones</td>
          </tr>
          <tr class="hover:bg-[#f5ebd0]/20 transition-colors">
            <td class="px-4 py-3 font-medium text-[#2d1a1a]">Battery Life</td>
            <td class="px-4 py-3 text-[#4a2a2a]">4 Hours</td>
            <td class="px-4 py-3 text-[#4a2a2a]">Continuous use, 2-hour charge time</td>
          </tr>
          <tr class="hover:bg-[#f5ebd0]/20 transition-colors">
            <td class="px-4 py-3 font-medium text-[#2d1a1a]">Weight</td>
            <td class="px-4 py-3 text-[#4a2a2a]">450g</td>
            <td class="px-4 py-3 text-[#4a2a2a]">30% lighter than original</td>
          </tr>
        </tbody>
      </table>
    </div>

    <figure class="my-8 rounded-2xl overflow-hidden shadow-xl">
      <img src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=1200&q=80" alt="Apple Vision Pro 2 user experience" class="w-full h-auto" />
      <figcaption class="text-sm text-[#6d4a4a] p-3 bg-[#f5ebd0]/20 italic">Users can seamlessly transition between VR and AR modes for work and entertainment</figcaption>
    </figure>

    <h3 class="text-xl font-bold text-[#2d1a1a] mt-8 mb-3">User Experience</h3>
    <p class="text-[#2d1a1a]">Early reviews highlight the intuitive user interface and seamless integration with Apple's ecosystem. Users can seamlessly transition between VR and AR modes, making the Vision Pro 2 suitable for both work and entertainment.</p>

    <blockquote class="border-l-4 border-[#7F011F] pl-6 my-6 py-2 bg-[#f5ebd0]/20 rounded-r-xl">
      <p class="italic text-[#2d1a1a] text-lg">"The Vision Pro 2 is the most advanced consumer VR/AR device ever created. It's not just a headset; it's a new computing platform."</p>
      <footer class="text-sm font-semibold text-[#7F011F] mt-2">— Tim Cook, Apple CEO</footer>
    </blockquote>

    <h3 class="text-xl font-bold text-[#2d1a1a] mt-8 mb-3">Pricing and Availability</h3>
    <p class="text-[#2d1a1a] mb-4">The Vision Pro 2 will be available starting at <strong>$3,499</strong>, with pre-orders opening on <strong>July 20, 2026</strong>. The device will be available in 30 countries at launch.</p>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
      <div class="bg-[#7F011F] text-white p-4 rounded-xl text-center">
        <div class="text-2xl font-bold">$3,499</div>
        <div class="text-sm opacity-90">Base Model</div>
      </div>
      <div class="bg-[#a80a30] text-white p-4 rounded-xl text-center">
        <div class="text-2xl font-bold">$3,999</div>
        <div class="text-sm opacity-90">512GB Model</div>
      </div>
      <div class="bg-[#2d1a1a] text-white p-4 rounded-xl text-center">
        <div class="text-2xl font-bold">$4,499</div>
        <div class="text-sm opacity-90">1TB Model</div>
      </div>
    </div>

    <div class="bg-[#f5ebd0]/40 p-6 rounded-2xl my-6 border border-[rgba(127,1,31,0.1)]">
      <h4 class="font-bold text-[#2d1a1a] flex items-center gap-2">
        <span>📦</span> What's in the Box
      </h4>
      <ul class="list-disc pl-6 mt-2 space-y-1 text-sm text-[#4a2a2a]">
        <li>Apple Vision Pro 2 headset</li>
        <li>Dual Loop Band and Solo Knit Band</li>
        <li>Light Seal and two Light Seal cushions</li>
        <li>Apple Vision Pro 2 Battery Pack</li>
        <li>USB-C Charge Cable and Power Adapter</li>
        <li>Vision Pro 2 Travel Case</li>
      </ul>
    </div>

    <div class="flex flex-wrap gap-2 my-6">
      <span class="bg-[#7F011F]/10 text-[#7F011F] px-3 py-1 rounded-full text-xs font-medium">#Apple</span>
      <span class="bg-[#7F011F]/10 text-[#7F011F] px-3 py-1 rounded-full text-xs font-medium">#ARVR</span>
      <span class="bg-[#7F011F]/10 text-[#7F011F] px-3 py-1 rounded-full text-xs font-medium">#SpatialComputing</span>
      <span class="bg-[#7F011F]/10 text-[#7F011F] px-3 py-1 rounded-full text-xs font-medium">#VisionPro</span>
      <span class="bg-[#7F011F]/10 text-[#7F011F] px-3 py-1 rounded-full text-xs font-medium">#MixedReality</span>
    </div>

    <div class="bg-[#2d1a1a] text-white p-6 rounded-2xl my-8">
      <div class="flex items-center gap-3 mb-2">
        <img src="https://ui-avatars.com/api/?name=Alex+Rivera&background=7F011F&color=fff&size=60" alt="Alex Rivera" class="w-12 h-12 rounded-full" />
        <div>
          <p class="font-bold">About the Author</p>
          <p class="text-sm opacity-80">Alex Rivera</p>
        </div>
      </div>
      <p class="text-sm opacity-90">Tech reviewer and AR/VR specialist with a focus on immersive technologies and future computing. Alex has been covering emerging technologies for over 8 years.</p>
    </div>
  `,
  "isBreaking": false,
  "isFeatured": true,
  "isTrending": true,
  "isSponsored": false,
  "source": "TechInsider",
  "sourceUrl": "https://techinsider.com",
  "tags": ["Apple", "AR/VR", "Spatial Computing", "Vision Pro", "Technology", "Mixed Reality"],
  "comments": 856,
  "shares": 2190,
  "views": 32456,
  "slug": "apple-vision-pro-2-future-spatial-computing",
  "metaTitle": "Apple Vision Pro 2: Next-Gen AR/VR Headset Review | Tech News",
  "metaDescription": "Apple Vision Pro 2 delivers unprecedented immersion with enhanced optics, AI integration, and spatial computing capabilities. Full review and specs.",
  "metaKeywords": "Apple Vision Pro 2, AR headset, VR headset, spatial computing, mixed reality, Apple, tech news"
},
  {
    id: 3,
    category: "Business",
    title: "Tesla's Battery Breakthrough: 1,000-Mile Range Achieved",
    headline: "New solid-state battery technology could revolutionize the EV industry",
    author: "Sarah Johnson",
    authorBio: "Business and technology journalist focusing on renewable energy, electric vehicles, and sustainable innovation.",
    authorImage: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=7F011F&color=fff&size=100",
    date: "July 11, 2026",
    updatedDate: "July 11, 2026",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&q=80",
    imageAlt: "Tesla electric vehicle battery technology",
    imageCaption: "Tesla's new solid-state battery technology promises 1,000-mile range and faster charging times.",
    excerpt: "Tesla announces a major breakthrough in battery technology, promising electric vehicles with unprecedented range and faster charging times.",
    content: `
      <p>Tesla has achieved a significant milestone in battery technology with the development of a new solid-state battery that delivers over 1,000 miles of range on a single charge.</p>
      
      <h2>Technical Specifications</h2>
      <ul>
        <li><strong>Range:</strong> 1,000+ miles per charge</li>
        <li><strong>Charging Time:</strong> 80% in just 15 minutes</li>
        <li><strong>Lifespan:</strong> 2 million miles (over 20 years of use)</li>
        <li><strong>Safety:</strong> Non-flammable solid-state design</li>
        <li><strong>Cost:</strong> 30% cheaper to produce than current batteries</li>
      </ul>
      
      <div class="bg-[#f5ebd0]/30 p-6 rounded-2xl my-6 border-l-4 border-[#7F011F]">
        <p class="font-semibold text-[#7F011F]">💰 Market Impact</p>
        <p class="text-sm text-[#2d1a1a]">This breakthrough could accelerate the transition to electric vehicles, potentially making EVs more affordable and accessible to a wider audience. Tesla stock surged 15% following the announcement.</p>
      </div>
      
      <h2>Industry Implications</h2>
      <p>The new battery technology could transform several industries beyond automotive:</p>
      
      <ul>
        <li><strong>Grid Storage:</strong> Renewable energy storage solutions</li>
        <li><strong>Aviation:</strong> Electric aircraft development</li>
        <li><strong>Maritime:</strong> Electric shipping vessels</li>
        <li><strong>Consumer Electronics:</strong> Longer-lasting devices</li>
      </ul>
      
      <h3>Production Timeline</h3>
      <p>Tesla plans to begin mass production of the new batteries in 2027, with initial deployment in the Cybertruck and future vehicle models. The company has already secured raw materials for 10 million batteries.</p>
      
      <blockquote class="border-l-4 border-[#7F011F] pl-4 my-4 italic text-[#4a2a2a]">
        "This is the most significant breakthrough in battery technology since the invention of the lithium-ion battery." - Elon Musk, Tesla CEO
      </blockquote>
    `,
    isBreaking: false,
    isFeatured: false,
    isTrending: true,
    isSponsored: false,
    source: "Business Daily",
    sourceUrl: "https://businessdaily.com",
    tags: ["Tesla", "EV", "Battery", "Sustainability", "Innovation", "Electric Vehicles"],
    comments: 634,
    shares: 1543,
    views: 23456,
    slug: "tesla-battery-breakthrough-1000-mile-range",
    metaTitle: "Tesla Battery Breakthrough: 1,000-Mile Range Achieved | Tech News",
    metaDescription: "Tesla announces revolutionary solid-state battery technology with 1,000-mile range and 15-minute charging. Learn about the future of electric vehicles.",
    metaKeywords: "Tesla, battery breakthrough, solid-state battery, EV range, electric vehicles, sustainable energy",
  },
  {
    id: 4,
    category: "AI",
    title: "Google DeepMind's AlphaFold 3: Decoding Life's Mysteries",
    headline: "New AI system predicts protein structures with atomic-level accuracy",
    author: "Dr. James Wilson",
    authorBio: "Science and technology writer with a PhD in molecular biology, covering the intersection of AI and biological research.",
    authorImage: "https://ui-avatars.com/api/?name=James+Wilson&background=7F011F&color=fff&size=100",
    date: "July 10, 2026",
    updatedDate: "July 10, 2026",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80",
    imageAlt: "AlphaFold 3 protein structure prediction visualization",
    imageCaption: "AlphaFold 3 can predict the structure of nearly all known proteins with atomic-level accuracy.",
    excerpt: "DeepMind's latest AI system, AlphaFold 3, has achieved remarkable accuracy in predicting protein structures, opening new frontiers in drug discovery and medical research.",
    content: `
      <p>Google DeepMind has released AlphaFold 3, the most advanced protein structure prediction system to date. The AI can now predict the structure of nearly all known proteins with atomic-level accuracy.</p>
      
      <h2>Key Achievements</h2>
      <ul>
        <li><strong>98.5% accuracy</strong> in protein structure prediction</li>
        <li><strong>Coverage:</strong> All 200 million+ known proteins in the human body</li>
        <li><strong>Speed:</strong> Predictions in minutes instead of years</li>
        <li><strong>Applications:</strong> Drug discovery, disease research, and more</li>
        <li><strong>Integration:</strong> Seamless API for researchers worldwide</li>
      </ul>
      
      <div class="bg-[#f5ebd0]/30 p-6 rounded-2xl my-6 border-l-4 border-[#7F011F]">
        <p class="font-semibold text-[#7F011F]">🧬 Medical Breakthroughs</p>
        <p class="text-sm text-[#2d1a1a]">This technology is expected to accelerate drug discovery significantly, potentially leading to cures for diseases that have plagued humanity for centuries. Several pharmaceutical companies have already signed partnerships with DeepMind.</p>
      </div>
      
      <h2>How AlphaFold 3 Works</h2>
      <p>The system uses a novel deep learning architecture that incorporates evolutionary information and physical constraints to predict protein structures with unprecedented accuracy. Key innovations include:</p>
      
      <ul>
        <li><strong>Transformer Architecture:</strong> Advanced neural network for sequence analysis</li>
        <li><strong>Evolutionary Data:</strong> Training on millions of protein sequences</li>
        <li><strong>Physics-Based Constraints:</strong> Molecular dynamics simulations</li>
        <li><strong>Confidence Scoring:</strong> Accurate uncertainty estimation</li>
      </ul>
      
      <h3>Real-World Applications</h3>
      <p>Researchers are already using AlphaFold 3 for groundbreaking work in various fields:</p>
      <ul>
        <li><strong>Drug Discovery:</strong> Identifying drug targets for diseases</li>
        <li><strong>Synthetic Biology:</strong> Engineering new proteins</li>
        <li><strong>Environmental Science:</strong> Understanding ecosystems</li>
        <li><strong>Agriculture:</strong> Improving crop resilience</li>
      </ul>
      
      <blockquote class="border-l-4 border-[#7F011F] pl-4 my-4 italic text-[#4a2a2a]">
        "AlphaFold 3 is transforming how we understand the building blocks of life. It's one of the most significant scientific achievements of the decade." - Dr. Demis Hassabis, DeepMind CEO
      </blockquote>
    `,
    isBreaking: false,
    isFeatured: false,
    isTrending: true,
    isSponsored: false,
    source: "Science Today",
    sourceUrl: "https://sciencetoday.com",
    tags: ["AI", "DeepMind", "Biology", "Science", "AlphaFold", "Research"],
    comments: 443,
    shares: 1289,
    views: 18976,
    slug: "google-deepmind-alphafold-3-decoding-life-mysteries",
    metaTitle: "AlphaFold 3: Google DeepMind's Protein Prediction Breakthrough | Tech News",
    metaDescription: "AlphaFold 3 achieves atomic-level accuracy in protein structure prediction, revolutionizing drug discovery and medical research. Full analysis.",
    metaKeywords: "AlphaFold 3, DeepMind, protein structure, AI biology, drug discovery, Google AI",
  },
  {
    id: 5,
    category: "Gadgets",
    title: "Samsung Galaxy Z Fold 7: The Ultimate Foldable Experience",
    headline: "New foldable phone combines productivity with premium design",
    author: "Mike Chen",
    authorBio: "Mobile tech reviewer with 10 years of experience testing smartphones, tablets, and wearable devices.",
    authorImage: "https://ui-avatars.com/api/?name=Mike+Chen&background=7F011F&color=fff&size=100",
    date: "July 9, 2026",
    updatedDate: "July 9, 2026",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80",
    imageAlt: "Samsung Galaxy Z Fold 7 foldable smartphone",
    imageCaption: "The Galaxy Z Fold 7 features a redesigned hinge, improved display, and enhanced multitasking capabilities.",
    excerpt: "Samsung's latest foldable smartphone pushes the boundaries of mobile technology with a larger display, improved hinge design, and enhanced multitasking capabilities.",
    content: `
      <p>Samsung has unveiled the Galaxy Z Fold 7, its most advanced foldable phone to date. The device features a redesigned hinge, improved display technology, and AI-powered multitasking that redefines the foldable experience.</p>
      
      <h2>Key Specifications</h2>
      <ul>
        <li><strong>Display:</strong> 7.8-inch foldable AMOLED with 120Hz refresh rate</li>
        <li><strong>Processor:</strong> Snapdragon 8 Gen 4 for Galaxy</li>
        <li><strong>RAM:</strong> 16GB LPDDR5X</li>
        <li><strong>Storage:</strong> 512GB / 1TB options</li>
        <li><strong>Battery:</strong> 5,200mAh with 45W fast charging</li>
        <li><strong>Cameras:</strong> 50MP main, 12MP ultra-wide, 10MP telephoto</li>
      </ul>
      
      <div class="bg-[#f5ebd0]/30 p-6 rounded-2xl my-6 border-l-4 border-[#7F011F]">
        <p class="font-semibold text-[#7F011F]">📱 Productivity Features</p>
        <p class="text-sm text-[#2d1a1a]">The Z Fold 7 includes enhanced multitasking features, allowing users to run up to 4 apps simultaneously and seamlessly transition between folded and unfolded modes. DeX support adds desktop-like productivity.</p>
      </div>
      
      <h2>Design and Build</h2>
      <p>The Galaxy Z Fold 7 features a premium titanium frame with Gorilla Glass Armor 2 for superior durability. The new hinge design reduces the crease visibility by 60% compared to previous models.</p>
      
      <ul>
        <li><strong>Materials:</strong> Titanium frame, Gorilla Glass Armor 2</li>
        <li><strong>Water Resistance:</strong> IP48 rating</li>
        <li><strong>Weight:</strong> 248g (10% lighter than Z Fold 6)</li>
        <li><strong>Colors:</strong> Phantom Black, Cream, Navy, Burgundy</li>
      </ul>
      
      <h3>Camera System</h3>
      <p>The Z Fold 7 features Samsung's most advanced camera system, with AI-enhanced photography and video capabilities.</p>
      <ul>
        <li><strong>Main Camera:</strong> 50MP with OIS and 8K video</li>
        <li><strong>Ultra-Wide:</strong> 12MP with 120° field of view</li>
        <li><strong>Telephoto:</strong> 10MP with 3x optical zoom</li>
        <li><strong>Selfie Camera:</strong> 10MP under-display camera</li>
      </ul>
      
      <blockquote class="border-l-4 border-[#7F011F] pl-4 my-4 italic text-[#4a2a2a]">
        "The Galaxy Z Fold 7 is the most refined foldable phone Samsung has ever made. It's a productivity powerhouse that feels like the future of mobile computing." - TM Roh, Samsung President
      </blockquote>
    `,
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    isSponsored: false,
    source: "Gadget Review",
    sourceUrl: "https://gadgetreview.com",
    tags: ["Samsung", "Foldable", "Smartphones", "5G", "Galaxy Z Fold 7", "Tech"],
    comments: 321,
    shares: 876,
    views: 15678,
    slug: "samsung-galaxy-z-fold-7-ultimate-foldable-experience",
    metaTitle: "Samsung Galaxy Z Fold 7: Ultimate Foldable Phone Review | Tech News",
    metaDescription: "Samsung Galaxy Z Fold 7 review with full specs, features, and price. The most advanced foldable smartphone with improved hinge and multitasking.",
    metaKeywords: "Samsung Galaxy Z Fold 7, foldable phone, Samsung, smartphone review, foldable technology, mobile tech",
  },
  {
    id: 6,
    category: "Startups",
    title: "This Startup Is Revolutionizing Space Travel",
    headline: "New space company aims to make orbital travel accessible to everyone",
    author: "Emily Park",
    authorBio: "Startup and innovation journalist covering emerging technologies, space exploration, and disruptors shaping the future.",
    authorImage: "https://ui-avatars.com/api/?name=Emily+Park&background=7F011F&color=fff&size=100",
    date: "July 8, 2026",
    updatedDate: "July 8, 2026",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&q=80",
    imageAlt: "Space startup rocket launch concept",
    imageCaption: "The startup's innovative reusable rocket technology could make orbital travel accessible to everyone.",
    excerpt: "A new startup is challenging the status quo in space exploration with innovative rocket technology and ambitious plans for commercial space travel.",
    content: `
      <p>A groundbreaking startup, OrbitalX, is revolutionizing space travel with innovative rocket technology that could make orbital travel accessible to everyone. The company has already raised $500 million in Series A funding.</p>
      
      <h2>Key Innovations</h2>
      <ul>
        <li><strong>Reusable Rockets:</strong> 100% reusable rocket technology</li>
        <li><strong>Cost Reduction:</strong> 90% reduction in launch costs</li>
        <li><strong>Rapid Reuse:</strong> 24-hour turnaround time</li>
        <li><strong>Environmental Impact:</strong> Carbon-neutral launches</li>
        <li><strong>AI Navigation:</strong> Autonomous landing and launch</li>
      </ul>
      
      <div class="bg-[#f5ebd0]/30 p-6 rounded-2xl my-6 border-l-4 border-[#7F011F]">
        <p class="font-semibold text-[#7F011F]">🚀 Future Plans</p>
        <p class="text-sm text-[#2d1a1a]">The company aims to establish a commercial space station by 2030 and offer regular orbital flights to the public. Plans include space tourism, research missions, and satellite deployment.</p>
      </div>
      
      <h2>The Technology Behind It</h2>
      <p>OrbitalX's rocket system uses advanced materials and AI-controlled engines for unprecedented efficiency and safety.</p>
      <ul>
        <li><strong>Propulsion:</strong> Methalox engines with 3D-printed components</li>
        <li><strong>Materials:</strong> Carbon-fiber composite for reduced weight</li>
        <li><strong>Navigation:</strong> AI-powered autonomous flight systems</li>
        <li><strong>Landing:</strong> Precision vertical landing within 1 meter accuracy</li>
      </ul>
      
      <h3>Commercial Applications</h3>
      <p>The startup's technology has numerous commercial applications:</p>
      <ul>
        <li><strong>Satellite Deployment:</strong> Cost-effective satellite launches</li>
        <li><strong>Space Tourism:</strong> Orbital flights for civilians</li>
        <li><strong>Research:</strong> Microgravity experiments</li>
        <li><strong>Manufacturing:</strong> Zero-gravity manufacturing</li>
      </ul>
      
      <blockquote class="border-l-4 border-[#7F011F] pl-4 my-4 italic text-[#4a2a2a]">
        "We're not just building rockets; we're building the infrastructure for humanity's future in space." - Sarah Lin, OrbitalX CEO
      </blockquote>
    `,
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    isSponsored: false,
    source: "Startup Insider",
    sourceUrl: "https://startupinsider.com",
    tags: ["Space", "Startups", "Innovation", "Technology", "Space Travel", "OrbitalX"],
    comments: 298,
    shares: 654,
    views: 12456,
    slug: "startup-revolutionizing-space-travel-orbitalx",
    metaTitle: "OrbitalX: Startup Revolutionizing Space Travel | Tech News",
    metaDescription: "OrbitalX's innovative reusable rocket technology could make orbital travel accessible to everyone. Learn about the future of space exploration.",
    metaKeywords: "space travel, orbitalX, space startup, reusable rockets, commercial space, innovation",
  },
  {
    id: 7,
    category: "Reviews",
    title: "Sony WH-1000XM6: The Best Noise-Canceling Headphones?",
    headline: "Sony's latest flagship headphones deliver exceptional audio quality",
    author: "David Kim",
    authorBio: "Audio technology reviewer with expertise in headphones, speakers, and professional audio equipment.",
    authorImage: "https://ui-avatars.com/api/?name=David+Kim&background=7F011F&color=fff&size=100",
    date: "July 7, 2026",
    updatedDate: "July 7, 2026",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80",
    imageAlt: "Sony WH-1000XM6 noise-canceling headphones",
    imageCaption: "The Sony WH-1000XM6 offers industry-leading noise cancellation and superior sound quality.",
    excerpt: "The new Sony WH-1000XM6 headphones offer industry-leading noise cancellation and superior sound quality in a refined, comfortable design.",
    content: `
      <p>Sony has released its latest premium noise-canceling headphones, the WH-1000XM6, building on the success of the WH-1000XM5. The new model features improved ANC, better battery life, and a more comfortable design.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li><strong>Noise Cancellation:</strong> Industry-leading ANC technology</li>
        <li><strong>Battery Life:</strong> 40 hours with ANC on</li>
        <li><strong>Sound Quality:</strong> Hi-Res Audio certified</li>
        <li><strong>Design:</strong> Ergonomic, comfortable for all-day use</li>
        <li><strong>Connectivity:</strong> Bluetooth 5.3 with LDAC support</li>
      </ul>
      
      <div class="bg-[#f5ebd0]/30 p-6 rounded-2xl my-6 border-l-4 border-[#7F011F]">
        <p class="font-semibold text-[#7F011F]">🎵 Audio Experience</p>
        <p class="text-sm text-[#2d1a1a]">The WH-1000XM6 delivers an immersive audio experience with deep bass, clear mids, and crisp highs, making it perfect for music lovers and professionals alike. The new DSEE Extreme upscaling technology enhances compressed audio.</p>
      </div>
      
      <h2>Performance Analysis</h2>
      <p>Our testing reveals impressive performance across all categories:</p>
      <ul>
        <li><strong>Noise Cancellation:</strong> 99.5% background noise reduction</li>
        <li><strong>Sound Quality:</strong> Excellent frequency response (4Hz-40kHz)</li>
        <li><strong>Comfort:</strong> 5/5 for extended wear</li>
        <li><strong>Call Quality:</strong> Crystal clear with AI noise reduction</li>
      </ul>
      
      <h3>Comparison with Competitors</h3>
      <p>Compared to the Bose QC45 and Apple AirPods Max, the Sony WH-1000XM6 offers superior noise cancellation and better battery life at a more competitive price point.</p>
      
      <blockquote class="border-l-4 border-[#7F011F] pl-4 my-4 italic text-[#4a2a2a]">
        "The WH-1000XM6 is the new gold standard for wireless noise-canceling headphones. It's an audiophile's dream." - What Hi-Fi
      </blockquote>
      
      <h3>Pricing and Availability</h3>
      <p>The Sony WH-1000XM6 is available now for $399, with options for Silver or Black finishes.</p>
    `,
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    isSponsored: false,
    source: "Audio Review",
    sourceUrl: "https://audioreview.com",
    tags: ["Sony", "Audio", "Headphones", "Reviews", "Noise Cancellation", "Tech"],
    comments: 234,
    shares: 567,
    views: 9876,
    slug: "sony-wh-1000xm6-best-noise-canceling-headphones-review",
    metaTitle: "Sony WH-1000XM6 Review: Best Noise-Canceling Headphones | Tech News",
    metaDescription: "Sony WH-1000XM6 review with full specs, features, and comparison. Industry-leading noise cancellation and superior sound quality.",
    metaKeywords: "Sony WH-1000XM6, noise-canceling headphones, Sony headphones, audio review, best headphones 2026",
  },
  {
    id: 8,
    category: "Science",
    title: "Quantum Computing Breakthrough: A New Era of Computing",
    headline: "IBM achieves quantum advantage with 1,000+ qubit processor",
    author: "Dr. Lisa Wang",
    authorBio: "Quantum computing researcher and science writer, covering advances in quantum technology and their real-world applications.",
    authorImage: "https://ui-avatars.com/api/?name=Lisa+Wang&background=7F011F&color=fff&size=100",
    date: "July 6, 2026",
    updatedDate: "July 6, 2026",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
    imageAlt: "Quantum computing processor concept",
    imageCaption: "IBM's 1,121-qubit quantum processor achieves quantum advantage.",
    excerpt: "IBM has achieved a major milestone in quantum computing, demonstrating a processor with over 1,000 qubits capable of performing calculations impossible for classical computers.",
    content: `
      <p>IBM has reached a significant milestone in quantum computing with the development of a 1,121-qubit processor. The quantum processor successfully demonstrated quantum advantage in multiple applications.</p>
      
      <h2>Technical Achievements</h2>
      <ul>
        <li><strong>Qubits:</strong> 1,121 superconducting qubits</li>
        <li><strong>Coherence Time:</strong> 100 microseconds</li>
        <li><strong>Gate Fidelity:</strong> 99.9%</li>
        <li><strong>Applications:</strong> Drug discovery, materials science, optimization</li>
        <li><strong>Error Correction:</strong> Advanced surface code implementation</li>
      </ul>
      
      <div class="bg-[#f5ebd0]/30 p-6 rounded-2xl my-6 border-l-4 border-[#7F011F]">
        <p class="font-semibold text-[#7F011F]">⚛️ Future Implications</p>
        <p class="text-sm text-[#2d1a1a]">This breakthrough could lead to the development of quantum computers that can solve problems currently impossible for classical computers, revolutionizing industries from healthcare to finance.</p>
      </div>
      
      <h2>How Quantum Computing Works</h2>
      <p>Quantum computers use quantum bits (qubits) that can exist in multiple states simultaneously, enabling them to perform complex calculations much faster than classical computers.</p>
      <ul>
        <li><strong>Superposition:</strong> Qubits in multiple states at once</li>
        <li><strong>Entanglement:</strong> Linked qubits for complex calculations</li>
        <li><strong>Interference:</strong> Quantum states combined for precise results</li>
        <li><strong>Error Correction:</strong> Maintaining quantum state integrity</li>
      </ul>
      
      <h3>Real-World Applications</h3>
      <p>This technology has transformative potential across industries:</p>
      <ul>
        <li><strong>Healthcare:</strong> Drug design and molecular simulation</li>
        <li><strong>Finance:</strong> Portfolio optimization and risk analysis</li>
        <li><strong>Climate:</strong> Climate modeling and prediction</li>
        <li><strong>Cryptography:</strong> Advanced security protocols</li>
      </ul>
      
      <blockquote class="border-l-4 border-[#7F011F] pl-4 my-4 italic text-[#4a2a2a]">
        "We've entered the era of quantum computing. This is the beginning of a new chapter in human computation." - Dr. Arvind Krishna, IBM CEO
      </blockquote>
    `,
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    isSponsored: false,
    source: "Quantum Today",
    sourceUrl: "https://quantumtoday.com",
    tags: ["Quantum", "IBM", "Science", "Computing", "Technology", "Innovation"],
    comments: 187,
    shares: 432,
    views: 8765,
    slug: "ibm-quantum-computing-breakthrough-1000-qubits",
    metaTitle: "IBM Quantum Computing Breakthrough: 1,000+ Qubits | Tech News",
    metaDescription: "IBM achieves quantum advantage with 1,121-qubit processor. Learn how this breakthrough is revolutionizing computing across industries.",
    metaKeywords: "quantum computing, IBM quantum, qubits, quantum advantage, quantum technology, science",
  },
  {
    id: 9,
    category: "Technology",
    title: "Google's Gemini 2: The Next Generation of AI",
    headline: "Google's new AI model promises to reshape the future of technology",
    author: "Alex Rivera",
    authorBio: "Technology journalist covering AI, Google, and emerging technologies shaping the digital landscape.",
    authorImage: "https://ui-avatars.com/api/?name=Alex+Rivera&background=7F011F&color=fff&size=100",
    date: "July 5, 2026",
    updatedDate: "July 5, 2026",
    image: "https://ui-avatars.com/api/?name=Alex+Rivera&background=7F011F&color=fff&size=100",
    imageAlt: "Google Gemini 2 AI technology visualization",
    imageCaption: "Google's Gemini 2 brings advanced AI capabilities to search, cloud, and enterprise applications.",
    excerpt: "Google has unveiled Gemini 2, its most advanced AI model yet, with capabilities that rival OpenAI's GPT-5. The model promises to transform search, cloud computing, and enterprise applications.",
    content: `
      <p>Google has unveiled Gemini 2, its most advanced AI model yet, with capabilities that rival OpenAI's GPT-5. The model promises to transform search, cloud computing, and enterprise applications.</p>
      
      <h2>Key Features of Gemini 2</h2>
      <ul>
        <li><strong>Multimodal Understanding:</strong> Process text, images, audio, and video</li>
        <li><strong>Advanced Reasoning:</strong> Complex problem-solving capabilities</li>
        <li><strong>Code Generation:</strong> Support for 30+ programming languages</li>
        <li><strong>Search Integration:</strong> Real-time information retrieval</li>
        <li><strong>Enterprise Ready:</strong> Secure and scalable deployment</li>
      </ul>
      
      <div class="bg-[#f5ebd0]/30 p-6 rounded-2xl my-6 border-l-4 border-[#7F011F]">
        <p class="font-semibold text-[#7F011F]">🔍 Search Revolution</p>
        <p class="text-sm text-[#2d1a1a]">Gemini 2 powers a new generation of search experiences, enabling conversational queries and personalized results that understand context and intent better than ever before.</p>
      </div>
      
      <h2>Comparison with GPT-5</h2>
      <p>Both models have unique strengths, but Gemini 2 excels in search integration and multimodal understanding.</p>
      <ul>
        <li><strong>Search Integration:</strong> Real-time information retrieval</li>
        <li><strong>Multimodal:</strong> Superior audio and video understanding</li>
        <li><strong>Enterprise:</strong> Better security and compliance features</li>
        <li><strong>Cost:</strong> More efficient inference</li>
      </ul>
      
      <h3>Availability</h3>
      <p>Gemini 2 is available now through Google Cloud and will be integrated into Google Search and Workspace in the coming months.</p>
      
      <blockquote class="border-l-4 border-[#7F011F] pl-4 my-4 italic text-[#4a2a2a]">
        "Gemini 2 represents a significant leap forward in AI technology. It's the most capable AI system ever created." - Sundar Pichai, Google CEO
      </blockquote>
    `,
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    isSponsored: false,
    source: "Tech Insider",
    sourceUrl: "https://techinsider.com",
    tags: ["Google", "AI", "Gemini 2", "Technology", "Search", "Innovation"],
    comments: 543,
    shares: 876,
    views: 14567,
    slug: "google-gemini-2-next-generation-ai",
    metaTitle: "Google Gemini 2: Next-Generation AI Model Released | Tech News",
    metaDescription: "Google unveils Gemini 2 with advanced multimodal capabilities and search integration. Learn how this AI model is reshaping technology.",
    metaKeywords: "Google Gemini 2, AI model, Google AI, multimodal AI, enterprise AI, search AI",
  },

  // lib/newsData.ts - Updated content for article 10 (ONLY content, no duplicates)

{
  id: 10,
  category: "Security",
  title: "Cyber Security 2026: Protecting Your Digital Life",
  headline: "Essential tips and strategies for staying safe online in the age of AI",
  author: "Jessica Park",
  authorBio: "Cyber security expert and writer with 12 years of experience in network security and data protection.",
  authorImage: "https://ui-avatars.com/api/?name=Jessica+Park&background=7F011F&color=fff&size=100",
  date: "July 4, 2026",
  updatedDate: "July 4, 2026",
  image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
  imageAlt: "Cyber security concept with digital protection",
  imageCaption: "AI-powered threats require advanced security measures. Learn how to protect your digital life.",
  excerpt: "As AI-powered threats evolve, cyber security becomes more critical than ever. Learn essential strategies to protect your digital identity and data.",
  
  // ✅ ONLY CONTENT - NO TITLE, NO HEADLINE, NO TAGS DUPLICATED
  content: `
    <!-- Introduction -->
    <p class="text-lg leading-relaxed mb-6 text-[#2d1a1a]">
      As AI-powered threats become more sophisticated, protecting your digital life requires a comprehensive security strategy. Here are essential tips for staying safe online in 2026.
    </p>

    <!-- Section 1: Essential Security Practices -->
    <div class="bg-white rounded-2xl p-6 mb-8 border border-[rgba(127,1,31,0.06)] shadow-sm hover:shadow-md transition-shadow">
      <h2 class="text-2xl font-bold text-[#2d1a1a] mb-4 flex items-center gap-3 font-['Poppins',sans-serif]">
        <span class="w-8 h-8 rounded-lg bg-[#7F011F]/10 flex items-center justify-center text-[#7F011F] text-sm">1</span>
        Essential Security Practices
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-[#f5ebd0]/20 transition-colors">
          <span class="w-6 h-6 rounded-full bg-[#7F011F]/10 flex items-center justify-center text-[#7F011F] text-xs flex-shrink-0">✓</span>
          <div>
            <strong class="text-[#2d1a1a] block">Strong Passwords</strong>
            <span class="text-sm text-[#6d4a4a]">Use unique, complex passwords for each account</span>
          </div>
        </div>
        <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-[#f5ebd0]/20 transition-colors">
          <span class="w-6 h-6 rounded-full bg-[#7F011F]/10 flex items-center justify-center text-[#7F011F] text-xs flex-shrink-0">✓</span>
          <div>
            <strong class="text-[#2d1a1a] block">Two-Factor Authentication</strong>
            <span class="text-sm text-[#6d4a4a]">Enable 2FA on all critical accounts</span>
          </div>
        </div>
        <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-[#f5ebd0]/20 transition-colors">
          <span class="w-6 h-6 rounded-full bg-[#7F011F]/10 flex items-center justify-center text-[#7F011F] text-xs flex-shrink-0">✓</span>
          <div>
            <strong class="text-[#2d1a1a] block">Regular Updates</strong>
            <span class="text-sm text-[#6d4a4a]">Keep all software and devices updated</span>
          </div>
        </div>
        <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-[#f5ebd0]/20 transition-colors">
          <span class="w-6 h-6 rounded-full bg-[#7F011F]/10 flex items-center justify-center text-[#7F011F] text-xs flex-shrink-0">✓</span>
          <div>
            <strong class="text-[#2d1a1a] block">Phishing Awareness</strong>
            <span class="text-sm text-[#6d4a4a]">Learn to identify suspicious emails</span>
          </div>
        </div>
        <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-[#f5ebd0]/20 transition-colors md:col-span-2">
          <span class="w-6 h-6 rounded-full bg-[#7F011F]/10 flex items-center justify-center text-[#7F011F] text-xs flex-shrink-0">✓</span>
          <div>
            <strong class="text-[#2d1a1a] block">Backup Data</strong>
            <span class="text-sm text-[#6d4a4a]">Regular backups to secure locations</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Highlight Box: AI-Powered Threats -->
    <div class="bg-gradient-to-r from-[#7F011F]/5 to-[#a80a30]/5 rounded-2xl p-6 mb-8 border-l-4 border-[#7F011F] backdrop-blur-sm">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-[#7F011F]/10 flex items-center justify-center flex-shrink-0">
          <span class="text-2xl">🛡️</span>
        </div>
        <div>
          <h3 class="font-bold text-[#7F011F] text-lg font-['Poppins',sans-serif]">AI-Powered Threats</h3>
          <p class="text-sm text-[#2d1a1a] leading-relaxed mt-1">
            AI is making phishing attacks more convincing and malware more sophisticated. Stay vigilant and use AI-powered security tools to protect your digital life.
          </p>
          <div class="flex flex-wrap gap-2 mt-3">
            <span class="text-xs bg-white/50 px-3 py-1 rounded-full text-[#7F011F]">AI Detection</span>
            <span class="text-xs bg-white/50 px-3 py-1 rounded-full text-[#7F011F]">Real-time Protection</span>
            <span class="text-xs bg-white/50 px-3 py-1 rounded-full text-[#7F011F]">Behavioral Analysis</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 2: Advanced Security Measures -->
    <div class="bg-white rounded-2xl p-6 mb-8 border border-[rgba(127,1,31,0.06)] shadow-sm hover:shadow-md transition-shadow">
      <h2 class="text-2xl font-bold text-[#2d1a1a] mb-4 flex items-center gap-3 font-['Poppins',sans-serif]">
        <span class="w-8 h-8 rounded-lg bg-[#7F011F]/10 flex items-center justify-center text-[#7F011F] text-sm">2</span>
        Advanced Security Measures
      </h2>
      <p class="text-[#4a2a2a] mb-4">For maximum protection, consider these advanced security measures:</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-[#f5ebd0]/20 rounded-xl p-4 border border-[rgba(127,1,31,0.06)] hover:border-[#7F011F]/20 transition-all">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-xl">🔒</span>
            <strong class="text-[#2d1a1a]">VPN</strong>
          </div>
          <p class="text-sm text-[#6d4a4a]">Encrypt your internet connection and hide your IP address</p>
        </div>
        <div class="bg-[#f5ebd0]/20 rounded-xl p-4 border border-[rgba(127,1,31,0.06)] hover:border-[#7F011F]/20 transition-all">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-xl">🔑</span>
            <strong class="text-[#2d1a1a]">Password Manager</strong>
          </div>
          <p class="text-sm text-[#6d4a4a]">Store and generate strong, unique passwords</p>
        </div>
        <div class="bg-[#f5ebd0]/20 rounded-xl p-4 border border-[rgba(127,1,31,0.06)] hover:border-[#7F011F]/20 transition-all">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-xl">🛡️</span>
            <strong class="text-[#2d1a1a]">Security Software</strong>
          </div>
          <p class="text-sm text-[#6d4a4a]">AI-powered antivirus and anti-malware protection</p>
        </div>
        <div class="bg-[#f5ebd0]/20 rounded-xl p-4 border border-[rgba(127,1,31,0.06)] hover:border-[#7F011F]/20 transition-all">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-xl">👁️</span>
            <strong class="text-[#2d1a1a]">Identity Monitoring</strong>
          </div>
          <p class="text-sm text-[#6d4a4a]">Monitor for identity theft and data breaches</p>
        </div>
        <div class="bg-[#f5ebd0]/20 rounded-xl p-4 border border-[rgba(127,1,31,0.06)] hover:border-[#7F011F]/20 transition-all sm:col-span-2">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-xl">💬</span>
            <strong class="text-[#2d1a1a]">Secure Communication</strong>
          </div>
          <p class="text-sm text-[#6d4a4a]">Use encrypted messaging and email services</p>
        </div>
      </div>
    </div>

    <!-- Section 3: Protecting Your Data -->
    <div class="bg-gradient-to-br from-[#fbf8ff] to-[#f5ebd0]/30 rounded-2xl p-6 mb-8 border border-[rgba(127,1,31,0.06)]">
      <h3 class="text-xl font-bold text-[#2d1a1a] mb-4 flex items-center gap-3 font-['Poppins',sans-serif]">
        <span class="w-8 h-8 rounded-lg bg-[#7F011F]/10 flex items-center justify-center text-[#7F011F] text-sm">3</span>
        Protecting Your Data
      </h3>
      <p class="text-[#4a2a2a] mb-4">Your data is valuable. Here's how to keep it safe:</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white/50 rounded-xl p-4 border border-[rgba(127,1,31,0.06)]">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-[#7F011F]">🔐</span>
            <strong class="text-[#2d1a1a]">Data Encryption</strong>
          </div>
          <p class="text-sm text-[#6d4a4a]">Encrypt sensitive files and communications</p>
        </div>
        <div class="bg-white/50 rounded-xl p-4 border border-[rgba(127,1,31,0.06)]">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-[#7F011F]">☁️</span>
            <strong class="text-[#2d1a1a]">Secure Storage</strong>
          </div>
          <p class="text-sm text-[#6d4a4a]">Use encrypted cloud storage solutions</p>
        </div>
        <div class="bg-white/50 rounded-xl p-4 border border-[rgba(127,1,31,0.06)]">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-[#7F011F]">💾</span>
            <strong class="text-[#2d1a1a]">Data Backup</strong>
          </div>
          <p class="text-sm text-[#6d4a4a]">Implement multiple backup strategies</p>
        </div>
        <div class="bg-white/50 rounded-xl p-4 border border-[rgba(127,1,31,0.06)]">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-[#7F011F]">✂️</span>
            <strong class="text-[#2d1a1a]">Data Minimization</strong>
          </div>
          <p class="text-sm text-[#6d4a4a]">Only share necessary information</p>
        </div>
      </div>
    </div>

    <!-- Quote Block -->
    <blockquote class="border-l-4 border-[#7F011F] pl-6 my-8 py-4 bg-[#f5ebd0]/20 rounded-r-2xl">
      <div class="flex items-start gap-4">
        <span class="text-4xl text-[#7F011F]/30 leading-none">"</span>
        <div>
          <p class="text-lg italic text-[#4a2a2a] leading-relaxed">
            "In the age of AI, your security is only as strong as your awareness. Stay informed, stay vigilant, and stay safe."
          </p>
          <p class="text-sm text-[#6d4a4a] mt-2 font-medium">— Cyber Security Expert</p>
        </div>
      </div>
    </blockquote>

    <!-- Key Takeaways -->
    <div class="bg-gradient-to-r from-[#7F011F] to-[#a80a30] rounded-2xl p-6 text-white">
      <h3 class="text-lg font-bold mb-3 font-['Poppins',sans-serif] flex items-center gap-2">
        <span>🎯</span> Key Takeaways
      </h3>
      <ul class="space-y-2 text-sm text-white/90">
        <li class="flex items-start gap-2">
          <span class="text-yellow-300">•</span>
          <span>Use strong, unique passwords and enable 2FA everywhere</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-yellow-300">•</span>
          <span>Stay vigilant against AI-powered phishing attacks</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-yellow-300">•</span>
          <span>Regularly update all software and devices</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-yellow-300">•</span>
          <span>Encrypt sensitive data and use secure communication</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-yellow-300">•</span>
          <span>Backup your data regularly to multiple locations</span>
        </li>
      </ul>
    </div>
  `,
  isBreaking: false,
  isFeatured: false,
  isTrending: false,
  isSponsored: false,
  source: "Security Today",
  sourceUrl: "https://securitytoday.com",
  tags: ["Security", "Cyber Security", "Privacy", "Technology", "AI", "Protection"],
  comments: 312,
  shares: 543,
  views: 12345,
  slug: "cyber-security-2026-protecting-digital-life",
  metaTitle: "Cyber Security 2026: Essential Guide to Protecting Your Digital Life | Tech News",
  metaDescription: "Essential cyber security tips for 2026. Learn how to protect your digital identity from AI-powered threats and advanced cyber attacks.",
  metaKeywords: "cyber security 2026, digital security, online privacy, AI threats, data protection",
},
];

// In-memory storage for user-added articles
let userArticles: NewsArticle[] = [];

// Load articles from localStorage
export const loadArticles = (): NewsArticle[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('newsArticles');
    if (saved) {
      try {
        userArticles = JSON.parse(saved);
        console.log('Loaded user articles:', userArticles.length);
        return [...initialArticles, ...userArticles];
      } catch (e) {
        console.error('Error loading articles:', e);
      }
    }
  }
  return [...initialArticles, ...userArticles];
};

// Save articles to localStorage
export const saveArticles = (articles: NewsArticle[]) => {
  if (typeof window !== 'undefined') {
    const userAdded = articles.filter(a => a.id > 1000);
    console.log('Saving user articles:', userAdded.length);
    localStorage.setItem('newsArticles', JSON.stringify(userAdded));
    userArticles = userAdded;
  }
};

// Add a new article
export const addArticle = (article: Omit<NewsArticle, 'id' | 'comments' | 'shares' | 'views'>): NewsArticle => {
  const slug = article.slug || generateSlug(article.title);
  
  const newArticle: NewsArticle = {
    ...article,
    id: Date.now() + Math.floor(Math.random() * 1000),
    slug: slug,
    comments: 0,
    shares: 0,
    views: 0,
    metaTitle: article.metaTitle || `${article.title} | Tech News`,
    metaDescription: article.metaDescription || article.excerpt,
    metaKeywords: article.metaKeywords || article.tags.join(', '),
  };
  
  console.log('Creating new article:', newArticle);
  
  const allArticles = loadArticles();
  allArticles.push(newArticle);
  saveArticles(allArticles);
  
  console.log('Article added successfully! Total articles:', allArticles.length);
  return newArticle;
};

// Update an existing article
export const updateArticle = (id: number, updates: Partial<NewsArticle>) => {
  const allArticles = loadArticles();
  const index = allArticles.findIndex(a => a.id === id);
  if (index !== -1) {
    allArticles[index] = { ...allArticles[index], ...updates };
    saveArticles(allArticles);
    return allArticles[index];
  }
  return null;
};

// Delete an article
export const deleteArticle = (id: number) => {
  const allArticles = loadArticles();
  const filtered = allArticles.filter(a => a.id !== id);
  saveArticles(filtered);
  return filtered;
};

// Get all articles (initial + user added)
export const getAllArticles = (): NewsArticle[] => {
  const articles = loadArticles();
  console.log('Total articles available:', articles.length);
  return articles;
};

// Get article by ID
export const getArticleById = (id: number): NewsArticle | undefined => {
  const allArticles = getAllArticles();
  return allArticles.find(article => article.id === id);
};

// Get article by slug - FIXED
export const getArticleBySlug = (slug: string): NewsArticle | undefined => {
  const allArticles = loadArticles();
  console.log('Looking for slug:', slug);
  console.log('Total articles available:', allArticles.length);
  
  // Try to find by exact slug match
  let article = allArticles.find(a => a.slug === slug);
  
  // If not found, try to generate slug from title
  if (!article) {
    article = allArticles.find(a => generateSlug(a.title) === slug);
  }
  
  // If still not found, try case-insensitive match
  if (!article) {
    article = allArticles.find(a => 
      a.slug?.toLowerCase() === slug.toLowerCase() || 
      generateSlug(a.title).toLowerCase() === slug.toLowerCase()
    );
  }
  
  if (article) {
    console.log('Found article:', article.title);
  } else {
    console.log('No article found for slug:', slug);
    console.log('Available slugs:', allArticles.map(a => a.slug || generateSlug(a.title)));
  }
  
  return article;
};

// Get articles by category
export const getArticlesByCategory = (category: NewsArticle['category']): NewsArticle[] => {
  const allArticles = getAllArticles();
  return allArticles.filter(article => article.category === category);
};

// Get featured articles
export const getFeaturedArticles = (): NewsArticle[] => {
  const allArticles = getAllArticles();
  return allArticles.filter(article => article.isFeatured);
};

// Get breaking news
export const getBreakingNews = (): NewsArticle[] => {
  const allArticles = getAllArticles();
  return allArticles.filter(article => article.isBreaking);
};

// Get trending articles
export const getTrendingArticles = (): NewsArticle[] => {
  const allArticles = getAllArticles();
  return allArticles.filter(article => article.isTrending);
};

// Get latest articles (sorted by date)
export const getLatestArticles = (limit: number = 10): NewsArticle[] => {
  const allArticles = getAllArticles();
  return allArticles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

// Get popular articles (sorted by views)
export const getPopularArticles = (limit: number = 10): NewsArticle[] => {
  const allArticles = getAllArticles();
  return allArticles
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};

// Get related articles by category and tags
export const getRelatedArticles = (articleId: number, limit: number = 3): NewsArticle[] => {
  const allArticles = getAllArticles();
  const currentArticle = allArticles.find(a => a.id === articleId);
  if (!currentArticle) return [];

  return allArticles
    .filter(a => a.id !== articleId)
    .filter(a => a.category === currentArticle.category || 
                 a.tags.some(tag => currentArticle.tags.includes(tag)))
    .slice(0, limit);
};

// Search articles by title, content, or tags
export const searchArticles = (query: string): NewsArticle[] => {
  const allArticles = getAllArticles();
  const searchLower = query.toLowerCase();
  return allArticles.filter(article =>
    article.title.toLowerCase().includes(searchLower) ||
    article.excerpt.toLowerCase().includes(searchLower) ||
    article.content.toLowerCase().includes(searchLower) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchLower))
  );
};

// Get all unique categories
export const getAllCategories = (): string[] => {
  const allArticles = getAllArticles();
  return [...new Set(allArticles.map(article => article.category))];
};

// Get all unique tags
export const getAllTags = (): string[] => {
  const allArticles = getAllArticles();
  const tagsSet = new Set<string>();
  allArticles.forEach(article => {
    article.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
};

// Get article for SEO
export const getArticleForSEO = (slug: string) => {
  const article = getArticleBySlug(slug);
  if (!article) return null;
  
  return {
    ...article,
    slug: slug,
    url: `/news/${slug}`,
    canonicalUrl: `https://techblog.com/news/${slug}`,
    metaTitle: article.metaTitle || `${article.title} | Tech News`,
    metaDescription: article.metaDescription || article.excerpt,
    metaKeywords: article.metaKeywords || article.tags.join(', '),
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      image: article.image,
      url: `https://techblog.com/news/${slug}`,
      type: 'article',
      publishedTime: new Date(article.date).toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      image: article.image,
    },
  };
};

// Get sitemap data
export const getSitemapData = () => {
  const allArticles = getAllArticles();
  return allArticles.map(article => ({
    url: `/news/${article.slug || generateSlug(article.title)}`,
    lastModified: article.updatedDate ? new Date(article.updatedDate) : new Date(article.date),
    changeFrequency: 'weekly' as const,
    priority: article.isFeatured ? 0.9 : 0.8,
  }));
};

// Get news stats
export const getNewsStats = () => {
  const allArticles = getAllArticles();
  return {
    total: allArticles.length,
    breaking: allArticles.filter(a => a.isBreaking).length,
    featured: allArticles.filter(a => a.isFeatured).length,
    trending: allArticles.filter(a => a.isTrending).length,
    categories: getAllCategories(),
    totalViews: allArticles.reduce((sum, a) => sum + a.views, 0),
    totalComments: allArticles.reduce((sum, a) => sum + a.comments, 0),
    totalShares: allArticles.reduce((sum, a) => sum + a.shares, 0),
  };
};

// Get initial articles
export const getInitialArticles = (): NewsArticle[] => {
  return initialArticles;
};

// Reset to initial data
export const resetToInitialData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('newsArticles');
    userArticles = [];
  }
  return initialArticles;
};

// Export initial articles for seeding
export { initialArticles };