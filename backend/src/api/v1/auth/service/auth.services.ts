import { AuthMongoRepo } from "../repo/auth.mongo.repo";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response } from "express";
import { RegisterInput, LoginInput, UserMongoData } from "../types/auth.types";
import { getEnv } from "@/common/config/envConfig";
import { aliasName } from "@/common/utils/aliasName";

export class AuthServices {
  constructor(private readonly repo: AuthMongoRepo) {}

  async registerUser(input: RegisterInput) {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await this.repo.createUser({
      ...input,
      password: hashedPassword,
    });

    return user;
  }

  async checkUserExist(email: string): Promise<boolean> {
    const user = await this.repo.findByEmail(email);
    return user ? true : false;
  }

  async loginUser(
    input: LoginInput
  ): Promise<{
    success: boolean;
    message: string;
    token?: string;
    user?: UserMongoData;
  }> {
    const user = await this.repo.findByEmail(input.email);
    if (!user) return { success: false, message: "Invalid credentials" };

    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid) return { success: false, message: "Invalid credentials" };

    const token = jwt.sign(
      { id: user._id, fullName: user.fullName, rl: aliasName[user.role] },
      getEnv().JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return {
      success: true,
      message: "Login Successful",
      token: token,
      user: user,
    };
  }

  async logoutUser(res: Response) {
    res.clearCookie(aliasName["access_token"]);
  }
}
