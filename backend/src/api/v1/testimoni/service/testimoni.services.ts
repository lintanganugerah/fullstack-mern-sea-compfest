import { Schema } from "mongoose";
import { MongoTestimoniRepo } from "../repo/testimoni.mongo.repo";
import { CreateTestimoniInput, Testimoni } from "../types/testimoni.types";

export class TestimoniService {
  constructor(private readonly repo: MongoTestimoniRepo) {}

  getAllTestimoni() {
    return this.repo.getAll();
  }

  getByIdTestimoni(id: string | Schema.Types.ObjectId) {
    return this.repo.getById(id);
  }

  createTestimoni(input: CreateTestimoniInput) {
    return this.repo.create(input);
  }
}
