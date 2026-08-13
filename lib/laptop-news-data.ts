// lib/laptop-news-data.ts

// ─── TYPES ──────────────────────────────────────────────
export interface LaptopNewsItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  image: string;
  time: string;
  tag: string;
  date: string;
  excerpt?: string;
  author?: string;
  readTime?: string;
}

export interface LaptopArticle {
  id: string;
  slug: string;
  tag: string;
  category: string;
  categoryUrl: string;
  title: string;
  dek: string;
  image: string;
  caption: string;
  author: string;
  authorInit: string;
  date: string;
  readtime: string;
  views: string;
  body: string;
  tags: string[];
}

export interface LaptopCategory {
  id: string;
  label: string;
  color: string;
  count?: number;
}

export interface CrossCategoryItem {
  title: string;
  cat: string;
  img: string;
  time: string;
}

// ─── LAPTOP NEWS LIST DATA ─────────────────────────────
export const laptopNewsList: LaptopNewsItem[] = [
  {
    id: "2",
    slug: "apple-m5-macbook-pro-benchmarks",
    title: "Apple M5 MacBook Pro benchmarks leak online",
    category: "apple",
    categoryLabel: "Apple",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=450&fit=crop&crop=center",
    time: "7 hours ago",
    tag: "Update",
    date: "2026-02-15",
    excerpt: "Early Geekbench listings show strong single-core gains over the M4 lineup, with multi-core scores climbing more modestly.",
    author: "Marcus Chen",
    readTime: "3 min read",
  },
  {
    id: "1",
    slug: "intel-next-gen-chip-launch-date",
    title: "Intel confirms next-gen chip launch date",
    category: "intel",
    categoryLabel: "Intel",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=450&fit=crop&crop=center",
    time: "3 hours ago",
    tag: "News",
    date: "2026-02-15",
    excerpt: "The new architecture targets a meaningful efficiency jump over the last generation, with laptop makers already sampling early silicon.",
    author: "Aisha Rahman",
    readTime: "4 min read",
  },
  {
    id: "3",
    slug: "dell-xps-14-redesigned-hinge",
    title: "Dell XPS 14 gets a redesigned hinge in 2026 refresh",
    category: "dell",
    categoryLabel: "Dell",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=450&fit=crop&crop=center",
    time: "1 day ago",
    tag: "Leak",
    date: "2026-02-14",
    excerpt: "The update addresses the wobble complaints that dogged the previous generation, according to internal parts diagrams reviewed ahead of launch.",
    author: "Priya Nair",
    readTime: "4 min read",
  },
  {
    id: "4",
    slug: "asus-rog-zephyrus-240hz-oled",
    title: "ASUS ROG Zephyrus adds 240Hz OLED option",
    category: "asus",
    categoryLabel: "ASUS",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=450&fit=crop&crop=center",
    time: "2 days ago",
    tag: "Launch",
    date: "2026-02-13",
    excerpt: "The refreshed configuration keeps the same 3.4lb chassis despite the panel upgrade, according to ASUS's latest spec sheet.",
    author: "Daniel Osei",
    readTime: "3 min read",
  },
  {
    id: "5",
    slug: "lenovo-thinkpad-x1-carbon-gen-13",
    title: "Lenovo ThinkPad X1 Carbon Gen 13 specs surface",
    category: "lenovo",
    categoryLabel: "Lenovo",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=450&fit=crop&crop=center",
    time: "3 days ago",
    tag: "Analysis",
    date: "2026-02-12",
    excerpt: "Leaked listings point to a lighter chassis and a larger battery cell, continuing the line's slow march toward all-day endurance.",
    author: "Sofia Bianchi",
    readTime: "5 min read",
  },
  {
    id: "6",
    slug: "new-gaming-laptops-rtx-50-series",
    title: "New gaming laptops with RTX 50-series announced",
    category: "gaming",
    categoryLabel: "Gaming",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=450&fit=crop&crop=center",
    time: "4 days ago",
    tag: "News",
    date: "2026-02-11",
    excerpt: "The latest gaming laptops feature NVIDIA's next-gen RTX 50-series GPUs with improved ray tracing and AI performance.",
    author: "Mazhar Hussan",
    readTime: "4 min read",
  },
  {
    id: "7",
    slug: "hp-elitebook-ai-features",
    title: "HP EliteBook refresh brings AI-powered features",
    category: "business",
    categoryLabel: "Business",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=450&fit=crop&crop=center",
    time: "5 days ago",
    tag: "Update",
    date: "2026-02-10",
    excerpt: "HP's new business laptops include AI-driven noise cancellation, adaptive battery management, and intelligent performance tuning.",
    author: "Sarah Khan",
    readTime: "4 min read",
  },
  {
    id: "8",
    slug: "intel-core-ultra-300-specs",
    title: "Intel Core Ultra 300 series specs surface online",
    category: "intel",
    categoryLabel: "Intel",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=450&fit=crop&crop=center",
    time: "6 days ago",
    tag: "Leak",
    date: "2026-02-09",
    excerpt: "Early specifications for Intel's next-generation Core Ultra processors have appeared in online databases.",
    author: "Mazhar Hussan",
    readTime: "3 min read",
  },
  {
    id: "9",
    slug: "amd-ryzen-ai-300-laptops",
    title: "AMD Ryzen AI 300 laptops spotted at CES",
    category: "amd",
    categoryLabel: "AMD",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=450&fit=crop&crop=center",
    time: "1 week ago",
    tag: "News",
    date: "2026-02-08",
    excerpt: "Next-gen AMD laptops featuring integrated AI accelerators and improved power efficiency were showcased at CES 2026.",
    author: "Mazhar Hussan",
    readTime: "5 min read",
  },
  {
    id: "10",
    slug: "microsoft-surface-laptop-7",
    title: "Microsoft Surface Laptop 7 gets a surprise update",
    category: "microsoft",
    categoryLabel: "Microsoft",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=450&fit=crop&crop=center",
    time: "1 week ago",
    tag: "Update",
    date: "2026-02-07",
    excerpt: "Microsoft has quietly updated the Surface Laptop 7 with improved specs and new color options.",
    author: "Sarah Khan",
    readTime: "3 min read",
  },
];

