// app/auto/finder/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// ─── TYPES ──────────────────────────────────────────────
interface Brand {
  name: string;
  grad: string;
  country: string;
  founded: number;
}

interface Vehicle {
  brand: string;
  model: string;
  cats: string[];
  size: string;
  price: number;
  pop: number;
  img: string;
}

// ─── BRANDS DATA ─────────────────────────────────────────
const BRANDS: Record<string, Brand> = {
  tesla: { name: "Tesla", grad: "linear-gradient(150deg,#1a1a1a,#333)", country: "USA", founded: 2003 },
  toyota: { name: "Toyota", grad: "linear-gradient(150deg,#0A3F26,#1FA25A)", country: "Japan", founded: 1937 },
  honda: { name: "Honda", grad: "linear-gradient(150deg,#12836B,#4C7A1F)", country: "Japan", founded: 1948 },
  ford: { name: "Ford", grad: "linear-gradient(150deg,#0F3B6E,#1F5FA2)", country: "USA", founded: 1903 },
  chevrolet: { name: "Chevrolet", grad: "linear-gradient(150deg,#6E1F1F,#A22B2B)", country: "USA", founded: 1911 },
  bmw: { name: "BMW", grad: "linear-gradient(150deg,#0A3F6E,#1F5FA2)", country: "Germany", founded: 1916 },
  mercedes: { name: "Mercedes-Benz", grad: "linear-gradient(150deg,#1a1a1a,#444)", country: "Germany", founded: 1926 },
  audi: { name: "Audi", grad: "linear-gradient(150deg,#3a3a3a,#666)", country: "Germany", founded: 1909 },
  volkswagen: { name: "Volkswagen", grad: "linear-gradient(150deg,#0A3F6E,#1F5FA2)", country: "Germany", founded: 1937 },
  hyundai: { name: "Hyundai", grad: "linear-gradient(150deg,#0A3F26,#12836B)", country: "Korea", founded: 1967 },
  kia: { name: "Kia", grad: "linear-gradient(150deg,#6E1F1F,#A22B2B)", country: "Korea", founded: 1944 },
  nissan: { name: "Nissan", grad: "linear-gradient(150deg,#2F5233,#4C7A1F)", country: "Japan", founded: 1933 },
  mazda: { name: "Mazda", grad: "linear-gradient(150deg,#5A1F1F,#8F2B2B)", country: "Japan", founded: 1920 },
  subaru: { name: "Subaru", grad: "linear-gradient(150deg,#0A3F6E,#1F5FA2)", country: "Japan", founded: 1953 },
  porsche: { name: "Porsche", grad: "linear-gradient(150deg,#1a1a1a,#333)", country: "Germany", founded: 1931 },
  lexus: { name: "Lexus", grad: "linear-gradient(150deg,#1a1a1a,#444)", country: "Japan", founded: 1989 },
  volvo: { name: "Volvo", grad: "linear-gradient(150deg,#0A3F6E,#204A3B)", country: "Sweden", founded: 1927 },
  jeep: { name: "Jeep", grad: "linear-gradient(150deg,#2F5233,#4C7A1F)", country: "USA", founded: 1941 },
  ram: { name: "Ram", grad: "linear-gradient(150deg,#6E1F1F,#A22B2B)", country: "USA", founded: 2010 },
  gmc: { name: "GMC", grad: "linear-gradient(150deg,#5A1F1F,#8F2B2B)", country: "USA", founded: 1912 },
  rivian: { name: "Rivian", grad: "linear-gradient(150deg,#0A3F26,#12836B)", country: "USA", founded: 2009 },
  lucid: { name: "Lucid", grad: "linear-gradient(150deg,#1a1a1a,#333)", country: "USA", founded: 2007 },
  ferrari: { name: "Ferrari", grad: "linear-gradient(150deg,#6E1F1F,#A22B2B)", country: "Italy", founded: 1939 },
  lamborghini: { name: "Lamborghini", grad: "linear-gradient(150deg,#5A6E1F,#8FA83E)", country: "Italy", founded: 1963 },
  bentley: { name: "Bentley", grad: "linear-gradient(150deg,#1a1a1a,#444)", country: "UK", founded: 1919 },
  rollsroyce: { name: "Rolls-Royce", grad: "linear-gradient(150deg,#1a1a1a,#2a2a2a)", country: "UK", founded: 1906 },
  jaguar: { name: "Jaguar", grad: "linear-gradient(150deg,#0A3F26,#204A3B)", country: "UK", founded: 1922 },
  landrover: { name: "Land Rover", grad: "linear-gradient(150deg,#2F5233,#0A3F26)", country: "UK", founded: 1948 },
  mitsubishi: { name: "Mitsubishi", grad: "linear-gradient(150deg,#6E1F1F,#A22B2B)", country: "Japan", founded: 1970 },
  suzuki: { name: "Suzuki", grad: "linear-gradient(150deg,#0A3F6E,#1F5FA2)", country: "Japan", founded: 1909 },
  skoda: { name: "Skoda", grad: "linear-gradient(150deg,#0A3F26,#1FA25A)", country: "Czech", founded: 1895 },
  peugeot: { name: "Peugeot", grad: "linear-gradient(150deg,#5A1F1F,#8F2B2B)", country: "France", founded: 1810 },
  renault: { name: "Renault", grad: "linear-gradient(150deg,#0A3F6E,#204A3B)", country: "France", founded: 1899 },
  mini: { name: "MINI", grad: "linear-gradient(150deg,#2F5233,#4C7A1F)", country: "UK", founded: 1959 },
  genesis: { name: "Genesis", grad: "linear-gradient(150deg,#1a1a1a,#333)", country: "Korea", founded: 2015 },
  polestar: { name: "Polestar", grad: "linear-gradient(150deg,#0A3F26,#12836B)", country: "Sweden", founded: 2017 },
  byd: { name: "BYD", grad: "linear-gradient(150deg,#0F6B3E,#1FA25A)", country: "China", founded: 1995 },
};

