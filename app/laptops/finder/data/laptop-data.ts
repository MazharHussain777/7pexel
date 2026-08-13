// app/laptops/finder/data/laptop-data.ts

export interface LaptopDetail {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  image: string;
  rating: number;
  category: string[];
  display: string;
  displaySize: string;
  processor: string;
  processorBrand: string;
  ram: string;
  storage: string;
  storageType: string;
  graphics: string;
  graphicsBrand: string;
  battery: string;
  weight: string;
  os: string;
  colors: string[];
  highlights: string[];
  pros: string[];
  cons: string[];
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  customStyles: string;
  contentHtml: string;
}

export const laptopsData: Record<string, LaptopDetail> = {
  "apple-macbook-pro-m5": {
    id: "macbook-pro-m5",
    slug: "apple-macbook-pro-m5",
    brand: "Apple",
    model: "MacBook Pro M5",
    year: "2026",
    price: "$1,899",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=800&fit=crop&crop=center",
    rating: 4.9,
    category: ["Premium", "Creator", "macOS"],
    display: "14.2\" Liquid Retina XDR",
    displaySize: "14.2",
    processor: "Apple M5",
    processorBrand: "Apple",
    ram: "16GB",
    storage: "512GB",
    storageType: "SSD",
    graphics: "10-core GPU",
    graphicsBrand: "Apple",
    battery: "Up to 18 hours",
    weight: "3.5 lbs",
    os: "macOS 16",
    colors: ["Silver", "Space Gray", "Gold"],
    highlights: [
      "Apple M5 chip with 10-core CPU and 10-core GPU",
      "14.2\" Liquid Retina XDR display with 1,000 nits brightness",
      "Up to 18 hours of battery life",
      "16-core Neural Engine for AI tasks",
      "Thunderbolt 4 ports and HDMI",
    ],
    pros: [
      "Incredible M5 performance for creative work",
      "Stunning 14.2\" Liquid Retina XDR display",
      "Exceptional battery life (up to 18 hours)",
      "Premium build quality",
      "Powerful 10-core GPU for graphics work",
    ],
    cons: [
      "Premium price point starting at $1,899",
      "Limited port selection",
      "Cannot upgrade RAM or storage after purchase",
      "Touch Bar removed (controversial)",
    ],
    author: "Mazhar Hussan",
    authorAvatar: "MH",
    date: "2026-02-15",
    readTime: "8 min read",
    customStyles: `
      .laptop-detail .hero-gradient { background: linear-gradient(135deg, #1a1a1a, #333); }
      .laptop-detail .table-header { background: #1a1a1a; color: #FFD700; }
      .laptop-detail .highlight-box { background: linear-gradient(135deg, #e8f5e9, #c8e6c9); border-left: 4px solid #0F6B3E; }
      .laptop-detail .spec-grid { background: #f5f7f6; border-radius: 12px; padding: 1.5rem; }
      .laptop-detail .conclusion-box { background: #0A3F26; color: white; }
      .laptop-detail .conclusion-box h3 { color: #D4F26B; }
      .laptop-detail .pros-cons-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.5rem 0; }
      .laptop-detail .pros-box { background: #e8f5e9; border-radius: 12px; padding: 1.25rem; border: 1px solid #1FA25A; }
      .laptop-detail .pros-box h3 { color: #0A3F26; }
      .laptop-detail .pros-box ul { list-style: none; padding: 0; }
      .laptop-detail .pros-box ul li { padding: 0.3rem 0; display: flex; align-items: center; gap: 0.5rem; }
      .laptop-detail .pros-box ul li::before { content: "✅"; }
      .laptop-detail .cons-box { background: #fce4ec; border-radius: 12px; padding: 1.25rem; border: 1px solid #e53935; }
      .laptop-detail .cons-box h3 { color: #c62828; }
      .laptop-detail .cons-box ul { list-style: none; padding: 0; }
      .laptop-detail .cons-box ul li { padding: 0.3rem 0; display: flex; align-items: center; gap: 0.5rem; }
      .laptop-detail .cons-box ul li::before { content: "❌"; }
      .laptop-detail .rating-badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 100px; font-weight: 700; font-size: 0.8rem; background: #FFD700; color: #1a1a1a; }
      @media (max-width: 768px) { .laptop-detail .pros-cons-grid { grid-template-columns: 1fr; } }
    `,
    contentHtml: `
      <div class="laptop-detail">
        <p>The MacBook Pro with M5 chip is Apple's most powerful laptop yet. Designed for creative professionals, it offers exceptional performance, stunning display quality, and incredible battery life.</p>

        <div class="highlight-box">
          <h3>💻 Key Highlights</h3>
          <ul>
            <li><strong>Processor:</strong> Apple M5 with 10-core CPU and 10-core GPU</li>
            <li><strong>Display:</strong> 14.2" Liquid Retina XDR with 1,000 nits brightness</li>
            <li><strong>Battery:</strong> Up to 18 hours of battery life</li>
            <li><strong>Memory:</strong> 16GB unified memory</li>
            <li><strong>Storage:</strong> 512GB SSD</li>
          </ul>
        </div>

        <h2>📊 Technical Specifications</h2>
        <div class="overflow-x-auto">
          <table>
            <thead><tr class="table-header"><th>Feature</th><th>Specification</th></tr></thead>
            <tbody>
              <tr><td><strong>Display</strong></td><td>14.2" Liquid Retina XDR, 3024 x 1964, 120Hz</td></tr>
              <tr><td><strong>Processor</strong></td><td>Apple M5 (10-core CPU, 10-core GPU)</td></tr>
              <tr><td><strong>RAM</strong></td><td>16GB / 32GB / 64GB unified memory</td></tr>
              <tr><td><strong>Storage</strong></td><td>512GB / 1TB / 2TB SSD</td></tr>
              <tr><td><strong>Graphics</strong></td><td>10-core integrated GPU</td></tr>
              <tr><td><strong>Battery</strong></td><td>Up to 18 hours</td></tr>
              <tr><td><strong>Weight</strong></td><td>3.5 lbs</td></tr>
              <tr><td><strong>OS</strong></td><td>macOS 16</td></tr>
            </tbody>
          </table>
        </div>

        <h2>⚡ Performance</h2>
        <p>The M5 chip with 10-core CPU and 10-core GPU delivers incredible performance. Video editors, 3D artists, and developers will appreciate the power.</p>
        <ul>
          <li><strong>CPU:</strong> 10-core Apple M5</li>
          <li><strong>GPU:</strong> 10-core integrated</li>
          <li><strong>Neural Engine:</strong> 16-core</li>
          <li><strong>Memory Bandwidth:</strong> 200GB/s</li>
        </ul>

        <h2>📊 Pros & Cons</h2>
        <div class="pros-cons-grid">
          <div class="pros-box">
            <h3>✅ Pros</h3>
            <ul>
              <li>Incredible M5 performance for creative work</li>
              <li>Stunning 14.2" Liquid Retina XDR display</li>
              <li>Exceptional battery life (up to 18 hours)</li>
              <li>Premium build quality</li>
              <li>Powerful 10-core GPU for graphics work</li>
            </ul>
          </div>
          <div class="cons-box">
            <h3>❌ Cons</h3>
            <ul>
              <li>Premium price point starting at $1,899</li>
              <li>Limited port selection</li>
              <li>Cannot upgrade RAM or storage after purchase</li>
              <li>Touch Bar removed (controversial)</li>
            </ul>
          </div>
        </div>

        <h2>🔋 Battery Life</h2>
        <p>The MacBook Pro offers impressive battery life, easily lasting through a full day of heavy use. With up to 18 hours of battery life, you can work, create, and play without worrying about finding an outlet.</p>

        <h2>🎯 Final Verdict</h2>
        <div class="conclusion-box">
          <h3>⭐ Rating: <span class="rating-badge">4.9</span></h3>
          <p>The MacBook Pro with M5 is the best laptop for creative professionals. Incredible performance, stunning display, and all-day battery life make it worth every penny.</p>
        </div>
      </div>
    `,
  },

  "dell-xps-14": {
    id: "dell-xps-14",
    slug: "dell-xps-14",
    brand: "Dell",
    model: "XPS 14",
    year: "2026",
    price: "$1,299",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop&crop=center",
    rating: 4.7,
    category: ["Premium", "Ultrabook", "Windows"],
    display: "14.5\" OLED",
    displaySize: "14.5",
    processor: "Intel Core Ultra 9",
    processorBrand: "Intel",
    ram: "32GB",
    storage: "1TB",
    storageType: "SSD",
    graphics: "Intel Arc Graphics",
    graphicsBrand: "Intel",
    battery: "Up to 15 hours",
    weight: "3.2 lbs",
    os: "Windows 11 Pro",
    colors: ["Platinum", "Graphite"],
    highlights: [
      "14.5\" OLED display with 120Hz refresh rate",
      "Intel Core Ultra 9 processor with AI acceleration",
      "32GB LPDDR5x RAM",
      "1TB PCIe SSD storage",
      "Lightweight design at 3.2 lbs",
    ],
    pros: [
      "Beautiful OLED display with 120Hz refresh rate",
      "Lightweight and portable design",
      "Excellent performance with Intel Core Ultra 9",
      "Great keyboard and trackpad",
      "Good port selection for an ultrabook",
    ],
    cons: [
      "Battery life could be better (15 hours max)",
      "Limited port selection",
      "Expensive for the specs",
      "No upgrade options after purchase",
    ],
    author: "Sarah Khan",
    authorAvatar: "SK",
    date: "2026-02-14",
    readTime: "7 min read",
    customStyles: `
      .laptop-detail .hero-gradient { background: linear-gradient(135deg, #0A3F6E, #1F5FA2); }
      .laptop-detail .table-header { background: #0A3F6E; color: white; }
      .laptop-detail .highlight-box { background: linear-gradient(135deg, #e3f2fd, #bbdefb); border-left: 4px solid #0A3F6E; }
      .laptop-detail .spec-grid { background: #f5f7f6; border-radius: 12px; padding: 1.5rem; }
      .laptop-detail .conclusion-box { background: #0A3F6E; color: white; }
      .laptop-detail .conclusion-box h3 { color: #FFD700; }
      .laptop-detail .pros-cons-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.5rem 0; }
      .laptop-detail .pros-box { background: #e8f5e9; border-radius: 12px; padding: 1.25rem; border: 1px solid #1FA25A; }
      .laptop-detail .pros-box h3 { color: #0A3F26; }
      .laptop-detail .pros-box ul { list-style: none; padding: 0; }
      .laptop-detail .pros-box ul li { padding: 0.3rem 0; display: flex; align-items: center; gap: 0.5rem; }
      .laptop-detail .pros-box ul li::before { content: "✅"; }
      .laptop-detail .cons-box { background: #fce4ec; border-radius: 12px; padding: 1.25rem; border: 1px solid #e53935; }
      .laptop-detail .cons-box h3 { color: #c62828; }
      .laptop-detail .cons-box ul { list-style: none; padding: 0; }
      .laptop-detail .cons-box ul li { padding: 0.3rem 0; display: flex; align-items: center; gap: 0.5rem; }
      .laptop-detail .cons-box ul li::before { content: "❌"; }
      .laptop-detail .rating-badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 100px; font-weight: 700; font-size: 0.8rem; background: #FFD700; color: #1a1a1a; }
      @media (max-width: 768px) { .laptop-detail .pros-cons-grid { grid-template-columns: 1fr; } }
    `,
    contentHtml: `
      <div class="laptop-detail">
        <p>The Dell XPS 14 is a premium ultrabook that combines stunning design with powerful performance. With a beautiful OLED display, Intel Core Ultra 9 processor, and lightweight design, it's perfect for professionals on the go.</p>

        <div class="highlight-box">
          <h3>💻 Key Highlights</h3>
          <ul>
            <li><strong>Display:</strong> 14.5" OLED with 120Hz refresh rate</li>
            <li><strong>Processor:</strong> Intel Core Ultra 9 with AI acceleration</li>
            <li><strong>Memory:</strong> 32GB LPDDR5x RAM</li>
            <li><strong>Storage:</strong> 1TB PCIe SSD</li>
            <li><strong>Weight:</strong> 3.2 lbs</li>
          </ul>
        </div>

        <h2>📊 Technical Specifications</h2>
        <div class="overflow-x-auto">
          <table>
            <thead><tr class="table-header"><th>Feature</th><th>Specification</th></tr></thead>
            <tbody>
              <tr><td><strong>Display</strong></td><td>14.5" OLED, 3200 x 2000, 120Hz</td></tr>
              <tr><td><strong>Processor</strong></td><td>Intel Core Ultra 9</td></tr>
              <tr><td><strong>RAM</strong></td><td>32GB LPDDR5x</td></tr>
              <tr><td><strong>Storage</strong></td><td>1TB PCIe SSD</td></tr>
              <tr><td><strong>Graphics</strong></td><td>Intel Arc Graphics</td></tr>
              <tr><td><strong>Battery</strong></td><td>Up to 15 hours</td></tr>
              <tr><td><strong>Weight</strong></td><td>3.2 lbs</td></tr>
              <tr><td><strong>OS</strong></td><td>Windows 11 Pro</td></tr>
            </tbody>
          </table>
        </div>

        <h2>📊 Pros & Cons</h2>
        <div class="pros-cons-grid">
          <div class="pros-box">
            <h3>✅ Pros</h3>
            <ul>
              <li>Beautiful OLED display with 120Hz refresh rate</li>
              <li>Lightweight and portable design</li>
              <li>Excellent performance with Intel Core Ultra 9</li>
              <li>Great keyboard and trackpad</li>
              <li>Good port selection for an ultrabook</li>
            </ul>
          </div>
          <div class="cons-box">
            <h3>❌ Cons</h3>
            <ul>
              <li>Battery life could be better (15 hours max)</li>
              <li>Limited port selection</li>
              <li>Expensive for the specs</li>
              <li>No upgrade options after purchase</li>
            </ul>
          </div>
        </div>

        <h2>🎯 Final Verdict</h2>
        <div class="conclusion-box">
          <h3>⭐ Rating: <span class="rating-badge">4.7</span></h3>
          <p>The Dell XPS 14 is an excellent ultrabook for professionals who value portability and display quality. With its stunning OLED display and powerful performance, it's one of the best Windows laptops available.</p>
        </div>
      </div>
    `,
  },

  "asus-rog-zephyrus-g16": {
    id: "asus-rog-zephyrus-g16",
    slug: "asus-rog-zephyrus-g16",
    brand: "ASUS",
    model: "ROG Zephyrus G16",
    year: "2026",
    price: "$2,199",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=800&fit=crop&crop=center",
    rating: 4.8,
    category: ["Gaming", "Performance", "Windows"],
    display: "16\" OLED",
    displaySize: "16",
    processor: "Intel Core Ultra 9",
    processorBrand: "Intel",
    ram: "32GB",
    storage: "1TB",
    storageType: "SSD",
    graphics: "NVIDIA RTX 5090",
    graphicsBrand: "NVIDIA",
    battery: "Up to 10 hours",
    weight: "4.2 lbs",
    os: "Windows 11 Pro",
    colors: ["Eclipse Gray", "Moonlight White"],
    highlights: [
      "NVIDIA RTX 5090 GPU with 16GB VRAM",
      "16\" OLED display with 240Hz refresh rate",
      "Intel Core Ultra 9 processor",
      "32GB LPDDR5x RAM",
      "1TB PCIe SSD storage",
    ],
    pros: [
      "Powerful RTX 5090 GPU for gaming and creative work",
      "Stunning 16\" OLED display with 240Hz refresh rate",
      "Premium build quality with RGB lighting",
      "Good cooling system for sustained performance",
      "Thin and light for a gaming laptop",
    ],
    cons: [
      "Expensive at $2,199",
      "Battery life limited to 10 hours",
      "Fans can get loud under load",
      "No webcam shutter",
    ],
    author: "Mazhar Hussan",
    authorAvatar: "MH",
    date: "2026-02-13",
    readTime: "8 min read",
    customStyles: `
      .laptop-detail .hero-gradient { background: linear-gradient(135deg, #1a1a1a, #ff4444); }
      .laptop-detail .table-header { background: #1a1a1a; color: #ff4444; }
      .laptop-detail .highlight-box { background: linear-gradient(135deg, #fff3e0, #ffe0b2); border-left: 4px solid #ff4444; }
      .laptop-detail .spec-grid { background: #f5f7f6; border-radius: 12px; padding: 1.5rem; }
      .laptop-detail .conclusion-box { background: #1a1a1a; color: white; }
      .laptop-detail .conclusion-box h3 { color: #ff4444; }
      .laptop-detail .pros-cons-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.5rem 0; }
      .laptop-detail .pros-box { background: #e8f5e9; border-radius: 12px; padding: 1.25rem; border: 1px solid #1FA25A; }
      .laptop-detail .pros-box h3 { color: #0A3F26; }
      .laptop-detail .pros-box ul { list-style: none; padding: 0; }
      .laptop-detail .pros-box ul li { padding: 0.3rem 0; display: flex; align-items: center; gap: 0.5rem; }
      .laptop-detail .pros-box ul li::before { content: "✅"; }
      .laptop-detail .cons-box { background: #fce4ec; border-radius: 12px; padding: 1.25rem; border: 1px solid #e53935; }
      .laptop-detail .cons-box h3 { color: #c62828; }
      .laptop-detail .cons-box ul { list-style: none; padding: 0; }
      .laptop-detail .cons-box ul li { padding: 0.3rem 0; display: flex; align-items: center; gap: 0.5rem; }
      .laptop-detail .cons-box ul li::before { content: "❌"; }
      .laptop-detail .rating-badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 100px; font-weight: 700; font-size: 0.8rem; background: #FFD700; color: #1a1a1a; }
      @media (max-width: 768px) { .laptop-detail .pros-cons-grid { grid-template-columns: 1fr; } }
    `,
    contentHtml: `
      <div class="laptop-detail">
        <p>The ASUS ROG Zephyrus G16 is a powerhouse gaming laptop that doesn't compromise on portability. With an RTX 5090 GPU, Intel Core Ultra 9 processor, and a stunning 16" OLED display, it's one of the most capable gaming laptops on the market.</p>

        <div class="highlight-box">
          <h3>🎮 Key Highlights</h3>
          <ul>
            <li><strong>GPU:</strong> NVIDIA RTX 5090 with 16GB VRAM</li>
            <li><strong>Display:</strong> 16" OLED with 240Hz refresh rate</li>
            <li><strong>Processor:</strong> Intel Core Ultra 9</li>
            <li><strong>Memory:</strong> 32GB LPDDR5x RAM</li>
            <li><strong>Storage:</strong> 1TB PCIe SSD</li>
          </ul>
        </div>

        <h2>📊 Technical Specifications</h2>
        <div class="overflow-x-auto">
          <table>
            <thead><tr class="table-header"><th>Feature</th><th>Specification</th></tr></thead>
            <tbody>
              <tr><td><strong>Display</strong></td><td>16" OLED, 2560 x 1600, 240Hz</td></tr>
              <tr><td><strong>Processor</strong></td><td>Intel Core Ultra 9</td></tr>
              <tr><td><strong>RAM</strong></td><td>32GB LPDDR5x</td></tr>
              <tr><td><strong>Storage</strong></td><td>1TB PCIe SSD</td></tr>
              <tr><td><strong>Graphics</strong></td><td>NVIDIA RTX 5090 (16GB VRAM)</td></tr>
              <tr><td><strong>Battery</strong></td><td>Up to 10 hours</td></tr>
              <tr><td><strong>Weight</strong></td><td>4.2 lbs</td></tr>
              <tr><td><strong>OS</strong></td><td>Windows 11 Pro</td></tr>
            </tbody>
          </table>
        </div>

        <h2>📊 Pros & Cons</h2>
        <div class="pros-cons-grid">
          <div class="pros-box">
            <h3>✅ Pros</h3>
            <ul>
              <li>Powerful RTX 5090 GPU for gaming and creative work</li>
              <li>Stunning 16" OLED display with 240Hz refresh rate</li>
              <li>Premium build quality with RGB lighting</li>
              <li>Good cooling system for sustained performance</li>
              <li>Thin and light for a gaming laptop</li>
            </ul>
          </div>
          <div class="cons-box">
            <h3>❌ Cons</h3>
            <ul>
              <li>Expensive at $2,199</li>
              <li>Battery life limited to 10 hours</li>
              <li>Fans can get loud under load</li>
              <li>No webcam shutter</li>
            </ul>
          </div>
        </div>

        <h2>🎯 Final Verdict</h2>
        <div class="conclusion-box">
          <h3>⭐ Rating: <span class="rating-badge">4.8</span></h3>
          <p>The ASUS ROG Zephyrus G16 is the ultimate gaming laptop for those who demand the best. With its powerful RTX 5090 GPU and stunning OLED display, it delivers an exceptional gaming experience.</p>
        </div>
      </div>
    `,
  },

  "lenovo-thinkpad-x1-carbon-gen-13": {
    id: "lenovo-thinkpad-x1-carbon-gen-13",
    slug: "lenovo-thinkpad-x1-carbon-gen-13",
    brand: "Lenovo",
    model: "ThinkPad X1 Carbon Gen 13",
    year: "2026",
    price: "$1,599",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop&crop=center",
    rating: 4.7,
    category: ["Business", "Ultrabook", "Windows"],
    display: "14\" IPS",
    displaySize: "14",
    processor: "Intel Core Ultra 7",
    processorBrand: "Intel",
    ram: "16GB",
    storage: "512GB",
    storageType: "SSD",
    graphics: "Intel Graphics",
    graphicsBrand: "Intel",
    battery: "Up to 18 hours",
    weight: "2.5 lbs",
    os: "Windows 11 Pro",
    colors: ["Black", "Silver"],
    highlights: [
      "Lightweight at 2.5 lbs",
      "Up to 18 hours of battery life",
      "Intel Core Ultra 7 processor",
      "16GB LPDDR5x RAM",
      "512GB PCIe SSD storage",
    ],
    pros: [
      "Extremely lightweight at 2.5 lbs",
      "Excellent battery life (up to 18 hours)",
      "Classic ThinkPad keyboard and TrackPoint",
      "MIL-STD-810H durability testing",
      "Good port selection for business use",
    ],
    cons: [
      "Expensive for the specs",
      "Display could be brighter",
      "Limited upgrade options",
      "No dedicated GPU",
    ],
    author: "Sarah Khan",
    authorAvatar: "SK",
    date: "2026-02-12",
    readTime: "6 min read",
    customStyles: `
      .laptop-detail .hero-gradient { background: linear-gradient(135deg, #1a1a1a, #444); }
      .laptop-detail .table-header { background: #1a1a1a; color: #FFD700; }
      .laptop-detail .highlight-box { background: linear-gradient(135deg, #f5f5f5, #e8e8e8); border-left: 4px solid #1a1a1a; }
      .laptop-detail .spec-grid { background: #f5f7f6; border-radius: 12px; padding: 1.5rem; }
      .laptop-detail .conclusion-box { background: #1a1a1a; color: white; }
      .laptop-detail .conclusion-box h3 { color: #FFD700; }
      .laptop-detail .pros-cons-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.5rem 0; }
      .laptop-detail .pros-box { background: #e8f5e9; border-radius: 12px; padding: 1.25rem; border: 1px solid #1FA25A; }
      .laptop-detail .pros-box h3 { color: #0A3F26; }
      .laptop-detail .pros-box ul { list-style: none; padding: 0; }
      .laptop-detail .pros-box ul li { padding: 0.3rem 0; display: flex; align-items: center; gap: 0.5rem; }
      .laptop-detail .pros-box ul li::before { content: "✅"; }
      .laptop-detail .cons-box { background: #fce4ec; border-radius: 12px; padding: 1.25rem; border: 1px solid #e53935; }
      .laptop-detail .cons-box h3 { color: #c62828; }
      .laptop-detail .cons-box ul { list-style: none; padding: 0; }
      .laptop-detail .cons-box ul li { padding: 0.3rem 0; display: flex; align-items: center; gap: 0.5rem; }
      .laptop-detail .cons-box ul li::before { content: "❌"; }
      .laptop-detail .rating-badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 100px; font-weight: 700; font-size: 0.8rem; background: #FFD700; color: #1a1a1a; }
      @media (max-width: 768px) { .laptop-detail .pros-cons-grid { grid-template-columns: 1fr; } }
    `,
    contentHtml: `
      <div class="laptop-detail">
        <p>The Lenovo ThinkPad X1 Carbon Gen 13 is the ultimate business laptop. With its lightweight design, excellent battery life, and legendary ThinkPad keyboard, it's perfect for professionals who need a reliable and portable device.</p>

        <div class="highlight-box">
          <h3>💼 Key Highlights</h3>
          <ul>
            <li><strong>Weight:</strong> 2.5 lbs</li>
            <li><strong>Battery:</strong> Up to 18 hours of battery life</li>
            <li><strong>Processor:</strong> Intel Core Ultra 7</li>
            <li><strong>Memory:</strong> 16GB LPDDR5x RAM</li>
            <li><strong>Storage:</strong> 512GB PCIe SSD</li>
          </ul>
        </div>

        <h2>📊 Technical Specifications</h2>
        <div class="overflow-x-auto">
          <table>
            <thead><tr class="table-header"><th>Feature</th><th>Specification</th></tr></thead>
            <tbody>
              <tr><td><strong>Display</strong></td><td>14" IPS, 1920 x 1200, 60Hz</td></tr>
              <tr><td><strong>Processor</strong></td><td>Intel Core Ultra 7</td></tr>
              <tr><td><strong>RAM</strong></td><td>16GB LPDDR5x</td></tr>
              <tr><td><strong>Storage</strong></td><td>512GB PCIe SSD</td></tr>
              <tr><td><strong>Graphics</strong></td><td>Intel Graphics</td></tr>
              <tr><td><strong>Battery</strong></td><td>Up to 18 hours</td></tr>
              <tr><td><strong>Weight</strong></td><td>2.5 lbs</td></tr>
              <tr><td><strong>OS</strong></td><td>Windows 11 Pro</td></tr>
            </tbody>
          </table>
        </div>

        <h2>📊 Pros & Cons</h2>
        <div class="pros-cons-grid">
          <div class="pros-box">
            <h3>✅ Pros</h3>
            <ul>
              <li>Extremely lightweight at 2.5 lbs</li>
              <li>Excellent battery life (up to 18 hours)</li>
              <li>Classic ThinkPad keyboard and TrackPoint</li>
              <li>MIL-STD-810H durability testing</li>
              <li>Good port selection for business use</li>
            </ul>
          </div>
          <div class="cons-box">
            <h3>❌ Cons</h3>
            <ul>
              <li>Expensive for the specs</li>
              <li>Display could be brighter</li>
              <li>Limited upgrade options</li>
              <li>No dedicated GPU</li>
            </ul>
          </div>
        </div>

        <h2>🎯 Final Verdict</h2>
        <div class="conclusion-box">
          <h3>⭐ Rating: <span class="rating-badge">4.7</span></h3>
          <p>The Lenovo ThinkPad X1 Carbon Gen 13 is the best business laptop available. Its combination of lightweight design, excellent battery life, and legendary keyboard make it a must-have for professionals.</p>
        </div>
      </div>
    `,
  },
};

