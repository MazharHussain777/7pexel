// lib/models/Comment.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComment extends Document {
  articleId: mongoose.Types.ObjectId;
  author: string;
  authorEmail?: string;
  authorAvatar?: string;
  content: string;
  parentId?: mongoose.Types.ObjectId;
  likes: number;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    articleId: { type: Schema.Types.ObjectId, ref: "Article", required: true, index: true },
    author: { type: String, required: true },
    authorEmail: { type: String },
    authorAvatar: { type: String },
    content: { type: String, required: true },
    parentId: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
    likes: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Index for fetching comments by article
CommentSchema.index({ articleId: 1, createdAt: -1 });

export const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);