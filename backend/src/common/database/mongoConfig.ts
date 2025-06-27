import mongoose from "mongoose";
import pRetry from "p-retry";
import { getEnv } from "../config/envConfig";
import { databaseLogger } from "../config/loggerConfig";

const connect = async () => {
  const MONGO_URI = getEnv().MONGO_URI;
  databaseLogger.info("Attempting MongoDB connection...");
  await mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 20,
  });
  databaseLogger.info("MongoDB connected successfully.");
};

export const connectDB = async (): Promise<void> => {
  await pRetry(connect, {
    onFailedAttempt: (error) => {
      databaseLogger.warn(
        `⚠️ MongoDB connection attempt ${error.attemptNumber} failed. ${error.retriesLeft} retries left.`
      );
    },
  });

  mongoose.connection.on("disconnected", async () => {
    databaseLogger.error("MongoDB disconnected.");
    await connectDB(); // reconnect automatically
  });

  mongoose.connection.on("error", (err) => {
    databaseLogger.error("MongoDB connection error:", err);
  });
};
