// lib/news-types.ts
export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  categorySlug: string;
  categoryIcon: string;
  categoryDescription: string;
  image: string;
  imageAlt: string;
  author: string;
  authorAvatar: string;
  authorBio?: string;
  date: string;
  readTime: string;
  tags: string[];
  isFeatured: boolean;
  isBreaking: boolean;
  isTrending: boolean;
  contentHtml: string;
  customStyles?: string;
  canonical?: string;
  structuredData?: any;
  views: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateArticleInput {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorBio?: string;
  contentHtml: string;
  image?: string;
  imageAlt?: string;
  tags?: string[];
  isFeatured?: boolean;
  isBreaking?: boolean;
  isTrending?: boolean;
  published?: boolean;
  date?: string;
  readTime?: string;
  customStyles?: string;
  canonical?: string;
  structuredData?: any;
}

export interface UpdateArticleInput extends Partial<CreateArticleInput> {
  slug?: string;
}