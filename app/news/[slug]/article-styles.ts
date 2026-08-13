// app/news/[slug]/article-styles.ts

export const baseArticleStyles = `
  /* Base article styles */
  .news-content h1 {
    font-family: 'Fraunces', serif;
    font-weight: 600;
    font-size: 2.2rem;
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  .news-content h2 {
    font-family: 'Fraunces', serif;
    font-weight: 600;
    font-size: 1.8rem;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }
  .news-content h3 {
    font-family: 'Fraunces', serif;
    font-weight: 600;
    font-size: 1.4rem;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    line-height: 1.3;
  }
  .news-content h4 {
    font-family: 'Fraunces', serif;
    font-weight: 600;
    font-size: 1.1rem;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
    line-height: 1.3;
  }
  .news-content p {
    font-size: 1.05rem;
    line-height: 1.85;
    margin-bottom: 1.25rem;
    color: #1a2416;
  }
  .news-content ul, .news-content ol {
    margin-left: 1.5rem;
    margin-bottom: 1.25rem;
  }
  .news-content li {
    font-size: 1.05rem;
    line-height: 1.85;
    margin-bottom: 0.25rem;
  }
  .news-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.25rem 0;
    font-size: 0.9rem;
  }
  .news-content table thead th {
    background: #0A3F26;
    color: #D4F26B;
    padding: 0.6rem 1rem;
    text-align: left;
    font-weight: 600;
  }
  .news-content table thead th:first-child {
    border-radius: 8px 0 0 0;
  }
  .news-content table thead th:last-child {
    border-radius: 0 8px 0 0;
  }
  .news-content table tbody td {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #e8ede5;
  }
  .news-content table tbody tr:last-child td {
    border-bottom: none;
  }
  .news-content table tbody tr:hover {
    background: #f5f7f6;
  }
  .news-content .highlight-box {
    background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
    border-left: 4px solid #0F6B3E;
    padding: 1.25rem 1.5rem;
    border-radius: 0 12px 12px 0;
    margin: 1.5rem 0;
  }
  .news-content .highlight-box h3 {
    margin-top: 0;
    color: #0A3F26;
  }
  .news-content .highlight-box ul {
    margin-bottom: 0;
  }
  .news-content .spec-grid {
    background: #f5f7f6;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
  .news-content .spec-grid h3 {
    margin-top: 0;
    color: #0A3F26;
  }
  .news-content .spec-grid ul {
    margin-bottom: 0;
  }
  .news-content .conclusion-box {
    background: #0A3F26;
    color: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
  .news-content .conclusion-box h3 {
    color: #D4F26B;
    margin-top: 0;
  }
  .news-content .conclusion-box p {
    color: rgba(255,255,255,0.9);
  }
  .news-content .pros-cons-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .news-content .pros {
    background: #e8f5e9;
    padding: 1.25rem;
    border-radius: 12px;
    border: 1px solid #1FA25A;
  }
  .news-content .pros h4 {
    color: #0A3F26;
    margin-top: 0;
  }
  .news-content .pros ul {
    margin-bottom: 0;
  }
  .news-content .pros ul li::marker {
    content: "✅ ";
  }
  .news-content .cons {
    background: #fce4ec;
    padding: 1.25rem;
    border-radius: 12px;
    border: 1px solid #e53935;
  }
  .news-content .cons h4 {
    color: #c62828;
    margin-top: 0;
  }
  .news-content .cons ul {
    margin-bottom: 0;
  }
  .news-content .cons ul li::marker {
    content: "❌ ";
  }
  .news-content .overflow-x-auto {
    overflow-x: auto;
    margin: 1.25rem 0;
  }
  .news-content .overflow-x-auto table {
    min-width: 500px;
  }
  .news-content blockquote {
    font-family: 'Fraunces', serif;
    font-weight: 500;
    font-style: italic;
    font-size: 1.35rem;
    line-height: 1.5;
    color: #0A3F26;
    border-left: 3px solid #1FA25A;
    padding: 0.5rem 0 0.5rem 1.5rem;
    margin: 1.5rem 0;
  }
  .news-content img {
    border-radius: 12px;
    width: 100%;
    height: auto;
  }

  /* ===== PREMIUM UI STYLES ===== */
  .article-intro.premium {
    background: linear-gradient(135deg, #f5faf5, #e8f5e9);
    padding: 2rem;
    border-radius: 16px;
    margin: 1.5rem 0;
    border-left: 4px solid #1FA25A;
  }
  .article-intro.premium p {
    font-size: 1.15rem;
    line-height: 1.8;
    margin-bottom: 0;
    color: #1a2416;
  }

  /* Image Gallery */
  .image-gallery.premium {
    margin: 2rem 0;
  }
  .image-gallery.premium h3 {
    font-family: 'Fraunces', serif;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #0A3F26;
  }
  .gallery-grid.premium {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  .gallery-item.premium {
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    background: #eef1e9;
    aspect-ratio: 4/3;
    cursor: pointer;
  }
  .gallery-item.premium img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  .gallery-item.premium:hover img {
    transform: scale(1.05);
  }
  .gallery-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    background: rgba(0,0,0,0.6);
    color: white;
    font-size: 0.75rem;
    text-align: center;
    font-weight: 600;
  }

  /* Color Grid */
  .color-grid.premium {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .color-card.premium {
    padding: 1.5rem 1rem;
    border-radius: 12px;
    text-align: center;
    border: 1px solid #e8ede5;
    transition: all 0.3s ease;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .color-card.premium:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  }
  .color-name {
    display: block;
    font-weight: 700;
    font-size: 0.9rem;
    color: white;
    text-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }
  .color-hex {
    display: block;
    font-size: 0.7rem;
    color: rgba(255,255,255,0.8);
    margin-top: 0.25rem;
  }

  /* Specs Grid */
  .specs-grid.premium {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 0.75rem;
    margin: 1.5rem 0;
  }
  .spec-item.premium {
    background: #f5f7f6;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .spec-label {
    font-size: 0.85rem;
    color: #6a7a6e;
  }
  .spec-value {
    font-weight: 600;
    font-size: 0.9rem;
    color: #1a2416;
  }

  /* Camera Grid */
  .camera-grid.premium {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .camera-card.premium {
    background: #f5f7f6;
    padding: 1.25rem;
    border-radius: 12px;
    text-align: center;
    border: 1px solid #e8ede5;
    transition: all 0.3s ease;
  }
  .camera-card.premium:hover {
    border-color: #1FA25A;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(15,107,62,0.1);
  }
  .camera-icon {
    font-size: 2rem;
    display: block;
    margin-bottom: 0.5rem;
  }
  .camera-card.premium h4 {
    font-size: 0.9rem;
    margin: 0.25rem 0;
    color: #0A3F26;
  }
  .camera-card.premium p {
    font-size: 0.8rem;
    color: #6a7a6e;
    margin: 0;
  }

  /* Performance Grid */
  .performance-grid.premium {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.75rem;
    margin: 1.5rem 0;
  }
  .perf-item.premium {
    background: #f5f7f6;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .perf-label {
    font-size: 0.8rem;
    color: #6a7a6e;
  }
  .perf-value {
    font-weight: 600;
    font-size: 0.85rem;
    color: #0A3F26;
  }

  /* Rating Grid */
  .rating-grid.premium {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
  }
  .rating-item.premium {
    background: #f5f7f6;
    padding: 1rem;
    border-radius: 12px;
    text-align: center;
  }
  .rating-label {
    display: block;
    font-weight: 600;
    font-size: 0.9rem;
    color: #0A3F26;
    margin-bottom: 0.25rem;
  }
  .stars {
    font-size: 1.2rem;
    letter-spacing: 0.1rem;
  }
  .rating-text {
    display: block;
    font-size: 0.8rem;
    color: #6a7a6e;
    margin-top: 0.25rem;
  }

  /* Pros & Cons */
  .pros-cons-grid.premium {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 2rem 0;
  }
  .pros.premium, .cons.premium {
    padding: 1.5rem;
    border-radius: 12px;
  }
  .pros.premium {
    background: #e8f5e9;
    border: 1px solid #1FA25A;
  }
  .cons.premium {
    background: #fce4ec;
    border: 1px solid #e53935;
  }
  .pros.premium h4, .cons.premium h4 {
    margin-top: 0;
    font-size: 1.1rem;
  }
  .pros.premium ul, .cons.premium ul {
    margin: 0;
    padding-left: 1.25rem;
  }
  .pros.premium ul li::marker {
    content: "✅ ";
  }
  .cons.premium ul li::marker {
    content: "❌ ";
  }
  .pros.premium ul li, .cons.premium ul li {
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 0.25rem;
  }

  /* ===== TABLET COMPARISON ===== */
  .tablet-comparison.premium {
    margin: 2.5rem 0;
    padding: 1.5rem;
    background: #f8faf8;
    border-radius: 16px;
    border: 1px solid #e8ede5;
  }
  .tablet-comparison.premium h3 {
    font-family: 'Fraunces', serif;
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
    color: #0A3F26;
  }
  .comparison-grid.premium {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.25rem;
  }
  .device-card.premium {
    background: white;
    border-radius: 12px;
    padding: 1.25rem;
    border: 1px solid #e8ede5;
    transition: all 0.3s ease;
    position: relative;
  }
  .device-card.premium:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(15, 24, 15, 0.12);
  }
  .device-card.premium.featured {
    border: 2px solid #1FA25A;
    background: #f5faf5;
  }
  .device-icon {
    font-size: 2rem;
    display: block;
    margin-bottom: 0.5rem;
  }
  .device-card.premium h4 {
    font-family: 'Fraunces', serif;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #0A3F26;
  }
  .device-specs {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .spec-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    padding: 0.25rem 0;
    border-bottom: 1px dashed #e8ede5;
  }
  .spec-row span:first-child {
    color: #6a7a6e;
  }
  .spec-row span:last-child {
    font-weight: 600;
    color: #1a2416;
  }
  .badge {
    display: inline-block;
    margin-top: 0.75rem;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 700;
    background: #D4F26B;
    color: #0A3F26;
  }
  .device-card.premium.featured .badge {
    background: #1FA25A;
    color: white;
  }

  /* ===== FAQ SECTION ===== */
  .faq-section.premium {
    margin: 2.5rem 0;
    padding: 1.5rem;
    background: #f8faf8;
    border-radius: 16px;
    border: 1px solid #e8ede5;
  }
  .faq-section.premium h3 {
    font-family: 'Fraunces', serif;
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
    color: #0A3F26;
  }
  .faq-item.premium {
    background: white;
    border-radius: 10px;
    padding: 1rem 1.25rem;
    margin-bottom: 0.75rem;
    border: 1px solid #e8ede5;
    transition: all 0.2s ease;
  }
  .faq-item.premium:hover {
    border-color: #1FA25A;
  }
  .faq-question {
    font-weight: 600;
    font-size: 0.95rem;
    color: #0A3F26;
    margin-bottom: 0.4rem;
  }
  .faq-answer {
    font-size: 0.9rem;
    color: #4a5a4e;
    line-height: 1.6;
  }

  /* ===== TRAVEL GUIDE ===== */
  .travel-guide.premium {
    margin: 2.5rem 0;
    padding: 1.5rem;
    background: #f8faf8;
    border-radius: 16px;
    border: 1px solid #e8ede5;
  }
  .travel-guide.premium h3 {
    font-family: 'Fraunces', serif;
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
    color: #0A3F26;
  }
  .travel-grid.premium {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  .travel-card.premium {
    background: white;
    padding: 1.25rem;
    border-radius: 12px;
    text-align: center;
    border: 1px solid #e8ede5;
    transition: all 0.3s ease;
  }
  .travel-card.premium:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(15, 24, 15, 0.1);
    border-color: #1FA25A;
  }
  .travel-icon {
    font-size: 2rem;
    display: block;
    margin-bottom: 0.5rem;
  }
  .travel-card.premium h4 {
    font-size: 1rem;
    margin: 0.25rem 0;
    color: #0A3F26;
  }
  .travel-card.premium p {
    font-size: 0.85rem;
    color: #4a5a4e;
    margin: 0.25rem 0 0 0;
    line-height: 1.5;
  }

  /* ===== VERDICT GRID ===== */
  .verdict-grid.premium {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
  .verdict-item.premium {
    background: rgba(255,255,255,0.1);
    padding: 0.75rem;
    border-radius: 8px;
    text-align: center;
  }
  .verdict-label {
    display: block;
    font-size: 0.75rem;
    color: rgba(255,255,255,0.7);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .verdict-value {
    display: block;
    font-weight: 700;
    font-size: 1rem;
    color: white;
    margin-top: 0.25rem;
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 768px) {
    .news-content h1 {
      font-size: 1.6rem;
    }
    .news-content h2 {
      font-size: 1.4rem;
    }
    .news-content h3 {
      font-size: 1.2rem;
    }
    .pros-cons-grid.premium {
      grid-template-columns: 1fr;
    }
    .comparison-grid.premium {
      grid-template-columns: 1fr;
    }
    .gallery-grid.premium {
      grid-template-columns: 1fr 1fr;
    }
    .color-grid.premium {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .specs-grid.premium {
      grid-template-columns: 1fr 1fr;
    }
    .camera-grid.premium {
      grid-template-columns: 1fr 1fr;
    }
    .performance-grid.premium {
      grid-template-columns: 1fr 1fr;
    }
    .rating-grid.premium {
      grid-template-columns: 1fr 1fr;
    }
    .travel-grid.premium {
      grid-template-columns: 1fr 1fr;
    }
    .verdict-grid.premium {
      grid-template-columns: 1fr;
    }
    .news-content table {
      font-size: 0.8rem;
    }
    .news-content .highlight-box {
      padding: 1rem;
    }
    .news-content .spec-grid {
      padding: 1rem;
    }
    .news-content .conclusion-box {
      padding: 1rem;
    }
    .news-content .pros, .news-content .cons {
      padding: 1rem;
    }
    .news-content blockquote {
      font-size: 1.1rem;
      padding-left: 1rem;
    }
    .article-intro.premium {
      padding: 1.25rem;
    }
    .faq-section.premium {
      padding: 1rem;
    }
    .tablet-comparison.premium {
      padding: 1rem;
    }
    .travel-guide.premium {
      padding: 1rem;
    }
  }

  @media (max-width: 480px) {
    .gallery-grid.premium {
      grid-template-columns: 1fr;
    }
    .color-grid.premium {
      grid-template-columns: 1fr 1fr;
    }
    .specs-grid.premium {
      grid-template-columns: 1fr;
    }
    .camera-grid.premium {
      grid-template-columns: 1fr;
    }
    .performance-grid.premium {
      grid-template-columns: 1fr;
    }
    .rating-grid.premium {
      grid-template-columns: 1fr;
    }
    .travel-grid.premium {
      grid-template-columns: 1fr;
    }
  }
`;