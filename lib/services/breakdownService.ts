// @ts-nocheck
// lib/services/breakdownService.ts
import { connectToDatabase } from "@/lib/db/mongodb";
import { Breakdown } from "@/lib/models/Breakdown";

export interface BreakdownFilters {
  category?: string;
  featured?: boolean;
  search?: string;
  tag?: string;
  minRating?: number;
  maxRating?: number;
  dateFrom?: string;
  dateTo?: string;
  searchMode?: "fuzzy" | "phrase" | "exact";
  searchIn?: "all" | "title" | "excerpt" | "tags" | "title,excerpt";
  matchAll?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
}

export interface BreakdownResponse {
  success: boolean;
  data: any[];
  featured: any[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
  };
  categories: { name: string; count: number }[];
  tags: { name: string; count: number }[];
  stats: any;
  dateRange: { earliest: string | null; latest: string | null };
  appliedFilters: any;
}

export class BreakdownService {
  static async getBreakdowns(filters: BreakdownFilters = {}): Promise<BreakdownResponse> {
    await connectToDatabase();

    const {
      category,
      featured,
      search,
      tag,
      minRating,
      maxRating,
      dateFrom,
      dateTo,
      searchMode = "fuzzy",
      searchIn = "all",
      matchAll = false,
      sortBy = "createdAt",
      sortOrder = "desc",
      limit = 50,
      page = 1,
    } = filters;

    const skip = (page - 1) * limit;
    const query: any = { isActive: true };

    // Category filter
    if (category && category !== "All") {
      query.category = category;
    }

    // Featured filter
    if (featured === true) {
      query.featured = true;
    }

    // Tag filter
    if (tag) {
      query.tags = tag;
    }

    // Rating range
    if (minRating || maxRating) {
      query.rating = {};
      if (minRating) query.rating.$gte = minRating;
      if (maxRating) query.rating.$lte = maxRating;
    }

    // Date range
    if (dateFrom || dateTo) {
      query.date = {};
      if (dateFrom) query.date.$gte = dateFrom;
      if (dateTo) query.date.$lte = dateTo;
    }

    // Advanced search
    if (search && search.trim()) {
      const searchTerm = search.trim();
      const words = searchTerm.split(/\s+/).filter(w => w.length > 0);
      
      let searchConditions: any[] = [];
      const searchFields = searchIn === "all" 
        ? ["title", "excerpt", "tags", "phones", "sections.content"]
        : searchIn.split(",");
      
      if (searchMode === "exact") {
        searchFields.forEach(field => {
          searchConditions.push({
            [field]: { $regex: `"${searchTerm}"`, $options: "i" }
          });
        });
      } else if (searchMode === "phrase") {
        searchFields.forEach(field => {
          searchConditions.push({
            [field]: { $regex: searchTerm.replace(/\s+/g, "\\s+"), $options: "i" }
          });
        });
      } else {
        if (matchAll) {
          words.forEach(word => {
            const wordConditions: any[] = [];
            searchFields.forEach(field => {
              wordConditions.push({
                [field]: { $regex: word, $options: "i" }
              });
            });
            searchConditions.push({ $or: wordConditions });
          });
        } else {
          const orConditions: any[] = [];
          words.forEach(word => {
            searchFields.forEach(field => {
              orConditions.push({
                [field]: { $regex: word, $options: "i" }
              });
            });
          });
          searchConditions = [{ $or: orConditions }];
        }
      }
      
      if (searchConditions.length > 0) {
        query.$and = searchConditions;
      }
    }

    // Sort
    const sort: any = {};
    if (sortBy === "relevance" && search) {
      sort.score = { $meta: "textScore" };
    } else {
      sort[sortBy] = sortOrder === "asc" ? 1 : -1;
    }

    // Execute queries
    const [breakdowns, total, featuredBreakdowns] = await Promise.all([
      Breakdown.find(query).sort(sort).skip(skip).limit(limit).lean(),
      Breakdown.countDocuments(query),
      Breakdown.find({ featured: true, isActive: true })
        .sort({ views: -1, createdAt: -1 })
        .limit(3)
        .lean(),
    ]);

    // Get category counts
    const categoryCounts = await Breakdown.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Get tag counts
    const tagCounts = await Breakdown.aggregate([
      { $match: { isActive: true } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 },
    ]);

    // Get stats
    const stats = await Breakdown.getStats();

    // Get date range
    const dateRange = await Breakdown.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          earliest: { $min: "$date" },
          latest: { $max: "$date" },
        },
      },
    ]);

    return {
      success: true,
      data: breakdowns,
      featured: featuredBreakdowns,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasMore: total > (page * limit),
      },
      categories: categoryCounts.map((c: any) => ({
        name: c._id,
        count: c.count,
      })),
      tags: tagCounts.map((t: any) => ({
        name: t._id,
        count: t.count,
      })),
      stats,
      dateRange: dateRange[0] || { earliest: null, latest: null },
      appliedFilters: {
        category: category || null,
        featured: featured || null,
        tag: tag || null,
        search: search || null,
        searchMode,
        searchIn,
        matchAll,
        minRating: minRating || null,
        maxRating: maxRating || null,
        dateFrom: dateFrom || null,
        dateTo: dateTo || null,
        sortBy,
        sortOrder,
      },
    };
  }

  static async getBreakdownBySlug(slug: string) {
    await connectToDatabase();
    return Breakdown.findOne({ slug, isActive: true }).lean();
  }

  static async getRelatedBreakdowns(slug: string, category: string, limit: number = 4) {
    await connectToDatabase();
    return Breakdown.find({
      slug: { $ne: slug },
      category,
      isActive: true,
    })
      .sort({ views: -1, createdAt: -1 })
      .limit(limit)
      .lean();
  }
}