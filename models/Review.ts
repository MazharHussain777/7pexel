// models/Review.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  slug: string;
  title: string;
  brand: string;
  model: string;
  category: string;
  categoryLabel: string;
  categorySlug: string;
  categoryIcon: string;
  categoryDescription: string;
  rating: number;
  price: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  pros: string[];
  cons: string[];
  author: string;
  authorAvatar: string;
  authorBio?: string;
  date: Date;
  readTime: string;
  isFeatured: boolean;
  isTrending: boolean;
  tags: string[];
  contentHtml: string;
  customStyles: string;
  canonical?: string;
  structuredData?: any;
  views: number;
  likes: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    category: { type: String, required: true },
    categoryLabel: { type: String, required: true },
    categorySlug: { type: String, required: true },
    categoryIcon: { type: String, default: '📰' },
    categoryDescription: { type: String, default: '' },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    price: { type: String, default: '' },
    image: { type: String, default: '' },
    imageAlt: { type: String, default: '' },
    excerpt: { type: String, default: '' },
    pros: { type: [String], default: [] },
    cons: { type: [String], default: [] },
    author: { type: String, required: true },
    authorAvatar: { type: String, default: '' },
    authorBio: { type: String, default: '' },
    date: { type: Date, default: Date.now },
    readTime: { type: String, default: '5 min read' },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    contentHtml: { type: String, default: '' },
    customStyles: { type: String, default: '' },
    canonical: { type: String, default: '' },
    structuredData: { type: Schema.Types.Mixed, default: null },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
export default Review;