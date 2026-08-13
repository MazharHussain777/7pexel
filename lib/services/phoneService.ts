// lib/services/phoneService.ts
import { Phone } from "@/lib/models/Phone";
import { connectToDatabase } from "@/lib/db/mongodb";

export interface PhoneFilters {
  brand?: string;
  search?: string;
  flagship?: boolean;
  editorChoice?: boolean;
  minBattery?: number;
  minRam?: number;
  minDisplay?: number;
  fastCharge?: boolean;
  fiveG?: boolean;
  foldable?: boolean;
  gaming?: boolean;
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export class PhoneService {
  static async getPhones(filters: PhoneFilters = {}) {
    await connectToDatabase();

    const {
      brand,
      search,
      flagship,
      editorChoice,
      minBattery,
      minRam,
      minDisplay,
      fastCharge,
      fiveG,
      foldable,
      gaming,
      limit = 50,
      page = 1,
      sortBy = "year",
      sortOrder = "desc",
    } = filters;

    const query: any = {};

    if (brand) query.brand = brand;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { "specs.chipset": { $regex: search, $options: "i" } },
      ];
    }
    if (flagship) query.isFlagship = true;
    if (editorChoice) query.isEditorChoice = true;
    if (fiveG) query.tags = { $in: ["5G"] };
    if (foldable) query.tags = { $in: [/fold/i] };
    if (gaming) {
      query.$or = [
        { tags: { $in: [/game/i] } },
        { brand: "Asus" },
      ];
    }

    // Advanced filters using aggregation
    let pipeline: any[] = [{ $match: query }];

    if (minBattery) {
      pipeline.push({
        $addFields: {
          batteryValue: {
            $toInt: { $arrayElemAt: [{ $split: ["$specs.battery", " "] }, 0] }
          }
        }
      });
      pipeline.push({ $match: { batteryValue: { $gte: minBattery } } });
    }

    if (minRam) {
      pipeline.push({
        $addFields: {
          ramValue: {
            $toInt: { $arrayElemAt: [{ $split: ["$specs.ram", " "] }, 0] }
          }
        }
      });
      pipeline.push({ $match: { ramValue: { $gte: minRam } } });
    }

    if (minDisplay) {
      pipeline.push({
        $addFields: {
          displayValue: {
            $toDouble: { $arrayElemAt: [{ $split: ["$specs.display", " "] }, 0] }
          }
        }
      });
      pipeline.push({ $match: { displayValue: { $gte: minDisplay } } });
    }

    if (fastCharge) {
      pipeline.push({
        $addFields: {
          chargeValue: {
            $toInt: { $arrayElemAt: [{ $split: ["$specs.wiredCharging", " "] }, 0] }
          }
        }
      });
      pipeline.push({ $match: { chargeValue: { $gte: 45 } } });
    }

    // Sorting
    const sort: any = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;
    pipeline.push({ $sort: sort });

    // Pagination
    const skip = (page - 1) * limit;
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    const [phones, total] = await Promise.all([
      Phone.aggregate(pipeline),
      Phone.countDocuments(query),
    ]);

    return {
      data: phones,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getPhoneBySlug(slug: string) {
    await connectToDatabase();
    return Phone.findOne({ slug }).lean();
  }

  static async getRelatedPhones(slug: string, limit: number = 7) {
    await connectToDatabase();
    const currentPhone = await Phone.findOne({ slug }).lean();
    if (!currentPhone) return [];

    return Phone.find({
      slug: { $ne: slug },
      $or: [
        { brand: currentPhone.brand },
        { tags: { $in: currentPhone.tags || [] } },
      ],
    })
      .limit(limit)
      .lean();
  }

  static async getBrands() {
    await connectToDatabase();
    return Phone.distinct("brand");
  }

  static async getFlagshipPhones(limit: number = 6) {
    await connectToDatabase();
    return Phone.find({ isFlagship: true }).limit(limit).lean();
  }

  static async getEditorChoicePhones(limit: number = 6) {
    await connectToDatabase();
    return Phone.find({ isEditorChoice: true }).limit(limit).lean();
  }
}