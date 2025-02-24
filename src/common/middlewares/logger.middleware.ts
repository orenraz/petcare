import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as winston from 'winston';

// TODO: Add a logger service to handle logging and inject it into the middleware
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logs/access.log' }),
    ],
  });

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const responseTime = Date.now() - startTime;
      const data = {
        method,
        url,
        status: res.statusCode,
        responseTime: `${responseTime}ms`,
      };
      this.logger.info(data);
      console.log(`logger.middleware: ${JSON.stringify(data)}`); 
    });

    next();
  }
}
