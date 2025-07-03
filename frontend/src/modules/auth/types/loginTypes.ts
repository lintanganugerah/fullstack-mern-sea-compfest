import z from "zod";
import type { loginSchemaZod } from "../zod/loginSchemaZod";
import type { aliasName } from "utils/aliasName";
import type { BaseApiResponseTypes } from "types/BaseApiResponse";

export type LoginFormData = z.infer<typeof loginSchemaZod>;

export type JwtTokenState = {
  token: string;
};

export type CsrfTokenState = {
  [key in (typeof aliasName)["csrf_token"]]: string;
};

export type User = {
  _id: string;
  fullName: string;
  email: string;
};

export type JwtPayload = {
  id: string;
  fullName: string;
  rl: string;
  iat?: number;
  exp?: number;
};

export type UserState = Partial<User> & {
  rl?: string;
};

export type LoginResponse = BaseApiResponseTypes & {
  responseObject: JwtTokenState & CsrfTokenState;
};