// ─── HELPER FUNCTIONS ─────────────────────────────────────

export function getLaptopBySlug(slug: string): LaptopDetail | null {
  return laptopsData[slug] || null;
}

export function getLaptopSlug(model: string): string {
  const slugMap: Record<string, string> = {
    // Apple
    "MacBook Pro M5": "apple-macbook-pro-m5",
    "MacBook Pro M4": "apple-macbook-pro-m4",
    "MacBook Air M5": "apple-macbook-air-m5",
    "MacBook Air M4": "apple-macbook-air-m4",
    // Dell
    "XPS 14": "dell-xps-14",
    "XPS 16": "dell-xps-16",
    "XPS 13": "dell-xps-13",
    // ASUS
    "ROG Zephyrus G16": "asus-rog-zephyrus-g16",
    "ROG Zephyrus G14": "asus-rog-zephyrus-g14",
    "Zenbook 14": "asus-zenbook-14",
    // Lenovo
    "ThinkPad X1 Carbon Gen 13": "lenovo-thinkpad-x1-carbon-gen-13",
    "ThinkPad X1 Carbon Gen 12": "lenovo-thinkpad-x1-carbon-gen-12",
    "Yoga 9i": "lenovo-yoga-9i",
    // HP
    "Spectre x360": "hp-spectre-x360",
    "EliteBook 1040": "hp-elitebook-1040",
    // Microsoft
    "Surface Laptop 7": "microsoft-surface-laptop-7",
    "Surface Pro 11": "microsoft-surface-pro-11",
  };

  const modelLower = model.toLowerCase();
  for (const [key, value] of Object.entries(slugMap)) {
    if (key.toLowerCase() === modelLower) {
      return value;
    }
  }

  return model.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function getRelatedLaptops(slug: string, limit: number = 11): LaptopDetail[] {
  const current = getLaptopBySlug(slug);
  if (!current) return [];

  const sameBrand = Object.values(laptopsData).filter(l => l.brand === current.brand && l.slug !== slug);

  if (sameBrand.length >= limit) {
    return sameBrand.slice(0, limit);
  }

  const otherLaptops = Object.values(laptopsData)
    .filter(l => l.brand !== current.brand && l.slug !== slug)
    .slice(0, limit - sameBrand.length);

  return [...sameBrand, ...otherLaptops];
}

export function getBrandColor(brand: string): string {
  const colors: Record<string, string> = {
    Apple: "#555555",
    Dell: "#0066CC",
    ASUS: "#003366",
    Lenovo: "#E2231A",
    HP: "#0096D6",
    Microsoft: "#00A4EF",
    Acer: "#83B81A",
    Razer: "#44D62C",
    MSI: "#00A3E0",
  };
  return colors[brand] || "#555555";
}

export function getBrandEmoji(brand: string): string {
  const emojis: Record<string, string> = {
    Apple: "🍎",
    Dell: "🖥️",
    ASUS: "💻",
    Lenovo: "📋",
    HP: "🔵",
    Microsoft: "🟦",
    Acer: "🟩",
    Razer: "🟢",
    MSI: "🟦",
  };
  return emojis[brand] || "💻";
}

export function getBrandTheme(brand: string): { primary: string; secondary: string } {
  const themes: Record<string, { primary: string; secondary: string }> = {
    Apple: { primary: "#555555", secondary: "#888888" },
    Dell: { primary: "#0066CC", secondary: "#4D94E8" },
    ASUS: { primary: "#003366", secondary: "#004C99" },
    Lenovo: { primary: "#E2231A", secondary: "#FF4D4D" },
    HP: { primary: "#0096D6", secondary: "#4DB8E8" },
    Microsoft: { primary: "#00A4EF", secondary: "#4DC3F5" },
    Acer: { primary: "#83B81A", secondary: "#A8D44A" },
    Razer: { primary: "#44D62C", secondary: "#7AE35A" },
    MSI: { primary: "#00A3E0", secondary: "#4DBEE8" },
  };
  return themes[brand] || { primary: "#555555", secondary: "#888888" };
}