import { z } from "zod";
import dotenv from "dotenv";

dotenv.config(); // load .env file once

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
  HOST: z.string().min(1).default("localhost"),
  PORT: z.coerce.number().int().positive().default(3000),
  CORS_ORIGIN: z.string().url().default("http://localhost:5173"),
  COMMON_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(1000),
  COMMON_RATE_LIMIT_MS: z.coerce.number().int().positive().default(1000),
  MONGO_URI: z.string().min(1),
  JWT_SECRET: z.string().min(10),
  CSRF_SECRET: z.string().min(10),
  COOKIES_SECRET: z.string().min(10),
});

type Env = z.infer<typeof envSchema> & {
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
};

export function loadEnvFromProcess(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.format());
    throw new Error("Invalid environment variables");
  }

  const data = parsed.data;
  return {
    ...data,
    isDevelopment: data.NODE_ENV === "development",
    isProduction: data.NODE_ENV === "production",
    isTest: data.NODE_ENV === "test",
  };
}

let envStore: Env = loadEnvFromProcess();

export function getEnv(): Env {
  return envStore;
}

export function refreshEnv(): void {
  console.log("Refreshing, loading .env...");
  envStore = loadEnvFromProcess();
  console.log("envStore updated.");
}
