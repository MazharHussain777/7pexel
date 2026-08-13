// models/News.ts
import mongoose, { Schema, models } from 'mongoose';

export interface INews {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  categorySlug: string;
  categoryIcon: string;
  categoryColor: string;
  categoryDescription: string;
  image: string;
  imageAlt: string;
  author: string;
  authorAvatar: string;
  authorBio?: string;
  date: Date;
  readTime: string;
  level: string;
  tags: string[];
  isFeatured: boolean;
  isTrending: boolean;
  isBreaking: boolean;
  steps: number;
  difficulty: string;
  contentHtml: string;
  customStyles: string;
  canonical?: string;
  published: boolean;
  views: number;
  structuredData?: any;
}

const NewsSchema = new Schema<INews>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true },
    categoryLabel: { type: String, required: true },
    categorySlug: { type: String, required: true },
    categoryIcon: { type: String, default: '📰' },
    categoryColor: { type: String, default: '#0F6B3E' },
    categoryDescription: { type: String, default: '' },
    image: { type: String, required: true },
    imageAlt: { type: String, default: '' },
    author: { type: String, required: true },
    authorAvatar: { type: String, default: '👤' },
    authorBio: { type: String, default: '' },
    date: { type: Date, default: Date.now },
    readTime: { type: String, default: '3 min' },
    level: { type: String, default: 'Beginner' },
    tags: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isBreaking: { type: Boolean, default: false },
    steps: { type: Number, default: 0 },
    difficulty: { type: String, default: 'Beginner' },
    contentHtml: { type: String, required: true },
    customStyles: { type: String, default: '' },
    canonical: { type: String, default: '' },
    published: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    structuredData: { type: Schema.Types.Mixed, default: null },
  },
  {
    timestamps: true,
  }
);

export default models.News || mongoose.model<INews>('News', NewsSchema);