import { config } from "@pbb/config/env";
import mongoose from "mongoose";

export async function connectMongo() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(config.mongoUri);
  console.log("[MongoDB] connected");
}
