import { refreshEnv } from "../config/envConfig";
import { serverLogger } from "../config/loggerConfig";

serverLogger.info(
  `Run refresh Environment config on ${new Date(Date.now()).toISOString()}`
);
refreshEnv();
serverLogger.info(`Environment config updated!`);
