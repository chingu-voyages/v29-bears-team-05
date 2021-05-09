import { NextFunction, Request, Response } from 'express';

type logType = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
interface loggerProps {
  type?: logType;
  msg: string;
  details?: Record<string, unknown>;
  namespace?: string;
}

const getTimeStamp = (): string => {
  return new Date().toISOString();
};

const logger = ({
  type = 'INFO',
  msg,
  details,
  namespace = 'Server',
}: loggerProps): void => {
  const log = `[${getTimeStamp()}] [${type}] [${namespace}] ${msg}`;

  switch (type) {
    case 'WARN':
      details ? console.warn(log, details) : console.warn(log);
      break;
    case 'ERROR':
      details ? console.error(log, details) : console.error(log);
      break;
    case 'DEBUG':
      details ? console.debug(log, details) : console.debug(log);
      break;

    default:
      details ? console.info(log, details) : console.info(log);
      break;
  }
};

const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger({
    msg: `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`,
  });

  res.on('finish', () => {
    logger({
      msg: `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`,
    });
  });

  next();
};

export { logger, requestLogger };
