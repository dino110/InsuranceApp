import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export default async function connectDB() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, { dbName: "insuranceDb" });
  console.log(`MongoDB connected to ${mongoUri}`);
}