// ─── LAPTOP CATEGORIES ──────────────────────────────────
export const laptopCategories: LaptopCategory[] = [
  { id: "all", label: "All", color: "#4C7A1F" },
  { id: "intel", label: "Intel", color: "#0071C5" },
  { id: "apple", label: "Apple", color: "#555555" },
  { id: "dell", label: "Dell", color: "#007DB8" },
  { id: "asus", label: "ASUS", color: "#2A2A2A" },
  { id: "lenovo", label: "Lenovo", color: "#E2231A" },
  { id: "gaming", label: "Gaming", color: "#6E8F2B" },
  { id: "business", label: "Business", color: "#0F6B3E" },
  { id: "amd", label: "AMD", color: "#ED1C24" },
  { id: "microsoft", label: "Microsoft", color: "#00A4EF" },
];

// ─── LAPTOP ARTICLES DATA WITH RICH HTML CONTENT ────────
export const laptopArticles: Record<string, LaptopArticle> = {
  "apple-m5-macbook-pro-benchmarks": {
    id: "2",
    slug: "apple-m5-macbook-pro-benchmarks",
    tag: "update",
    category: "Laptops",
    categoryUrl: "/news/laptops",
    title: "Apple M5 MacBook Pro benchmarks leak online",
    dek: "Early Geekbench listings show strong single-core gains over the M4 lineup, with multi-core scores climbing more modestly.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=675&fit=crop&crop=center",
    caption: "MacBook Pro chassis pictured is representative of the current generation.",
    author: "Marcus Chen",
    authorInit: "MC",
    date: "7 hours ago",
    readtime: "3 min read",
    views: "18.9k",
    body: `
      <!-- INTRO -->
      <p>A cluster of Geekbench listings matching an unreleased MacBook Pro configuration has surfaced, offering the first real look at how Apple's next chip performs outside of internal testing.</p>
      
      <p>Single-core scores show a healthy jump over the M4 generation, consistent with rumors of a redesigned core architecture. Multi-core gains are more modest, which tracks with reports that Apple prioritized efficiency over simply adding more cores this cycle.</p>
      
      <!-- QUOTE -->
      <blockquote>"Single-core is where most people will actually feel the difference day to day."</blockquote>
      
      <!-- BENCHMARK SCORES COMPARISON -->
      <div class="benchmark-comparison">
        <h3>📈 Geekbench 6 Score Comparison</h3>
        <div class="benchmark-grid">
          <div class="benchmark-card">
            <span class="benchmark-label">Single-Core</span>
            <div class="benchmark-bar">
              <div class="benchmark-fill" style="width: 85%"></div>
            </div>
            <div class="benchmark-numbers">
              <span class="m4-score">M4: 3,800</span>
              <span class="m5-score">M5: 4,200</span>
              <span class="improvement">+10.5%</span>
            </div>
          </div>
          <div class="benchmark-card">
            <span class="benchmark-label">Multi-Core</span>
            <div class="benchmark-bar">
              <div class="benchmark-fill" style="width: 70%"></div>
            </div>
            <div class="benchmark-numbers">
              <span class="m4-score">M4: 14,500</span>
              <span class="m5-score">M5: 15,800</span>
              <span class="improvement">+9.0%</span>
            </div>
          </div>
          <div class="benchmark-card">
            <span class="benchmark-label">GPU (Metal)</span>
            <div class="benchmark-bar">
              <div class="benchmark-fill" style="width: 65%"></div>
            </div>
            <div class="benchmark-numbers">
              <span class="m4-score">M4: 52,000</span>
              <span class="m5-score">M5: 58,000</span>
              <span class="improvement">+11.5%</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- SPEC SHEET -->
      <div class="spec-sheet">
        <h3>🔧 M5 Chip Specifications</h3>
        <div class="spec-grid">
          <div class="spec-item">
            <span class="spec-label">CPU Cores</span>
            <span class="spec-value">12-core (8P + 4E)</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">GPU Cores</span>
            <span class="spec-value">18-core</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Neural Engine</span>
            <span class="spec-value">32-core</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Memory Bandwidth</span>
            <span class="spec-value">150 GB/s</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Process</span>
            <span class="spec-value">3nm Enhanced</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Transistors</span>
            <span class="spec-value">25 Billion</span>
          </div>
        </div>
      </div>
      
      <p>The listings also hint at a new baseline memory configuration, though Apple's final specs won't be confirmed until an official announcement. Thermal design appears unchanged from the current chassis, suggesting Apple is treating this as primarily a silicon refresh rather than a full redesign.</p>
      
      <!-- IMAGE GALLERY -->
      <div class="gallery-grid">
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&crop=center" alt="MacBook Pro design" loading="lazy" />
          <span class="gallery-caption">Current MacBook Pro design</span>
        </div>
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop&crop=center" alt="Apple chip" loading="lazy" />
          <span class="gallery-caption">M5 chip architecture</span>
        </div>
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=300&fit=crop&crop=center" alt="MacBook Pro workspace" loading="lazy" />
          <span class="gallery-caption">Professional workflow</span>
        </div>
      </div>
      
      <p>If the pattern from previous launches holds, expect the new MacBook Pro to arrive within a standard product cycle window, with the current M4 models continuing to sell at a discount alongside it for a period.</p>
      
      <!-- PROS & CONS -->
      <div class="pros-cons">
        <div class="pros">
          <h4>👍 Pros</h4>
          <ul>
            <li>Significant single-core performance improvement</li>
            <li>Enhanced Neural Engine for AI tasks</li>
            <li>Improved power efficiency</li>
            <li>Better thermal management</li>
          </ul>
        </div>
        <div class="cons">
          <h4>👎 Cons</h4>
          <ul>
            <li>Modest multi-core gains</li>
            <li>Same chassis design</li>
            <li>Potential availability constraints</li>
            <li>Premium pricing expected</li>
          </ul>
        </div>
      </div>
      
      <!-- CHECKLIST -->
      <div class="checklist">
        <h3>✅ Key numbers from the leak</h3>
        <ul class="checklist-items">
          <li><span class="check-icon">✓</span> Notably higher single-core scores versus the outgoing M4 chip</li>
          <li><span class="check-icon">✓</span> Modest multi-core improvement, prioritizing efficiency over raw core count</li>
          <li><span class="check-icon">✓</span> Same general thermal envelope as the current chassis</li>
          <li><span class="check-icon">✓</span> Listings point to an unchanged base memory tier, unconfirmed by Apple</li>
        </ul>
      </div>
      
      <!-- FAQ SECTION -->
      <div class="faq-section">
        <h3>❓ Frequently Asked Questions</h3>
        <div class="faq-item">
          <div class="faq-question">When will the M5 MacBook Pro be released?</div>
          <div class="faq-answer">Based on previous Apple release cycles, the M5 MacBook Pro is expected to be announced in late 2026, with availability shortly after.</div>
        </div>
        <div class="faq-item">
          <div class="faq-question">How does the M5 compare to Intel's latest chips?</div>
          <div class="faq-answer">Initial benchmarks suggest the M5 will outperform Intel's current offerings in single-core performance, while offering superior power efficiency for mobile workloads.</div>
        </div>
        <div class="faq-item">
          <div class="faq-question">Will the M5 support more RAM than previous models?</div>
          <div class="faq-answer">The leak suggests a new baseline memory configuration, though Apple's final specs regarding maximum RAM capacity remain unconfirmed.</div>
        </div>
        <div class="faq-item">
          <div class="faq-question">Is the M5 a significant upgrade over the M4?</div>
          <div class="faq-answer">While single-core gains are impressive, the M5 appears to be a refinement rather than a revolutionary redesign, focusing on efficiency and AI capabilities.</div>
        </div>
      </div>
    `,
    tags: ["Apple", "MacBook", "Benchmarks", "M5"],
  },
  
  "intel-next-gen-chip-launch-date": {
    id: "1",
    slug: "intel-next-gen-chip-launch-date",
    tag: "news",
    category: "Laptops",
    categoryUrl: "/news/laptops",
    title: "Intel confirms next-gen chip launch date",
    dek: "The new architecture targets a meaningful efficiency jump over the last generation, with laptop makers already sampling early silicon.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=675&fit=crop&crop=center",
    caption: "Reference design shown; retail laptops will vary by OEM.",
    author: "Aisha Rahman",
    authorInit: "AR",
    date: "3 hours ago",
    readtime: "4 min read",
    views: "12.4k",
    body: `
      <!-- INTRO -->
      <p>Intel has set a firm launch window for its next-generation laptop chip family, ending months of speculation about whether the release would slip into next year. Partner OEMs have confirmed they are already sampling early silicon ahead of a broader rollout.</p>
      
      <p>The headline claim is a meaningful jump in performance-per-watt over the outgoing generation, driven largely by a refined process node and a reworked power-management block that shifts more control to the operating system scheduler.</p>
      
      <!-- QUOTE -->
      <blockquote>"This is the biggest architectural shift we've made to the mobile lineup in several years."</blockquote>
      
      <!-- KEY SPECS TABLE -->
      <div class="spec-table">
        <h3>📊 Intel Next-Gen Chip Specifications</h3>
        <table>
          <thead>
            <tr>
              <th>Specification</th>
              <th>Current Gen</th>
              <th>Next Gen</th>
              <th>Improvement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Performance Cores</td>
              <td>6</td>
              <td>8</td>
              <td><span class="badge-green">+33%</span></td>
            </tr>
            <tr>
              <td>Efficiency Cores</td>
              <td>8</td>
              <td>12</td>
              <td><span class="badge-green">+50%</span></td>
            </tr>
            <tr>
              <td>Max Turbo Frequency</td>
              <td>5.0 GHz</td>
              <td>5.6 GHz</td>
              <td><span class="badge-green">+12%</span></td>
            </tr>
            <tr>
              <td>Cache (L3)</td>
              <td>24 MB</td>
              <td>32 MB</td>
              <td><span class="badge-green">+33%</span></td>
            </tr>
            <tr>
              <td>Power Efficiency</td>
              <td>Baseline</td>
              <td>Improved</td>
              <td><span class="badge-green">+25%</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- BODY CONTENT -->
      <p>Early partner briefings suggest thin-and-light laptops will see the biggest gains, since the new chip is designed to sustain higher clocks within tighter thermal envelopes. Gaming and creator laptops should benefit too, though the improvements there will be less dramatic since those chassis already have more thermal headroom to work with.</p>
      
      <!-- IMAGE GALLERY -->
      <div class="gallery-grid">
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop&crop=center" alt="Intel chip architecture" loading="lazy" />
          <span class="gallery-caption">New chip architecture design</span>
        </div>
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop&crop=center" alt="Intel chip manufacturing" loading="lazy" />
          <span class="gallery-caption">Manufacturing process</span>
        </div>
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop&crop=center" alt="Laptop with Intel chip" loading="lazy" />
          <span class="gallery-caption">Laptop integration</span>
        </div>
      </div>
      
      <p>Pricing for the new chips hasn't been disclosed, but industry sources expect the first laptops built around them to land at a modest premium over current-generation equivalents, narrowing within a few months as the lineup matures.</p>
      
      <!-- SPEC SHEET -->
      <div class="spec-sheet">
        <h3>🔧 Intel Chip Specifications</h3>
        <div class="spec-grid">
          <div class="spec-item">
            <span class="spec-label">Process Node</span>
            <span class="spec-value">Intel 4</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">TDP</span>
            <span class="spec-value">15-45W</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Integrated GPU</span>
            <span class="spec-value">Xe LPG</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">AI Accelerator</span>
            <span class="spec-value">NPU 3.0</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Memory Support</span>
            <span class="spec-value">DDR5-5600</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Release Date</span>
            <span class="spec-value">Q3 2026</span>
          </div>
        </div>
      </div>
      
      <!-- PROS & CONS -->
      <div class="pros-cons">
        <div class="pros">
          <h4>👍 Advantages</h4>
          <ul>
            <li>Significant performance-per-watt improvement</li>
            <li>Better integrated graphics for 1080p gaming</li>
            <li>Enhanced power management</li>
            <li>Strong single-core performance</li>
          </ul>
        </div>
        <div class="cons">
          <h4>👎 Considerations</h4>
          <ul>
            <li>Premium pricing expected</li>
            <li>Limited availability initially</li>
            <li>Requires new motherboard</li>
            <li>Software optimization needed</li>
          </ul>
        </div>
      </div>
      
      <!-- CHECKLIST -->
      <div class="checklist">
        <h3>✅ What to expect at launch</h3>
        <ul class="checklist-items">
          <li><span class="check-icon">✓</span> A refreshed lineup spanning ultra-low-power to high-performance mobile parts</li>
          <li><span class="check-icon">✓</span> Improved integrated graphics aimed at 1080p gaming without a discrete GPU</li>
          <li><span class="check-icon">✓</span> Deeper OS-level power management for longer battery life under mixed workloads</li>
          <li><span class="check-icon">✓</span> First laptops from major OEMs expected within weeks of the announcement</li>
        </ul>
      </div>
      
      <!-- FAQ SECTION -->
      <div class="faq-section">
        <h3>❓ Frequently Asked Questions</h3>
        <div class="faq-item">
          <div class="faq-question">When will Intel's next-gen chips be available in laptops?</div>
          <div class="faq-answer">Laptops featuring the new chips are expected to be available within weeks of the official announcement, with major OEMs like Dell, Lenovo, and ASUS leading the launch.</div>
        </div>
        <div class="faq-item">
          <div class="faq-question">Will these chips support Windows 11 AI features?</div>
          <div class="faq-answer">Yes, the new chips include an NPU 3.0 AI accelerator specifically designed to support Windows 11 AI features and other AI workloads.</div>
        </div>
        <div class="faq-item">
          <div class="faq-question">How much will laptops with these chips cost?</div>
          <div class="faq-answer">Industry sources expect a modest premium over current-generation equivalents initially, with prices normalizing within a few months as the lineup matures.</div>
        </div>
      </div>
    `,
    tags: ["Intel", "CPU", "Laptops", "2026"],
  },
  
  "dell-xps-14-redesigned-hinge": {
    id: "3",
    slug: "dell-xps-14-redesigned-hinge",
    tag: "leak",
    category: "Laptops",
    categoryUrl: "/news/laptops",
    title: "Dell XPS 14 gets a redesigned hinge in 2026 refresh",
    dek: "The update addresses the wobble complaints that dogged the previous generation, according to internal parts diagrams reviewed ahead of launch.",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&h=675&fit=crop&crop=center",
    caption: "Hinge assembly renders based on leaked service documentation.",
    author: "Priya Nair",
    authorInit: "PN",
    date: "1 day ago",
    readtime: "4 min read",
    views: "9.1k",
    body: `
      <!-- INTRO -->
      <p>Dell's long-running XPS 14 has picked up a reworked hinge mechanism for its 2026 refresh, according to service documentation that has begun circulating among repair technicians ahead of the official announcement.</p>
      
      <p>The redesign appears to directly target a common complaint from owners of the previous generation: a noticeable wobble in the display when typing on a firm surface, caused by tolerances in the original dual-pivot hinge.</p>
      
      <!-- QUOTE -->
      <blockquote>"It's a small mechanical change, but it's the single most-requested fix from existing owners."</blockquote>
      
      <p>Beyond the hinge, the leaked documentation shows only minor internal changes, suggesting Dell is treating this as an incremental refresh rather than a full redesign. The chassis dimensions and port layout both appear to carry over unchanged from the outgoing model.</p>
      
      <!-- IMAGE GALLERY -->
      <div class="gallery-grid">
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop&crop=center" alt="Dell XPS 14 hinge" loading="lazy" />
          <span class="gallery-caption">Redesigned hinge mechanism</span>
        </div>
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop&crop=center" alt="Dell XPS 14 design" loading="lazy" />
          <span class="gallery-caption">XPS 14 chassis design</span>
        </div>
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=300&fit=crop&crop=center" alt="Dell XPS 14 keyboard" loading="lazy" />
          <span class="gallery-caption">Keyboard and trackpad layout</span>
        </div>
      </div>
      
      <p>Dell has not commented on the leak, and pricing details remain unknown. Past refreshes of the XPS line have typically launched at the same price point as the model they replace.</p>
      
      <!-- SPEC SHEET -->
      <div class="spec-sheet">
        <h3>🔧 Dell XPS 14 2026 Specs</h3>
        <div class="spec-grid">
          <div class="spec-item">
            <span class="spec-label">Display</span>
            <span class="spec-value">14.5" OLED</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Processor</span>
            <span class="spec-value">Intel Core Ultra 7</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">RAM</span>
            <span class="spec-value">16GB - 64GB</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Storage</span>
            <span class="spec-value">512GB - 2TB SSD</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Weight</span>
            <span class="spec-value">3.2 lbs</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Battery</span>
            <span class="spec-value">80Wh</span>
          </div>
        </div>
      </div>
      
      <!-- PROS & CONS -->
      <div class="pros-cons">
        <div class="pros">
          <h4>👍 Advantages</h4>
          <ul>
            <li>Improved hinge stability</li>
            <li>Premium build quality</li>
            <li>Excellent display options</li>
            <li>Strong performance</li>
          </ul>
        </div>
        <div class="cons">
          <h4>👎 Considerations</h4>
          <ul>
            <li>Incremental update only</li>
            <li>Same chassis design</li>
            <li>Limited port selection</li>
            <li>Premium price point</li>
          </ul>
        </div>
      </div>
      
      <!-- CHECKLIST -->
      <div class="checklist">
        <h3>✅ What's reportedly changing</h3>
        <ul class="checklist-items">
          <li><span class="check-icon">✓</span> A stiffer dual-pivot hinge assembly to reduce display wobble</li>
          <li><span class="check-icon">✓</span> Chassis dimensions and port layout unchanged from the current model</li>
          <li><span class="check-icon">✓</span> Internal cooling design appears to carry over with minor tweaks</li>
          <li><span class="check-icon">✓</span> No confirmed changes to display or keyboard specifications</li>
        </ul>
      </div>
      
      <!-- FAQ SECTION -->
      <div class="faq-section">
        <h3>❓ Frequently Asked Questions</h3>
        <div class="faq-item">
          <div class="faq-question">Will the hinge fix the wobble issue completely?</div>
          <div class="faq-answer">The redesigned hinge is specifically engineered to address the wobble complaints, and early reports suggest it significantly reduces display movement during typing.</div>
        </div>
        <div class="faq-item">
          <div class="faq-question">Is Dell planning a complete redesign soon?</div>
          <div class="faq-answer">This appears to be an incremental refresh. A complete redesign may come in a later generation, potentially with new form factors or materials.</div>
        </div>
        <div class="faq-item">
          <div class="faq-question">When will the Dell XPS 14 2026 be available?</div>
          <div class="faq-answer">Based on previous release cycles, the XPS 14 2026 is expected to be available in Q2 2026, with pre-orders possibly starting earlier.</div>
        </div>
      </div>
    `,
    tags: ["Dell", "XPS", "Design", "Leak"],
  },
  
  "asus-rog-zephyrus-240hz-oled": {
    id: "4",
    slug: "asus-rog-zephyrus-240hz-oled",
    tag: "launch",
    category: "Laptops",
    categoryUrl: "/news/laptops",
    title: "ASUS ROG Zephyrus adds 240Hz OLED option",
    dek: "The refreshed configuration keeps the same 3.4lb chassis despite the panel upgrade, according to ASUS's latest spec sheet.",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&h=675&fit=crop&crop=center",
    caption: "Panel comparison shown for illustration; actual color output may vary.",
    author: "Daniel Osei",
    authorInit: "DO",
    date: "2 days ago",
    readtime: "3 min read",
    views: "15.2k",
    body: `
      <!-- INTRO -->
      <p>ASUS has added a 240Hz OLED display option to its Zephyrus lineup, giving buyers a high-refresh alternative to the existing mini-LED panel without changing the laptop's compact 3.4lb chassis.</p>
      
      <p>The new panel targets competitive gamers who prioritize motion clarity and near-instant response times over the deeper local dimming zones that mini-LED panels offer, while still delivering the wide color gamut OLED is known for.</p>
      
      <!-- QUOTE -->
      <blockquote>"We wanted OLED's color and blacks without asking people to give up refresh rate."</blockquote>
      
      <p>Battery life with the OLED panel active is rated slightly lower than the mini-LED configuration under ASUS's testing methodology, which tracks with OLED's typically higher power draw at sustained high brightness.</p>
      
      <p>The OLED option will sit as a premium configuration within the existing Zephyrus range rather than replacing the mini-LED model outright, giving buyers a choice based on their priorities between color accuracy and battery endurance.</p>
      
      <!-- CHECKLIST -->
      <div class="checklist">
        <h3>✅ OLED vs mini-LED at a glance</h3>
        <ul class="checklist-items">
          <li><span class="check-icon">✓</span> 240Hz refresh rate on the new OLED panel, matching the mini-LED option</li>
          <li><span class="check-icon">✓</span> Wider color gamut coverage with true per-pixel blacks</li>
          <li><span class="check-icon">✓</span> Slightly reduced battery life under sustained high-brightness use</li>
          <li><span class="check-icon">✓</span> Same 3.4lb chassis weight across both panel configurations</li>
        </ul>
      </div>
    `,
    tags: ["ASUS", "ROG", "Gaming", "OLED"],
  },
  
  "lenovo-thinkpad-x1-carbon-gen-13": {
    id: "5",
    slug: "lenovo-thinkpad-x1-carbon-gen-13",
    tag: "analysis",
    category: "Laptops",
    categoryUrl: "/news/laptops",
    title: "Lenovo ThinkPad X1 Carbon Gen 13 specs surface",
    dek: "Leaked listings point to a lighter chassis and a larger battery cell, continuing the line's slow march toward all-day endurance.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=675&fit=crop&crop=center",
    caption: "Chassis renders based on leaked retailer listings.",
    author: "Sofia Bianchi",
    authorInit: "SB",
    date: "3 days ago",
    readtime: "5 min read",
    views: "7.6k",
    body: `
      <!-- INTRO -->
      <p>Retailer listings that appeared briefly before being taken down have given an early look at Lenovo's next ThinkPad X1 Carbon, pointing to a lighter chassis and a noticeably larger battery cell than the current generation.</p>
      
      <p>The weight reduction appears to come from a reworked magnesium-lithium alloy in the lid, a material Lenovo has used selectively in past ThinkPad models but not across the full X1 Carbon line until now.</p>
      
      <!-- QUOTE -->
      <blockquote>"Every gram matters to the people who carry this laptop between meetings all day."</blockquote>
      
      <p>The larger battery cell suggests Lenovo is prioritizing all-day battery life claims, an area where the ThinkPad line has historically lagged behind some competitors despite otherwise strong build quality and keyboard feel.</p>
      
      <p>The listings did not include pricing, and Lenovo has a history of adjusting specs between leaked pre-release listings and final retail configurations, so some details here could still change before an official launch.</p>
      
      <!-- CHECKLIST -->
      <div class="checklist">
        <h3>✅ What the leaked listings show</h3>
        <ul class="checklist-items">
          <li><span class="check-icon">✓</span> A lighter magnesium-lithium lid, extended from other ThinkPad models</li>
          <li><span class="check-icon">✓</span> A larger battery cell aimed at improving all-day battery claims</li>
          <li><span class="check-icon">✓</span> Keyboard and TrackPoint design appear unchanged from Gen 12</li>
          <li><span class="check-icon">✓</span> No confirmed pricing or availability date yet</li>
        </ul>
      </div>
    `,
    tags: ["Lenovo", "ThinkPad", "Business", "Leak"],
  },
  
  "new-gaming-laptops-rtx-50-series": {
    id: "6",
    slug: "new-gaming-laptops-rtx-50-series",
    tag: "news",
    category: "Laptops",
    categoryUrl: "/news/laptops",
    title: "New gaming laptops with RTX 50-series announced",
    dek: "The latest gaming laptops feature NVIDIA's next-gen RTX 50-series GPUs with improved ray tracing and AI performance.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=675&fit=crop&crop=center",
    caption: "RTX 50-series gaming laptops shown at the event.",
    author: "Mazhar Hussan",
    authorInit: "MH",
    date: "4 days ago",
    readtime: "4 min read",
    views: "13.7k",
    body: `
      <!-- INTRO -->
      <p>NVIDIA's RTX 50-series GPUs are making their way into gaming laptops, promising significant improvements in ray tracing performance and AI-powered features.</p>
      
      <p>Early benchmarks show up to 40% better performance in ray-traced games compared to the previous generation, making these laptops a compelling choice for serious gamers.</p>
      
      <!-- QUOTE -->
      <blockquote>"This is the biggest leap in gaming performance we've seen in years."</blockquote>
      
      <p>Manufacturers including ASUS, MSI, and Razer have already announced their RTX 50-series gaming laptops, with models ranging from thin-and-light to full-sized desktop replacements.</p>
      
      <p>The new GPUs also feature improved power efficiency, allowing for better performance per watt and longer battery life during less demanding tasks.</p>
      
      <!-- CHECKLIST -->
      <div class="checklist">
        <h3>✅ Key features of RTX 50-series laptops</h3>
        <ul class="checklist-items">
          <li><span class="check-icon">✓</span> Up to 40% better ray tracing performance</li>
          <li><span class="check-icon">✓</span> AI-powered DLSS 4 for improved image quality</li>
          <li><span class="check-icon">✓</span> Improved power efficiency for longer battery life</li>
          <li><span class="check-icon">✓</span> Available in a wide range of form factors</li>
        </ul>
      </div>
    `,
    tags: ["Gaming", "NVIDIA", "RTX", "Laptops"],
  },
  
  "hp-elitebook-ai-features": {
    id: "7",
    slug: "hp-elitebook-ai-features",
    tag: "update",
    category: "Laptops",
    categoryUrl: "/news/laptops",
    title: "HP EliteBook refresh brings AI-powered features",
    dek: "HP's new business laptops include AI-driven noise cancellation, adaptive battery management, and intelligent performance tuning.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=675&fit=crop&crop=center",
    caption: "HP EliteBook series shown with new AI features.",
    author: "Sarah Khan",
    authorInit: "SK",
    date: "5 days ago",
    readtime: "4 min read",
    views: "8.2k",
    body: `
      <!-- INTRO -->
      <p>HP has unveiled its latest EliteBook refresh, integrating AI-powered features designed to improve productivity and user experience in business environments.</p>
      
      <p>The new models feature AI-driven noise cancellation for video calls, adaptive battery management that learns user behavior, and intelligent performance tuning that optimizes resources based on workload.</p>
      
      <!-- QUOTE -->
      <blockquote>"AI is no longer a luxury feature — it's becoming essential for business productivity."</blockquote>
      
      <p>The EliteBook's AI features include automatic brightness and color adjustment based on ambient conditions, as well as intelligent cooling that adapts to usage patterns.</p>
      
      <p>HP claims these features can improve battery life by up to 15% in real-world usage, making the EliteBook a compelling choice for professionals who need reliable all-day performance.</p>
      
      <!-- CHECKLIST -->
      <div class="checklist">
        <h3>✅ Key AI features in the new EliteBook</h3>
        <ul class="checklist-items">
          <li><span class="check-icon">✓</span> AI-driven noise cancellation for crystal-clear calls</li>
          <li><span class="check-icon">✓</span> Adaptive battery management learning user habits</li>
          <li><span class="check-icon">✓</span> Intelligent performance tuning for optimal resource usage</li>
          <li><span class="check-icon">✓</span> Automatic brightness and color adjustment based on environment</li>
        </ul>
      </div>
    `,
    tags: ["HP", "EliteBook", "AI", "Business", "Laptops"],
  },
};

