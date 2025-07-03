import { RegisterInput } from "./../types/auth.types";
import { UserModel } from "../models/auth.models";

export class AuthMongoRepo {
  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async createUser(user: RegisterInput) {
    return UserModel.create(user);
  }
}
