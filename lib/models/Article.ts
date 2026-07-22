// lib/models/Article.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IArticle extends Document {
  category: string;
  title: string;
  headline: string;
  author: string;
  authorBio?: string;
  authorImage?: string;
  date: string;
  updatedDate?: string;
  image: string;
  imageAlt?: string;
  imageCaption?: string;
  excerpt: string;
  content: string;
  isBreaking: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  isSponsored: boolean;
  source: string;
  sourceUrl: string;
  tags: string[];
  comments: number;
  shares: number;
  views: number;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    category: { type: String, required: true, index: true },
    title: { type: String, required: true, index: true },
    headline: { type: String, required: true },
    author: { type: String, required: true, index: true },
    authorBio: { type: String },
    authorImage: { type: String },
    date: { type: String, required: true },
    updatedDate: { type: String },
    image: { type: String, required: true },
    imageAlt: { type: String },
    imageCaption: { type: String },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    isBreaking: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isSponsored: { type: Boolean, default: false },
    source: { type: String, default: "7pexel" },
    sourceUrl: { type: String },
    tags: { type: [String], default: [] },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    slug: { type: String, required: true, unique: true, index: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    canonicalUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
ArticleSchema.index({ category: 1, createdAt: -1 });
ArticleSchema.index({ author: 1, createdAt: -1 });
ArticleSchema.index({ tags: 1 });
ArticleSchema.index({ isBreaking: 1, createdAt: -1 });
ArticleSchema.index({ isFeatured: 1, createdAt: -1 });
ArticleSchema.index({ isTrending: 1, createdAt: -1 });

// Text search index
ArticleSchema.index(
  { title: "text", content: "text", excerpt: "text", tags: "text" },
  { weights: { title: 10, tags: 5, excerpt: 3, content: 1 } }
);

export const Article: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>("Article", ArticleSchema);