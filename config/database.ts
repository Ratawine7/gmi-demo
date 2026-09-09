import mongoose, { type Mongoose } from 'mongoose';

type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

// Reuse the connection across hot reloads and repeated calls.
const globalWithMongoose = globalThis as typeof globalThis & { _mongoose?: MongooseCache };

const cached: MongooseCache = globalWithMongoose._mongoose ?? { conn: null, promise: null };
globalWithMongoose._mongoose = cached;

export async function databaseConnect(): Promise<Mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined. Add your MongoDB connection string to config/config.env.');
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB || 'gmi',
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log(`MongoDB connected: ${cached.conn.connection.host}/${cached.conn.connection.name}`);
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export async function databaseDisconnect() {
  if (!cached.conn) return;
  await cached.conn.disconnect();
  cached.conn = null;
  cached.promise = null;
}

export default databaseConnect;
