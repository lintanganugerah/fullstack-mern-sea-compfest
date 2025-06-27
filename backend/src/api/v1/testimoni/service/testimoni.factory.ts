import { MongoTestimoniRepo } from "../repo/testimoni.mongo.repo";
import { TestimoniService } from "./testimoni.services";

export const createTestimoniService = (): TestimoniService => {
  //TODO: Check if development test then return mock repo
  return new TestimoniService(new MongoTestimoniRepo());
};
