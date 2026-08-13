// @ts-nocheck
// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Subscription } from "@/lib/models/Subscription";

// ============================================
// POST - Subscribe a new email
// ============================================
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { email, source = 'header', preferences } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address",
          code: "INVALID_EMAIL",
        },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await Subscription.findOne({ 
      email: email.toLowerCase().trim() 
    });

    if (existing) {
      if (existing.isActive) {
        return NextResponse.json(
          {
            success: false,
            error: "Email is already subscribed",
            code: "ALREADY_SUBSCRIBED",
            data: {
              email: existing.email,
              subscribedAt: existing.subscribedAt,
            },
          },
          { status: 409 }
        );
      }

      // Reactivate inactive subscription
      const reactivated = await Subscription.resubscribe(email);
      return NextResponse.json({
        success: true,
        message: "Subscription reactivated successfully",
        code: "REACTIVATED",
        data: reactivated,
      });
    }

    // Get IP and User Agent
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Create new subscription
    const subscription = new Subscription({
      email: email.toLowerCase().trim(),
      isActive: true,
      subscribedAt: new Date(),
      ipAddress,
      userAgent,
      source: source || 'header',
      preferences: {
        categories: preferences?.categories || ['tech', 'reviews', 'news'],
        frequency: preferences?.frequency || 'weekly',
      },
      metadata: {
        totalEmailsSent: 0,
        openCount: 0,
        clickCount: 0,
      },
    });

    await subscription.save();

    return NextResponse.json(
      {
        success: true,
        message: "Subscribed successfully",
        code: "SUBSCRIBED",
        data: {
          email: subscription.email,
          subscribedAt: subscription.subscribedAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error subscribing:", error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error: "This email is already subscribed",
          code: "DUPLICATE_EMAIL",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to subscribe",
        code: "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}