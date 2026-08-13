// app/auto/data/vehicles.ts

// ─── TYPES ──────────────────────────────────────────────
export interface Brand {
  id: string;
  slug: string;
  name: string;
  logo: string;
  country: string;
  founded: number;
  models: number;
  categories: string[];
  description: string;
  popularModels: string[];
  image: string;
  grad: string;
  color: string;
  textColor?: string;
}

export interface Vehicle {
  brandId: string;
  model: string;
  slug: string;
  cats: string[];
  size: string;
  price: number;
  popularity: number;
  img: string;
  range?: number;
  acceleration?: string;
  topSpeed?: string;
  horsepower?: number;
  torque?: number;
  drivetrain?: string;
  seating?: number;
  cargo?: string;
  warranty?: string;
  engine?: string;
  transmission?: string;
  charging?: string;
  variants?: VehicleVariant[];
  features?: string[];
}

export interface VehicleVariant {
  name: string;
  drivetrain: string;
  horsepower: number;
  torque: number;
  acceleration: string;
  topSpeed: string;
  range: number;
  price: number;
  isPopular?: boolean;
  isPerformance?: boolean;
}

export interface Category {
  key: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

// ─── CATEGORIES ──────────────────────────────────────────
export const CATEGORIES: Category[] = [
  {
    key: "electric",
    name: "Electric",
    icon: "⚡",
    color: "#0A3F26",
    description: "Zero-emission vehicles powered by electric motors",
  },
  {
    key: "suv",
    name: "SUV",
    icon: "🚙",
    color: "#2F5233",
    description: "Sport utility vehicles for family and adventure",
  },
  {
    key: "sedan",
    name: "Sedan",
    icon: "🚘",
    color: "#12836B",
    description: "Classic four-door passenger cars",
  },
  {
    key: "truck",
    name: "Truck",
    icon: "🛻",
    color: "#0F6B3E",
    description: "Pickup trucks and commercial vehicles",
  },
  {
    key: "luxury",
    name: "Luxury",
    icon: "👑",
    color: "#5A6E1F",
    description: "Premium vehicles with high-end features",
  },
  {
    key: "sports",
    name: "Sports",
    icon: "🏎️",
    color: "#6E1F1F",
    description: "Performance-focused sports cars and coupes",
  },
  {
    key: "hybrid",
    name: "Hybrid",
    icon: "🔋",
    color: "#204A3B",
    description: "Vehicles combining electric and gas power",
  },
  {
    key: "compact",
    name: "Compact",
    icon: "🚗",
    color: "#445E1A",
    description: "Small, efficient city-friendly vehicles",
  },
];

// ─── BRANDS ──────────────────────────────────────────────
export const BRANDS: Brand[] = [
  {
    id: "tesla",
    slug: "tesla",
    name: "Tesla",
    logo: "T",
    country: "USA",
    founded: 2003,
    models: 1,
    categories: ["Electric", "Sedan"],
    description:
      "American electric vehicle and clean energy company. Known for innovative automotive technology.",
    popularModels: ["Model 3", "Model Y", "Model S", "Model X"],
    image:
      "https://images.unsplash.com/photo-1536700503337-8b2799bb4a38?w=800&h=600&fit=crop&crop=center",
    grad: "linear-gradient(150deg,#1a1a1a,#333)",
    color: "#CC0000",
  },
  {
    id: "toyota",
    slug: "toyota",
    name: "Toyota",
    logo: "T",
    country: "Japan",
    founded: 1937,
    models: 1,
    categories: ["SUV", "Hybrid"],
    description:
      "Japanese automaker known for reliability and hybrid technology. Pioneer of the Prius and leader in quality.",
    popularModels: ["RAV4", "Camry", "Corolla", "Highlander"],
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&crop=center",
    grad: "linear-gradient(150deg,#0A3F26,#1FA25A)",
    color: "#EB0A1E",
  },
  {
    id: "ford",
    slug: "ford",
    name: "Ford",
    logo: "F",
    country: "USA",
    founded: 1903,
    models: 1,
    categories: ["Truck", "Electric"],
    description:
      "American multinational automaker known for iconic trucks, SUVs, and the legendary Mustang.",
    popularModels: ["F-150", "Mustang Mach-E", "Explorer", "Bronco"],
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop&crop=center",
    grad: "linear-gradient(150deg,#0F3B6E,#1F5FA2)",
    color: "#003478",
  },
];

// ─── VEHICLES ─────────────────────────────────────────────
function createVehicle(
  brandId: string,
  model: string,
  cats: string[],
  size: string,
  price: number,
  popularity: number,
  seed: string,
  extra?: Partial<Vehicle>
): Vehicle {
  return {
    brandId,
    model,
    slug: model.toLowerCase().replace(/ /g, "-"),
    cats,
    size,
    price,
    popularity,
    img: `https://images.unsplash.com/photo-${seed}?w=800&h=600&fit=crop&crop=center`,
    ...extra,
  };
}

export const VEHICLES: Vehicle[] = [
  // ─── 1. TESLA MODEL 3 ──────────────────────────────────
  createVehicle("tesla", "Model 3", ["electric", "sedan"], "Sedan", 38990, 97, "1560958089-b8a1929cea89", {
    range: 315,
    acceleration: "4.2s",
    topSpeed: "140 mph",
    horsepower: 283,
    torque: 310,
    drivetrain: "RWD/AWD",
    seating: 5,
    cargo: "22 cu ft",
    warranty: "4 years / 50,000 miles",
    charging: "250 kW",
    engine: "Electric",
    transmission: "Single-Speed",
    features: [
      "Long Range Battery",
      "Instant Torque",
      "Smart Connectivity",
      "Safety First",
      "Premium Interior",
      "Autopilot",
      "Glass Roof",
      "Fast Charging"
    ],
    variants: [
      {
        name: "Model 3 RWD",
        drivetrain: "Rear-Wheel Drive",
        horsepower: 272,
        torque: 310,
        acceleration: "5.8s",
        topSpeed: "140 mph",
        range: 272,
        price: 38990
      },
      {
        name: "Model 3 Long Range",
        drivetrain: "All-Wheel Drive",
        horsepower: 283,
        torque: 310,
        acceleration: "4.2s",
        topSpeed: "140 mph",
        range: 315,
        price: 47990,
        isPopular: true
      },
      {
        name: "Model 3 Performance",
        drivetrain: "All-Wheel Drive",
        horsepower: 510,
        torque: 490,
        acceleration: "3.1s",
        topSpeed: "163 mph",
        range: 303,
        price: 54990,
        isPerformance: true
      }
    ]
  }),

  // ─── 2. TOYOTA RAV4 HYBRID ──────────────────────────────
  createVehicle("toyota", "RAV4 Hybrid", ["hybrid", "suv"], "SUV", 31250, 95, "1544636331-e26879cd4d9b", {
    range: 580,
    acceleration: "7.3s",
    topSpeed: "115 mph",
    horsepower: 219,
    torque: 163,
    drivetrain: "FWD/AWD",
    seating: 5,
    cargo: "69.8 cu ft",
    warranty: "3 years / 36,000 miles",
    engine: "I4 Hybrid",
    transmission: "CVT",
    features: [
      "Hybrid Efficiency",
      "Spacious Interior",
      "Toyota Safety Sense",
      "All-Weather Capability",
      "Apple CarPlay",
      "Android Auto",
      "Heated Seats",
      "Power Liftgate"
    ],
    variants: [
      {
        name: "RAV4 Hybrid LE",
        drivetrain: "Front-Wheel Drive",
        horsepower: 219,
        torque: 163,
        acceleration: "7.8s",
        topSpeed: "115 mph",
        range: 570,
        price: 31250
      },
      {
        name: "RAV4 Hybrid XLE",
        drivetrain: "All-Wheel Drive",
        horsepower: 219,
        torque: 163,
        acceleration: "7.3s",
        topSpeed: "115 mph",
        range: 580,
        price: 34500,
        isPopular: true
      },
      {
        name: "RAV4 Hybrid Limited",
        drivetrain: "All-Wheel Drive",
        horsepower: 219,
        torque: 163,
        acceleration: "7.3s",
        topSpeed: "115 mph",
        range: 580,
        price: 38900
      }
    ]
  }),

  // ─── 3. FORD F-150 LIGHTNING ──────────────────────────────
  createVehicle("ford", "F-150 Lightning", ["electric", "truck"], "Pickup", 52400, 91, "1583121274602-3e2820c69888", {
    range: 320,
    acceleration: "4.0s",
    topSpeed: "110 mph",
    horsepower: 580,
    torque: 775,
    drivetrain: "AWD",
    seating: 5,
    cargo: "52.8 cu ft",
    warranty: "3 years / 36,000 miles",
    charging: "150 kW",
    engine: "Electric",
    transmission: "Single-Speed",
    features: [
      "Mega Power Frunk",
      "Pro Power Onboard",
      "Smart Towing",
      "Off-Road Capability",
      "BlueCruise",
      "Sync 4",
      "Tailgate Step",
      "All-Weather Mats"
    ],
    variants: [
      {
        name: "Lightning Pro",
        drivetrain: "All-Wheel Drive",
        horsepower: 452,
        torque: 775,
        acceleration: "4.5s",
        topSpeed: "110 mph",
        range: 230,
        price: 52400
      },
      {
        name: "Lightning XLT",
        drivetrain: "All-Wheel Drive",
        horsepower: 580,
        torque: 775,
        acceleration: "4.0s",
        topSpeed: "110 mph",
        range: 320,
        price: 59900,
        isPopular: true
      },
      {
        name: "Lightning Lariat",
        drivetrain: "All-Wheel Drive",
        horsepower: 580,
        torque: 775,
        acceleration: "4.0s",
        topSpeed: "110 mph",
        range: 320,
        price: 72900
      }
    ]
  }),
];

// ─── HELPERS ─────────────────────────────────────────────
export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}

