import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import { getEnv } from "@/common/config/envConfig";
import requestLogger from "@/common/middleware/requestLogger";
import { pinoHttp } from "pino-http";
import { httpLogger } from "@/common/config/loggerConfig";

const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: getEnv().CORS_ORIGIN, credentials: true }));
app.use(helmet());

app.use(requestLogger);

app.get("/", (_, res) => {
  res.status(200).send("Server Running!");
});

export { app };
