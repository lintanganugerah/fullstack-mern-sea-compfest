import { JwtPayload } from "@/api/v1/auth/types/auth.types";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      isAdmin?: boolean;
    }
  }
}
