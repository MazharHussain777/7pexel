// app/phones/finder/data/phone-helpers.ts

export function getBrandColor(brand: string): string {
  const colors: Record<string, string> = {
    Apple: "#555555",
    Samsung: "#1428A0",
    Google: "#4285F4",
    OnePlus: "#E54141",
    Xiaomi: "#FF6900",
    Oppo: "#1A8C4A",
    Vivo: "#415FFF",
    Nothing: "#000000",
    Motorola: "#00B388",
    Huawei: "#CF0A2C",
    Sony: "#000000",
    LG: "#A50034",
    Nokia: "#0944B3",
    Asus: "#005A9C",
    Lenovo: "#E2231A",
    Honor: "#0A0A0A",
    Realme: "#FF6C00",
    Tecno: "#FF3366",
    Infinix: "#FF6600",
    "Black Shark": "#000000",
    Razer: "#00FF00",
  };
  return colors[brand] || "#555555";
}

export function getBrandEmoji(brand: string): string {
  const emojis: Record<string, string> = {
    Apple: "🍎",
    Samsung: "📱",
    Google: "🔵",
    OnePlus: "🔴",
    Xiaomi: "🟠",
    Oppo: "🟢",
    Vivo: "🔷",
    Nothing: "⚫",
    Motorola: "🟩",
    Huawei: "🔴",
    Sony: "🎮",
    LG: "🟣",
    Nokia: "🔵",
    Asus: "🟦",
    Lenovo: "🟥",
    Honor: "🔶",
    Realme: "🟧",
    Tecno: "🟥",
    Infinix: "🟧",
    "Black Shark": "⚫",
    Razer: "🟩",
  };
  return emojis[brand] || "📱";
}

export function getBrandTheme(brand: string): { primary: string; secondary: string } {
  const themes: Record<string, { primary: string; secondary: string }> = {
    Apple: { primary: "#555555", secondary: "#888888" },
    Samsung: { primary: "#1428A0", secondary: "#4A6CF7" },
    Google: { primary: "#4285F4", secondary: "#34A853" },
    OnePlus: { primary: "#E54141", secondary: "#FF6B6B" },
    Xiaomi: { primary: "#FF6900", secondary: "#FF9E44" },
    Oppo: { primary: "#1A8C4A", secondary: "#34A853" },
    Vivo: { primary: "#415FFF", secondary: "#6B8AFF" },
    Nothing: { primary: "#000000", secondary: "#333333" },
    Motorola: { primary: "#00B388", secondary: "#33C9A8" },
    Huawei: { primary: "#CF0A2C", secondary: "#E53935" },
    Sony: { primary: "#000000", secondary: "#444444" },
    LG: { primary: "#A50034", secondary: "#C62828" },
  };
  return themes[brand] || { primary: "#555555", secondary: "#888888" };
}

export function getPhoneSlug(model: string): string {
  return model.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function getPhoneImage(brand: string, model: string): string {
  const brandSlug = brand.toLowerCase().replace(/\s+/g, '-');
  const modelSlug = model.toLowerCase().replace(/\s+/g, '-');
  return `/images/phones/${brandSlug}/${modelSlug}.jpg`;
}

export function formatPrice(price: string | number): string {
  if (typeof price === 'number') {
    return `$${price.toFixed(0)}`;
  }
  return price;
}

export function getRatingStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "⭐".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}