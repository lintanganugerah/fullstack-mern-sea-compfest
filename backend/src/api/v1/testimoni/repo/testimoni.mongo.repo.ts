import { Schema } from "mongoose";
import { TestimoniModel } from "../models/testimoni.models";
import { CreateTestimoniInput, Testimoni } from "../types/testimoni.types";

export class MongoTestimoniRepo {
  async getAll() {
    return TestimoniModel.find().sort({ created: -1 });
  }
  async getById(id: string | Schema.Types.ObjectId) {
    return TestimoniModel.findById(id);
  }
  async create(input: CreateTestimoniInput) {
    return TestimoniModel.create(input);
  }
}
