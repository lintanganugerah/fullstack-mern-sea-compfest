import { JwtPayload as officialJwtPayload } from "jsonwebtoken";
import { UserSchemaMongo } from "./../models/auth.models";
import z from "zod";
import { InferSchemaType } from "mongoose";
import {
  RegisterSchemaZod,
  LoginSchemaZod,
  UserRoleSchemaZod,
} from "../zod/auth.zod";

export type User = z.infer<typeof RegisterSchemaZod>;
export type UserMongoData = InferSchemaType<typeof UserSchemaMongo>;
export type RegisterInput = z.infer<typeof RegisterSchemaZod>;
export type LoginInput = z.infer<typeof LoginSchemaZod>;
export type UserRole = z.infer<typeof UserRoleSchemaZod>;
export type JwtPayload = officialJwtPayload & {
  useId: string;
  role: "user" | "admin";
};
