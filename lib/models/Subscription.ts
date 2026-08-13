// lib/models/Subscription.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISubscription extends Document {
  email: string;
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
  ipAddress?: string;
  userAgent?: string;
  source?: string;
  preferences?: {
    categories: string[];
    frequency: 'daily' | 'weekly' | 'monthly';
  };
  metadata: {
    totalEmailsSent: number;
    lastEmailSent?: Date;
    openCount: number;
    clickCount: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    unsubscribedAt: {
      type: Date,
      default: null,
    },
    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
    source: {
      type: String,
      enum: ['header', 'newsletter', 'popup', 'footer', 'other'],
      default: 'other',
    },
    preferences: {
      categories: {
        type: [String],
        default: ['tech', 'reviews', 'news'],
      },
      frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
        default: 'weekly',
      },
    },
    metadata: {
      totalEmailsSent: {
        type: Number,
        default: 0,
      },
      lastEmailSent: {
        type: Date,
        default: null,
      },
      openCount: {
        type: Number,
        default: 0,
      },
      clickCount: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
SubscriptionSchema.index({ email: 1 }, { unique: true });
SubscriptionSchema.index({ isActive: 1, createdAt: -1 });
SubscriptionSchema.index({ isActive: 1, subscribedAt: -1 });
SubscriptionSchema.index({ unsubscribedAt: 1 });

// Virtual for subscription duration
SubscriptionSchema.virtual('subscriptionDuration').get(function() {
  const endDate = this.unsubscribedAt || new Date();
  const diffInDays = Math.floor((endDate.getTime() - this.subscribedAt.getTime()) / (1000 * 60 * 60 * 24));
  return diffInDays;
});

// Pre-save hook to ensure email is lowercase and trimmed
SubscriptionSchema.pre('save', function(next) {
  if (this.email) {
    this.email = this.email.toLowerCase().trim();
  }

});

// Static methods
SubscriptionSchema.statics.getActiveSubscribers = function(limit?: number) {
  const query = this.find({ isActive: true }).sort({ createdAt: -1 });
  if (limit) {
    query.limit(limit);
  }
  return query.lean();
};

SubscriptionSchema.statics.getStats = async function() {
  const [total, active, inactive, recent] = await Promise.all([
    this.countDocuments(),
    this.countDocuments({ isActive: true }),
    this.countDocuments({ isActive: false }),
    this.countDocuments({ 
      isActive: true, 
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } 
    }),
  ]);

  return {
    total,
    active,
    inactive,
    recentWeekly: recent,
  };
};

SubscriptionSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: email.toLowerCase().trim() });
};

SubscriptionSchema.statics.unsubscribe = async function(email: string) {
  const subscription = await this.findOne({ email: email.toLowerCase().trim() });
  
  if (!subscription) {
    throw new Error('Subscription not found');
  }

  if (!subscription.isActive) {
    throw new Error('Already unsubscribed');
  }

  // Soft delete - mark as inactive but keep data for analytics
  subscription.isActive = false;
  subscription.unsubscribedAt = new Date();
  await subscription.save();

  console.log(`✅ Unsubscribed: ${email} at ${subscription.unsubscribedAt}`);
  return subscription;
};

SubscriptionSchema.statics.hardDelete = async function(email: string) {
  const subscription = await this.findOneAndDelete({ email: email.toLowerCase().trim() });
  
  if (!subscription) {
    throw new Error('Subscription not found');
  }

  console.log(`🗑️ Hard deleted: ${email}`);
  return subscription;
};

SubscriptionSchema.statics.resubscribe = async function(email: string) {
  const subscription = await this.findOne({ email: email.toLowerCase().trim() });
  
  if (!subscription) {
    // Create new subscription
    const newSub = await this.create({
      email: email.toLowerCase().trim(),
      isActive: true,
      subscribedAt: new Date(),
    });
    console.log(`✅ New subscription: ${email}`);
    return newSub;
  }

  if (subscription.isActive) {
    throw new Error('Already subscribed');
  }

  // Reactivate
  subscription.isActive = true;
  subscription.unsubscribedAt = null;
  subscription.subscribedAt = new Date();
  await subscription.save();

  console.log(`🔄 Reactivated: ${email}`);
  return subscription;
};

export const Subscription = (mongoose.models.Subscription as Model<ISubscription>) || 
  mongoose.model<ISubscription>('Subscription', SubscriptionSchema);