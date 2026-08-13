// models/Phone.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IPhone extends Document {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  image: string;
  rating: number;
  category: string[];
  display: string;
  displaySize: string;
  camera: string;
  cameraDetails: string;
  battery: string;
  chipset: string;
  ram: string;
  storage: string;
  os: string;
  weight: string;
  colors: string[];
  highlights: string[];
  pros: string[];
  cons: string[];
  author: string;
  authorAvatar: string;
  date: Date;
  readTime: string;
  customStyles: string;
  contentHtml: string;
  isFeatured: boolean;
  isTrending: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PhoneSchema = new Schema<IPhone>(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    brand: { type: String, required: true, index: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    category: { type: [String], default: [] },
    display: { type: String, required: true },
    displaySize: { type: String, required: true },
    camera: { type: String, required: true },
    cameraDetails: { type: String, required: true },
    battery: { type: String, required: true },
    chipset: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    os: { type: String, required: true },
    weight: { type: String, required: true },
    colors: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    pros: { type: [String], default: [] },
    cons: { type: [String], default: [] },
    author: { type: String, default: '7pexel Team' },
    authorAvatar: { type: String, default: '7P' },
    date: { type: Date, default: Date.now },
    readTime: { type: String, default: '5 min read' },
    customStyles: { type: String, default: '' },
    contentHtml: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast queries
PhoneSchema.index({ brand: 1, year: -1 });
PhoneSchema.index({ rating: -1 });
PhoneSchema.index({ category: 1 });
PhoneSchema.index({ isFeatured: 1 });
PhoneSchema.index({ isTrending: 1 });
PhoneSchema.index({ published: 1 });
PhoneSchema.index({ brand: 'text', model: 'text', 'category': 'text' });

export default mongoose.models.Phone || mongoose.model<IPhone>('Phone', PhoneSchema);