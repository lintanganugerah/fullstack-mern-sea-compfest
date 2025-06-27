import { httpLogger } from "@/common/config/loggerConfig";
import pinoHttp from "pino-http";

const requestLogger = pinoHttp({
  logger: httpLogger,
  customLogLevel: (res, err) => {
    const status = res.statusCode ?? 500;
    if (status >= 500 || err) return "error";
    if (status >= 400) return "warn";
    return "info";
  },
  customSuccessMessage: (res) => `HTTP ${res.statusCode} - Success`,
  customErrorMessage: (_, res, error) => {
    const status = res.statusCode ?? 500;
    return `HTTP ${status} - Error: ${error.message}`;
  },
  serializers: {
    req(req) {
      return {
        method: req.method,
        url: req.url,
        headers: {
          host: req.headers.host,
          userAgent: req.headers["user-agent"],
          contentType: req.headers["content-type"],
        },
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
  },
});

export default requestLogger;
