import { Router } from "express";
import { mealRouter } from "./meal-plan/mealPlan.routes";
import { testimoniRouter } from "./testimoni/testimoni.routes";

const v1 = Router();

v1.use("/mealplan", mealRouter);
v1.use("/testimoni", testimoniRouter);

export default v1;
