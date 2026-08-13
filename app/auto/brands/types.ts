// app/auto/brands/types.ts
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