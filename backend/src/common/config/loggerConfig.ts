import fs from "fs";
import path from "path";
import { createStream } from "rotating-file-stream";
import pino, { multistream, StreamEntry } from "pino";
import { getEnv } from "./envConfig";

const logDirectory = path.join(__dirname, "../../logs");

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const createDailyStream = (type: string) =>
  createStream(
    (time, index) => {
      if (!time) return `${type}-log.log`;
      const date = new Date(time);
      const day = date.toISOString().split("T")[0];
      return `${type}-${day}.log`;
    },
    {
      interval: "1d",
      path: logDirectory,
      maxFiles: 10,
      compress: "gzip",
    }
  );

// File-only logger
const createFileLogger = (type: string) => {
  return pino(
    { transport: { target: "pino-pretty" } },
    createDailyStream(type)
  );
};

// Console + file logger
const createConsoleAndFileLogger = (type: string) => {
  const streams: StreamEntry[] = [
    { stream: process.stdout }, // Console
    { stream: createDailyStream(type) }, // File
  ];

  return pino({ transport: { target: "pino-pretty" } }, multistream(streams));
};

// Define which logger goes where
export const serverLogger = createConsoleAndFileLogger("server");
export const httpLogger =
  getEnv().NODE_ENV == "development"
    ? createConsoleAndFileLogger("http")
    : createFileLogger("http");
export const databaseLogger = createConsoleAndFileLogger("database");
