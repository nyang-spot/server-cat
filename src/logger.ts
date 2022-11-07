import winston from "winston";

const LOG_DIR = "logs";

function getRequestLogFormatter() {
  const { combine, timestamp, printf } = winston.format;

  return combine(
    timestamp({ format: "YYYY-MM-DD HH:MM:SS" }),
    printf((info) => {
      const { req } = info.message;
      return `${info.timestamp} ${info.level}: ${req.hostname}${req.port || ""} ${req.method} '${req.originalUrl}'`;
    })
  );
}

const logger = winston.createLogger({
  level: "info",
  format: getRequestLogFormatter(),
  // format: winston.format.json(),
  //   defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: `${LOG_DIR}/error.log`, level: "error" }),
    new winston.transports.File({ filename: `${LOG_DIR}/combined.log` })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: getRequestLogFormatter()
    })
  );
}

export { logger };
