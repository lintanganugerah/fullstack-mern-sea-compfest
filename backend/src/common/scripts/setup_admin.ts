import bcrypt from "bcrypt";
import { serverLogger } from "../config/loggerConfig";
import { createAuthService } from "@/api/v1/auth/service/auth.factory";
import { getEnv } from "../config/envConfig";
import mongoose from "mongoose";

const authService = createAuthService();

const run = async () => {
  const email = "admin@example.com";
  const fullName = "admin";
  const plain = "admin"; //change it later

  try {
    serverLogger.info("Connecting to MongoDB For Setup Admin...");
    await mongoose.connect(getEnv().MONGO_URI);
    serverLogger.info("MongoDB connected (For Setup Admin).");

    const existing = await authService.checkUserExist(email);
    if (existing) {
      console.log("Admin already exists. Skipping creation.");
      throw new Error("Setup failed, already exist");
    }

    const hashed = await bcrypt.hash(plain, 10);
    const payload = {
      fullName,
      email,
      password: hashed,
      role: "admin",
    };
    await authService.registerUser(payload);

    serverLogger.info("Admin user created:");
    serverLogger.info(`   Email     : ${email}`);
    serverLogger.info(`   Pw        : ${plain}`);
    process.exit(0);
  } catch (err) {
    serverLogger.error(`Failed to create admin: ${err}`);
    process.exit(1);
  }
};

run();
