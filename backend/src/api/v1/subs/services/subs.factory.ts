import { SubsService } from "./subs.services";
import { MongoSubsRepo } from "../repo/subs.mongo.repo";

export const createSubsService = (): SubsService => {
  //TODO: Check if development test then return mock repo
  return new SubsService(new MongoSubsRepo());
};
