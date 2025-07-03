import { randomBytes, createHmac } from "crypto";
import { getEnv } from "../config/envConfig";
import { serverLogger } from "../config/loggerConfig";

export function generateRawCsrfToken(): string {
  return randomBytes(32).toString("hex");
}

export function signCsrfToken(rawToken: string): string {
  return createHmac("sha256", getEnv().CSRF_SECRET)
    .update(rawToken)
    .digest("hex");
}

export function verifyCsrfToken(
  rawToken: string,
  signedToken: string
): boolean {
  const expectedSignature = signCsrfToken(rawToken);
  serverLogger.info(
    `Signed Token on csrf (${signedToken}) with expected token ${expectedSignature}`
  );
  return expectedSignature === signedToken;
}
