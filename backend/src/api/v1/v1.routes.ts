import { Router } from "express";
import { mealRouter } from "./meal-plan/mealPlan.routes";

const v1 = Router();

v1.use("/mealplan", mealRouter);

export default v1;