export function getBrandById(id: string): Brand | undefined {
  return BRANDS.find((b) => b.id === id);
}

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return VEHICLES.find((v) => v.slug === slug);
}

export function getVehiclesByBrand(brandId: string): Vehicle[] {
  return VEHICLES.filter((v) => v.brandId === brandId);
}

export function getVehiclesByCategory(category: string): Vehicle[] {
  return VEHICLES.filter((v) => v.cats.includes(category));
}

export function getBrandVehiclesWithBrand(brandId: string): { brand: Brand; vehicles: Vehicle[] } | null {
  const brand = getBrandById(brandId);
  if (!brand) return null;
  const vehicles = getVehiclesByBrand(brandId);
  return { brand, vehicles };
}

export function getSimilarBrands(brand: Brand, limit: number = 5): Brand[] {
  const similar: Brand[] = [];
  for (const b of BRANDS) {
    if (b.id !== brand.id && b.categories.some((c) => brand.categories.includes(c))) {
      similar.push(b);
    }
    if (similar.length >= limit) break;
  }
  return similar;
}

export function getAllCountries(): string[] {
  const countries = new Set<string>();
  BRANDS.forEach((b) => countries.add(b.country));
  return ["all", ...Array.from(countries).sort()];
}

export function getCategoryByKey(key: string): Category | undefined {
  return CATEGORIES.find((c) => c.key === key);
}

export function formatPrice(price: number): string {
  return "$" + price.toLocaleString("en-US");
}