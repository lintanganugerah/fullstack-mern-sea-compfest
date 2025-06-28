import { ServiceResponse } from "@/common/utils/serviceResponse";
import { Request, RequestHandler, Response } from "express";
import { createAuthService } from "../service/auth.factory";
import { respond } from "@/common/utils/responseHandler";
import { aliasName } from "@/common/utils/aliasName";
import { getEnv } from "@/common/config/envConfig";
import { generateRawCsrfToken, signCsrfToken } from "@/common/utils/csrfUtils";

const authService = createAuthService();

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  if (req.body.role && req.body.role == "admin" && !req.isAdmin) {
    respond(
      res,
      ServiceResponse.failure("Forbidden: You can't do t", undefined, 403)
    );
  }

  const existing = await authService.checkUserExist(req.body.email);
  if (existing) {
    respond(res, ServiceResponse.failure("Email already registered"));
    return;
  }

  const payload = {
    ...req.body,
    role: "user",
  };

  const userCreated = await authService.registerUser(payload);
  if (!userCreated) {
    respond(
      res,
      ServiceResponse.failure("Something Wrong Happened", undefined, 500)
    );
    return;
  }

  respond(
    res,
    ServiceResponse.success("User Succesfully Registered", undefined, 201)
  );
};

//Controller sudah melalui pengecekan apakah yang createa adalah admin atau tidak pada routes
export const createAdmin: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const existing = await authService.checkUserExist(req.body.email);
  if (existing) {
    respond(res, ServiceResponse.failure("Email already registered"));
    return;
  }

  const payload = {
    ...req.body,
    role: "admin",
  };

  const userCreated = await authService.registerUser(payload);
  if (!userCreated) {
    respond(
      res,
      ServiceResponse.failure("Something Wrong Happened", undefined, 500)
    );
    return;
  }

  respond(
    res,
    ServiceResponse.success("User Succesfully Registered", undefined, 201)
  );
};

export const login: RequestHandler = async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);
  if (!result.success || !result.user) {
    respond(res, ServiceResponse.failure(result.message, null, 401));
    return;
  }

  const rl = aliasName[result.user.role] || "";

  // Double Submit Token
  const csrfToken = generateRawCsrfToken();
  const signedToken = signCsrfToken(csrfToken);
  res.cookie(aliasName["csrf_token_signed"], signedToken, {
    httpOnly: true,
    secure: getEnv().isProduction,
    sameSite: "lax",
    maxAge: 1000 * 60 * 15, // 15 menit
  });

  res.cookie(aliasName["role"], rl, {
    httpOnly: true,
    secure: getEnv().isProduction,
    sameSite: "lax",
    maxAge: 1000 * 60 * 15, // 15 menit
  });

  respond(
    res,
    ServiceResponse.success("Login success", {
      [aliasName["csrf_token"]]: csrfToken,
      token: result.token,
    })
  );
};

export const logout: RequestHandler = async (_: Request, res: Response) => {
  res.clearCookie(aliasName["csrf_token_signed"]);
  res.clearCookie(aliasName["role"]);
  respond(res, ServiceResponse.success("Logout success"));
};

export const refreshCsrf: RequestHandler = async (
  _: Request,
  res: Response
) => {
  // Double Submit Token
  const csrfToken = generateRawCsrfToken();
  const signedToken = signCsrfToken(csrfToken);
  res.cookie(aliasName["csrf_token_signed"], signedToken, {
    httpOnly: true,
    secure: getEnv().isProduction,
    sameSite: "lax",
    maxAge: 1000 * 60 * 15, // 15 menit
  });

  respond(
    res,
    ServiceResponse.success("Login success", {
      [aliasName["csrf_token"]]: csrfToken,
    })
  );
};

// Pengecekan apakah JWT masih valid sudah dilakukan melalui middleware requireAuth
// Jika sudah masuk ke controller artinya valid tinggal kita beri response
export const verifyAuth: RequestHandler = (_: Request, res: Response) => {
  respond(res, ServiceResponse.success("valid"));
};

// Pengecekan apakah JWT masih valid sudah dilakukan melalui middleware requireAuth
// Jika sudah masuk ke controller artinya valid tinggal kita beri response
export const verifyAdmin: RequestHandler = (_: Request, res: Response) => {
  respond(res, ServiceResponse.success("valid"));
};
