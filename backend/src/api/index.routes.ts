import { Router } from "express";
import { mealRouter } from "./v1/meal-plan/mealPlan.routes";
import v1 from "./v1/v1.routes";

const IndexRoute = Router();

IndexRoute.use("/api/v1", v1);

export default IndexRoute;
