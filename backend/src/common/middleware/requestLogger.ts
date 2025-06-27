import { httpLogger } from "@/common/config/loggerConfig";
import pinoHttp from "pino-http";

const requestLogger = pinoHttp({
  logger: httpLogger,
  customLogLevel: (_req, res, err) => {
    if (err || res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
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
