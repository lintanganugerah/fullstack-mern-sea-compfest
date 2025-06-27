import { Schema } from "mongoose";
import { SubscriptionModel } from "../models/subs.models";
import {
  CreateSubscriptionInput,
  SubscriptionMongoDataType,
} from "../types/subs.types";

export class MongoSubsRepo {
  async getAll() {
    return SubscriptionModel.find().sort({ createdAt: -1 });
  }

  async getById(id: string | Schema.Types.ObjectId) {
    return SubscriptionModel.findById(id);
  }

  async create(
    input: CreateSubscriptionInput
  ): Promise<SubscriptionMongoDataType> {
    return SubscriptionModel.create(input);
  }
}
