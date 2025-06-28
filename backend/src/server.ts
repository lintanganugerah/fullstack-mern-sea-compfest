import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { getEnv } from "@/common/config/envConfig";
import requestLogger from "@/common/middleware/requestLogger";
import IndexRoute from "./api/index.routes";
import errorHandlers from "./common/middleware/errorHandlers";
import cookieParser from "cookie-parser";

const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: getEnv().CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(cookieParser());

app.use(requestLogger);
app.use(IndexRoute);

app.get("/", (_, res) => {
  res.status(200).send("Server Running!");
});

app.use(...errorHandlers());

export { app };
