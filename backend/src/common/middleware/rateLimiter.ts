import rateLimit, { type Options } from "express-rate-limit";
import { getEnv } from "../config/envConfig";

const createLimiter = ({ ...options }: Partial<Options>) => {
  return rateLimit({ ...listLimiter["commonLimiter"], ...options });
};

const listLimiter: Record<string, Partial<Options>> = {
  commonLimiter: {
    windowMs: getEnv().COMMON_RATE_LIMIT_MS,
    limit: getEnv().COMMON_RATE_LIMIT_MAX,
  },
  auth: {
    windowMs: 15 * 60 * 1000,
    limit: 8,
  },
};

export const applyLimiter = (nameType: keyof typeof listLimiter) => {
  const get = listLimiter[nameType];
  return createLimiter(get);
};
