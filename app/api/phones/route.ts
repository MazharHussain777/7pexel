// app/api/phones/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Phone } from "@/lib/models/Phone";

// ============================================
// GET - Get all phones with filters
// ============================================
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const searchParams = request.nextUrl.searchParams;
    
    // Get all filter parameters
    const brand = searchParams.get("brand");
    const ram = searchParams.get("ram");
    const storage = searchParams.get("storage");
    const search = searchParams.get("search");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minBattery = searchParams.get("minBattery");
    const maxBattery = searchParams.get("maxBattery");
    const minDisplay = searchParams.get("minDisplay");
    const maxDisplay = searchParams.get("maxDisplay");
    const minRating = searchParams.get("minRating");
    const isFlagship = searchParams.get("isFlagship");
    const isEditorChoice = searchParams.get("isEditorChoice");
    const has5G = searchParams.get("has5G");
    const hasWirelessCharging = searchParams.get("hasWirelessCharging");
    const hasWaterResistance = searchParams.get("hasWaterResistance");
    const hasNFC = searchParams.get("hasNFC");
    const os = searchParams.get("os");
    const year = searchParams.get("year");
    const sortBy = searchParams.get("sortBy") || "year";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const limit = parseInt(searchParams.get("limit") || "50");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};

    // Brand filter (supports multiple brands)
    if (brand) {
      const brands = brand.split(",");
      query.brand = { $in: brands };
    }

    // RAM filter
    if (ram) {
      const rams = ram.split(",");
      query["specs.ram"] = { $in: rams };
    }

    // Storage filter
    if (storage) {
      const storages = storage.split(",");
      query["specs.storage"] = { $in: storages };
    }

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    // Battery range
    if (minBattery || maxBattery) {
      query["specs.battery"] = {};
      if (minBattery) {
        query["specs.battery"].$gte = `${minBattery}mAh`;
      }
      if (maxBattery) {
        query["specs.battery"].$lte = `${maxBattery}mAh`;
      }
    }

    // Display range
    if (minDisplay || maxDisplay) {
      query["specs.display"] = {};
      if (minDisplay) {
        query["specs.display"].$gte = `${minDisplay}"`;
      }
      if (maxDisplay) {
        query["specs.display"].$lte = `${maxDisplay}"`;
      }
    }

    // Rating filter
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    // Flagship filter
    if (isFlagship === "true") {
      query.isFlagship = true;
    }

    // Editor Choice filter
    if (isEditorChoice === "true") {
      query.isEditorChoice = true;
    }

    // Features filters
    if (has5G === "true") {
      query.tags = { $in: ["5G"] };
    }
    if (hasWirelessCharging === "true") {
      query["specs.wirelessCharging"] = { $ne: "No" };
    }
    if (hasWaterResistance === "true") {
      query["specs.waterResistance"] = { $ne: "N/A" };
    }
    if (hasNFC === "true") {
      query["specs.nfc"] = { $ne: "No" };
    }

    // OS filter
    if (os) {
      query["specs.os"] = { $regex: os, $options: "i" };
    }

    // Year filter
    if (year) {
      query.year = parseInt(year);
    }

    // Search filter (text search)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
        { "specs.chipset": { $regex: search, $options: "i" } },
        { "specs.camera": { $regex: search, $options: "i" } },
        { "specs.processor": { $regex: search, $options: "i" } },
      ];
    }

    // Build sort
    const sort: any = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Get phones with pagination
    const [phones, total] = await Promise.all([
      Phone.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Phone.countDocuments(query),
    ]);

    // Get dynamic filter options from database
    const [brands, ramOptions, storageOptions, osOptions, yearOptions, chipsetOptions] = await Promise.all([
      Phone.distinct("brand"),
      Phone.distinct("specs.ram"),
      Phone.distinct("specs.storage"),
      Phone.distinct("specs.os"),
      Phone.distinct("year").then(years => years.sort((a, b) => b - a)),
      Phone.distinct("specs.chipset"),
    ]);

    return NextResponse.json({
      success: true,
      data: phones,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      filters: {
        brands: brands.filter(Boolean),
        ramOptions: ramOptions.filter(Boolean),
        storageOptions: storageOptions.filter(Boolean),
        osOptions: osOptions.filter(Boolean),
        yearOptions: yearOptions.filter(Boolean),
        chipsetOptions: chipsetOptions.filter(Boolean),
        priceRanges: [
          { label: "Under $500", min: 0, max: 500 },
          { label: "$500 - $1000", min: 500, max: 1000 },
          { label: "$1000 - $2000", min: 1000, max: 2000 },
          { label: "Over $2000", min: 2000, max: Infinity },
        ],
        batteryRanges: [
          { label: "Under 4000mAh", min: 0, max: 4000 },
          { label: "4000-5000mAh", min: 4000, max: 5000 },
          { label: "5000+mAh", min: 5000, max: 10000 },
        ],
        displayRanges: [
          { label: "Under 6.0\"", min: 0, max: 6.0 },
          { label: "6.0-6.5\"", min: 6.0, max: 6.5 },
          { label: "6.5+\"", min: 6.5, max: 8.0 },
        ],
        ratingOptions: [
          { label: "4.5+ Stars", value: 4.5 },
          { label: "4.0+ Stars", value: 4.0 },
          { label: "3.5+ Stars", value: 3.5 },
          { label: "3.0+ Stars", value: 3.0 },
        ],
        features: [
          { id: "isFlagship", label: "Flagship" },
          { id: "isEditorChoice", label: "Editor's Choice" },
          { id: "has5G", label: "5G" },
          { id: "hasWirelessCharging", label: "Wireless Charging" },
          { id: "hasWaterResistance", label: "Water Resistant" },
          { id: "hasNFC", label: "NFC" },
        ],
      },
    });
  } catch (error: any) {
    console.error("Error fetching phones:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Failed to fetch phones",
        data: [],
        pagination: { total: 0, page: 1, limit: 50, totalPages: 0 },
        filters: {
          brands: [],
          ramOptions: [],
          storageOptions: [],
          osOptions: [],
          yearOptions: [],
          chipsetOptions: [],
          priceRanges: [],
          batteryRanges: [],
          displayRanges: [],
          ratingOptions: [],
          features: [],
        },
      },
      { status: 500 }
    );
  }
}

