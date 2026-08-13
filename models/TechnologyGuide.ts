import mongoose, { Schema, Document } from 'mongoose';

export interface ITechnologyGuide extends Document {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  categorySlug: string;
  categoryIcon: string;
  image: string;
  imageAlt?: string;
  author: string;
  authorAvatar: string;
  authorBio?: string;
  date: Date;
  readTime: string;
  level: string;
  tags: string[];
  isFeatured: boolean;
  isTrending: boolean;
  contentHtml: string;
  customStyles?: string;
  canonical?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TechnologyGuideSchema = new Schema<ITechnologyGuide>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true },
    categoryLabel: { type: String, required: true },
    categorySlug: { type: String, required: true, index: true },
    categoryIcon: { type: String, default: '🔧' },
    image: { type: String, required: true },
    imageAlt: { type: String },
    author: { type: String, required: true },
    authorAvatar: { type: String, default: '7P' },
    authorBio: { type: String },
    date: { type: Date, default: Date.now },
    readTime: { type: String, default: '5 min read' },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' },
    tags: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    contentHtml: { type: String, required: true },
    customStyles: { type: String },
    canonical: { type: String },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Indexes for performance
TechnologyGuideSchema.index({ date: -1 });
TechnologyGuideSchema.index({ isFeatured: -1 });
TechnologyGuideSchema.index({ isTrending: -1 });
TechnologyGuideSchema.index({ categorySlug: 1, date: -1 });

export default mongoose.models.TechnologyGuide || 
  mongoose.model<ITechnologyGuide>('TechnologyGuide', TechnologyGuideSchema);