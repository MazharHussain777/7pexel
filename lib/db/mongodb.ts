// lib/db/mongodb.ts
import mongoose from "mongoose";

// HARDCODE YOUR URI HERE - This will work immediately
const MONGODB_URI = "mongodb://mazharhussain137913_db_user:Hussain777@ac-w7guc6w-shard-00-00.qgw6esj.mongodb.net:27017,ac-w7guc6w-shard-00-01.qgw6esj.mongodb.net:27017,ac-w7guc6w-shard-00-02.qgw6esj.mongodb.net:27017/?ssl=true&replicaSet=atlas-fiabp8-shard-0&authSource=admin&appName=Cluster0";

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: GlobalMongoose | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    };

    cached!.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("✅ MongoDB connected successfully");
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
        throw error;
      });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

export async function disconnectFromDatabase() {
  if (cached?.conn) {
    await cached.conn.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log("MongoDB disconnected");
  }
}