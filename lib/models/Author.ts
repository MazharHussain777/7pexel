// lib/models/Author.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAuthor extends Document {
  name: string;
  slug: string;
  bio: string;
  image?: string;
  email?: string;
  website?: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
  };
  expertise: string[];
  joinedDate: string;
  articlesCount: number;
  totalViews: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AuthorSchema = new Schema<IAuthor>(
  {
    name: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    bio: { type: String, required: true },
    image: { type: String },
    email: { type: String },
    website: { type: String },
    socialLinks: {
      twitter: { type: String },
      linkedin: { type: String },
      github: { type: String },
      youtube: { type: String },
    },
    expertise: { type: [String], default: [] },
    joinedDate: { type: String, default: () => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
    articlesCount: { type: Number, default: 0 },
    totalViews: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Index for searching authors
AuthorSchema.index({ name: "text", bio: "text", expertise: "text" });

export const Author: Model<IAuthor> =
  mongoose.models.Author || mongoose.model<IAuthor>("Author", AuthorSchema);