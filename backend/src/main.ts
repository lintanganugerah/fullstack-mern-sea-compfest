import { getEnv } from "@/common/config/envConfig";
import { app } from "@/server";
import { connectDB } from "@/common/database/mongoConfig";
import { serverLogger } from "@/common/config/loggerConfig";

const server = app.listen(getEnv().PORT, async () => {
  const { NODE_ENV, HOST, PORT } = getEnv();
  await connectDB();
  serverLogger.info(
    `Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`
  );
});

const onCloseSignal = () => {
  serverLogger.info("sigint received, shutting down");
  server.close(() => {
    serverLogger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 30000).unref(); // Force shutdown after 30s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
