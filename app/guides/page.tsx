// app/guides/page.tsx
import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { fetchPhonesFromDB } from "@/lib/phone-data-service";
import { STATIC_PHONES } from "@/app/phones/finder/data/static-phone-data";

export const metadata: Metadata = {
  title: "Smartphone Guides - Expert Buying Advice & Tips | 7pexel",
  description: "Expert smartphone guides covering everything from buying advice to photography tips. Learn how to choose the perfect phone, master your camera, and extend battery life.",
  keywords: "smartphone guides, phone buying guide, camera tips, battery life tips, phone photography, tech tutorials",
  openGraph: {
    title: "Smartphone Guides - Expert Buying Advice & Tips | 7pexel",
    description: "Expert smartphone guides covering everything from buying advice to photography tips.",
    images: ["/og-image.jpg"],
  },
};

export default async function GuidesPage() {
  // Fetch phones for recommendations
  let phones = [];
  try {
    const result = await fetchPhonesFromDB({ limit: 100 });
    phones = result.data || [];
  } catch (error) {
    phones = STATIC_PHONES;
  }

  // Get top phones by rating
  const topPhones = [...phones]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  // Get best value phones
  const bestValuePhones = [...phones]
    .filter(p => parseInt(p.price) < 800 && (p.rating || 0) > 4)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);

  // Get flagship phones
  const flagshipPhones = [...phones]
    .filter(p => parseInt(p.price) > 900)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);

  return (
    <>
      <Header />
      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        {/* Hero */}
        <div className="relative mb-12 rounded-3xl overflow-hidden bg-gradient-to-br from-[#7F011F] to-[#a80a30] text-white p-8 md:p-12 shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <h1 className="font-fraunces text-3xl md:text-5xl font-medium mb-3 tracking-tight">
              Smartphone <span className="text-white/80">Guides</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-2xl">
              Expert advice, tips, and tutorials to help you choose, use, and master your smartphone.
            </p>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap gap-3 mb-8">
          <a href="#buying-guide" className="px-4 py-2 bg-white rounded-xl border border-[var(--color-line)] hover:border-[#7F011F] transition-all text-sm font-medium hover:shadow-md">
            🛒 Buying Guide
          </a>
          <a href="#camera-guide" className="px-4 py-2 bg-white rounded-xl border border-[var(--color-line)] hover:border-[#7F011F] transition-all text-sm font-medium hover:shadow-md">
            📷 Camera Guide
          </a>
          <a href="#battery-guide" className="px-4 py-2 bg-white rounded-xl border border-[var(--color-line)] hover:border-[#7F011F] transition-all text-sm font-medium hover:shadow-md">
            🔋 Battery Guide
          </a>
          <a href="#performance-guide" className="px-4 py-2 bg-white rounded-xl border border-[var(--color-line)] hover:border-[#7F011F] transition-all text-sm font-medium hover:shadow-md">
            ⚡ Performance Guide
          </a>
          <a href="#value-guide" className="px-4 py-2 bg-white rounded-xl border border-[var(--color-line)] hover:border-[#7F011F] transition-all text-sm font-medium hover:shadow-md">
            💰 Value Guide
          </a>
        </div>

        {/* ============================================================ */}
        {/* SECTION 1: BUYING GUIDE */}
        {/* ============================================================ */}
        <section id="buying-guide" className="mb-12 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🛒</span>
            <h2 className="font-fraunces text-2xl font-medium">Smartphone Buying Guide</h2>
          </div>
          
          <div className="bg-white rounded-2xl border border-[var(--color-line)] p-6 md:p-8 shadow-sm">
            <p className="text-[#6d4a4a] mb-6">
              Choosing the right smartphone can be overwhelming. This guide breaks down everything you need to know to make the perfect choice.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="p-5 bg-[#fbf8ff] rounded-xl border border-[var(--color-line)]">
                <div className="w-10 h-10 rounded-full bg-[#7F011F]/10 text-[#7F011F] flex items-center justify-center font-bold text-lg mb-3">1</div>
                <h3 className="font-semibold text-[#1a1a1a] mb-2">Define Your Budget</h3>
                <p className="text-sm text-[#6d4a4a]">Determine how much you want to spend. Phones range from $200 to $1,500+. Set a realistic budget.</p>
              </div>

              {/* Step 2 */}
              <div className="p-5 bg-[#fbf8ff] rounded-xl border border-[var(--color-line)]">
                <div className="w-10 h-10 rounded-full bg-[#7F011F]/10 text-[#7F011F] flex items-center justify-center font-bold text-lg mb-3">2</div>
                <h3 className="font-semibold text-[#1a1a1a] mb-2">Identify Your Priorities</h3>
                <p className="text-sm text-[#6d4a4a]">What matters most? Camera, battery, performance, or display? Choose based on your needs.</p>
              </div>

              {/* Step 3 */}
              <div className="p-5 bg-[#fbf8ff] rounded-xl border border-[var(--color-line)]">
                <div className="w-10 h-10 rounded-full bg-[#7F011F]/10 text-[#7F011F] flex items-center justify-center font-bold text-lg mb-3">3</div>
                <h3 className="font-semibold text-[#1a1a1a] mb-2">Compare Options</h3>
                <p className="text-sm text-[#6d4a4a]">Use our <Link href="/compare" className="text-[#7F011F] font-medium hover:underline">comparison tool</Link> to see phones side by side.</p>
              </div>
            </div>

            {/* Top Picks */}
            <div className="mt-6 p-4 bg-gradient-to-r from-[#7F011F]/5 to-[#a80a30]/5 rounded-xl border border-[#7F011F]/10">
              <h4 className="font-semibold text-[#1a1a1a] mb-3">🏆 Top Picks by Category</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/phones/finder/samsung-galaxy-s26-ultra" className="p-3 bg-white rounded-xl border border-[var(--color-line)] hover:border-[#7F011F] transition-all text-center">
                  <p className="text-xs font-medium text-[#7F011F]">Best Overall</p>
                  <p className="text-sm font-semibold">Samsung S26 Ultra</p>
                </Link>
                <Link href="/phones/finder/apple-iphone-16-pro-max" className="p-3 bg-white rounded-xl border border-[var(--color-line)] hover:border-[#7F011F] transition-all text-center">
                  <p className="text-xs font-medium text-[#7F011F]">Best Camera</p>
                  <p className="text-sm font-semibold">iPhone 16 Pro Max</p>
                </Link>
                <Link href="/phones/finder/google-pixel-10-pro" className="p-3 bg-white rounded-xl border border-[var(--color-line)] hover:border-[#7F011F] transition-all text-center">
                  <p className="text-xs font-medium text-[#7F011F]">Best Value</p>
                  <p className="text-sm font-semibold">Pixel 10 Pro</p>
                </Link>
                <Link href="/phones/finder/nothing-phone-3" className="p-3 bg-white rounded-xl border border-[var(--color-line)] hover:border-[#7F011F] transition-all text-center">
                  <p className="text-xs font-medium text-[#7F011F]">Best Design</p>
                  <p className="text-sm font-semibold">Nothing Phone (3)</p>
                </Link>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/phones/finder"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#7F011F] text-white rounded-xl hover:bg-[#a80a30] transition-all shadow-lg shadow-[#7F011F]/30"
              >
                🔍 Browse All Phones
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 2: CAMERA GUIDE */}
        {/* ============================================================ */}
        <section id="camera-guide" className="mb-12 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📷</span>
            <h2 className="font-fraunces text-2xl font-medium">Phone Camera Guide</h2>
          </div>
          
          <div className="bg-white rounded-2xl border border-[var(--color-line)] p-6 md:p-8 shadow-sm">
            <p className="text-[#6d4a4a] mb-6">
              Learn how to take stunning photos with your smartphone. From composition to settings, master mobile photography.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tips */}
              <div>
                <h3 className="font-semibold text-[#1a1a1a] mb-3">📸 Photography Tips</h3>
                <ul className="space-y-2 text-sm text-[#6d4a4a]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#7F011F] mt-0.5">•</span>
                    Use natural light whenever possible
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7F011F] mt-0.5">•</span>
                    Clean your lens before taking photos
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7F011F] mt-0.5">•</span>
                    Use the rule of thirds for composition
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7F011F] mt-0.5">•</span>
                    Tap to focus and adjust exposure
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7F011F] mt-0.5">•</span>
                    Use HDR mode for high-contrast scenes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7F011F] mt-0.5">•</span>
                    Shoot in RAW for more editing control
                  </li>
                </ul>
              </div>

              {/* Best Camera Phones */}
              <div>
                <h3 className="font-semibold text-[#1a1a1a] mb-3">🏆 Best Camera Phones</h3>
                <div className="space-y-2">
                  {topPhones.slice(0, 5).map((phone: any) => (
                    <Link
                      key={phone.slug}
                      href={`/phones/finder/${phone.slug}`}
                      className="flex items-center justify-between p-2 bg-[#fbf8ff] rounded-lg hover:bg-[#f5f5f5] transition-colors"
                    >
                      <span className="text-sm font-medium">{phone.brand} {phone.model}</span>
                      <span className="text-xs bg-[#7F011F]/10 text-[#7F011F] px-2 py-0.5 rounded-full">⭐ {phone.rating || 4.5}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/collections/best-camera"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#7F011F] text-white rounded-xl hover:bg-[#a80a30] transition-all shadow-lg shadow-[#7F011F]/30"
              >
                📸 View Best Camera Phones
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 3: BATTERY GUIDE */}
        {/* ============================================================ */}
        <section id="battery-guide" className="mb-12 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔋</span>
            <h2 className="font-fraunces text-2xl font-medium">Battery Life Guide</h2>
          </div>
          
          <div className="bg-white rounded-2xl border border-[var(--color-line)] p-6 md:p-8 shadow-sm">
            <p className="text-[#6d4a4a] mb-6">
              Maximize your phone's battery life with these expert tips. Learn how to charge properly and extend battery longevity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tip 1 */}
              <div className="p-4 bg-[#fbf8ff] rounded-xl border border-[var(--color-line)]">
                <span className="text-2xl block mb-2">⚡</span>
                <h4 className="font-semibold text-sm text-[#1a1a1a] mb-1">Optimize Charging</h4>
                <p className="text-xs text-[#6d4a4a]">Avoid charging to 100% regularly. Keep between 20-80% for battery health.</p>
              </div>

              {/* Tip 2 */}
              <div className="p-4 bg-[#fbf8ff] rounded-xl border border-[var(--color-line)]">
                <span className="text-2xl block mb-2">🔆</span>
                <h4 className="font-semibold text-sm text-[#1a1a1a] mb-1">Reduce Brightness</h4>
                <p className="text-xs text-[#6d4a4a]">Lower screen brightness and use auto-brightness to save battery.</p>
              </div>

              {/* Tip 3 */}
              <div className="p-4 bg-[#fbf8ff] rounded-xl border border-[var(--color-line)]">
                <span className="text-2xl block mb-2">📡</span>
                <h4 className="font-semibold text-sm text-[#1a1a1a] mb-1">Manage Connectivity</h4>
                <p className="text-xs text-[#6d4a4a]">Turn off Bluetooth, WiFi, and GPS when not in use.</p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/collections/best-battery"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#7F011F] text-white rounded-xl hover:bg-[#a80a30] transition-all shadow-lg shadow-[#7F011F]/30"
              >
                🔋 View Best Battery Phones
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 4: PERFORMANCE GUIDE */}
        {/* ============================================================ */}
        <section id="performance-guide" className="mb-12 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚡</span>
            <h2 className="font-fraunces text-2xl font-medium">Performance Guide</h2>
          </div>
          
          <div className="bg-white rounded-2xl border border-[var(--color-line)] p-6 md:p-8 shadow-sm">
            <p className="text-[#6d4a4a] mb-6">
              Understand smartphone performance metrics. Learn about processors, RAM, storage, and what really matters.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <div>
                <h3 className="font-semibold text-[#1a1a1a] mb-3">📊 Key Metrics</h3>
                <div className="space-y-2 text-sm text-[#6d4a4a]">
                  <div className="flex justify-between p-2 bg-[#fbf8ff] rounded-lg">
                    <span>Processor (Chipset)</span>
                    <span className="font-medium text-[#1a1a1a]">Snapdragon / Apple / Tensor</span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#fbf8ff] rounded-lg">
                    <span>RAM</span>
                    <span className="font-medium text-[#1a1a1a]">8GB - 24GB</span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#fbf8ff] rounded-lg">
                    <span>Storage</span>
                    <span className="font-medium text-[#1a1a1a]">128GB - 1TB</span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#fbf8ff] rounded-lg">
                    <span>Antutu Score</span>
                    <span className="font-medium text-[#1a1a1a]">1.2M - 2.2M</span>
                  </div>
                </div>
              </div>

              {/* Best Performance Phones */}
              <div>
                <h3 className="font-semibold text-[#1a1a1a] mb-3">🏆 Best Performance Phones</h3>
                <div className="space-y-2">
                  {flagshipPhones.map((phone: any) => (
                    <Link
                      key={phone.slug}
                      href={`/phones/finder/${phone.slug}`}
                      className="flex items-center justify-between p-2 bg-[#fbf8ff] rounded-lg hover:bg-[#f5f5f5] transition-colors"
                    >
                      <span className="text-sm font-medium">{phone.brand} {phone.model}</span>
                      <span className="text-xs bg-[#7F011F]/10 text-[#7F011F] px-2 py-0.5 rounded-full">⚡ {phone.antutu_score || 'N/A'}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/collections/best-gaming"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#7F011F] text-white rounded-xl hover:bg-[#a80a30] transition-all shadow-lg shadow-[#7F011F]/30"
              >
                ⚡ View Best Gaming Phones
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 5: VALUE GUIDE */}
        {/* ============================================================ */}
        <section id="value-guide" className="mb-12 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💰</span>
            <h2 className="font-fraunces text-2xl font-medium">Value Guide</h2>
          </div>
          
          <div className="bg-white rounded-2xl border border-[var(--color-line)] p-6 md:p-8 shadow-sm">
            <p className="text-[#6d4a4a] mb-6">
              Find the best value smartphones. Get premium features without breaking the bank.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bestValuePhones.map((phone: any) => (
                <Link
                  key={phone.slug}
                  href={`/phones/finder/${phone.slug}`}
                  className="p-4 bg-[#fbf8ff] rounded-xl border border-[var(--color-line)] hover:border-[#7F011F] transition-all text-center hover:shadow-md"
                >
                  <p className="text-sm font-semibold line-clamp-1">{phone.brand} {phone.model}</p>
                  <p className="text-xs text-[#6d4a4a]">${phone.price}</p>
                  <p className="text-xs text-[#0F6B3E] font-medium">⭐ {phone.rating || 4.0}</p>
                </Link>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/collections/best-value"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#7F011F] text-white rounded-xl hover:bg-[#a80a30] transition-all shadow-lg shadow-[#7F011F]/30"
              >
                💰 View Best Value Phones
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 6: RELATED GUIDES */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📚</span>
            <h2 className="font-fraunces text-2xl font-medium">More Guides</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/guides/phone-photography" className="p-5 bg-white rounded-2xl border border-[var(--color-line)] hover:border-[#7F011F] transition-all hover:shadow-md text-center">
              <span className="text-3xl block mb-2">📸</span>
              <h3 className="font-semibold text-sm">Phone Photography</h3>
              <p className="text-xs text-[#6d4a4a] mt-1">Master mobile photography</p>
            </Link>
            
            <Link href="/guides/phone-security" className="p-5 bg-white rounded-2xl border border-[var(--color-line)] hover:border-[#7F011F] transition-all hover:shadow-md text-center">
              <span className="text-3xl block mb-2">🔒</span>
              <h3 className="font-semibold text-sm">Phone Security</h3>
              <p className="text-xs text-[#6d4a4a] mt-1">Protect your data</p>
            </Link>
            
            <Link href="/guides/phone-accessories" className="p-5 bg-white rounded-2xl border border-[var(--color-line)] hover:border-[#7F011F] transition-all hover:shadow-md text-center">
              <span className="text-3xl block mb-2">🎧</span>
              <h3 className="font-semibold text-sm">Best Accessories</h3>
              <p className="text-xs text-[#6d4a4a] mt-1">Must-have accessories</p>
            </Link>
            
            <Link href="/guides/upgrade-guide" className="p-5 bg-white rounded-2xl border border-[var(--color-line)] hover:border-[#7F011F] transition-all hover:shadow-md text-center">
              <span className="text-3xl block mb-2">📈</span>
              <h3 className="font-semibold text-sm">Upgrade Guide</h3>
              <p className="text-xs text-[#6d4a4a] mt-1">When to upgrade</p>
            </Link>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 7: CALL TO ACTION */}
        {/* ============================================================ */}
        <section className="bg-gradient-to-r from-[#7F011F] to-[#a80a30] rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="font-fraunces text-2xl md:text-3xl font-medium mb-3">
            Ready to Find Your Perfect Phone?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-6">
            Use our comparison tool to find the best smartphone for your needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/phones/finder"
              className="px-6 py-3 bg-white text-[#7F011F] font-bold rounded-xl hover:shadow-xl transition-all hover:scale-105"
            >
              🔍 Browse All Phones
            </Link>
            <Link
              href="/compare"
              className="px-6 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all"
            >
              📊 Compare Phones
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}