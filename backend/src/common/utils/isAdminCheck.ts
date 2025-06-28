import jwt from "jsonwebtoken";
import { getEnv } from "../config/envConfig";
import { JwtPayload } from "@/api/v1/auth/types/auth.types";

export default function isAdminCheck(token: string) {
  try {
    const decoded = jwt.verify(token, getEnv().JWT_SECRET) as JwtPayload;
    const role = decoded.role;
    if (role == "admin") {
      return { success: true, message: "Success" };
    }

    return { success: false, message: "Forbidden" };
  } catch (error) {
    return {
      success: false,
      message: "Token expired or token invalid, please login again",
    };
  }
}
