import mongoose from "mongoose"

let cached = (global as any).mongoose || { conn: null, promise: null }

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn

  if (!process.env.MONGODB_URI) throw new Error("MONGODB URI is  missing")

  cached.promise =
    cached.promise ||
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: "evently",
      bufferCommands: false,
    })
  cached.conn = await cached.promise

  return cached.conn
}