// ─── CATEGORIES ──────────────────────────────────────────
const CATEGORY_META: Record<string, { name: string; icon: string }> = {
  electric: { name: "Electric", icon: "⚡" },
  suv: { name: "SUV", icon: "🚙" },
  sedan: { name: "Sedan", icon: "🚘" },
  truck: { name: "Truck", icon: "🛻" },
  luxury: { name: "Luxury", icon: "👑" },
  sports: { name: "Sports", icon: "🏎️" },
  hybrid: { name: "Hybrid", icon: "🔋" },
  compact: { name: "Compact", icon: "🚗" },
};

const SIZE_TYPES = ["Hatchback", "Sedan", "Coupe", "SUV", "Crossover", "Pickup", "Convertible", "Minivan", "Wagon"];

const PRICE_BANDS = [
  { key: "u30", label: "Under $30k", test: (p: number) => p < 30000 },
  { key: "30-50", label: "$30k–$50k", test: (p: number) => p >= 30000 && p < 50000 },
  { key: "50-80", label: "$50k–$80k", test: (p: number) => p >= 50000 && p < 80000 },
  { key: "80p", label: "$80k+", test: (p: number) => p >= 80000 },
];

// ─── VEHICLES DATA ──────────────────────────────────────
function createVehicle(brand: string, model: string, cats: string[], size: string, price: number, pop: number, seed: string): Vehicle {
  return { brand, model, cats, size, price, pop, img: `https://images.unsplash.com/photo-${seed}?w=640&h=480&fit=crop&crop=center` };
}

