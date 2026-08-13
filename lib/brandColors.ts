// lib/brandColors.ts
export const BRAND_COLORS: Record<string, string> = {
  Apple: "#1d1d1f",
  Samsung: "#1428A0",
  Google: "#4285F4",
  Xiaomi: "#FF6900",
  OnePlus: "#F5010C",
  Motorola: "#5A88F1",
  Sony: "#000000",
  Huawei: "#FF0000",
  Oppo: "#1BA95C",
  Vivo: "#415FFF",
  Realme: "#FFC800",
  Honor: "#0066CC",
  Nothing: "#E60012",
  Tecno: "#00953B",
  Infinix: "#00A86B",
  Nokia: "#124191",
  Asus: "#0058A3",
  Lenovo: "#E2231A",
  ZTE: "#0066B3",
  Blackview: "#FF6B00",
  Doogee: "#FF4500",
  Meizu: "#00A0E9",
  Sharp: "#E60012",
  RedMagic: "#FF0033",
  POCO: "#FFDE00",
  iQOO: "#0A0A0A",
  Fairphone: "#2CB34A",
};

const FALLBACK_COLOR = "#7F011F";

export function getBrandColor(brand: string): string {
  return BRAND_COLORS[brand] ?? FALLBACK_COLOR;
}