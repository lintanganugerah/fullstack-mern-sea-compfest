import { randomBytes, createHmac } from "crypto";

const CSRF_SECRET = process.env.CSRF_SECRET || "default_csrf_secret";

export function generateRawCsrfToken(): string {
  return randomBytes(32).toString("hex");
}

export function signCsrfToken(rawToken: string): string {
  return createHmac("sha256", CSRF_SECRET).update(rawToken).digest("hex");
}

export function verifyCsrfToken(
  rawToken: string,
  signedToken: string
): boolean {
  const expectedSignature = signCsrfToken(rawToken);
  return expectedSignature === signedToken;
}