const VEHICLES: Vehicle[] = [
  // ─── TESLA ──────────────────────────────────────────
  createVehicle("tesla", "Model Y", ["electric", "suv"], "SUV", 44990, 99, "1536700503337-8b2799bb4a38"),
  createVehicle("tesla", "Model 3", ["electric", "sedan"], "Sedan", 38990, 97, "1560958089-b8a1929cea89"),
  createVehicle("tesla", "Model X", ["electric", "suv", "luxury"], "SUV", 79990, 88, "1583121274602-3e2820c69888"),
  createVehicle("tesla", "Model S", ["electric", "luxury", "sedan"], "Sedan", 74990, 86, "1555215695-3004980ad54e"),

  // ─── TOYOTA ──────────────────────────────────────────
  createVehicle("toyota", "RAV4 Hybrid", ["hybrid", "suv"], "SUV", 31250, 95, "1544636331-e26879cd4d9b"),
  createVehicle("toyota", "Camry", ["sedan", "hybrid"], "Sedan", 28400, 90, "1580274455191-1c62238fa333"),
  createVehicle("toyota", "Corolla", ["compact", "sedan"], "Sedan", 22050, 88, "1605792657660-596d9006f3c5"),
  createVehicle("toyota", "Highlander", ["suv"], "SUV", 39200, 84, "1536700503337-8b2799bb4a38"),
  createVehicle("toyota", "Tacoma", ["truck"], "Pickup", 31500, 82, "1583121274602-3e2820c69888"),

  // ─── HONDA ──────────────────────────────────────────
  createVehicle("honda", "CR-V", ["suv", "hybrid"], "SUV", 30400, 89, "1544636331-e26879cd4d9b"),
  createVehicle("honda", "Civic", ["compact", "sedan"], "Sedan", 24500, 87, "1555215695-3004980ad54e"),
  createVehicle("honda", "Accord", ["sedan", "hybrid"], "Sedan", 28900, 83, "1580274455191-1c62238fa333"),
  createVehicle("honda", "Pilot", ["suv"], "SUV", 40900, 76, "1605792657660-596d9006f3c5"),

  // ─── FORD ──────────────────────────────────────────
  createVehicle("ford", "F-150 Lightning", ["electric", "truck"], "Pickup", 52400, 91, "1536700503337-8b2799bb4a38"),
  createVehicle("ford", "Mustang Mach-E", ["electric", "suv"], "SUV", 39995, 86, "1583121274602-3e2820c69888"),
  createVehicle("ford", "Explorer", ["suv"], "SUV", 36760, 79, "1544636331-e26879cd4d9b"),
  createVehicle("ford", "Bronco", ["suv"], "SUV", 38900, 81, "1580274455191-1c62238fa333"),
  createVehicle("ford", "Mustang GT", ["sports"], "Coupe", 42990, 85, "1555215695-3004980ad54e"),

  // ─── CHEVROLET ──────────────────────────────────────
  createVehicle("chevrolet", "Equinox EV", ["electric", "suv"], "SUV", 34995, 83, "1605792657660-596d9006f3c5"),
  createVehicle("chevrolet", "Silverado", ["truck"], "Pickup", 37900, 80, "1536700503337-8b2799bb4a38"),
  createVehicle("chevrolet", "Corvette", ["sports", "luxury"], "Coupe", 68300, 84, "1583121274602-3e2820c69888"),
  createVehicle("chevrolet", "Tahoe", ["suv"], "SUV", 56200, 74, "1544636331-e26879cd4d9b"),

  // ─── BMW ──────────────────────────────────────────
  createVehicle("bmw", "i4", ["electric", "sedan"], "Sedan", 52200, 82, "1555215695-3004980ad54e"),
  createVehicle("bmw", "iX", ["electric", "suv", "luxury"], "SUV", 71300, 78, "1580274455191-1c62238fa333"),
  createVehicle("bmw", "M4 Competition", ["sports", "luxury"], "Coupe", 78900, 88, "1605792657660-596d9006f3c5"),
  createVehicle("bmw", "X5", ["suv", "luxury"], "SUV", 65200, 80, "1536700503337-8b2799bb4a38"),
  createVehicle("bmw", "3 Series", ["sedan", "luxury"], "Sedan", 44500, 83, "1583121274602-3e2820c69888"),

  // ─── MERCEDES-BENZ ──────────────────────────────────
  createVehicle("mercedes", "EQS", ["electric", "luxury", "sedan"], "Sedan", 104400, 74, "1544636331-e26879cd4d9b"),
  createVehicle("mercedes", "GLE", ["suv", "luxury"], "SUV", 61550, 77, "1555215695-3004980ad54e"),
  createVehicle("mercedes", "C-Class", ["sedan", "luxury"], "Sedan", 45900, 79, "1580274455191-1c62238fa333"),
  createVehicle("mercedes", "AMG GT", ["sports", "luxury"], "Coupe", 118600, 72, "1605792657660-596d9006f3c5"),

  // ─── AUDI ──────────────────────────────────────────
  createVehicle("audi", "Q6 e-tron", ["electric", "suv", "luxury"], "SUV", 63700, 76, "1536700503337-8b2799bb4a38"),
  createVehicle("audi", "A4", ["sedan", "luxury"], "Sedan", 42300, 78, "1583121274602-3e2820c69888"),
  createVehicle("audi", "Q5", ["suv", "luxury"], "SUV", 47100, 80, "1544636331-e26879cd4d9b"),
  createVehicle("audi", "RS7", ["sports", "luxury"], "Sedan", 119500, 70, "1555215695-3004980ad54e"),

  // ─── VOLKSWAGEN ──────────────────────────────────────
  createVehicle("volkswagen", "ID.4", ["electric", "suv"], "SUV", 38995, 75, "1580274455191-1c62238fa333"),
  createVehicle("volkswagen", "Golf GTI", ["compact", "sports"], "Hatchback", 31000, 78, "1605792657660-596d9006f3c5"),
  createVehicle("volkswagen", "Tiguan", ["suv", "compact"], "SUV", 29900, 74, "1536700503337-8b2799bb4a38"),
  createVehicle("volkswagen", "Jetta", ["compact", "sedan"], "Sedan", 21500, 72, "1583121274602-3e2820c69888"),

  // ─── HYUNDAI ──────────────────────────────────────────
  createVehicle("hyundai", "Ioniq 5", ["electric", "suv"], "SUV", 41800, 92, "1544636331-e26879cd4d9b"),
  createVehicle("hyundai", "Ioniq 6", ["electric", "sedan"], "Sedan", 42700, 87, "1555215695-3004980ad54e"),
  createVehicle("hyundai", "Tucson", ["suv", "hybrid"], "SUV", 29900, 81, "1580274455191-1c62238fa333"),
  createVehicle("hyundai", "Elantra", ["compact", "sedan"], "Sedan", 21900, 79, "1605792657660-596d9006f3c5"),

  // ─── KIA ──────────────────────────────────────────
  createVehicle("kia", "EV6", ["electric", "suv"], "SUV", 42600, 89, "1536700503337-8b2799bb4a38"),
  createVehicle("kia", "EV9", ["electric", "suv"], "SUV", 54900, 80, "1583121274602-3e2820c69888"),
  createVehicle("kia", "Telluride", ["suv"], "SUV", 37900, 83, "1544636331-e26879cd4d9b"),
  createVehicle("kia", "K5", ["sedan"], "Sedan", 25900, 75, "1555215695-3004980ad54e"),

  // ─── NISSAN ──────────────────────────────────────────
  createVehicle("nissan", "Ariya", ["electric", "suv"], "SUV", 39990, 72, "1580274455191-1c62238fa333"),
  createVehicle("nissan", "Rogue", ["suv", "hybrid"], "SUV", 29200, 77, "1605792657660-596d9006f3c5"),
  createVehicle("nissan", "Altima", ["sedan"], "Sedan", 26400, 70, "1536700503337-8b2799bb4a38"),
  createVehicle("nissan", "Z", ["sports"], "Coupe", 42900, 73, "1583121274602-3e2820c69888"),

  // ─── MAZDA ──────────────────────────────────────────
  createVehicle("mazda", "CX-5", ["suv", "compact"], "SUV", 29000, 78, "1544636331-e26879cd4d9b"),
  createVehicle("mazda", "MX-5 Miata", ["sports", "compact"], "Convertible", 29500, 80, "1555215695-3004980ad54e"),
  createVehicle("mazda", "3", ["compact", "sedan"], "Hatchback", 23800, 74, "1580274455191-1c62238fa333"),

  // ─── SUBARU ──────────────────────────────────────────
  createVehicle("subaru", "Outback", ["suv", "compact"], "Wagon", 29900, 76, "1605792657660-596d9006f3c5"),
  createVehicle("subaru", "Forester", ["suv", "compact"], "SUV", 28400, 75, "1536700503337-8b2799bb4a38"),
  createVehicle("subaru", "WRX", ["sports", "compact"], "Sedan", 32700, 73, "1583121274602-3e2820c69888"),

  // ─── PORSCHE ──────────────────────────────────────────
  createVehicle("porsche", "Taycan", ["electric", "luxury", "sedan"], "Sedan", 92150, 90, "1544636331-e26879cd4d9b"),
  createVehicle("porsche", "911 Carrera", ["sports", "luxury"], "Coupe", 117200, 89, "1555215695-3004980ad54e"),
  createVehicle("porsche", "Cayenne", ["suv", "luxury"], "SUV", 80300, 81, "1580274455191-1c62238fa333"),

  // ─── LEXUS ──────────────────────────────────────────
  createVehicle("lexus", "RX", ["suv", "luxury", "hybrid"], "SUV", 50250, 79, "1605792657660-596d9006f3c5"),
  createVehicle("lexus", "ES", ["sedan", "luxury"], "Sedan", 44200, 76, "1536700503337-8b2799bb4a38"),

  // ─── VOLVO ──────────────────────────────────────────
  createVehicle("volvo", "XC90", ["suv", "luxury"], "SUV", 58600, 77, "1583121274602-3e2820c69888"),
  createVehicle("volvo", "XC60", ["suv", "luxury"], "SUV", 46200, 75, "1544636331-e26879cd4d9b"),

  // ─── JEEP ──────────────────────────────────────────
  createVehicle("jeep", "Wrangler", ["suv"], "SUV", 33900, 84, "1555215695-3004980ad54e"),
  createVehicle("jeep", "Grand Cherokee", ["suv"], "SUV", 39700, 80, "1580274455191-1c62238fa333"),

  // ─── RAM ──────────────────────────────────────────
  createVehicle("ram", "1500", ["truck"], "Pickup", 41200, 82, "1605792657660-596d9006f3c5"),

  // ─── GMC ──────────────────────────────────────────
  createVehicle("gmc", "Sierra", ["truck"], "Pickup", 42800, 78, "1536700503337-8b2799bb4a38"),
  createVehicle("gmc", "Yukon", ["suv"], "SUV", 58900, 73, "1583121274602-3e2820c69888"),

  // ─── RIVIAN ──────────────────────────────────────────
  createVehicle("rivian", "R1S", ["electric", "suv", "luxury"], "SUV", 75900, 85, "1544636331-e26879cd4d9b"),
  createVehicle("rivian", "R1T", ["electric", "truck"], "Pickup", 69900, 81, "1555215695-3004980ad54e"),

  // ─── LUCID ──────────────────────────────────────────
  createVehicle("lucid", "Air", ["electric", "luxury", "sedan"], "Sedan", 69900, 79, "1580274455191-1c62238fa333"),

  // ─── FERRARI ──────────────────────────────────────────
  createVehicle("ferrari", "Roma", ["sports", "luxury"], "Coupe", 247000, 86, "1605792657660-596d9006f3c5"),
  createVehicle("ferrari", "296 GTB", ["sports", "luxury", "hybrid"], "Coupe", 322000, 88, "1536700503337-8b2799bb4a38"),

  // ─── LAMBORGHINI ──────────────────────────────────────
  createVehicle("lamborghini", "Huracan", ["sports", "luxury"], "Coupe", 261000, 87, "1583121274602-3e2820c69888"),
  createVehicle("lamborghini", "Urus", ["suv", "luxury", "sports"], "SUV", 233000, 82, "1544636331-e26879cd4d9b"),

  // ─── BENTLEY ──────────────────────────────────────────
  createVehicle("bentley", "Continental GT", ["luxury", "sports"], "Coupe", 236000, 75, "1555215695-3004980ad54e"),

  // ─── ROLLS-ROYCE ──────────────────────────────────────
  createVehicle("rollsroyce", "Ghost", ["luxury", "sedan"], "Sedan", 359000, 71, "1580274455191-1c62238fa333"),

  // ─── JAGUAR ──────────────────────────────────────────
  createVehicle("jaguar", "I-Pace", ["electric", "suv", "luxury"], "SUV", 71575, 66, "1605792657660-596d9006f3c5"),
  createVehicle("jaguar", "F-Type", ["sports", "luxury"], "Coupe", 73500, 68, "1536700503337-8b2799bb4a38"),

  // ─── LAND ROVER ──────────────────────────────────────
  createVehicle("landrover", "Range Rover Sport", ["suv", "luxury"], "SUV", 83900, 80, "1583121274602-3e2820c69888"),
  createVehicle("landrover", "Defender", ["suv", "luxury"], "SUV", 56300, 79, "1544636331-e26879cd4d9b"),

  // ─── MITSUBISHI ──────────────────────────────────────
  createVehicle("mitsubishi", "Outlander", ["suv", "hybrid"], "SUV", 29900, 66, "1555215695-3004980ad54e"),

  // ─── SUZUKI ──────────────────────────────────────────
  createVehicle("suzuki", "Swift", ["compact"], "Hatchback", 18900, 60, "1580274455191-1c62238fa333"),

  // ─── SKODA ──────────────────────────────────────────
  createVehicle("skoda", "Octavia", ["compact", "sedan"], "Sedan", 25900, 65, "1605792657660-596d9006f3c5"),

  // ─── PEUGEOT ──────────────────────────────────────────
  createVehicle("peugeot", "3008", ["suv", "compact", "hybrid"], "Crossover", 34500, 68, "1536700503337-8b2799bb4a38"),

  // ─── RENAULT ──────────────────────────────────────────
  createVehicle("renault", "Megane E-Tech", ["electric", "compact"], "Hatchback", 36500, 67, "1583121274602-3e2820c69888"),

  // ─── MINI ──────────────────────────────────────────
  createVehicle("mini", "Cooper SE", ["electric", "compact"], "Hatchback", 30900, 72, "1544636331-e26879cd4d9b"),

  // ─── GENESIS ──────────────────────────────────────────
  createVehicle("genesis", "GV60", ["electric", "suv", "luxury"], "SUV", 52975, 71, "1555215695-3004980ad54e"),
  createVehicle("genesis", "G80", ["sedan", "luxury"], "Sedan", 48900, 73, "1580274455191-1c62238fa333"),

  // ─── POLESTAR ──────────────────────────────────────────
  createVehicle("polestar", "Polestar 3", ["electric", "suv", "luxury"], "SUV", 73400, 70, "1605792657660-596d9006f3c5"),
  createVehicle("polestar", "Polestar 2", ["electric", "sedan"], "Sedan", 49900, 74, "1536700503337-8b2799bb4a38"),

  // ─── BYD ──────────────────────────────────────────
  createVehicle("byd", "Seal", ["electric", "sedan"], "Sedan", 36900, 77, "1583121274602-3e2820c69888"),
  createVehicle("byd", "Atto 3", ["electric", "suv", "compact"], "Crossover", 33900, 75, "1544636331-e26879cd4d9b"),
];