// ─── OTHER CATEGORIES (for navigation) ──────────────────
export const otherLaptopCategories = [
  { label: "Phones", href: "/news/phones", icon: "📱", color: "#1FA25A" },
  { label: "Watches", href: "/news/watches", icon: "⌚", color: "#8FA83E" },
  { label: "Audio", href: "/news/audio", icon: "🎧", color: "#347A5B" },
  { label: "Technology", href: "/news/technology", icon: "💡", color: "#12836B" },
  { label: "Gaming", href: "/news/gaming", icon: "🎮", color: "#6E8F2B" },
  { label: "Cameras", href: "/news/cameras", icon: "📸", color: "#1FA25A" },
];

// ─── CROSS CATEGORY DATA ────────────────────────────────
export const crossCategoryData: CrossCategoryItem[] = [
  { title: "Galaxy Watch 8 leak hints at longer battery life", cat: "Watches", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop&crop=center", time: "5 hours ago" },
  { title: "Sony's next flagship earbuds add adaptive ANC", cat: "Audio", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop&crop=center", time: "9 hours ago" },
  { title: "Foldable phone shipments hit a new quarterly high", cat: "Phones", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop&crop=center", time: "1 day ago" },
  { title: "New mirrorless camera targets hybrid creators", cat: "Cameras", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop&crop=center", time: "2 days ago" },
  { title: "Handheld gaming PC sales triple year over year", cat: "Gaming", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=center", time: "2 days ago" },
];

// ─── HELPER FUNCTIONS ──────────────────────────────────
export const getLaptopArticleBySlug = (slug: string): LaptopArticle | null => {
  return laptopArticles[slug] || null;
};

export const getRelatedLaptopArticles = (slug: string, limit: number = 5): LaptopArticle[] => {
  return Object.values(laptopArticles)
    .filter((a) => a.slug !== slug)
    .slice(0, limit);
};

export const getSameCategoryLaptopArticles = (slug: string, limit: number = 3): LaptopArticle[] => {
  const current = getLaptopArticleBySlug(slug);
  if (!current) return [];
  return Object.values(laptopArticles)
    .filter((a) => a.slug !== slug && a.category === current.category)
    .slice(0, limit);
};

export const getLaptopCategoryColor = (catId: string): string => {
  const cat = laptopCategories.find((c) => c.id === catId);
  return cat?.color || "#4C7A1F";
};

export const getLaptopCategoryCount = (catId: string): number => {
  if (catId === "all") return laptopNewsList.length;
  return laptopNewsList.filter((item) => item.category === catId).length;
};

export const getLaptopUniqueTags = (): string[] => {
  const tags = laptopNewsList.map((item) => item.tag);
  return [...new Set(tags)];
};

export const generateLaptopStaticParams = () => {
  return Object.keys(laptopArticles).map((slug) => ({
    slug,
  }));
};