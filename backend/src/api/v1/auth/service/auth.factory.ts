import { AuthMongoRepo } from "../repo/auth.mongo.repo";
import { AuthServices } from "./auth.services";

export const createAuthService = () => {
  return new AuthServices(new AuthMongoRepo());
};
