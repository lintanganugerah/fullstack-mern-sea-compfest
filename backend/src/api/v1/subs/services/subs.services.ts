import { Schema } from "mongoose";
import { MongoSubsRepo } from "../repo/subs.mongo.repo";
import { CreateSubscriptionInput } from "../types/subs.types";

export class SubsService {
  constructor(private readonly repo: MongoSubsRepo) {}

  getAllSubs() {
    return this.repo.getAll();
  }

  getByIdSubs(id: string | Schema.Types.ObjectId) {
    return this.repo.getById(id);
  }

  async createSubs(input: CreateSubscriptionInput) {
    const newSubs = await this.repo.create({
      ...input,
    });

    return newSubs;
  }
}
