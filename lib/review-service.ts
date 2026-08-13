// lib/review-service.ts
import dbConnect from './mongodb';
import Review, { IReview } from '@/models/Review';
import Category from '@/models/Category';

// Get all reviews
export async function getAllReviews(): Promise<IReview[]> {
  await dbConnect();
  return await Review.find({ published: true })
    .sort({ date: -1 })
    .lean();
}

// Get review by slug
export async function getReviewBySlug(slug: string): Promise<IReview | null> {
  await dbConnect();
  return await Review.findOne({ slug, published: true }).lean();
}

// Get reviews by category
export async function getReviewsByCategory(categorySlug: string): Promise<IReview[]> {
  await dbConnect();
  return await Review.find({ 
    categorySlug, 
    published: true 
  })
  .sort({ date: -1 })
  .lean();
}

// Get featured reviews
export async function getFeaturedReviews(limit: number = 4): Promise<IReview[]> {
  await dbConnect();
  return await Review.find({ 
    isFeatured: true, 
    published: true 
  })
  .sort({ date: -1 })
  .limit(limit)
  .lean();
}

// Get trending reviews
export async function getTrendingReviews(limit: number = 4): Promise<IReview[]> {
  await dbConnect();
  return await Review.find({ 
    isTrending: true, 
    published: true 
  })
  .sort({ date: -1 })
  .limit(limit)
  .lean();
}

// Get all tags from reviews
export async function getAllTags(): Promise<string[]> {
  await dbConnect();
  const reviews = await Review.find({ published: true }).select('tags').lean();
  const tagsSet = new Set<string>();
  reviews.forEach(review => {
    review.tags?.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
}

// Get related reviews
export async function getRelatedReviews(slug: string, limit: number = 4): Promise<IReview[]> {
  await dbConnect();
  const current = await getReviewBySlug(slug);
  if (!current) return [];
  
  return await Review.find({
    _id: { $ne: current._id },
    category: current.category,
    published: true
  })
  .limit(limit)
  .lean();
}

// Create review
export async function createReview(data: Partial<IReview>): Promise<IReview> {
  await dbConnect();
  const review = new Review(data);
  return await review.save();
}

// Update review
export async function updateReview(slug: string, data: Partial<IReview>): Promise<IReview | null> {
  await dbConnect();
  return await Review.findOneAndUpdate(
    { slug },
    { $set: { ...data, updatedAt: new Date() } },
    { new: true }
  ).lean();
}

// Delete review
export async function deleteReview(slug: string): Promise<boolean> {
  await dbConnect();
  const result = await Review.deleteOne({ slug });
  return result.deletedCount > 0;
}

// Get review stats
export async function getReviewStats() {
  await dbConnect();
  const [total, featured, trending, published] = await Promise.all([
    Review.countDocuments(),
    Review.countDocuments({ isFeatured: true }),
    Review.countDocuments({ isTrending: true }),
    Review.countDocuments({ published: true }),
  ]);
  
  return {
    total,
    featured,
    trending,
    published,
    draft: total - published,
  };
}