// ─── HELPERS ─────────────────────────────────────────────
function getInitials(name: string): string {
  return name.split(/[\s-]/).filter(Boolean).map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

function formatPrice(price: number): string {
  return "$" + price.toLocaleString("en-US");
}

// ─── MAIN COMPONENT ─────────────────────────────────────
export default function AutoFinderPage() {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [activeCats, setActiveCats] = useState<Set<string>>(new Set());
  const [activeSizes, setActiveSizes] = useState<Set<string>>(new Set());
  const [activePrice, setActivePrice] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(18);
  const [favorites, setFavorites] = useState<string[]>([]);

  const PAGE_SIZE = 18;

  // ─── USED BRANDS ──────────────────────────────────────
  const usedBrands = useMemo(() => {
    return [...new Set(VEHICLES.map(v => v.brand))];
  }, []);

  // ─── FILTERED VEHICLES ───────────────────────────────
  const filteredVehicles = useMemo(() => {
    let list = VEHICLES.filter(veh => {
      const matchesBrand = !activeBrand || veh.brand === activeBrand;
      const matchesCat = activeCats.size === 0 || veh.cats.some(c => activeCats.has(c));
      const matchesSize = activeSizes.size === 0 || activeSizes.has(veh.size);
      const matchesPrice = !activePrice || PRICE_BANDS.find(p => p.key === activePrice)?.test(veh.price) || false;
      const haystack = (BRANDS[veh.brand].name + " " + veh.model).toLowerCase();
      const matchesSearch = searchQuery === "" || haystack.includes(searchQuery.toLowerCase());
      return matchesBrand && matchesCat && matchesSize && matchesPrice && matchesSearch;
    });

    if (sortMode === "popular") list.sort((a, b) => b.pop - a.pop);
    else if (sortMode === "price-low") list.sort((a, b) => a.price - b.price);
    else if (sortMode === "price-high") list.sort((a, b) => b.price - a.price);
    else if (sortMode === "alpha") list.sort((a, b) => (BRANDS[a.brand].name + a.model).localeCompare(BRANDS[b.brand].name + b.model));

    return list;
  }, [activeBrand, activeCats, activeSizes, activePrice, sortMode, searchQuery]);

  // ─── GET BRAND ────────────────────────────────────────
  const getBrand = (key: string) => BRANDS[key];

  // ─── TOGGLE FAVORITE ──────────────────────────────────
  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // ─── RESET FILTERS ────────────────────────────────────
  const resetFilters = () => {
    setActiveBrand(null);
    setActiveCats(new Set());
    setActiveSizes(new Set());
    setActivePrice(null);
    setSearchQuery("");
    setSortMode("popular");
    setVisibleCount(PAGE_SIZE);
  };

  // ─── GET ACTIVE PILLS ──────────────────────────────────
  const getActivePills = () => {
    const pills: { type: string; key?: string; label: string }[] = [];
    if (activeBrand) pills.push({ type: "brand", label: BRANDS[activeBrand].name });
    activeCats.forEach(c => pills.push({ type: "cat", key: c, label: CATEGORY_META[c]?.name || c }));
    activeSizes.forEach(s => pills.push({ type: "size", key: s, label: s }));
    if (activePrice) pills.push({ type: "price", label: PRICE_BANDS.find(p => p.key === activePrice)?.label || "" });
    return pills;
  };

  // ─── REMOVE PILL ──────────────────────────────────────
  const removePill = (type: string, key?: string) => {
    if (type === "brand") { setActiveBrand(null); }
    else if (type === "cat" && key) { const newCats = new Set(activeCats); newCats.delete(key); setActiveCats(newCats); }
    else if (type === "size" && key) { const newSizes = new Set(activeSizes); newSizes.delete(key); setActiveSizes(newSizes); }
    else if (type === "price") { setActivePrice(null); }
    setVisibleCount(PAGE_SIZE);
  };

  const shownVehicles = filteredVehicles.slice(0, visibleCount);
  const brandCount = new Set(filteredVehicles.map(v => v.brand)).size;

  return (
    <div className="min-h-screen bg-[#fbfdfb]">
      <Header />

      <main className="wrap py-6">
        {/* ─── BREADCRUMB ──────────────────────────────── */}
        <div className="flex items-center gap-2 text-[0.8rem] text-[var(--color-ink-soft)] mb-4 flex-wrap">
          <Link href="/" className="hover:text-[var(--color-green)] transition-colors">
            Home
          </Link>
          <span className="opacity-40">/</span>
          <Link href="/auto" className="hover:text-[var(--color-green)] transition-colors">
            Auto
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-[var(--color-ink)] font-semibold">Finder</span>
        </div>

        {/* ─── HERO ────────────────────────────────────── */}
        <section className="relative rounded-[20px] overflow-hidden mt-5 bg-gradient-to-br from-[#0A3F26] via-[#0F6B3E] to-[#1FA25A] text-white">
          <div className="relative z-10 p-8 md:p-11">
            <div className="max-w-[780px]">
              <div className="w-14 h-14 rounded-[12px] flex items-center justify-center mb-5 bg-white/15 border border-white/25 backdrop-blur-sm">
                <svg className="w-6.5 h-6.5 text-[#D4F26B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="3.5" />
                  <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                </svg>
              </div>
              <h1 className="font-fraunces font-medium text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.03em]">
                The full <em className="italic not-italic text-[#D4F26B]">auto ecosystem</em> — one page, every car
              </h1>
              <p className="mt-3 text-white/80 text-[0.98rem] leading-[1.6] max-w-[640px]">
                Every brand, every category, every body size in a single searchable grid. Filter by manufacturer, vehicle type, size class or price, or just start typing.
              </p>
              <div className="mt-6 max-w-[640px] relative flex items-center">
                <svg className="absolute left-5 w-4.5 h-4.5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search any brand or model — Tesla, Civic, F-150, GT3…"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className="w-full px-5 py-4.5 pl-12.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white font-poppins text-[0.98rem] transition-all focus:outline-none focus:border-[#D4F26B] focus:bg-white/16 placeholder:text-white/55"
                />
              </div>
              <div className="flex gap-0 flex-wrap mt-7">
                <div className="flex flex-col gap-1 px-6.5 border-l border-white/22 first:border-l-0 first:pl-0">
                  <span className="font-fraunces font-semibold text-[1.9rem] text-white">{VEHICLES.length}</span>
                  <span className="font-jetbrains-mono text-[0.6rem] tracking-[0.1em] uppercase text-white/72">Vehicles</span>
                </div>
                <div className="flex flex-col gap-1 px-6.5 border-l border-white/22 first:border-l-0 first:pl-0">
                  <span className="font-fraunces font-semibold text-[1.9rem] text-white">{usedBrands.length}</span>
                  <span className="font-jetbrains-mono text-[0.6rem] tracking-[0.1em] uppercase text-white/72">Brands</span>
                </div>
                <div className="flex flex-col gap-1 px-6.5 border-l border-white/22 first:border-l-0 first:pl-0">
                  <span className="font-fraunces font-semibold text-[1.9rem] text-white">8</span>
                  <span className="font-jetbrains-mono text-[0.6rem] tracking-[0.1em] uppercase text-white/72">Categories</span>
                </div>
                <div className="flex flex-col gap-1 px-6.5 border-l border-white/22 first:border-l-0 first:pl-0">
                  <span className="font-fraunces font-semibold text-[1.9rem] text-white">9</span>
                  <span className="font-jetbrains-mono text-[0.6rem] tracking-[0.1em] uppercase text-white/72">Body Sizes</span>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative circles */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" viewBox="0 0 900 340" preserveAspectRatio="none">
            <circle cx="740" cy="70" r="190" stroke="rgba(255,255,255,0.14)" strokeWidth="1" fill="none" />
            <circle cx="740" cy="70" r="250" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
            <circle cx="90" cy="300" r="130" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          </svg>
        </section>

        {/* ─── BRAND RAIL ────────────────────────────────── */}
        <section className="py-6">
          <div className="flex justify-between items-baseline mb-3 flex-wrap gap-2.5">
            <h2 className="font-fraunces font-medium text-[1.2rem] tracking-[-0.01em]">
              Jump to a <em className="italic not-italic text-[var(--color-green)]">brand</em>
            </h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
            <button
              onClick={() => {
                setActiveBrand(null);
                setVisibleCount(PAGE_SIZE);
              }}
              className={`flex-none flex flex-col items-center gap-1.5 px-4 py-3 rounded-[14px] border-[1.5px] transition-all min-w-[72px] ${
                !activeBrand
                  ? "border-[var(--color-green)] bg-green-950/5 shadow-[0_0_0_2px_rgba(15,107,62,0.18)]"
                  : "border-[var(--color-line)] bg-[var(--color-paper)] hover:border-[var(--color-green)] hover:-translate-y-0.5"
              }`}
            >
              <div className="w-9.5 h-9.5 rounded-[10px] flex items-center justify-center text-white font-fraunces font-bold text-[0.8rem]" style={{ background: "linear-gradient(150deg,#12180F,#455040)" }}>
                All
              </div>
              <span className={`text-[0.65rem] font-semibold whitespace-nowrap ${!activeBrand ? "text-[var(--color-ink)]" : "text-[var(--color-ink-soft)]"}`}>All brands</span>
            </button>
            {usedBrands.map((b) => {
              const brand = getBrand(b);
              const isActive = activeBrand === b;
              return (
                <button
                  key={b}
                  onClick={() => {
                    setActiveBrand(isActive ? null : b);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className={`flex-none flex flex-col items-center gap-1.5 px-4 py-3 rounded-[14px] border-[1.5px] transition-all min-w-[72px] ${
                    isActive
                      ? "border-[var(--color-green)] bg-green-950/5 shadow-[0_0_0_2px_rgba(15,107,62,0.18)]"
                      : "border-[var(--color-line)] bg-[var(--color-paper)] hover:border-[var(--color-green)] hover:-translate-y-0.5"
                  }`}
                >
                  <div className="w-9.5 h-9.5 rounded-[10px] flex items-center justify-center text-white font-fraunces font-bold text-[0.8rem]" style={{ background: brand.grad }}>
                    {getInitials(brand.name)}
                  </div>
                  <span className={`text-[0.65rem] font-semibold whitespace-nowrap ${isActive ? "text-[var(--color-ink)]" : "text-[var(--color-ink-soft)]"}`}>
                    {brand.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ─── FILTERS + RESULTS ────────────────────────── */}
        <section className="py-2">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-7 items-start">
            {/* ─── FILTERS PANEL ────────────────────────── */}
            <aside className="sticky top-[88px] flex flex-col gap-5 p-5.5 border-[1.5px] border-[var(--color-line)] rounded-[14px] bg-[var(--color-paper)]">
              <button
                onClick={resetFilters}
                className="text-[0.76rem] font-semibold text-[var(--color-green)] flex items-center gap-1.5 self-start"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Clear all filters
              </button>

              {/* Category Filter */}
              <div className="filter-group">
                <h6 className="font-jetbrains-mono text-[0.66rem] tracking-[0.1em] uppercase text-[var(--color-ink-soft)] mb-3">Category</h6>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(CATEGORY_META).map(([key, cat]) => {
                    const isActive = activeCats.has(key);
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          const newCats = new Set(activeCats);
                          isActive ? newCats.delete(key) : newCats.add(key);
                          setActiveCats(newCats);
                          setVisibleCount(PAGE_SIZE);
                        }}
                        className={`px-3 py-1.5 rounded-full border-[1.5px] text-[0.76rem] font-semibold transition-all ${
                          isActive
                            ? "bg-[var(--color-green)] border-[var(--color-green)] text-white"
                            : "border-[var(--color-line)] text-[var(--color-ink-soft)] bg-white hover:border-[var(--color-green)] hover:text-[var(--color-ink)]"
                        }`}
                      >
                        {cat.icon} {cat.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Body Size Filter */}
              <div className="filter-group">
                <h6 className="font-jetbrains-mono text-[0.66rem] tracking-[0.1em] uppercase text-[var(--color-ink-soft)] mb-3">Body Size</h6>
                <div className="flex flex-wrap gap-1.5">
                  {SIZE_TYPES.map((size) => {
                    const isActive = activeSizes.has(size);
                    return (
                      <button
                        key={size}
                        onClick={() => {
                          const newSizes = new Set(activeSizes);
                          isActive ? newSizes.delete(size) : newSizes.add(size);
                          setActiveSizes(newSizes);
                          setVisibleCount(PAGE_SIZE);
                        }}
                        className={`px-3 py-1.5 rounded-full border-[1.5px] text-[0.76rem] font-semibold transition-all ${
                          isActive
                            ? "bg-[var(--color-green)] border-[var(--color-green)] text-white"
                            : "border-[var(--color-line)] text-[var(--color-ink-soft)] bg-white hover:border-[var(--color-green)] hover:text-[var(--color-ink)]"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Filter */}
              <div className="filter-group">
                <h6 className="font-jetbrains-mono text-[0.66rem] tracking-[0.1em] uppercase text-[var(--color-ink-soft)] mb-3">Price Range</h6>
                <div className="flex flex-wrap gap-1.5">
                  {PRICE_BANDS.map((band) => {
                    const isActive = activePrice === band.key;
                    return (
                      <button
                        key={band.key}
                        onClick={() => {
                          setActivePrice(isActive ? null : band.key);
                          setVisibleCount(PAGE_SIZE);
                        }}
                        className={`px-3 py-1.5 rounded-full border-[1.5px] text-[0.76rem] font-semibold transition-all ${
                          isActive
                            ? "bg-[var(--color-green)] border-[var(--color-green)] text-white"
                            : "border-[var(--color-line)] text-[var(--color-ink-soft)] bg-white hover:border-[var(--color-green)] hover:text-[var(--color-ink)]"
                        }`}
                      >
                        {band.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* ─── RESULTS ────────────────────────────────── */}
            <div className="results-col">
              {/* Toolbar */}
              <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
                <div className="text-[0.86rem] text-[var(--color-ink-soft)]">
                  <b className="text-[var(--color-ink)] font-fraunces text-[1.05rem]">{filteredVehicles.length}</b> vehicles found across <b className="text-[var(--color-ink)]">{brandCount}</b> brands
                </div>
                <div className="flex gap-2.5 items-center flex-wrap">
                  <select
                    value={sortMode}
                    onChange={(e) => setSortMode(e.target.value)}
                    className="px-3.5 py-2.5 rounded-full border-[1.5px] border-[var(--color-line)] bg-white text-[0.81rem] font-semibold text-[var(--color-ink)] font-poppins"
                  >
                    <option value="popular">Sort: Most popular</option>
                    <option value="price-low">Sort: Price — low to high</option>
                    <option value="price-high">Sort: Price — high to low</option>
                    <option value="alpha">Sort: A–Z</option>
                  </select>
                  <div className="flex items-center gap-1 p-1 border-[1.5px] border-[var(--color-line)] rounded-full bg-white flex-shrink-0">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.76rem] font-semibold transition-all ${
                        viewMode === "grid" ? "bg-[var(--color-green)] text-white" : "text-[var(--color-ink-soft)]"
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" rx="1.5" />
                        <rect x="14" y="3" width="7" height="7" rx="1.5" />
                        <rect x="3" y="14" width="7" height="7" rx="1.5" />
                        <rect x="14" y="14" width="7" height="7" rx="1.5" />
                      </svg>
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.76rem] font-semibold transition-all ${
                        viewMode === "list" ? "bg-[var(--color-green)] text-white" : "text-[var(--color-ink-soft)]"
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                      </svg>
                      List
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filter Pills */}
              {getActivePills().length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {getActivePills().map((pill) => (
                    <span
                      key={pill.type + (pill.key || "")}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-950/10 text-[var(--color-green-deep)] text-[0.76rem] font-semibold"
                    >
                      {pill.label}
                      <button
                        onClick={() => removePill(pill.type, pill.key)}
                        className="w-4 h-4 rounded-full bg-[rgba(10,63,38,0.15)] flex items-center justify-center hover:bg-[rgba(10,63,38,0.25)] transition-colors"
                      >
                        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}

{/* ─── GRID VIEW ────────────────────────────── */}
{viewMode === "grid" && (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {shownVehicles.map((veh, index) => {
      const brand = getBrand(veh.brand);
      const id = `${veh.brand}-${veh.model}-${index}`;
      const isFavorite = favorites.includes(id);
      const brandName = brand.name.toLowerCase().replace(/\s+/g, '-');
      const modelSlug = veh.model.toLowerCase().replace(/\s+/g, '-');
      const vehicleSlug = `${brandName}-${modelSlug}`;
      
      return (
        <Link
          key={id}
          href={`/auto/vehicle/${encodeURIComponent(vehicleSlug)}`}
          className="border border-[var(--color-line)] rounded-[10px] overflow-hidden bg-[var(--color-paper)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_36px_rgba(15,24,15,0.13)] hover:border-[rgba(15,107,62,0.25)] group"
        >
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#eef1e9]">
            <Image
              src={veh.img}
              alt={`${brand.name} ${veh.model}`}
              width={640}
              height={480}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,20,10,0.4)]" />
            <span className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 font-jetbrains-mono text-[0.6rem] tracking-[0.05em] uppercase bg-white/94 text-[var(--color-green-deep)] px-2.5 py-1 rounded-full font-bold">
              <span className="w-3.5 h-3.5 rounded-[3px] flex items-center justify-center text-white font-fraunces text-[0.5rem] font-bold" style={{ background: brand.grad }}>
                {getInitials(brand.name)}
              </span>
              {brand.name}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(id);
              }}
              className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center transition-all hover:scale-110"
            >
              <svg className={`w-3.5 h-3.5 ${isFavorite ? "fill-[#E4483B] text-[#E4483B]" : "text-[var(--color-ink-soft)]"}`} viewBox="0 0 24 24" fill={isFavorite ? "#E4483B" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
              </svg>
            </button>
            <span className="absolute bottom-2.5 left-2.5 z-10 font-jetbrains-mono text-[0.63rem] text-white font-semibold capitalize">
              {veh.size}
            </span>
          </div>
          <div className="p-3.5 pb-4">
            <h4 className="font-fraunces font-medium text-[1rem] leading-[1.3]">{veh.model}</h4>
            <div className="flex gap-1.5 flex-wrap mt-1">
              {veh.cats.slice(0, 3).map((c) => (
                <span key={c} className="text-[0.6rem] px-2 py-0.5 rounded-full bg-green-950/10 text-[var(--color-green-deep)] font-bold uppercase tracking-[0.02em] font-jetbrains-mono">
                  {CATEGORY_META[c]?.name || c}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center pt-2.5 mt-2 border-t border-dashed border-[var(--color-line)] text-[0.8rem]">
              <span className="font-bold text-[var(--color-green-deep)]">{formatPrice(veh.price)}</span>
              <span className="flex items-center gap-1.5 text-[var(--color-green)] font-semibold text-[0.74rem] group-hover:gap-2 transition-all">
                View Details
                <svg className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      );
    })}
  </div>
)}

              {/* ─── LIST VIEW ────────────────────────────── */}
              {viewMode === "list" && (
                <div className="flex flex-col">
                  {shownVehicles.map((veh, index) => {
                    const brand = getBrand(veh.brand);
                    return (
                      <div key={`${veh.brand}-${veh.model}-${index}`} className="flex items-center gap-4 px-2.5 py-3.5 border-b border-dashed border-[var(--color-line)] transition-all hover:pl-3">
                        <div className="w-[72px] h-[54px] rounded-[8px] overflow-hidden flex-shrink-0 bg-[#eef1e9]">
                          <Image src={veh.img} alt={veh.model} width={72} height={54} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[0.9rem] font-semibold">{brand.name} {veh.model}</h4>
                          <div className="flex items-center gap-2 mt-1 text-[0.7rem] text-[var(--color-ink-soft)] flex-wrap">
                            {veh.cats.slice(0, 3).map((c) => (
                              <span key={c} className="font-jetbrains-mono uppercase tracking-[0.03em] bg-black/5 px-2 py-0.5 rounded-full text-[0.65rem]">
                                {CATEGORY_META[c]?.name || c}
                              </span>
                            ))}
                            <span className="font-jetbrains-mono capitalize">{veh.size}</span>
                          </div>
                        </div>
                        <span className="font-jetbrains-mono font-bold text-[var(--color-green-deep)] text-[0.85rem] flex-shrink-0">{formatPrice(veh.price)}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ─── EMPTY STATE ──────────────────────────── */}
              {filteredVehicles.length === 0 && (
                <div className="flex flex-col items-center text-center gap-3.5 py-16 px-5 text-[var(--color-ink-soft)]">
                  <svg className="w-10 h-10 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <p>No vehicles match your search or filters.</p>
                  <button
                    onClick={resetFilters}
                    className="px-5 py-2.25 rounded-full border-[1.5px] border-[var(--color-ink)] text-[0.8rem] font-semibold text-[var(--color-ink)] transition-all hover:bg-[var(--color-ink)] hover:text-white"
                  >
                    Reset everything
                  </button>
                </div>
              )}

              {/* ─── LOAD MORE ────────────────────────────── */}
              {shownVehicles.length < filteredVehicles.length && (
                <button
                  onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
                  className="block mx-auto mt-6 px-8 py-3.5 rounded-full border-[1.5px] border-[var(--color-ink)] text-[0.85rem] font-semibold text-[var(--color-ink)] transition-all hover:bg-[var(--color-ink)] hover:text-white"
                >
                  Load more vehicles ({shownVehicles.length} of {filteredVehicles.length})
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ─── SCROLLBAR HIDE ──────────────────────────────── */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}