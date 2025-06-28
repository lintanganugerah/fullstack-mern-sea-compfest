import { Router } from "express";
import { mealRouter } from "./meal-plan/mealPlan.routes";
import { testimoniRouter } from "./testimoni/testimoni.routes";
import { subsRouter } from "./subs/subs.routes";
import { authRouter } from "./auth/auth.routes";

const v1 = Router();

v1.use("/mealplan", mealRouter);
v1.use("/testimoni", testimoniRouter);
v1.use("/subs", subsRouter);
v1.use("/auth", authRouter);

export default v1;
