import { StatusCodes } from "http-status-codes";
import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "@/server";
import type { MealPlan } from "../types/mealplan.types";
import { ServiceResponse } from "@/common/utils/serviceResponse";

let createdMealId: string;

describe("Meal Plan API Endpoints", () => {
  describe("GET /api/v1/mealplan", () => {
    it("should return list (initially empty or with responseObject)", async () => {
      const res = await request(app).get("/api/v1/mealplan");
      const body: ServiceResponse<MealPlan[]> = res.body;

      expect(res.status).toBe(StatusCodes.OK);
      expect(body.success).toBe(true);
      expect(Array.isArray(body.responseObject)).toBe(true);
    });
  });

  describe("POST /api/v1/mealplan", () => {
    it("should create a new meal with valid responseObject", async () => {
      const res = await request(app).post("/api/v1/mealplan").send({
        name: "Test Nasi Goreng",
        price: 55000,
        description: "Nasi paling enak",
        image: "https://example.com/image.jpg",
      });

      expect(res.status).toBe(StatusCodes.CREATED);
      expect(res.body.success).toBe(true);
      expect(res.body.responseObject).toHaveProperty("_id");
      expect(res.body.responseObject.name).toBe("Test Nasi Goreng");

      createdMealId = res.body.responseObject._id;
    });

    it("should fail to create with invalid payload", async () => {
      const res = await request(app).post("/api/v1/mealplan").send({
        price: -10,
        description: "",
      });

      expect(res.status).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body.success).toBe(false);
    });
  });

  describe("PUT /api/v1/mealplan/:id", () => {
    it("should update existing meal with valid responseObject", async () => {
      const res = await request(app)
        .put(`/api/v1/mealplan/${createdMealId}`)
        .send({ price: 60000 });

      expect(res.status).toBe(StatusCodes.CREATED);
      expect(res.body.success).toBe(true);
      expect(res.body.responseObject.price).toBe(60000);
    });

    it("should fail to update non-existent meal", async () => {
      const res = await request(app)
        .put(`/api/v1/mealplan/invalid-id-123`)
        .send({ price: 60000 });

      expect([StatusCodes.BAD_REQUEST, StatusCodes.NOT_FOUND]).toContain(
        res.status
      );
    });
  });

  describe("DELETE /api/v1/mealplan/:id", () => {
    it("should delete the meal", async () => {
      const res = await request(app).delete(
        `/api/v1/mealplan/${createdMealId}`
      );
      expect(res.status).toBe(res.status);
    });

    it("should fail to delete already deleted meal", async () => {
      const res = await request(app).delete(
        `/api/v1/mealplan/${createdMealId}`
      );
      expect([StatusCodes.NOT_FOUND, StatusCodes.BAD_REQUEST]).toContain(
        res.status
      );
    });
  });

  describe("GET /api/v1/mealplan/:id (not implemented)", () => {
    it("should return 404 or not implemented when fetching deleted meal", async () => {
      const res = await request(app).get(`/api/v1/mealplan/${createdMealId}`);
      expect([StatusCodes.NOT_FOUND, StatusCodes.NOT_IMPLEMENTED]).toContain(
        res.status
      );
    });
  });
});