// ============================================
// POST - Create a new phone
// ============================================
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();

    // Validate required fields
    const requiredFields = ["name", "brand", "slug", "year"];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Check if phone with same slug already exists
    const existingPhone = await Phone.findOne({ slug: body.slug });
    if (existingPhone) {
      return NextResponse.json(
        { success: false, error: `Phone with slug "${body.slug}" already exists` },
        { status: 409 }
      );
    }

    // Check if phone with same name and brand already exists
    const existingName = await Phone.findOne({ 
      name: body.name, 
      brand: body.brand 
    });
    if (existingName) {
      return NextResponse.json(
        { success: false, error: `Phone "${body.name}" from ${body.brand} already exists` },
        { status: 409 }
      );
    }

    // Set defaults for optional fields
    const phoneData = {
      ...body,
      rating: body.rating || 0,
      reviewCount: body.reviewCount || 0,
      isFlagship: body.isFlagship || false,
      isEditorChoice: body.isEditorChoice || false,
      tags: body.tags || [],
      image: body.image || "/images/default-phone.jpg",
      specs: {
        display: body.specs?.display || "",
        displayType: body.specs?.displayType || "",
        resolution: body.specs?.resolution || "",
        pixelDensity: body.specs?.pixelDensity || "",
        screenToBodyRatio: body.specs?.screenToBodyRatio || "",
        refreshRate: body.specs?.refreshRate || "",
        brightness: body.specs?.brightness || "",
        protection: body.specs?.protection || "",
        hdrSupport: body.specs?.hdrSupport || "",
        alwaysOnDisplay: body.specs?.alwaysOnDisplay || "",
        chipset: body.specs?.chipset || "",
        cpu: body.specs?.cpu || "",
        gpu: body.specs?.gpu || "",
        neuralEngine: body.specs?.neuralEngine || "",
        ram: body.specs?.ram || "",
        ramType: body.specs?.ramType || "",
        storage: body.specs?.storage || "",
        storageType: body.specs?.storageType || "",
        camera: body.specs?.camera || "",
        cameraWide: body.specs?.cameraWide || "",
        cameraUltraWide: body.specs?.cameraUltraWide || "",
        cameraTelephoto: body.specs?.cameraTelephoto || "",
        cameraFeatures: body.specs?.cameraFeatures || "",
        videoRecording: body.specs?.videoRecording || "",
        frontCamera: body.specs?.frontCamera || "",
        frontFeatures: body.specs?.frontFeatures || "",
        dimensions: body.specs?.dimensions || "",
        weight: body.specs?.weight || "",
        build: body.specs?.build || "",
        colors: body.specs?.colors || [],
        colorFinish: body.specs?.colorFinish || "",
        waterResistance: body.specs?.waterResistance || "",
        battery: body.specs?.battery || "",
        batteryType: body.specs?.batteryType || "",
        wiredCharging: body.specs?.wiredCharging || "",
        wirelessCharging: body.specs?.wirelessCharging || "",
        batteryTechnology: body.specs?.batteryTechnology || "",
        videoPlayback: body.specs?.videoPlayback || "",
        audioPlayback: body.specs?.audioPlayback || "",
        standbyTime: body.specs?.standbyTime || "",
        os: body.specs?.os || "",
        osUpdates: body.specs?.osUpdates || "",
        audio: body.specs?.audio || "",
        headphoneJack: body.specs?.headphoneJack || "",
        audioRecording: body.specs?.audioRecording || "",
        sim: body.specs?.sim || "",
        networkBands: body.specs?.networkBands || "",
        wifi: body.specs?.wifi || "",
        bluetooth: body.specs?.bluetooth || "",
        nfc: body.specs?.nfc || "",
        usb: body.specs?.usb || "",
        gps: body.specs?.gps || "",
        ultraWideband: body.specs?.ultraWideband || "",
        satelliteSOS: body.specs?.satelliteSOS || "",
        crashDetection: body.specs?.crashDetection || "",
        threadSupport: body.specs?.threadSupport || "",
        security: body.specs?.security || "",
        sensors: body.specs?.sensors || "",
        applePay: body.specs?.applePay || "",
        magSafe: body.specs?.magSafe || "",
        emergencySOS: body.specs?.emergencySOS || "",
        boxContents: body.specs?.boxContents || "",
        models: body.specs?.models || [],
        pricing: body.specs?.pricing || [],
      },
      benchmarks: {
        antutu: body.benchmarks?.antutu || 0,
        geekbench6Single: body.benchmarks?.geekbench6Single || 0,
        geekbench6Multi: body.benchmarks?.geekbench6Multi || 0,
        wildLifeExtreme: body.benchmarks?.wildLifeExtreme || "",
      },
      stats: {
        views: body.stats?.views || "0",
        favorites: body.stats?.favorites || "0",
        shares: body.stats?.shares || "0",
        reviews: body.stats?.reviews || "0",
      },
    };

    // Create new phone
    const phone = new Phone(phoneData);
    await phone.save();

    return NextResponse.json(
      {
        success: true,
        message: "Phone created successfully",
        data: phone,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating phone:", error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { 
          success: false, 
          error: `A phone with this ${field} already exists` 
        },
        { status: 409 }
      );
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e: any) => e.message);
      return NextResponse.json(
        { 
          success: false, 
          error: errors.join(", ") 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Failed to create phone" },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE - Delete multiple phones (by IDs or all)
// ============================================
export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const ids = searchParams.get("ids");
    const slug = searchParams.get("slug");
    const deleteAll = searchParams.get("all") === "true";

    // If deleteAll is true, delete all phones (BE CAREFUL!)
    if (deleteAll) {
      // Optional: Add admin check here
      const result = await Phone.deleteMany({});
      return NextResponse.json({
        success: true,
        message: `Deleted ${result.deletedCount} phones`,
        deletedCount: result.deletedCount,
      });
    }

    // Delete by slug
    if (slug) {
      const phone = await Phone.findOneAndDelete({ slug });
      if (!phone) {
        return NextResponse.json(
          { success: false, error: `Phone with slug "${slug}" not found` },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        message: `Phone "${phone.name}" deleted successfully`,
        data: phone,
      });
    }

    // Delete by multiple IDs
    if (ids) {
      const idArray = ids.split(",").filter(Boolean);
      if (idArray.length === 0) {
        return NextResponse.json(
          { success: false, error: "No valid IDs provided" },
          { status: 400 }
        );
      }

      const result = await Phone.deleteMany({ 
        _id: { $in: idArray } 
      });

      return NextResponse.json({
        success: true,
        message: `Deleted ${result.deletedCount} phones`,
        deletedCount: result.deletedCount,
      });
    }

    // No parameters provided
    return NextResponse.json(
      { 
        success: false, 
        error: "Please provide either 'slug', 'ids', or 'all=true' parameter" 
      },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error deleting phones:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete phones" },
      { status: 500 }
    );
  }
}

// ============================================
// PUT - Update a phone (by slug or ID)
// ============================================
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get("slug");
    const id = searchParams.get("id");
    const body = await request.json();

    let query: any = {};
    if (slug) query.slug = slug;
    else if (id) query._id = id;
    else {
      return NextResponse.json(
        { success: false, error: "Please provide either 'slug' or 'id' parameter" },
        { status: 400 }
      );
    }

    // Remove _id, __v, createdAt, updatedAt from update body
    const { _id, __v, createdAt, updatedAt, ...updateData } = body;

    const phone = await Phone.findOneAndUpdate(
      query,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!phone) {
      return NextResponse.json(
        { success: false, error: "Phone not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Phone updated successfully",
      data: phone,
    });
  } catch (error: any) {
    console.error("Error updating phone:", error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { 
          success: false, 
          error: `A phone with this ${field} already exists` 
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Failed to update phone" },
      { status: 500 }
    );
  }
}